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

// 기존 리듀서를 생각해보면 현재 state의 값을 바로 바꾸지않고 concat, assign등을 사용하여 복사하고 그 복사한 state를 리턴해줬는데, createSlice의 리듀서 안에서는 불변성을 직접 작업해주기 떄문에 바로 state에 접근이 가능합니다.
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
