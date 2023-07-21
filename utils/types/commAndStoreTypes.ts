import React from 'react';
import { Socket } from 'socket.io-client';

// ****** Comm Types

export interface IModalState {
	modalOpen?: boolean;
	modalTitle?: string | React.ReactNode;
	modalContent?: React.ReactElement | string | null;
	modalSize?: 'mini' | 'tiny' | 'small' | 'large' | 'fullscreen' | undefined;
	modalIsBasic?: boolean;
	modalFitContentWidth?: boolean;
	modalShowCloseIcon?: 'Y' | 'N';
	modalContentId?: string;
}

export interface ChatList {
	value: string;
	imgList: { fileName: string; filePreview: string; imageFile: File }[];
	linkList: { [name: string]: string }[];
}

export interface IToastState {
	position: 'top-right' | 'top-center' | 'top-left' | 'bottom-right' | 'bottom-center' | 'bottom-left';
	autoClose: number;
	hideProgressBar: boolean;
}

export interface IUserStatus {
	USER_UID: string;
	USER_ID: string;
	USER_NM: string;
	USER_TITLE: string;
	USER_DETAIL: string;
	USER_IMG_URL: string;
	USER_ADMIN_YN: string | number;
	ONLINE_STATUS: 'ONLINE' | 'OFFLINE';
}

export interface IMetadata {
	status: 'success' | 'fail';
	url?: string;
	metadata_title: string;
	metadata_description: string;
	metadata_image: string;
}

export interface IConversation {
	MESSAGE_ID: string;
	FROM_USERNAME?: null;
	TO_USERNAME?: null;
	MESSAGE_TEXT: string;
	IMG_LIST: string[];
	LINK_LIST: IMetadata[];
	SENT_DATETIME: string;
	USER_UID: string;
	USER_NM: string;
	USER_TITLE: string;
	CONVERSATION_ID: string;
}

// ****** Store Types

export interface IAppCommon {
	route: {
		currentRoute: string | null | undefined;
	};
	currentChatUser: string;
	currentChatGroup: string;
	unReadMsg: string[];
}

export interface IAuth {
	userUID: string;
	userId: string;
	userName: string;
	userTeamCD: string;
	userTitle: string;
	userPhoneNo: string;
	userDetail: string;
	userProfileImg: string;
	userGitHub: string;
	userDomain: string;
	userProject: string;
	userEmail: string;
	userToken: string;
	userSocket: null | Socket;
}
