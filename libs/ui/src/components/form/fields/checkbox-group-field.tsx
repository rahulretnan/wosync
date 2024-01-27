import { Checkbox, Form, FormItemProps } from 'antd';
import { CheckboxGroupProps } from 'antd/es/checkbox';
import { ReactNode } from 'react';
import { Controller, FieldValues, Path, useFormContext } from 'react-hook-form';

export interface CheckBoxGroupFieldProps<T extends FieldValues>
  extends CheckboxGroupProps {
  name: Path<T>;
  label: ReactNode;
  customHelp?: string;
  formItemProps?: FormItemProps;
  children?: ReactNode;
}

const FormItem = Form.Item;

export const CheckBoxGroupField = <T extends FieldValues>({
  label,
  name,
  children,
  customHelp,
  formItemProps,
  ...props
}: CheckBoxGroupFieldProps<T>) => {
  const { control } = useFormContext<T>();
  return (
    <Controller<T>
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const { onChange, value } = field;
        const { error } = fieldState;
        return (
          <FormItem
            {...formItemProps}
            label={label}
            validateStatus={error ? 'error' : 'validating'}
            help={error ? error?.message : customHelp || undefined}
          >
            <Checkbox.Group {...props} value={value} onChange={onChange} />
          </FormItem>
        );
      }}
    />
  );
};
