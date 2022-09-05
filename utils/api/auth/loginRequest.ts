import axios from 'axios';

interface authObjParamSetting {
	userId: string;
	password: string;
}

const fireTokenRequest = async (token: string) => {
	const authResult = await axios
		.post(
			'http://localhost:3066/api/auth/getLoggedInUserInfo',
			{},
			{
				headers: { Authorization: token },
			},
		)
		.then((response) => {
			console.log('responseData in fireTokenRequest is ');
			console.log(response.data);
			return response.data;
		})
		.catch((err) => {
			return {
				success: false,
				user: {},
			};
		});

	return authResult;
};

const fireLoginRequest = async (props: authObjParamSetting) => {
	const loginResult = await axios
		.post('http://localhost:3066/api/auth/loginUser', props, {
			headers: {
				'Content-Type': 'application/json',
			},
		})
		.then(({ data: responseData }) => {
			console.log('responseData in loginResult is ');
			console.log(responseData);
			if (responseData.result === 'success') {
				return {
					userName: responseData.name,
					userId: responseData.userId,
					time: responseData.time,
					userToken: responseData.token,
					userUID: responseData.userUID,
					result: 'success',
				};
			} else {
				return {
					result: responseData.result,
					errMessage: responseData.message,
				};
			}
		})
		.catch((err) => {
			return {
				result: 'error',
				errMessage: err.message,
			};
		});

	return loginResult;
};

export { fireLoginRequest, fireTokenRequest };
