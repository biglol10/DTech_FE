import { ComponentMeta } from '@storybook/react';
import { InputLayout, InputWithIcon } from '@components/index';
import { Icon } from 'semantic-ui-react';

import inputArgTypes from './modules/argTypes';
import { Doc } from './InputWithIcon.stories.mdx';

export default {
	title: 'Example/Input',
	parameters: {
		componentSubtitle: 'Input With Icon Component',
		docs: {
			page: Doc,
		},
	},
	component: InputWithIcon,
	argTypes: {
		...inputArgTypes,
	},
} as ComponentMeta<typeof InputWithIcon>;

export const WithIcon = (args: any) => {
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
				<InputWithIcon
					id="inputWithIcon"
					placeholder="값을 입력해주세요"
					value={args.value}
					size={args.size}
					type={args.type}
					loading={args.loading}
					inputIcon={<Icon name="users" />}
					onEnter={() => alert('input Entered')}
				/>
			</InputLayout>
		</div>
	);
};

WithIcon.args = {
	placeholder: '값을 입력해주세요',
	onChange: (result: object) => {
		console.log(result);
	},
	id: 'inputWithIconId',
};
