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
import Style from './AvatarGroup.module.scss';

interface IImageList {
	className?: string;
	spacing?: number;
	imageList: Array<string>;
	divHeight: number;
	showCount?: boolean;
}

const AvatarGroup = ({
	className = '',
	imageList,
	spacing = 0,
	divHeight,
	showCount = true,
}: IImageList) => {
	const [showTooltip, setShowTooltip] = useState(false);

	const cx = classNames.bind(Style);

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
					<img
						key={`avatarUserImg_${idx}`}
						src={imgSrc}
						className={Style['userImage']}
						style={{
							zIndex: `${imageList.length > 5 ? 5 : imageList.length - idx}`,
						}}
					/>
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
						{imageList.length > 3 && `외 ${imageList.length}명`}
					</h6>
				</div>
			)}

			{showCount && (
				<span className={Style['avatarUserCount']}>{imageList.length}명의 멤버</span>
			)}
		</div>
	);
};

export default AvatarGroup;
