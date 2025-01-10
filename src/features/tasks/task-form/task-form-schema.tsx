import { z } from "zod";
import { PointEstimate, Status, TaskTag } from "../../../types";

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

const BaseTaskSchema = z.object({
  assigneeId: z.string().optional(),
  dueDate: z
    .string({ message: "Due date is required" })
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid date format",
    }),
  name: z.string().min(1, "Task name is required"),
  pointEstimate: PointEstimateEnum,
  status: StatusEnum,
  tags: z.array(TaskTagEnum).min(1, "At least one tag is required"),
  position: z.number().optional(),
});

export const CreateTaskSchema = BaseTaskSchema;

export const UpdateTaskSchema = BaseTaskSchema.extend({
  id: z.string(),
});

export type TaskFormValue = z.infer<typeof BaseTaskSchema>;
export type CreateTaskValue = z.infer<typeof CreateTaskSchema>;
export type UpdateTaskValue = z.infer<typeof UpdateTaskSchema>;
