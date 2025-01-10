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
import PointsIcon from "/src/assets/icons/points.svg?react";
import PersonIcon from "/src/assets/icons/person.svg?react";
import TagIcon from "/src/assets/icons/tag.svg?react";
import { Avatar } from "../../../../components/ui";
import { GetUsersQuery } from "../../graphql/queries/getUsers.generated";

type TaskFormFieldsProps = {
  control: Control<TaskFormValue>;
  register: UseFormRegister<TaskFormValue>;
  errors: FieldErrors<TaskFormValue>;
  users?: GetUsersQuery["users"];
};

export const TaskFormFields = ({
  control,
  register,
  errors,
  users,
}: TaskFormFieldsProps) => (
  <>
    <div className={styles.field}>
      <input
        type="text"
        placeholder="Task Name"
        className={`${styles.name} body-xl-bold`}
        {...register("name")}
      />
      {errors.name && (
        <span className={styles.error}>{errors.name.message}</span>
      )}
    </div>

    <div className={styles.field}>
      <Controller
        name="pointEstimate"
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            error={errors.pointEstimate?.message}
            icon={PointsIcon}
            placeholder="Estimate"
            className={styles.select}
          >
            <Select.Label>Estimate</Select.Label>
            {pointsEstimate.map((points) => (
              <Select.Option key={points.value} value={points.value}>
                <PointsIcon className={styles.icon} /> {points.label}
              </Select.Option>
            ))}
          </Select>
        )}
      />
      {errors.pointEstimate && (
        <span className={styles.error}>{errors.pointEstimate.message}</span>
      )}
    </div>

    <div className={styles.field}>
      <Controller
        name="assigneeId"
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            error={errors.assigneeId?.message}
            placeholder="Assignee"
            icon={PersonIcon}
            className={styles.select}
          >
            <Select.Label>Assign To...</Select.Label>
            {users?.map((user) => (
              <Select.Option key={user.id} value={user.id}>
                <Avatar avatar={user?.avatar || ""} fullName={user.fullName} />{" "}
                {user.fullName}
              </Select.Option>
            ))}
          </Select>
        )}
      />
      {errors.assigneeId && (
        <span className={styles.error}>{errors.assigneeId.message}</span>
      )}
    </div>

    <div className={styles.field}>
      <Controller
        name="tags"
        control={control}
        render={({ field: { value, onChange, ...field } }) => (
          <Select
            {...field}
            value={value || []}
            onChange={onChange}
            error={errors.tags?.message}
            icon={TagIcon}
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
      {errors.tags && (
        <span className={styles.error}>{errors.tags.message}</span>
      )}
    </div>

    <div className={styles.field}>
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
      {errors.dueDate && (
        <span className={styles.error}>{errors.dueDate.message}</span>
      )}
    </div>
  </>
);
