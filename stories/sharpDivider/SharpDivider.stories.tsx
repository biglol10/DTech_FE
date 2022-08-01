import { SharpDivider } from '@components/index';
import { Doc } from './SharpDivider.stories.mdx';

export default {
	title: 'Example/SharpDivider',
	parameters: {
		componentSubtitle: 'Sharp Divider Component',
		docs: {
			page: Doc,
		},
	},
	component: SharpDivider,
	argTypes: {
		content: {
			defaultValue: '',
			type: 'string',
			description: '내용',
		},
	},
};

export const SharpDividerSample = (args: any) => {
	return (
		<div style={{ width: '300px' }}>
			<SharpDivider content={args.content} />
		</div>
	);
};
