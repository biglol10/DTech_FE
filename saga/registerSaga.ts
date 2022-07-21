import * as RCONST from '@utils/constants/reducerConstants';
import { all, call, fork, takeLatest } from 'redux-saga/effects';
import { idCheckRequest } from '@utils/api/register/idCheckRequest';
import { teamListRequest } from '@utils/api/register/teamListRequest';
import { registerRequest } from '@utils/api/register/registerRequest';
import { sendUserImgRequest } from '@utils/api/register/sendUserImgRequest';

interface IIdCheckParam {
	type: string;
	idInputValue: string;
	setIdInputError: any;
	setIdInputErrMsg: any;
	setIdCheckMsg: any;
	setIdConfirm: any;
}
interface IIdCheckResult {
	result: string;
	foundId: boolean | undefined;
	errMessage: string | undefined;
}
interface ITeamList {
	result: string;
	teamList: any | undefined;
	errMessage: string | undefined;
}

interface IRegisterUser {
	result: string;
	errMessage: string | undefined;
}
const idCheckFunction = function* ({
	idInputValue,
	setIdInputError,
	setIdInputErrMsg,
	setIdConfirm,
}: IIdCheckParam) {
	const idCheckResult: IIdCheckResult = yield call(idCheckRequest, { userId: idInputValue });

	if (idCheckResult.result === 'success') {
		if (idCheckResult.foundId) {
			setIdConfirm(false);
			setIdInputErrMsg('이미 등록된 아이디');
			setIdInputError(true);
		} else {
			setIdConfirm(true);
			setIdInputError(false);
		}
	} else {
		console.error(idCheckResult.errMessage);
	}
	yield;
};

const teamListFunction = function* ({ setTeamList }: any) {
	const teamListResult: ITeamList = yield call(teamListRequest, {});

	if (teamListResult.result === 'success') {
		const tempArr = teamListResult.teamList;
		const newTempArr = tempArr.map((team: any) => {
			return { key: team.TEAM_CD, value: team.TEAM_CD, text: team.NAME };
		});

		setTeamList(newTempArr);
	} else {
		console.error(teamListResult.errMessage);
	}
	yield;
};

const validStep1Function = function* ({
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
		propFunction({ idInputValue, nameInputValue, pwInputValue, pw2InputValue, idConfirm });
	}
	yield;
};

const validStep2Function = function* ({
	teamSelectValue,
	titleSelectValue,
	phoneNumValue,
	goNext,
	setTeamSelectError,
	setTitleSelectError,
	teamSelectError,
	titleSelectError,
	propFunction,
}: any) {
	if (goNext) {
		let reject = false;

		if (teamSelectValue === '' || teamSelectValue === undefined) {
			setTeamSelectError(true);
			reject = true;
		}
		if (titleSelectValue === '' || titleSelectValue === undefined) {
			setTitleSelectError(true);
			reject = true;
		}

		if (reject === true || teamSelectError === true || titleSelectError === true) {
			console.log('reject');
		} else {
			propFunction({ teamSelectValue, titleSelectValue, phoneNumValue, goNext });
		}
	} else {
		propFunction({ teamSelectValue, titleSelectValue, phoneNumValue, goNext });
	}

	yield;
};

const registerUserFunction = function* ({ registerData, propFunction }: any) {
	if (registerData.image.imageFile) {
		const fileName = registerData.user_id.split('@')[0];
		const fileExtName = registerData.image.imageFile.name.split('.')[1];
		const formData = new FormData();

		formData.append('img', registerData.image.imageFile, `${fileName}.${fileExtName}`);

		yield call(sendUserImgRequest, formData);
	}

	const registerResult: IRegisterUser = yield call(registerRequest, registerData);

	propFunction({ goNext: true, registerResult });
};

const idCheck = function* () {
	yield takeLatest(RCONST.ID_CHECK, idCheckFunction);
};

const getTeamList = function* () {
	yield takeLatest(RCONST.TEAM_LIST, teamListFunction);
};

const validStep1 = function* () {
	yield takeLatest(RCONST.VALID_STEP1, validStep1Function);
};

const validStep2 = function* () {
	yield takeLatest(RCONST.VALID_STEP2, validStep2Function);
};

const register = function* () {
	yield takeLatest(RCONST.REGISTER_USER, registerUserFunction);
};

export default function* registerSaga() {
	yield all([
		fork(idCheck),
		fork(getTeamList),
		fork(validStep1),
		fork(validStep2),
		fork(register),
	]);
}
