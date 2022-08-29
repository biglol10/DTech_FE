import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import { authSetting, authReset, authSocket } from '@store/authSlice';
import * as RCONST from '@utils/constants/reducerConstants';
import { fireLoginRequest, fireTokenRequest } from '@utils/api/auth/loginRequest';

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

// interface ILoginResult {
// 	name: string | undefined;
// 	userId: string | undefined;
// 	time: any;
// 	token: string | undefined;
// 	result: string;
// 	errMessage?: string | undefined;
// 	errObj?: any | undefined;
// }

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

	const loginResult: {
		result: string;
		errMessage?: any;
		userUID?: string;
		userId?: string;
		userName?: string;
		time?: any;
		userToken?: string;
	} = yield call(fireLoginRequest, userSetting);

	if (loginResult.result === 'success') {
		yield put(authSetting(loginResult));
	} else {
		yield put(authReset());
	}
	yield call(callbackFn, loginResult);
};

interface ITokenUser {
	USER_UID: string;
	USER_ID: string;
	NAME: string;
	TEAM_CD: string;
	TITLE: string;
	ADMIN: number;
}

interface ITokenResult {
	success: boolean;
	user: ITokenUser;
}

const getAuthFunction = function* ({ token, callbackFn }: any) {
	const tokenResult: ITokenResult = yield call(fireTokenRequest, token);

	if (tokenResult.success) {
		const loginResult = {
			userName: tokenResult.user.NAME,
			userId: tokenResult.user.USER_ID,
			userToken: token,
			userUID: tokenResult.user.USER_UID,
		};

		yield put(authSetting(loginResult));
		yield call(callbackFn, loginResult.userId);
	} else {
		yield put(authReset());
		yield call(callbackFn, '');
	}
};

const resetAuthFunction = function* () {
	yield put(authReset());
};

const setUserSocketFunction = function* ({ socketRef }: any) {
	yield put(authSocket(socketRef));
};

const resetUserSocketFunction = function* () {
	yield put(authSocket(null));
};

const setAuth = function* () {
	yield takeLatest(RCONST.AUTH_SETTING, setAuthFunction);
};

const resetAuth = function* () {
	yield takeLatest(RCONST.AUTH_RESET, resetAuthFunction);
};

const getAuthByToken = function* () {
	yield takeLatest(RCONST.AUTH_SETTING_BY_TOKEN, getAuthFunction);
};

const setUserSocket = function* () {
	yield takeLatest(RCONST.AUTH_USERSOCKET, setUserSocketFunction);
};

const resetUserSocket = function* () {
	yield takeLatest(RCONST.AUTH_USERSOCKET_RESET, resetUserSocketFunction);
};

export default function* authSaga() {
	yield all([
		fork(setAuth),
		fork(resetAuth),
		fork(getAuthByToken),
		fork(setUserSocket),
		fork(resetUserSocket),
	]);
}
