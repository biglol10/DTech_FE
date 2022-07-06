import { ChangeEvent, forwardRef, useEffect, useState } from 'react';
import { Icon, Input } from 'semantic-ui-react';
import { IInputWithIcon } from '@utils/types/componentTypes';

const InputWithIcon = forwardRef<any, IInputWithIcon>(
	(
		{
			id = '',
			className = '',
			placeholder = '',
			value = '',
			onChange = null,
			size = 'small',
			error = false,
			loading = false,
			type = 'default',
			readOnly = false,
			disabled = false,
			maxLength = undefined,
			inputIcon = <Icon name="at" />,
			stretch = false,
			onEnter = null,
		},
		ref,
	) => {
		const [inputValue, setInputValue] = useState(value);

		const onChangeFn = (e: ChangeEvent<HTMLInputElement>) => {
			setInputValue(e.target.value);
		};

		useEffect(() => {
			onChange &&
				onChange({
					value: inputValue,
				});
		}, [inputValue, onChange]);

		return (
			<Input
				id={id}
				className={className}
				iconPosition="left"
				loading={loading}
				placeholder={placeholder}
				ref={ref}
				value={inputValue}
				onChange={onChangeFn}
				size={size}
				error={error}
				type={`${type === 'default' ? '' : type}`}
				readOnly={readOnly}
				disabled={disabled}
				maxLength={maxLength}
				style={stretch ? { width: '100%' } : {}}
				onKeyUp={(evt: any) => evt.keyCode === 13 && onEnter && onEnter()}
			>
				{inputIcon}
				<input />
			</Input>
		);
	},
);

InputWithIcon.displayName = 'InputWithIcon';

export default InputWithIcon;
