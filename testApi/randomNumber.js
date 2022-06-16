const fetchRandomNumber = () => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(Math.floor(Math.random() * 30));
		}, 1500);
	});
};

export default fetchRandomNumber