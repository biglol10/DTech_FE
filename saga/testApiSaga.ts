import { all, fork, put, takeLatest, call } from 'redux-saga/effects';
import { putReqApiResult } from '@store/testApiSlice';
import fetchRandomNumber from '@testApi/randomNumber';
import getTestApiAxios from '@testApi/fetchTestApi';
import * as RCONST from '@utils/constants/reducerConstants';

interface IDataReturn {
	success: boolean;
	data: string;
	resultData: string;
}

const fetchTestApiFunction = function* (action: any) {
	const fetchResult: IDataReturn = yield call(getTestApiAxios);

	yield put(putReqApiResult(fetchResult.data));

	const randomNumber: number = yield call(fetchRandomNumber);

	const returnObj = {
		result: fetchResult.data,
		randomNumber,
	};

	yield call(action.callbackFn, returnObj);
};

const fetchTestApi = function* () {
	yield takeLatest(RCONST.TESTAPIFETCH, fetchTestApiFunction);
};

export default function* testApiSaga() {
	yield all([fork(fetchTestApi)]);
}
