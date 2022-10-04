import { comAxiosRequest } from '@utils/appRelated/helperFunctions';

interface authObjParamSetting {
	userId: string;
	password: string;
}

const fireTokenRequest = async (token: string) => {
	const axiosResult = await comAxiosRequest({
		url: `${process.env.NEXT_PUBLIC_BE_BASE_URL}/api/auth/getLoggedInUserInfo`,
		dataObj: {},
		requestType: 'post',
		withAuth: true,
	});

	if (axiosResult.status === 'success') {
		return axiosResult.response.data;
	} else {
		return {
			success: false,
			user: {},
		};
	}
};

const fireLoginRequest = async (props: authObjParamSetting) => {
	const axiosResult = await comAxiosRequest({
		url: `${process.env.NEXT_PUBLIC_BE_BASE_URL}/api/auth/loginUser`,
		requestType: 'post',
		dataObj: props,
	});

	if (axiosResult.status === 'success') {
		const { data: responseData } = axiosResult.response;

		return {
			userName: responseData.name,
			userId: responseData.userId,
			time: responseData.time,
			userToken: responseData.token,
			userUID: responseData.userUID,
			userProfileImg: responseData.userProfileImg,
			result: 'success',
		};
	}

	return {
		result: 'error',
		errMessage: '로그인에 실패했습니다',
	};
};

export { fireLoginRequest, fireTokenRequest };
