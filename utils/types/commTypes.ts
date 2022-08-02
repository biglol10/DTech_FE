import React from 'react';

export interface IModalState {
	modalOpen?: boolean;
	modalTitle?: string;
	modalContent?: React.ReactNode;
	modalSize?: string;
	modalIsBasic?: boolean;
}
