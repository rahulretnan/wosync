import { Form, FormItemProps } from 'antd';
import { InputHTMLAttributes, ReactNode } from 'react';
import { Controller, Path, PathValue, useFormContext } from 'react-hook-form';
import { PhoneInput, PhoneInputProps } from 'react-international-phone';

export interface PhoneFieldProps<RecordType extends object>
  extends PhoneInputProps {
  name: Path<RecordType>;
  label?: ReactNode;
  customHelp?: string;
  formItemProps?: FormItemProps;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
  required?: boolean;
}

const FormItem = Form.Item;

export const PhoneField = <RecordType extends object>({
  name,
  label,
  customHelp,
  formItemProps,
  inputProps,
  required,
  ...props
}: PhoneFieldProps<RecordType>) => {
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
            <PhoneInput
              hideDropdown
              {...props}
              value={value}
              onChange={(phone, _country) =>
                onChange(phone as PathValue<RecordType, Path<RecordType>>)
              }
              inputProps={{
                ...inputProps,
                disabled: props.disabled,
                onBlur,
              }}
            />
          </FormItem>
        );
      }}
      control={control}
    />
  );
};

// Customisable style variables
// --react-international-phone-text-color
// --react-international-phone-selected-dropdown-item-text-color
// --react-international-phone-selected-dropdown-item-dial-code-color
// --react-international-phone-selected-dropdown-item-background-color
// --react-international-phone-height
// --react-international-phone-font-size
// --react-international-phone-dropdown-shadow
// --react-international-phone-dropdown-left
// --react-international-phone-dropdown-item-text-color
// --react-international-phone-dropdown-item-height
// --react-international-phone-dropdown-item-font-size
// --react-international-phone-dropdown-item-dial-code-color
// --react-international-phone-dropdown-item-background-color
// --react-international-phone-disabled-text-color
// --react-international-phone-disabled-country-selector-background-color
// --react-international-phone-disabled-country-selector-arrow-color
// --react-international-phone-disabled-background-color
// --react-international-phone-dial-code-preview-text-color
// --react-international-phone-dial-code-preview-font-size
// --react-international-phone-dial-code-preview-disabled-text-color
// --react-international-phone-dial-code-preview-disabled-background-color
// --react-international-phone-dial-code-preview-border-color
// --react-international-phone-dial-code-preview-background-color
// --react-international-phone-country-selector-border-color
// --react-international-phone-country-selector-background-color-hover
// --react-international-phone-country-selector-background-color
// --react-international-phone-country-selector-arrow-size
// --react-international-phone-country-selector-arrow-color
// --react-international-phone-border-radius
// --react-international-phone-border-color
// --react-international-phone-background-color
