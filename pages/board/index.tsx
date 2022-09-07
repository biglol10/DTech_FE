import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { MainLayoutTemplate } from '@components/customs';
import Link from 'next/link';
import { BoardCard, Button } from '@components/index';
import Style from './board.module.scss';

const Index = () => {
	const dispatch = useDispatch();
	const [boardList, setBoardList] = useState([]);

	useEffect(() => {
		dispatch({
			type: 'BOARD_LIST',
			setBoardList,
		});
	}, []);

	useEffect(() => {
		// console.log(boardList);
	}, [boardList]);

	return (
		<div className={Style['boardPage']}>
			<h2>Submit2</h2>
			<Link href="/board/submit">
				<a>Submit</a>
			</Link>
			<div className={Style['boardFilter']}>
				<Button className={Style['FilterBtn']} content="NEW" />
				<Button className={Style['FilterBtn']} content="BEST" buttonType="none" />
				<Button className={Style['FilterBtn']} content="HOT" buttonType="none" />
				<Button className={Style['FilterBtn']} content="TOP" buttonType="none" />
			</div>
			<div className={Style['boardList']}>
				{boardList.map((card: any) => (
					<BoardCard
						key={card.BOARD_CD}
						id={card.BOARD_CD}
						title={card.BOARD_TITLE}
						content={card.BOARD_CONTENT}
						likeCnt={card.LIKES_CNT}
						commentCnt={card.COMMENTS_CNT}
						images={card.IMG_LIST}
					/>
				))}
			</div>
		</div>
	);
};

Index.PageLayout = MainLayoutTemplate;
// Index.displayName = 'root';

export default Index;
