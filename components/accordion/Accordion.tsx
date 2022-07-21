/** ****************************************************************************************
 * @설명 : Accordion component
 ********************************************************************************************
 * 번호    작업자     작업일         브랜치                       변경내용
 *-------------------------------------------------------------------------------------------
 * 1      변지욱     2022-06-20                              최초작성
 ********************************************************************************************/

import { useState } from 'react';
import {
	Accordion as MUIAccordion,
	AccordionSummary,
	AccordionDetails,
	Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { IAccordion, IAccordionItems } from '@utils/types/componentTypes';
import { inputElCommStyle } from '@utils/styleRelated/stylehelper';
import Style from './Accordion.module.scss';

interface IJsObj {
	[name: string]: boolean;
}

const Accordion = ({
	id = '',
	items,
	backgroundColor = 'white',
	fontColor = 'black',
	spacing = 0,
	stretch = false,
}: IAccordion) => {
	const jsObj: IJsObj = {};

	items.map((item: IAccordionItems, idx: number) => {
		const uId = `${id}_${idx}`;

		jsObj[uId] = item.expanded;
		return null;
	});

	const [expandedAccordions, setExpandedAccordions] = useState(jsObj);

	const handleAccordionChange = (idValue: string) => {
		setExpandedAccordions({ ...expandedAccordions, [idValue]: !expandedAccordions[idValue] });
	};

	return (
		<div className={Style['accordion-wrap']} style={inputElCommStyle(spacing, 'left', stretch)}>
			{items.map((item: IAccordionItems, idx: number) => {
				return (
					<MUIAccordion
						key={`${id}_${idx}`}
						expanded={expandedAccordions[`${id}_${idx}`]}
						onChange={() => handleAccordionChange(`${id}_${idx}`)}
						style={{ backgroundColor, color: fontColor }} // style={{ backgroundColor, color: fontColor, ...elCommStyle(1000, 'left') }}
					>
						<AccordionSummary
							expandIcon={<ExpandMoreIcon />}
							aria-controls={id}
							id={id}
						>
							<Typography className={Style['accordionItemTitle']}>
								{item.title}
							</Typography>
						</AccordionSummary>
						<AccordionDetails>
							{typeof item.content === 'string' ? (
								<Typography>{item.content}</Typography>
							) : (
								item.content
							)}
						</AccordionDetails>
					</MUIAccordion>
				);
			})}
		</div>
	);
};

export default Accordion;
