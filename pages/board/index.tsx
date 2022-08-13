import { MainLayoutTemplate } from '@components/customs';
import Link from 'next/link';

const Index = () => {
	return (
		<div>
			<h2>Submit2</h2>
			<Link href="/board/submit">
				<a>Submit</a>
			</Link>
		</div>
	);
};

Index.PageLayout = MainLayoutTemplate;
// Index.displayName = 'root';

export default Index;
