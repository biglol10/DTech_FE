import { all, call, fork, takeLatest } from 'redux-saga/effects';
import * as RCONST from '@utils/constants/reducerConstants';
import { boardListRequest } from '@utils/api/board/getBoardList';
import { boardLikeRequest } from '@utils/api/board/setBoardLikeRequest';
import { submitBoardRequest } from '@utils/api/board/setSubmitBoardRequest';
import { sendBoardImgRequest } from '@utils/api/board/setBoardImgRequest';
import { techListRequest } from '@utils/api/register/getTechListRequest';
import { commentListRequest } from '@utils/api/board/getCommentListRequest';
import { commentRequest } from '@utils/api/board/setCommentRequest';
import { useDispatch } from 'react-redux';

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
interface ICommentList {
	result: string;
	commentList: any | undefined;
	errMessage?: string | undefined;
}

interface ISubmitBoard {
	result: string;
	resultData: any | undefined;
	errMessage?: string | undefined;
}

const boardListFunction = function* ({ setBoardList, uuid, orderType, filterType }: any) {
	console.log(filterType);
	const boardListResult: IBoardList = yield call(boardListRequest, {
		uuid,
		orderType,
		filterType,
	});

	if (boardListResult.result === 'success') {
		setBoardList(boardListResult.boardList);
	} else {
		console.error(boardListResult.errMessage);
	}
	yield;
};

const boardLikeFunction = function* ({ id, userUID, like }: any) {
	// console.log(id, userUID, like);
	yield call(boardLikeRequest, { id, userUID, like });
};

const techListFunction = function* ({ setTechList }: any) {
	const techListResult: ITechList = yield call(techListRequest, {});

	if (techListResult.result === 'success') {
		const tempArr = techListResult.techList;
		const newTempArr = tempArr.map((tech: any) => {
			return {
				key: tech.TECH_CD,
				value: tech.TECH_CD,
				name: tech.TECH_NM,
				text: tech.TECH_NM,
			};
		});

		newTempArr.unshift({ key: 'null', value: null, name: '선택 없음', text: '선택 없음' });

		setTechList(newTempArr);
	} else {
		console.error(techListResult.errMessage);
	}
	yield;
};

const submitBoardFunction = function* ({
	content,
	uuid,
	selectedTech,
	boardTitle,
	callbackFn,
}: any) {
	const formData = new FormData();

	const postData: any = {
		type: 'BOARD_SUBMIT',
		dir: 'board/',
		title: boardTitle,
		uuid,
		tech: selectedTech,
		content: content.value,
	};

	formData.append('postData', JSON.stringify(postData));

	for (let i = 0; i < content.imgList.length; i++) {
		formData.append(
			'img',
			content.imgList[i].imageFile,
			`${content.imgList[i].imageFile.name}`,
		);
	}

	const sendBoardResult: ISubmitBoard = yield call(sendBoardImgRequest, formData);

	// console.log('submitBoardFunction');
	// console.log(sendBoardResult);
	yield call(callbackFn, sendBoardResult);
};

const boardDetailFunction = function* ({ brdId, uuid, card, setCard }: any) {
	console.log('boardDetailFunction');
	console.log(brdId);
	console.log(uuid);
	const boardListResult: IBoardList = yield call(boardListRequest, {
		uuid,
		brdId,
	});

	console.log(boardListResult);
	setCard(boardListResult.boardList);
	yield;
};

const setCommentFunction = function* ({
	setCommentArea,
	commentArea,
	brdId,
	uuid,
	setCommentList,
	callbackFn,
}: any) {
	console.log('setCommentFunction');
	const commentListResult: ICommentList = yield call(commentRequest, {
		commentArea,
		brdId,
		uuid,
	});

	console.log(commentListResult.commentList);

	setCommentList(commentListResult.commentList);

	yield call(callbackFn);
	setCommentArea('');
};

const getCommentListFunction = function* ({ brdId, setCommentList }: any) {
	// console.log('getCommentList');
	const commentListResult: ICommentList = yield call(commentListRequest, { brdId });

	console.log(commentListResult);
	// console.log(commentListResult.commentList);
	setCommentList(commentListResult.commentList);
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

const getBoardDetail = function* () {
	yield takeLatest(RCONST.BOARD_DETAIL, boardDetailFunction);
};

const setComment = function* () {
	yield takeLatest(RCONST.SEND_COMMENT, setCommentFunction);
};

const getCommentList = function* () {
	yield takeLatest(RCONST.COMMENT_LIST, getCommentListFunction);
};

export default function* boardSaga() {
	yield all([
		fork(getBoardList),
		fork(setBoardLike),
		fork(setSubmitBoard),
		fork(getTechList),
		fork(getBoardDetail),
		fork(setComment),
		fork(getCommentList),
	]);
}
