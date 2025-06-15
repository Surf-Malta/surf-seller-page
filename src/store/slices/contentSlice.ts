import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ref, onValue, set } from "firebase/database";
import { realtimeDb } from "@/lib/firebase";

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
    return new Promise<NavItemContent>((resolve, reject) => {
      if (!realtimeDb) {
        reject(new Error("Firebase not initialized"));
        return;
      }

      const contentRef = ref(realtimeDb, "nav_items_content");
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
    });
  }
);

export const saveContent = createAsyncThunk(
  "content/saveContent",
  async (content: NavItemContent) => {
    if (!realtimeDb) {
      throw new Error("Firebase not initialized");
    }

    await set(ref(realtimeDb, "nav_items_content"), content);
    return content;
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
