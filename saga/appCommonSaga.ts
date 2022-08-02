import { all, fork, put, takeLatest } from 'redux-saga/effects';
import { setCurrentRoute } from '@store/appCommon';
import * as RCONST from '@utils/constants/reducerConstants';

const appRouteControlFunction = function* (action: any) {
    yield put(setCurrentRoute(action.displayName));
}

const appRouteControl = function* () {
    yield takeLatest(RCONST.SET_CURRENT_ROUTE, appRouteControlFunction);
}

export default function* appCommonSaga() {
    yield all([fork(appRouteControl)]);
}