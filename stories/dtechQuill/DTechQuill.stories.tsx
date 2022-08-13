import { DTechQuill } from '@components/index';
import dynamic from 'next/dynamic';

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
	},
	component: DTechQuill,
	argTypes: {},
};

export const QuillSample = () => {
	return <DTechQuill handleSubmit={(obj: any) => console.log(obj)} QuillSSR={ReactQuill} />;
};
