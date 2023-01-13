import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import auth from "./../../firebase.init";
import { toast } from "react-hot-toast";

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
        toast.error(err.message);
      });
    console.log("", data);
    return data.user.email;
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
        toast.error(err.message);
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
export const getUserDB = createAsyncThunk("auth/getUser", async (email) => {
  const res = await fetch(`http://localhost:5000/user/${email}`);
  const data = await res.json();
  console.log("", data);
  if (data.status) {
    return data;
  }
  return email;
});
export const authSlice = createSlice({
  initialState,
  name: "auth",
  reducers: {
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
      })
      .addCase(getUserDB.pending, (state) => {
        state.user = { email: "", role: "" };
        state.isLoading = true;
        state.isError = false;
        state.error = "";
      })
      .addCase(getUserDB.fulfilled, (state, { payload }) => {
        if (payload.status) {
          state.user = payload.data;
        } else {
          state.user.email = payload;
        }
        state.isLoading = false;
        state.isError = false;
        state.error = "";
      })
      .addCase(getUserDB.rejected, (state, action) => {
        state.user = { email: "", role: "" };
        state.isLoading = false;
        state.isError = false;
        state.error = action.error.message;
      });
  },
});

export const { signOutuser } = authSlice.actions;
export default authSlice.reducer;
