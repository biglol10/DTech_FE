import { ICheckboxListDefault } from '@utils/types/componentTypes';
import { useCallback, useEffect, useState } from 'react';
import { CheckboxDefault } from '@components/index';

import { elCommStyle } from '@utils/styleRelated/stylehelper';
import Style from './CheckboxList.module.scss';

const CheckboxListDefault = ({
	id = '',
	size = 'small',
	labelPosition = 'top',
	direction = 'horizontal',
	onChange = null,
	items = [
		{ id: '1', disabled: false, checked: false, label: 'test1' },
		{ id: '2', disabled: false, checked: false, label: 'test2' },
		{ id: '3', disabled: false, checked: false, label: 'test3' },
		{ id: '4', disabled: false, checked: false, label: 'test4' },
	],
	fontColor = 'black',
	spacing = 0,
}: ICheckboxListDefault) => {
	const [itemList, setItemList] = useState(items);

	useEffect(() => {
		onChange && onChange({ itemList });
	}, [onChange, itemList]);

	const onChangeFn = useCallback((e: any) => {
		setItemList((prevList) =>
			prevList.map((item) => {
				if (item.id === e.id) {
					item.checked = e.isChecked;
				}
				return item;
			}),
		);
	}, []);

	const checkboxList = itemList.map((item) => (
		<CheckboxDefault
			key={item.id}
			id={item.id}
			size={size}
			labelPosition={labelPosition}
			label={item.label}
			checked={item.checked}
			onClick={onChangeFn}
			fontColor={fontColor}
		/>
	));

	return (
		<>
			<div className={Style['horizontalList']} style={elCommStyle(spacing)}>
				{direction === 'horizontal' && (
					<div className={Style['horizontalList']}>{checkboxList}</div>
				)}
				{direction === 'vertical' && (
					<div className={Style['verticalList']}>{checkboxList}</div>
				)}
			</div>
		</>
	);
};

CheckboxListDefault.displayName = 'CheckboxListDefault';

export default CheckboxListDefault;
