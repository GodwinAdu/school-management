import { create } from "zustand";

interface useTermProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useTermModal = create<useTermProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
