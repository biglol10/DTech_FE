import { List } from '@components/index';
import { Label } from 'semantic-ui-react';

import { Doc } from './List.stories.mdx';

export default {
	title: 'Example/List',
	parameters: {
		componentSubtitle: 'List Component',
		docs: {
			page: Doc,
		},
	},
	component: List,
};

export const ListSample = () => {
	const items = [
		{
			content: 'This is list 1',
		},
		{
			content: (
				<Label as="a" color="yellow" image>
					<img src="https://react.semantic-ui.com/images/avatar/small/christian.jpg" />
					Christian
					<Label.Detail>Co-worker</Label.Detail>
				</Label>
			),
		},
		{
			content: <div style={{ color: 'blue' }}>al;fdjeqruopqwru</div>,
		},
		{
			content:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.',
		},
		{
			content:
				'222Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.',
		},
	];

	return <List id="sampleList1" listType="buletted" verticalAlign="middle" items={items} />;
};
