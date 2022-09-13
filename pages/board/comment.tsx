import { MainLayoutTemplate } from '@components/customs';
import { useRouter } from 'next/router';
import { BoardCard } from '@components/index';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Style from './board.module.scss';

const Comment = ({ brd }: any) => {
	const dispatch = useDispatch();
	const router = useRouter();
	const uuid = useSelector((state: any) => state.auth.userUID);
	const [card, setCard] = useState([]);

	useEffect(() => {
		dispatch({ type: 'BOARD_DETAIL', brdId: router.query.brd, uuid, card, setCard });
	}, []);

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
						/>
					))}
				</div>
				<div className={Style['commentDiv']}>Hello</div>
			</div>
		</>
	);
};

Comment.PageLayout = MainLayoutTemplate;

export default Comment;
