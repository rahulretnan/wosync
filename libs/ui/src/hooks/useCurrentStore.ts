import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type CurrentStore = {
  storeId?: string;
  setStoreId: (storeId?: string) => void;
  currentView: 'ALL' | 'STORE';
  setCurrentView: (currentView: 'ALL' | 'STORE') => void;
};

export const useCurrentStore = create(
  persist<CurrentStore>(
    (set, get) => ({
      storeId: undefined,
      setStoreId: (id?: string) => set({ storeId: id }),
      currentView: 'ALL',
      setCurrentView: (currentView: 'ALL' | 'STORE') =>
        set({ currentView: currentView }),
    }),
    {
      name: 'current-store',
    },
  ),
);
