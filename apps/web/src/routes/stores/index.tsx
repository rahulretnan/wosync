import { createRoute, Link } from '@tanstack/react-router';
import { authRoute } from '../_authenticated';
import Table from '@ui/components/custom-table/table';
import { Button } from 'antd';
import { faker } from '@faker-js/faker';

export const storesRoute = createRoute({
  path: '/stores',
  component: Stores,
  getParentRoute: () => authRoute,
});

const AddStoreButton = () => {
  return (
    <Link to="/stores/create">
      <Button type="primary">Add Store</Button>
    </Link>
  );
};

function Stores() {
  return (
    <div className="h-full w-full p-5">
      <Table
        dataSource={Array.from({ length: 100 }, (_, i) => ({
          key: faker.string.uuid(),
          name: faker.person.fullName(),
          age: faker.number.int({
            min: 18,
            max: 80,
          }),
          address: faker.location.streetAddress(),
        }))}
        columns={[
          {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text: string) => <a>{text}</a>,
            filterSearch: true,
          },
          {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
            responsive: ['sm'],
          },
          {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
            responsive: ['lg'],
          },
        ]}
        tableHeaderProps={{
          searchProps: {
            placeholder: 'Search by name',
            showSearch: true,
          },
          title: 'Stores',
          extra: <AddStoreButton />,
        }}
      />
    </div>
  );
}
