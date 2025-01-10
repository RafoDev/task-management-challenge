import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
} from "@dnd-kit/core";

import { Kanban } from "./components/kanban/kanban";
import styles from "./kanban-view.module.scss";
import { useUpdateTaskMutation } from "../graphql/mutations/updateTask.generated";
import { Status } from "../../../types";
import {
  GetTasksDocument,
  GetTasksQuery,
} from "../graphql/queries/getTasks.generated";
import { TaskFieldsFragment } from "../graphql/fragments/taskFields.generated";
import { ApolloCache } from "@apollo/client";

export type KanbanViewProps = {
  tasks: GetTasksQuery | undefined;
};

const statusMap: Record<string, Status> = {
  "Working": Status.Todo,
  "In Progress": Status.InProgress,
  "Done": Status.Done,
};

type TaskUpdate = {
  id: string;
  status: Status;
  position: number;
};

export const updateTaskPositionInCache = (
  cache: ApolloCache<any>,
  updatedFields: TaskUpdate
) => {
  const tasksData = cache.readQuery<GetTasksQuery>({
    query: GetTasksDocument,
  });

  if (!tasksData) return;

  const updateTaskInList = (tasks: TaskFieldsFragment[]) => {
    const taskIndex = tasks.findIndex((t) => t.id === updatedFields.id);
    if (taskIndex === -1) return tasks;

    const updatedTask = {
      ...tasks[taskIndex],
      status: updatedFields.status,
      position: updatedFields.position,
    };

    const newTasks = tasks.filter((t) => t.id !== updatedFields.id);
    return [...newTasks, updatedTask].sort((a, b) => a.position - b.position);
  };

  const removeTaskFromList = (tasks: TaskFieldsFragment[]) =>
    tasks.filter((t) => t.id !== updatedFields.id);

  const updatedData = {
    ...tasksData,
    todoTasks:
      updatedFields.status === Status.Todo
        ? updateTaskInList(tasksData.todoTasks)
        : removeTaskFromList(tasksData.todoTasks),
    inProgressTasks:
      updatedFields.status === Status.InProgress
        ? updateTaskInList(tasksData.inProgressTasks)
        : removeTaskFromList(tasksData.inProgressTasks),
    doneTasks:
      updatedFields.status === Status.Done
        ? updateTaskInList(tasksData.doneTasks)
        : removeTaskFromList(tasksData.doneTasks),
  };

  cache.writeQuery({
    query: GetTasksDocument,
    data: updatedData,
  });
};

export const KanbanView = ({ tasks }: KanbanViewProps) => {
  const [updateTask] = useUpdateTaskMutation({
    refetchQueries: ['GetTasks']
  }
    //   {
  //   update: (cache, { data }) => {
  //     if (!data?.updateTask) return;

  //     const updatedFields = {
  //       id: data.updateTask.id,
  //       status: data.updateTask.status,
  //       position: data.updateTask.position,
  //     };

  //     updateTaskPositionInCache(cache, updatedFields);
  //   },
  // }
);

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const taskCard = document.querySelector(`[data-task-id="${active.id}"]`);
    if (taskCard) {
      taskCard.classList.add("dragging");
    }
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const taskCard = document.querySelector(`[data-task-id="${active.id}"]`);
    if (taskCard) {
      taskCard.classList.remove("dragging");
    }

    console.log(active, over);

    const taskId = active.id.toString();
    const containerId = over.data.current?.containerId || over.id;
    const newStatus = statusMap[containerId];

    console.log(newStatus);

    if (!newStatus) return;

    try {
      await updateTask({
        variables: {
          input: {
            id: taskId,
            status: newStatus,
            position: over.data.current?.position || 0,
          },
        },
      });
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const taskId = active.id.toString();
    const overId = over.id.toString();

    if (taskId === overId) return;

    // Aquí puedes añadir lógica para reordenar visualmente las tareas
    // mientras se está arrastrando
  };

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
    >
      <div className={styles.container}>
        <Kanban id="Working" title="Working" tasks={tasks?.todoTasks ?? []} />
        <Kanban
          id="In Progress"
          title="In Progress"
          tasks={tasks?.inProgressTasks ?? []}
        />
        <Kanban id="Done" title="Done" tasks={tasks?.doneTasks ?? []} />
      </div>
    </DndContext>
  );
};
