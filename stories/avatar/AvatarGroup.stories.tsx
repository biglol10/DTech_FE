import { AvatarGroup } from '@components/index';
import { Doc } from './AvatarGroup.stories.mdx';

export default {
	title: 'Example/Avatar/Group',
	parameters: {
		componentSubtitle: 'AvatarGroup Component',
		docs: {
			page: Doc,
		},
	},
	component: AvatarGroup,
	argTypes: {
		divHeight: {
			defaultValue: 20,
			type: 'number',
			description: 'Div Height',
		},
		spacing: {
			defaultValue: 0,
			type: 'number',
			description: 'margin-top',
		},
	},
};

export const AvatarGroupSample = (args: any) => {
	const imageList = [
		'https://ca.slack-edge.com/T02SCQ38A22-U039FT91QTD-g0ca8cf5c8e6-24',
		'https://ca.slack-edge.com/T02SCQ38A22-U02U080JHC2-29078f07fef3-24',
		'https://ca.slack-edge.com/T02SCQ38A22-USLACKBOT-sv41d8cd98f0-24',
		'https://ca.slack-edge.com/T02SCQ38A22-U02U2GTV8J0-3c397712af98-24',
		'https://ca.slack-edge.com/T02SCQ38A22-U0310788JFR-c2ebf48cb030-24',
	];

	return <AvatarGroup spacing={args.spacing} imageList={imageList} divHeight={args.divHeight} />;
};
