import axios from 'axios';

// const getTestApiAxios = () => {
// 	return new Promise((resolve) => {
// 		axios.get('http://localhost:3066/api/testApi').then((response) => {
// 			resolve(response.data);
// 		});
// 	});
// };

const getTestApiAxios = () => {
	return axios.get('http://localhost:3066/api/testApi');
};

export default getTestApiAxios;
