import { useRef, useState } from 'react';
import Testcomponent from '@components/Testcomponent';
import { useSelector, useDispatch } from 'react-redux';
import { increment } from '@store/counterSlice';
import Link from 'next/link';
import { Button, InputDefault } from '@components/index';

const Index = () => {
	const [inputValue, setInputValue] = useState(2);
	const dispatch = useDispatch();
	const counter = useSelector((state: any) => state.counter.count);
	const [loading, setLoading] = useState(false);

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

	const inputRef = useRef();

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

			<InputDefault
				id="inputDefault1"
				inputLabel="sdf"
				showInputLabel={true}
				ref={inputRef}
				onChange={() => console.log(inputRef.current)}
			/>

			<Testcomponent />
		</div>
	);
};

export default Index;
