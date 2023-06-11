import User from "@Models/User";
import {createAction, createReducer} from "@reduxjs/toolkit";
import AppState from "@Models/AppState";

const initState: AppState = {

}
export const setUser = createAction<User>("SET_USER");
export const setToken = createAction<string>("SET_TOKEN");

export default createReducer(initState, builder => {
    builder
        .addCase(setUser, (state, action) => {
            state.user = action.payload;
        })
        .addCase(setToken, (state, action) => {
            state.token = action.payload;
        })
});