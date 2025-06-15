import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  registerUser,
  loginUser,
  logoutUser,
  googleSignIn,
} from "./authmethods";


// Register
export const handleRegister = createAsyncThunk(
  "auth/register",
  async ({ email, password }, thunkAPI) => {
    try {
      const res = await registerUser(email, password);
      return res.user;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

// Login
export const handleLogin = createAsyncThunk(
  "auth/login",
  async ({ email, password }, thunkAPI) => {
    try {
      const res = await loginUser(email, password);
      return res.user;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

// Google Login
export const handleGoogleLogin = createAsyncThunk(
  "auth/googleLogin",
  async (_, thunkAPI) => {
    try {
      const res = await googleSignIn();
      return res.user;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

// Logout
export const handleLogout = createAsyncThunk(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      await logoutUser();
      return null;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);


const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(handleRegister.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(handleRegister.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(handleRegister.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Login
      .addCase(handleLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(handleLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(handleLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Google Login
      .addCase(handleGoogleLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(handleGoogleLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(handleGoogleLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Logout
      .addCase(handleLogout.fulfilled, (state) => {
        state.user = null;
        state.error = null;
        state.loading = false;
      });
  },
});


export default authSlice.reducer;
