import React from 'react';
import { Label, Header } from 'semantic-ui-react';
import { IInputLayout } from '@utils/types/componentTypes';
import { inputElCommStyle } from '@utils/styleRelated/stylehelper';
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
	return (
		<div
			style={inputElCommStyle(spacing, 'left', stretch)}
			id={`${id}_inputDefault`}
			className={Style[className]}
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
				>
					{errorMsg}
				</Label>
			) : (
				error && (
					<Label
						basic
						color="red"
						pointing={errorLabelPosition === 'right' ? 'left' : 'above'}
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
