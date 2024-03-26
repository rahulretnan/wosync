import React, { FC } from 'react';
import { Layout, Menu, theme, Typography } from 'antd';
import type { ItemType, MenuItemType } from 'antd/lib/menu/hooks/useItems';
import { useRouterState } from '@tanstack/react-router';

const { Sider } = Layout;

type SidebarProps = {
  menu: ItemType<MenuItemType>[];
};
const Sidebar: FC<SidebarProps> = ({ menu }) => {
  const {
    token: { colorBgContainer, colorPrimary },
  } = theme.useToken();
  const {
    location: { pathname },
  } = useRouterState();
  return (
    <Sider
      collapsible
      reverseArrow
      style={{ background: colorBgContainer }}
      breakpoint="lg"
    >
      <div className="h-16 flex justify-center items-center">
        <Typography.Text
          className="text-xl font-bold"
          style={{
            color: colorPrimary,
          }}
        >
          WoSync
        </Typography.Text>
      </div>
      <Menu
        mode="inline"
        style={{ background: colorBgContainer }}
        defaultSelectedKeys={[pathname]}
        items={menu}
      />
    </Sider>
  );
};

export default Sidebar;
