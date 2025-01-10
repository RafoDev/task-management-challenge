import { TaskFormValue } from "../task-form-schema";

export const getTaskInput = (inputData: TaskFormValue) => ({
  name: inputData.name,
  dueDate: inputData.dueDate,
  pointEstimate: inputData.pointEstimate,
  status: inputData.status,
  tags: inputData.tags,
  assigneeId: inputData.assigneeId,
});
