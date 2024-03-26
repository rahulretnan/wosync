import { Form, FormItemProps, Select, SelectProps } from 'antd';
import { ReactNode } from 'react';
import { Controller, Path, useFormContext } from 'react-hook-form';

export interface SelectFieldProps<RecordType extends object>
  extends SelectProps {
  name: Path<RecordType>;
  label: ReactNode;
  customHelp?: string;
  formItemProps?: FormItemProps;
  required?: boolean;
}

const FormItem = Form.Item;

export const SelectField = <RecordType extends object>({
  name,
  label,
  options,
  customHelp,
  formItemProps,
  required,
  ...props
}: SelectFieldProps<RecordType>) => {
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
            <Select
              {...props}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              options={options}
            />
          </FormItem>
        );
      }}
      control={control}
    />
  );
};
