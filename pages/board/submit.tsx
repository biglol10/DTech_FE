import { MainLayoutTemplate } from '@components/customs';
import { InputDefault, DTechQuill, InputDropdown } from '@components/index';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
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

	const submitBoard = (content: ChatList) => {
		dispatch({
			type: 'SUBMIT_BOARD',
			content,
			uuid,
			selectedTech,
			boardTitle,
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
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<div className={Style['boardLayout']}>
				<div className={Style['inputIdFieldDiv']}>
					<InputDropdown
						id="inputId"
						placeholder="기술 선택"
						options={techList}
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
						className={Style['boardTitle']}
						onChange={(obj: { value: string }) => {
							setBoardTitle(obj.value);
						}}
					/>
					<DTechQuill
						enterSubmit={false}
						quillMinHeight={300}
						returnQuillWrapperHeight={(heightValue: number) => {
							setQuillWrapperHeight(heightValue);
						}}
						handleSubmit={(content: ChatList) => {
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
Submit.displayName = 'board';

export default Submit;
