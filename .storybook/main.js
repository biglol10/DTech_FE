const path = require('path');

module.exports = {
	stories: ['../stories/**/*.stories.mdx', '../stories/**/*.stories.@(js|jsx|ts|tsx)'],
	addons: [
		'@storybook/addon-links',
		'@storybook/addon-essentials',
		'@storybook/addon-interactions',
	],
	framework: '@storybook/react',
	core: {
		builder: '@storybook/builder-webpack5',
	},
	webpackFinal: async (config) => {
		config.resolve.modules = [path.resolve(__dirname, '..'), 'node_modules'];
		config.resolve.alias = {
			...config.resolve.alias,
			'@components': path.resolve(__dirname, '../components'),
			'@assets': path.resolve(__dirname, '../assets'),
			'@utils': path.resolve(__dirname, '../utils'),
			'@styles': path.resolve(__dirname, '../styles'),
			'@store': path.resolve(__dirname, '../store'),
			'@saga': path.resolve(__dirname, '../saga'),
			'@testApi': path.resolve(__dirname, '../testApi'),
		};

		// '@storybook/preset-scss' 제거하고 sass-loader 직접 사용토록 수정
		config.module.rules.push({
			test: /\.s(a|c)ss$/,
			include: path.resolve(__dirname, '../'),
			use: [
				'style-loader',
				{
					loader: 'css-loader',
					options: {
						modules: {
							auto: true,
							localIdentName: '[name]__[local]--[hash:base64:5]', // index_testButton__z9CpQ 처럼 [path]_[uniqueId]로 표시하고 싶은데 @storybook/preset-scss 쓰면 [uniqueId]만 표시됨 (예시: SKwgNtUsLB_olGMb4p9w )
						},
					},
				},
				'sass-loader',
			],
		});

		// // 20220801 SVG as component
		// const assetRule = config.module.rules.find(({ test }) => test.test('.svg'));
		// assetRule.exclude = /\.svg$/;

		// config.module.rules.push({
		// 	test: /\.svg$/,
		// 	include: path.resolve(__dirname, '../'),
		// 	use: ['@svgr/webpack'],
		// });

		return config;
	},
};
