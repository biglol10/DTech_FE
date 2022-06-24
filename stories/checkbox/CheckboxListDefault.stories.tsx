import { ICheckboxListDefault } from '@utils/types/componentTypes';
import { CheckboxListDefault } from '@components/index';
import { ComponentMeta } from '@storybook/react';

export default {
	title: 'Example/CheckboxList',
	parameters: {
		componentSubtitle: 'CheckboxList Component',
	},
	component: CheckboxListDefault,
	argTypes: {},
} as ComponentMeta<typeof CheckboxListDefault>;

export const Default = (args: ICheckboxListDefault) => <CheckboxListDefault {...args} />;

Default.args = {
	id: 'checkboxListDefaultId',
};
