/** ****************************************************************************************
 * @설명 : Input Phone
 ********************************************************************************************
 * 번호    작업자     작업일         브랜치                       변경내용
 *-------------------------------------------------------------------------------------------
 * 1      변지욱      2022-07-30     feature/JW/inputPhone       최초작성
 ********************************************************************************************/

import { ChangeEvent, forwardRef, useState, useCallback } from 'react';
import { Input } from 'semantic-ui-react';
import { IInputPhone } from '@utils/types/componentTypes';

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
			readOnly = false,
			disabled = false,
			stretch = false,
			error = false,
			onEnter = null,
		},
		ref,
	) => {
		const [inputValue, setInputValue] = useState(value);

		const onChangeFn = useCallback(
			(e: ChangeEvent<HTMLInputElement>) => {
				const targetValue = e.target.value;
				const phoneFormat = e.target.value
					.replace(/[^0-9]/g, '')
					.replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, '$1-$2-$3')
					.replace(/(-{1,2})$/g, '');

				setInputValue(phoneFormat);

				onChange &&
					onChange({
						value: targetValue.replaceAll('-', ''),
						phoneFormat,
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
				type={'text'}
				readOnly={readOnly}
				disabled={disabled}
				maxLength={13}
				style={stretch ? { width: '100%' } : {}}
				onKeyUp={(evt: KeyboardEvent) => evt.key === 'Enter' && onEnter && onEnter()}
			/>
		);
	},
);

InputPhone.displayName = 'InputPhone';

export default InputPhone;
