import { MainLayoutTemplate } from '@components/customs';
import { InputDefault, DTechQuill, InputDropdown } from '@components/index';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { useState, useRef, useEffect } from 'react';
import { ChatList } from '@utils/types/commAndStoreTypes';
import { toast } from 'react-toastify';

import Style from './board.module.scss';

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
		dispatch({
			type: 'BOARD_TECH_LIST',
			setTechList,
		});
	}, []);

	return (
		<>
			<div className={Style['boardLayout']}>
				<div className={Style['inputIdFieldDiv']}>
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
				</div>

				<div className={Style['boardMain']}>
					<InputDefault
						key="key"
						id="title"
						stretch={true}
						placeholder="제목"
						// value={boardTitle}
						className={Style['boardTitle']}
						onChange={(obj: { value: string }) => {
							setBoardTitle(obj.value);
						}}
						// ref={inputRef}
					/>
					<DTechQuill
						// QuillSSR={ReactQuill}
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
