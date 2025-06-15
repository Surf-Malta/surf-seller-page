import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ref, onValue, set, remove, push } from "firebase/database";
import { realtimeDb } from "@/lib/firebase";

interface NavigationItem {
  id: string;
  label: string;
  href: string;
  description: string;
  order: number;
}

interface NavigationState {
  items: NavigationItem[];
  isMobileMenuOpen: boolean;
  activeItem: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: NavigationState = {
  items: [],
  isMobileMenuOpen: false,
  activeItem: null,
  loading: false,
  error: null,
};

// Async thunks for Firebase operations
export const fetchNavigationItems = createAsyncThunk(
  "navigation/fetchItems",
  async () => {
    return new Promise<NavigationItem[]>((resolve, reject) => {
      if (!realtimeDb) {
        reject(new Error("Firebase not initialized"));
        return;
      }

      const navRef = ref(realtimeDb, "navigation_items");
      onValue(
        navRef,
        (snapshot) => {
          const items: NavigationItem[] = [];
          if (snapshot.exists()) {
            snapshot.forEach((childSnapshot) => {
              items.push({
                id: childSnapshot.key!,
                ...childSnapshot.val(),
              } as NavigationItem);
            });
          }
          items.sort((a, b) => a.order - b.order);
          resolve(items);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
);

export const saveNavigationItem = createAsyncThunk(
  "navigation/saveItem",
  async (item: NavigationItem) => {
    if (!realtimeDb) {
      throw new Error("Firebase not initialized");
    }

    if (item.id && item.id !== "new") {
      await set(ref(realtimeDb, `navigation_items/${item.id}`), {
        label: item.label,
        href: item.href,
        description: item.description,
        order: item.order,
      });
    } else {
      const newItemRef = push(ref(realtimeDb, "navigation_items"));
      await set(newItemRef, {
        label: item.label,
        href: item.href,
        description: item.description,
        order: item.order,
      });
      return { ...item, id: newItemRef.key! };
    }
    return item;
  }
);

export const deleteNavigationItem = createAsyncThunk(
  "navigation/deleteItem",
  async (itemId: string) => {
    if (!realtimeDb) {
      throw new Error("Firebase not initialized");
    }

    await remove(ref(realtimeDb, `navigation_items/${itemId}`));
    return itemId;
  }
);

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
    setNavigationItems: (state, action: PayloadAction<NavigationItem[]>) => {
      state.items = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNavigationItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNavigationItems.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchNavigationItems.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || "Failed to fetch navigation items";
      })
      .addCase(saveNavigationItem.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        } else {
          state.items.push(action.payload);
        }
        state.items.sort((a, b) => a.order - b.order);
      })
      .addCase(deleteNavigationItem.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
      });
  },
});

export const {
  toggleMobileMenu,
  closeMobileMenu,
  openMobileMenu,
  setActiveItem,
  setNavigationItems,
  clearError,
} = navigationSlice.actions;

export default navigationSlice.reducer;
