import { create } from 'zustand';

type CurrentStore = {
  storeId?: string;
  setStoreId: (storeId?: string) => void;
  currentView: 'ALL' | 'STORE';
  setCurrentView: (currentView: 'ALL' | 'STORE') => void;
};

export const useCurrentStore = create<CurrentStore>((set, get) => ({
  storeId: undefined,
  setStoreId: (id?: string) => set({ storeId: id }),
  currentView: 'ALL',
  setCurrentView: (currentView: 'ALL' | 'STORE') =>
    set({ currentView: currentView }),
}));
