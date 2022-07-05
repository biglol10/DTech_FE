import { ChangeEvent, forwardRef, useEffect, useState } from 'react';
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
			/>
		);
	},
);

InputSearch.displayName = 'InputSearch';

export default InputSearch;
