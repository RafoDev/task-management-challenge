import { ApolloCache } from "@apollo/client";
import { TaskFieldsFragment } from "../../graphql/fragments/taskFields.generated";
import { GetTasksDocument, GetTasksQuery } from "../../graphql/queries/getTasks.generated";
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
  oldAssigneeId?: string,
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
        todoTasks: removeFromList(queryData.todoTasks),
        inProgressTasks: removeFromList(queryData.inProgressTasks),
        doneTasks: removeFromList(queryData.doneTasks),
      };
    }

    return {
      ...queryData,
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