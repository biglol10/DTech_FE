import { ChangeEvent, forwardRef, useEffect, useState } from 'react';
import { Input, Label } from 'semantic-ui-react';
import { IInputDefault } from '@utils/types/componentTypes';
import Style from './Input.module.scss';

const InputDefault = forwardRef<any, IInputDefault>(
	(
		{
			id = '',
			placeholder = '',
			value = '',
			onChange = null,
			size = 'small',
			error = false,
			regex = undefined,
			loading = false,
			errorMsg = '유효하지 않는 값입니다',
			inputLabel = '',
			inputLabelSize = 'h2',
			showInputLabel = false,
			type = 'default',
			readOnly = false,
			disabled = false,
			maxLength = undefined,
			errorLabelPosition = 'bottom',
		},
		ref,
	) => {
		const [inputValue, setInputValue] = useState(value);
		const [errorState, setErrorState] = useState(error);

		useEffect(() => {
			setInputValue(value);
			value.length === 0 && setErrorState(false);
		}, [value]);

		useEffect(() => {
			setErrorState(error);
		}, [error]);

		const onChangeFn = (e: ChangeEvent<HTMLInputElement>) => {
			setInputValue(e.target.value);
			if (e.target.value.length === 0) setErrorState(false);
			else {
				regex && setErrorState(!regex.test(e.target.value));
			}
		};

		useEffect(() => {
			onChange &&
				onChange({
					value: inputValue,
					isError: errorState,
					errorMsg: errorState ? errorMsg : '',
				});
		}, [inputValue, errorState, onChange, errorMsg]);

		return (
			<>
				{showInputLabel && (
					<label htmlFor={id} className={Style['inputDefaultLabel']}>
						{inputLabel}
					</label>
				)}

				<br />

				<Input
					id={id}
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
				/>

				{errorLabelPosition === 'bottom' && <br />}
				{errorState && (
					<Label
						basic
						color="red"
						pointing={errorLabelPosition === 'right' ? 'left' : 'above'}
					>
						{errorMsg}
					</Label>
				)}
			</>
		);
	},
);

InputDefault.displayName = 'InputDefault';

export default InputDefault;
