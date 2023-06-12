import User from "@Models/User";
import {createAction, createReducer} from "@reduxjs/toolkit";
import AppState from "@Models/AppState";

const initState: AppState = {

}
export const setUser = createAction<User>("SET_USER");
export const setToken = createAction<string>("SET_TOKEN");
export const removeToken = createAction("REMOVE_TOKEN");
export const removeUser = createAction("REMOVE_USER");

export default createReducer(initState, builder => {
    builder
        .addCase(setUser, (state, action) => {
            state.user = action.payload;
        })
        .addCase(setToken, (state, action) => {
            state.token = action.payload;
        })
});