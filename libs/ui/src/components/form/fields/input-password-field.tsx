import { CopyOutlined } from '@ant-design/icons';
import { Form, FormItemProps, Input, message } from 'antd';
import type { PasswordProps } from 'antd/es/input';
import copy from 'copy-to-clipboard';
import { ReactNode } from 'react';
import { Controller, Path, useFormContext } from 'react-hook-form';

export type InputPasswordFieldProps<RecordType extends object> =
  PasswordProps & {
    name: Path<RecordType>;
    label?: ReactNode;
    customHelp?: string;
    formItemProps?: FormItemProps;
    showCopy?: boolean;
    required?: boolean;
  };

const FormItem = Form.Item;

export const InputPasswordField = <RecordType extends object>({
  name,
  label,
  customHelp,
  formItemProps,
  showCopy = false,
  required,
  ...props
}: InputPasswordFieldProps<RecordType>) => {
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
            <Input.Password
              {...props}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              addonAfter={
                showCopy ? (
                  <CopyOutlined
                    className="cursor-pointer hover:text-[#e43b07]"
                    onClick={() => {
                      copy(value);
                      message.success('Copied password to clipboard');
                    }}
                  />
                ) : null
              }
            />
          </FormItem>
        );
      }}
      control={control}
    />
  );
};
