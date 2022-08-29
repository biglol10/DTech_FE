import { all, call, fork, takeLatest } from 'redux-saga/effects';
import * as RCONST from '@utils/constants/reducerConstants';
import { boardListRequest } from '@utils/api/board/getBoardList';
import { boardLikeRequest } from '@utils/api/board/setBoardLikeRequest';
import { submitBoardRequest } from '@utils/api/board/setSubmitBoardRequest';
import { sendBoardImgRequest } from '@utils/api/board/setBoardImgRequest';
import { techListRequest } from '@utils/api/register/getTechListRequest';

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
	resultData: any | undefined;
	errMessage?: string | undefined;
}

const boardListFunction = function* ({ setBoardList }: any) {
	const boardListResult: IBoardList = yield call(boardListRequest, {});

	if (boardListResult.result === 'success') {
		setBoardList(boardListResult.boardList);
	} else {
		console.error(boardListResult.errMessage);
	}
	yield;
};

const boardLikeFunction = function* ({ id, userId, like }: any) {
	yield call(boardLikeRequest, { id, userId, like });
};

const techListFunction = function* ({ setTechList }: any) {
	const techListResult: ITechList = yield call(techListRequest, {});

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

const submitBoardFunction = function* ({ content, uuid, selectedTech, boardTitle }: any) {
	const formData = new FormData();

	const submitBoardResult: ISubmitBoard = yield call(submitBoardRequest, {
		type: 'BOARD_SUBMIT',
		title: boardTitle,
		uuid,
		tech: selectedTech,
		content: content.value,
	});

	if (submitBoardResult.result === 'success') {
		for (let i = 0; i < content.imgList.length; i++) {
			formData.append(
				'img',
				content.imgList[i].imageFile,
				`${content.imgList[i].imageFile.name}`,
			);
		}

		formData.append('img', `{boardId:${submitBoardResult.resultData.BOARD_CD}}`);

		yield call(sendBoardImgRequest, formData);
	} else {
		console.log('error');
	}

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
