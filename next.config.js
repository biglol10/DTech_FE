/** @type {import('next').NextConfig} */

const path = require('path');

module.exports = {
	reactStrictMode: false, // react strict mode가 설정되어 있을 때, React가 side effects를 찾아내기 위해 의도적으로 hook을 이중 호출할 수 있는데 그걸 끔
	distDir: '.next',
	basePath: process.env.NODE_ENV === 'production' ? '/dtech' : '',
	assetPrefix: process.env.NODE_ENV === 'production' ? '/dtech' : '',
	async redirects() {
		// Url/react 이렇게 붙여서 load해주는 것
		if (process.env.NODE_ENV === 'production') {
			return [
				{
					source: '/',
					destination: '/dtech',
					basePath: false,
					permanent: false, // true 일 경우 uses the 308 status code which instructs the browser to cache the redirect (즉 캐싱으로 계속 남아있어서 이거 해제해도 /react로 날라감)
				},
			];
		} else {
			return [];
		}
	},
	webpack(config) {
		// console.log(config);
		const prod = process.env.NODE_ENV === 'production';

		console.log(`prod value is ${prod}`);

		// SVG를 컴포넌트로 사용하기 위해 필요
		config.module.rules.push({
			test: /\.svg$/,
			use: ["@svgr/webpack"]
		});

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
	env: {
		customKey: 'my-value',
	},
};
