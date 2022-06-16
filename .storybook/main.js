const path = require('path');

module.exports = {
	stories: ['../stories/**/*.stories.mdx', '../stories/**/*.stories.@(js|jsx|ts|tsx)'],
	addons: [
		'@storybook/addon-links',
		'@storybook/addon-essentials',
		'@storybook/addon-interactions',
		'@storybook/preset-scss',
	],
	framework: '@storybook/react',
	core: {
		builder: '@storybook/builder-webpack5',
	},
	webpackFinal: async (config) => {
		config.resolve.modules = [path.resolve(__dirname, '..'), 'node_modules', 'styles'];
		config.resolve.alias = {
			...config.resolve.alias,
			'@components': path.resolve(__dirname, '../components'),
			'@assets': path.resolve(__dirname, '../assets'),
			'@utils': path.resolve(__dirname, '../utils'),
			'@styles': path.resolve(__dirname, '../styles'),
		};
		return config;
	},
};
