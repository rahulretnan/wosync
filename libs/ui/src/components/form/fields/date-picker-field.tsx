import { DatePicker, Form, FormItemProps } from 'antd';
import { PickerProps } from 'antd/lib/date-picker/generatePicker';
import { Dayjs } from 'dayjs';
import { ReactNode } from 'react';
import { Controller, Path, PathValue, useFormContext } from 'react-hook-form';

export type DatePickerFieldProps<RecordType extends object> =
  PickerProps<Dayjs> & {
    name: Path<RecordType>;
    label: ReactNode;
    customHelp?: string;
    formItemProps?: FormItemProps;
    required?: boolean;
  };

const FormItem = Form.Item;

export const DatePickerField = <RecordType extends object>({
  name,
  label,
  customHelp,
  formItemProps,
  required,
  ...props
}: DatePickerFieldProps<RecordType>) => {
  const { control } = useFormContext<RecordType>();

  return (
    <Controller
      name={name}
      render={({ field, fieldState }) => {
        const { onChange, value, onBlur } = field;
        const { error } = fieldState;
        return (
          <FormItem
            {...formItemProps}
            required={required}
            label={label}
            validateStatus={error ? 'error' : 'validating'}
            help={error ? error?.message : customHelp ?? undefined}
          >
            <DatePicker
              {...props}
              onBlur={onBlur}
              onChange={(date) => {
                onChange(date as PathValue<RecordType, Path<RecordType>>);
              }}
              value={value}
            />
          </FormItem>
        );
      }}
      control={control}
    />
  );
};
