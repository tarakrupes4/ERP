import { createSlice } from "@reduxjs/toolkit";

export interface IsAddState{
    value: Boolean
}

const initialState: IsAddState={
    value:false,
}

export const isAddSlice = createSlice({
    name: 'isAdd',
    initialState,
    reducers: {
        openAdd: (state) => {
            state.value = true;
        },
        closeAdd: (state) => {
            state.value = false;
        }
    }
})

export const { openAdd, closeAdd } = isAddSlice.actions;

export default isAddSlice.reducer;