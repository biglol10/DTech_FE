import { ICheckboxDefault } from '@utils/types/componentTypes';
import { forwardRef, useEffect, useState } from 'react';
import { Checkbox, Icon, Label } from 'semantic-ui-react';

import Style from './Checkbox.module.scss';

const CheckboxDefault = forwardRef<any, ICheckboxDefault>(
	(
		{
			id = '',
			disabled = false,
			checked = false,
			size = 'small',
			label = 'test',
			labelPosition = 'right',
			help = 'checkbox for the test',
		},
		ref,
	) => {
		const [isChecked, setIsChecked] = useState(checked);
		const [showIcon, setShowIcon] = useState(false);
		const onChangeFn = () => {
			setIsChecked((prevChecked) => !prevChecked);
		};

		useEffect(() => {
			setIsChecked(checked);
		}, [checked]);

		return (
			<>
				{labelPosition === 'top' && (
					<div className={Style['checkBoxLabelTop']}>
						<div>
							<Label className={Style['checkBoxLabel']} size={size}>
								{label}
							</Label>
							<Icon
								className={Style['checkBoxHelpIcon']}
								name="question circle"
								onMouseOver={() => {
									setShowIcon(true);
								}}
								onMouseOut={() => {
									setShowIcon(false);
								}}
								size="small"
							></Icon>
							{showIcon && (
								<Label
									className={Style['checkBoxHelpLabel']}
									pointing="left"
									label={label}
								>
									{help}
								</Label>
							)}
						</div>
						<Checkbox
							className={Style['checkBox']}
							id={id}
							onChange={onChangeFn}
							disabled={disabled}
							checked={isChecked}
							help={help}
						/>
					</div>
				)}
				{labelPosition !== 'top' && (
					<div className={Style['checkBoxLabelRight']}>
						<Checkbox
							className={Style['checkBox']}
							id={id}
							onChange={onChangeFn}
							disabled={disabled}
							checked={isChecked}
							help={help}
						/>
						<Label className={Style['checkBoxLabel']} size={size}>
							{label}
						</Label>
						<Icon
							className={Style['checkBoxHelpIcon']}
							name="question circle"
							onMouseOver={() => {
								setShowIcon(true);
							}}
							onMouseOut={() => {
								setShowIcon(false);
							}}
							size="small"
						></Icon>
						{showIcon && (
							<Label
								className={Style['checkBoxHelpLabel']}
								pointing="left"
								label={label}
							>
								{help}
							</Label>
						)}
					</div>
				)}
			</>
		);
	},
);

CheckboxDefault.displayName = 'CheckboxDefault';

export default CheckboxDefault;
