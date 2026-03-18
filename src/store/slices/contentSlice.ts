import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { realtimeDb as getRealtimeDb } from "@/lib/firebase";

interface ContentHeading {
  id: string;
  title: string;
  order: number;
  content: string;
  isVisible: boolean;
  type: "text" | "hero" | "feature" | "pricing" | "testimonial" | "faq";
  imageUrl?: string;
  buttonText?: string;
  buttonLink?: string;
  price?: string;
  features?: string[];
}

interface PageContent {
  headings: ContentHeading[];
}

interface NavItemContent {
  [navItemId: string]: PageContent;
}

interface ContentState {
  navItemsContent: NavItemContent;
  loading: boolean;
  error: string | null;
}

const initialState: ContentState = {
  navItemsContent: {},
  loading: false,
  error: null,
};

// Async thunks for Firebase operations
export const fetchContent = createAsyncThunk(
  "content/fetchContent",
  async () => {
    return new Promise<NavItemContent>(async (resolve, reject) => {
      try {
        const db = await getRealtimeDb();
        if (!db) {
          reject(new Error("Firebase not initialized"));
          return;
        }

        const { ref, onValue } = await import("firebase/database");
        const contentRef = ref(db, "nav_items_content");
        onValue(
          contentRef,
          (snapshot) => {
            if (snapshot.exists()) {
              resolve(snapshot.val());
            } else {
              resolve({});
            }
          },
          (error) => {
            reject(error);
          }
        );
      } catch (error) {
        reject(error);
      }
    });
  }
);

export const saveContent = createAsyncThunk(
  "content/saveContent",
  async (content: NavItemContent) => {
    const db = await getRealtimeDb();
    if (!db) {
      throw new Error("Firebase not initialized");
    }

    try {
      const { ref, set } = await import("firebase/database");
      await set(ref(db, "nav_items_content"), content);
      return content;
    } catch (error) {
      throw error;
    }
  }
);

const contentSlice = createSlice({
  name: "content",
  initialState,
  reducers: {
    updateContentLocally: (state, action: PayloadAction<NavItemContent>) => {
      state.navItemsContent = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContent.fulfilled, (state, action) => {
        state.loading = false;
        state.navItemsContent = action.payload;
      })
      .addCase(fetchContent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch content";
      })
      .addCase(saveContent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveContent.fulfilled, (state, action) => {
        state.loading = false;
        state.navItemsContent = action.payload;
      })
      .addCase(saveContent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to save content";
      });
  },
});

export const { updateContentLocally, clearError } = contentSlice.actions;
export default contentSlice.reducer;
