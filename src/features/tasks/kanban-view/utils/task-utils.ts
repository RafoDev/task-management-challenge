import { Status } from "../../../../types";
import { TaskFieldsFragment } from "../../graphql/fragments/taskFields.generated";
import { GetTasksQuery } from "../../graphql/queries/getTasks.generated";

export const findTaskById = (
  tasks: GetTasksQuery | undefined,
  taskId: string
): TaskFieldsFragment | null => {
  if (!tasks) return null;
  return (
    [
      ...tasks.backlogTasks,
      ...tasks.todoTasks,
      ...tasks.inProgressTasks,
      ...tasks.doneTasks,
      ...tasks.cancelledTasks,
    ].find((task) => task.id === taskId) || null
  );
};

export const getTasksByStatus = (
  tasks: GetTasksQuery | undefined,
  status: Status
): TaskFieldsFragment[] => {
  if (!tasks) return [];
  switch (status) {
    case Status.Todo:
      return tasks.todoTasks;
    case Status.InProgress:
      return tasks.inProgressTasks;
    case Status.Done:
      return tasks.doneTasks;
    case Status.Backlog:
      return tasks.backlogTasks;
    case Status.Cancelled:
      return tasks.cancelledTasks;
    default:
      return [];
  }
};
