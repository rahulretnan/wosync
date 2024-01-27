import { Checkbox, CheckboxProps, Form, FormItemProps } from 'antd';
import { Controller, Path, PathValue, useFormContext } from 'react-hook-form';

export interface CheckboxFieldProps<RecordType extends object>
  extends CheckboxProps {
  name: Path<RecordType>;
  customHelp?: string;
  formItemProps?: FormItemProps;
  required?: boolean;
}

const FormItem = Form.Item;

export const CheckboxField = <RecordType extends object>({
  name,
  customHelp,
  formItemProps,
  children,
  required,
  ...props
}: CheckboxFieldProps<RecordType>) => {
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
            validateStatus={error ? 'error' : 'validating'}
            help={error ? error?.message : customHelp ?? undefined}
          >
            <Checkbox
              {...props}
              checked={value}
              onChange={(e) =>
                onChange(
                  e.target.checked as PathValue<RecordType, Path<RecordType>>,
                )
              }
            >
              {children}
            </Checkbox>
          </FormItem>
        );
      }}
      control={control}
    />
  );
};
