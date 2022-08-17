import { MainLayoutTemplate } from '@components/customs';
import Link from 'next/link';
import { BoardCard } from '@components/index';
import Style from './board.module.scss';

const Index = () => {
	return (
		<div className={Style['boardPage']}>
			<h2>Submit2</h2>
			<Link href="/board/submit">
				<a>Submit</a>
			</Link>
			<div className={Style['boardList']}>
				<BoardCard />
				<BoardCard />
				<BoardCard />
				<BoardCard />
				<BoardCard />
				<BoardCard />
			</div>
		</div>
	);
};

Index.PageLayout = MainLayoutTemplate;
// Index.displayName = 'root';

export default Index;
