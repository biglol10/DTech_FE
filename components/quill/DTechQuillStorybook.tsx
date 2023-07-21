/* eslint-disable react-hooks/exhaustive-deps */

/** ****************************************************************************************
 * @설명 : Quill component for Storybook Only (SVG as component and generateImageUID dont work)
 ********************************************************************************************
 * 번호    작업자     작업일         브랜치                       변경내용
 *-------------------------------------------------------------------------------------------
 * 1      변지욱     2022-08-26                              최초작성
 ********************************************************************************************/

import React, { ComponentType, useCallback, useEffect, useMemo, useRef, useState, forwardRef, useImperativeHandle } from 'react';
import dynamic from 'next/dynamic';
import { toast } from 'react-toastify';
import { customStyleObj } from '@utils/styleRelated/stylehelper';
import lodash from 'lodash';

import PreviewImageCompStorybook from './PreviewImageCompStorybook';
import Style from './DTechQuill.module.scss';

interface IDTechQuill {
	handleSubmit?: any;
	returnQuillWrapperHeight?: any;
	quillMinHeight?: number;
	quillMaxHeight?: number;
	enterSubmit?: boolean;
	QuillSSR: ComponentType<any>;
	notifyTextChange?: Function | null;
	submitButtonOutside?: boolean;
}

const ReactQuill = dynamic(
	async () => {
		const { default: RQ } = await import('react-quill');

		const RQComp = React.memo(({ forwardedRef, ...props }: any) => {
			return <RQ id="quillEditorId" ref={forwardedRef} {...props} />;
		});

		RQComp.displayName = 'CustomQuillComponent';

		return RQComp;
	},
	{ ssr: false },
);

const DTechQuillStorybook = forwardRef<any, IDTechQuill>(
	(
		{
			handleSubmit = null,
			quillMinHeight = 80,
			quillMaxHeight = 200,
			returnQuillWrapperHeight = null,
			enterSubmit = true,
			QuillSSR,
			notifyTextChange = null,
			submitButtonOutside = false,
		},
		ref,
	) => {
		const [quillContext, setQuillContext] = useState('');
		const [imageCounter, setImageCounter] = useState(0);

		const quillRef = useRef<any>();
		const inputFileRef = useRef<any>();

		const [urlPreviewList, setUrlPreviewList] = useState<any>([]);

		const imageHandler = useCallback(() => {
			inputFileRef.current.click();

			inputFileRef.current.onchange = async () => {
				if (urlPreviewList.length >= 6) {
					toast['error'](<>{'이미지는 최대 6개로 제한합니다'}</>);
					return;
				}

				if (inputFileRef.current.files) {
					const fileType = inputFileRef.current.files[0].type.split('/')[inputFileRef.current.files[0].type.split('/').length - 1];

					if (['png', 'jpg', 'jpeg'].includes(fileType) && inputFileRef.current.files[0].size <= 1 * 1024 * 1024) {
						const mediaPreview = URL.createObjectURL(inputFileRef.current.files[0]);

						setUrlPreviewList([
							...urlPreviewList,
							{
								imageFile: inputFileRef.current.files[0],
								fileName: `${inputFileRef.current.files[0].name}_${imageCounter}`,
								filePreview: mediaPreview,
							},
						]);
						setImageCounter(imageCounter + 1);
					} else {
						toast['error'](<>{'이미지 타입이나 사이즈를 체크해주세요'}</>);
					}
				}

				setQuillContext(quillRef.current.getEditor().getText());
			};
			// eslint-disable-next-line react-hooks/exhaustive-deps
		}, [urlPreviewList]);

		const editorSubmitEvent = useCallback(() => {
			if (quillRef.current.getEditor().getText().trim().length === 0 && urlPreviewList.length === 0) return null;

			handleSubmit &&
				handleSubmit({
					value: quillRef.current.getEditor().getText().trim(),
					imgList: urlPreviewList,
					linkList: quillRef.current
						.getEditor()
						.getContents()
						.filter((item: any) => item.attributes?.link)
						.map((item2: any) => item2.insert),
				});
			quillRef.current.getEditor().setText('');
			setQuillContext('');
			setUrlPreviewList([]);
		}, [handleSubmit, urlPreviewList]);

		useImperativeHandle(
			ref,
			() => ({
				value: quillRef?.current?.getEditor().getText().trim(),
				imgList: urlPreviewList,
				linkList: quillRef?.current
					?.getEditor()
					.getContents()
					.filter((item: any) => item.attributes?.link)
					.map((item2: any) => item2.insert),
			}),
			[urlPreviewList, quillContext],
		);

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
		}, [returnQuillWrapperHeight]);

		useEffect(() => {
			const divQuillHeight = document.getElementById('quillWrapper')!.clientHeight;

			returnQuillWrapperHeight && returnQuillWrapperHeight(divQuillHeight);
		}, [quillContext, urlPreviewList, returnQuillWrapperHeight]);

		const changeUrlPreviewList = useCallback(
			(fileName: string) => {
				setUrlPreviewList(urlPreviewList.filter((item: any) => item.fileName !== fileName));
				setQuillContext(quillRef.current.getEditor().getText());
			},
			[urlPreviewList],
		);

		const quillTextChange = useCallback(
			async (content: any) => {
				const imgContent: HTMLImageElement | null = document.querySelector('#quillEditorId .ql-editor p img');

				if (!imgContent) {
					if (quillRef.current) {
						quillRef.current.innerHTML = content;
						setQuillContext(content);
					}
				} else {
					const mediaPreview = imgContent.src;
					const filteredString = quillRef.current.getEditor().getText().replace(`<img src="${mediaPreview}">`, '');

					if (mediaPreview && filteredString) {
						setQuillContext(filteredString);
						quillRef.current.getEditor().setText(filteredString);
						if (urlPreviewList.length >= 6) {
							toast['error'](<>{'이미지는 최대 6개로 제한합니다'}</>);

							// 이걸 해줘야 텍스트 입력 + 이미지가 6개일 때 editor에 이미지가 추가되지 않음
							setUrlPreviewList((prev: any) => [...prev]);
						} else {
							const newName = `clipboardImage_${imageCounter}.png`;

							let blobObj = null;

							await fetch(mediaPreview)
								.then((res) => res.blob())
								.then((obj) => {
									blobObj = obj;
								});

							if (blobObj) {
								const imageFileObject = new File([blobObj], newName);

								setUrlPreviewList((prev: any) => [
									...prev,
									{
										fileName: newName,
										filePreview: mediaPreview,
										imageFile: imageFileObject,
									},
								]);

								setImageCounter(imageCounter + 1);
							}
						}
					}
				}

				// if (content.indexOf('<img src="') < 0) {
				// 	if (quillRef.current) {
				// 		quillRef.current.innerHTML = content;
				// 		setQuillContext(content);
				// 	}
				// } else {
				// 	const mediaPreview = content.substring(
				// 		content.indexOf('<img src="') + 10,
				// 		content.indexOf('"></p>'),
				// 	);

				// 	const filteredString = quillRef.current
				// 		.getEditor()
				// 		.getText()
				// 		.replace(`<img src="${mediaPreview}">`, '');

				// 	if (mediaPreview && filteredString) {
				// 		setQuillContext(filteredString);
				// 		quillRef.current.getEditor().setText(filteredString);
				// 		if (urlPreviewList.length >= 6) {
				// 			toast['error'](<>{'이미지는 최대 6개로 제한합니다'}</>);

				// 			// 이걸 해줘야 텍스트 입력 + 이미지가 6개일 때 editor에 이미지가 추가되지 않음
				// 			setUrlPreviewList((prev: any) => [...prev]);
				// 		} else {
				// 			const newName = `clipboardImage_${imageCounter}.png`;

				// 			let blobObj = null;

				// 			await fetch(mediaPreview)
				// 				.then((res) => res.blob())
				// 				.then((obj) => {
				// 					blobObj = obj;
				// 				});

				// 			if (blobObj) {
				// 				const imageFileObject = new File([blobObj], newName);

				// 				setUrlPreviewList((prev: any) => [
				// 					...prev,
				// 					{
				// 						fileName: newName,
				// 						filePreview: mediaPreview,
				// 						imageFile: imageFileObject,
				// 					},
				// 				]);

				// 				setImageCounter(imageCounter + 1);
				// 			}
				// 		}
				// 	}
				// }

				// if (notifyTextChange) {
				// 	const newNotifyFunction = lodash.debounce(() => notifyTextChange(), 1000);

				// 	newNotifyFunction();
				// }
			},
			[notifyTextChange, urlPreviewList.length],
		);

		const submitButtonMemo = useMemo(() => {
			return (
				<button
					type="button"
					disabled={
						quillContext.trim() === '<p>&nbsp;</p>' ||
						quillContext.trim() === '<p></p>' ||
						quillContext.trim().length === 0 ||
						quillContext.trim() === '<p><br></p>'
					}
					onClick={() => editorSubmitEvent()}
					className={Style[`${submitButtonOutside && 'submitButtonOutside'}`]}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						version="1.0"
						width="20.000000pt"
						height="20.000000pt"
						viewBox="0 0 30.000000 30.000000"
						preserveAspectRatio="xMidYMid meet"
					>
						<g transform="translate(0.000000,30.000000) scale(0.100000,-0.100000)" fill="#FBFCFC" stroke="none">
							<path d="M138 233 c-60 -20 -108 -39 -108 -42 0 -3 16 -19 36 -34 l35 -29 62 49 62 48 -48 -62 -49 -62 29 -35 c15 -20 31 -36 34 -36 5 0 79 218 79 234 0 10 -21 5 -132 -31z" />
						</g>
					</svg>
					<span>submit</span>
				</button>
			);
		}, [editorSubmitEvent, quillContext, submitButtonOutside]);

		return (
			<>
				<input ref={inputFileRef} type="file" accept="image/*" style={{ position: 'absolute', top: '-10000px' }} />
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
							// value={quillContext}
							onChange={(content: any, delta: any, source: any, editor: any) => {
								quillTextChange(editor.getHTML());
							}}
						/>
					) : (
						<ReactQuill
							forwardedRef={quillRef}
							placeholder="내용을 입력하세요"
							modules={modules}
							formats={formats}
							// value={quillContext}
							onChange={(content: any, delta: any, source: any, editor: any) => {
								quillTextChange(editor.getHTML());
							}}
						/>
					)}

					{!!urlPreviewList.length && (
						<div className={Style['imageListArea']} style={{ gridColumn: 'span 1' }}>
							{urlPreviewList.map((item: any, idx: number) => {
								return (
									<PreviewImageCompStorybook
										key={item.fileName}
										fileName={item.fileName}
										filePreview={item.filePreview}
										changeUrlPreviewList={changeUrlPreviewList}
									/>
								);
							})}
						</div>
					)}
					{!submitButtonOutside && submitButtonMemo}
				</div>
				{submitButtonOutside && submitButtonMemo}
			</>
		);
	},
);

DTechQuillStorybook.displayName = 'DTechQuillStorybook';

export default DTechQuillStorybook;
