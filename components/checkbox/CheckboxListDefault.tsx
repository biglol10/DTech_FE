import { ICheckboxListDefault, ICheckboxDefault } from '@utils/types/componentTypes';
import { ChangeEvent, useEffect, useState } from 'react';
import { CheckboxDefault } from '@components/index';

import Style from './CheckboxList.module.scss';

const CheckboxListDefault = ({
	id = '',
	size = 'small',
	labelPosition = 'top',
	direction = 'horizontal',
	onChange = null,
	items = [
		{ id: '1', disabled: false, checked: false, label: 'hello1' },
		{ id: '2', disabled: false, checked: false, label: 'hello2' },
		{ id: '3', disabled: false, checked: false, label: 'hello3' },
		{ id: '4', disabled: false, checked: false, label: 'hello4' },
	],
}: ICheckboxListDefault) => {
	const [itemList, setItemList] = useState(items);

	useEffect(() => {
		onChange && onChange({ itemList });
	}, [itemList, onChange]);

	const onChangeFn = (e: ChangeEvent<HTMLImageElement>) => {
		console.log(e);
	};

	const checkboxList = itemList.map((item) => (
		<CheckboxDefault
			key={item.id}
			id={item.id}
			size={size}
			labelPosition={labelPosition}
			label={item.label}
			checked={item.checked}
			onChange={(e: any) => onChangeFn(e)}
		/>
	));

	return (
		<>
			{direction === 'horizontal' && (
				<div className={Style['horizontalList']}>{checkboxList}</div>
			)}
			{direction === 'vertical' && (
				<div className={Style['verticalList']}>{checkboxList}</div>
			)}
		</>
	);
};

CheckboxListDefault.displayName = 'CheckboxListDefault';

export default CheckboxListDefault;
