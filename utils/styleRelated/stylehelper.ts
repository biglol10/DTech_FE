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

const customStyle1: any = (spacing = 0, param: IParam) => {
	const customObj: ICustomObj = {};

	customObj['--spacing'] = `${spacing}px`;
	customObj[`--${param.name}`] =
		typeof param.value === 'number' ? `${param.value}px` : param.value;

	return {
		...customObj,
	};
};

export { inputElCommStyle, customStyle1 };
