import { Box } from '@components/index';
import { Message, Image } from 'semantic-ui-react';

export default {
	title: 'Example/Box',
	parameters: {
		componentSubtitle: 'Box Component',
	},
	component: Box,
	argTypes: {
		boxType: {
			defaultValue: 'basic',
			description: 'Box Type',
			options: ['basic', 'primary', 'error'],
			control: { type: 'radio' },
			table: { defaultValue: { summary: 'basic' } },
		},
	},
};

export const BoxSample = (args: any) => {
	return (
		<Box {...args}>
			<div>This is the Content for Box</div>
			<Message>
				<Message.Header>Changes in Service</Message.Header>
				<p>
					We updated our privacy policy here to better service our customers. We recommend
					reviewing the changes.
				</p>
			</Message>
			<Image
				src="https://media.istockphoto.com/photos/porcelain-stoneware-tiles-in-store-picture-id1312700805"
				size="small"
				wrapped
			/>
		</Box>
	);
};

BoxSample.args = {
	id: 'sampleBoxId',
	spacing: 32,
	boxType: 'basic',
	textAlign: 'left',
	className: '',
};
