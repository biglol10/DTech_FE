import { Suspense, useEffect, useState } from 'react';
import fetchRandomNumber from '@testApi/randomNumber';

const wrapPromise = (promise) => {
	let status = 'pending';
	let response;

	const suspender = promise.then(
		(res) => {
			status = 'success';
			response = res;
		},
		(err) => {
			status = 'error';
			response = err;
		},
	);

	const read = () => {
		switch (status) {
			case 'pending':
				throw suspender;
			case 'error':
				throw response;
			default:
				return response;
		}
	};

	return { read };
};

const fetchfetch = () => {
	return { answer: wrapPromise(fetchRandomNumber) };
};

const result = fetchfetch();

const SuspenseTest = () => {
	alert(result.answer);
	return <h1>{result.answer}</h1>;
};

export default SuspenseTest;
