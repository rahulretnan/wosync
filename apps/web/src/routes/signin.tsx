import { createRoute, useNavigate } from '@tanstack/react-router';
import { authLayoutRoute } from './_auth.layout';
import { Flex } from 'antd';
import { SigninFormSchema } from '@ui/validations/signin-form.schema';
import useAntd from '@ui/hooks/use-antd';
import { useAuthenticationStatus, useSignInEmailPassword } from '@nhost/react';
import { useEffect } from 'react';
import Loader from '@ui/components/utilities/loader';
import SigninForm from '@ui/components/auth/signin-form';

export const signinRoute = createRoute({
  path: '/signin',
  component: SignIn,
  getParentRoute: () => authLayoutRoute,
});

function SignIn() {
  const { message } = useAntd();
  const navigate = useNavigate();
  const search: {
    redirect: string | undefined;
  } = signinRoute.useSearch();

  const { isLoading: isAuthLoading } = useAuthenticationStatus();

  const {
    signInEmailPassword,
    needsEmailVerification,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useSignInEmailPassword();

  useEffect(() => {
    if (needsEmailVerification) {
      message.warning('Please verify your email');
    }
    if (isError) {
      message.error(error?.message);
    }
    if (isSuccess) {
      navigate({
        to: search.redirect ?? '/',
        replace: true,
      });
    }
  }, [
    needsEmailVerification,
    isSuccess,
    isError,
    error,
    message,
    navigate,
    search,
  ]);

  const onSubmit = async ({
    email,
    password,
    rememberMe,
  }: SigninFormSchema) => {
    await signInEmailPassword(email, password);
    if (rememberMe) {
      localStorage.setItem('email', email);
    } else {
      localStorage.removeItem('email');
    }
  };

  return (
    <Loader loading={isAuthLoading}>
      <Flex align="center" justify="center" className="w-full h-full">
        <SigninForm onSubmit={onSubmit} isLoading={isLoading} />
      </Flex>
    </Loader>
  );
}
