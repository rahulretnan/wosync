import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import {
  signinFormSchema,
  SigninFormSchema,
} from '../../validations/signin-form.schema';
import { FormGeneratorFieldProps } from '../form/types';
import FormGenerator from '../form/form-generator';
import { Card } from 'antd';

type SigninFormProps = {
  onSubmit: (data: SigninFormSchema) => void;
  isLoading: boolean;
};
const SigninForm: FC<SigninFormProps> = ({ onSubmit, isLoading }) => {
  const form = useForm<SigninFormSchema>({
    defaultValues: {
      email: localStorage.getItem('email') || '',
      password: '',
      rememberMe: !!localStorage.getItem('email'),
    },
    resolver: signinFormSchema,
  });

  const fields: FormGeneratorFieldProps<SigninFormSchema>[] = [
    {
      type: 'input',
      props: {
        label: 'Email',
        name: 'email',
      },
    },
    {
      type: 'inputPassword',
      props: {
        label: 'Password',
        name: 'password',
      },
    },
    {
      type: 'checkbox',
      props: {
        children: 'Remember me',
        name: 'rememberMe',
      },
    },
  ];
  return (
    <Card className="w-96">
      <FormGenerator
        form={form}
        onSubmit={onSubmit}
        fields={fields}
        rows={1}
        submitButtonProps={{
          type: 'primary',
          loading: form.formState.isSubmitting || isLoading,
        }}
        alignButton={'center'}
        submitText="Sign In"
      />
    </Card>
  );
};

export default SigninForm;
