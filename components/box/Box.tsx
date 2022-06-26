import { elCommStyle } from '@utils/styleRelated/stylehelper';
import { IBox } from '@utils/types/componentTypes';
import Style from './Box.module.scss';

const Box = ({
	id,
	children,
	boxType = 'basic',
	textAlign = 'left',
	className = '',
	spacing = 0,
	onClick,
}: IBox) => {
	return (
		<div
			id={id}
			className={`${Style['box-wrap']} ${Style[boxType]} ${className}`}
			onClick={onClick && onClick}
			style={elCommStyle(spacing, textAlign)}
		>
			{children}
		</div>
	);
};

export default Box;
