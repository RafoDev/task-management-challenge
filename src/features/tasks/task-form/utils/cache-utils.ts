import { ApolloCache } from "@apollo/client";
import { TaskFieldsFragment } from "../../graphql/fragments/taskFields.generated";
import {
  GetTasksDocument,
  GetTasksQuery,
} from "../../graphql/queries/getTasks.generated";
import { Status } from "../../../../types";

export const updateCacheAfterCreate = (
  cache: ApolloCache<any>,
  newTask: TaskFieldsFragment,
  profileId?: string
) => {
  const dashboardData = cache.readQuery<GetTasksQuery>({
    query: GetTasksDocument,
  });

  if (dashboardData) {
    cache.writeQuery({
      query: GetTasksDocument,
      data: {
        ...dashboardData,
        todoTasks: [...dashboardData.todoTasks, newTask],
      },
    });
  }

  if (profileId && newTask.assignee?.id === profileId) {
    const myTasksData = cache.readQuery<GetTasksQuery>({
      query: GetTasksDocument,
      variables: { assigneeId: profileId },
    });

    if (myTasksData) {
      cache.writeQuery({
        query: GetTasksDocument,
        variables: { assigneeId: profileId },
        data: {
          ...myTasksData,
          todoTasks: [...myTasksData.todoTasks, newTask],
        },
      });
    }
  }
};

export const updateCacheAfterUpdate = (
  cache: ApolloCache<any>,
  updatedTask: TaskFieldsFragment,
  profileId?: string
) => {
  const updateTasksInList = (
    queryData: GetTasksQuery,
    shouldIncludeTask: boolean
  ) => {
    const removeFromList = (tasks: TaskFieldsFragment[]) =>
      tasks.filter((t) => t.id !== updatedTask.id);

    if (!shouldIncludeTask) {
      return {
        ...queryData,
        backlogTasks: removeFromList(queryData.backlogTasks),
        todoTasks: removeFromList(queryData.todoTasks),
        inProgressTasks: removeFromList(queryData.inProgressTasks),
        doneTasks: removeFromList(queryData.doneTasks),
        cancelledTasks: removeFromList(queryData.cancelledTasks),
      };
    }

    return {
      ...queryData,
      backlogTasks:
        updatedTask.status === Status.Backlog
          ? [...removeFromList(queryData.backlogTasks), updatedTask]
          : removeFromList(queryData.backlogTasks),
      todoTasks:
        updatedTask.status === Status.Todo
          ? [...removeFromList(queryData.todoTasks), updatedTask]
          : removeFromList(queryData.todoTasks),
      inProgressTasks:
        updatedTask.status === Status.InProgress
          ? [...removeFromList(queryData.inProgressTasks), updatedTask]
          : removeFromList(queryData.inProgressTasks),
      doneTasks:
        updatedTask.status === Status.Done
          ? [...removeFromList(queryData.doneTasks), updatedTask]
          : removeFromList(queryData.doneTasks),
      cancelledTasks:
        updatedTask.status === Status.Cancelled
          ? [...removeFromList(queryData.cancelledTasks), updatedTask]
          : removeFromList(queryData.cancelledTasks),
    };
  };

  const dashboardData = cache.readQuery<GetTasksQuery>({
    query: GetTasksDocument,
  });

  if (dashboardData) {
    cache.writeQuery({
      query: GetTasksDocument,
      data: updateTasksInList(dashboardData, true),
    });
  }

  if (profileId) {
    const myTasksData = cache.readQuery<GetTasksQuery>({
      query: GetTasksDocument,
      variables: { assigneeId: profileId },
    });

    if (myTasksData) {
      const shouldIncludeInMyTasks = updatedTask.assignee?.id === profileId;

      cache.writeQuery({
        query: GetTasksDocument,
        variables: { assigneeId: profileId },
        data: updateTasksInList(myTasksData, shouldIncludeInMyTasks),
      });
    }
  }
};
