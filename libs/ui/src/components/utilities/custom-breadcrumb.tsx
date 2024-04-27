import { Breadcrumb } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { Link, useRouterState } from '@tanstack/react-router';
import { ReactNode, useMemo } from 'react';
import validator from 'validator';

const HomeBreadCrumb = () => (
  <Link to="/">
    <HomeOutlined />
  </Link>
);

const capitalizeFirstLetter = (str: string) =>
  (str.charAt(0).toUpperCase() + str.slice(1)).replace('-', ' ');

function getBreadcrumbTitle(
  path: string,
  index: number,
  array: string[],
): ReactNode {
  const capitalizedTitle = capitalizeFirstLetter(path);

  if (index === 0) {
    return <HomeBreadCrumb />;
  } else if (array.length - 1 !== index) {
    return <Link to={getHrefFromPath(array, index)}>{capitalizedTitle}</Link>;
  }
  return capitalizedTitle;
}

function getHrefFromPath(array: string[], index: number): string | undefined {
  if (index !== array.length - 1) {
    return array.slice(0, index + 1).join('/');
  }
}

function CustomBreadcrumb() {
  const {
    location: { pathname },
  } = useRouterState();

  const paths = useMemo(
    () =>
      pathname === '/'
        ? []
        : pathname
            .split('/')
            .filter(
              (path) =>
                !validator.isUUID(validator.isBase64(path) ? atob(path) : path),
            )
            .map((path, index, array) => {
              return {
                title: getBreadcrumbTitle(path, index, array),
              };
            }),
    [pathname],
  );
  return <Breadcrumb items={paths} />;
}

export default CustomBreadcrumb;
