import { IThumbnail, ISNSkillFlow } from '@utils/types/componentTypes';
import { TNSkill, TNSkillFlow } from '@components/index';
import { ComponentMeta } from '@storybook/react';

export default {
	title: 'Example/TNSkillFlow',
	parameter: {
		componentSubtitle: 'TNSkillFlow Component',
	},
	component: TNSkillFlow,
	argTypes: {},
} as ComponentMeta<typeof TNSkillFlow>;

export const Default = (args: ISNSkillFlow) => <TNSkillFlow {...args} />;

Default.args = {
	id: 'TNSkillFlowId',
	spacing: 12,
	items: [
		{ name: 'react' },
		{ name: 'nextjs' },
		{ name: 'vuejs' },
		{ name: 'nodejs' },
		{ name: 'react' },
		{ name: 'nextjs' },
		{ name: 'vuejs' },
		{ name: 'nodejs' },
	],
};
