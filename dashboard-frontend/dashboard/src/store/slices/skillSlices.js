import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const skillSlice = createSlice({
  name: "skill",
  initialState: {
    loading: false,
    skills: [],
    error: null,
    message: null,
  },
  reducers: {
    getAllSkillsRequest(state, action) {
      state.skills = [];
      state.loading = true;
      state.error = null;
    },
    getAllSkillsRequestSuccess(state, action) {
      state.skills = action.payload;
      state.loading = false;
      state.error = null;
    },
    getAllSkillsRequestFail(state, action) {
      state.skills = state.skills;
      state.loading = false;
      state.error = action.payload;
    },
    addNewSkillRequest(state, action) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    addNewSkillRequestSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload;
    },
    addNewSkillRequestFail(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    deleteSkillRequest(state, action) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    deleteSkillRequestSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload;
    },
    deleteSkillRequestFail(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    updateSkillRequest(state, action) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    updateSkillRequestSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload;
    },
    updateSkillRequestFail(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    clearAllSkillsError(state, action) {
      state.error = null;
      state.skills = state.skills;
    },
    resetSkillsSlice(state, action) {
      state.error = null;
      state.loading = false;
      state.message = null;
      state.skills = state.skills;
    },
  },
});

export const getAllSkills = () => async (dispatch) => {
  dispatch(skillSlice.actions.getAllSkillsRequest());
  try {
    const { data } = await axios.get(
      "http://localhost:4000/api/skill/viewAll",
      { withCredentials: true }
    );
    dispatch(skillSlice.actions.getAllSkillsRequestSuccess(data.skills));
    dispatch(skillSlice.actions.clearAllSkillsError());
  } catch (error) {
    dispatch(
      skillSlice.actions.getAllSkillsRequestFail(error.response.data.message)
    );
  }
};

export const addNewSkill = (newSkillData) => async (dispatch) => {
  dispatch(skillSlice.actions.addNewSkillRequest());
  try {
    const { data } = await axios.post(
      "http://localhost:4000/api/skill/add",
      newSkillData,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    dispatch(skillSlice.actions.addNewSkillRequestSuccess(data.message));
    dispatch(skillSlice.actions.clearAllSkillsError());
  } catch (error) {
    dispatch(
      skillSlice.actions.addNewSkillRequestFail(error.response.data.message)
    );
  }
};

export const deleteSkill = (id) => async (dispatch) => {
  dispatch(skillSlice.actions.deleteSkillRequest());
  try {
    const { data } = await axios.delete(
      `http://localhost:4000/api/skill/delete/${id}`,
      { withCredentials: true }
    );
    dispatch(skillSlice.actions.deleteSkillRequestSuccess(data.message));
    dispatch(skillSlice.actions.clearAllSkillsError());
  } catch (error) {
    dispatch(
      skillSlice.actions.deleteSkillRequestFail(error.response.data.message)
    );
  }
};

export const updateSkill = (id, proficiency) => async (dispatch) => {
  dispatch(skillSlice.actions.updateSkillRequest());
  try {
    const { data } = await axios.put(
      `http://localhost:4000/api/skill/update/${id}`,
      { proficiency },
      { withCredentials: true, headers: { "Content-Type": "application/json" } }
    );
    dispatch(skillSlice.actions.updateSkillRequestSuccess(data.message));
    dispatch(skillSlice.actions.clearAllSkillsError());
  } catch (error) {
    dispatch(
      skillSlice.actions.updateSkillRequestFail(error.response.data.message)
    );
  }
};

export const clearAllSkillsError = () => (dispatch) => {
  dispatch(skillSlice.actions.clearAllSkillsError());
};

export const resetSkillsSlice = () => (dispatch) => {
  dispatch(skillSlice.actions.resetSkillsSlice());
};

export default skillSlice.reducer;
