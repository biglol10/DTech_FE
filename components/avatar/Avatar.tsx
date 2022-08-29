/** ****************************************************************************************
 * @설명 : 아바타 component
 ********************************************************************************************
 * 번호    작업자     작업일         브랜치                       변경내용
 *-------------------------------------------------------------------------------------------
 * 1      변지욱     2022-07-18                              최초작성
 ********************************************************************************************/

import { Image as SemanticUIImage } from 'semantic-ui-react';
import { inputElCommStyle } from '@utils/styleRelated/stylehelper';
import { IAvatar } from '@utils/types/componentTypes';
import { Label } from '@components/index';
import lodash from 'lodash';
import SVGR from '@styles/svg/no_profile.svg';
import Style from './Avatar.module.scss';

const Avatar = ({
	id = '',
	src = null,
	content = '',
	color = 'black',
	spacing = 0,
	avatar = true,
	imageSize = 'mini',
	labelSize = 'big',
}: IAvatar) => {
	const imageSrc =
		src || `${process.env.NODE_ENV === 'production' ? '/dtech' : ''}/images/no_profile.png`;

	const avatarColor = [
		'#E01E5A',
		'#007A5A',
		'#552655',
		'#36C4F0',
		'#868686',
		'#0CD4C4',
		'#E8912D',
	];

	return (
		<>
			<div
				id={id}
				className={Style['avatarDiv']}
				style={{ color, ...inputElCommStyle(spacing) }}
			>
				{src ? (
					<SemanticUIImage src={imageSrc} avatar={avatar} size={imageSize} />
				) : (
					<SemanticUIImage
						avatar={avatar}
						size={imageSize}
						style={{ width: 'auto', fill: lodash.sample(avatarColor) }}
					>
						<SVGR />
					</SemanticUIImage>
				)}
				{/* <SemanticUIImage src={imageSrc} avatar={avatar} size={imageSize} />
				<SemanticUIImage avatar={avatar} size={'mini'}>
					<SVGR />
				</SemanticUIImage> */}
				{/* <SVGR /> */}
				<Label content={content} color={color} size={labelSize} paddingNone />
			</div>
		</>
	);
};

export default Avatar;
