import { DatePicker, Form, FormItemProps } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { ReactNode } from 'react';
import { Controller, Path, PathValue, useFormContext } from 'react-hook-form';
import {
  PickerProps,
  RangePickerProps,
} from 'antd/lib/date-picker/generatePicker/interface';

dayjs.extend(utc);

export type RangePickerFieldProps<RecordType extends object> =
  PickerProps<Dayjs> &
    RangePickerProps<Dayjs> & {
      name: Path<RecordType>;
      label: ReactNode;
      customHelp?: string;
      formItemProps?: FormItemProps;
      startDateName: Path<RecordType>;
      endDateName: Path<RecordType>;
      required?: boolean;
    };

const FormItem = Form.Item;

export const RangePickerField = <RecordType extends object>({
  name,
  label,
  customHelp,
  formItemProps,
  startDateName,
  endDateName,
  required,
  ...props
}: RangePickerFieldProps<RecordType>) => {
  const { control, setValue, getValues } = useFormContext<RecordType>();

  return (
    <Controller
      name={name}
      render={({ field, fieldState }) => {
        const { onChange, value } = field;
        const { error } = fieldState;
        const { startDate, endDate } = value || {};
        return (
          <FormItem
            {...formItemProps}
            required={required}
            label={label}
            validateStatus={error ? 'error' : 'validating'}
            help={error ? error?.message : customHelp || undefined}
          >
            <DatePicker.RangePicker
              {...props}
              onChange={(dates) => {
                const dateRange = {
                  startDate: dates?.[0],
                  endDate: dates?.[1],
                };
                onChange(dateRange as PathValue<RecordType, Path<RecordType>>);
                setValue(
                  startDateName,
                  dateRange.startDate as PathValue<
                    RecordType,
                    Path<RecordType>
                  >,
                );
                setValue(
                  endDateName,
                  dateRange.endDate as PathValue<RecordType, Path<RecordType>>,
                );
              }}
              value={[
                dayjs(startDate || getValues(startDateName)),
                dayjs(endDate || getValues(endDateName)),
              ]}
            />
          </FormItem>
        );
      }}
      control={control}
    />
  );
};
