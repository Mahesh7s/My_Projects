import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getDatabase, ref, set, get } from "firebase/database";

// Thunk to add a new workout for a user
export const addWorkout = createAsyncThunk(
  "workout/addWorkout",
  async (workout, { getState, rejectWithValue }) => {
    try {
      const db = getDatabase();
      const { auth } = getState();

      if (!auth.user) {
        return rejectWithValue("Not authenticated.");
      }

      await set(
        ref(db, `workouts/${auth.user.uid}/${Date.now()}`),
        workout
      );

      return workout;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk to fetch user's workouts
export const fetchWorkouts = createAsyncThunk(
  "workout/fetchWorkouts",
  async (userId, { rejectWithValue }) => {
    try {
      const db = getDatabase();

      const snapshot = await get(ref(db, `workouts/${userId}`));

      if (snapshot.exists()) {
        return Object.entries(snapshot.val()).map(([id, workout]) => ({
          id,
          ...workout,
        }));
      } else {
        return []; // no workouts
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const workoutSlice = createSlice({ 
  name: "workout",
  initialState: { workouts: [], loading: false, error: '' },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addWorkout.pending, (state) => {
        state.loading = true;
      })
      .addCase(addWorkout.fulfilled, (state, action) => {
        state.loading = false;
        state.workouts.push(action.payload);
      })
      .addCase(addWorkout.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(fetchWorkouts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchWorkouts.fulfilled, (state, action) => {
        state.loading = false;
        state.workouts = action.payload;
      })
      .addCase(fetchWorkouts.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

// export for use
export default workoutSlice.reducer;

