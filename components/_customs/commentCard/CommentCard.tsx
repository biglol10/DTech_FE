/** ****************************************************************************************
 * @설명 : 댓글 표시하는 컴포넌트
 ********************************************************************************************
 * 번호    작업자     작업일         브랜치                       변경내용
 *-------------------------------------------------------------------------------------------
 * 1      장보영     2022-09-15   feature/BY/board       최초작성
 ********************************************************************************************/

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Icon, TextArea, Button } from 'semantic-ui-react';
import axios, { AxiosResponse } from 'axios';
import Style from './CommentCard.module.scss';

interface ICommentCard {
	cmntCd: string;
	content: string;
	cmntUser: string;
	cmntUserTitle: string;
	cmntDate: Date;
	cmntUid: string;
	boardCd: string;
	cbFunc: Function;
}

const CommentCard = ({
	cmntCd,
	content,
	cmntUser,
	cmntUserTitle,
	cmntDate,
	cmntUid,
	boardCd,
	cbFunc,
}: ICommentCard) => {
	const dispatch = useDispatch();
	const [clickedCmnt, setClickedCmnt] = useState(false);
	const [commentArea, setCommentArea] = useState('');
	const uuid = useSelector((state: any) => state.auth.userUID);
	const clickCmnt = () => {
		console.log('clickCmnt');
		setClickedCmnt(!clickedCmnt);
	};
	const sendComment = () => {
		dispatch({
			type: 'SEND_COMMENT',
		});
	};

	const deleteCmnt = () => {
		console.log('delete');
		axios
			.post('http://localhost:3066/api/board/deleteCmnt', {
				params: { cmntCd, boardCd },
			})
			.then((response) => {
				// setChatUser(response.data.usersInfo[0]);
				cbFunc();
			})
			.catch(() => {
				// toast['error'](<>{'유저정보를 가져오지 못했습니다'}</>);
			});
	};

	return (
		<div className={Style['cmnt_card']}>
			<div className={Style['cmnt_line']}></div>
			<div className={Style['cmnt_main']}>
				<div className={Style['cmnt_title']}>
					<div>
						{cmntUser} {cmntUserTitle}
					</div>
					<div>{cmntDate.toDateString()}</div>
				</div>
				<div className={Style['cmnt_below']}>
					<div className={Style['cmnt_content']}>
						<pre>{content}</pre>
					</div>
					<div>
						{cmntUid === uuid && (
							<Icon
								name="trash alternate outline"
								onClick={deleteCmnt}
								color="blue"
							/>
						)}
					</div>
				</div>

				{clickedCmnt && (
					<div className={Style['commentArea']}>
						<TextArea
							className={Style['commentTextArea']}
							onChange={(event: any) => {
								setCommentArea(event.target.value);
							}}
						/>
						<Button
							className={Style['commentBtn']}
							onClick={() => {
								sendComment();
							}}
						>
							SEND
						</Button>
					</div>
				)}
				{/* {!isEnd && (
					<CommentCard
						key="a"
						content="content"
						cmntCd="a"
						cmntUser="a"
						cmntUserTitle="title"
						cmntDate={new Date()}
						isEnd={true}
					/>
				)} */}
			</div>
		</div>
	);
};

export default CommentCard;
