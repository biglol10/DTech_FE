import { all, fork, put, takeLatest } from 'redux-saga/effects';
import { setCurrentRoute, setCurrentChatUser, setCurrentUnReadMsg } from '@store/appCommon';
import * as RCONST from '@utils/constants/reducerConstants';

const appRouteControlFunction = function* (action: any) {
	yield put(setCurrentRoute(action.displayName));
};

const appCurrentChatUserControlFunction = function* (action: any) {
	yield put(setCurrentChatUser(action.chatUser));
};

const appCurrentUnReadMsgControlFunction = function* (action: any) {
	yield put(setCurrentUnReadMsg(action.unReadMsg));
};

const appRouteControl = function* () {
	yield takeLatest(RCONST.SET_CURRENT_ROUTE, appRouteControlFunction);
};

const appCurrentChatUserControl = function* () {
	yield takeLatest(RCONST.SET_CURRENT_CHAT_USER, appCurrentChatUserControlFunction);
};

const appCurrentUnReadMsgControl = function* () {
	yield takeLatest(RCONST.SET_CURRENT_UNREAD_MSG, appCurrentUnReadMsgControlFunction);
};

export default function* appCommonSaga() {
	yield all([
		fork(appRouteControl),
		fork(appCurrentChatUserControl),
		fork(appCurrentUnReadMsgControl),
	]);
}
