/** ****************************************************************************************
 * @설명 : 전역 Modal component
 ********************************************************************************************
 * 번호    작업자     작업일         브랜치                       변경내용
 *-------------------------------------------------------------------------------------------
 * 1      변지욱     2022-06-16                              최초작성
 * 2      변지욱     2022-08-01   feature/JW/quill           basic prop 관리/추가
 * 3      변지욱     2022-10-06   feature/JW/groupChat       fitContentWidth 추가 (content width에 맞게 width 사이즈 조정), (id가 선언되어 있어야 하고 id값을 받아야 함)
 ********************************************************************************************/

import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal } from 'semantic-ui-react';
import { modalUISize } from '@utils/constants/uiConstants';
import * as RCONST from '@utils/constants/reducerConstants';
import { IModalState } from '@utils/types/commAndStoreTypes';

const ModalPopup = () => {
	const dispatch = useDispatch();
	const modalState = useSelector((state: { modal: IModalState }) => state.modal);
	const open = modalState.modalOpen;
	const content = modalState.modalContent;
	const modalSize = modalState.modalSize || modalUISize.SMALL;
	const title = modalState.modalTitle || '';
	const isBasic = modalState.modalIsBasic || false;
	const fitContentWidth = modalState.modalFitContentWidth || false;
	const showCloseIcon = modalState.modalShowCloseIcon;
	const elementId = modalState.modalContentId;

	const handleClose = () => {
		dispatch({ type: RCONST.MODALCONTROL, modalOpen: false });
	};

	const [modalContentWidth, setModalContentWidth] = useState<number>(0);

	useEffect(() => {
		try {
			if (fitContentWidth && elementId) {
				const el = document.getElementById(elementId);

				if (el) {
					setModalContentWidth(el.offsetWidth);
				}
			}
		} catch {}

		// 안 해주면 열 때마다 modal이 줄어드는 현상 발생
		return () => {
			setModalContentWidth(0);
		};
	}, [elementId, fitContentWidth]);

	return (
		<div>
			{/* {lodash merge로 생성한 modalProps로 ...modalProps하여 제어해봤지만 제대로 resize안되서 return 문에 분기 } */}
			{fitContentWidth && modalContentWidth ? (
				<Modal open={open} onClose={handleClose} basic={isBasic} closeIcon={showCloseIcon === 'Y'} style={{ width: `${modalContentWidth}px` }}>
					{title && <Modal.Header>{title}</Modal.Header>}
					<Modal.Content>{content}</Modal.Content>
				</Modal>
			) : (
				<Modal open={open} onClose={handleClose} size={modalSize} basic={isBasic} closeIcon={showCloseIcon === 'Y'}>
					{title && <Modal.Header>{title}</Modal.Header>}
					<Modal.Content>{content}</Modal.Content>
				</Modal>
			)}
			{/* <Modal
				open={open}
				onClose={handleClose}
				size={modalSize}
				basic={isBasic}
				closeIcon={showCloseIcon}
			>
				{title && <Modal.Header>{title}</Modal.Header>}
				<Modal.Content>{content}</Modal.Content>
			</Modal> */}
		</div>
	);
};

export default ModalPopup;
