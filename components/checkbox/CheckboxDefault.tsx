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
}: ICheckboxDefault) => {
	const [isChecked, setIsChecked] = useState(checked);
	const onChangeFn = () => {
		setIsChecked((prevChecked) => !prevChecked);
	};

	// useEffect(() => {
	// 	if (items.length > 0) {
	// 		console.log(items);
	// 	}
	// });

	useEffect(() => {
		setIsChecked(checked);
	}, [checked]);

	useEffect(() => {
		if (isChecked) {
			onChange &&
				onChange({
					id,
				});
		}
	}, [isChecked, onChange]);

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
			{(labelPosition === 'right' || labelPosition === undefined) && (
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
