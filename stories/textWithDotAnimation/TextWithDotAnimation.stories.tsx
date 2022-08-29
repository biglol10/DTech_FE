import { TextWithDotAnimation } from '@components/index';
import { ITextWithDotAnimation } from '@utils/types/componentTypes';

import { Doc } from './TextWithDotAnimation.stories.mdx';

export default {
	title: 'Example/TextWithDot',
	parameters: {
		componentSubtitle: 'Input Component',
		docs: {
			page: Doc,
		},
	},
	component: TextWithDotAnimation,
	argTypes: {
		content: {
			defaultValue: '',
			description: 'text',
			table: { defaultValue: { summary: '' } },
		},
		color: {
			defaultValue: 'black',
			description: 'dot color',
			table: { defaultValue: { summary: 'black' } },
		},
		uiType: {
			defaultValue: 'dot-flashing',
			description: 'dot uiType',
			options: ['dot-flashing', 'dot-elastic', 'dot-pulse', 'dot-carousel'],
			control: { type: 'radio' },
			table: { defaultValue: { summary: 'dot-flashing' } },
		},
		marginLeftValue: {
			defaultValue: 0,
			description: 'dot 위치',
			table: { defaultValue: { summary: 0 } },
		},
	},
};

export const TextWithDotSample = (args: ITextWithDotAnimation) => {
	return (
		<TextWithDotAnimation
			content={args.content}
			color={args.color}
			uiType={args.uiType}
			marginLeftValue={args.marginLeftValue}
			hide={false}
		/>
	);
};
