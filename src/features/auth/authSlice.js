import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import auth from "./../../firebase.init";

const initialState = {
  user: { email: "", role: "" },
  isLoading: false,
  isError: false,
  error: "",
};

export const createAccount = createAsyncThunk(
  "auth/createAccount",
  async ({ email, password }) => {
    const data = await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        return userCredential.user;
      })
      .catch((err) => {
        console.log(err);
      });
    console.log("", data);
    return data.email;
  }
);
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }) => {
    const data = await signInWithEmailAndPassword(auth, email, password)
      .finally(() => {
        console.log("shhs");
      })
      .catch((err) => {
        console.log(err);
      });
    console.log("", data);
    return data.user.email;
  }
);
export const loginWithGoogle = createAsyncThunk(
  "auth/loginWithGoogle",
  async () => {
    const provider = new GoogleAuthProvider();
    const data = signInWithPopup(auth, provider);
    return data.user.email;
  }
);

export const authSlice = createSlice({
  initialState,
  name: "auth",
  reducers: {
    getUser: (state, { payload }) => {
      state.user = payload;
      state.isLoading = false;
      state.isError = false;
      state.error = "";
    },
    signOutuser: (state) => {
      state.user = { role: "", email: "" };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createAccount.pending, (state) => {
        state.user = { email: "", role: "" };
        state.isLoading = true;
        state.isError = false;
        state.error = "";
      })
      .addCase(createAccount.fulfilled, (state, { payload }) => {
        state.user = { email: payload, role: "" };
        state.isLoading = false;
        state.isError = false;
        state.error = "";
      })
      .addCase(createAccount.rejected, (state, action) => {
        state.user = { email: "", role: "" };
        state.isLoading = false;
        state.isError = false;
        state.error = action.error.message;
      })
      .addCase(loginUser.pending, (state) => {
        state.user = { email: "", role: "" };
        state.isLoading = true;
        state.isError = false;
        state.error = "";
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.user = { email: payload, role: "" };
        state.isLoading = false;
        state.isError = false;
        state.error = "";
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.user = { email: "", role: "" };
        state.isLoading = false;
        state.isError = false;
        state.error = action.error.message;
      })
      .addCase(loginWithGoogle.pending, (state) => {
        state.user = { email: "", role: "" };
        state.isLoading = true;
        state.isError = false;
        state.error = "";
      })
      .addCase(loginWithGoogle.fulfilled, (state, { payload }) => {
        state.user = payload;
        state.isLoading = false;
        state.isError = false;
        state.error = "";
      })
      .addCase(loginWithGoogle.rejected, (state, action) => {
        state.user = { email: "", role: "" };
        state.isLoading = false;
        state.isError = false;
        state.error = action.error.message;
      });
  },
});

export const { getUser, signOutuser } = authSlice.actions;
export default authSlice.reducer;
