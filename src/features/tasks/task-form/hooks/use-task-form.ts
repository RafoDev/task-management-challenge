import { useState } from "react";

export const useTaskForm = () => {
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
  const closeTaskForm = () => setIsTaskFormOpen(false);
  const openTaskForm = () => setIsTaskFormOpen(true);

  return { isTaskFormOpen, closeTaskForm, openTaskForm };
};
