const elCommStyle: any = (spacing = 0, textAlign = 'left') => {
	return {
		'--spacing': `${spacing}px`,
		'--align': textAlign,
	};
};

export { elCommStyle };
