/** ****************************************************************************************
 * @설명 : Custom App.tsx
 ********************************************************************************************
 * 번호    작업자     작업일         브랜치                       변경내용
 *-------------------------------------------------------------------------------------------
 * 1      변지욱     2022-06-16                              최초작성
 * 2      변지욱     2022-07-13                              페이지에 따른 레이아웃 적용
 * 3      변지욱     2022-08-02   feature/JW/quill           dispatch에 쿠키 있을 경우 로직 추가
 ********************************************************************************************/

import React, { useMemo } from 'react';
import type { AppProps } from 'next/app';
import wrapper from '@store/rootReducer';
import { ModalPopup } from '@components/index';
import Head from 'next/head';
import { useSelector, useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import cookie from 'js-cookie';
import { useSocket } from '@utils/appRelated/authUser';

import '@styles/globals.scss';
import 'semantic-ui-css/semantic.min.css';
import 'react-quill/dist/quill.snow.css';
import 'react-toastify/dist/ReactToastify.css';

type ComponentWithPageLayout = AppProps & {
	Component: AppProps['Component'] & {
		// PageLayout?: React.ComponentType;
		PageLayout?: any;
	};
};

const MyApp = ({ Component, pageProps }: ComponentWithPageLayout) => {
	const authStore = useSelector((state: any) => state.auth);
	const toastInfo = useSelector((state: any) => state.toastInfo);
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
				<meta name="description" content="DTech App" />
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
			{/* {pageProps.isWithMainLayout ? (
				 <>
					 <MainLayoutTemplate>
						 <Component {...pageProps} />
					 </MainLayoutTemplate>
					 <ModalPopup />
					 {toastMemo}
				 </>
			 ) : (
				 <>
					 <Component {...pageProps} />
					 <ModalPopup />
					 {toastMemo}
				 </>
			 )} */}
		</>
	);
};

// MyApp.getInitialProps = async ({ Component, ctx }: any) => {
// 	const { token } = parseCookies(ctx); // token because you set [token] in authUser.js
// 	let pageProps: any = {};

// 	// ['/'] check for homepage, if user is trying to access proectedRoutes
// 	const protectedRoutesArray = [
// 		'/',
// 		'/[username]',
// 		'/notifications',
// 		'/post/[postId]',
// 		'/messages',
// 		'/search',
// 		'/dashboard',
// 	];

// 	const protectedRoutes = protectedRoutesArray.includes(ctx.pathname);

// 	const withMainLayoutArray = ['/', '/_error', '/apiTestPage', '/anotherPage', '/dashboard']; // 새로고침 시 ctx.pathname이 /_error로 됨 이유는 모르겠음

// 	const isWithMainLayout = withMainLayoutArray.includes(ctx.pathname);

// 	if (!token) {
// 		protectedRoutes && redirectUser(ctx, '/login');
// 	} else {
// 		pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
// 		pageProps.isWithMainLayout = isWithMainLayout;
// 		pageProps.pathname = ctx.pathname;
// 		pageProps.token = token;
// 	}

// 	return { pageProps };
// };

export default wrapper.withRedux(MyApp);
// high order component (=wrapper.withRedux) enables us to wrap all
// of our page components with redux
