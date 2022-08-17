import { ICard } from '@utils/types/componentTypes';
import { Card, Icon, Image } from 'semantic-ui-react';
import SimpleImageSlider from 'react-simple-image-slider';
import { useState } from 'react';
import Style from './Card.module.scss';

const images = [
	{ url: 'https://t1.daumcdn.net/cfile/tistory/24283C3858F778CA2E' },
	{ url: 'http://t1.daumcdn.net/friends/prod/editor/dc8b3d02-a15a-4afa-a88b-989cf2a50476.jpg' },
	{ url: '' },
];

const BoardCard = ({
	className = '',
	id = '',
	title = 'title',
	content = 'content',
	upvote = 0,
	date = new Date(),
	userName = '장보영',
	userTitle = '선임',
}: ICard) => {
	const [like, setLike] = useState(false);

	const clickLike = () => {
		setLike((prev) => !prev);
		console.log(like);
	};

	return (
		<>
			<div className={Style['cardComp']}>
				<Card fluid={true}>
					<div className={Style['card']}>
						<div className={Style['upvote']}>
							{like ? (
								<Icon name="thumbs up" onClick={clickLike} />
							) : (
								<Icon name="thumbs up outline" onClick={clickLike} />
							)}
							<span className={Style['likeCnt']}>{upvote}</span>
						</div>
					</div>
					<Card.Content className={Style['cardContent']}>
						<Card.Header>{title}</Card.Header>
						<Card.Meta className={Style['cardMeta']}>
							<span>
								{userName} {userTitle}
							</span>
							<span>{date.toDateString()}</span>
						</Card.Meta>
						<Card.Description>
							<span>{content}</span>
						</Card.Description>
						<SimpleImageSlider
							width={430}
							height={300}
							images={images}
							showBullets={true}
							showNavs={true}
							useGPURender={true}
						/>
					</Card.Content>
				</Card>
			</div>
		</>
	);
};

BoardCard.displayName = 'BoardCard';
export default BoardCard;
