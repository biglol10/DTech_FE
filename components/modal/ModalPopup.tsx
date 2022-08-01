/** ****************************************************************************************
 * @설명 : 전역 Modal component
 ********************************************************************************************
 * 번호    작업자     작업일         브랜치                       변경내용
 *-------------------------------------------------------------------------------------------
 * 1      변지욱     2022-06-16                              최초작성
 ********************************************************************************************/

import { useSelector, useDispatch } from 'react-redux';
import { Modal } from 'semantic-ui-react';
import { modalUISize } from '@utils/constants/uiConstants';

const ModalPopup = () => {
	const dispatch = useDispatch();
	const modalState = useSelector((state: any) => state.modal);
	const open = modalState.modalOpen;
	const content = modalState.modalContent;
	const modalSize = modalState.modalSize || modalUISize.SMALL;
	const title = modalState.modalTitle || '';

	const handleClose = () => {
		dispatch({ type: 'MODALCONTROL', modalOpen: false });
	};

	return (
		<div>
			<Modal open={open} onClose={handleClose} size={modalSize}>
				{title && <Modal.Header>{title}</Modal.Header>}
				<Modal.Content>{content}</Modal.Content>
			</Modal>
		</div>
	);
};

export default ModalPopup;
