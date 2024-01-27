import React from 'react';
import type { MenuProps } from 'antd';
import { Avatar, Dropdown } from 'antd';
import { useSignOut, useUserAvatarUrl } from '@nhost/react';
import {
  MoonIcon,
  PowerIcon,
  SunIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import { useNavigate } from '@tanstack/react-router';
import { useTheme } from '../../stores/theme.store';

const ProfileMenu = () => {
  const avatarUrl = useUserAvatarUrl();
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const { signOut } = useSignOut();
  const items: MenuProps['items'] = [
    {
      key: 'profile',
      label: 'Profile',
      icon: <UserIcon className="w-4 h-4" />,
    },
    {
      key: 'theme',
      label: theme === 'light' ? 'Dark Mode' : 'Light Mode',
      icon:
        theme === 'light' ? (
          <SunIcon className="w-4 h-4" />
        ) : (
          <MoonIcon className="w-4 h-4" />
        ),
      onClick: async () =>
        theme === 'light' ? setTheme('dark') : setTheme('light'),
    },
    {
      key: 'logout',
      label: 'Logout',
      danger: true,
      icon: <PowerIcon className="w-4 h-4" />,
      onClick: async () => {
        await signOut();
        await navigate({
          to: '/signin',
        });
      },
    },
  ];

  return (
    <Dropdown
      menu={{ items }}
      placement="bottom"
      arrow
      className="cursor-pointer"
    >
      <Avatar
        src={avatarUrl ?? 'https://api.dicebear.com/7.x/miniavs/svg?seed=1'}
      />
    </Dropdown>
  );
};

export default ProfileMenu;
