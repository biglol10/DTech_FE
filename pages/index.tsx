import { useState } from 'react';
import Testcomponent from '@components/Testcomponent';
import { useSelector, useDispatch } from 'react-redux';
import { increment } from '@store/counterSlice';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Message, Image, Icon } from 'semantic-ui-react';
import NextImage from 'next/image';
import pic from '@public/images/react.jpeg';

import {
	Accordion,
	Box,
	Button,
	InputDropdown,
	CheckboxDefault,
	CheckboxListDefault,
	Toggle,
	Radio,
	InputLayout,
	Label,
} from '@components/index';

import Style from './examplePage/examplePage.module.scss';

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

const Index = () => {
	const [inputValue, setInputValue] = useState(2);
	const dispatch = useDispatch();
	const counter = useSelector((state: any) => state.counter.count);
	const [loading, setLoading] = useState(false);

	const router = useRouter();

	const randomComputation = () => {
		dispatch({ type: 'RANDOMCOMPUTATION', setLoading });
	};

	const addOneNumber = () => {
		dispatch({ type: 'ADDONE' });
	};

	const subtractOneNumber = () => {
		dispatch({ type: 'SUBTRACTONE' });
	};

	const addByAmount = () => {
		// alert(typeof inputValue); // number
		dispatch({ type: 'ADDBYAMOUNT', data: inputValue });
	};

	const items = [
		{
			title: 'Accordion 1',
			expanded: true,
			content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
 						malesuada lacus ex, sit amet blandit leo lobortis eget.`,
		},
		{
			title: 'Accordion 2',
			expanded: false,
			content: (
				<>
					<Message>
						<Message.Header>Changes in Service</Message.Header>
						<p>
							We updated our privacy policy here to better service our customers. We
							recommend reviewing the changes.
						</p>
					</Message>
					<Image
						src="https://media.istockphoto.com/photos/porcelain-stoneware-tiles-in-store-picture-id1312700805"
						size="small"
						wrapped
					/>
				</>
			),
		},
	];

	return (
		<div>
			<h1>Home Page</h1>
			<h1>
				Counter: <span>{counter}</span>
			</h1>
			<button onClick={() => dispatch(increment())}>Add To Count</button>
			<br />
			<Link href="/anotherPage">
				<a>GoToAnotherPage</a>
			</Link>
			<br />
			<br />
			<Link href="/apiTestPage">
				<a>GoToApiTestPage</a>
			</Link>
			<br />
			<br />
			<button onClick={() => router.push('/dashboard')}>GoToDashboardPage</button>
			<br />
			<br />
			<button onClick={() => addOneNumber()}>add one number</button>
			<br />
			<br />
			<button onClick={() => subtractOneNumber()}>subtract one number</button>
			<br />
			<br />
			<input value={inputValue} onChange={(e: any) => setInputValue(e.target.value)} />
			<button onClick={() => addByAmount()}>add one number</button>
			<br />
			<br />
			<button onClick={() => randomComputation()}>do some computation</button>
			<br />
			<br />

			<Box id="sampleBoxId" spacing={32} boxType="error">
				alskdfalskfjqwpoieuqwer
			</Box>

			<br />
			<br />

			<Button
				loading={false}
				basic={false}
				size="big"
				buttonType="none"
				content="ButtonClick"
				color="brown"
			/>
			{loading ? <h1>Loading...</h1> : <h1>Done</h1>}
			<br />
			<br />

			<Accordion id="accordionId" items={items} />

			<br />
			<br />

			<Testcomponent />
			<br />
			<h2>Checkbox</h2>
			<CheckboxDefault
				id="testCheckbox"
				label="testLabel"
				onClick={(arg: any) => console.log(arg)}
			/>

			<br />
			<h2>CheckboxList</h2>
			<CheckboxListDefault
				id="testCheckboxList"
				labelPosition="right"
				direction="vertical"
				items={[
					{ id: '1', disabled: false, checked: false, label: 'checkbox1' },
					{ id: '2', disabled: false, checked: false, label: 'checkbox2' },
					{ id: '3', disabled: false, checked: false, label: 'checkbox3' },
					{ id: '4', disabled: false, checked: false, label: 'checkbox4' },
				]}
				onChange={(args: any) => console.log(args)}
			/>
			<br />
			<h2>Toggle</h2>
			<Toggle
				id="testToggle"
				onClick={(arg: any) => {
					console.log(arg);
				}}
			/>
			<br />
			<h2>Radio</h2>
			<Radio
				id="testRadio"
				labelPosition="right"
				items={[
					{ value: 'radioId1', label: 'radio1' },
					{ value: 'radioId2', label: 'radio2' },
					{ value: 'radioId3', label: 'radio3' },
					{ value: 'radioId4', label: 'radio4' },
				]}
				onChange={(args: any) => console.log(args)}
			/>
			<br />

			<br />
			<br />

			<NextImage src={pic} width={500} height={500} />

			<InputLayout
				inputLabel="dropdown"
				inputLabelSize="h4"
				showInputLabel={true}
				spacing={32}
			>
				<InputDropdown
					id={Style['inputDropdown']}
					placeholder="선택해주세요"
					value={''}
					options={options}
				/>
			</InputLayout>

			<br />
			<br />

			<Label
				basic
				content="username"
				iconOrImage="image"
				icon={
					<Image
						src={`${
							process.env.MODE_ENV === 'production' ? 'dtech' : ''
						}/images/no_profile.png`}
						avatar
					/>
				}
				color="black"
				borderNone
			/>
		</div>
	);
};

export default Index;
