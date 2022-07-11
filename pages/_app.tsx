import React from 'react';
import { AppProps } from 'next/app';
import wrapper from '@store/rootReducer';
import { ModalPopup } from '@components/index';
import Head from 'next/head';
import { parseCookies, destroyCookie } from 'nookies';
import { redirectUser } from '@utils/appRelated/authUser';
import 'semantic-ui-css/semantic.min.css';
import '@styles/globals.scss';
import './_app.scss';

interface LayoutProps {
	children: React.ReactNode;
}

const LayoutComp = ({ children }: LayoutProps) => {
	return (
		<>
			<Head>
				<title>DCX skill manager</title>
				<meta name="description" content="DCX Skill manager" />
			</Head>
			{children}
			<ModalPopup />
		</>
	);
};

const MainLayout = ({ children }: LayoutProps) => {
	return (
		<>
			<Head>
				<title>DTech App!!!</title>
				<meta name="description" content="DTech App" />
			</Head>
			<header>
				<h2>Cities</h2>
			</header>

			<section>
				<nav>
					<ul>
						<li>
							<a href="#">London</a>
						</li>
						<li>
							<a href="#">Paris</a>
						</li>
						<li>
							<a href="#">Tokyo</a>
						</li>
					</ul>
				</nav>

				<article>
					<h1>London</h1>
					<p>
						London is the capital city of England. It is the most populous city in the
						United Kingdom, with a metropolitan area of over 13 million inhabitants.
					</p>
					<p>
						Standing on the River Thames, London has been a major settlement for two
						millennia, its history going back to its founding by the Romans, who named
						it Londinium.
					</p>
				</article>
			</section>

			<footer>
				<p>Footer</p>
			</footer>
			{children}
			<ModalPopup />
		</>
	);
};

const MyApp = ({ Component, pageProps }: AppProps) => {
	if (pageProps.isWithMainLayout) {
		return (
			// <MainLayout>
			// 	<Component {...pageProps} />
			// </MainLayout>
			<LayoutComp>
				<Component {...pageProps} />
			</LayoutComp>
		);
	} else {
		return (
			<LayoutComp>
				<Component {...pageProps} />
			</LayoutComp>
		);
	}
	//   return <Component {...pageProps} />;
};

MyApp.getInitialProps = async ({ Component, ctx }: any) => {
	const { token } = parseCookies(ctx); // token because you set [token] in authUser.js
	let pageProps: any = {};

	// ['/'] check for homepage, if user is trying to access proectedRoutes
	const protectedRoutes =
		ctx.pathname === '/' ||
		ctx.pathname === '/[username]' ||
		ctx.pathname === '/notifications' ||
		ctx.pathname === '/post/[postId]' ||
		ctx.pathname === '/messages' ||
		ctx.pathname === '/search';

	const isWithMainLayout = ctx.pathname === '/' || ctx.pathname === '/_error';

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
