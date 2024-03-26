import dayjs from 'dayjs';
import React from 'react';
import { Layout, theme } from 'antd';

const { Footer: AntdFooter } = Layout;

const Footer = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <AntdFooter
      className="flex h-12 items-center justify-center p-0"
      style={{ background: colorBgContainer }}
    >
      <div className="flex h-full items-center justify-center">
        <span className="text-sm text-gray-400">
          © {dayjs().year()} WoSync All rights reserved
        </span>
      </div>
    </AntdFooter>
  );
};

export default Footer;
