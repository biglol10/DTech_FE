import axios from 'axios';

interface IRegisterUser {
	user_id: string;
	name: string;
	passwd: string;
	team: string;
	title: string;
	phonenum: string;
	detail: string;
	tech_list: string;
}

const registerRequest = async (props: IRegisterUser) => {
	const registerResult = await axios
		.post(`${process.env.NEXT_PUBLIC_BE_BASE_URL}/api/auth/registerUser`, props)
		.then((res: any) => {
			return {
				result: res.data,
			};
		})
		.catch((err) => {
			return {
				result: 'error',
				errMessage: err.message,
			};
		});

	return registerResult;
};

export { registerRequest };
