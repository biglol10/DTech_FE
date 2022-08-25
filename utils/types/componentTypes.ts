/** ****************************************************************************************
 * @설명 : 컴포넌트에 쓰이는 interface / type
 ********************************************************************************************
 * 번호    작업자     작업일         브랜치                       변경내용
 *-------------------------------------------------------------------------------------------
 * 1      변지욱     2022-06-16                              최초작성
 ********************************************************************************************/

import { ReactNode, JSXElementConstructor as JSX } from 'react';
import { ButtonProps, StrictLabelProps } from 'semantic-ui-react';

export interface IInputLayout {
	id?: string;
	className?: string;
	children: any;
	inputLabel?: string;
	inputLabelSize?: 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
	showInputLabel?: boolean;
	spacing?: number;
	stretch?: boolean;
	error?: boolean;
	errorMsg?: string;
	errorLabelPosition?: 'bottom' | 'right';
	autoFitErrorLabel?: boolean;
}

export interface IInputDefault {
	id: string;
	placeholder?: string;
	value?: string;
	className?: string;
	onChange?: Function;
	size?: 'mini' | 'small' | 'large' | 'big' | 'huge' | 'massive';
	loading?: boolean;
	type?: 'default' | 'password';
	readOnly?: boolean;
	disabled?: boolean;
	maxLength?: undefined | number;
	ref?: any;
	stretch?: boolean;
	error?: boolean;
	onEnter?: Function;
}

export interface IInputSearch extends IInputDefault {
	onSearchIconClick?: Function;
}

export interface IInputWithIcon extends IInputDefault {
	inputIcon?: ReactNode;
}

export interface IInputPhone extends IInputDefault {}

export interface IButton {
	className?: string;
	buttonType?: 'primary' | 'secondary' | 'none';
	content: string | JSX.Element;
	basic?: boolean;
	color?: ButtonProps['color'];
	size?: IInputDefault['size'];
	loading?: boolean;
	onClick?: any;
	spacing?: number;
	disabled?: boolean;
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
	content?: string | JSX.Element;
	iconOrImage?: 'icon' | 'image' | 'none';
	icon?: ReactNode;
	nextImage?: JSX.Element;
	color?: string;
	borderNone?: boolean;
	size?: StrictLabelProps['size'];
	spacing?: number;
	paddingNone?: boolean;
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
	stretch?: boolean;
}

export interface IBox {
	id: string;
	children: string | JSX.Element | ReactNode;
	boxType?: 'basic' | 'primary' | 'error';
	textAlign?: 'left' | 'center' | 'right';
	className?: string;
	spacing?: number;
	onClick?: any;
	stretch?: boolean;
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

export interface IInputDropdown {
	id?: string;
	className?: string;
	placeholder?: string;
	value?: string | string[];
	options?: object[];
	onChange?: Function;
	loading?: boolean;
	multiple?: boolean;
	disabled?: boolean;
	stretch?: boolean;
	error?: boolean;
	onEnter?: Function;
	keyboardInput?: boolean;
}

export interface IAvatar {
	id?: string;
	src?: any;
	content: string | JSX.Element;
	color?: string;
	spacing?: number;
	avatar?: boolean;
	imageSize?: 'mini' | 'small' | 'large' | 'big' | 'huge' | 'massive';
	labelSize?: 'mini' | 'small' | 'large' | 'big' | 'huge' | 'massive';
}

export interface ITextWithDotAnimation {
	content?: string;
	color?: string;
	uiType?: 'dot-flashing' | 'dot-elastic' | 'dot-pulse' | 'dot-carousel';
	marginLeftValue?: number;
	dotSize?: number;
	className?: '';
	hide?: boolean;
}
