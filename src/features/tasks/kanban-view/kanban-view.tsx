import { closestCorners, DndContext, DragOverlay } from "@dnd-kit/core";
import { Kanban } from "./components/kanban/kanban";
import styles from "./kanban-view.module.scss";
import { useProfile } from "../../navigation/searchbar/components/profile/context/profile-context";
import { TaskCard } from "./components/task-card/task-card";
import { findTaskById } from "./utils/task-utils";
import { KanbanViewProps } from "./types";
import { useKanbanDrag } from "./hooks/use-kanban-drag";

export const KanbanView = ({ tasks }: KanbanViewProps) => {
  const { profile } = useProfile();
  const {
    activeId,
    overContainer,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
  } = useKanbanDrag(tasks, profile?.id);

  const activeTask = activeId ? findTaskById(tasks, activeId) : null;

  return (
    <div className={styles.container}>
      <DndContext
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragOver={handleDragOver}
      >
        <Kanban
          id="Backlog"
          title="Backlog"
          tasks={tasks?.backlogTasks ?? []}
          isReceiving={overContainer === "Backlog"}
        />
        <Kanban
          id="Working"
          title="Working"
          tasks={tasks?.todoTasks ?? []}
          isReceiving={overContainer === "Working"}
        />
        <Kanban
          id="In Progress"
          title="In Progress"
          tasks={tasks?.inProgressTasks ?? []}
          isReceiving={overContainer === "In Progress"}
        />
        <Kanban
          id="Done"
          title="Done"
          tasks={tasks?.doneTasks ?? []}
          isReceiving={overContainer === "Done"}
        />

        <Kanban
          id="Cancelled"
          title="Cancelled"
          tasks={tasks?.cancelledTasks ?? []}
          isReceiving={overContainer === "Cancelled"}
        />

        <DragOverlay>
          {activeTask ? (
            <TaskCard {...activeTask} index={0} containerId="" isDragOverlay />
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
};
