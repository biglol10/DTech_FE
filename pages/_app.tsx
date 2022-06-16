import React from 'react';
import { AppProps } from 'next/app';
import wrapper from '@store/rootReducer';
import { ModalPopup } from '@components/index';
import Head from 'next/head';
import 'semantic-ui-css/semantic.min.css';
import '@styles/globals.scss';

interface LayoutProps {
	children: React.ReactNode;
}

const LayoutComp = ({ children }: LayoutProps) => {
	return (
		<>
			<Head>
				<title>DCX skill manager</title>
				<link
					rel="icon"
					href="https://media.geeksforgeeks.org/wp-content/cdn-uploads/gfg_200X200.png"
					type="image/x-icon"
				/>
			</Head>
			{children}
			<ModalPopup />
		</>
	);
};

const MyApp = ({ Component, pageProps }: AppProps) => {
	return (
		<LayoutComp>
			<Component {...pageProps} />
		</LayoutComp>
	);
	//   return <Component {...pageProps} />;
};

// function MyApp({ Component, pageProps }: AppProps) {
//   return <Component {...pageProps} />;
// }

export default wrapper.withRedux(MyApp);
// high order component (=wrapper.withRedux) enables us to wrap all
// of our page components with redux
