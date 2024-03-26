import React from 'react';
import { Button, Layout, Result } from 'antd';
import { useNavigate } from '@tanstack/react-router';
import ThemeProvider from '@ui/components/theme-provider';

function PageNotFound() {
  const navigate = useNavigate();
  return (
    <ThemeProvider>
      <Layout className="flex h-dvh w-full items-center justify-center">
        <Result
          status="404"
          title="404"
          subTitle="Sorry, the page you visited does not exist."
          extra={
            <Button
              type="primary"
              onClick={() =>
                navigate({
                  to: '/',
                })
              }
            >
              Go Back Home
            </Button>
          }
        />
      </Layout>
    </ThemeProvider>
  );
}

export default PageNotFound;
