import { ComponentMeta } from '@storybook/react';
import { InputSearch, InputLayout } from '@components/index';
import { inputArgTypes } from './modules/argTypes';
import { Doc } from './InputSearch.stories.mdx';

export default {
	title: 'Example/Input',
	parameters: {
		componentSubtitle: 'Input Search Component',
		docs: {
			page: Doc,
		},
	},
	component: InputSearch,
	argTypes: {
		...inputArgTypes,
	},
} as ComponentMeta<typeof InputSearch>;

export const Search = (args: any) => {
	const onSearchIconClick = () => {
		console.log('search icon clicked');
	};

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
				<InputSearch
					id="inputSearch"
					placeholder="값을 입력해주세요"
					value={args.value}
					size={args.size}
					type={args.type}
					onSearchIconClick={onSearchIconClick}
					loading={args.loading}
					onEnter={() => alert('input Entered')}
				/>
			</InputLayout>
		</div>
	);
};

Search.args = {
	placeholder: '값을 입력해주세요',
	onChange: (result: object) => {
		console.log(result);
	},
	id: 'inputSearchId',
};
