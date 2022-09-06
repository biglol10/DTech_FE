import { MainLayoutTemplate } from '@components/customs';
import { InputDefault, DTechQuill, InputDropdown, Button, InputLayout } from '@components/index';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useRef, useEffect } from 'react';
import { ChatList } from '@utils/types/commAndStoreTypes';
import dynamic from 'next/dynamic';

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
	const [quillWrapperHeight, setQuillWrapperHeight] = useState(0);

	const [techList, setTechList] = useState([]);
	const [boardTitle, setBoardTitle] = useState('');
	const [selectedTech, setSelectedTech] = useState('');
	const uuid = useSelector((state: any) => state.auth.userUID);
	const dispatch = useDispatch();

	const submitBoard = (content: ChatList) => {
		dispatch({
			type: 'SUBMIT_BOARD',
			content,
			uuid: '14be0513564973af12c0',
			selectedTech,
			boardTitle,
		});
	};

	useEffect(() => {
		dispatch({
			type: 'BOARD_TECH_LIST',
			setTechList,
		});
	}, []);

	const submitClick = () => {
		// console.log('submitClick');
	};

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
					<InputDefault
						id="title"
						stretch={true}
						placeholder="제목"
						className={Style['boardTitle']}
						value={boardTitle}
						onChange={(obj: { value: string }) => {
							// console.log(obj);
							setBoardTitle(obj.value);
						}}
					/>

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
					<DTechQuill
						QuillSSR={ReactQuill}
						enterSubmit={false}
						quillMinHeight={300}
						returnQuillWrapperHeight={(heightValue: number) => {
							setQuillWrapperHeight(heightValue);
						}}
						handleSubmit={(content: ChatList) => {
							// 이미지 S3 되면 올리고 setChatList 호출
							// console.log('handleSubmit');
							// console.log(content);
							submitBoard(content);
						}}
					/>

					<Button
						className={Style['registerButton']}
						content="보내기"
						size="large"
						color="grey"
						buttonType="none"
						onClick={submitClick}
					/>
				</div>
			</div>
		</>
	);
};

Submit.PageLayout = MainLayoutTemplate;
// Index.displayName = 'root';

export default Submit;
