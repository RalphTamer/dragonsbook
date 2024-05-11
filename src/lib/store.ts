import { Session } from "next-auth";
import { create } from "zustand";

type Store = {
  user: Session["user"] | null;
};
export const useGlobalStore = create<Store>((set) => ({
  user: null,
}));

type NavStore = {
  showSlideoutMenu: boolean;
};
export const navStore = create<NavStore>((set) => ({
  showSlideoutMenu: false,
}));
