import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const messageSlice = createSlice({
  name: "messages",
  initialState: {
    loading: false,
    messages: [],
    error: null,
    message: null,
  },
  reducers: {
    getAllMessagesRequest(state, action) {
      state.messages = [];
      state.error = null;
      state.loading = true;
    },
    getAllMessagesRequestSuccess(state, action) {
      state.messages = action.payload;
      state.error = null;
      state.loading = false;
    },
    getAllMessagesRequestFail(state, action) {
      state.messages = state.messages;
      state.error = action.payload;
      state.loading = false;
    },
    deleteMessageRequest(state, action) {
      state.message = null;
      state.error = null;
      state.loading = true;
    },
    deleteMessageRequestSuccess(state, action) {
      state.message = action.payload;
      state.error = null;
      state.loading = false;
    },
    deleteMessageRequestFail(state, action) {
      state.message = state.message;
      state.error = action.payload;
      state.loading = false;
    },
    resetMessageSlice(state, action) {
      state.error = null;
      state.messages = state.messages;
      state.message = null;
      state.loading = false;
    },
    clearAllMessageErrors(state, action) {
      state.error = null;
      state.messages = state.messages;
    },
  },
});

export const getAllMessages = () => async (dispatch) => {
  dispatch(messageSlice.actions.getAllMessagesRequest());
  try {
    const { data } = await axios.get(
      "http://localhost:4000/api/contact/message/viewall",
      { withCredentials: true }
    );
    dispatch(messageSlice.actions.getAllMessagesRequestSuccess(data.messages));
    dispatch(messageSlice.actions.clearAllMessageErrors());
  } catch (error) {
    dispatch(
      messageSlice.actions.getAllMessagesRequestFail(
        error.response.data.message
      )
    );
  }
};

export const deleteMessage = (id) => async (dispatch) => {
  dispatch(messageSlice.actions.deleteMessageRequest());
  try {
    const { data } = await axios.delete(
      `http://localhost:4000/api/contact/message/delete/${id}`,
      { withCredentials: true }
    );
    dispatch(messageSlice.actions.deleteMessageRequestSuccess(data.message));
    dispatch(messageSlice.actions.clearAllMessageErrors());
  } catch (error) {
    dispatch(
      messageSlice.actions.deleteMessageRequestFail(error.response.data.message)
    );
  }
};

export const clearAllMessageErrors = () => (dispatch) => {
  dispatch(messageSlice.actions.clearAllMessageErrors());
};

export const resetMessageSlice = () => (dispatch) => {
  dispatch(messageSlice.actions.resetMessageSlice());
};

export default messageSlice.reducer;
