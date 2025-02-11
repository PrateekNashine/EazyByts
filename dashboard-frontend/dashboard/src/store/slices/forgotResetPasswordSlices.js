import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const forgotResetPasswordSlice = createSlice({
  name: "forgotPassword",
  initialState: {
    loading: false,
    error: null,
    message: null,
  },
  reducers: {
    forgotPasswordRequest(state, action) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    forgotPasswordSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload;
    },
    forgotPasswordFail(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    resetPasswordRequest(state, action) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    resetPasswordSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload;
    },
    resetPasswordFail(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    clearAllErrors(state, action) {
      state.error = null;
      state = state;
    },
  },
});

export const forgotPassword = (email) => async (dispatch) => {
  dispatch(forgotResetPasswordSlice.actions.forgotPasswordRequest());
  try {
    const { data } = await axios.post(
      "http://localhost:4000/api/user/password/forget",
      { email },
      { withCredentials: true, headers: { "Content-Type": "application/json" } }
    );
    dispatch(
      forgotResetPasswordSlice.actions.forgotPasswordSuccess(data.message)
    );
    dispatch(forgotResetPasswordSlice.actions.clearAllPasswordError());
  } catch (error) {
    dispatch(
      forgotResetPasswordSlice.actions.forgotPasswordFail(error.response.data.message)
    );
  }
};

export const resetPassword =
  (token, password, confirmPassword) => async (dispatch) => {
    dispatch(forgotResetPasswordSlice.actions.resetPasswordRequest());
    try {
      const { data } = await axios.put(
        `http://localhost:4000/api/user/password/reset/${token}`,
        { password,confirmPassword },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      dispatch(
        forgotResetPasswordSlice.actions.resetPasswordSuccess(data.message)
      );
      dispatch(forgotResetPasswordSlice.actions.clearAllPasswordError());
    } catch (error) {
      dispatch(
        forgotResetPasswordSlice.actions.resetPasswordFail(error.response.data.message)
      );
    }
  };

export const clearAllPasswordError = () => (dispatch) => {
  dispatch(forgotResetPasswordSlice.actions.clearAllErrors());
};

export default forgotResetPasswordSlice.reducer;
