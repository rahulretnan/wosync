import React, { Dispatch, SetStateAction, useMemo } from 'react';
import { Button, Typography } from 'antd';
import { Link } from '@tanstack/react-router';
import { ProductOutlined } from '@ant-design/icons';
import { APP_URL, FUNCTION_URL } from '../../config';

interface ConnectIntegrationFormProps {
  setCurrent: Dispatch<SetStateAction<number>>;
  store?: { id: string; website: string; name: string };
}

const ConnectIntegrationButton = ({ store }: ConnectIntegrationFormProps) => {
  const woocommerceAppLink = useMemo(() => {
    const baseLink = `${store?.website}/wc-auth/v1/authorize`;
    const params = {
      app_name: store?.name as string,
      scope: 'read_write',
      user_id: store?.id as string,
      return_url: `${APP_URL}/stores/integration/success`,
      callback_url: FUNCTION_URL,
    };
    const url = new URL(baseLink);
    const urlParams = new URLSearchParams(params);
    url.search = urlParams.toString();

    return url.toString();
  }, [store]);

  return (
    <div className="w-full flex flex-col justify-center items-center gap-4">
      <Link to={woocommerceAppLink}>
        <Button
          type="primary"
          icon={<ProductOutlined />}
          htmlType="submit"
          loading={false}
        >
          Connect your Woocommerce App
        </Button>
      </Link>
      <Typography.Text className="text-base">
        Please connect your Woocommerce enabled website.
      </Typography.Text>{' '}
      <Typography.Text className="text-base">
        You can <Link to={'/'}>skip</Link> this process and connect your
        woocommerce website later from the store details view
      </Typography.Text>
    </div>
  );
};
export default ConnectIntegrationButton;
