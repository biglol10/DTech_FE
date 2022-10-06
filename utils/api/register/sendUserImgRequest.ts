import axios from 'axios';

const sendUserImgRequest = async (props: object) => {
	const sendUserImgResult = await axios
		.post(`${process.env.NEXT_PUBLIC_BE_BASE_URL}/api/auth/uploadUserImg`, props)
		.then((res: any) => {})
		.catch((err) => {
			console.log('실패');
			console.log(err);
		});

	return sendUserImgResult;
};

export { sendUserImgRequest };
