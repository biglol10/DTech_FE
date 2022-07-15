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
				<link rel="icon" href="dtech/favicon.ico" type="image/x-icon" />
				<link
					rel="icon"
					href={`${process.env.MODE_ENV === 'production' ? 'dtech' : ''}/favicon.ico`}
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
