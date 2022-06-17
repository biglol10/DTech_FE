import { ICheckboxDefault } from '@utils/types/componentTypes';
import { CheckboxDefault } from '@components/index';
import { ComponentMeta } from '@storybook/react';

import { Doc } from './CheckboxDefault.stories.mdx';

export default {
	title: 'Example/Checkbox',
	parameters: {
		coomponentSubtitle: 'Checkbox Component',
		docs: {
			page: Doc,
		},
	},
	component: CheckboxDefault,
	argTypes: {
		checked: {
			defaultValue: false,
			description: 'check 여부',
			options: [true, false],
		},
		disabled: {
			defaultValue: false,
			description: '비활성화 여부',
			options: [true, false],
		},
		labelPosition: {
			defaultValue: 'right',
			description: '라벨 위치',
			options: ['right', 'top'],
		},
	},
} as ComponentMeta<typeof CheckboxDefault>;

export const Default = (args: ICheckboxDefault) => <CheckboxDefault {...args} />;

Default.args = {
	onChange: (result: object) => {
		console.log('TempBo');
		console.log(result);
	},
};
