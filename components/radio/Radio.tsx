import { useEffect, useState, useCallback } from 'react';
import { IRadio } from '@utils/types/componentTypes';
import { Radio as SemanticRadio } from 'semantic-ui-react';
import { Label } from '@components/index';

import { inputElCommStyle } from '@utils/styleRelated/stylehelper';
import Style from './Radio.module.scss';

const Radio = ({
	className = '',
	id = '',
	spacing = 0,
	name = 'radioGroup',
	onChange = null,
	direction = 'horizontal',
	labelPosition = 'right',
	items = [
		{ value: 'radio1', label: 'radasdasdadsio1' },
		{ value: 'radio2', label: 'radio2' },
		{ value: 'radio3', label: 'radio3' },
		{ value: 'radio4', label: 'radio4' },
	],
}: IRadio) => {
	const [itemList, setItemList] = useState(items.map((item) => ({ ...item, checked: false })));

	useEffect(() => {
		const ClickedItem = itemList.filter((item) => item.checked === true);

		if (ClickedItem !== undefined) {
			// console.log(ClickedItem[0]);
			onChange && onChange(ClickedItem[0]);
		}
	}, [onChange, itemList]);

	const onChangeFn = useCallback((e: any) => {
		setItemList((prevList) =>
			prevList.map((item) => {
				if (item.value === e.target.value) {
					item.checked = true;
				} else {
					item.checked = false;
				}
				return item;
			}),
		);
	}, []);

	const radioList = itemList.map((item) => (
		<div key={item.value} className={`${Style[`label_${labelPosition}`]} ${className}`}>
			<SemanticRadio id={item.value} name={name} value={item.value} checked={item.checked} onClick={onChangeFn} />
			<Label content={item.label} />
		</div>
	));

	return (
		<>
			<div className={Style[`radio_${direction}`]} style={inputElCommStyle(spacing)}>
				{radioList}
			</div>
		</>
	);
};

Radio.displayName = 'Radio';

export default Radio;
