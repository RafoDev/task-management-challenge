import { z } from "zod";
import { PointEstimate, Status, TaskTag } from "../../../../../types";

const PointEstimateEnum = z.enum([
  PointEstimate.Eight,
  PointEstimate.Four,
  PointEstimate.One,
  PointEstimate.Two,
  PointEstimate.Zero,
]);

const StatusEnum = z.enum([
  Status.Backlog,
  Status.Cancelled,
  Status.Done,
  Status.InProgress,
  Status.Todo,
]);

const TaskTagEnum = z.enum([
  TaskTag.Android,
  TaskTag.Ios,
  TaskTag.NodeJs,
  TaskTag.Rails,
  TaskTag.React,
]);

export const CreateTaskSchema = z.object({
  assigneeId: z.string().optional(),
  dueDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
  name: z.string().min(1, "Task name is required"),
  pointEstimate: PointEstimateEnum,
  status: StatusEnum,
  tags: z.array(TaskTagEnum).min(1, "At least one tag is required"),
});

export type CreateTaskInput = z.infer<typeof CreateTaskSchema>;
