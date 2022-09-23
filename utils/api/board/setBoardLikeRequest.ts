import axios from 'axios';

const boardLikeRequest = async (props: any) => {
	// console.log('boardLikeRequest');
	// console.log(props);
	const postData = props;
	const boardLikeResult = await axios
		.post(`${process.env.NEXT_PUBLIC_BE_BASE_URL}/api/board/setBoardLike`, postData)
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
