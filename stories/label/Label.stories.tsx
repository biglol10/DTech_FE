import { ComponentMeta } from '@storybook/react';
import { Label } from '@components/index';
import { ILabel } from '@utils/types/componentTypes';
import { Icon } from 'semantic-ui-react';

import { Doc } from './Label.stories.mdx';

export default {
	title: 'Example/Label',
	parameters: {
		componentSubtitle: 'Label Component',
		docs: {
			page: Doc,
		},
	},
	component: Label,
	argTypes: {
		// borderNone: {
		// 	defaultValue: true,
		// 	description: 'borderNone 여부',
		// 	options: [true, false],
		// 	control: { type: 'radio' },
		// 	table: { defaultValue: { summary: 'borderNone' } },
		// },
	},
} as ComponentMeta<typeof Label>;

export const LabelSample = (args: ILabel) => {
	return <Label basic content="LabelContent" iconOrImage="icon" icon={<Icon name="mail" />} color="green" borderNone size="massive" {...args} />;
};
