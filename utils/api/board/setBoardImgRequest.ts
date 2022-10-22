import axios from 'axios';

const sendBoardImgRequest = async (props: any) => {
	const sendBoardImgResult = await axios
		.post(`${process.env.NEXT_PUBLIC_BE_BASE_URL}/api/board/uploadBoard`, props)
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

	// console.log('sendBoardImgRequest');
	// console.log(sendBoardImgResult);

	return sendBoardImgResult;
};

export { sendBoardImgRequest };
