import { all, fork, put, takeLatest } from 'redux-saga/effects';
import { showModal, closeModal } from '@store/modalSlice';
import * as RCONST from '@utils/constants/reducerConstants';

const modalControlFunction = function* (action: any) {
	const modalControlType = action.modalOpen;

	if (modalControlType) {
		const modalObj = {
			modalTitle: action.modalTitle,
			modalContent: action.modalContent,
			modalSize: action.modalSize,
			modalIsBasic: action.modalIsBasic,
			modalFitContentWidth: action.modalFitContentWidth,
			modalShowCloseIcon: action.modalShowCloseIcon,
			modalContentId: action.modalContentId,
		};

		yield put(showModal(modalObj));
	} else {
		yield put(closeModal());
	}
};

const modalControl = function* () {
	yield takeLatest(RCONST.MODALCONTROL, modalControlFunction);
};

export default function* modalSaga() {
	yield all([fork(modalControl)]);
}
