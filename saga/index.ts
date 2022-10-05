import { all, fork } from 'redux-saga/effects';

import counterSaga from './sagaCounter';
import modalSaga from './modalSaga';
import authSaga from './authSaga';
import registerSaga from './registerSaga';
import toastSaga from './toastSaga';
import appCommonSaga from './appCommonSaga';
import boardSaga from './boardSaga';
import usersSaga from './usersSaga';

export default function* rootSaga() {
	yield all([
		fork(counterSaga),
		fork(modalSaga),
		fork(authSaga),
		fork(registerSaga),
		fork(toastSaga),
		fork(appCommonSaga),
		fork(boardSaga),
		fork(usersSaga),
	]);
}
