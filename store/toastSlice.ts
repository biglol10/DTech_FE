import { createSlice } from '@reduxjs/toolkit';
import { IToastState } from '@utils/types/commAndStoreTypes';

const initialState: IToastState = {
	position: 'bottom-left',
	autoClose: 3000,
	hideProgressBar: false,
};

const toastSlice = createSlice({
	name: 'toastInfo',
	initialState,
	reducers: {
		toastSetting(state, action) {
			state.position = action.payload.position || 'bottom-left';
			state.autoClose = action.payload.autoClose || 3000;
			state.hideProgressBar = action.payload.hideProgressBar || false;
		},
	},
});

export const { toastSetting } = toastSlice.actions;
export default toastSlice.reducer;
