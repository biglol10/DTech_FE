import * as RCONST from '@utils/constants/reducerConstants';
import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import { idCheckRequest } from '@utils/api/register/idCheckRequest';
import { teamListRequest } from '@utils/api/register/teamListRequest';
import { techListRequest } from '@utils/api/register/getTechListRequest';
import { registerRequest } from '@utils/api/register/registerRequest';
import { sendUserImgRequest } from '@utils/api/register/sendUserImgRequest';
import {
	registerStep1,
	registerStep2,
	registerStep3,
	registerStep4,
	registerReset,
} from '@store/registerSlice';
import PrevieImageComp from '@components/quill/PreviewImageComp';

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

interface ITechList {
	result: string;
	techList: any | undefined;
	errMessage: string | undefined;
}

interface IRegisterUser {
	result: {
		uuid: string;
		title: string;
		name: string;
		user_id: string;
	};
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
			return { key: team.TEAM_CD, value: team.TEAM_CD, text: team.TEAM_NM };
		});

		setTeamList(newTempArr);
	} else {
		console.error(teamListResult.errMessage);
	}
	yield;
};

const techListFunction = function* ({ techSelectedList, setTechSelectedList }: any) {
	const techListResult: ITechList = yield call(techListRequest, {});

	if (techListResult.result === 'success') {
		const tempArr = techListResult.techList;
		const newTempArr = tempArr.map((tech: any) => {
			return { key: tech.TECH_CD, value: false, name: tech.TECH_NM };
		});

		setTechSelectedList({ ...techSelectedList, techSelectValue: newTempArr });
	} else {
		console.error(techListResult.errMessage);
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
	goNext,
}: any) {
	let idInputError = false;
	let idInputErrMsg = '';
	let nameInputError = false;
	let pwInputError = false;
	let pwInputErrMsg = '';
	let pwInput2Error = false;
	let pwInput2ErrMsg = '';
	let isReject = false;

	if (idInputValue.idConfirm === false) {
		idInputError = true;
		idInputErrMsg = '중복확인을 해주세요. ';
		isReject = true;
	}

	if (idInputValue.idInputValue === '') {
		idInputError = true;
		idInputErrMsg = '이메일을 입력하세요.';
		isReject = true;
	}
	if (nameInputValue.nameInputValue === '') {
		nameInputError = true;
		isReject = true;
	}
	if (pwInputValue.pwInputValue === '') {
		pwInputError = true;
		pwInputErrMsg = '패스워드를 입력하세요.';
		isReject = true;
	}
	if (pwInput2Value.pwInput2Value === '') {
		pwInput2Error = true;
		pwInput2ErrMsg = '패스워드를 입력하세요.';
		isReject = true;
	}
	if (pwInput2Value.pwInput2Value !== pwInputValue.pwInputValue) {
		pwInput2Error = true;
		pwInput2ErrMsg = '비밀번호가 일치하지 않습니다.';
		isReject = true;
	}

	setIdInputValue({ ...idInputValue, idInputError, idInputErrMsg });
	setNameInputValue({ ...nameInputValue, nameInputError });
	setPwInputValue({ ...pwInputValue, pwInputError, pwInputErrMsg });
	setPwInput2Value({ ...pwInput2Value, pwInput2Error, pwInput2ErrMsg });

	if (isReject) {
		console.log('reject');
	} else {
		propFunction({
			goNext,
		});
	}
	yield put(
		registerStep1({
			idInputValue,
			nameInputValue,
			pwInputValue,
			pwInput2Value,
		}),
	);
};

const validStep2Function = function* ({
	teamSelectValue,
	setTeamSelectValue,
	titleSelectValue,
	setTitleSelectValue,
	phoneNumValue,
	setPhoneNumValue,
	goNext,
	propFunction,
}: any) {
	let isReject = false;
	let teamSelectError = false;
	let titleSelectError = false;
	let phoneNumError = false;

	if (goNext) {
		if (teamSelectValue.teamSelectValue === '') {
			teamSelectError = true;
			isReject = true;
		}
		if (titleSelectValue.titleSelectValue === '') {
			titleSelectError = true;
			isReject = true;
		}

		if (phoneNumValue.phoneNumValue.length > 0 && phoneNumValue.phoneNumValue.length < 11) {
			phoneNumError = true;
			isReject = true;
		}

		setTeamSelectValue({ ...teamSelectValue, teamSelectError });
		setTitleSelectValue({ ...titleSelectValue, titleSelectError });
		setPhoneNumValue({ ...phoneNumValue, phoneNumError });

		if (isReject) {
			console.log('reject');
		} else {
			propFunction({ goNext });
		}
	} else {
		propFunction({ goNext });
	}
	yield put(
		registerStep2({
			teamSelectValue,
			titleSelectValue,
			phoneNumValue,
		}),
	);
};

const validStep4Function = function* ({
	setTechSelectedList,
	techSelectedList,
	goNext,
	propFunction,
}: any) {
	if (goNext) {
		// const selected = (tech: any) => tech.value === true;

		const techSelected = techSelectedList.techSelectValue.some(
			(tech: any) => tech.value === true,
		);

		if (techSelected) {
			setTechSelectedList({ ...techSelectedList, techSelectError: false });
			propFunction({ goNext });
		} else {
			setTechSelectedList({ ...techSelectedList, techSelectError: true });
		}
	} else {
		propFunction({ goNext });
	}

	yield put(registerStep4({ techSelectValue: techSelectedList }));
};
const validStep3Function = function* ({
	userDetailValue,
	userGithubValue,
	userDomainValue,
	goNext,
	propFunction,
}: any) {
	let isReject = false;

	if (goNext) {
		if (userDetailValue.userDetailError) {
			isReject = true;
		}

		if (isReject) {
			console.log('reject');
		} else {
			propFunction({ goNext });
		}
	} else {
		propFunction({ goNext });
	}
	yield put(registerStep3({ userDetailValue, userGithubValue, userDomainValue }));
};

const registerUserFunction = function* ({ registerData, propFunction }: any) {
	const postData = {
		type: 'REGISTER_USER',
		user_id: registerData.idInputValue.idInputValue,
		name: registerData.nameInputValue.nameInputValue,
		passwd: registerData.pwInputValue.pwInputValue,
		team: registerData.teamSelectValue.teamSelectValue,
		title: registerData.titleSelectValue.titleSelectValue,
		phonenum: registerData.phoneNumValue.phoneNumValue,
		detail: registerData.userDetailValue.userDetailValue,
		github: registerData.userGithubValue.userGithubValue,
		domain: registerData.userDomainValue.userDomainValue,
		tech_list: registerData.techSelectValue.techSelectValue
			.filter((tech: any) => tech.value === true)
			.map((tech: any) => tech.key),
	};

	const registerResult: IRegisterUser = yield call(registerRequest, postData);

	if (registerData.image.imageFile) {
		const fileName = registerResult.result.uuid;
		const fileExtName = registerData.image.imageFile.name.split('.').reverse()[0];

		const formData = new FormData();
		const postData2: any = {
			type: 'REGISTER_USER',
			dir: 'profile_img/',
			uuid: fileName,
		};

		formData.append('postData', JSON.stringify(postData2));

		formData.append('img', registerData.image.imageFile, `${fileName}.${fileExtName}`);

		yield call(sendUserImgRequest, formData);
	}

	propFunction({ goNext: true, registerResult });
	yield put(registerReset());
};

const idCheck = function* () {
	yield takeLatest(RCONST.ID_CHECK, idCheckFunction);
};

const getTeamList = function* () {
	yield takeLatest(RCONST.TEAM_LIST, teamListFunction);
};

const getTechList = function* () {
	yield takeLatest(RCONST.TECH_LIST, techListFunction);
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

const validStep4 = function* () {
	yield takeLatest(RCONST.VALID_STEP4, validStep4Function);
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
		fork(validStep4),
		fork(register),
		fork(getTechList),
	]);
}
