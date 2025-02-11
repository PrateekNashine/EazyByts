import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlices.js";
import forgotResetPasswordSlice from "./slices/forgotResetPasswordSlices.js";
import messageSlice from "./slices/messagesSlices.js";
import timelineSlice from "./slices/timelineSlices.js";
import skillSlice from "./slices/skillSlices.js";
import projectSlice from "./slices/projectSlices.js";

export const store = configureStore({
  reducer: {
    user: userSlice,
    forgotPassword: forgotResetPasswordSlice,
    messages: messageSlice,
    timelines: timelineSlice,
    skill: skillSlice,
    project: projectSlice,
  },
});
