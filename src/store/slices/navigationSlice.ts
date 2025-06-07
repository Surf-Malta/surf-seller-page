import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NavigationState } from "@/types";

const initialState: NavigationState = {
  isMobileMenuOpen: false,
  activeItem: null,
};

const navigationSlice = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    toggleMobileMenu: (state) => {
      state.isMobileMenuOpen = !state.isMobileMenuOpen;
    },
    closeMobileMenu: (state) => {
      state.isMobileMenuOpen = false;
    },
    openMobileMenu: (state) => {
      state.isMobileMenuOpen = true;
    },
    setActiveItem: (state, action: PayloadAction<string | null>) => {
      state.activeItem = action.payload;
    },
  },
});

export const {
  toggleMobileMenu,
  closeMobileMenu,
  openMobileMenu,
  setActiveItem,
} = navigationSlice.actions;

export default navigationSlice.reducer;
