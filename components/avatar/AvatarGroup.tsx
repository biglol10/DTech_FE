/** ****************************************************************************************
 * @설명 : 아바타 그룹 component (slack과 같은)
 ********************************************************************************************
 * 번호    작업자     작업일         브랜치                       변경내용
 *-------------------------------------------------------------------------------------------
 * 1      변지욱     2022-07-20                              최초작성
 ********************************************************************************************/

import { customStyle1 } from '@utils/styleRelated/stylehelper';
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
	return (
		<div
			className={`${Style['avatarGroup']} ${className}`}
			style={customStyle1(spacing, { name: 'divHeight', value: divHeight })}
		>
			<div className={Style['avatarUser']}>
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

			{showCount && (
				<span className={Style['avatarUserCount']}>{imageList.length}명의 멤버</span>
			)}
		</div>
	);
};

export default AvatarGroup;
