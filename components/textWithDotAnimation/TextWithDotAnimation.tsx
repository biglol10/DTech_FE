/** ****************************************************************************************
 * @설명 : TextWithDotAnimation
 ********************************************************************************************
 * 번호    작업자     작업일         브랜치                    변경내용
 *-------------------------------------------------------------------------------------------
 * 1      변지욱    2022-08-25    feature/JW/chat          최초작성
 ********************************************************************************************/

import { customStyleObj } from '@utils/styleRelated/stylehelper';
import { ITextWithDotAnimation } from '@utils/types/componentTypes';
import Style from './TextWithDotAnimation.module.scss';

const TextWithDotAnimation = ({
	content = '',
	color = 'black',
	uiType = 'dot-flashing',
	marginLeftValue = 0,
	dotSize = 10,
	className = '',
	hide = false,
}: ITextWithDotAnimation) => {
	return (
		<div className={`${Style['textdotDiv']} ${className}`}>
			{!hide && (
				<>
					<span>{content}</span>
					<div
						className={`${Style[uiType]}`}
						style={customStyleObj(0, [
							{ name: 'marginLeftValue', value: marginLeftValue },
							{ name: 'dotColor', value: color },
							{ name: 'dotSize', value: `${dotSize}px` },
						])}
					></div>
				</>
			)}
		</div>
	);
};

export default TextWithDotAnimation;
