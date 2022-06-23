import { Label as SemanticLabel, Icon } from 'semantic-ui-react';
import { ILabel } from '@utils/types/componentTypes';
import { elCommStyle } from '@utils/styleRelated/stylehelper';
import Style from './Label.module.scss';

const Label = ({
	basic = true,
	content = '',
	iconOrImage = 'none',
	icon = <Icon name="arrow alternate circle right outline" />,
	imageSrc = '',
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
					? { border: 'none', ...elCommStyle(spacing) }
					: { ...elCommStyle(spacing) }
			}
			size={size}
		>
			{iconOrImage === 'icon' && icon}
			{iconOrImage === 'image' && <img src={imageSrc} />}
			{content}
		</SemanticLabel>
	);
};

export default Label;
