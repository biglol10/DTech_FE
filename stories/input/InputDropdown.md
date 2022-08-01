# InputDropdown

Input Dropdown

## _Usage_

```jsx
import { InputLayout, InputDropdown } from '@components/index';
import { useRef } from 'react';

const inputDropdownRef = useRef();

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

return (
	<InputLayout
		error={false}
		errorMsg="에러 발생"
		stretch={false}
		inputLabel="기본 Dropdown"
		inputLabelSize={'h4'}
		showInputLabel={true}
		autoFitErrorLabel={true}
		errorLabelPosition={'bottom'}
	>
		<InputDropdown
			id="inputDropdown"
			placeholder="선택해주세요"
			value={'' ? [] : ''}
			options={options}
			onChange={(obj: { value: string | Array<string> }) => console.log(obj.value)}
			keyboardInput={false}
			multiple={false}
			loading={false}
		/>
	</InputLayout>
);
```
