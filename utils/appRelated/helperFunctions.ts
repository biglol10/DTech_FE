import crypto from 'crypto';
import dayjs from 'dayjs';
import axios from 'axios';
import _ from 'lodash';
import cookie from 'js-cookie';
import { store } from '@store/rootReducer';
import { IAuth } from '@utils/types/commAndStoreTypes';

const baseImage = {
	AvatarBase0: 'AvatarBase_BLACK1.png',
	AvatarBase1: 'AvatarBase_SKYBLUE1.png',
	AvatarBase2: 'AvatarBase_BLUE1.png',
	AvatarBase3: 'AvatarBase_BLUE2.png',
	AvatarBase4: 'AvatarBase_GREEN1.png',
	AvatarBase5: 'AvatarBase_GREEN2.png',
	AvatarBase6: 'AvatarBase_PURPLE1.png',
	AvatarBase7: 'AvatarBase_YELLOW2.png',
	AvatarBase8: 'AvatarBase_RED1.png',
	AvatarBase9: 'AvatarBase_RED2.png',
	AvatarBaseErr: 'AvatarBase_RED2.png',
};

const generateUID = () => {
	return crypto.randomBytes(20).toString('hex').substring(0, 20);
};

const generateImageUID = () => {
	return crypto.randomBytes(20).toString('hex').substring(0, 25);
};

const generateAvatarImage = (uid: string) => {
	try {
		const extractNumbers = uid.replace(/\D/g, '');

		let summation = 0;

		for (let index = 0; index < extractNumbers.length; index++) {
			summation += parseInt(extractNumbers[index], 10);
		}

		const baseChoice = `AvatarBase${summation % 10}` as keyof typeof baseImage;

		return `${process.env.NODE_ENV === 'production' ? '/dtech' : ''}/images/AvatarBaseImage/${
			baseImage[baseChoice]
		}`;
	} catch {
		return `${process.env.NODE_ENV === 'production' ? '/dtech' : ''}/images/AvatarBaseImage/${
			baseImage['AvatarBaseErr']
		}`;
	}
};

const chatToDateGroup = (arr: any[]) => {
	const groupsReduce = arr.reduce((previouseVal, currentVal) => {
		const date = currentVal.SENT_DATETIME.split('T')[0];

		const hourMin = dayjs(currentVal.SENT_DATETIME).format('HH:mm');

		if (!previouseVal[date]) {
			previouseVal[date] = {};
		}
		if (!previouseVal[date][hourMin]) {
			previouseVal[date][hourMin] = [];
		}
		previouseVal[date][hourMin].push(currentVal);
		return previouseVal;
	}, {});

	return groupsReduce;
};

type callbackType = (obj: any) => void;

interface axiosRequestObj {
	url: string;
	requestType: 'get' | 'post';
	dataObj?: null | object;
	withAuth?: boolean;
	successCallback?: null | callbackType;
	failCallback?: null | callbackType;
	returnAxiosObject?: null | callbackType;
	tokenValue?: string;
}

type SuccessOrFailType = 'success' | 'error';

const comAxiosRequest = async (param: axiosRequestObj) => {
	const {
		url,
		requestType = 'get',
		dataObj = null,
		withAuth = false,
		successCallback = null,
		failCallback = null,
		tokenValue = '',
	} = param;

	const objectParam = _.merge(
		{
			url,
			method: requestType,
		},
		dataObj && requestType === 'post' ? { data: dataObj } : { params: dataObj },
		cookie.get('token') && withAuth
			? {
					headers: {
						Authorization: `Bearer ${cookie.get('token')}`,
						'Access-Control-Allow-Origin': true,
					},
			  }
			: { 'Access-Control-Allow-Origin': true },
		tokenValue && {
			headers: { Authorization: `Bearer ${tokenValue}`, 'Access-Control-Allow-Origin': true },
		},
	);

	const { auth: userAuth }: { auth: IAuth } = store.getState();

	const axiosResult: {
		status: SuccessOrFailType;
		response: any;
	} = await axios(objectParam)
		.then((response) => {
			successCallback && successCallback(response);
			return {
				status: 'success' as SuccessOrFailType,
				response,
			};
		})
		.catch((err) => {
			let stringified = '';

			try {
				stringified = JSON.stringify(dataObj);
			} catch {
				stringified = '';
			}

			const errMsg = err.response?.data?.error || '';

			fireErrLog(url, requestType, stringified, errMsg, userAuth.userUID || '');
			failCallback && failCallback(err);
			return {
				status: 'error' as SuccessOrFailType,
				response: err,
			};
		});

	return axiosResult;
};

const fireErrLog = (
	url: string,
	requestType: 'get' | 'post',
	dataObj: string = '',
	errMsg: string = '',
	userId: string = '',
) => {
	axios.post(`${process.env.NEXT_PUBLIC_BE_BASE_URL}/api/utils/insertErrLog`, {
		uri: url.replace(process.env.NEXT_PUBLIC_BE_BASE_URL!, ''),
		requestType,
		data: dataObj,
		errMsg,
		userId,
	});
};

const appDelay = (time: number) => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(true);
		}, time);
	});
};

const exampleAxios = () => {
	// ? Post
	// axios
	// 	.post(
	// 		`${process.env.NEXT_PUBLIC_BE_BASE_URL}/api/chat/getPrivateChatList`,
	// 		{ fromUID: authStore.userUID, toUID: userUID },
	// 		{
	// 			headers: { Authorization: `Bearer ${authStore.userToken}` },
	// 		},
	// 	)
	// 	.then((response) => {
	// 		conversationId.current = response.data.convId;
	// 		const chatGroupReduce = chatToDateGroup(response.data.chatList);
	// 		setChatList(chatGroupReduce);
	// 	});
	// ? get
	// const axiosData = await axios
	// 	.get(`${process.env.BE_BASE_URL}/api/dashboard/getTeamSkills`, {
	// 		headers: { Authorization: `Bearer ${token}` },
	// 	})
	// 	.then((response) => {
	// 		return response.data;
	// 	})
	// 	.catch((err) => {
	// 		return {
	// 			teamSkillDashboard: null,
	// 			teamSkillCountObj: {},
	// 			userDashboard: [],
	// 		};
	// 	});
	return null;
};

export {
	generateUID,
	generateImageUID,
	generateAvatarImage,
	chatToDateGroup,
	comAxiosRequest,
	exampleAxios,
	appDelay,
};
