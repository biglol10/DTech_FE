import { Accordion } from '@components/index';
import { Message, Image } from 'semantic-ui-react';

import { Doc } from '../button/Button.stories.mdx';

export default {
	title: 'Example/Accordion',
	parameters: {
		componentSubtitle: 'Accordion Component',
		docs: {
			page: Doc,
		},
	},
	component: Accordion,
};

export const AccordionSample = () => {
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

	return <Accordion id="accordionId" items={items} />;
};
