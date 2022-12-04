/** ****************************************************************************************
 * @설명 : Custom App.tsx
 ********************************************************************************************
 * 번호    작업자     작업일         브랜치                       변경내용
 *-------------------------------------------------------------------------------------------
 * 1      변지욱     2022-06-16                              최초작성
 * 2      변지욱     2022-07-13                              페이지에 따른 레이아웃 적용
 * 3      변지욱     2022-08-02   feature/JW/quill           dispatch에 쿠키 있을 경우 로직 추가
 * 4      변지욱     2022-12-04   feature/JW/refactor        modal에 dynamic import 적용
 ********************************************************************************************/

import React, { useMemo } from 'react';
import type { AppProps } from 'next/app';
import wrapper from '@store/rootReducer';
import Head from 'next/head';
import { useSelector, useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import cookie from 'js-cookie';
import { useSocket } from '@utils/hooks/customHooks';
import { IAuth, IToastState } from '@utils/types/commAndStoreTypes';
// import { ModalPopup } from '@components/index';

import '@styles/globals.scss';
import 'semantic-ui-css/semantic.min.css';
import 'react-quill/dist/quill.snow.css';
import 'react-toastify/dist/ReactToastify.css';
import dynamic from 'next/dynamic';

type ComponentWithPageLayout = AppProps & {
	Component: AppProps['Component'] & {
		PageLayout?: React.ElementType;
	};
};

const ModalPopup = dynamic(() => {
	const ModalPopupComponent = import('@components/modal/ModalPopup');

	return ModalPopupComponent;
});

const MyApp = ({ Component, pageProps }: ComponentWithPageLayout) => {
	const authStore = useSelector((state: { auth: IAuth }) => state.auth);
	const toastInfo = useSelector((state: { toastInfo: IToastState }) => state.toastInfo);
	const dispatch = useDispatch();
	const { init: initSocket } = useSocket();

	if ((!authStore || !authStore.userName || !authStore.userToken) && cookie.get('token')) {
		dispatch({
			type: 'AUTH_SETTING_BY_TOKEN',
			token: cookie.get('token'),
			callbackFn: async (userId: string) => {
				initSocket(userId);
			},
		});
	}

	if (Component.displayName) {
		const displayName = Component.displayName;

		dispatch({ type: 'SET_CURRENT_ROUTE', displayName });
	}

	const toastMemo = useMemo(() => {
		return (
			<ToastContainer
				position={toastInfo.position}
				autoClose={toastInfo.autoClose}
				hideProgressBar={toastInfo.hideProgressBar}
				newestOnTop={false}
				draggable={false}
				closeOnClick
				pauseOnHover
			/>
		);
	}, [toastInfo.autoClose, toastInfo.hideProgressBar, toastInfo.position]);

	return (
		<>
			<Head>
				<title>DTech App</title>
				<meta
					name="description"
					content="팀 스킬 현형파악 및 지식공유를 쉽게 할 수 있는 앱입니다"
				/>
				<meta
					name="og:description"
					content="팀 스킬 현형파악 및 지식공유를 쉽게 할 수 있는 앱입니다"
				/>
				<meta name="author" content="Biglol, BY" />
				<meta
					name="og:image"
					content="https://dcx-tech.s3.ap-northeast-2.amazonaws.com/chat/96eef3d803cc0f3318f93503b.png"
				/>
				<meta
					name="og:image:url"
					content="https://dcx-tech.s3.ap-northeast-2.amazonaws.com/chat/96eef3d803cc0f3318f93503b.png"
				/>
				<meta name="keywords" content="Skill Dashboard, Slack-like chatting, Team board" />
				<meta
					name="og:keywords"
					content="DTech App, Skill Dashboard, Slack-like chatting, Team board"
				/>
			</Head>
			{Component.PageLayout ? (
				<>
					<Component.PageLayout>
						<Component {...pageProps} />
					</Component.PageLayout>
					<ModalPopup />
					{toastMemo}
				</>
			) : (
				<>
					<Component {...pageProps} />
					<ModalPopup />
					{toastMemo}
				</>
			)}
		</>
	);
};

export default wrapper.withRedux(MyApp);
