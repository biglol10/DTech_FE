import { Label as SemanticLabel, Icon } from 'semantic-ui-react';
import { ILabel } from '@utils/types/componentTypes';

const Label = ({
	basic = true,
	content = '',
	iconOrImage = 'none',
	icon = <Icon name="arrow alternate circle right outline" />,
	imageSrc = '',
	color = 'black',
	borderNone = true,
	size = 'small',
}: ILabel) => {
	return (
		<SemanticLabel
			basic={basic}
			image={iconOrImage === 'image'}
			color={color}
			style={borderNone ? { border: 'none' } : {}}
			size={size}
		>
			{iconOrImage === 'icon' && icon}
			{iconOrImage === 'image' && <img src={imageSrc} />}
			{content}
		</SemanticLabel>
	);
};

export default Label;
