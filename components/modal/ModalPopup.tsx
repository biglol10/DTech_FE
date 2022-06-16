// import Button from '@mui/material/Button';
import { useSelector, useDispatch } from 'react-redux';
// import Modal from '@mui/material/Modal';
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
