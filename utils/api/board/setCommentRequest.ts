import axios from 'axios';

const commentRequest = async (props: any) => {
	const postData = props;

	// console.log('commentRequest');
	// console.log(postData);
	const commentListResult = await axios
		.post(`${process.env.NEXT_PUBLIC_BE_BASE_URL}/api/board/setComment`, postData)
		.then((res: any) => {
			// console.log(res.data);
			if (res.data.resultData.status === 'success') {
				return {
					result: res.data.resultData.status,
					commentList: res.data.resultData.queryResult,
				};
			} else {
				return {
					result: res.data.resultData.status,
				};
			}
		})
		.catch((err) => {
			return {
				result: 'error',
				errMessage: err.message,
			};
		});

	return commentListResult;
};

export { commentRequest };
