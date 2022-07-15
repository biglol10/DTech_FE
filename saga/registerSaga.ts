import * as RCONST from '@utils/constants/reducerConstants';
import axios from 'axios';
import { all, call, fork, takeLatest } from 'redux-saga/effects';

interface idCheckParam {
	type: string;
	idInputValue: string;
	setIdInputError: any;
	setIdInputErrMsg: any;
	setIdCheckMsg: any;
	setIdConfirm: any;
}
const idCheckFunction = function* ({
	idInputValue,
	setIdInputError,
	setIdInputErrMsg,
	setIdCheckMsg,
	setIdConfirm,
}: idCheckParam) {
	axios
		.post('http://localhost:3066/api/auth/idCheck', { userId: idInputValue })
		.then((res: any) => {
			console.log(res.data);
			if (res.data.result === 'success') {
				if (res.data.foundId) {
					setIdConfirm(false);
					setIdInputErrMsg('이미 등록된 아이디');
					setIdInputError(true);
				} else {
					setIdCheckMsg('아이디 사용 가능');
					setIdConfirm(true);
					setIdInputError(false);
				}
			}
		});
	yield;
};

const teamListFunction = function* ({ setTeamList }: any) {
	console.log('teamListFunction');
	axios.post('http://localhost:3066/api/auth/getTeamList').then((res: any) => {
		const tempArr = res.data.resultData.queryResult;
		const newTempArr = tempArr.map((team: any) => {
			return { key: team.TEAM_CD, value: team.TEAM_CD, text: team.NAME };
		});

		setTeamList(newTempArr);
	});

	yield;
};

const goStep2Function = function* ({
	propFunction,
	idInputValue,
	nameInputValue,
	pwInputValue,
	pw2InputValue,
	setNameInputError,
	setIdInputError,
	setIdInputErrMsg,
	setPwInputError,
	setPwInputErrMsg,
	setPw2InputError,
	setPw2InputErrMsg,
	idInputError,
	nameInputError,
	pwInputError,
	pw2InputError,
	idConfirm,
}: any) {
	let reject = false;

	if (idConfirm === false) {
		setIdInputError(true);
		setIdInputErrMsg('중복확인을 해주세요.');
		reject = true;
	}

	if (idInputValue === undefined || idInputValue === '') {
		setIdInputError(true);
		setIdInputErrMsg('이메일을 입력하세요.');
		reject = true;
	}
	if (nameInputValue === undefined || nameInputValue === '') {
		setNameInputError(true);
		reject = true;
	}
	if (pwInputValue === undefined || pwInputValue === '') {
		setPwInputError(true);
		setPwInputErrMsg('패스워드를 입력하세요.');
		reject = true;
	}
	if (pw2InputValue === undefined || pw2InputValue === '') {
		setPw2InputError(true);
		setPw2InputErrMsg('패스워드를 입력하세요.');
		reject = true;
	}
	console.log(`${idInputError} ${nameInputError} ${pwInputError} ${pw2InputError} ${reject}`);
	if (
		idInputError === true ||
		nameInputError === true ||
		pwInputError === true ||
		pw2InputError === true ||
		reject === true ||
		idConfirm === false
	) {
		console.log('reject');
	} else {
		propFunction({ idInputValue, nameInputValue, pwInputValue, pw2InputValue });
	}
	yield;
};

const idCheck = function* () {
	yield takeLatest(RCONST.ID_CHECK, idCheckFunction);
};

const getTeamList = function* () {
	yield takeLatest(RCONST.TEAM_LIST, teamListFunction);
};

const goStepTwo = function* () {
	yield takeLatest(RCONST.GOSTEP2, goStep2Function);
};

export default function* registerSaga() {
	yield all([fork(idCheck), fork(getTeamList), fork(goStepTwo)]);
}
