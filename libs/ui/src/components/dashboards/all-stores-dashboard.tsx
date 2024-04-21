import React from 'react';
import { Card, Statistic } from 'antd';
import StoreTable from '@ui/components/store/store-table';

const AllStoresDashboard = () => {
  return (
    <div className="flex flex-col gap-12">
      <Card>
        <div className="flex justify-around items-center flex-wrap">
          <Statistic title="Total Stores" value={112893} />
          <Statistic title="Total Team Members" value={112893} />
          <Statistic title="Total Revenue" value={112893} />
          <Statistic title="Total Loss" value={112893} />
        </div>
      </Card>
      <StoreTable showLess />
    </div>
  );
};

export default AllStoresDashboard;
