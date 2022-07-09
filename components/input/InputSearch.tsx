import { ChangeEvent, forwardRef, useState, useCallback } from 'react';
import { Input, Icon } from 'semantic-ui-react';
import { IInputSearch } from '@utils/types/componentTypes';

const InputSearch = forwardRef<any, IInputSearch>(
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
			onSearchIconClick = null,
			stretch = false,
			error = false,
			onEnter = null,
		},
		ref,
	) => {
		const [inputValue, setInputValue] = useState(value);

		const onChangeFn = useCallback(
			(e: ChangeEvent<HTMLInputElement>) => {
				setInputValue(e.target.value);
				onChange &&
					onChange({
						value: e.target.value,
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
				style={stretch ? { width: '100%' } : {}}
				onKeyUp={(evt: any) => evt.keyCode === 13 && onEnter && onEnter()}
			/>
		);
	},
);

InputSearch.displayName = 'InputSearch';

export default InputSearch;
