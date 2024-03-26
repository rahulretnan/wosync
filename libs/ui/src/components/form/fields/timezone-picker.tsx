import { Form, FormItemProps, Select, SelectProps } from 'antd';
import { ReactNode } from 'react';
import { Controller, Path, PathValue, useFormContext } from 'react-hook-form';
import { timezones } from '../utils/timezones';

export interface TimezonePickerProps<RecordType extends object>
  extends SelectProps {
  name: Path<RecordType>;
  label: ReactNode;
  customHelp?: string;
  formItemProps?: FormItemProps;
  required?: boolean;
}

const FormItem = Form.Item;
const options = timezones.map((timezone) => {
  return {
    label: timezone?.label,
    value: timezone?.tzCode,
  };
});
export const TimezonePicker = <RecordType extends object>({
  name,
  label,
  customHelp,
  formItemProps,
  required,
  ...props
}: TimezonePickerProps<RecordType>) => {
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
              defaultValue={
                'Europe/Dublin' as PathValue<RecordType, Path<RecordType>>
              }
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              options={options}
              showSearch
            />
          </FormItem>
        );
      }}
      control={control}
    />
  );
};
