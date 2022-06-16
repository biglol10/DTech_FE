import { all, fork } from 'redux-saga/effects';

import counterSaga from './sagaCounter';
import testApiSaga from './testApiSaga';
import modalSaga from './modalSaga';

export default function* rootSaga() {
	yield all([fork(counterSaga), fork(testApiSaga), fork(modalSaga)]);
}
