import axios from 'axios';

const idCheckRequest = async (props: any) => {
	const idCheckResult = await axios
		.post('http://localhost:3066/api/auth/idCheck', props)
		.then((res: any) => {
			console.log('idCheckRequest');
			console.log(res);
			if (res.data.result === 'success') {
				return {
					result: res.data.result,
					foundId: res.data.foundId,
				};
			} else {
				return {
					result: res.data.result,
				};
			}
		})
		.catch((err) => {
			return {
				result: 'error',
				errMessage: err.message,
			};
		});

	return idCheckResult;
};

export { idCheckRequest };
