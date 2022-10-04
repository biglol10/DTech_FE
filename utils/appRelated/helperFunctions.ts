import crypto from 'crypto';
import dayjs from 'dayjs';
import axios from 'axios';
import _ from 'lodash';
import cookie from 'js-cookie';

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

const chatToDateGroup = (arr: any) => {
	const groupsReduce = arr.reduce((previouseVal: any, currentVal: any) => {
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

interface axiosRequestObj {
	url: string;
	requestType: 'get' | 'post';
	dataObj?: null | object;
	withAuth?: boolean;
	successCallback?: null | Function;
	failCallback?: null | Function;
	returnAxiosObject?: null | Function;
}

const comAxiosRequest = async (param: axiosRequestObj) => {
	const {
		url,
		requestType = 'get',
		dataObj = null,
		withAuth = false,
		successCallback = null,
		failCallback = null,
		returnAxiosObject = null,
	} = param;

	const objectParam = _.merge(
		{
			url,
			method: requestType,
		},
		dataObj && requestType === 'post' ? { data: dataObj } : { params: dataObj },
		cookie.get('token') && withAuth
			? { headers: { Authorization: `Bearer ${cookie.get('token')}` } }
			: {},
	);

	const axiosResult = await axios(objectParam)
		.then((response) => {
			successCallback && successCallback(response);
			return {
				status: 'success',
				response,
			};
		})
		.catch((err) => {
			failCallback && failCallback(err);
			return {
				status: 'error',
				response: err,
			};
		});

	console.log('axiosResult is');
	console.log(axiosResult);

	returnAxiosObject && returnAxiosObject(axiosResult);
};

export { generateUID, generateImageUID, generateAvatarImage, chatToDateGroup, comAxiosRequest };
