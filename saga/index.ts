import { all, fork } from 'redux-saga/effects';

import counterSaga from './sagaCounter';
import testApiSaga from './testApiSaga';
import modalSaga from './modalSaga';
import authSaga from './authSaga';

export default function* rootSaga() {
	yield all([fork(counterSaga), fork(testApiSaga), fork(modalSaga), fork(authSaga)]);
}
