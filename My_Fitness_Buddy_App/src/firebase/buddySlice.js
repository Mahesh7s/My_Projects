import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getDatabase, ref, get } from "firebase/database";

// Thunk to match buddies based on goals and preferred workouts
export const matchBuddies = createAsyncThunk(
  "buddy/matchBuddies",
  async (currentUserId, { getState, rejectWithValue }) => {
    try {
      const db = getDatabase();

      // fetch all profiles
      const snapshot = await get(ref(db, "profiles"));
      const profiles = snapshot.val();

      // current user's profile
      const currentProfile = getState().profile.profile;

      // match with users with similar goals or preferred workouts
      const matchingBuddies = Object.entries(profiles)
        .filter(([uid, profile]) => {
          if (uid === currentUserId) return false;
          return (
            profile.goals === currentProfile.goals ||
            profile.location === currentProfile.location ||
            profile.preferredWorkouts.some((item) =>
              currentProfile.preferredWorkouts.includes(item)
            )
          );
        })
        .map(([uid, profile]) => ({
          uid,
          ...profile,
        }));

      return matchingBuddies;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const buddySlice = createSlice({ 
  name: "buddy",
  initialState: { matchingBuddies: [], loading: false, error: '' },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(matchBuddies.pending, (state) => {
        state.loading = true;
      })
      .addCase(matchBuddies.fulfilled, (state, action) => {
        state.loading = false;
        state.matchingBuddies = action.payload;
      })
      .addCase(matchBuddies.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

// export buddyReducer
export default buddySlice.reducer;

