import DTechQuillStorybook from '@components/quill/DTechQuillStorybook';
import dynamic from 'next/dynamic';

import { Doc } from './DTechQuill.stories.mdx';

export default {
	title: 'Example/CustomQuill',
	parameters: {
		componentSubtitle: 'Custom Quill Component',
		docs: {
			page: Doc,
		},
	},
	component: DTechQuillStorybook,
	argTypes: {
		enterSubmit: {
			defaultValue: true,
			description: '엔터 시 submit여부',
			options: [true, false],
			control: { type: 'radio' },
			table: { defaultValue: { summary: true } },
		},
	},
};

export const QuillSample = (args: any) => {
	const ReactQuill = dynamic(
		async () => {
			const { default: RQ } = await import('react-quill');

			return function comp({ forwardedRef, ...props }: any) {
				return <RQ ref={forwardedRef} {...props} />;
			};
		},
		{ ssr: false },
	);

	return (
		<DTechQuillStorybook
			quillMinHeight={args.quillMinHeight}
			quillMaxHeight={args.quillMaxHeight}
			handleSubmit={(obj: any) => null}
			QuillSSR={ReactQuill}
			enterSubmit={args.enterSubmit}
		/>
	);
};
