import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const timelineSlice = createSlice({
  name: "timelines",
  initialState: {
    loading: false,
    timeline: [],
    error: null,
    message: null,
  },
  reducers: {
    getAllTimelineRequest(state, action) {
      state.timeline = [];
      state.error = null;
      state.loading = true;
    },
    getAllTimelineRequestSuccess(state, action) {
      state.timeline = action.payload;
      state.error = null;
      state.loading = false;
    },
    getAllTimelineRequestFail(state, action) {
      state.timeline = state.timeline;
      state.error = action.payload;
      state.loading = false;
    },
    addTimelineRequest(state, action) {
      state.message = null;
      state.error = null;
      state.loading = true;
    },
    addTimelineRequestSuccess(state, action) {
      state.message = action.payload;
      state.error = null;
      state.loading = false;
    },
    addTimelineRequestFail(state, action) {
      state.message = state.message;
      state.error = action.payload;
      state.loading = false;
    },
    deleteTimelineRequest(state, action) {
      state.message = null;
      state.error = null;
      state.loading = true;
    },
    deleteTimelineRequestSuccess(state, action) {
      state.message = action.payload;
      state.error = null;
      state.loading = false;
    },
    deleteTimelineRequestFail(state, action) {
      state.message = state.message;
      state.error = action.payload;
      state.loading = false;
    },
    resetTimelineSlice(state, action) {
      state.error = null;
      state.timeline = state.timeline;
      state.message = null;
      state.loading = false;
    },
    clearAllTimelineErrors(state, action) {
      state.error = null;
      state.timeline = state.timeline;
    },
  },
});

export const getAllTimelines = () => async (dispatch) => {
  dispatch(timelineSlice.actions.getAllTimelineRequest());
  try {
    const { data } = await axios.get(
      "http://localhost:4000/api/timeline/viewall-timeline",
      { withCredentials: true }
    );
    dispatch(timelineSlice.actions.getAllTimelineRequestSuccess(data.timelines));
    dispatch(timelineSlice.actions.clearAllTimelineErrors());
  } catch (error) {
    dispatch(
      timelineSlice.actions.getAllTimelineRequestFail(
        error.response.data.message
      )
    );
  }
};

export const deleteTimeline = (id) => async (dispatch) => {
  dispatch(timelineSlice.actions.deleteTimelineRequest());
  try {
    const { data } = await axios.delete(
      `http://localhost:4000/api/timeline/delete/${id}`,
      { withCredentials: true }
    );
    dispatch(timelineSlice.actions.deleteTimelineRequestSuccess(data.message));
    dispatch(timelineSlice.actions.clearAllTimelineErrors());
  } catch (error) {
    dispatch(
      timelineSlice.actions.deleteTimelineRequestFail(
        error.response.data.message
      )
    );
  }
};

export const addTimeline = (newData) => async (dispatch) => {
  dispatch(timelineSlice.actions.addTimelineRequest());
  try {
    const { data } = await axios.post(
      `http://localhost:4000/api/timeline/add`,
      newData,
      { withCredentials: true, headers: { "Content-Type": "application/json" } }
    );
    dispatch(timelineSlice.actions.addTimelineRequestSuccess(data.message));
    dispatch(timelineSlice.actions.clearAllTimelineErrors());
  } catch (error) {
    
    console.log(error)
    dispatch(
      timelineSlice.actions.addTimelineRequestFail(
        error.response.data.message
      )
    );
  }
};

export const clearAllTimelineErrors = () => (dispatch) => {
  dispatch(timelineSlice.actions.clearAllTimelineErrors());
};

export const resetTimelineSlice = () => (dispatch) => {
  dispatch(timelineSlice.actions.resetTimelineSlice());
};

export default timelineSlice.reducer;
