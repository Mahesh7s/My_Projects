// src/redux/weeklyProgressSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getDatabase, ref, set, get } from "firebase/database";
import { app } from "./firebaseConfig";

const db = getDatabase(app);

// Thunk to save weekly progress
export const saveWeeklyProgress = createAsyncThunk(
  "weeklyProgress/saveWeeklyProgress",
  async (payload, { rejectWithValue }) => {
    try {
      await set(ref(db, `weeklyProgress/${payload.uid}`), payload);
      return payload;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk to fetch weekly progress
export const fetchWeeklyProgress = createAsyncThunk(
  "weeklyProgress/fetchWeeklyProgress",
  async (uid, { rejectWithValue }) => {
    try {
      const snapshot = await get(ref(db, `weeklyProgress/${uid}`));

      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        return rejectWithValue("Weekly progress not found.");
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const weeklyProgressSlice = createSlice({ 
  name: "weeklyProgress",
  initialState: {
    progress: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(saveWeeklyProgress.pending, (state) => {
        state.loading = true;
      })
      .addCase(saveWeeklyProgress.fulfilled, (state, action) => {
        state.loading = false;
        state.progress = action.payload;
      })
      .addCase(saveWeeklyProgress.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(fetchWeeklyProgress.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchWeeklyProgress.fulfilled, (state, action) => {
        state.loading = false;
        state.progress = action.payload;
      })
      .addCase(fetchWeeklyProgress.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

// export actions if needed
export default weeklyProgressSlice.reducer;
