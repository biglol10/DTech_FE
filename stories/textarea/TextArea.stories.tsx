import { useRef } from 'react';
import { TextArea } from '@components/index';

import { Doc } from './TextArea.stories.mdx';

export default {
	title: 'Example/TextArea',
	parameters: {
		componentSubtitle: 'TextArea Component',
		docs: {
			page: Doc,
		},
	},
};

export const TextAreaSample = () => {
	const ref = useRef<any>();

	return (
		<>
			<TextArea minHeight={300} placeholder="내용을 입력하세요" onChange={(obj: { value: string }) => console.log(obj.value)} spacing={0} ref={ref} />
			<button
				onClick={() => {
					ref.current && ref.current.textArea.clear();
				}}
			>
				TextArea clear test
			</button>
		</>
	);
};
