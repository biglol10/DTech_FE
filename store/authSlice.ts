import { createSlice } from '@reduxjs/toolkit';
import { IAuth } from '@utils/types/commAndStoreTypes';

const initialState: IAuth = {
	userUID: '',
	userId: '',
	userName: '',
	userTeamCD: '',
	userTitle: '',
	userPhoneNo: '',
	userDetail: '',
	userProfileImg: '',
	userGitHub: '',
	userDomain: '',
	userProject: '',
	userEmail: '',
	userToken: '',
	userSocket: null,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		authSetting(state, action) {
			state.userUID = action.payload.userUID || '';
			state.userId = action.payload.userId || '';
			state.userName = action.payload.userName || '';
			state.userTeamCD = action.payload.userTeamCD || '';
			state.userTitle = action.payload.userTitle || '';
			state.userPhoneNo = action.payload.userPhoneNo || '';
			state.userDetail = action.payload.userDetail || '';
			state.userProfileImg = action.payload.userProfileImg || '';
			state.userGitHub = action.payload.userGitHub || '';
			state.userDomain = action.payload.userDomain || '';
			state.userProject = action.payload.userProject || '';
			state.userEmail = action.payload.userEmail || '';
			state.userToken = action.payload.userToken || '';
		},
		authReset(state) {
			state.userUID = '';
			state.userId = '';
			state.userName = '';
			state.userTeamCD = '';
			state.userTitle = '';
			state.userPhoneNo = '';
			state.userDetail = '';
			state.userProfileImg = '';
			state.userGitHub = '';
			state.userDomain = '';
			state.userProject = '';
			state.userEmail = '';
			state.userToken = '';
		},
		authSocket(state, action) {
			state.userSocket = action.payload || null;
		},
	},
});

export const { authSetting, authReset, authSocket } = authSlice.actions;
export default authSlice.reducer;
