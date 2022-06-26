import { ICheckboxDefault } from '@utils/types/componentTypes';
import { useEffect, useState } from 'react';
import { Checkbox, Icon } from 'semantic-ui-react';
import { Label } from '@components/index';

import Style from './Checkbox.module.scss';

const CheckboxDefault = ({
	id = '',
	disabled = false,
	checked = false,
	size = 'small',
	label = 'test',
	labelPosition = 'right',
	onClick = null,
	spacing = 0,
	fontColor = 'black',
}: ICheckboxDefault) => {
	const [isChecked, setIsChecked] = useState(checked);
	const onChangeFn = () => {
		setIsChecked((prevChecked) => !prevChecked);
	};

	useEffect(() => {
		setIsChecked(checked);
	}, [checked]);

	useEffect(() => {
		onClick &&
			onClick({
				id,
				isChecked,
			});
	}, [isChecked, onClick]);

	return (
		<>
			{labelPosition === 'top' && (
				<div className={Style['checkBoxLabelTop']}>
					<div>
						<Label content={label} color={fontColor} />
					</div>
					<Checkbox
						className={Style['checkBox']}
						id={id}
						onChange={onChangeFn}
						disabled={disabled}
						checked={isChecked}
						style={{ '--spacing': `${spacing}px` }}
						size={size}
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
						style={{ '--spacing': `${spacing}px` }}
						size={size}
					/>
					<Label content={label} color={fontColor} />
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
