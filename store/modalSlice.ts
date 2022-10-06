import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IModalState } from '@utils/types/commAndStoreTypes';
import { modalUISize } from '@utils/constants/uiConstants';

interface IActionPayload extends IModalState {}

const initialState = {
	modalOpen: false,
	modalTitle: '',
	modalContent: null,
	modalSize: modalUISize.SMALL,
	modalIsBasic: false,
	modalFitContentWidth: false,
	modalShowCloseIcon: 'Y',
	modalContentId: '',
} as IModalState;

const modalSlice = createSlice({
	name: 'modal',
	initialState,
	reducers: {
		showModal(state, action: PayloadAction<IActionPayload>) {
			state.modalOpen = true;
			state.modalTitle = action.payload.modalTitle;
			state.modalContent = action.payload.modalContent;
			state.modalSize = action.payload.modalSize;
			state.modalIsBasic = action.payload.modalIsBasic || false;
			state.modalFitContentWidth = action.payload.modalFitContentWidth || false;
			state.modalShowCloseIcon = action.payload.modalShowCloseIcon || 'Y';
			state.modalContentId = action.payload.modalContentId;
		},
		closeModal(state) {
			state.modalOpen = false;
			state.modalTitle = '';
			state.modalContent = null;
			state.modalSize = modalUISize.SMALL;
			state.modalIsBasic = false;
			state.modalFitContentWidth = false;
			state.modalShowCloseIcon = 'Y';
			state.modalContentId = '';
		},
	},
});

export const { showModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
