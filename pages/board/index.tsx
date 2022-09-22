import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MainLayoutTemplate } from '@components/customs';
import Link from 'next/link';
import { Button as BTN } from 'semantic-ui-react';
import { BoardCard, Button } from '@components/index';
import Style from './board.module.scss';

const Index = () => {
	const dispatch = useDispatch();
	const [boardList, setBoardList] = useState([]);
	const uuid = useSelector((state: any) => state.auth.userUID);

	useEffect(() => {
		dispatch({
			type: 'BOARD_LIST',
			setBoardList,
			uuid,
			orderType: 'new',
		});
	}, []);

	useEffect(() => {
		// console.log(boardList);
	}, [boardList]);

	const clickFilterBtn = (orderType: string) => {
		dispatch({
			type: 'BOARD_LIST',
			setBoardList,
			uuid,
			orderType,
		});
	};

	return (
		<div className={Style['boardPage']}>
			<div className={Style['boardFilter']}>
				<div className={Style['boardFilterBtns']}>
					<Button
						className={Style['filterBtn']}
						content="NEW"
						buttonType="primary"
						onClick={() => {
							clickFilterBtn('new');
						}}
					/>
					<Button
						className={Style['filterBtn']}
						content="BEST"
						buttonType="none"
						onClick={() => {
							clickFilterBtn('best');
						}}
					/>
					<Button
						className={Style['filterBtn']}
						content="HOT"
						buttonType="none"
						onClick={() => {
							clickFilterBtn('hot');
						}}
					/>
				</div>
				<div className={Style['boardSumbitBtn']}>
					<Link href="/board/submit">
						{/* <a>Submit</a> */}
						<BTN
							className={Style['filterBtn']}
							content="게시글 등록"
							buttonType="none"
						/>
					</Link>
				</div>
			</div>
			<div className={Style['boardList']}>
				{boardList.map((card: any) => (
					<BoardCard
						key={card.BOARD_CD}
						id={card.BOARD_CD}
						title={card.BOARD_TITLE}
						content={card.BOARD_CONTENT}
						likeCnt={card.LIKE_CNT}
						commentCnt={card.CMNT_CNT}
						images={card.IMG_LIST}
						liked={card.LIKED}
						date={new Date(card.BOARD_DATE)}
						techNm={card.TECH_NM}
					/>
				))}
			</div>
		</div>
	);
};

Index.PageLayout = MainLayoutTemplate;
// Index.displayName = 'root';

export default Index;
