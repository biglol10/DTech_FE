import { ICheckboxDefault } from '@utils/types/componentTypes';
import { useEffect, useState } from 'react';
import { Checkbox, Icon, Label } from 'semantic-ui-react';

import Style from './Checkbox.module.scss';

const CheckboxDefault = ({
	id = '',
	disabled = false,
	checked = false,
	size = 'small',
	label = 'test',
	labelPosition = 'right',
	onChange = null,
	items = [
		{ id: 'hi', label: 'item label', checked: false },
		{ id: 'he', label: 'item label2', checked: false },
	],
}: ICheckboxDefault) => {
	const [isChecked, setIsChecked] = useState(checked);
	const [itemList, setItemList] = useState(items);
	const onChangeFn = () => {
		setIsChecked((prevChecked) => !prevChecked);
	};

	useEffect(() => {
		if (items.length > 0) {
			console.log(items);
		}
	});

	useEffect(() => {
		setIsChecked(checked);
	}, [checked]);

	useEffect(() => {
		onChange &&
			onChange({
				itemList,
			});
	}, [itemList]);

	return (
		<>
			{labelPosition === 'top' && (
				<div className={Style['checkBoxLabelTop']}>
					<div>
						<Label className={Style['checkBoxLabel']} size={size}>
							{label}
						</Label>
					</div>
					<Checkbox
						className={Style['checkBox']}
						id={id}
						onChange={onChangeFn}
						disabled={disabled}
						checked={isChecked}
					/>
				</div>
			)}
			{labelPosition !== 'top' && (
				// <div className={Style['checkBoxLabelRight']}>
				// 	<Checkbox
				// 		className={Style['checkBox']}
				// 		id={id}
				// 		onChange={onChangeFn}
				// 		disabled={disabled}
				// 		checked={isChecked}
				// 	/>
				// 	<Label className={Style['checkBoxLabel']} size={size}>
				// 		{label}
				// 	</Label>
				// </div>
				<div className={Style['checkBoxLabelRight']}>
					<Checkbox
						className={Style['checkBox']}
						id={id}
						onChange={onChangeFn}
						disabled={disabled}
						checked={isChecked}
					/>
					<Label className={Style['checkBoxLabel']} size={size}>
						{label}
					</Label>
				</div>
			)}
		</>
	);
};

CheckboxDefault.displayName = 'CheckboxDefault';

export default CheckboxDefault;
