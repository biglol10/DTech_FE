import wrapper from '@store/rootReducer';
import { useRouter } from 'next/router';
import { NextPage } from 'next';
import { connect } from 'react-redux';
import { parseCookies } from 'nookies';

const Page: NextPage<any> = (state) => {
	const router = useRouter();

	console.log('came to Page State');
	console.log(state); // has propsSent by getServerSideProps
	alert(JSON.stringify(state.counter));

	return (
		// <div>
		// 	asfadsfsadf
		// 	<div>
		// 		asdljsadlkfj;{' '}
		// 		<button onClick={() => router.push('/dashboard')}>to dashboard</button>
		// 	</div>
		// </div>
		<div
			style={{
				width: '400px',
				height: '400px',
				display: 'flex',
				flexDirection: 'column',
				border: '10px solid red',
				overflow: 'auto',
			}}
		>
			<div
				style={{
					height: '350px',
					width: '150px',
					backgroundColor: 'blue',
					border: '5px solid yellow',
					// flexShrink: '0',
				}}
			></div>
			<div
				style={{
					height: '350px',
					width: '150px',
					backgroundColor: 'blue',
					border: '5px solid yellow',
					// flexShrink: '0',
				}}
			></div>
			<div
				style={{
					height: '350px',
					width: '150px',
					backgroundColor: 'blue',
					border: '5px solid yellow',
					// flexShrink: '0',
				}}
			></div>
			<div
				style={{
					height: '350px',
					width: '150px',
					backgroundColor: 'blue',
					border: '5px solid yellow',
					// flexShrink: '0',
				}}
			></div>
		</div>
	);
};

export const getServerSideProps = wrapper.getServerSideProps((store) => (context): any => {
	const { token } = parseCookies(context);

	store.dispatch({ type: 'ADDBYAMOUNT', data: 1012 });

	// console.log(`store in getServerSideProps is`);
	// console.log(store.getState());

	return {
		props: {
			propsSent: {
				a1: 'this is a1',
				a2: 'this is a2',
				token,
			},
		},
	};
});

export default connect((state: any, context: any) => {
	console.log('state in connect is');
	console.log(state);
	console.log(context);
	return state;
})(Page);

// export default Page;
