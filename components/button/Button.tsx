import { Button as SemanticButton, ButtonProps } from 'semantic-ui-react';
import { IInputDefault } from '@utils/types/componentTypes';

interface IButton {
	buttonType?: 'primary' | 'secondary' | 'none';
	content?: string;
	basic?: boolean;
	color?: ButtonProps['color'];
	size?: IInputDefault['size'];
	loading?: boolean;
	onClick?: any;
}

const Button = ({
	buttonType = 'primary',
	content = '',
	basic = false,
	color = 'grey',
	size = 'mini',
	loading = false,
	onClick = null,
}: IButton) => {
	return (
		<SemanticButton
			primary={buttonType === 'primary'}
			secondary={buttonType === 'secondary'}
			content={content}
			basic={basic}
			color={color}
			size={size}
			loading={loading}
			onClick={onClick && onClick}
		/>
	);
};

export default Button;
