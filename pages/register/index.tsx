import { Button, InputDefault } from '@components/index';
import axios from 'axios';
import React, { useState } from 'react';

const RegisterPage = (props: any) => {
	const [data, setData] = useState();
	const resData = props.axiosData.resultData.queryResult;

	// console.log(resData);

	const sendData = () => {
		console.log('Button Clicked');
		console.log(data);

		axios.post('http://localhost:3066/api/register', { inputData: data }).then((res) => {
			console.log(res);
		});
	};
	const getInputData = (e: any) => {
		// console.log('getInputData');
		// console.log(e.value);
		setData(e.value);
	};

	return (
		<div>
			<h1>Register Temp Page</h1>
			<InputDefault
				id="inputId"
				placeholder="type text"
				onChange={getInputData}
				value={data}
			/>
			<h3>{data}</h3>
			<Button content="SEND" onClick={sendData} />
			{resData.map((item: any) => (
				<h4 key={item.id}>
					{item.id} {item.name} {item.now}
				</h4>
			))}
		</div>
	);
};

export const getServerSideProps = async (context: any) => {
	// console.log(context);
	// console.log(context.req.cookies);

	const axiosData = await axios.get('http://localhost:3066/api/register/get').then((response) => {
		if (response) {
			return response.data;
		}
	});

	return { props: { axiosData } };
};

export default RegisterPage;
