import React from 'react';
import { Flex, Layout, theme, Typography } from 'antd';
import ProfileMenu from './profile-menu';
import { useUserDisplayName } from '@nhost/react';
import CustomBreadcrumb from '../utilities/custom-breadcrumb';

const { Header: AntdHeader } = Layout;

const Header = () => {
  const currentUserName = useUserDisplayName();
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <AntdHeader
      className="flex items-center justify-between w-full px-5"
      style={{ background: colorBgContainer }}
    >
      <CustomBreadcrumb />

      <Flex align="center" gap={10}>
        <Typography.Text>
          Welcome back, <span className="font-bold">{currentUserName}</span>
        </Typography.Text>
        <ProfileMenu />
      </Flex>
    </AntdHeader>
  );
};

export default Header;
