import { Label as SemanticLabel, Icon } from 'semantic-ui-react';
import { ILabel } from '@utils/types/componentTypes';
import { inputElCommStyle } from '@utils/styleRelated/stylehelper';
import Style from './Label.module.scss';

const Label = ({
	basic = true,
	content = '',
	iconOrImage = 'none',
	icon = <Icon name="arrow alternate circle right outline" />,
	nextImage,
	color = 'black',
	borderNone = true,
	size = 'small',
	spacing = 0,
}: ILabel) => {
	return (
		<SemanticLabel
			className={Style['semanticLabel']}
			basic={basic}
			image={iconOrImage === 'image'}
			color={color}
			style={
				borderNone
					? { border: 'none', ...inputElCommStyle(spacing) }
					: { ...inputElCommStyle(spacing) }
			}
			size={size}
		>
			{iconOrImage === 'icon' && icon}
			{iconOrImage === 'image' && nextImage}
			{content}
		</SemanticLabel>
	);
};

export default Label;
