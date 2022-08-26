/** ****************************************************************************************
 * @설명 : Input With Icon
 ********************************************************************************************
 * 번호    작업자     작업일         브랜치                       변경내용
 *-------------------------------------------------------------------------------------------
 * 1      변지욱      2022-06-16     feature/JW/input            최초작성
 * 2      변지욱      2022-07-10     feature/JW/loginValidation  onChange to useCallback
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
				placeholder={placeholder}
				ref={ref}
				// value={inputValue}
				size={size}
				error={error}
				type={`${type === 'default' ? '' : type}`}
				readOnly={readOnly}
				disabled={disabled}
				maxLength={maxLength}
				icon
				// icon={IconClone}
				iconPosition={iconPosition} // type이 'left' | undefined이지만 right가 먹히기 때문에 ts-nocheck 설정
				style={stretch ? { width: '100%' } : {}}
				onKeyUp={(evt: KeyboardEvent) => evt.key === 'Enter' && onEnter && onEnter()}
			>
				{iconPosition === 'left' ? (
					<>
						{IconClone}
						<input value={inputValue} onChange={onChangeFn} />
					</>
				) : (
					<>
						<input value={inputValue} onChange={onChangeFn} />
						{IconClone}
					</>
				)}
			</Input>
		);
	},
);

InputWithIcon.displayName = 'InputWithIcon';
export default InputWithIcon;
