import {
  Control,
  Controller,
  FieldErrors,
  UseFormRegister,
} from "react-hook-form";
import { TaskFormValue } from "../task-form-schema";
import Select from "../../../../components/ui/select";
import styles from "./task-form-fields.module.scss";
import { pointsEstimate, tags } from "../constants";
import DatePicker from "../../../../components/ui/date-picker/date-picker";

type TaskFormFieldsProps = {
  control: Control<TaskFormValue>;
  register: UseFormRegister<TaskFormValue>;
  errors: FieldErrors<TaskFormValue>;
  users?: Array<{ id: string; fullName: string }>;
};

export const TaskFormFields = ({
  control,
  register,
  errors,
  users,
}: TaskFormFieldsProps) => (
  <>
    <input
      type="text"
      placeholder="Task Name"
      className={`${styles.name} body-xl-bold`}
      {...register("name")}
    />
    {errors.name && <span>{errors.name.message}</span>}

    <Controller
      name="pointEstimate"
      control={control}
      render={({ field }) => (
        <Select
          {...field}
          error={errors.pointEstimate?.message}
          placeholder="Estimate"
          className={styles.select}
        >
          <Select.Label>Estimate Pts</Select.Label>
          {pointsEstimate.map((points) => (
            <Select.Option key={points.value} value={points.value}>
              {points.label}
            </Select.Option>
          ))}
        </Select>
      )}
    />
    {errors.pointEstimate && <span>{errors.pointEstimate.message}</span>}

    {users && (
      <Controller
        name="assigneeId"
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            error={errors.assigneeId?.message}
            placeholder="Assignee"
            className={styles.select}
          >
            <Select.Label>Assign To...</Select.Label>
            {users.map((user) => (
              <Select.Option key={user.id} value={user.id}>
                {user.fullName}
              </Select.Option>
            ))}
          </Select>
        )}
      />
    )}

    <Controller
      name="tags"
      control={control}
      render={({ field: { value, onChange, ...field } }) => (
        <Select
          {...field}
          value={value || []}
          onChange={onChange}
          error={errors.tags?.message}
          placeholder="Label"
          className={styles.select}
          multiple
        >
          <Select.Label>Tag Title</Select.Label>
          {tags.map((tag) => (
            <Select.CheckboxOption key={tag.value} value={tag.value}>
              {tag.label}
            </Select.CheckboxOption>
          ))}
        </Select>
      )}
    />
    {errors.tags && <span>{errors.tags.message}</span>}

    <Controller
      control={control}
      name="dueDate"
      render={({ field: { onChange, onBlur, value } }) => (
        <DatePicker
          selected={value ? new Date(value) : null}
          onChange={(date) => {
            const dateString = date ? date.toISOString().split("T")[0] : "";
            onChange(dateString);
          }}
          onBlur={onBlur}
        />
      )}
    />
    {errors.dueDate && <span>{errors.dueDate.message}</span>}
  </>
);
