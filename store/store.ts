import { create } from "zustand";

type StoreType = {
  isSearchOpen: boolean;
  isResponsiveMenu: boolean;
  handleSearch: () => void;
  handleResponsiveMenu: () => void;
};

export const useStore = create<StoreType>((set) => ({
  isSearchOpen: false,
  isResponsiveMenu: false,
  handleSearch: () =>
    set((state) => ({
      isSearchOpen: !state.isSearchOpen,
    })),
  handleResponsiveMenu: () =>
    set((state) => ({
      isResponsiveMenu: !state.isResponsiveMenu,
    })),
}));
