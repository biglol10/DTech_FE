import { IThumbnail } from '@utils/types/componentTypes';
import { TNSkill } from '@components/index';
import { ComponentMeta } from '@storybook/react';

export default {
	title: 'Example/TNSkill',
	parameter: {
		componentSubtitle: 'ThumbnailSkill Component',
	},
	component: TNSkill,
	argTypes: {},
} as ComponentMeta<typeof TNSkill>;

export const Default = (args: IThumbnail) => <TNSkill {...args} />;

Default.args = {
	id: 'TNSkillId',
};
