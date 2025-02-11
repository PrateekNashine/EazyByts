import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { clearAllMessageErrors, resetMessageSlice } from "./messagesSlices";

const projectSlice = createSlice({
  name: "project",
  initialState: {
    projects: [],
    loading: false,
    error: null,
    message: null,
  },
  reducers: {
    getAllProjectRequest(state, action) {
      state.projects = [];
      state.error = null;
      state.loading = true;
    },
    getAllProjectRequestSuccess(state, action) {
      state.projects = action.payload;
      state.error = null;
      state.loading = false;
    },
    getAllProjectRequestFail(state, action) {
      state.projects = state.projects;
      state.error = action.payload;
      state.loading = false;
    },
    addProjectRequest(state, action) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    addProjectRequestSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload;
    },
    addProjectRequestFail(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    deleteProjectRequest(state, action) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    deleteProjectRequestSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload;
    },
    deleteProjectRequestFail(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    updateProjectRequest(state, action) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    updateProjectRequestSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload;
    },
    updateProjectRequestFail(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    clearAllProjectErrors(state, action) {
      state.error = null;
      state.projects = state.projects;
    },
    resetProjectSlice(state, action) {
      state.error = null;
      state.message = null;
      state.projects = state.projects;
      state.loading = false;
    },
  },
});

export const getAllProject = () => async (dispatch) => {
  dispatch(projectSlice.actions.getAllProjectRequest());
  try {
    const { data } = await axios.get(
      "http://localhost:4000/api/project/viewall",
      { withCredentials: true }
    );
    dispatch(projectSlice.actions.getAllProjectRequestSuccess(data.projects));
    dispatch(projectSlice.actions.clearAllProjectErrors());
  } catch (error) {
    dispatch(
      projectSlice.actions.getAllProjectRequestFail(error.response.data.message)
    );
  }
};

export const addNewProject = (newData) => async (dispatch) => {
  dispatch(projectSlice.actions.addProjectRequest());
  try {
    const { data } = await axios.post(
      "http://localhost:4000/api/project/add",
      newData,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    dispatch(projectSlice.actions.addProjectRequestSuccess(data.message));
    dispatch(projectSlice.actions.clearAllProjectErrors());
  } catch (error) {
    dispatch(
      projectSlice.actions.addProjectRequestFail(error.response.data.message)
    );
  }
};

export const deleteProject = (id) => async (dispatch) => {
  dispatch(projectSlice.actions.deleteProjectRequest());
  try {
    const { data } = await axios.delete(
      `http://localhost:4000/api/project/delete/${id}`,
      { withCredentials: true }
    );
    dispatch(projectSlice.actions.deleteProjectRequestSuccess(data.message));
    dispatch(projectSlice.actions.clearAllProjectErrors());
  } catch (error) {
    dispatch(
      projectSlice.actions.deleteProjectRequestFail(error.response.data.message)
    );
  }
};

export const updateProject = (id, newData) => async (dispatch) => {
  dispatch(projectSlice.actions.updateProjectRequest());
  try {
    const { data } = await axios.put(
      `http://localhost:4000/api/project/update/${id}`,
      newData,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    dispatch(projectSlice.actions.updateProjectRequestSuccess(data.message));
    dispatch(projectSlice.actions.clearAllProjectErrors());
  } catch (error) {
    dispatch(
      projectSlice.actions.updateProjectRequestFail(error.response.data.message)
    );
  }
};

export const clearAllProjectErrors = () => (dispatch) => {
  dispatch(projectSlice.actions.clearAllProjectErrors());
};

export const resetProjectSlice = () => (dispatch) => {
  dispatch(projectSlice.actions.resetProjectSlice());
};

export default projectSlice.reducer;
