import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MainLayoutTemplate } from '@components/customs';
import Link from 'next/link';
import { Button as BTN, Dropdown, Icon } from 'semantic-ui-react';
import { BoardCard, Button } from '@components/index';
import Style from './board.module.scss';

const Index = () => {
	const dispatch = useDispatch();
	const [boardList, setBoardList] = useState([]);
	const [techList, setTechList] = useState([]);
	const [orderType, setOrderType] = useState('');
	const [selectedTech, setSelectedTech] = useState(null);
	const [filterBtn, setFilterBtn] = useState('new');
	const uuid = useSelector((state: any) => state.auth.userUID);

	const deleteCb = () => {
		dispatch({
			type: 'BOARD_LIST',
			setBoardList,
			uuid,
			orderType: 'new',
		});
	};

	useEffect(() => {
		dispatch({
			type: 'BOARD_TECH_LIST',
			setTechList,
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		deleteCb();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const clickFilterBtn = (oType: string) => {
		setOrderType(oType);
		dispatch({
			type: 'BOARD_LIST',
			setBoardList,
			uuid,
			orderType: oType,
			filterType: selectedTech,
		});
	};

	const changeFilter = (tech: any) => {
		setSelectedTech(tech);
		dispatch({
			type: 'BOARD_LIST',
			setBoardList,
			uuid,
			orderType,
			filterType: tech,
		});
	};

	return (
		<div className={Style['boardPage']}>
			<div className={Style['boardFilter']}>
				<div className={Style['boardFilterBtns']}>
					<Button
						basic={true}
						className={Style['filterBtn']}
						content={
							<div>
								<Icon name="paw" />
								<b>NEW</b>
							</div>
						}
						buttonType={filterBtn === 'new' ? 'primary' : 'none'}
						onClick={() => {
							clickFilterBtn('new');
							setFilterBtn('new');
						}}
					/>
					<Button
						basic={true}
						className={Style['filterBtn']}
						content={
							<div>
								<Icon name="rocket" />
								<b>BEST</b>
							</div>
						}
						buttonType={filterBtn === 'best' ? 'primary' : 'none'}
						onClick={() => {
							clickFilterBtn('best');
							setFilterBtn('best');
						}}
					/>
					<Button
						basic={true}
						className={Style['filterBtn']}
						content={
							<div>
								<Icon name="fire" />
								<b>HOT</b>
							</div>
						}
						buttonType={filterBtn === 'hot' ? 'primary' : 'none'}
						onClick={() => {
							clickFilterBtn('hot');
							setFilterBtn('hot');
						}}
					/>
				</div>
				<div className={Style['techDropDown']}>
					<Dropdown
						search
						id="inputId"
						placeholder="Filter"
						options={techList}
						onChange={(event, data) => {
							changeFilter(data.value);
						}}
					/>
				</div>
				<div className={Style['boardSumbitBtn']}>
					<Link href="/board/submit">
						<BTN className={Style['filterBtn']} content="게시글 등록" buttonType="none" />
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
						liked={card.LIKED === 1}
						date={new Date(card.BOARD_DATE)}
						techNm={card.TECH_NM}
						boardUid={card.USER_UID}
						cb={deleteCb}
					/>
				))}
			</div>
		</div>
	);
};

Index.PageLayout = MainLayoutTemplate;
Index.displayName = 'board';

export default Index;
