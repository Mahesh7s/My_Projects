// src/redux/progressSharingSlice.jsx

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getDatabase, ref, set, get } from "firebase/database";
import { app } from "./firebaseConfig";

const db = getDatabase(app);

// Thunk to fetch progress sharing
export const fetchProgressSharing = createAsyncThunk(
  "progressSharing/fetchProgressSharing",
  async (_, { rejectWithValue }) => {
    try {
      const snapshot = await get(ref(db, "progressSharing"));
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        return []; // If there are no messages
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk to add new progress sharing
export const addProgressSharing = createAsyncThunk(
  "progressSharing/addProgressSharing",
  async (item, { rejectWithValue, dispatch }) => {
    try {
      // First fetch the existing messages
      const snapshot = await get(ref(db, "progressSharing"));
      let messages = snapshot.exists()
        ? snapshot.val()
        : [];

      messages.push(item);

      // Now save back to firebase
      await set(ref(db, "progressSharing"), messages);

      // Dispatch fetch to refresh state
      dispatch(fetchProgressSharing());

      return messages;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  messages: [],
  loading: false,
  error: null,
};

const progressSharingSlice = createSlice({  
  name: "progressSharing",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProgressSharing.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProgressSharing.fulfilled, (state, action) => {
        state.messages = action.payload;
        state.loading = false;
      })
      .addCase(fetchProgressSharing.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(addProgressSharing.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addProgressSharing.fulfilled, (state, action) => {
        state.messages = action.payload;
        state.loading = false;
      })
      .addCase(addProgressSharing.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

// Export the reducer to add to store
export default progressSharingSlice.reducer;
