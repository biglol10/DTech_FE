/** ****************************************************************************************
 * @설명 : Button component
 ********************************************************************************************
 * 번호    작업자     작업일         브랜치                       변경내용
 *-------------------------------------------------------------------------------------------
 * 1      변지욱     2022-06-18                              최초작성
 ********************************************************************************************/

import { Button as SemanticButton } from 'semantic-ui-react';
import { IButton } from '@utils/types/componentTypes';
import classNames from 'classnames/bind';
import Style from './Button.module.scss';

const Button = ({
	className = '',
	buttonType = 'primary',
	content = '',
	basic = false,
	color = 'grey',
	size = 'mini',
	loading = false,
	onClick = null,
	spacing = 0,
	disabled = false,
}: IButton) => {
	const cx = classNames.bind(Style);

	return (
		<SemanticButton
			className={`${cx('semanticButton')} ${className}`}
			primary={buttonType === 'primary'}
			secondary={buttonType === 'secondary'}
			content={content}
			basic={basic}
			color={color}
			size={size}
			loading={loading}
			onClick={onClick && onClick}
			style={{ '--spacing': `${spacing}px` }}
			disabled={disabled}
		/>
	);
};

export default Button;
