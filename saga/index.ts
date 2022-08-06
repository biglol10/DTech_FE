import { all, fork } from 'redux-saga/effects';

import counterSaga from './sagaCounter';
import testApiSaga from './testApiSaga';
import modalSaga from './modalSaga';
import authSaga from './authSaga';
import registerSaga from './registerSaga';
import toastSaga from './toastSaga';
import appCommonSaga from './appCommonSaga';

export default function* rootSaga() {
	yield all([
		fork(counterSaga),
		fork(testApiSaga),
		fork(modalSaga),
		fork(authSaga),
		fork(registerSaga),
		fork(toastSaga),
		fork(appCommonSaga),
	]);
}
