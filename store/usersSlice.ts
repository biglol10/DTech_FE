import { createSlice } from '@reduxjs/toolkit';
import { IUserStatus } from '@utils/types/commAndStoreTypes';

const initialState: { usersOverview: IUserStatus[] } = {
	usersOverview: [],
};

const usersSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {
		usersOverview(state, action) {
			state.usersOverview = action.payload;
		},
	},
});

export const { usersOverview } = usersSlice.actions;
export default usersSlice.reducer;
