import React, { FC, useMemo } from 'react';
import { Button, Flex, Layout, Menu, Select, theme } from 'antd';
import type { ItemType, MenuItemType } from 'antd/lib/menu/hooks/useItems';
import { useStoresQuery } from '../../graphql/stores/stores.generated';
import { Link, useNavigate, useRouterState } from '@tanstack/react-router';
import { BuildingStorefrontIcon } from '@heroicons/react/24/outline';
import ComponentLoader from '../utilities/component-loader';
import { useCurrentStore } from '../../hooks/useCurrentStore';
import { useUserDefaultRole } from '@nhost/react';
import { concat } from 'lodash';
import validator from 'validator';

const { Sider } = Layout;

type SidebarProps = {
  menu: ItemType<MenuItemType>[];
};

function AddStoreButton() {
  return (
    <Link to={'/stores/create'}>
      <Button
        type="primary"
        icon={<BuildingStorefrontIcon className="size-4" />}
        className="w-full flex items-center justify-center"
      >
        Add Store
      </Button>
    </Link>
  );
}

const Sidebar: FC<SidebarProps> = ({ menu }) => {
  const role = useUserDefaultRole();
  const navigate = useNavigate();
  const { setCurrentView, setStoreId, storeId, currentView } =
    useCurrentStore();
  const {
    token: { colorBgContainer, controlHeightLG, borderRadiusLG },
  } = theme.useToken();
  const {
    location: { pathname },
  } = useRouterState();
  const parsedPathname = useMemo(
    () =>
      pathname
        .split('/')
        .map((path) => (validator.isBase64(path) ? atob(path) : path))
        .join('/'),
    [pathname],
  );
  const { data, loading } = useStoresQuery({
    fetchPolicy: 'network-only',
  });
  const storeSelectionOptions = data?.stores?.map((store) => ({
    value: store?.id,
    label: (
      <div className="flex items-center gap-2">
        <BuildingStorefrontIcon className="size-5" />
        {store?.name}
      </div>
    ),
  }));
  const isStoreOwner = role === 'store_owner';

  const options = isStoreOwner
    ? concat(
        [
          {
            value: 'ALL',
            label: (
              <div className="flex items-center gap-2">
                <BuildingStorefrontIcon className="size-5" />
                All Stores
              </div>
            ),
          },
        ],
        storeSelectionOptions ?? [],
      )
    : storeSelectionOptions;
  return (
    <Sider reverseArrow style={{ background: colorBgContainer }} width={250}>
      <div className="h-16 flex justify-center items-center">
        <ComponentLoader
          loading={loading}
          style={{
            height: controlHeightLG,
            borderRadius: borderRadiusLG,
            width: 240,
          }}
        >
          {(storeSelectionOptions ?? [])?.length > 0 ? (
            <Select
              defaultValue={options?.[0]?.value}
              value={currentView === 'ALL' ? 'ALL' : storeId}
              options={options}
              variant="borderless"
              size="large"
              style={{ width: 240 }}
              dropdownRender={(menu) => (
                <Flex gap={5} vertical>
                  <div>{menu}</div>
                  {isStoreOwner ? <AddStoreButton /> : null}
                </Flex>
              )}
              notFoundContent={null}
              onSelect={async (value) => {
                if (value === 'ALL') {
                  setCurrentView('ALL');
                  setStoreId(undefined);
                } else {
                  setCurrentView('STORE');
                  setStoreId(value as string);
                }
                await navigate({
                  to: '/',
                });
              }}
            />
          ) : (
            <div className="px-2">
              <AddStoreButton />
            </div>
          )}
        </ComponentLoader>
      </div>
      <Menu
        mode="inline"
        style={{ background: colorBgContainer }}
        defaultSelectedKeys={[parsedPathname]}
        selectedKeys={[parsedPathname]}
        items={menu}
      />
    </Sider>
  );
};

export default Sidebar;
