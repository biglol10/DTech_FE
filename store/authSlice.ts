import { createSlice } from '@reduxjs/toolkit';

interface IInitialState {
	[name: string]: null | string;
}

const initialState: IInitialState = {
	userId: '',
	userName: '',
	userTeamCD: '',
	userTitle: '',
	userPhoneNo: '',
	userDetail: '',
	userProfile: '',
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
			state.userId = action.payload.userId || '';
			state.userName = action.payload.userName || '';
			state.userTeamCD = action.payload.userTeamCD || '';
			state.userTitle = action.payload.userTitle || '';
			state.userPhoneNo = action.payload.userPhoneNo || '';
			state.userDetail = action.payload.userDetail || '';
			state.userProfile = action.payload.userProfile || '';
			state.userGitHub = action.payload.userGitHub || '';
			state.userDomain = action.payload.userDomain || '';
			state.userProject = action.payload.userProject || '';
			state.userEmail = action.payload.userEmail || '';
			state.userToken = action.payload.userToken || '';
		},
		authReset(state) {
			state.userId = '';
			state.userName = '';
			state.userTeamCD = '';
			state.userTitle = '';
			state.userPhoneNo = '';
			state.userDetail = '';
			state.userProfile = '';
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
