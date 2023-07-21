import { IThumbnail } from '@utils/types/componentTypes';
import { Image } from 'semantic-ui-react';
import Link from 'next/link';

import Style from './Thumbnail.module.scss';

const TNSkill = ({ className = '', id = '', name = 'react', spacing = 0, href = '/anotherPage' }: IThumbnail) => {
	const imageUrlS3 = `https://dcx-skillmanager.s3.ap-northeast-2.amazonaws.com/images/skill/${name}.png`;
	// const imageUrlTemp = 'react/images/SkillThumbnail/react.jpeg';

	return (
		<>
			<Link href={href} className={`${className}`}>
				<Image src={imageUrlS3} className={Style['skillImage']} style={{ '--spacing': `${spacing}px` }} />
			</Link>
		</>
	);
};

TNSkill.displayName = 'ThumbnailSkill';

export default TNSkill;
