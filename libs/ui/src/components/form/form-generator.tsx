import { FC } from 'react';
import { Form } from './form';
import { InputField } from './fields/input-field';
import { InputNumberField } from './fields/input-number-field';
import { AutoCompleteField } from './fields/auto-complete-field';
import { CheckboxField } from './fields/checkbox-field';
import { CheckBoxGroupField } from './fields/checkbox-group-field';
import { DatePickerField } from './fields/date-picker-field';
import { ImageUploaderField } from './fields/image-upload-field';
import { InputPasswordField } from './fields/input-password-field';
import { InputTextAreaField } from './fields/input-textarea-field';
import { PhoneField } from './fields/phone-field';
import { ProfileImageUploadField } from './fields/profile-image-upload-field';
import { RadioGroupField } from './fields/radio-group-field';
import { RangePickerField } from './fields/range-picker-field';
import { SelectField } from './fields/select-field';
import { SwitchField } from './fields/switch-field';
import { TagField } from './fields/tag-field';
import { TimePickerField } from './fields/time-picker-field';
import { TimezonePicker } from './fields/timezone-picker';
import { Button, Flex } from 'antd';
import {
  FieldComponentMapping,
  FieldMapping,
  FormGeneratorProps,
} from './types';

function FormGenerator<T extends object>({
  form,
  onSubmit,
  fields,
  layout = 'vertical',
  rows = 1,
  submitText = 'Submit',
  submitButtonProps,
  buttonRender,
  alignButton = 'left',
  formClassName,
}: FormGeneratorProps<T>) {
  const fieldMap: FieldComponentMapping = {
    autoComplete: AutoCompleteField,
    checkbox: CheckboxField,
    checkboxGroup: CheckBoxGroupField,
    datePicker: DatePickerField,
    imageUpload: ImageUploaderField,
    input: InputField,
    inputNumber: InputNumberField,
    inputPassword: InputPasswordField,
    inputTextArea: InputTextAreaField,
    phoneInput: PhoneField,
    profileImageUpload: ProfileImageUploadField,
    radio: RadioGroupField,
    radioGroup: RadioGroupField,
    rangePicker: RangePickerField,
    select: SelectField,
    switch: SwitchField,
    tagInput: TagField,
    timePicker: TimePickerField,
    timezonePicker: TimezonePicker,
  };
  const gridTemplateColumns = `repeat(${rows}, 1fr)`;
  const justifyButton = {
    left: 'flex-start',
    right: 'flex-end',
    center: 'center',
  };

  return (
    <Form
      form={form}
      onSubmit={onSubmit}
      layout={layout}
      className={formClassName}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns,
          gap: '5px',
        }}
      >
        {fields.map((field, i) => {
          const FieldComponent = fieldMap[field.type] as FC<
            FieldMapping<T>[keyof FieldMapping<T>]
          >;
          return FieldComponent ? (
            <div key={i}>
              <FieldComponent {...field.props} />
            </div>
          ) : null;
        })}
      </div>
      {buttonRender ? (
        buttonRender
      ) : (
        <Flex justify={justifyButton[alignButton]}>
          <Button {...submitButtonProps} htmlType="submit">
            {submitText}
          </Button>
        </Flex>
      )}
    </Form>
  );
}

export default FormGenerator;
