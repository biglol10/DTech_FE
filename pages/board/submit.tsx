import { MainLayoutTemplate } from '@components/customs';
import { InputDefault, DTechQuill, InputDropdown, Button, InputLayout } from '@components/index';
import { useDispatch } from 'react-redux';
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
	const [image, setImage] = useState({ previewURL: '', imageFile: null });
	const [chatList, setChatList] = useState<any>({});
	const [techList, setTechList] = useState([]);
	const [selectedTech, setSelectedTech] = useState('');
	const dispatch = useDispatch();
	const imgRef = useRef<any>();
	const saveImage = (e: any) => {
		e.preventDefault();
		if (e.target.files[0]) {
			URL.revokeObjectURL(image.previewURL);
			const previewURL = URL.createObjectURL(e.target.files[0]);

			setImage((prev: any) => ({
				...prev,
				imageFile: e.target.files[0],
				previewURL,
			}));
		}
	};
	const submitBoard = (content: ChatList) => {
		dispatch({
			type: 'SUBMIT_BOARD',
			content,
		});
	};

	useEffect(() => {
		dispatch({
			type: 'BOARD_TECH_LIST',
			setTechList,
		});
	}, []);

	const submitClick = () => {
		console.log('submitClick');
	};

	return (
		<>
			<div className={Style['boardLayout']}>
				<div className={Style['boardMain']}>
					<InputLayout
						error={false}
						errorMsg="제목을 입력하세요."
						stretch={true}
						// inputLabel="이메일*"
						// inputLabelSize={labelSize}
						// showInputLabel={true}
						autoFitErrorLabel={true}
						spacing={40}
					>
						<InputDefault
							id="title"
							stretch={true}
							placeholder="제목"
							className={Style['boardTitle']}
						/>
					</InputLayout>
					<InputDropdown
						id="inputId"
						placeholder="기술 선택"
						options={techList}
						// value={techList.teamSelectValue}
						onChange={(obj: { value: string }) => {
							console.log(obj);
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
