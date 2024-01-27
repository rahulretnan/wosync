import { Form, FormItemProps, Input } from 'antd';
import { TextAreaProps } from 'antd/es/input';
import { ReactNode } from 'react';
import { Controller, Path, useFormContext } from 'react-hook-form';

export type InputTextAreaFieldProps<RecordType extends object> =
  TextAreaProps & {
    name: Path<RecordType>;
    label?: ReactNode;
    customHelp?: string;
    formItemProps?: FormItemProps;
    required?: boolean;
  };

const FormItem = Form.Item;

export const InputTextAreaField = <RecordType extends object>({
  name,
  label,
  customHelp,
  formItemProps,
  className,
  required,
  ...props
}: InputTextAreaFieldProps<RecordType>) => {
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
            <Input.TextArea
              {...props}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
            />
          </FormItem>
        );
      }}
      control={control}
    />
  );
};
