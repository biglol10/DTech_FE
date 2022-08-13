import { DTechQuill } from '@components/index';
import dynamic from 'next/dynamic';

import { Doc } from './DTechQuill.stories.mdx';

const ReactQuill = dynamic(
	async () => {
		const { default: RQ } = await import('react-quill');

		return function comp({ forwardedRef, ...props }: any) {
			return <RQ ref={forwardedRef} {...props} />;
		};
	},
	{ ssr: false },
);

export default {
	title: 'Example/CustomQuill',
	parameters: {
		componentSubtitle: 'Custom Quill Component',
		docs: {
			page: Doc,
		},
	},
	component: DTechQuill,
	argTypes: {},
};

export const QuillSample = () => {
	return (
		<DTechQuill
			quillMinHeight={120}
			quillMaxHeight={400}
			handleSubmit={(obj: any) => console.log(obj)}
			QuillSSR={ReactQuill}
		/>
	);
};
