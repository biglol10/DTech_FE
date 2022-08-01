/** ****************************************************************************************
 * @설명 : Input Default
 ********************************************************************************************
 * 번호    작업자     작업일         브랜치                       변경내용
 *-------------------------------------------------------------------------------------------
 * 1      변지욱      2022-06-16     feature/JW/input            최초작성
 * 2      변지욱      2022-07-10     feature/JW/loginValidation  onChange to useCallback
 ********************************************************************************************/

import { ChangeEvent, forwardRef, useState, useCallback } from 'react';
import { Input } from 'semantic-ui-react';
import { IInputDefault } from '@utils/types/componentTypes';

const InputDefault = forwardRef<any, IInputDefault>(
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
				style={stretch ? { width: '100%' } : {}}
				onKeyUp={(evt: KeyboardEvent) => evt.key === 'Enter' && onEnter && onEnter()}
			/>
		);
	},
);

InputDefault.displayName = 'InputDefault';

export default InputDefault;
