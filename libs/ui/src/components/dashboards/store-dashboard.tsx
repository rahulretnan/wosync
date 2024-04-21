import React from 'react';
import { Card, Statistic } from 'antd';

const StoreDashboard = () => {
  return (
    <Card>
      <div className="flex justify-around items-center flex-wrap">
        <Statistic title="Total Stores" value={112893} />
        <Statistic title="Total Team Members" value={112893} />
        <Statistic title="Total Revenue" value={112893} />
        <Statistic title="Total Loss" value={112893} />
      </div>
    </Card>
  );
};

export default StoreDashboard;
