import { all, fork, put, takeLatest } from 'redux-saga/effects';
import { setCurrentRoute, setCurrentChatUser } from '@store/appCommon';
import * as RCONST from '@utils/constants/reducerConstants';

const appRouteControlFunction = function* (action: any) {
	yield put(setCurrentRoute(action.displayName));
};

const appCurrentChatUserControlFunction = function* (action: any) {
	yield put(setCurrentChatUser(action.chatUser));
};

const appRouteControl = function* () {
	yield takeLatest(RCONST.SET_CURRENT_ROUTE, appRouteControlFunction);
};

const appCurrentChatUserControl = function* () {
	yield takeLatest(RCONST.SET_CURRENT_CHAT_USER, appCurrentChatUserControlFunction);
};

export default function* appCommonSaga() {
	yield all([fork(appRouteControl), fork(appCurrentChatUserControl)]);
}
