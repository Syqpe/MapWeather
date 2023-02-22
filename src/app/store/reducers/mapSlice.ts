import {
    createSelector,
    createSlice,
    PayloadAction,
} from "@reduxjs/toolkit";

import { Region } from "@localtypes/index";
import type { AppState } from "@app/store";

interface InitialState {
    loading: boolean;
    currentRegion: Region;

    regions: Array<Region>;
}

const initialState: InitialState = {
    loading: false,
    currentRegion: {
        latitude: 12,
        longitude: 12,
        latitudeDelta: 0.0022,
        longitudeDelta: 0.0221,
    },

    regions: [],
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
            state.currentRegion = Object.assign(
                {},
                state.currentRegion,
                action.payload,
            );
        },
        addRegion: (
            state,
            action: PayloadAction<Region>,
        ) => {
            const arr = state.regions;
            arr.push(action.payload);
            state.regions = arr;
        },
    },
});

export const { setLoading, setCurrentRegion, addRegion } =
    mapSlice.actions;

const selectLoadingFunc = (state: AppState) =>
    state.map.loading;
const selectCurrentRegionFunc = (state: AppState) =>
    state.map.currentRegion;
const selectRegionsFunc = (state: AppState) =>
    state.map.regions;

export const selectLoading = createSelector(
    selectLoadingFunc,
    loading => loading,
);
export const selectCurrentRegion = createSelector(
    selectCurrentRegionFunc,
    region => region,
);
export const selectRegions = createSelector(
    selectRegionsFunc,
    regions => regions,
);

export default mapSlice.reducer;
