import { ICard } from '@utils/types/componentTypes';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Icon, Image } from 'semantic-ui-react';
import SimpleImageSlider from 'react-simple-image-slider';
import { useState, useEffect } from 'react';
import Style from './Card.module.scss';

// const images = [
// 	{ url: 'https://t1.daumcdn.net/cfile/tistory/24283C3858F778CA2E' },
// 	{ url: 'http://t1.daumcdn.net/friends/prod/editor/dc8b3d02-a15a-4afa-a88b-989cf2a50476.jpg' },
// 	{ url: '' },
// ];

const BoardCard = ({
	className = '',
	id = '',
	key = '',
	title = 'title',
	content = 'content',
	likeCnt = 0,
	commentCnt = 0,
	date = new Date(),
	userName = '장보영',
	userTitle = '선임',
	images = [],
}: ICard) => {
	const [like, setLike] = useState(false);
	const [likeCount, setLikeCount] = useState(likeCnt);
	const userId = useSelector((state: any) => state.auth.userId);
	const dispatch = useDispatch();
	const clickLike = () => {
		like ? setLikeCount((prev) => prev - 1) : setLikeCount((prev) => prev + 1);

		dispatch({
			type: 'BOARD_LIKE',
			id,
			userId,
			like: !like,
		});

		setLike((prev) => !prev);
	};

	return (
		<>
			<div className={Style['cardComp']}>
				<div className={Style['upvote']}>
					{like ? (
						<Icon name="thumbs up" onClick={clickLike} color="blue" />
					) : (
						<Icon name="thumbs up outline" onClick={clickLike} color="blue" />
					)}
					<span className={Style['likeCnt']}>{likeCount}</span>
				</div>
				<div className={Style['card']}>
					<Card fluid={true}>
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
							{images.length > 0 && (
								<SimpleImageSlider
									width={400}
									height={300}
									images={images}
									showBullets={true}
									showNavs={true}
									useGPURender={true}
								/>
							)}

							<Card.Content extra className={Style['comments']}>
								<a>
									<Icon name="comment alternate outline" />
									{commentCnt} comments
								</a>
							</Card.Content>
						</Card.Content>
					</Card>
				</div>
			</div>
		</>
	);
};

BoardCard.displayName = 'BoardCard';
export default BoardCard;
