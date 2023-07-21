/** ****************************************************************************************
 * @설명 : Logo Button component
 ********************************************************************************************
 * 번호    작업자     작업일         브랜치                       변경내용
 *-------------------------------------------------------------------------------------------
 * 1      장보영     2022-11-1                              최초작성
 ********************************************************************************************/

import { Button as SemanticButton } from 'semantic-ui-react';
import { ILogoBtn } from '@utils/types/componentTypes';
import Style from './Button.module.scss';

const LogoBtn = ({
	className = '',
	buttonType = 'primary',
	content = '',
	basic = false,
	color = 'grey',
	size = 'mini',
	loading = false,
	onClick = undefined,
	spacing = 0,
	disabled = false,
	backColor = '000000',
	logo = 'logo',
	logoColor = 'white',
}: ILogoBtn) => {
	return (
		<SemanticButton
			className={Style['semanticButton2']}
			content={
				basic ? (
					<img src={`https://img.shields.io/badge/${logo}-dcdcdc?style=for-the-badge&logo=${logo}&logoColor=black`} />
				) : (
					<img src={`https://img.shields.io/badge/${logo}-${backColor}?style=for-the-badge&logo=${logo}&logoColor=${logoColor}`} />
				)
			}
			basic={basic}
			size={size}
			loading={loading}
			onClick={onClick && onClick}
			style={{ 'margin-top': `5px`, padding: '0px', color: 'FFFFFF' }}
			disabled={disabled}
		/>
	);
};

export default LogoBtn;
