import { toast } from "sonner";
import { useCreateTaskMutation } from "../../graphql/mutations/createTask.generated";
import { useUpdateTaskMutation } from "../../graphql/mutations/updateTask.generated";
import { TaskFormValue } from "../task-form-schema";
import {
  updateCacheAfterCreate,
  updateCacheAfterUpdate,
} from "../utils/cache-utils";
import { TaskFieldsFragment } from "../../graphql/fragments/taskFields.generated";
import { getTaskInput } from "../utils/task-utils";
import { useProfile } from "../../../navigation/searchbar/components/profile/context/profile-context";

export const useTaskMutations = (
  initialData?: TaskFormValue & {
    id?: string;
    assignee?: TaskFieldsFragment["assignee"];
  },
  closeTaskForm?: () => void,
  onSuccess?: () => void
) => {
  const { profile } = useProfile();
  const isEditMode = !!initialData?.id;

  const [createTask] = useCreateTaskMutation({
    update(cache, { data }) {
      if (!data?.createTask) return;
      updateCacheAfterCreate(cache, data.createTask, profile?.id);
    },
  });

  const [updateTask] = useUpdateTaskMutation({
    update(cache, { data }) {
      if (!data?.updateTask) return;
      updateCacheAfterUpdate(
        cache,
        data.updateTask,
        profile?.id
      );
    },
  });

  const handleSubmit = async (inputData: TaskFormValue) => {
    try {
      if (isEditMode && initialData?.id) {
        await updateTask({
          variables: {
            input: {
              id: initialData.id,
              ...getTaskInput(inputData),
            },
          },
        });
        toast.success("Task has been updated");
      } else {
        await createTask({
          variables: {
            input: getTaskInput(inputData),
          },
        });
        toast.success("Task has been created");
      }
      closeTaskForm?.();
      onSuccess?.();
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  return {
    handleSubmit,
    isEditMode,
  };
};
