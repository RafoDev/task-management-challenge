import { GetTasksQuery } from "../graphql/queries/getTasks.generated";
import { Status } from "../../../types";

export type KanbanViewProps = {
  tasks: GetTasksQuery | undefined;
};

export const statusMap: Record<string, Status> = {
  Working: Status.Todo,
  "In Progress": Status.InProgress,
  Done: Status.Done,
};
