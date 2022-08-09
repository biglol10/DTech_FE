import axios from 'axios';

const registerRequest = async (props: any) => {
	const postData = {
		user_id: props.idInputValue.idInputValue,
		name: props.nameInputValue.nameInputValue,
		passwd: props.pwInputValue.pwInputValue,
		team: props.teamSelectValue.teamSelectValue,
		title: props.titleSelectValue.teamSelectValue,
		phonenum: props.phoneNumValue.phoneNumValue,
		detail: props.userDetailValue.userDetailValue,
		tech_list: props.techSelectValue
			.filter((tech: any) => tech.value === true)
			.map((tech: any) => tech.key),
	};
	const registerResult = await axios
		.post('http://localhost:3066/api/auth/registerUser', postData)
		.then((res: any) => {
			return {
				result: res.data,
			};
		})
		.catch((err) => {
			return {
				result: 'error',
				errMessage: err.message,
			};
		});

	return registerResult;
};

export { registerRequest };
