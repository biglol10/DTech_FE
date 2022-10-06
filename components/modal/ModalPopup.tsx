/** ****************************************************************************************
 * @설명 : 전역 Modal component
 ********************************************************************************************
 * 번호    작업자     작업일         브랜치                       변경내용
 *-------------------------------------------------------------------------------------------
 * 1      변지욱     2022-06-16                              최초작성
 * 2      변지욱     2022-08-01   feature/JW/quill           basic prop 관리/추가
 * 3      변지욱     2022-10-06   feature/JW/groupChat       fitContentWidth 추가 (content width에 맞게 width 사이즈 조정), (ref를 받아야 함 [roomId].tsx 소스 확인)
 ********************************************************************************************/

import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal } from 'semantic-ui-react';
import { modalUISize } from '@utils/constants/uiConstants';
import * as RCONST from '@utils/constants/reducerConstants';

const ModalPopup = () => {
	const dispatch = useDispatch();
	const modalState = useSelector((state: any) => state.modal);
	const open = modalState.modalOpen;
	const content = modalState.modalContent;
	const modalSize = modalState.modalSize || modalUISize.SMALL;
	const title = modalState.modalTitle || '';
	const isBasic = modalState.modalIsBasic || false;
	const fitContentWidth = modalState.modalFitContentWidth || false;

	const handleClose = () => {
		dispatch({ type: RCONST.MODALCONTROL, modalOpen: false });
	};

	const [modalContentWidth, setModalContentWidth] = useState<number>(0);

	useEffect(() => {
		if (content && content.ref && content.ref.current) {
			setModalContentWidth(content.ref.current.offsetWidth);
		}
	}, [fitContentWidth, content]);

	return (
		<div>
			{/* {lodash merge로 생성한 modalProps로 ...modalProps하여 제어해봤지만 제대로 resize안되서 return 문에 분기 } */}
			{fitContentWidth && modalContentWidth ? (
				<Modal
					open={open}
					onClose={handleClose}
					basic={isBasic}
					closeIcon
					style={{ width: `${modalContentWidth}px` }}
				>
					{title && <Modal.Header>{title}</Modal.Header>}
					<Modal.Content>{content}</Modal.Content>
				</Modal>
			) : (
				<Modal open={open} onClose={handleClose} size={modalSize} basic={isBasic} closeIcon>
					{title && <Modal.Header>{title}</Modal.Header>}
					<Modal.Content>{content}</Modal.Content>
				</Modal>
			)}
		</div>
	);
};

export default ModalPopup;
