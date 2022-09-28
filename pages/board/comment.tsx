import { MainLayoutTemplate } from '@components/customs';
import { useRouter } from 'next/router';
import { BoardCard } from '@components/index';
import CommentCard from '@components/_customs/commentCard/CommentCard';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button, TextArea } from 'semantic-ui-react';

import Style from './board.module.scss';

const Comment = ({ brd }: any) => {
	const dispatch = useDispatch();
	const router = useRouter();
	const [commentArea, setCommentArea] = useState('');
	const [commentList, setCommentList] = useState([]);
	const uuid = useSelector((state: any) => state.auth.userUID);
	const [card, setCard] = useState([]);

	useEffect(() => {
		dispatch({ type: 'BOARD_DETAIL', brdId: router.query.brd, uuid, card, setCard });
		dispatch({ type: 'COMMENT_LIST', brdId: router.query.brd, setCommentList });
	}, []);
	// useEffect(() => {
	//   console.log()
	// 	dispatch({ type: 'COMMENT_LIST', brdId: router.query.brd });
	// }, []);

	const sendComment = () => {
		dispatch({
			type: 'SEND_COMMENT',
			setCommentArea,
			commentArea,
			brdId: router.query.brd,
			uuid,
			setCommentList,
			callbackFn: () => {
				dispatch({ type: 'BOARD_DETAIL', brdId: router.query.brd, uuid, card, setCard });
			},
		});
	};

	return (
		<>
			<div className={Style['commentPage']}>
				<div className={Style['cardDiv']}>
					{card.map((detail: any) => (
						<BoardCard
							key={detail.BOARD_CD}
							id={detail.BOARD_CD}
							title={detail.BOARD_TITLE}
							content={detail.BOARD_CONTENT}
							likeCnt={detail.LIKE_CNT}
							commentCnt={detail.CMNT_CNT}
							images={detail.IMG_LIST}
							liked={detail.LIKED}
							techNm={detail.TECH_NM}
						/>
					))}
				</div>
				<div className={Style['commentDiv']}>
					<div className={Style['commentArea']}>
						<TextArea
							className={Style['commentTextArea']}
							value={commentArea}
							onChange={(event: any) => {
								setCommentArea(event.target.value);
							}}
						/>
						<Button
							className={Style['commentBtn']}
							onClick={() => {
								if (commentArea !== '') {
									sendComment();
								}
							}}
						>
							SEND
						</Button>
					</div>
					<div className={Style['commentList']}>
						{commentList.map((cmnt: any) => (
							// <div key={cmnt.CMNT_CD}>{cmnt.BOARD_CMNT}</div>
							<CommentCard
								key={cmnt.CMNT_CD}
								content={cmnt.BOARD_CMNT}
								cmntCd={cmnt.CMNT_CD}
								cmntUser={cmnt.USER_NM}
								cmntUserTitle={cmnt.USER_TITLE}
								cmntDate={new Date(cmnt.CMNT_DATE)}
								cmntUid={cmnt.USER_UID}
								boardCd={cmnt.BOARD_CD}
								cbFunc={() => {
									dispatch({
										type: 'COMMENT_LIST',
										brdId: router.query.brd,
										setCommentList,
									});
									dispatch({
										type: 'BOARD_DETAIL',
										brdId: router.query.brd,
										uuid,
										card,
										setCard,
									});
								}}
							/>
						))}
					</div>
				</div>
			</div>
		</>
	);
};

Comment.PageLayout = MainLayoutTemplate;

export default Comment;
