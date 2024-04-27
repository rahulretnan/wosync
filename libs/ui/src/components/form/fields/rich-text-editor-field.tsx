import { OnChangeHTML } from '@remirror/react';
import { Form, type FormItemProps } from 'antd';
import classnames from 'classnames';
import type { ReactNode } from 'react';
import {
  Controller,
  type Path,
  PathValue,
  type UseFormReturn,
} from 'react-hook-form';
import { htmlToProsemirrorNode } from 'remirror';
import {
  WysiwygEditor,
  WysiwygEditorProps,
} from '../components/wysiwyg-editor';

export type RichTextEditorFieldProps<RecordType extends object> =
  WysiwygEditorProps & {
    name: Path<RecordType>;
    label?: ReactNode;
    customHelp?: string;
    formHook: UseFormReturn<RecordType>;
    formItemProps?: FormItemProps;
    required?: boolean;
    showShadow?: boolean;
    editorClassName?: string;
    initialValue?: string;
  };

const FormItem = Form.Item;

export const RichTextEditorField = <RecordType extends object>({
  name,
  label,
  formHook,
  customHelp,
  formItemProps,
  required,
  showShadow,
  editorClassName,
  initialValue,
  ...props
}: RichTextEditorFieldProps<RecordType>) => {
  const { control } = formHook;
  const classNames = classnames('rounded-lg bg-white', editorClassName, {
    shadow: showShadow,
  });
  return (
    <Controller
      name={name}
      render={({ field, fieldState }) => {
        const { onChange, value } = field;
        const { error } = fieldState;
        console.log({ initialValue, value });
        return (
          <FormItem
            {...formItemProps}
            required={required}
            label={label}
            validateStatus={error ? 'error' : 'validating'}
            help={
              <span className="text-xs lg:text-base">
                {error ? error?.message : customHelp ?? undefined}
              </span>
            }
          >
            <div className={classNames}>
              <WysiwygEditor
                {...props}
                stringHandler={htmlToProsemirrorNode}
                initialContent={initialValue ?? value}
              >
                <OnChangeHTML
                  onChange={(html: string) => {
                    onChange(html as PathValue<RecordType, Path<RecordType>>);
                  }}
                />
              </WysiwygEditor>
            </div>
          </FormItem>
        );
      }}
      control={control}
    />
  );
};
