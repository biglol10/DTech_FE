import wrapper from '@store/rootReducer';
import { useRouter } from 'next/router';
import { NextPage } from 'next';
import { connect } from 'react-redux';
import { parseCookies } from 'nookies';

const Page: NextPage<any> = (state) => {
	const router = useRouter();

	console.log('came to Page State');
	console.log(state); // has propsSent by getServerSideProps

	return (
		<div>
			asfadsfsadf
			<div>
				asdljsadlkfj;{' '}
				<button onClick={() => router.push('/dashboard')}>to dashboard</button>
			</div>
		</div>
	);
};

export const getServerSideProps = wrapper.getServerSideProps((store) => (context): any => {
	const { token } = parseCookies(context);

	// store.dispatch({ type: 'ADDBYAMOUNT', data: 1012 });

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

export default connect((state: any) => state)(Page);

// export default Page;
