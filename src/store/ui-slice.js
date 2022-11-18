import { createSlice } from "@reduxjs/toolkit";


const uiSlice = createSlice({
    initialState: {
        cartIsVisible : false,
        notificationStatus: null
    },
    name: "ui",
    reducers: {
      toggle(state) {
        state.cartIsVisible = !state.cartIsVisible;
      },
      showNotification(state,action){
        state.notificationStatus = {
          status: action.payload.status,
          title: action.payload.title,
          message: action.payload.message
        };
      }
}});

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;