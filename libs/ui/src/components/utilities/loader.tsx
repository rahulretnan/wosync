import React, { FC, ReactNode } from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { AnimatePresence, motion } from 'framer-motion';

interface LoaderProps {
  loading: boolean;
  children: ReactNode;
}

const Loader: FC<LoaderProps> = ({ loading, children }) => {
  return loading ? (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="w-screen h-screen"
      >
        <div className="flex h-full w-full items-center justify-center">
          <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
        </div>
      </motion.div>
    </AnimatePresence>
  ) : (
    children
  );
};

export default Loader;
