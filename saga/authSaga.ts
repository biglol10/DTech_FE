import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import { authSetting, authReset } from '@store/authSlice';
import * as RCONST from '@utils/constants/reducerConstants';
import { fireLoginRequest } from '@utils/api/auth/loginRequest';

interface authObjParamSetting {
	userId: string;
	password: string;
}

interface authObjParam {
	userSetting: authObjParamSetting;
	callbackFn: any;
	type: string;
}

interface ILoginResult {
	name: string | undefined;
	userId: string | undefined;
	time: any;
	token: string | undefined;
	result: string;
	errMessage?: string | undefined;
	errObj?: any | undefined;
}

const setAuthFunction = function* ({ userSetting, callbackFn }: authObjParam) {
	const loginResult: ILoginResult = yield call(fireLoginRequest, userSetting);

	if (loginResult.result === 'success') {
		yield put(authSetting(loginResult));
	} else {
		yield put(authReset());
	}
	yield call(callbackFn, loginResult.result);
};

const resetAuthFunction = function* () {
	yield put(authReset());
};

const setAuth = function* () {
	yield takeLatest(RCONST.AUTH_SETTING, setAuthFunction);
};

const resetAuth = function* () {
	yield takeLatest(RCONST.AUTH_RESET, resetAuthFunction);
};

export default function* authSaga() {
	yield all([fork(setAuth), fork(resetAuth)]);
}
