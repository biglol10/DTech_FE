import { IToggle } from '@utils/types/componentTypes';
import { useEffect, useState } from 'react';
import { Radio } from 'semantic-ui-react';

const Toggle = ({ id = '', onClick = null, on = false, spacing = 0 }: IToggle) => {
	const [isOn, setIsOn] = useState(on);

	const onClickFn = () => {
		setIsOn((prev) => !prev);
	};

	useEffect(() => {
		onClick &&
			onClick({
				isOn,
			});
	}, [isOn, onClick]);

	return (
		<>
			<Radio
				toggle
				id={id}
				onClick={onClickFn}
				checked={isOn}
				style={{ '--spacing': `${spacing}px` }}
			/>
		</>
	);
};

Toggle.displayName = 'Toggle';

export default Toggle;
