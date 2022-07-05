const inputElCommStyle: any = (spacing = 0, textAlign = 'left', stretch = false) => {
	return {
		'--spacing': `${spacing}px`,
		'--align': textAlign,
		width: `${stretch ? '100%' : 'auto'}`,
	};
};

export { inputElCommStyle };
