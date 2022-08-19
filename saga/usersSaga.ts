import { all, fork, put, takeLatest } from 'redux-saga/effects';
import { usersOverview } from '@store/usersSlice';
import * as RCONST from '@utils/constants/reducerConstants';

const setUsersOverviewFunc = function* ({ users }: any) {
	yield put(usersOverview(users));
};

const setUsersOverview = function* () {
	yield takeLatest(RCONST.SET_USERS_OVERVIEW, setUsersOverviewFunc);
};

export default function* usersSaga() {
	yield all([fork(setUsersOverview)]);
}
