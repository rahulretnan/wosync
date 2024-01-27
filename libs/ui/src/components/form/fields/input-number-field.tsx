import { Form, FormItemProps, InputNumber, InputNumberProps } from 'antd';
import { ReactNode } from 'react';
import { Controller, Path, PathValue, useFormContext } from 'react-hook-form';

export type InputNumberFieldProps<RecordType extends object> =
  InputNumberProps & {
    name: Path<RecordType>;
    label?: ReactNode;
    customHelp?: string;
    formItemProps?: FormItemProps;
    required?: boolean;
    showErrorMessage?: boolean;
  };

const FormItem = Form.Item;

export const InputNumberField = <RecordType extends object>({
  name,
  label,
  customHelp,
  formItemProps,
  required,
  showErrorMessage = true,
  ...props
}: InputNumberFieldProps<RecordType>) => {
  const { control } = useFormContext<RecordType>();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const { onChange, value, onBlur } = field;
        const { error } = fieldState;
        return (
          <FormItem
            {...formItemProps}
            required={required}
            label={label}
            validateStatus={error ? 'error' : 'validating'}
            help={
              error && showErrorMessage
                ? error?.message
                : customHelp ?? undefined
            }
          >
            <InputNumber
              {...props}
              value={value}
              onChange={(value) =>
                onChange(value as PathValue<RecordType, Path<RecordType>>)
              }
              onBlur={onBlur}
            />
          </FormItem>
        );
      }}
    />
  );
};
