import React from 'react';
import { Button, Result } from 'antd';
import { NotFoundRoute, useNavigate } from '@tanstack/react-router';
import { rootRoute } from './__root';

export const notFoundRoute = new NotFoundRoute({
  component: PageNotFound,
  getParentRoute: () => rootRoute,
});

function PageNotFound() {
  const navigate = useNavigate();
  return (
    <div className="flex h-dvh w-full items-center justify-center">
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button
            type="primary"
            onClick={() =>
              navigate({
                to: '../',
              })
            }
          >
            Go Back
          </Button>
        }
      />
    </div>
  );
}
