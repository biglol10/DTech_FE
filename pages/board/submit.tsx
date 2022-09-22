import { MainLayoutTemplate } from '@components/customs';
import { InputDefault, DTechQuill, InputDropdown, Button, InputLayout } from '@components/index';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { useState, useRef, useEffect } from 'react';
import { ChatList } from '@utils/types/commAndStoreTypes';
import dynamic from 'next/dynamic';
import { toast } from 'react-toastify';

import Style from './board.module.scss';

const ReactQuill = dynamic(
	async () => {
		const { default: RQ } = await import('react-quill');

		return function comp({ forwardedRef, ...props }: any) {
			return <RQ ref={forwardedRef} {...props} />;
		};
	},
	{ ssr: false },
);

const Submit = () => {
	const router = useRouter();
	const [quillWrapperHeight, setQuillWrapperHeight] = useState(0);
	const [techList, setTechList] = useState([]);
	const [boardTitle, setBoardTitle] = useState('');
	const [selectedTech, setSelectedTech] = useState('');
	const uuid = useSelector((state: any) => state.auth.userUID);
	const dispatch = useDispatch();
	const inputRef = useRef<any>();

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

	useEffect(() => {
		inputRef.current.focus();
	}, [boardTitle]);

	useEffect(() => {
		dispatch({
			type: 'BOARD_TECH_LIST',
			setTechList,
		});
	}, []);

	return (
		<>
			<div className={Style['boardLayout']}>
				<div className={Style['boardMain']}>
					{/* <InputLayout
						error={false}
						errorMsg="제목을 입력하세요."
						stretch={true}
						// inputLabel="이메일*"
						// inputLabelSize={labelSize}
						// showInputLabel={true}
						autoFitErrorLabel={true}
						spacing={40}
					>
						
					</InputLayout> */}
					<InputDropdown
						id="inputId"
						placeholder="기술 선택"
						options={techList}
						// value={techList.teamSelectValue}
						onChange={(obj: { value: string }) => {
							setSelectedTech(obj.value);
						}}
						className={Style['inputIdField']}
					/>
					<InputDefault
						key="key"
						id="title"
						stretch={true}
						placeholder="제목"
						className={Style['boardTitle']}
						onChange={(obj: { value: string }) => {
							setBoardTitle(obj.value);
						}}
						// onChange={(e: any) => {
						// 	console.log(e);
						// 	// setBoardTitle(obj.value);
						// }}
						ref={inputRef}
					/>

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
				</div>
			</div>
		</>
	);
};

Submit.PageLayout = MainLayoutTemplate;
// Index.displayName = 'root';

export default Submit;
