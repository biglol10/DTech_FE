import { createSlice } from '@reduxjs/toolkit';

// interface CounterState {
//   count: number;
// }

const initialState = { count: 0 };

// 기존 리듀서를 생각해보면 현재 state의 값을 바로 바꾸지않고 concat, assign등을 사용하여 복사하고 그 복사한 state를 리턴해줬는데, createSlice의 리듀서 안에서는 불변성을 직접 작업해주기 떄문에 바로 state에 접근이 가능합니다.
const counterSlice = createSlice({
	name: 'counter',
	initialState,
	reducers: {
		increment(state) {
			state.count++;
		},
		decrement(state) {
			state.count--;
		},
		incrementByAmount(state, action) {
			state.count += parseInt(action.payload, 10);
		},
		decrementByAmount(state, action) {
			state.count -= parseInt(action.payload, 10);
		},
	},
});

export const { increment, decrement, incrementByAmount, decrementByAmount } = counterSlice.actions;
export default counterSlice.reducer;
