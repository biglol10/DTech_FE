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
import Style from './Avatar.module.scss';

const Avatar = ({
	id = '',
	src = `${process.env.MODE_ENV === 'production' ? '/dtech' : ''}/images/no_profile.png`,
	content = '',
	color = 'black',
	spacing = 0,
	avatar = true,
	imageSize = 'mini',
	labelSize = 'big',
}: IAvatar) => {
	return (
		<>
			<div
				id={id}
				className={Style['avatarDiv']}
				style={{ color, ...inputElCommStyle(spacing) }}
			>
				<SemanticUIImage src={src} avatar={avatar} size={imageSize} />
				<Label content={content} color={color} size={labelSize} paddingNone />
				{/* <span>{content}</span> */}
			</div>
		</>
	);
};

export default Avatar;
