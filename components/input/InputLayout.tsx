/** ****************************************************************************************
 * @설명 : Input Layout component
 ********************************************************************************************
 * 번호    작업자     작업일         브랜치                       변경내용
 *-------------------------------------------------------------------------------------------
 * 1      변지욱     2022-07-05                              Input 컴포넌트에 선언되는 props 분리
 ********************************************************************************************/

import React from 'react';
import { Label, Header } from 'semantic-ui-react';
import { IInputLayout } from '@utils/types/componentTypes';
import { inputElCommStyle } from '@utils/styleRelated/stylehelper';
import classNames from 'classnames/bind';
import Style from './Input.module.scss';

const InputLayout = ({
	id,
	className = '',
	children,
	inputLabel = '',
	inputLabelSize = 'h2',
	showInputLabel = false,
	spacing = 0,
	stretch = false,
	error = false,
	errorMsg = '',
	errorLabelPosition = 'bottom',
	autoFitErrorLabel = false,
}: IInputLayout) => {
	const cx = classNames.bind(Style);

	const labelSize = 'tiny';

	return (
		<div
			style={inputElCommStyle(spacing, 'left', stretch)}
			id={`${id}_inputDefault`}
			className={cx(className, 'inputLayoutDiv')}
		>
			{showInputLabel && (
				<label htmlFor={id}>
					<Header
						className={Style['inputLabelHeader']}
						as={inputLabelSize}
						style={{ position: 'relative', left: '0%' }}
					>
						{inputLabel}
					</Header>
				</label>
			)}
			{React.cloneElement(children, { stretch, error })}
			{errorLabelPosition === 'bottom' && <br />}
			{autoFitErrorLabel ? (
				<Label
					basic
					color="red"
					pointing={errorLabelPosition === 'right' ? 'left' : 'above'}
					style={{ visibility: `${error ? 'initial' : 'hidden'}` }}
					size={labelSize}
				>
					{errorMsg}
				</Label>
			) : (
				error && (
					<Label
						basic
						color="red"
						pointing={errorLabelPosition === 'right' ? 'left' : 'above'}
						size={labelSize}
					>
						{errorMsg}
					</Label>
				)
			)}
		</div>
	);
};

InputLayout.displayName = 'InputLayout';

export default InputLayout;
