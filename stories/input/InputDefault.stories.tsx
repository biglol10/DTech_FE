import { ComponentMeta } from '@storybook/react';
import { InputLayout, InputDefault } from '@components/index';

import { Doc } from './InputDefault.stories.mdx';

export default {
	title: 'Example/Input',
	parameters: {
		componentSubtitle: 'Input Component',
		docs: {
			page: Doc,
		},
	},
	component: InputDefault,
	argTypes: {
		labelSize: {
			defaultValue: 'h2',
			description: 'label 크기',
			options: ['h2', 'h3', 'h4', 'h5', 'h6'],
			control: { type: 'radio' },
			table: { defaultValue: { summary: 'small' } },
		},
		size: {
			defaultValue: 'small',
			description: 'InputDefault의 크기',
			options: ['mini', 'small', 'large', 'big', 'huge', 'massive'],
			control: { type: 'radio' },
			table: { defaultValue: { summary: 'small' } },
		},
		type: {
			defaultValue: 'default',
			description: 'Input의 형태',
			options: ['default', 'password'],
			control: { type: 'radio' },
			table: { defaultValue: { summary: 'default' } },
		},
		value: {
			defaultValue: '',
			description: 'Input 값 세팅',
			table: { defaultValue: { summary: '' } },
		},
		validationRegex: {
			defaultValue: undefined,
			description: 'Input value Regex',
			control: { type: 'regex' },
			table: { defaultValue: { summary: undefined } },
		},
		errorLabelPosition: {
			defaultValue: 'bottom',
			description: '에러표시 Label의 위치 (bottom 또는 right)',
			options: ['bottom', 'right'],
			control: { type: 'radio' },
			table: { defaultValue: { summary: 'bottom' } },
		},
		error: {
			defaultValue: false,
			description: 'error 유무',
			options: [false, true],
			control: { type: 'radio' },
			table: { defaultValue: { summary: false } },
		},
		stretch: {
			defaultValue: false,
			description: 'width 100% 유무',
			options: [false, true],
			control: { type: 'radio' },
			table: { defaultValue: { summary: false } },
		},
		showInputLabel: {
			defaultValue: false,
			description: 'label 표시 유무',
			options: [false, true],
			control: { type: 'radio' },
			table: { defaultValue: { summary: false } },
		},
		autoFitErrorLabel: {
			defaultValue: false,
			description: '에러 표시를 위한 공간 확보 유무',
			options: [false, true],
			control: { type: 'radio' },
			table: { defaultValue: { summary: false } },
		},
	},
} as ComponentMeta<typeof InputDefault>;

export const Default = (args: any) => {
	console.log(args);
	return (
		<div style={{ width: '600px' }}>
			<InputLayout
				error={args.error}
				errorMsg="아이디를 제대로 입력해주세요"
				stretch={args.stretch}
				inputLabel="기본 Input"
				inputLabelSize={args.labelSize}
				showInputLabel={args.showInputLabel}
				autoFitErrorLabel={args.autoFitErrorLabel}
				errorLabelPosition={args.errorLabelPosition}
			>
				<InputDefault
					id="inputDefault"
					placeholder="값을 입력해주세요"
					value={args.value}
					size={args.size}
				/>
			</InputLayout>
		</div>
	);
};

Default.args = {
	placeholder: '값을 입력해주세요',
	onChange: (result: object) => {
		console.log(result);
	},
	regex: /^\d+$/,
	id: 'inputDefaultId',
};
