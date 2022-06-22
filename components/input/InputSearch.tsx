import { ChangeEvent, forwardRef, useEffect, useState } from 'react';
import { Input, Label, Header, Icon } from 'semantic-ui-react';
import { IInputSearch } from '@utils/types/componentTypes';
import { elCommStyle } from '@utils/styleRelated/stylehelper';
import Style from './Input.module.scss';

const InputSearch = forwardRef<any, IInputSearch>(
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
			onSearchIconClick = null,
			spacing = 0,
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
				<div style={elCommStyle(spacing)} className={Style['emptyDivMarginTop']} />
				{showInputLabel && (
					<label htmlFor={id}>
						<Header className={Style['inputLabelHeader']} as={inputLabelSize}>
							{inputLabel}
						</Header>
					</label>
				)}

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
					icon={
						<Icon
							name="search"
							circular
							link
							onClick={onSearchIconClick && onSearchIconClick}
						/>
					}
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

InputSearch.displayName = 'InputSearch';

export default InputSearch;
