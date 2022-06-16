import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	success: false,
	data: '',
	resultData: 'this is null',
};

const testApiSlice = createSlice({
	name: 'testApi',
	initialState,
	reducers: {
		putReqApiResult(state, action) {
			state.success = action.payload.success;
			state.data = action.payload.data;
			state.resultData = action.payload.resultData;
		},
	},
});

export const { putReqApiResult } = testApiSlice.actions;
export default testApiSlice.reducer;
