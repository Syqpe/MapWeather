import {
    createSelector,
    createSlice,
    PayloadAction,
} from "@reduxjs/toolkit";

import { Region } from "react-native-maps";
import type { AppState } from "@app/store";

interface InitialState {
    loading: boolean;
    currentRegion: Region;
}

const initialState: InitialState = {
    loading: false,
    currentRegion: {
        latitude: 12,
        longitude: 12,
        latitudeDelta: 0.0022,
        longitudeDelta: 0.0221,
    },
};

export const mapSlice = createSlice({
    name: "map",
    initialState,
    reducers: {
        setLoading: (
            state,
            action: PayloadAction<boolean>,
        ) => {
            state.loading = action.payload;
        },
        setCurrentRegion: (
            state,
            action: PayloadAction<Region>,
        ) => {
            state.currentRegion = action.payload;
        },
    },
});

export const { setLoading, setCurrentRegion } =
    mapSlice.actions;

const selectLoadingFunc = (state: AppState) =>
    state.map.loading;
const selectCurrentRegionFunc = (state: AppState) =>
    state.map.currentRegion;

export const selectLoading = createSelector(
    selectLoadingFunc,
    loading => loading,
);
export const selectCurrentRegion = createSelector(
    selectCurrentRegionFunc,
    region => region,
);

export default mapSlice.reducer;
