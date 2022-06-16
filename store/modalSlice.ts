import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IModalState } from '@utils/types/commTypes';
import { modalUISize } from '@utils/constants/uiConstants';

interface IActionPayload extends IModalState {}

const initialState = {
	modalOpen: false,
	modalTitle: '',
	modalContent: null,
	modalSize: modalUISize.SMALL,
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
		},
		closeModal(state) {
			state.modalOpen = false;
			state.modalTitle = '';
			state.modalContent = null;
			state.modalSize = modalUISize.SMALL;
		},
	},
});

export const { showModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
