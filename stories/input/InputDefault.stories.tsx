import { ComponentMeta } from '@storybook/react';
import { InputLayout, InputDefault } from '@components/index';
import { inputArgTypes } from './modules/argTypes';
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
		...inputArgTypes,
	},
} as ComponentMeta<typeof InputDefault>;

export const Default = (args: any) => {
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
					type={args.type}
					loading={args.loading}
					onEnter={() => alert('input Entered')}
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
