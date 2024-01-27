import React from 'react';
import { Layout, theme, Typography } from 'antd';
import ProfileMenu from './profile-menu';
import { useUserDisplayName } from '@nhost/react';

const { Header: AntdHeader } = Layout;

const Header = () => {
  const currentUserName = useUserDisplayName();
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <AntdHeader
      className="flex items-center justify-end gap-5"
      style={{ background: colorBgContainer }}
    >
      <Typography.Text>
        Welcome back, <span className="font-bold">{currentUserName}</span>
      </Typography.Text>
      <ProfileMenu />
    </AntdHeader>
  );
};

export default Header;