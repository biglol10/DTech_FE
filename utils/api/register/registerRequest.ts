import axios from 'axios';

const registerRequest = async (props: any) => {
	const registerResult = await axios
		.post('http://localhost:3066/api/auth/registerUser', props)
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
