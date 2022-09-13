import axios from 'axios';

const commentListRequest = async (props: any) => {
	const postData = props;

	// console.log('commentListRequest');
	// console.log(postData);
	const commentListResult = await axios
		.post('http://localhost:3066/api/board/getComments', postData)
		.then((res: any) => {
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

export { commentListRequest };
