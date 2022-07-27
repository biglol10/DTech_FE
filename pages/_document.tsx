/** ****************************************************************************************
 * @설명 : _document.tsx
 ********************************************************************************************
 * 번호    작업자     작업일         브랜치                       변경내용
 *-------------------------------------------------------------------------------------------
 * 1      변지욱     2022-06-16                              script 넣는 용도
 ********************************************************************************************/

import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
	return (
		<Html>
			<Head>
				{/* for MUI */}
				<link
					href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
					rel="stylesheet"
				/>
				<link
					href="https://fonts.googleapis.com/icon?family=Material+Icons"
					rel="stylesheet"
				/>

				{/* This is for favicon */}
				{/* <link rel="icon" href="dtech/favicon.ico" type="image/x-icon" /> */}
				<link
					rel="icon"
					href={`${process.env.NODE_ENV === 'production' ? 'dtech' : ''}/favicon.ico`}
					type="image/x-icon"
				/>
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
