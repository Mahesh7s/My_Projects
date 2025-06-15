// src/redux/fitnessLibrarySlice.jsx

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getDatabase, ref, set, get } from "firebase/database";
import { app } from "./firebaseConfig";

const db = getDatabase(app);

// Thunk to fetch fitness library content
export const fetchFitnessLibrary = createAsyncThunk(
  "fitnessLibrary/fetchFitnessLibrary",
  async (_, { rejectWithValue }) => {
    try {
      const snapshot = await get(ref(db, "fitnessLibrary"));
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        return []; // If there are no items
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk to add new fitness content
export const addFitnessContent = createAsyncThunk(
  "fitnessLibrary/addFitnessContent",
  async (item, { rejectWithValue, dispatch }) => {
    try {
      // First fetch the existing library
      const snapshot = await get(ref(db, "fitnessLibrary"));
      let library = snapshot.exists()
        ? snapshot.val()
        : [];

      library.push(item);

      // Now save back to firebase
      await set(ref(db, "fitnessLibrary"), library);

      // Dispatch fetch to refresh state
      dispatch(fetchFitnessLibrary());

      return library;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const fitnessLibrarySlice = createSlice({  
  name: "fitnessLibrary",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFitnessLibrary.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFitnessLibrary.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchFitnessLibrary.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(addFitnessContent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addFitnessContent.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(addFitnessContent.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

// Export the reducer to add to store
export default fitnessLibrarySlice.reducer;
