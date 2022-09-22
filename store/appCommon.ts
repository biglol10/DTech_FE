import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAppCommon } from '@utils/types/commAndStoreTypes';

// 현재 페이지 route
const initialState: IAppCommon = {
	route: {
		currentRoute: 'dashboard',
	},
	currentChatUser: '',
	unReadMsg: [],
};

const appCommonSlice = createSlice({
	name: 'appCommon',
	initialState,
	reducers: {
		setCurrentRoute(state, action: PayloadAction<string>) {
			state.route.currentRoute = action.payload;
		},
		setCurrentChatUser(state, action: PayloadAction<string>) {
			state.currentChatUser = action.payload;
		},
		setCurrentUnReadMsg(state, action: PayloadAction<string[]>) {
			state.unReadMsg = action.payload;
		},
	},
});

export const { setCurrentRoute, setCurrentChatUser, setCurrentUnReadMsg } = appCommonSlice.actions;
export default appCommonSlice.reducer;
