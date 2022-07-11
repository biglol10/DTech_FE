import { InputLayout, InputDropdown } from '@components/index';
import { Doc } from './InputDropdown.stories.mdx';

export default {
	title: 'Example/Input',
	parameters: {
		componentSubtitle: 'Input Dropdown',
		docs: {
			page: Doc,
		},
	},
	component: InputDropdown,
	argTypes: {
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
		labelSize: {
			defaultValue: 'h2',
			description: 'label 크기',
			options: ['h2', 'h3', 'h4', 'h5', 'h6'],
			control: { type: 'radio' },
			table: { defaultValue: { summary: 'small' } },
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
		errorLabelPosition: {
			defaultValue: 'bottom',
			description: '에러표시 Label의 위치 (bottom 또는 right)',
			options: ['bottom', 'right'],
			control: { type: 'radio' },
			table: { defaultValue: { summary: 'bottom' } },
		},
		value: {
			defaultValue: '',
			description: 'Input 값 세팅',
			table: { defaultValue: { summary: '' } },
		},
		loading: {
			default: false,
			description: 'Loading 상태',
			options: [false, true],
			control: { type: 'radio' },
			table: { defaultValue: { summary: false } },
		},
		multiple: {
			default: false,
			description: 'Dropdown 여러개 선택 가능 여부',
			options: [false, true],
			control: { type: 'radio' },
			table: { defaultValue: { summary: false } },
		},
		disabled: {
			default: false,
			description: 'Disabled 여부',
			options: [false, true],
			control: { type: 'radio' },
			table: { defaultValue: { summary: false } },
		},
		keyboardInput: {
			default: false,
			description: 'Keyboard 입력 가능 여부',
			options: [false, true],
			control: { type: 'radio' },
			table: { defaultValue: { summary: false } },
		},
	},
};

const options = [
	{ key: 'angular', text: 'Angular', value: 'angular' },
	{ key: 'css', text: 'CSS', value: 'css' },
	{ key: 'design', text: 'Graphic Design', value: 'design' },
	{ key: 'ember', text: 'Ember', value: 'ember' },
	{ key: 'html', text: 'HTML', value: 'html' },
	{ key: 'ia', text: 'Information Architecture', value: 'ia' },
	{ key: 'javascript', text: 'Javascript', value: 'javascript' },
	{ key: 'mech', text: 'Mechanical Engineering', value: 'mech' },
	{ key: 'meteor', text: 'Meteor', value: 'meteor' },
	{ key: 'node', text: 'NodeJS', value: 'node' },
	{ key: 'plumbing', text: 'Plumbing', value: 'plumbing' },
	{ key: 'python', text: 'Python', value: 'python' },
	{ key: 'rails', text: 'Rails', value: 'rails' },
	{ key: 'react', text: 'React', value: 'react' },
	{ key: 'repair', text: 'Kitchen Repair', value: 'repair' },
	{ key: 'ruby', text: 'Ruby', value: 'ruby' },
	{ key: 'ui', text: 'UI Design', value: 'ui' },
	{ key: 'ux', text: 'User Experience', value: 'ux' },
];

export const Dropdown = (args: any) => {
	return (
		<div style={{ width: '600px' }}>
			<InputLayout
				error={args.error}
				errorMsg="에러 발생"
				stretch={args.stretch}
				inputLabel="기본 Input"
				inputLabelSize={args.labelSize}
				showInputLabel={args.showInputLabel}
				autoFitErrorLabel={args.autoFitErrorLabel}
				errorLabelPosition={args.errorLabelPosition}
			>
				<InputDropdown
					id="inputDropdown"
					placeholder="선택해주세요"
					value={args.multiple ? [] : ''}
					options={options}
					onChange={(obj: { value: string | Array<string> }) => console.log(obj.value)}
					keyboardInput={args.keyboardInput}
					multiple={args.multiple}
					loading={args.loading}
				/>
			</InputLayout>
		</div>
	);
};
