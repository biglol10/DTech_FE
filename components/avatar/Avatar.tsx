/** ****************************************************************************************
 * @설명 : 아바타 component
 ********************************************************************************************
 * 번호    작업자     작업일         브랜치                       변경내용
 *-------------------------------------------------------------------------------------------
 * 1      변지욱     2022-07-18                              최초작성
 * 2      변지욱     2022-08-31   feature/JW/dashboard       리랜더링 방지를 위해 React.memo 추가
 ********************************************************************************************/

import React from 'react';
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
	fontColor = 'black',
	spacing = 0,
	avatar = true,
	imageSize = 'mini',
	labelSize = 'big',
	svgColor = '',
}: IAvatar) => {
	const imageSrc: string =
		src || `${process.env.NODE_ENV === 'production' ? '/dtech' : ''}/images/no_profile.png`;

	const avatarColor = [
		'#E01E5A',
		'#007A5A',
		'#552655',
		'#36C4F0',
		'#868686',
		'#0CD4C4',
		'#E8912D',
		'#1D1C1D',
		'#0B4C8C',
		'#2AAC77',
		'#F2C744',
		'#435A64',
	];

	return (
		<>
			<div
				id={id}
				className={Style['avatarDiv']}
				style={{ fontColor, ...inputElCommStyle(spacing) }}
			>
				{src ? (
					<SemanticUIImage src={imageSrc} avatar={avatar} size={imageSize} />
				) : (
					<SemanticUIImage
						avatar={avatar}
						size={imageSize}
						style={{ width: 'auto', fill: svgColor || lodash.sample(avatarColor) }}
					>
						<SVGR />
					</SemanticUIImage>
				)}
				{/* <SemanticUIImage src={imageSrc} avatar={avatar} size={imageSize} />
				<SemanticUIImage avatar={avatar} size={'mini'}>
					<SVGR />
				</SemanticUIImage> */}
				{/* <SVGR /> */}
				<Label content={content} color={fontColor} size={labelSize} paddingNone />
			</div>
		</>
	);
};

// PersonCard 에서 popupView이 변경될 때마다 리랜더링이 발생하는데 그럼 랜덤으로 가져온 색이 클릭할 때마다 랜덤으로 변함... 그래서 Avatar컴포넌트 자체에서 무언가 바뀐게 없을 때 리랜더링이 이뤄지지 않게 (색이 또 변하지 않게) 해당 로직 추가
const areEqualComp = (prevProps: any, nextProps: any) => {
	return prevProps.content === nextProps.content;
};

export default React.memo(Avatar, areEqualComp);
