import React, { Dispatch, SetStateAction } from 'react';
import { Button, Typography } from 'antd';
import { useUserId } from '@nhost/react';
import useAntd from '../../hooks/use-antd';
import { CreateStoreValues } from '@shared/validations/create-store-form.schema';
import { Link } from '@tanstack/react-router';
import { ProductOutlined } from '@ant-design/icons';

interface ConnectIntegrationFormProps {
  setCurrent: Dispatch<SetStateAction<number>>;
}

const ConnectIntegrationForm = ({
  setCurrent,
}: ConnectIntegrationFormProps) => {
  const userId = useUserId();
  const { message } = useAntd();
  const onSubmit = async ({ website_url, name }: CreateStoreValues) => {
    try {
    } catch (e) {
      console.error(e);
      const error = e as Error;
      message.error(error.message);
    }
  };
  return (
    <div className="w-full flex flex-col justify-center items-center gap-4">
      <Button
        type="primary"
        icon={<ProductOutlined />}
        htmlType="submit"
        loading={false}
      >
        Connect your Woocommerce App
      </Button>
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
export default ConnectIntegrationForm;
