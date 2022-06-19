import { Button as SemanticButton } from 'semantic-ui-react';
import { IButton } from '@utils/types/componentTypes';

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
