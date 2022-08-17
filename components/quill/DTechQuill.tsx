/** ****************************************************************************************
 * @설명 : Quill component
 ********************************************************************************************
 * 번호    작업자     작업일         브랜치                       변경내용
 *-------------------------------------------------------------------------------------------
 * 1      변지욱     2022-08-01   feature/JW/quill            최초작성
 * 2      변지욱     2022-08-02   feature/JW/quill            텍스트 입력 + 이미지가 6개일 때 editor에 이미지가 추가되지 않게 수정
 * 3      변지욱     2022-08-16   feature/JW/quill            submit 버튼 추가 및 enter 이벤트 제어 가능토록 수정
 * 4      변지욱     2022-08-17   feature/JW/quill            setInterval로 quill height값 지속적으로 보내도록 수정 및 button disabled 추가
 ********************************************************************************************/

import React, { ComponentType, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { toast } from 'react-toastify';
import { generateImageUID } from '@utils/appRelated/helperFunctions';
import { customStyleObj } from '@utils/styleRelated/stylehelper';
import SendSvg from '@styles/svg/sendSvg.svg';

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

const DTechQuill = ({
	handleSubmit = null,
	quillMinHeight = 80,
	quillMaxHeight = 200,
	returnQuillWrapperHeight = null,
	enterSubmit = true,
	QuillSSR,
}: {
	handleSubmit?: any;
	returnQuillWrapperHeight?: any;
	quillMinHeight?: number;
	quillMaxHeight?: number;
	enterSubmit?: boolean;
	QuillSSR: ComponentType<any>;
}) => {
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

	const editorSubmitEvent = useCallback(() => {
		if (
			quillRef.current.getEditor().getText().trim().length === 0 &&
			urlPreviewList.length === 0
		)
			return null;

		handleSubmit &&
			handleSubmit({
				value: quillRef.current.getEditor().getText().trim(),
				imgList: urlPreviewList,
				linkList: quillRef.current
					.getEditor()
					.getContents()
					.filter((item: any) => item.attributes?.link),
			});
		setQuillContext('<p></p>');
		setUrlPreviewList([]);
	}, [handleSubmit, urlPreviewList]);

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
						handler: (range: any) => {
							quillRef.current.getEditor().insertText(range.index, '\n');
							quillRef.current.getEditor().scrollIntoView({ behavior: 'auto' });
						},
					},
					enter: {
						key: 13,
						handler: (range: any) => {
							if (enterSubmit) {
								editorSubmitEvent();
							} else {
								quillRef.current.getEditor().insertText(range.index, '\n');
								quillRef.current.getEditor().scrollIntoView({ behavior: 'auto' });
							}
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
		[editorSubmitEvent, enterSubmit, imageHandler],
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

					// 이걸 해줘야 텍스트 입력 + 이미지가 6개일 때 editor에 이미지가 추가되지 않음
					setUrlPreviewList((prev: any) => [...prev]);
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
		// 다른 dependency 추가하면 버그 발생
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [tempQuillContext]);

	// first load 때 height값 보내주기
	useEffect(() => {
		let counter = 0;

		const timer = setInterval(() => {
			const divQuillHeight = document.getElementById('quillWrapper')!.clientHeight;

			returnQuillWrapperHeight && returnQuillWrapperHeight(divQuillHeight);
			counter++;
		}, 50);

		if (counter >= 2) clearInterval(timer);

		return () => clearInterval(timer);

		// setTimeout(() => {
		// 	const divQuillHeight = document.getElementById('quillWrapper')!.clientHeight;

		// 	returnQuillWrapperHeight && returnQuillWrapperHeight(divQuillHeight);
		// }, 50);
	}, [returnQuillWrapperHeight]);

	useEffect(() => {
		const divQuillHeight = document.getElementById('quillWrapper')!.clientHeight;

		returnQuillWrapperHeight && returnQuillWrapperHeight(divQuillHeight);
	}, [quillContext, urlPreviewList, returnQuillWrapperHeight]);

	const changeUrlPreviewList = useCallback(
		(fileName: string) => {
			setUrlPreviewList(urlPreviewList.filter((item: any) => item.fileName !== fileName));
		},
		[urlPreviewList],
	);

	return (
		<>
			<div
				id="quillWrapper"
				className={Style['quillWrap']}
				style={customStyleObj(0, [
					{ name: 'quillMinHeight', value: quillMinHeight },
					{ name: 'quillMaxHeight', value: quillMaxHeight },
				])}
			>
				{QuillSSR ? (
					<QuillSSR
						forwardedRef={quillRef}
						placeholder="내용을 입력하세요"
						modules={modules}
						formats={formats}
						value={quillContext}
						onChange={(content: string) => {
							setTempQuillContext(content);
						}}
					/>
				) : (
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
				)}

				{!!urlPreviewList.length && (
					<div className={Style['imageListArea']} style={{ gridColumn: 'span 1' }}>
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

				<button
					type="button"
					disabled={
						quillContext.trim() === '<p>&nbsp;</p>' ||
						quillContext.trim() === '<p></p>' ||
						quillContext.trim().length === 0 ||
						quillContext.trim() === '<p><br></p>'
					}
					onClick={() => editorSubmitEvent()}
				>
					<SendSvg />
					<span>submit</span>
				</button>
			</div>
		</>
	);
};

export default DTechQuill;
