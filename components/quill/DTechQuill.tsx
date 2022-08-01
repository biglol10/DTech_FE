/** ****************************************************************************************
 * @설명 : Quill component
 ********************************************************************************************
 * 번호    작업자     작업일         브랜치                       변경내용
 *-------------------------------------------------------------------------------------------
 * 1      변지욱     2022-08-01   feature/JW/quill            최초작성
 ********************************************************************************************/

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { toast } from 'react-toastify';
import { generateImageUID } from '@utils/appRelated/helperFunctions';

import PrevieImageComp from './PreviewImageComp';
import Style from './DTechQuill.module.scss';

const ReactQuill = dynamic(
	async () => {
		const { default: RQ } = await import('react-quill');

		return function comp({ forwardedRef, ...props }: any) {
			return <RQ ref={forwardedRef} {...props} />;
		};
	},
	{ ssr: false },
);

const DTechQuill = ({ handleSubmit = null }: { handleSubmit?: any }) => {
	const [quillContext, setQuillContext] = useState('<p>&nbsp;</p>');

	const [tempQuillContext, setTempQuillContext] = useState('');
	const [imageCounter, setImageCounter] = useState(0);
	const quillRef = useRef<any>();

	const [urlPreviewList, setUrlPreviewList] = useState<any>([]);

	const imageHandler = useCallback(() => {
		const input = document.createElement('input');

		input.setAttribute('type', 'file');
		input.setAttribute('accept', 'image/*');
		document.body.appendChild(input);

		input.click();

		input.onchange = async () => {
			// const [file] = input.files;

			// // S3 Presigned URL로 업로드하고 image url 받아오기
			// const { preSignedPutUrl: presignedURL, readObjectUrl: imageURL } = (
			// 	await getS3PresignedURL(file.name)
			// ).data;
			// await uploadImage(presignedURL, file);

			if (urlPreviewList.length >= 6) {
				toast['error'](<>{'이미지는 최대 6개로 제한합니다'}</>);
				return;
			}

			if (input.files) {
				const fileType =
					input.files[0].type.split('/')[input.files[0].type.split('/').length - 1];

				if (
					['png', 'jpg', 'jpeg'].includes(fileType) &&
					input.files[0].size <= 1 * 1024 * 1024
				) {
					const mediaPreview = URL.createObjectURL(input.files[0]);

					setUrlPreviewList([
						...urlPreviewList,
						{
							fileName: `${input.files[0].name}_${imageCounter}`,
							filePreview: mediaPreview,
						},
					]);

					setImageCounter(imageCounter + 1);
				} else {
					toast['error'](<>{'이미지 타입이나 사이즈를 체크해주세요'}</>);
				}
			}

			const fileInput = document.body.querySelector(':scope > input');

			if (fileInput !== null) {
				fileInput.remove();
			}
		};
	}, [imageCounter, urlPreviewList]);

	const modules = useMemo(
		() => ({
			toolbar: {
				container: [
					['bold', 'italic', 'underline', 'strike'],
					[{ list: 'ordered' }, { list: 'bullet' }],
					['link', 'image'],
				],
				handlers: { image: imageHandler },
			},
			keyboard: {
				bindings: {
					shift_enter: {
						key: 13,
						shiftKey: true,
						handler: (range: any, ctx: any) => {
							quillRef.current.getEditor().insertText(range.index, '\n');
						},
					},
					enter: {
						key: 13,
						handler: () => {
							// submit form }
							handleSubmit &&
								handleSubmit({
									value: quillContext,
									imgList: urlPreviewList,
								});
							setQuillContext('<p>&nbsp;</p>');
							setUrlPreviewList([]);
						},
					},
					// pasteWin: {
					// 	key: 86,
					// 	ctrlKey: true,
					// 	handler: (range: any, context: any) => {
					// 		console.log(range);
					// 		console.log(context);
					// 		alert('SADFASF');
					// 	},
					// },
					// pasteMac: {
					// 	key: 86,
					// 	metaKey: true,
					// 	handler: (range: any, context: any) => {
					// 		console.log(range);
					// 		console.log(context);
					// 		alert('WQERQWRWQR');
					// 	},
					// },
				},
			},
		}),
		[handleSubmit, imageHandler, quillContext, urlPreviewList],
	);

	const formats = [
		'header',
		'font',
		'size',
		'bold',
		'italic',
		'underline',
		'strike',
		'align',
		'blockquote',
		'list',
		'bullet',
		'indent',
		'background',
		'color',
		'link',
		'image',
		'video',
		'width',
	];

	// onChange에서 바로 setQuillContext하면 버그발생
	useEffect(() => {
		if (tempQuillContext.indexOf('<img src="') < 0) {
			setQuillContext(tempQuillContext);
		} else {
			const mediaPreview = tempQuillContext.substring(
				tempQuillContext.indexOf('<img src="') + 10,
				tempQuillContext.indexOf('"></p>'),
			);

			const filteredString = tempQuillContext.replace(`<img src="${mediaPreview}">`, '');

			if (mediaPreview && filteredString) {
				setQuillContext(filteredString);
				if (urlPreviewList.length >= 6) {
					toast['error'](<>{'이미지는 최대 6개로 제한합니다'}</>);
				} else {
					setUrlPreviewList((prev: any) => [
						...prev,
						{
							fileName: generateImageUID(),
							filePreview: mediaPreview,
						},
					]);
				}
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [tempQuillContext]);

	const changeUrlPreviewList = useCallback(
		(fileName: string) => {
			setUrlPreviewList(urlPreviewList.filter((item: any) => item.fileName !== fileName));
		},
		[urlPreviewList],
	);

	return (
		<>
			<div className={Style['quillWrap']}>
				<ReactQuill
					forwardedRef={quillRef}
					placeholder="내용을 입력하세요"
					modules={modules}
					formats={formats}
					value={quillContext}
					onChange={(content: string) => {
						setTempQuillContext(content);
					}}
				/>

				{urlPreviewList.length > 0 && (
					<div className={Style['imageListArea']}>
						{urlPreviewList.map((item: any, idx: number) => {
							return (
								<PrevieImageComp
									key={item.fileName}
									fileName={item.fileName}
									filePreview={item.filePreview}
									changeUrlPreviewList={changeUrlPreviewList}
								/>
							);
						})}
					</div>
				)}
			</div>
		</>
	);
};

export default DTechQuill;
