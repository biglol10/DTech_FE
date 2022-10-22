import { ICard } from '@utils/types/componentTypes';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { comAxiosRequest } from '@utils/appRelated/helperFunctions';
import { Card, Icon } from 'semantic-ui-react';
import SimpleImageSlider from 'react-simple-image-slider';
import { useState } from 'react';
import Style from './Card.module.scss';

const BoardCard = ({
	className = '',
	id = '',
	title = 'title',
	content = 'content',
	likeCnt = 0,
	commentCnt = 0,
	date = new Date(),
	userName = '장보영',
	userTitle = '선임',
	boardUid = '',
	images = [],
	liked = 0,
	techNm = '전체',
	cb = undefined,
}: ICard) => {
	const [like, setLike] = useState(liked !== 0);
	const [likeCount, setLikeCount] = useState(likeCnt);
	const userUID = useSelector((state: any) => state.auth.userUID);
	const dispatch = useDispatch();
	const clickLike = () => {
		like ? setLikeCount((prev) => prev - 1) : setLikeCount((prev) => prev + 1);

		dispatch({
			type: 'BOARD_LIKE',
			id,
			userUID,
			like: !like,
		});

		setLike((prev) => !prev);
	};

	const deleteBrd = async () => {
		comAxiosRequest({
			url: `${process.env.NEXT_PUBLIC_BE_BASE_URL}/api/board/deleteBoard`,
			requestType: 'post',
			dataObj: { brdId: id },
			successCallback: (response) => {
				if (cb !== undefined) {
					cb();
				}
				toast(<>{'게시글이 삭제되었습니다.'}</>);
			},
			failCallback: () => {
				toast['error'](<>{'게시글을 삭제하지 못했습니다.'}</>);
			},
		});
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
							<Card.Header>
								<div className={Style['cardHeader']}>
									<div>{title}</div>
									{techNm !== null ? (
										<div className={Style['cardTechNm']}>{techNm}</div>
									) : (
										<div></div>
									)}
								</div>
							</Card.Header>
							<Card.Meta className={Style['cardMeta']}>
								<span>
									{userName} {userTitle}
								</span>
								<span>{date.toDateString()}</span>
							</Card.Meta>
							<Card.Description>
								<pre>{content}</pre>
							</Card.Description>
							{images.length > 0 && (
								<div className={Style['imageSlider']}>
									<SimpleImageSlider
										width={400}
										height={300}
										images={images}
										showBullets={true}
										showNavs={true}
										useGPURender={true}
										onClick={(idx) => {
											window.open(images[idx].url, '_blank');
										}}
									/>
								</div>
							)}

							<Card.Content extra className={Style['comments']}>
								<Link
									href={{ pathname: '/board/comment', query: { brd: id } }}
									className={Style['boardSumbitBtn']}
								>
									<a>
										<Icon name="comment alternate outline" />
										{commentCnt} comments
									</a>
								</Link>
								{boardUid === userUID ? (
									<div>
										<Icon
											name="trash alternate outline"
											onClick={deleteBrd}
											color="blue"
										/>
									</div>
								) : null}
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
