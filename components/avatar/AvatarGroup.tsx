/** ****************************************************************************************
 * @설명 : 아바타 그룹 component (slack과 같은)
 ********************************************************************************************
 * 번호    작업자     작업일         브랜치                       변경내용
 *-------------------------------------------------------------------------------------------
 * 1      변지욱     2022-07-20                              최초작성
 * 2      변지욱     2022-09-05   feature/JW/dashboard       이미지 바인딩 및 기본 프로필 이미지 변경
 ********************************************************************************************/

import { customStyleObj } from '@utils/styleRelated/stylehelper';
import { MouseEventHandler, useState } from 'react';
import classNames from 'classnames/bind';

import Style from './AvatarGroup.module.scss';

type onClickFunc = MouseEventHandler<HTMLDivElement> | undefined;

interface IImageList {
	className?: string;
	spacing?: number;
	imageList: Array<string>;
	usersString: string;
	divHeight: number;
	totalCount: number;
	showCount?: boolean;
	onClick?: onClickFunc;
}

const AvatarGroup = ({
	className = '',
	imageList,
	usersString,
	spacing = 0,
	divHeight,
	totalCount = 0,
	showCount = true,
	onClick = undefined,
}: IImageList) => {
	const [showTooltip, setShowTooltip] = useState(false);

	const cx = classNames.bind(Style);

	return (
		<div
			className={`${Style['avatarGroup']} ${className}`}
			style={customStyleObj(spacing, [{ name: 'divHeight', value: divHeight }])}
			onClick={onClick && onClick}
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
					className={Style['peopleGroup']}
					onMouseEnter={() => setShowTooltip(true)}
					onMouseLeave={() => setShowTooltip(false)}
				>
					<h6>
						{usersString}
						{totalCount > 3 && `,등 총 ${totalCount}명`}
					</h6>
				</div>
			)}

			{showCount && <span className={Style['avatarUserCount']}>{totalCount}명의 멤버</span>}
		</div>
	);
};

export default AvatarGroup;
