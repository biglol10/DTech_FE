import { IToggle } from '@utils/types/componentTypes';
import { Toggle } from '@components/index';
import { ComponentMeta } from '@storybook/react';

export default {
	title: 'Example/Toggle',
	parameters: {
		componentSubtitle: 'Toggle Component',
	},
	component: Toggle,
	argTypes: {
		on: {
			defaultValue: false,
			description: 'on 여부',
			options: [true, false],
		},
	},
} as ComponentMeta<typeof Toggle>;

export const Default = (args: IToggle) => <Toggle {...args} />;

Default.args = {
	id: 'ToggleId',
};
