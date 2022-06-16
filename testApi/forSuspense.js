// eslint-disable-next-line consistent-return
const fetchProfileData = () => {
	const userPromise = fetchUser();
	const postsPromise = fetchPosts();

	return {
		user: wrapPromise(userPromise),
		posts: wrapPromise(postsPromise),
	};
};

const wrapPromise = (promise) => {
	let status = 'pending';
	let result;
	const suspender = promise.then(
		(r) => {
			status = 'success';
			result = r;
		},
		(e) => {
			status = 'error';
			result = e;
		},
	);

	const read = () => {
		switch (status) {
			case 'pending':
				throw suspender;
			case 'error':
				throw result;
			default:
				return result;
		}
	};

	return { read };
};

const fetchUser = () => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve({
				name: 'Ringo Starr',
			});
		}, 3000);
	});
};

const fetchPosts = () => {
	console.log('fetch posts...');
	return new Promise((resolve) => {
		setTimeout(() => {
			console.log('fetched posts');
			resolve([
				{
					id: 0,
					text: 'I get by with a little help from my friends',
				},
				{
					id: 1,
					text: 'I get by with a little help from my friends2222',
				},
				{
					id: 2,
					text: 'You got that sand all over your feet',
				},
			]);
		}, 3100);
	});
};

export default fetchProfileData;
