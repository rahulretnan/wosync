import React from 'react';
import { App, ConfigProvider, theme } from 'antd';
import { useTheme } from '../stores/theme.store';

type ThemeProviderProps = {
  children: React.ReactNode;
};

function ThemeProvider({ children }: ThemeProviderProps) {
  const { theme: systemTheme } = useTheme();
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#e50851',
        },
        components: {
          Layout: {
            triggerBg: '#e50851',
            algorithm: true,
          },
        },
        algorithm: [
          systemTheme === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm,
        ],
      }}
    >
      <App>{children}</App>
    </ConfigProvider>
  );
}

export default ThemeProvider;
