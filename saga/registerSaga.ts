import * as RCONST from '@utils/constants/reducerConstants';
import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import { idCheckRequest } from '@utils/api/register/idCheckRequest';
import { teamListRequest } from '@utils/api/register/teamListRequest';
import { registerRequest } from '@utils/api/register/registerRequest';
import { sendUserImgRequest } from '@utils/api/register/sendUserImgRequest';
import { registerStep1, registerStep2 } from '@store/registerSlice';

interface IIdCheckParam {
	type: string;
	idInputValue: any;
	setIdInputValue: any;
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
const idCheckFunction = function* ({ idInputValue, setIdInputValue }: IIdCheckParam) {
	const idCheckResult: IIdCheckResult = yield call(idCheckRequest, {
		userId: idInputValue.idInputValue,
	});

	if (idCheckResult.result === 'success') {
		if (idCheckResult.foundId) {
			setIdInputValue({
				...idInputValue,
				idInputError: true,
				idInputErrMsg: '이미 등록된 아이디입니다.',
				idConfirm: false,
			});
		} else {
			setIdInputValue({
				...idInputValue,
				idInputError: false,
				idConfirm: true,
			});
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
	idInputValue,
	setIdInputValue,
	nameInputValue,
	setNameInputValue,
	pwInputValue,
	setPwInputValue,
	pwInput2Value,
	setPwInput2Value,
	propFunction,
}: any) {
	let idInputError = false;
	let idInputErrMsg = '';
	let nameInputError = false;
	let pwInputError = false;
	let pwInputErrMsg = '';
	let pwInput2Error = false;
	let pwInput2ErrMsg = '';

	if (idInputValue.idConfirm === false) {
		idInputError = true;
		idInputErrMsg = '중복확인을 해주세요.';
	}

	if (idInputValue.idInputValue === undefined || idInputValue.idInputValue === '') {
		idInputError = true;
		idInputErrMsg = '이메일을 입력하세요.';
	}
	if (nameInputValue.nameInputValue === undefined || nameInputValue.nameInputValue === '') {
		nameInputError = true;
	}
	if (pwInputValue.pwInputValue === undefined || pwInputValue.pwInputValue === '') {
		pwInputError = true;
		pwInputErrMsg = '패스워드를 입력하세요.';
	}
	if (pwInput2Value.pwInput2Value === undefined || pwInput2Value.pwInput2Value === '') {
		console.log('pw2223');
		pwInput2Error = true;
		pwInput2ErrMsg = '패스워드를 입력하세요.';
	}
	if (pwInput2Value.pwInput2Value !== pwInputValue.pwInputValue) {
		console.log('pw2224');
		pwInput2Error = true;
		pwInput2ErrMsg = '비밀번호가 일치하지 않습니다.';
	}
	if (
		idInputError === true ||
		idInputValue.idConfirm === false ||
		nameInputError === true ||
		pwInputError === true ||
		pwInput2Error === true
	) {
		console.log('reject');
	} else {
		propFunction({
			idInputValue,
			nameInputValue,
			pwInputValue,
			pwInput2Value,
		});
	}
	setIdInputValue({ ...idInputValue, idInputError, idInputErrMsg });
	setNameInputValue({ ...nameInputValue, nameInputError });
	setPwInputValue({ ...pwInputValue, pwInputError, pwInputErrMsg });
	setPwInput2Value({ ...pwInput2Value, pwInput2Error, pwInput2ErrMsg });
	yield put(
		registerStep1({
			idInputValue,
			nameInputValue,
			pwInputValue,
			pwInput2Value,
		}),
	);
};

const validStep3Function = function* ({ detailInputValue }: any) {
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
		if (teamSelectValue === '' || teamSelectValue === undefined) {
			setTeamSelectError(true);
		}
		if (titleSelectValue === '' || titleSelectValue === undefined) {
			setTitleSelectError(true);
		}

		if (teamSelectError === true || titleSelectError === true) {
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
const validStep3 = function* () {
	yield takeLatest(RCONST.VALID_STEP3, validStep3Function);
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
		fork(validStep3),
		fork(register),
	]);
}
