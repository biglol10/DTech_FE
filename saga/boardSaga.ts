import { all, call, fork, takeLatest } from 'redux-saga/effects';
import * as RCONST from '@utils/constants/reducerConstants';
import { boardListRequest } from '@utils/api/board/getBoardList';
import { boardLikeRequest } from '@utils/api/board/setBoardLikeRequest';

interface IBoardList {
	result: string;
	boardList: any | undefined;
	errMessage: string | undefined;
}
interface IBoardLike {
	result: string;
	boardList: any | undefined;
	errMessage: string | undefined;
}

const boardListFunction = function* ({ setBoardList }: any) {
	const boardListResult: IBoardList = yield call(boardListRequest, {});

	if (boardListResult.result === 'success') {
		setBoardList(boardListResult.boardList);
	} else {
		console.error(boardListResult.errMessage);
	}
	// console.log(boardListResult);
	yield;
};

const boardLikeFunction = function* ({ id, userId, like }: any) {
	console.log('boardLikeFunction');
	console.log(id, userId, like);
	const boardLikeResult: IBoardLike = yield call(boardLikeRequest, { id, userId, like });

	console.log(boardLikeResult);
	yield;
};

const getBoardList = function* () {
	yield takeLatest(RCONST.BOARD_LIST, boardListFunction);
};

const setBoardLike = function* () {
	yield takeLatest(RCONST.BOARD_LIKE, boardLikeFunction);
};

export default function* boardSaga() {
	yield all([fork(getBoardList), fork(setBoardLike)]);
}
