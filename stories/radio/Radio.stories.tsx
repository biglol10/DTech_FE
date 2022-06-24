import { IRadio } from '@utils/types/componentTypes';
import { Radio } from '@components/index';
import { ComponentMeta } from '@storybook/react';

export default {
	title: 'Example/Radio',
	parameters: {
		componentSubtitle: 'Radio Component',
	},
	component: Radio,
	argTypes: {
		checked: {
			defaultValue: false,
			description: 'check 여부',
			options: [true, false],
		},
	},
} as ComponentMeta<typeof Radio>;

export const Default = (args: IRadio) => <Radio {...args} />;

Default.args = {
	id: 'RadioId',
};
