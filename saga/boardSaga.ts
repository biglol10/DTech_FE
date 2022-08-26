import { all, call, fork, takeLatest } from 'redux-saga/effects';
import * as RCONST from '@utils/constants/reducerConstants';
import { boardListRequest } from '@utils/api/board/getBoardList';
import { boardLikeRequest } from '@utils/api/board/setBoardLikeRequest';
import { submitBoardRequest } from '@utils/api/board/setSubmitBoardRequest';
import { techListRequest } from '@utils/api/register/getTechListRequest';

import { ChatList } from '@utils/types/commAndStoreTypes';

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
interface ITechList {
	result: string;
	techList: any | undefined;
	errMessage: string | undefined;
}
interface ISubmitBoard {
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

const techListFunction = function* ({ setTechList }: any) {
	console.log('techListFunction');
	const techListResult: ITechList = yield call(techListRequest, {});

	// setTechList(techListResult.techList);
	console.log(techListResult);
	if (techListResult.result === 'success') {
		const tempArr = techListResult.techList;
		const newTempArr = tempArr.map((tech: any) => {
			return { key: tech.TECH_CD, value: tech.TECH_CD, name: tech.NAME, text: tech.NAME };
		});

		setTechList(newTempArr);
	} else {
		console.error(techListResult.errMessage);
	}
	yield;
};

const submitBoardFunction = function* ({ content }: any) {
	console.log('submitBoardFunction');
	console.log(content);
	// const submitBoardResult: ISubmitBoard = yield call(submitBoardRequest, { content });
	const formData = new FormData();

	for (let i = 0; i < content.imgList.length; i++) {
		formData.append('imgs', content.imgList[i]);
	}
	const submitBoardResult: ISubmitBoard = yield call(submitBoardRequest, formData);

	console.log(submitBoardResult);
	yield;
};

const getBoardList = function* () {
	yield takeLatest(RCONST.BOARD_LIST, boardListFunction);
};

const setBoardLike = function* () {
	yield takeLatest(RCONST.BOARD_LIKE, boardLikeFunction);
};

const setSubmitBoard = function* () {
	yield takeLatest(RCONST.SUBMIT_BOARD, submitBoardFunction);
};

const getTechList = function* () {
	yield takeLatest(RCONST.BOARD_TECH_LIST, techListFunction);
};

export default function* boardSaga() {
	yield all([fork(getBoardList), fork(setBoardLike), fork(setSubmitBoard), fork(getTechList)]);
}
