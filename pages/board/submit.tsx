import { MainLayoutTemplate } from '@components/customs';
import { InputDefault, DTechQuill, InputDropdown } from '@components/index';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { useState, useRef, useEffect, useCallback } from 'react';
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
	const titleStr = useRef('');

	const submitBoard = (content: ChatList) => {
		console.log(titleStr);
		dispatch({
			type: 'SUBMIT_BOARD',
			content,
			uuid,
			selectedTech,
			boardTitle: titleStr.current,
			callbackFn: (data: any) => {
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

	// const writeTitle = (title: string) => {
	// 	titleStr = title;
	// 	// dispatch({
	// 	// 	type: 'BOARD_TITLE',
	// 	// 	title,
	// 	// });
	// };

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
							// setBoardTitle(obj.value);
							// writeTitle(obj.value);
							// writeTitle(obj.value);
							// titleStr = obj.value;
							titleStr.current = obj.value;
						}}
						// ref={inputRef}
					/>
					{/* <QuillBox selectedTech={selectedTech} boardTitle={boardTitle} /> */}
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
