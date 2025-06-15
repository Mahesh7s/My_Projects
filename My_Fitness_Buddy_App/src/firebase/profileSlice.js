import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getDatabase, ref, set, get, onValue } from "firebase/database";

// Thunk to fetch profile
export const fetchProfile = createAsyncThunk(
  "profile/fetchProfile",
  async (uid, { rejectWithValue }) => {
    try {
      const db = getDatabase();
      const profileRef = ref(db, "profiles/" + uid);
      const snapshot = await get(profileRef);
      return snapshot.val() ?? { name: "", location: "", preferredWorkouts: [], goals: '' };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk to save profile
export const saveProfile = createAsyncThunk(
  "profile/saveProfile",
  async ({ uid, profile }, { rejectWithValue }) => {
    try {
      const db = getDatabase();
      await set(ref(db, "profiles/" + uid), profile);
      return profile;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const profileSlice = createSlice({ 
  name: "profile",
  initialState: { profile: null, loading: false, error: '' },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(saveProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(saveProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(saveProfile.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

// Export the profileReducer to combine in store
export default profileSlice.reducer;

