import axios from 'axios';

const sendBoardImgRequest = async (props: any) => {
	const sendBoardImgResult = await axios
		.post('http://localhost:3066/api/board/uploadBoardImg', props)
		.then((res: any) => {
			// console.log('결과');
			// console.log(res);
		})
		.catch((err) => {
			console.log('실패');
			console.log(err);
		});

	return sendBoardImgResult;
};

export { sendBoardImgRequest };
