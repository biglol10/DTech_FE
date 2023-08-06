const inputElCommStyle: any = (spacing = 0, textAlign = 'left', stretch = false) => {
	return {
		'--spacing': `${spacing}px`,
		'--align': textAlign,
		width: `${stretch ? '100%' : 'auto'}`,
	};
};

interface IParam {
	name: string;
	value: string | number;
}

interface ICustomObj {
	[name: string]: string;
}

const customStyleObj: any = (spacing = 0, param: IParam[]) => {
	const customObj: ICustomObj = {};

	customObj['--spacing'] = `${spacing}px`;

	param.map((item) => {
		customObj[`--${item.name}`] = typeof item.value === 'number' ? `${item.value}px` : item.value;
		return null;
	});

	// customObj[`--${param.name}`] =
	// 	typeof param.value === 'number' ? `${param.value}px` : param.value;

	return {
		...customObj,
	};
};

export { inputElCommStyle, customStyleObj };
