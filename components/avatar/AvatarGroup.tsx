/** ****************************************************************************************
 * @설명 : 아바타 그룹 component (slack과 같은)
 ********************************************************************************************
 * 번호    작업자     작업일         브랜치                       변경내용
 *-------------------------------------------------------------------------------------------
 * 1      변지욱     2022-07-20                              최초작성
 ********************************************************************************************/

import { customStyleObj } from '@utils/styleRelated/stylehelper';
import { useState } from 'react';
import classNames from 'classnames/bind';
import { Image as SemanticUIImage } from 'semantic-ui-react';
import lodash from 'lodash';
import SVGR from '@styles/svg/no_profile.svg';
import Style from './AvatarGroup.module.scss';

interface IImageList {
	className?: string;
	spacing?: number;
	imageList: Array<string>;
	divHeight: number;
	totalCount: number;
	showCount?: boolean;
}

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

const AvatarGroup = ({
	className = '',
	imageList,
	spacing = 0,
	divHeight,
	totalCount = 0,
	showCount = true,
}: IImageList) => {
	const [showTooltip, setShowTooltip] = useState(false);

	const cx = classNames.bind(Style);

	// const avatarImgList = (
	// 	<SemanticUIImage
	// 		avatar={true}
	// 		size={'mini'}
	// 		style={{
	// 			width: 'auto',
	// 			fill: lodash.sample(avatarColor),
	// 			zIndex: `${imageList.length > 5 ? 5 : imageList.length - idx}`,
	// 		}}
	// 		className={Style['userImage']}
	// 	>
	// 		<SVGR />
	// 	</SemanticUIImage>
	// );

	return (
		<div
			className={`${Style['avatarGroup']} ${className}`}
			style={customStyleObj(spacing, [{ name: 'divHeight', value: divHeight }])}
		>
			<div
				className={cx('avatarUser', `${showTooltip ? 'showBorder' : 'hideBorder'}`)}
				onMouseEnter={() => setShowTooltip(true)}
				onMouseLeave={() => setShowTooltip(false)}
			>
				{imageList.slice(0, 5).map((imgSrc, idx) => (
					<SemanticUIImage
						key={`avatarUserImg_${idx}`}
						avatar={true}
						size={'mini'}
						style={{
							width: 'auto',
							fill: lodash.sample(avatarColor),
							zIndex: `${imageList.length > 5 ? 5 : imageList.length - idx}`,
						}}
						className={Style['userImage']}
					>
						<SVGR />
					</SemanticUIImage>
					// <img
					// 	key={`avatarUserImg_${idx}`}
					// 	src={imgSrc}
					// 	className={Style['userImage']}
					// 	style={{
					// 		zIndex: `${imageList.length > 5 ? 5 : imageList.length - idx}`,
					// 	}}
					// />
				))}
			</div>

			{showTooltip && (
				<div
					style={{
						width: '150px',
						backgroundColor: '#424949',
						color: 'white',
						padding: '10px',
						position: 'absolute',
						top: '150%',
						right: '70%',
						zIndex: '999',
					}}
				>
					<h6>
						변지욱(선임), 장보영(선임), 이지은(선임){' '}
						{totalCount > 3 && `외 ${totalCount}명`}
					</h6>
				</div>
			)}

			{showCount && <span className={Style['avatarUserCount']}>{totalCount}명의 멤버</span>}
		</div>
	);
};

export default AvatarGroup;
