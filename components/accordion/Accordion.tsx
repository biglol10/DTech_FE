import { useState } from 'react';
import {
	Accordion as MUIAccordion,
	AccordionSummary,
	AccordionDetails,
	Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Accordion = ({ id = '', items }: { id: any; items: any }) => {
	const [expandedAccordions, setExpandedAccordions] = useState(() => {
		const arr = items.map((item: any) => item.expanded);

		return arr;
	});

	return <></>;
};

export default function SimpleAccordion() {
	return (
		<div>
			<MUIAccordion expanded={true}>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls="panel1a-content"
					id="panel1a-header"
				>
					<Typography>Accordion 1</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Typography>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
						malesuada lacus ex, sit amet blandit leo lobortis eget.
					</Typography>
				</AccordionDetails>
			</MUIAccordion>
			<MUIAccordion>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls="panel2a-content"
					id="panel2a-header"
				>
					<Typography>Accordion 2</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Typography>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
						malesuada lacus ex, sit amet blandit leo lobortis eget.
					</Typography>
				</AccordionDetails>
			</MUIAccordion>
			<MUIAccordion disabled>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls="panel3a-content"
					id="panel3a-header"
				>
					<Typography>Disabled Accordion</Typography>
				</AccordionSummary>
			</MUIAccordion>
		</div>
	);
}
