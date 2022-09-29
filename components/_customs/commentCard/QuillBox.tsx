import { DTechQuill } from '@components/index';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useState, useRef, useEffect } from 'react';
import { ChatList } from '@utils/types/commAndStoreTypes';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const ReactQuill = dynamic(
	async () => {
		const { default: RQ } = await import('react-quill');

		return function comp({ forwardedRef, ...props }: any) {
			return <RQ ref={forwardedRef} {...props} />;
		};
	},
	{ ssr: false },
);

const QuillBox = ({ selectedTech = '', boardTitle = '' }: any) => {
	const router = useRouter();
	const [quillWrapperHeight, setQuillWrapperHeight] = useState(0);
	const uuid = useSelector((state: any) => state.auth.userUID);
	const dispatch = useDispatch();

	const submitBoard = (content: ChatList) => {
		// console.log(content);
		dispatch({
			type: 'SUBMIT_BOARD',
			content,
			uuid,
			selectedTech,
			boardTitle,
			callbackFn: (data: any) => {
				// console.log('submitBoardClick!!');
				if (data.result === 'success') {
					router.push('/board');
				} else {
					toast['error'](<>{'submit failed'}</>);
				}
			},
		});
	};

	return (
		<>
			<DTechQuill
				QuillSSR={ReactQuill}
				enterSubmit={false}
				quillMinHeight={300}
				returnQuillWrapperHeight={(heightValue: number) => {
					setQuillWrapperHeight(heightValue);
				}}
				handleSubmit={(content: ChatList) => {
					// 이미지 S3 되면 올리고 setChatList 호출
					submitBoard(content);
				}}
				submitButtonOutside={true}
			/>
		</>
	);
};

export default QuillBox;
