import { ChangeEvent, forwardRef, useState, useCallback } from 'react';
import { Input } from 'semantic-ui-react';
import { IInputPhone } from '@utils/types/componentTypes';

const phoneReg = /(^01\d{1}-?)(\d{3,4}-?)(\d{4})$/g;

const InputPhone = forwardRef<any, IInputPhone>(
	(
		{
			id = '',
			className = '',
			placeholder = '',
			value = '',
			onChange = null,
			size = 'small',
			loading = false,
			type = 'default',
			readOnly = false,
			disabled = false,
			maxLength = undefined,
			stretch = false,
			error = false,
			onEnter = null,
		},
		ref,
	) => {
		const [inputValue, setInputValue] = useState(value);

		const onChangeFn = useCallback(
			(e: ChangeEvent<HTMLInputElement>) => {
				const changedValue = e.target.value;

				const isError = phoneReg.test(changedValue);

				setInputValue(changedValue.replace(phoneReg, '$1-$2-$3'));
				onChange &&
					onChange({
						value: e.target.value,
						isError,
					});
			},
			[onChange],
		);

		return (
			<Input
				id={id}
				className={className}
				loading={loading}
				placeholder={placeholder}
				ref={ref}
				value={inputValue}
				onChange={onChangeFn}
				size={size}
				error={error}
				type={'number'}
				readOnly={readOnly}
				disabled={disabled}
				maxLength={maxLength}
				style={stretch ? { width: '100%' } : {}}
				onKeyUp={(evt: KeyboardEvent) => evt.key === 'Enter' && onEnter && onEnter()}
			/>
		);
	},
);

InputPhone.displayName = 'InputPhone';

export default InputPhone;
