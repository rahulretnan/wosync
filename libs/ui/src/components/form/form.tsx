/* eslint-disable @typescript-eslint/no-empty-function */
import { Form as AntdForm, FormProps as AntdFormProps } from 'antd';
import { ReactNode } from 'react';
import { FormProvider, UseFormReturn } from 'react-hook-form';

export interface FormProps<RecordType extends object>
  extends Omit<AntdFormProps, 'form'> {
  form: UseFormReturn<RecordType>;
  antdForm?: AntdFormProps['form'];
  onSubmit?: (values: RecordType) => void;
  children: ReactNode;
}

export const Form = <RecordType extends object>({
  children,
  onSubmit = () => {},
  form,
  antdForm,
  ...props
}: FormProps<RecordType>) => {
  const { handleSubmit } = form;
  return (
    <FormProvider {...form}>
      <AntdForm {...props} form={antdForm} onFinish={handleSubmit(onSubmit)}>
        {children}
      </AntdForm>
    </FormProvider>
  );
};
