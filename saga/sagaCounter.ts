import { all, fork, put, takeLatest, call, delay } from 'redux-saga/effects';
import { increment, decrement, incrementByAmount, decrementByAmount } from '@store/counterSlice';
import fetchRandomNumber from '@testApi/randomNumber';
import * as RCONST from '@utils/constants/reducerConstants';

// Can I use ES6's arrow function syntax with generators? => NO
// The function* statement (function keyword followed by an asterisk) defines a generator function.

const addOneFunction = function* () {
	yield put(increment());
};

const subtractOneFunction = function* () {
	yield put(decrement());
};

const addByAmountFunction = function* (action: any) {
	// console.log(action); // {type: 'ADDBYAMOUNT', data: 2}
	yield put(incrementByAmount(action.data));
};

const randomComputationFunction = function* (action: any) {
	yield call(action.setLoading, true); // true를 인자로 action.setLoading 호출
	const randomNumber1: number = yield call(fetchRandomNumber);

	yield put(incrementByAmount(randomNumber1)); // 액션을 dispatch (loading 인데 숫자가 바뀌는 걸 볼 수 있음 [yield덕분])

	const randomNumber2: number = yield call(fetchRandomNumber);

	yield delay(1000);

	yield put(decrementByAmount(randomNumber2));

	yield call(action.setLoading, false);
};

const addOne = function* () {
	yield takeLatest(RCONST.ADDONE, addOneFunction);
};

const subtractOne = function* () {
	yield takeLatest(RCONST.SUBTRACTONE, subtractOneFunction);
};

const addByAmount = function* () {
	yield takeLatest(RCONST.ADDBYAMOUNT, addByAmountFunction);
};

const randomComputation = function* () {
	yield takeLatest(RCONST.RANDOMCOMPUTATION, randomComputationFunction);
};

export default function* counterSaga() {
	yield all([fork(addOne), fork(subtractOne), fork(addByAmount), fork(randomComputation)]);
}
