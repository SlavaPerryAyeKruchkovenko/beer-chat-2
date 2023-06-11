import {combineReducers, configureStore} from "@reduxjs/toolkit";
import toolkitReducer from "@Helpers/toolkitRedux/toolkitReducer";

const rootReducer = combineReducers({
    toolkit: toolkitReducer
});

export const store = configureStore({
    reducer: rootReducer,
});
export type RootState = ReturnType<typeof store.getState>