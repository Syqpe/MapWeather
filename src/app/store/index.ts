import {
    configureStore,
    ThunkAction,
    Action,
} from "@reduxjs/toolkit";

import mapReducer from "./reducers/mapSlice";

export function makeStore() {
    return configureStore({
        reducer: {
            map: mapReducer,
        },
    });
}

const store = makeStore();

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    AppState,
    unknown,
    Action<string>
>;

export { store };
