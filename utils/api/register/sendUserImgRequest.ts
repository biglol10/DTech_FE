import axios from 'axios';

const sendUserImgRequest = async (props: any) => {
	console.log('sendUserImgRequest');
	console.log(props.get('img'));
	const sendUserImgResult = await axios
		.post('http://localhost:3066/api/auth/uploadUserImg', props)
		.then((res: any) => {
			console.log('결과');
			console.log(res);
		})
		.catch((err) => {
			console.log('실패');
			console.log(err);
		});

	console.log('done??');

	return sendUserImgResult;
};

export { sendUserImgRequest };
