import React, { FC } from 'react';
import { Layout, theme, Typography } from 'antd';

const { Sider } = Layout;

type SidebarProps = {
  menu: any;
};
const Sidebar: FC<SidebarProps> = () => {
  const { token } = theme.useToken();
  return (
    <Sider
      collapsible
      reverseArrow
      style={{ background: token.colorBgContainer }}
    >
      <Typography.Text
        className="flex h-16 w-full min-w-20 items-center justify-center text-xl font-bold"
        style={{
          color: token.colorPrimary,
        }}
      >
        WoSync
      </Typography.Text>
    </Sider>
  );
};

export default Sidebar;
