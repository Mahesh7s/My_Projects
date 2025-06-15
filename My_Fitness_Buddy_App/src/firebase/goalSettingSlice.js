// src/redux/goalSettingSlice.jsx

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getDatabase, ref, set, get } from "firebase/database";
import { app } from "./firebaseConfig";

const db = getDatabase(app);

// Thunk to fetch goals for a particular user
export const fetchGoals = createAsyncThunk(
  "goals/fetchGoals",
  async (uid, { rejectWithValue }) => {
    try {
      const snapshot = await get(ref(db, `goals/${uid}`));

      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        return []; // If there are no goals
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk to save a new goal for a particular user
export const saveGoal = createAsyncThunk(
  "goals/saveGoal",
  async ({ uid, goal }, { rejectWithValue, dispatch }) => {
    try {
      // First fetch the existing goals
      const snapshot = await get(ref(db, `goals/${uid}`));

      let goals = snapshot.exists()
        ? snapshot.val()
        : [];

      goals.push(goal);

      // Now save back to firebase
      await set(ref(db, `goals/${uid}`), goals);

      // Dispatch fetch to refresh state
      dispatch(fetchGoals(uid));

      return goals;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  goals: [],
  loading: false,
  error: null,
};

const goalSettingSlice = createSlice({  
  name: "goalSetting",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGoals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGoals.fulfilled, (state, action) => {
        state.goals = action.payload;
        state.loading = false;
      })
      .addCase(fetchGoals.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(saveGoal.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveGoal.fulfilled, (state, action) => {
        state.goals = action.payload;
        state.loading = false;
      })
      .addCase(saveGoal.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

// Export the reducer to add to store
export default goalSettingSlice.reducer;
