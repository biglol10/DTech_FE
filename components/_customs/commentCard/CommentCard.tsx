/** ****************************************************************************************
 * @설명 : 댓글 표시하는 컴포넌트
 ********************************************************************************************
 * 번호    작업자     작업일         브랜치                       변경내용
 *-------------------------------------------------------------------------------------------
 * 1      장보영     2022-09-15   feature/BY/board       최초작성
 ********************************************************************************************/

import { useSelector } from 'react-redux';
import { useState } from 'react';
import { Icon } from 'semantic-ui-react';
import { toast } from 'react-toastify';
import axios from 'axios';
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
	const uuid = useSelector((state: any) => state.auth.userUID);
	const [deleting, setDeleting] = useState(false);
	const deleteCmnt = () => {
		if (deleting) return;
		setDeleting(true);

		axios
			.post('http://localhost:3066/api/board/deleteCmnt', {
				params: { cmntCd, boardCd },
			})
			.then((response) => {
				cbFunc();
				toast(<>{'댓글이 삭제되었습니다.'}</>);
			})
			.catch(() => {
				toast['error'](<>{'댓글 삭제를 실패했습니다.'}</>);
			})
			.finally(() => {
				setDeleting(false);
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
			</div>
		</div>
	);
};

export default CommentCard;
