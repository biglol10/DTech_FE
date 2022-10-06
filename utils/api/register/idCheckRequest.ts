import axios from 'axios';

interface IUserId {
	userId: string;
}

const idCheckRequest = async (props: IUserId) => {
	const idCheckResult = await axios
		.post(`${process.env.NEXT_PUBLIC_BE_BASE_URL}/api/auth/idCheck`, props)
		.then((res: any) => {
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
