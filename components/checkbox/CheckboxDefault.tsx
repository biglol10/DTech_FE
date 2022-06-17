import { ICheckboxDefault } from '@utils/types/componentTypes';
import { forwardRef, useEffect, useState } from 'react';
import { Checkbox, Label } from 'semantic-ui-react';

const CheckboxDefault = forwardRef<any, ICheckboxDefault>(
	(
		{
			id = '',
			disabled = false,
			checked = true,
			onChange = null,
			size = 'small',
			label = 'test',
			labelPosition = 'right',
		},
		ref,
	) => {
		const [isChecked, setIsChecked] = useState(checked);
		const onChangeFn = () => {
			setIsChecked((prevChecked) => !prevChecked);
		};

		useEffect(() => {
			onChange && onChange({ value: isChecked });
		}, [isChecked, onChange]);

		return (
			<>
				{labelPosition === 'top' && (
					<div>
						{label !== '' && <Label htmlFor={id}> {label}</Label>}
						<Checkbox
							id={id}
							disabled={disabled}
							checked={isChecked}
							onChange={onChangeFn}
							size={size}
						/>
					</div>
				)}
				{labelPosition !== 'top' && (
					<div>
						<button onClick={() => setIsChecked((prevChecked) => !prevChecked)}>
							toggle
						</button>
						<Checkbox
							id={id}
							disabled={disabled}
							checked={isChecked}
							onChange={() => onChange}
							size={size}
						/>
						{label !== '' && <Label htmlFor={id}> {label}</Label>}
					</div>
				)}
			</>
		);
	},
);

CheckboxDefault.displayName = 'CheckboxDefault';

export default CheckboxDefault;
