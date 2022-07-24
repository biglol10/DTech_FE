import { all, fork, put, takeLatest } from 'redux-saga/effects';
import { toastSetting } from '@store/toastSlice';
import * as RCONST from '@utils/constants/reducerConstants';

const toastControlFunction = function* (action: any) {
    const toastSettingObj = {
        position: action.position,
        autoClose: action.autoClose,
        hideProgressBar: action.hideProgressBar,
    };

    yield put(toastSetting(toastSettingObj));
}

const toastControl = function* () {
    yield takeLatest(RCONST.TOASTSETTING, toastControlFunction);
}

export default function* toastSaga() {
	yield all([fork(toastControl)]);
}
