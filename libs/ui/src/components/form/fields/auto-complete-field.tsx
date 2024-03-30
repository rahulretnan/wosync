import { AutoComplete, AutoCompleteProps, Form, FormItemProps } from 'antd';
import { ReactNode } from 'react';
import { Controller, Path, useFormContext } from 'react-hook-form';

export type AutoCompleteFieldProps<RecordType extends object> =
  AutoCompleteProps & {
    name: Path<RecordType>;
    label: ReactNode;
    customHelp?: string;
    formItemProps?: FormItemProps;
    required?: boolean;
  };

const FormItem = Form.Item;

export function AutoCompleteField<RecordType extends object>({
  name,
  label,
  customHelp,
  formItemProps,
  required,
  ...props
}: AutoCompleteFieldProps<RecordType>) {
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
            <AutoComplete
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
}
