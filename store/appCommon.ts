import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
    currentRoute: 'dashboard',
}

const appCommonSlice = createSlice({
    name: 'appCommon',
    initialState,
    reducers: {
        setCurrentRoute(state, action: PayloadAction<string>){
            state.currentRoute = action.payload;
        },
    },
})

export const { setCurrentRoute } = appCommonSlice.actions;
export default appCommonSlice.reducer;