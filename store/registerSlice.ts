import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	idInputValue: {
		idInputValue: '',
		idInputError: false,
		idInputErrMsg: 'blank',
		idConfirm: false,
	},
	nameInputValue: {
		nameInputValue: '',
		nameInputError: false,
	},
	pwInputValue: {
		pwInputValue: '',
		pwInputError: false,
		pwInputErrMsg: '',
	},
	pwInput2Value: {
		pwInput2Value: '',
		pwInput2Error: false,
		pwInput2ErrMsg: '',
	},
	teamSelectValue: {
		teamSelectValue: '',
		teamSelectError: false,
	},
	titleSelectValue: {
		titleSelectValue: '',
		titleSelectError: false,
	},
	phoneNumValue: {
		phoneNumValue: '',
		phoneNumError: false,
	},
	userDetailValue: {
		userDetailValue: '',
		userDetailError: false,
	},
	techSelectValue: {
		userTechValue: [],
	},
	userProfileImage: null,
};

const registerSlice = createSlice({
	name: 'register',
	initialState,
	reducers: {
		registerStep1(state, action) {
			state.idInputValue = action.payload.idInputValue;
			state.nameInputValue = action.payload.nameInputValue;
			state.pwInputValue = action.payload.pwInputValue;
			state.pwInput2Value = action.payload.pwInput2Value;
		},
		registerStep2(state, action) {
			state.teamSelectValue = action.payload.teamSelectValue || '';
			state.titleSelectValue = action.payload.titleSelectValue || '';
			state.phoneNumValue = action.payload.phoneNumValue || '';
		},
		registerStep3(state, action) {
			state.userDetailValue = action.payload.userDetailValue || '';
		},
		registerStep6(state, action) {
			state.techSelectValue = action.payload.techSelectValue;
		},
		// registerStep4(state, action) {
		// 	state.userDetail = action.payload.userDetail || '';
		// },
		// registerReset(state) {
		// 	state.idInputValue = '';
		// 	state.nameInputValue = '';
		// 	state.pwInputValue = '';
		// 	state.teamSelectValue = '';
		// 	state.titleSelectValue = '';
		// 	state.phoneNumValue = '';
		// 	state.userDetail = '';
		// 	state.userProfileImage = null;
		// },
	},
});

export const { registerStep1, registerStep2, registerStep3 } = registerSlice.actions;
export default registerSlice.reducer;
