import { Form, FormItemProps, Switch, SwitchProps } from 'antd';
import { ReactNode } from 'react';
import { Controller, Path, PathValue, useFormContext } from 'react-hook-form';

export interface SwitchFieldProps<RecordType extends object>
  extends SwitchProps {
  name: Path<RecordType>;
  label?: ReactNode;
  customHelp?: string;
  formItemProps?: FormItemProps;
  required?: boolean;
}

const FormItem = Form.Item;

export const SwitchField = <RecordType extends object>({
  name,
  label,
  customHelp,
  formItemProps,
  required,
  ...props
}: SwitchFieldProps<RecordType>) => {
  const { control } = useFormContext<RecordType>();
  return (
    <Controller
      name={name}
      render={({ field, fieldState }) => {
        const { onChange, value } = field;
        const { error } = fieldState;
        return (
          <FormItem
            {...formItemProps}
            required={required}
            label={label}
            validateStatus={error ? 'error' : 'validating'}
            help={error ? error?.message : customHelp ?? undefined}
          >
            <Switch
              {...props}
              checked={value}
              onChange={(checked, _e) =>
                onChange(checked as PathValue<RecordType, Path<RecordType>>)
              }
            />
          </FormItem>
        );
      }}
      control={control}
    />
  );
};
