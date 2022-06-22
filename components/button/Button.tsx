import { Button as SemanticButton } from 'semantic-ui-react';
import { IButton } from '@utils/types/componentTypes';
import Style from './Button.module.scss';

const Button = ({
	buttonType = 'primary',
	content = '',
	basic = false,
	color = 'grey',
	size = 'mini',
	loading = false,
	onClick = null,
	spacing = 0,
}: IButton) => {
	return (
		<SemanticButton
			className={Style['semanticButton']}
			primary={buttonType === 'primary'}
			secondary={buttonType === 'secondary'}
			content={content}
			basic={basic}
			color={color}
			size={size}
			loading={loading}
			onClick={onClick && onClick}
			style={{ '--spacing': `${spacing}px` }}
		/>
	);
};

export default Button;
