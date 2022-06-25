import { ReactNode, JSXElementConstructor as JSX } from 'react';
import { ButtonProps, StrictLabelProps } from 'semantic-ui-react';

export interface IInputDefault {
	id: string;
	placeholder?: string;
	value?: string;
	onChange?: Function;
	size?: 'mini' | 'small' | 'large' | 'big' | 'huge' | 'massive';
	regex?: RegExp;
	error?: boolean;
	loading?: boolean;
	errorMsg?: string;
	type?: 'default' | 'password';
	readOnly?: boolean;
	disabled?: boolean;
	maxLength?: undefined | number;
	errorLabelPosition?: 'bottom' | 'right';
	inputLabel?: string;
	inputLabelSize?: 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
	showInputLabel?: boolean;
	ref?: any;
	spacing?: number;
}

export interface IInputSearch extends IInputDefault {
	onSearchIconClick?: Function;
}

export interface IInputWithIcon extends IInputDefault {
	inputIcon?: ReactNode;
}

export interface IButton {
	buttonType?: 'primary' | 'secondary' | 'none';
	content?: string;
	basic?: boolean;
	color?: ButtonProps['color'];
	size?: IInputDefault['size'];
	loading?: boolean;
	onClick?: any;
	spacing?: number;
}

export interface ICheckboxDefault {
	id: string;
	disabled?: boolean;
	checked?: boolean;
	size?: 'mini' | 'small' | 'large' | 'big' | 'huge' | 'massive';
	label?: string;
	labelPosition?: 'top' | 'right' | undefined;
	onClick?: any;
	fontColor?: StrictLabelProps['color'];
	spacing?: number;
}
export interface ICheckboxListDefault {
	id?: string;
	size?: 'mini' | 'small' | 'large' | 'big' | 'huge' | 'massive';
	labelPosition?: 'top' | 'right' | undefined;
	onChange?: any;
	direction?: 'horizontal' | 'vertical' | undefined;
	items: Array<{ id: string; disabled?: boolean; checked?: boolean; label?: string }>;
	fontColor?: StrictLabelProps['color'];
	spacing?: number;
}

export interface ILabel {
	basic?: boolean;
	content?: string;
	iconOrImage?: 'icon' | 'image' | 'none';
	icon?: ReactNode;
	imageSrc?: string;
	color?: StrictLabelProps['color'];
	borderNone?: boolean;
	size?: StrictLabelProps['size'];
	spacing?: number;
}

export interface IAccordionItems {
	title: string;
	expanded: boolean;
	content: string | JSX.Element;
}

export interface IAccordion {
	id: string;
	backgroundColor?: string;
	fontColor?: string;
	items: IAccordionItems[];
	spacing?: number;
}

export interface IBox {
	id: string;
	children: string | JSX.Element | ReactNode;
	boxType?: 'basic' | 'primary' | 'error';
	textAlign?: 'left' | 'center' | 'right';
	className?: string;
	spacing?: number;
	onClick?: any;
}

export interface IToggle {
	id: string;
	onClick?: any;
	on?: boolean;
	spacing?: number;
}

export interface IRadio {
	id?: string;
	name?: string;
	onChange?: any;
	direction?: 'horizontal' | 'vertical' | undefined;
	labelPosition?: 'top' | 'right' | undefined;
	items: Array<{ value: string; label?: string }>;
	spacing?: number;
}

export interface IThumbnail {
	id?: string;
	spacing?: number;
	name?: string;
	href?: string;
}

export interface ISNSkillFlow {
	id?: string;
	spacing?: number;
	items?: Array<{ id?: string; name?: string; href?: string }>;
}
