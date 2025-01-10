import { useState } from "react";
import { DragEndEvent, DragOverEvent, DragStartEvent } from "@dnd-kit/core";
import { findTaskById, getTasksByStatus } from "../utils/task-utils";
import { useUpdateTaskMutation } from "../../graphql/mutations/updateTask.generated";
import { GetTasksQuery } from "../../graphql/queries/getTasks.generated";
import { statusMap } from "../types";
import { updateCacheAfterUpdate } from "../../task-form/utils/cache-utils";

export const useKanbanDrag = (tasks: GetTasksQuery | undefined, profileId: string | undefined) => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [activeContainer, setActiveContainer] = useState<string | null>(null);
  const [overContainer, setOverContainer] = useState<string | null>(null);

  const [updateTask] = useUpdateTaskMutation({
    update: (cache, { data }) => {
      if (!data?.updateTask) return;
      try {
        updateCacheAfterUpdate(cache, data.updateTask, profileId);
      } catch (error) {
        console.error('Error in mutation update:', error);
      }
    },
    onError: (error) => {
      console.error('Mutation error:', error);
    }
  });

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const activeContainer = active.data.current?.containerId;
    setActiveId(active.id.toString());
    setActiveContainer(activeContainer);
    setOverContainer(activeContainer);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeContainer = active.data.current?.containerId;
    const overContainer = over.data.current?.containerId || over.id;
    const overId = over.id.toString();

    if (activeContainer !== overContainer) {
      setOverContainer(overContainer);

      const newStatus = statusMap[overContainer];
      if (!newStatus) return;

      const activeId = active.id.toString();
      const sourceTask = findTaskById(tasks, activeId);
      const targetTask = findTaskById(tasks, overId);

      if (!sourceTask) return;

      if (overId === overContainer) {
        const tasksInTargetStatus = getTasksByStatus(tasks, newStatus);

        if (sourceTask.status === newStatus) {
          return;
        }

        const maxPosition = Math.max(
          ...tasksInTargetStatus.map((t) => t.position),
          0
        );

        updateTask({
          variables: {
            input: {
              id: activeId,
              status: newStatus,
              position: maxPosition + 1,
            },
          },
          optimisticResponse: {
            __typename: "Mutation",
            updateTask: {
              ...sourceTask,
              __typename: "Task",
              status: newStatus,
              position: maxPosition + 1,
            },
          },
        });
      } else if (targetTask) {
        updateTask({
          variables: {
            input: {
              id: activeId,
              status: newStatus,
              position: targetTask.position,
            },
          },
          optimisticResponse: {
            __typename: "Mutation",
            updateTask: {
              ...sourceTask,
              __typename: "Task",
              status: newStatus,
              position: targetTask.position,
            },
          },
        });
      }
    }
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);
    setActiveContainer(null);
    setOverContainer(null);

    if (!over) return;

    const taskId = active.id.toString();
    const overId = over.id.toString();
    const containerId = over.data.current?.containerId || over.id;
    const newStatus = statusMap[containerId];

    if (!newStatus) return;

    const sourceTask = findTaskById(tasks, taskId);
    const targetTask = findTaskById(tasks, overId);

    if (!sourceTask) return;

    try {
      if (sourceTask.status === newStatus && overId === taskId) {
        return;
      }

      if (overId === containerId) {
        const tasksInTargetStatus = getTasksByStatus(tasks, newStatus);
        let newPosition;

        if (sourceTask.status === newStatus) {
          newPosition = sourceTask.position;
        } else {
          newPosition =
            Math.max(...tasksInTargetStatus.map((t) => t.position), 0) + 1;
        }

        await updateTask({
          variables: {
            input: {
              id: taskId,
              status: newStatus,
              position: newPosition,
            },
          },
        });
      } else if (targetTask) {
        const isSameColumn = sourceTask.status === targetTask.status;
        const targetPosition = targetTask.position;

        if (isSameColumn) {
          await Promise.all([
            updateTask({
              variables: {
                input: {
                  id: taskId,
                  status: newStatus,
                  position: targetPosition,
                },
              },
            }),
            updateTask({
              variables: {
                input: {
                  id: overId,
                  status: targetTask.status,
                  position: sourceTask.position,
                },
              },
            }),
          ]);
        } else {
          const tasksInTargetStatus = getTasksByStatus(tasks, newStatus);
          const tasksToUpdate = tasksInTargetStatus
            .filter((t) => t.position >= targetPosition)
            .map((t) => ({
              ...t,
              position: t.position + 1,
            }));

          if (tasksToUpdate.length > 0) {
            await Promise.all(
              tasksToUpdate.map((task) =>
                updateTask({
                  variables: {
                    input: {
                      id: task.id,
                      status: task.status,
                      position: task.position,
                    },
                  },
                })
              )
            );
          }

          await updateTask({
            variables: {
              input: {
                id: taskId,
                status: newStatus,
                position: targetPosition,
              },
            },
          });
        }
      }
    } catch (error) {
      console.error("Error updating tasks:", error);
    }
  };

  return {
    activeId,
    overContainer,
    activeContainer,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
  };
};