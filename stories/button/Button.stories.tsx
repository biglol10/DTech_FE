import { ComponentMeta } from '@storybook/react';
import { Button } from '@components/index';
import { IButton } from '@utils/types/componentTypes';

import { Doc } from './Button.stories.mdx';

export default {
	title: 'Example/Button',
	parameters: {
		componentSubtitle: 'Button Component',
		docs: {
			page: Doc,
		},
	},
	component: Button,
	argTypes: {},
} as ComponentMeta<typeof Button>;

export const ButtonSample = (args: IButton) => {
	return (
		<>
			<Button {...args} />
			<Button {...args} />
		</>
	);
};

ButtonSample.args = {
	content: 'ButtonContent',
};
