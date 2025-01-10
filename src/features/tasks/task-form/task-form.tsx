import { useForm } from "react-hook-form";
import { TaskFieldsFragment } from "../graphql/fragments/taskFields.generated";
import { useGetUsersQuery } from "../graphql/queries/getUsers.generated";
import {
  CreateTaskSchema,
  TaskFormValue,
  UpdateTaskSchema,
} from "./task-form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Status } from "../../../types";
import { useTaskMutations } from "./hooks/use-task-mutations";
import Dialog from "../../../components/ui/dialog/dialog";
import { TaskFormFields } from "./components/task-form-fields";
import styles from "./task-form.module.scss";

interface TaskFormProps {
  initialData?: TaskFormValue & {
    id?: string;
    assignee?: TaskFieldsFragment["assignee"];
    assigneeId?: string;
  };
  onSuccess?: () => void;
  isTaskFormOpen: boolean;
  openTaskForm: () => void;
  closeTaskForm: () => void;
}

export const TaskForm: React.FC<TaskFormProps> = ({
  initialData,
  onSuccess,
  isTaskFormOpen,
  openTaskForm,
  closeTaskForm,
}) => {
  const { data: usersData } = useGetUsersQuery();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<TaskFormValue>({
    resolver: zodResolver(
      initialData?.id ? UpdateTaskSchema : CreateTaskSchema
    ),
    defaultValues: {
      status: Status.Todo,
      tags: [],
      ...initialData,
      assigneeId: initialData?.assignee?.id || initialData?.assigneeId,
    },
    mode: "onChange",
  });

  const { handleSubmit: onSubmit, isEditMode } = useTaskMutations(
    initialData,
    closeTaskForm,
    onSuccess
  );

  return (
    <Dialog open={isTaskFormOpen} onOpen={openTaskForm} onClose={closeTaskForm}>
      <Dialog.Content>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <TaskFormFields
            control={control}
            register={register}
            errors={errors}
            users={usersData?.users}
          />

          <footer className={styles.buttons}>
            <button
              onClick={() => closeTaskForm()}
              className={`${styles.close} body-m-regular`}
            >
              Close
            </button>
            <button
              type="submit"
              className={`${styles.create} ${
                !isValid && styles.createDisabled
              } body-m-regular`}
            >
              {isEditMode ? "Update" : "Create"}
            </button>
          </footer>
        </form>
      </Dialog.Content>
    </Dialog>
  );
};
