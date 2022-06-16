import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  users: string[];
}

const initialState = { users: [] } as UserState;

const counterSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser(state, action: PayloadAction<string>) {
      state.users = [...state.users, action.payload];
    },
    deleteUser(state, action: PayloadAction<string>) {
      state.users = state.users.filter((item) => item !== action.payload);
    },
  },
});

export const { addUser, deleteUser } = counterSlice.actions;
export default counterSlice.reducer;
