import { Suspense } from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import fetchProfileData from '@testApi/forSuspense';

const resource = fetchProfileData();

const ProfileDetails = () => {
	const user = resource.user.read();

	return <h1>{user.name}</h1>;
};

const AnotherPage = () => {
	const counter = useSelector((state: any) => state.counter.count);

	// the counter value is remained
	return (
		<>
			<h1>The counter Value is {counter}</h1>
			<Link href="/">
				<a>GoToIndexPage</a>
			</Link>

			<Suspense fallback={<h1>Loading profile...</h1>}>
				<ProfileDetails />
			</Suspense>
		</>
	);
};

export default AnotherPage;
