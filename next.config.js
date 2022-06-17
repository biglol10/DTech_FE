/** @type {import('next').NextConfig} */

const path = require('path');

module.exports = {
	reactStrictMode: false, // react strict mode가 설정되어 있을 때, React가 side effects를 찾아내기 위해 의도적으로 hook을 이중 호출할 수 있는데 그걸 끔
	distDir: '.next',
	basePath: '/react', // Url/react 이렇게 붙여주는 것
	async redirects() {
		// Url/react 이렇게 붙여주는 것
		return [
			{
				source: '/',
				destination: '/react',
				basePath: false,
				permanent: false, // true 일 경우 uses the 308 status code which instructs the browser to cache the redirect
			},
		];
	},
	webpack(config) {
		// console.log(config);
		const prod = process.env.MODE_ENV === 'production';

		console.log(`prod value is ${prod}`);

		// ? 절대경로 설정 (만약에 tsconfig에 정의되어 있지 않거나 .js파일에서 절대경로 쓰고 싶을 경우 여기에 정의하면 된다)
		config.resolve.alias['@pages'] = path.resolve(__dirname, 'pages');
		config.resolve.alias['@components'] = path.resolve(__dirname, 'components');
		config.resolve.alias['@globalStyle'] = path.resolve(__dirname, 'globalStyle');
		config.resolve.alias['@styles'] = path.resolve(__dirname, 'styles');
		config.resolve.alias['@layouts'] = path.resolve(__dirname, 'layouts');
		config.resolve.alias['@utils'] = path.resolve(__dirname, 'utils');
		config.resolve.alias['@store'] = path.resolve(__dirname, 'store');
		config.resolve.alias['@testApi'] = path.resolve(__dirname, 'testApi');
		config.resolve.alias['@saga'] = path.resolve(__dirname, 'saga');

		return {
			...config,
			mode: prod ? 'production' : 'development',
			devtool: 'eval',
		};
	},
};
