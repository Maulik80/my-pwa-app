import { create } from 'zustand';

interface NetworkStore {
  isOnline: boolean;
  wasOffline: boolean;
  setOnline: (online: boolean) => void;
}

export const useNetworkStore = create<NetworkStore>((set) => ({
  isOnline: typeof navigator !== 'undefined' ? navigator.onLine : true,
  wasOffline: false,

  setOnline: (online) =>
    set((state) => ({
      isOnline: online,
      wasOffline: online ? state.wasOffline : true,
    })),
}));
