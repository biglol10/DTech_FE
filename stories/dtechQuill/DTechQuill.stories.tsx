import { DTechQuill } from '@components/index';

export default {
	title: 'Example/CustomQuill',
	parameters: {
		componentSubtitle: 'Custom Quill Component',
	},
	component: DTechQuill,
	argTypes: {},
};

export const QuillSample = () => {
	return <DTechQuill handleSubmit={(obj: any) => console.log(obj)} />;
};
