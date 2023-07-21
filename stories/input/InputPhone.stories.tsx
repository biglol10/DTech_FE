import { ComponentMeta } from '@storybook/react';
import { InputLayout, InputPhone } from '@components/index';
import { inputArgTypes } from './modules/argTypes';
import { Doc } from './InputDefault.stories.mdx';

export default {
	title: 'Example/Input',
	parameters: {
		componentSubtitle: 'Input Phone',
		docs: {
			page: Doc,
		},
	},
	component: InputPhone,
	argTypes: {
		...inputArgTypes,
	},
} as ComponentMeta<typeof InputPhone>;

export const InputPhoneSample = (args: any) => {
	return (
		<div style={{ width: '600px' }}>
			<InputLayout
				error={args.error}
				errorMsg="잘못된 번호입니다"
				stretch={args.stretch}
				inputLabel="Input Phone Label"
				inputLabelSize={args.labelSize}
				showInputLabel={args.showInputLabel}
				autoFitErrorLabel={args.autoFitErrorLabel}
				errorLabelPosition={args.errorLabelPosition}
			>
				<InputPhone id="inputPhone" placeholder="전화번호를 입력하세요" value={args.value} size={args.size} type={args.type} loading={args.loading} />
			</InputLayout>
		</div>
	);
};
