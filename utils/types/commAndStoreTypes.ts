import React from 'react';
import { Socket } from 'socket.io-client';

// ****** Comm Types

export interface IModalState {
	modalOpen?: boolean;
	modalTitle?: string;
	modalContent?: React.ReactNode;
	modalSize?: string;
	modalIsBasic?: boolean;
}

export interface ChatList {
	value: string;
	imgList: { fileName: string; filePreview: string; imageFile: File }[];
	linkList: any;
}

export interface IToastState {
	position:
		| 'top-right'
		| 'top-center'
		| 'top-left'
		| 'bottom-right'
		| 'bottom-center'
		| 'bottom-left';
	autoClose: number;
	hideProgressBar: boolean;
}

export interface IUsersStatusArr {
	USER_UID: string;
	USER_ID: string;
	USER_NM: string;
	USER_TITLE: string;
	USER_DETAIL: string;
	USER_IMG_URL: string;
	USER_ADMIN_YN: string | number;
	ONLINE_STATUS: 'ONLINE' | 'OFFLINE';
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
