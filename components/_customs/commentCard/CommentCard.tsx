/** ****************************************************************************************
 * @설명 : 댓글 표시하는 컴포넌트
 ********************************************************************************************
 * 번호    작업자     작업일         브랜치                       변경내용
 *-------------------------------------------------------------------------------------------
 * 1      장보영     2022-09-15   feature/BY/board       최초작성
 ********************************************************************************************/

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Icon, TextArea, Button } from 'semantic-ui-react';
import Style from './CommentCard.module.scss';

interface ICommentCard {
	cmntCd: string;
	content: string;
	likeCnt?: number;
	cmntUser: string;
	cmntUserTitle: string;
	cmntDate: Date;
}

const CommentCard = ({
	cmntCd,
	content,
	cmntUser,
	cmntUserTitle,
	cmntDate,
	likeCnt,
}: ICommentCard) => {
	const dispatch = useDispatch();
	const [clickedCmnt, setClickedCmnt] = useState(false);
	const [commentArea, setCommentArea] = useState('');
	const clickCmnt = () => {
		console.log('clickCmnt');
		setClickedCmnt(!clickedCmnt);
	};
	const sendComment = () => {
		dispatch({
			type: 'SEND_COMMENT',
		});
	};

	return (
		<div className={Style['cmnt_card']}>
			<div className={Style['cmnt_line']}></div>
			<div className={Style['cmnt_content']}>
				<div className={Style['cmnt_title']}>
					<div>
						{cmntUser} {cmntUserTitle}
					</div>
					<div>{cmntDate.toDateString()}</div>
				</div>
				<div className={Style['cmnt_content']}>{content}</div>
				<div className={Style['cmnt_btn']} onClick={clickCmnt}>
					<Icon name="comment alternate outline" color="blue" />
					<span className={Style['cmnt_btn_str']}>Reply</span>
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
			</div>
		</div>
	);
};

export default CommentCard;
