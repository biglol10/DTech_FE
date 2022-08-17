import { MainLayoutTemplate } from '@components/customs';
import { InputDefault, DTechQuill, Button } from '@components/index';
import { useState, useRef } from 'react';
import { sendUserImgRequest } from '@utils/api/register/sendUserImgRequest';
import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import dynamic from 'next/dynamic';

import profileImg from '@public/images/profile.png';
import Image from 'next/image';
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
	// const sendImage = () => {
	// 	URL.revokeObjectURL(image.previewURL);
	// 	setImage({ ...image, imageFile: null, previewURL: '' });
	// };

	// const sendImage = () => {
	// 	console.log('sendImage');
	// 	if (image.imageFile !== null) {
	// 		const fileName = 'test';
	// 		const fileExtName = 'png';
	// 		const formData = new FormData();

	// 		// formData.append('img', image.imageFile, `${fileName}.${fileExtName}`);
	// 		formData.append('img', image.imageFile);

	// 		console.log(image);
	// 		sendUserImgRequest(formData);
	// 	}
	// };

	return (
		<>
			<div className={Style['boardLayout']}>
				<div className={Style['boardMain']}>
					<InputDefault
						id="title"
						stretch={true}
						placeholder="제목"
						className={Style['boardTitle']}
					/>
					<DTechQuill
						QuillSSR={ReactQuill}
						enterSubmit={true}
						quillMinHeight={300}
						returnQuillWrapperHeight={(heightValue: number) => {
							setQuillWrapperHeight(heightValue);
						}}
						// handleSubmit={(content: ChatList) => {
						// 	// 이미지 S3 되면 올리고 setChatList 호출
						// 	setChatList((prev: ChatList[]) => [
						// 		...prev,
						// 		{
						// 			value: content.value,
						// 			imgList: content.imgList,
						// 			linkList: content.linkList.map((item: any) => item.insert),
						// 		},
						// 	]);
						// }}
					/>

					{/* <div className={Style['uploader-wrapper']}>
						<input
							type="file"
							accept="image/*"
							ref={imgRef}
							onChange={saveImage}
							style={{ display: 'none' }}
						/>
						<div className={Style['img-wrapper']}>
							{image.imageFile !== null ? (
								// <img src={image.previewURL} />
								<Image src={image.previewURL} width={200} height={200} />
							) : (
								<Image src={profileImg} width={200} height={200} />
							)}
						</div>
						<div className={Style['upload-button']}>
							<Button
								className={Style['registerButton']}
								content="업로드"
								size="large"
								color="grey"
								buttonType="none"
								onClick={() => imgRef.current.click()}
							/>
							<Button
								className={Style['registerButton']}
								content="보내기"
								size="large"
								color="grey"
								buttonType="none"
								onClick={sendImage}
							/>
						</div>
					</div> */}
				</div>
			</div>
		</>
	);
};

Submit.PageLayout = MainLayoutTemplate;
// Index.displayName = 'root';

export default Submit;
