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
	setIdInputError: any;
	setPwInputError: any;
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

const setAuthFunction = function* ({
	userSetting,
	callbackFn,
	setIdInputError,
	setPwInputError,
}: authObjParam) {
	const regEmail =
		/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

	const regPassword = new RegExp('^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})');

	setIdInputError(!regEmail.test(userSetting.userId));
	setPwInputError(!regPassword.test(userSetting.password));

	if (!regEmail.test(userSetting.userId) || !regPassword.test(userSetting.password)) {
		yield call(callbackFn, 'error');
		return;
	}

	const loginResult: ILoginResult = yield call(fireLoginRequest, userSetting);

	if (loginResult.result === 'success') {
		yield put(authSetting(loginResult));
	} else {
		yield put(authReset());
	}
	yield call(callbackFn, loginResult);
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
