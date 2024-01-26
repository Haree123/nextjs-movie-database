import { create } from "zustand";

type StoreType = {
  isSearchOpen: boolean;
  handleSearch: () => void;
};

export const useStore = create<StoreType>((set) => ({
  isSearchOpen: false,
  handleSearch: () =>
    set((state) => ({
      isSearchOpen: !state.isSearchOpen,
    })),
}));
