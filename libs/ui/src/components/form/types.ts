import { ReactNode } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { InputField, InputFieldProps } from './fields/input-field';
import {
  InputNumberField,
  InputNumberFieldProps,
} from './fields/input-number-field';
import {
  AutoCompleteField,
  AutoCompleteFieldProps,
} from './fields/auto-complete-field';
import { CheckboxField, CheckboxFieldProps } from './fields/checkbox-field';
import {
  CheckBoxGroupField,
  CheckBoxGroupFieldProps,
} from './fields/checkbox-group-field';
import {
  DatePickerField,
  DatePickerFieldProps,
} from './fields/date-picker-field';
import {
  ImageUploaderField,
  ImageUploaderFieldProps,
} from './fields/image-upload-field';
import {
  InputPasswordField,
  InputPasswordFieldProps,
} from './fields/input-password-field';
import {
  InputTextAreaField,
  InputTextAreaFieldProps,
} from './fields/input-textarea-field';
import { PhoneField, PhoneFieldProps } from './fields/phone-field';
import {
  ProfileImageUploadField,
  ProfileImageUploadFieldProps,
} from './fields/profile-image-upload-field';
import {
  RadioGroupField,
  RadioGroupFieldProps,
} from './fields/radio-group-field';
import {
  RangePickerField,
  RangePickerFieldProps,
} from './fields/range-picker-field';
import { SelectField, SelectFieldProps } from './fields/select-field';
import { SwitchField, SwitchFieldProps } from './fields/switch-field';
import { TagField, TagFieldProps } from './fields/tag-field';
import {
  TimePickerField,
  TimePickerFieldProps,
} from './fields/time-picker-field';
import { TimezonePicker, TimezonePickerProps } from './fields/timezone-picker';
import { ButtonProps } from 'antd';

export type FieldMapping<RecordType extends object> = {
  autoComplete: AutoCompleteFieldProps<RecordType>;
  checkbox: CheckboxFieldProps<RecordType>;
  checkboxGroup: CheckBoxGroupFieldProps<RecordType>;
  datePicker: DatePickerFieldProps<RecordType>;
  imageUpload: ImageUploaderFieldProps<RecordType>;
  input: InputFieldProps<RecordType>;
  inputNumber: InputNumberFieldProps<RecordType>;
  inputPassword: InputPasswordFieldProps<RecordType>;
  inputTextArea: InputTextAreaFieldProps<RecordType>;
  phoneInput: PhoneFieldProps<RecordType>;
  profileImageUpload: ProfileImageUploadFieldProps<RecordType>;
  radio: RadioGroupFieldProps<RecordType>;
  radioGroup: RadioGroupFieldProps<RecordType>;
  rangePicker: RangePickerFieldProps<RecordType>;
  select: SelectFieldProps<RecordType>;
  switch: SwitchFieldProps<RecordType>;
  tagInput: TagFieldProps<RecordType>;
  timePicker: TimePickerFieldProps<RecordType>;
  timezonePicker: TimezonePickerProps<RecordType>;
};

type FieldConfig<RecordType extends object> = {
  [K in keyof FieldMapping<RecordType>]: {
    type: K;
    props: FieldMapping<RecordType>[K];
  };
};

export type FormGeneratorFieldProps<RecordType extends object> =
  FieldConfig<RecordType>[keyof FieldConfig<RecordType>];

export interface FormGeneratorProps<T extends object> {
  form: UseFormReturn<T>;
  onSubmit: (values: T) => void;
  layout?: 'vertical' | 'horizontal';
  fields: FormGeneratorFieldProps<T>[];
  rows?: number;
  submitButtonProps?: ButtonProps;
  submitText?: string;
  buttonRender?: ReactNode;
  alignButton?: 'left' | 'right' | 'center';
  formClassName?: string;
}

export type FieldComponentMapping = {
  autoComplete: typeof AutoCompleteField;
  checkbox: typeof CheckboxField;
  checkboxGroup: typeof CheckBoxGroupField;
  datePicker: typeof DatePickerField;
  imageUpload: typeof ImageUploaderField;
  input: typeof InputField;
  inputNumber: typeof InputNumberField;
  inputPassword: typeof InputPasswordField;
  inputTextArea: typeof InputTextAreaField;
  phoneInput: typeof PhoneField;
  profileImageUpload: typeof ProfileImageUploadField;
  radio: typeof RadioGroupField;
  radioGroup: typeof RadioGroupField;
  rangePicker: typeof RangePickerField;
  select: typeof SelectField;
  switch: typeof SwitchField;
  tagInput: typeof TagField;
  timePicker: typeof TimePickerField;
  timezonePicker: typeof TimezonePicker;
};
