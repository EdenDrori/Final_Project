import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  counter: 0,
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    //collection of functions to setState
    add1(state) {
      state.counter = state.counter + 1;
    },
    add(state, action) {
      state.counter += +action.payload;
    },
    sub(state, action) {
      state.counter -= +action.payload;
    },
    mult(state, action) {
      state.counter *= +action.payload;
    },
    div(state, action) {
      state.counter /= +action.payload;
    },
  },
});

//export the set functions for the components to make use of the actions
export const counterActions = counterSlice.actions;

//in reducer we have all the necessary data to connect with the big pie
export default counterSlice.reducer;
