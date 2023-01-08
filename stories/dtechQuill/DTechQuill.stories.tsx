import dynamic from 'next/dynamic';
import { useRef } from 'react';
import DTechQuillStorybook from '../../components/quill/DTechQuillStorybook';

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
		submitButtonOutside: {
			defaultValue: false,
			description: '엔터 버튼 quill 내부에 위치 여부',
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
				return <RQ id="quillEditorId" ref={forwardedRef} {...props} />;
			};
		},
		{ ssr: false },
	);

	const quillRef = useRef<any>(null);

	return (
		<DTechQuillStorybook
			ref={quillRef}
			quillMinHeight={args.quillMinHeight}
			quillMaxHeight={args.quillMaxHeight}
			handleSubmit={(obj: any) => {
				console.log(quillRef.current);
			}}
			QuillSSR={ReactQuill}
			enterSubmit={args.enterSubmit}
			submitButtonOutside={args.submitButtonOutside}
		/>
	);
};
