import { Form, FormItemProps, Input, InputProps, InputRef } from 'antd';
import { ReactNode, Ref } from 'react';
import { Controller, Path, useFormContext } from 'react-hook-form';

export type InputFieldProps<RecordType extends object> = InputProps & {
  name: Path<RecordType>;
  label?: ReactNode;
  customHelp?: ReactNode;
  formItemProps?: FormItemProps;
  ref?: Ref<InputRef>;
  required?: boolean;
  skeleton?: boolean;
  tooltip?: FormItemProps['tooltip'];
};

const FormItem = Form.Item;

export const InputField = <RecordType extends object>({
  name,
  label,
  customHelp,
  formItemProps,
  ref,
  required,
  skeleton = false,
  tooltip,
  ...props
}: InputFieldProps<RecordType>) => {
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
            <Input
              {...props}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              ref={ref}
            />
          </FormItem>
        );
      }}
      control={control}
    />
  );
};
