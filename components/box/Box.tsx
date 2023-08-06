/** ****************************************************************************************
 * @설명 : Box component
 ********************************************************************************************
 * 번호    작업자     작업일         브랜치                       변경내용
 *-------------------------------------------------------------------------------------------
 * 1      변지욱     2022-06-22                              최초작성
 ********************************************************************************************/

import { inputElCommStyle } from '@utils/styleRelated/stylehelper';
import { IBox } from '@utils/types/componentTypes';
import Style from './Box.module.scss';

const Box = ({ id, children, boxType = 'basic', textAlign = 'left', className = '', spacing = 0, onClick, stretch = false }: IBox) => {
	return (
		<div
			id={id}
			className={`${Style['box-wrap']} ${Style[boxType]} ${className}`}
			onClick={onClick && onClick}
			style={inputElCommStyle(spacing, textAlign, stretch)}
		>
			{children}
		</div>
	);
};

export default Box;
