/** ****************************************************************************************
 * @설명 : Input With Icon
 ********************************************************************************************
 * 번호    작업자     작업일         브랜치                           변경내용
 *-------------------------------------------------------------------------------------------
 * 1      변지욱      2022-06-16     feature/JW/input            최초작성
 * 2      변지욱      2022-07-10     feature/JW/loginValidation  onChange to useCallback
 * 3      변지욱      2022-08-27     feature/JW/inputwithicon    더 많은 variation 다루기 가능하도록 수정
 ********************************************************************************************/

import React, { ChangeEvent, forwardRef, useCallback, useState } from 'react';
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
			inputIcon = <Icon name="search" />,
			stretch = false,
			onEnter = null,
			iconPosition = undefined,
			iconClick = null,
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

		const removeText = () => {
			setInputValue('');
			onChange &&
				onChange({
					value: '',
				});
		};

		const IconClone = React.cloneElement(inputIcon as React.ReactElement, {
			link: true,
			onClick: () => {
				iconClick ? iconClick() : removeText();
			},
		});

		return (
			<Input
				id={id}
				className={className}
				loading={loading}
				size={size}
				error={error}
				icon
				iconPosition={iconPosition}
				style={stretch ? { width: '100%' } : {}}
			>
				{iconPosition === 'left' ? (
					<>
						{IconClone}
						<input
							ref={ref}
							value={inputValue}
							onChange={onChangeFn}
							type={`${type === 'default' ? '' : type}`}
							placeholder={placeholder}
							readOnly={readOnly}
							disabled={disabled}
							maxLength={maxLength}
							onKeyUp={(evt: any) => evt.key === 'Enter' && onEnter && onEnter()}
						/>
					</>
				) : (
					<>
						<input
							ref={ref}
							value={inputValue}
							onChange={onChangeFn}
							type={`${type === 'default' ? '' : type}`}
							placeholder={placeholder}
							readOnly={readOnly}
							disabled={disabled}
							maxLength={maxLength}
							onKeyUp={(evt: any) => evt.key === 'Enter' && onEnter && onEnter()}
						/>
						{IconClone}
					</>
				)}
			</Input>
		);
	},
);

InputWithIcon.displayName = 'InputWithIcon';
export default InputWithIcon;
