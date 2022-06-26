import { IToggle } from '@utils/types/componentTypes';
import { useEffect, useState } from 'react';
import { Radio } from 'semantic-ui-react';
import Style from './Toggle.module.scss';

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
				className={Style['toggleStyle']}
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
