import { Form, FormItemProps, Radio, RadioGroupProps } from 'antd';
import { ReactNode } from 'react';
import { Controller, Path, useFormContext } from 'react-hook-form';

export interface RadioGroupFieldProps<RecordType extends object>
  extends RadioGroupProps {
  name: Path<RecordType>;
  label: ReactNode;
  customHelp?: string;
  formItemProps?: FormItemProps;
  required?: boolean;
}

const FormItem = Form.Item;

export const RadioGroupField = <RecordType extends object>({
  name,
  label,
  options,
  customHelp,
  formItemProps,
  required,
  ...props
}: RadioGroupFieldProps<RecordType>) => {
  const { control } = useFormContext<RecordType>();

  return (
    <Controller
      name={name}
      control={control}
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
            <Radio.Group
              {...props}
              options={options}
              value={value}
              onChange={(e) => onChange(e.target.value)}
            />
          </FormItem>
        );
      }}
    />
  );
};
