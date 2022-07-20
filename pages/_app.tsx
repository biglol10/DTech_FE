/** ****************************************************************************************
 * @설명 : Custom App.tsx
 ********************************************************************************************
 * 번호    작업자     작업일         브랜치                       변경내용
 *-------------------------------------------------------------------------------------------
 * 1      변지욱     2022-06-16                              최초작성
 * 2      변지욱     2022-07-13                              페이지에 따른 레이아웃 적용
 ********************************************************************************************/

import React from 'react';
import { AppProps } from 'next/app';
import wrapper from '@store/rootReducer';
import { ModalPopup } from '@components/index';
import Head from 'next/head';
import { parseCookies, destroyCookie } from 'nookies';
import { redirectUser } from '@utils/appRelated/authUser';
import '@styles/globals.scss';
import 'semantic-ui-css/semantic.min.css';
import 'react-quill/dist/quill.snow.css';

import { MainLayoutTemplate } from '@components/customs';

const MyApp = ({ Component, pageProps }: AppProps) => {
	return (
		<>
			<Head>
				<title>DTech App</title>
				<meta name="description" content="DTech App" />
			</Head>
			{pageProps.isWithMainLayout ? (
				<>
					<MainLayoutTemplate>
						<Component {...pageProps} />
					</MainLayoutTemplate>
					<ModalPopup />
				</>
			) : (
				<>
					<Component {...pageProps} />
					<ModalPopup />
				</>
			)}
		</>
	);
};

MyApp.getInitialProps = async ({ Component, ctx }: any) => {
	const { token } = parseCookies(ctx); // token because you set [token] in authUser.js
	let pageProps: any = {};

	// ['/'] check for homepage, if user is trying to access proectedRoutes
	const protectedRoutesArray = [
		'/',
		'/[username]',
		'/notifications',
		'/post/[postId]',
		'/messages',
		'/search',
	];

	const protectedRoutes = protectedRoutesArray.includes(ctx.pathname);

	const withMainLayoutArray = ['/', '/_error', '/apiTestPage', '/anotherPage', '/dashboard']; // 새로고침 시 ctx.pathname이 /_error로 됨 이유는 모르겠음

	const isWithMainLayout = withMainLayoutArray.includes(ctx.pathname);

	if (!token) {
		protectedRoutes && redirectUser(ctx, '/login');
	} else {
		pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
		pageProps.user = 'biglol';
		pageProps.isWithMainLayout = isWithMainLayout;
		pageProps.pathname = ctx.pathname;
	}

	return { pageProps };
};

export default wrapper.withRedux(MyApp);
// high order component (=wrapper.withRedux) enables us to wrap all
// of our page components with redux
