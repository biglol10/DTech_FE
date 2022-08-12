import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// 현재 페이지 route
const initialState = {
	route: {
		currentRoute: 'dashboard',
	},
};

// const initialState_Metadata

const appCommonSlice = createSlice({
	name: 'appCommon',
	initialState,
	reducers: {
		setCurrentRoute(state, action: PayloadAction<string>) {
			state.route.currentRoute = action.payload;
		},
	},
});

export const { setCurrentRoute } = appCommonSlice.actions;
export default appCommonSlice.reducer;
