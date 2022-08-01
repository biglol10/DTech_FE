/** ****************************************************************************************
 * @설명 : Input Dropdown
 ********************************************************************************************
 * 번호    작업자     작업일         브랜치                       변경내용
 *-------------------------------------------------------------------------------------------
 * 1      변지욱     2022-07-11   feature/JW/inputComp        최초작성
 ********************************************************************************************/

import { forwardRef, useState, useCallback, SyntheticEvent } from 'react';
import { Dropdown } from 'semantic-ui-react';
import { IInputDropdown } from '@utils/types/componentTypes';

const InputDropdown = forwardRef<any, IInputDropdown>(
	(
		{
			id = '',
			className = '',
			placeholder = '',
			value = '',
			options = [],
			onChange = null,
			keyboardInput = false,
			loading = false,
			multiple = false,
			disabled = false,
			stretch = false,
			error = false,
			onEnter = null,
		},
		ref,
	) => {
		const [dropdownValue, setDropdownValue] = useState<string | string[]>(value);

		const onChangeFn = useCallback(
			(e: SyntheticEvent<HTMLElement, Event>, data: any) => {
				setDropdownValue(data.value);
				onChange &&
					onChange({
						value: data.value,
					});
			},
			[onChange],
		);

		return (
			<Dropdown
				id={id}
				className={className}
				ref={ref}
				placeholder={placeholder}
				value={dropdownValue}
				options={options}
				onChange={onChangeFn}
				loading={loading}
				multiple={multiple}
				disabled={disabled}
				error={error}
				selection
				search={keyboardInput}
				onKeyUp={(evt: KeyboardEvent) => evt.key === 'Enter' && onEnter && onEnter()}
				style={stretch ? { width: '100%' } : {}}
			/>
		);
	},
);

InputDropdown.displayName = 'InputDropdown';

export default InputDropdown;
