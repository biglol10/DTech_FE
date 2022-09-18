import axios from 'axios';

const sendBoardImgRequest = async (props: any) => {
	const sendBoardImgResult = await axios
		.post('http://localhost:3066/api/board/uploadBoard', props)
		.then((res: any) => {
			// console.log('sendBoardImg');
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
			console.log('실패');
			console.log(err);
		});

	// console.log('sendBoardImgRequest');
	// console.log(sendBoardImgResult);

	return sendBoardImgResult;
};

export { sendBoardImgRequest };
