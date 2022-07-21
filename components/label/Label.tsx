/** ****************************************************************************************
 * @설명 : Label component
 ********************************************************************************************
 * 번호    작업자     작업일         브랜치                       변경내용
 *-------------------------------------------------------------------------------------------
 * 1      변지욱     2022-06-19                              최초작성
 ********************************************************************************************/

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
	paddingNone = false,
}: ILabel) => {
	return (
		<SemanticLabel
			className={Style['semanticLabel']}
			basic={basic}
			image={iconOrImage === 'image'}
			style={
				borderNone
					? {
							border: 'none',
							...inputElCommStyle(spacing),
							color,
							background: 'none',
							padding: `${paddingNone ? '0' : 'auto'}`,
					  }
					: {
							...inputElCommStyle(spacing),
							color,
							background: 'none',
							padding: `${paddingNone ? '0' : 'auto'}`,
					  }
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
