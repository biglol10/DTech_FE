import axios from 'axios';

const boardLikeRequest = async (props: any) => {
	console.log('boardLikeRequest');
	// console.log(props);
	const postData = props;
	const boardLikeResult = await axios
		.post('http://localhost:3066/api/board/setBoardLike', postData)
		.then((res: any) => {
			if (res.data.resultData.status === 'success') {
				return {
					result: res.data.resultData.status,
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

	return boardLikeResult;
};

export { boardLikeRequest };
