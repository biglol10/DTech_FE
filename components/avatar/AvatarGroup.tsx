import { customStyle1 } from '@utils/styleRelated/stylehelper';
import Style from './AvatarGroup.module.scss';

interface IImageList {
	className?: string;
	spacing?: number;
	imageList: Array<string>;
	divHeight: number;
}

const AvatarGroup = ({ className = '', imageList, spacing = 0, divHeight }: IImageList) => {
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

			<span className={Style['avatarUserCount']}>{imageList.length}명의 멤버</span>
		</div>
	);
};

export default AvatarGroup;
