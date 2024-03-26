import { Form, FormItemProps, TimePicker, TimePickerProps } from 'antd';
import { ReactNode } from 'react';
import { Controller, FieldValues, Path, useFormContext } from 'react-hook-form';

export interface TimePickerFieldProps<RecordType extends FieldValues>
  extends TimePickerProps {
  name: Path<RecordType>;
  label: ReactNode;
  customHelp?: string;
  formItemProps?: FormItemProps;
  required?: boolean;
}

const FormItem = Form.Item;

export const TimePickerField = <RecordType extends FieldValues>({
  label,
  name,
  customHelp,
  formItemProps,
  required,
  ...props
}: TimePickerFieldProps<RecordType>) => {
  const { control } = useFormContext<RecordType>();
  return (
    <Controller<RecordType>
      name={name}
      control={control}
      render={({
        field: { onChange, value, onBlur, ...field },
        fieldState: { error },
      }) => (
        <FormItem
          {...formItemProps}
          required={required}
          label={label}
          validateStatus={error ? 'error' : 'validating'}
          help={error ? error?.message : customHelp || undefined}
        >
          <TimePicker
            {...props}
            {...field}
            onBlur={onBlur}
            onChange={onChange}
            value={value}
          />
        </FormItem>
      )}
    />
  );
};
