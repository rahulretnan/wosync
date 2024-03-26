import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, FormItemProps, Input, InputProps, Tag } from 'antd';
import { ReactNode, useState } from 'react';
import { Controller, Path, PathValue, useFormContext } from 'react-hook-form';

export type TagFieldProps<RecordType extends object> = InputProps & {
  name: Path<RecordType>;
  label: ReactNode;
  formItemProps?: FormItemProps;
  placeholder?: string;
  customHelp?: ReactNode;
  required?: boolean;
  buttonLabel?: string;
};

const FormItem = Form.Item;
export const TagField = <RecordType extends object>({
  name,
  label,
  formItemProps,
  customHelp,
  required,
  buttonLabel,
  ...props
}: TagFieldProps<RecordType>) => {
  const [tag, setTag] = useState<string>();
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
            <Input
              {...props}
              className="mb-4"
              value={tag}
              onChange={(event) => setTag(event?.target.value)}
              readOnly={
                ((value as PathValue<RecordType, Path<RecordType>>) ?? [])
                  ?.length >= 3
              }
              addonAfter={
                <Button
                  data-cy="test_tag_submit"
                  disabled={
                    ((value as PathValue<RecordType, Path<RecordType>>) ?? [])
                      ?.length >= 3 || !tag
                  }
                  size="small"
                  onClick={() => {
                    const values = value || [];
                    onChange([...values, tag]);
                    setTag(undefined);
                  }}
                  type="text"
                  icon={<PlusOutlined />}
                >
                  {buttonLabel ?? 'Add'}
                </Button>
              }
            />
            <div className="flex flex-wrap justify-start">
              {((value as PathValue<RecordType, Path<RecordType>>) ?? [])?.map(
                (tag: string) => (
                  <Tag
                    key={tag}
                    color="blue"
                    closable
                    onClose={() =>
                      onChange(
                        (
                          (value as PathValue<RecordType, Path<RecordType>>) ??
                          []
                        )?.filter((entry: string) => entry !== tag),
                      )
                    }
                  >
                    {tag}
                  </Tag>
                ),
              )}
            </div>
          </FormItem>
        );
      }}
      control={control}
    />
  );
};
