/** ****************************************************************************************
 * @설명 : Quill component
 ********************************************************************************************
 * 번호    작업자     작업일         브랜치                       변경내용
 *-------------------------------------------------------------------------------------------
 * 1      변지욱     2022-08-01   feature/JW/quill            최초작성
 * 2      변지욱     2022-08-02   feature/JW/quill            텍스트 입력 + 이미지가 6개일 때 editor에 이미지가 추가되지 않게 수정
 * 3      변지욱     2022-08-16   feature/JW/quill            submit 버튼 추가 및 enter 이벤트 제어 가능토록 수정
 * 4      변지욱     2022-08-17   feature/JW/quill            setInterval로 quill height값 지속적으로 보내도록 수정 및 button disabled 추가
 * 5      변지욱     2022-08-24   feature/JW/chat             한글입력버그 해결
 * 6      변지욱     2022-08-25   feature/JW/chat             onchange시 notifyTextChange 이벤트 발생
 * 7      변지욱     2022-08-27   feature/JW/inputwithicon    lodash 이용해 notifyTextChange 제어
 * 8      변지욱     2022-09-13   feature/JW/quillButton      Send 버튼 위치 제어 가능토록 수정
 * 9      변지욱     2022-09-19   feature/JW/imageBlob        이미지 붙여먹기 시 blob객체로 변환 후 File
 * 10     변지욱     2022-09-29   feature/JW/chatRoom         enterSubmit이 있을 경우 엔터 이벤트 커스터마이징, 긔 외엔 null (게시판 때문)
 ********************************************************************************************/

import React, {
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
	forwardRef,
	useImperativeHandle,
} from 'react';
import dynamic from 'next/dynamic';
import { toast } from 'react-toastify';
import { generateImageUID } from '@utils/appRelated/helperFunctions';
import { customStyleObj } from '@utils/styleRelated/stylehelper';
import SendSvg from '@styles/svg/sendSvg.svg';
import lodash from 'lodash';

import PrevieImageComp from './PreviewImageComp';
import Style from './DTechQuill.module.scss';

interface IDTechQuill {
	handleSubmit?: any;
	returnQuillWrapperHeight?: any;
	quillMinHeight?: number;
	quillMaxHeight?: number;
	enterSubmit?: boolean;
	notifyTextChange?: Function | null;
	submitButtonOutside?: boolean;
}

const ReactQuill = dynamic(
	async () => {
		const { default: RQ } = await import('react-quill');

		const RQComp = React.memo(({ forwardedRef, ...props }: any) => {
			return <RQ ref={forwardedRef} {...props} />;
		});

		RQComp.displayName = 'CustomQuillComponent';

		return RQComp;
	},
	{ ssr: false },
);

// https://kamsi76.tistory.com/entry/Base64-Image-%EC%A0%95%EB%B3%B4%EB%A5%BC-Blob%ED%98%95%ED%83%9C%EB%A1%9C-%EB%B3%80%ED%99%98
// https://stackoverflow.com/questions/16245767/creating-a-blob-from-a-base64-string-in-javascript
// const block = mediaPreview.split(';');
// const contentType = block[0].split(':')[1];
// const realData = block[1].split(',')[1];

// const blob = b64toBlob(realData, contentType);
const b64toBlob = (b64Data: any, contentTypeParam: any, sliceSizeParam: any = 0) => {
	if (b64Data === '' || b64Data === undefined) return null;

	const contentType = contentTypeParam || '';
	const sliceSize = sliceSizeParam || 512;
	const byteCharacters = atob(b64Data);
	const byteArrays = [];

	for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
		const slice = byteCharacters.slice(offset, offset + sliceSize);
		const byteNumbers = new Array(slice.length);

		for (let i = 0; i < slice.length; i++) {
			byteNumbers[i] = slice.charCodeAt(i);
		}
		const byteArray = new Uint8Array(byteNumbers);

		byteArrays.push(byteArray);
	}

	const blob = new Blob(byteArrays, { type: contentType });

	return blob;
};

const DTechQuill = forwardRef<any, IDTechQuill>(
	(
		{
			handleSubmit = null,
			quillMinHeight = 80,
			quillMaxHeight = 200,
			returnQuillWrapperHeight = null,
			enterSubmit = true,
			notifyTextChange = null,
			submitButtonOutside = false,
		},
		ref,
	) => {
		const [quillContext, setQuillContext] = useState('');

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
					const fileType =
						inputFileRef.current.files[0].type.split('/')[
							inputFileRef.current.files[0].type.split('/').length - 1
						];

					if (
						['png', 'jpg', 'jpeg'].includes(fileType) &&
						inputFileRef.current.files[0].size <= 1 * 1024 * 1024
					) {
						const mediaPreview = URL.createObjectURL(inputFileRef.current.files[0]);

						setUrlPreviewList([
							...urlPreviewList,
							{
								imageFile: inputFileRef.current.files[0],
								fileName: `${generateImageUID()}.png`,
								filePreview: mediaPreview,
							},
						]);
					} else {
						toast['error'](<>{'이미지 타입이나 사이즈를 체크해주세요'}</>);
					}
				}

				setQuillContext(quillRef.current.getEditor().getText());
			};
		}, [urlPreviewList]);

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
			// eslint-disable-next-line react-hooks/exhaustive-deps
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
				keyboard: enterSubmit
					? {
							bindings: {
								shift_enter: {
									key: 13,
									shiftKey: true,
									handler: (range: any) => {
										quillRef.current.getEditor().insertText(range.index, '\n');
										quillRef.current
											.getEditor()
											.scrollIntoView({ behavior: 'auto' });
									},
								},
								enter: {
									key: 13,
									handler: (range: any) => {
										editorSubmitEvent();
									},
								},
							},
					  }
					: {},
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
				if (content.indexOf('<img src="') < 0) {
					if (quillRef.current) {
						quillRef.current.innerHTML = content;
						setQuillContext(content);
					}
				} else {
					const mediaPreview = content.substring(
						content.indexOf('<img src="') + 10,
						content.indexOf('"></p>'),
					);

					const filteredString = quillRef.current
						.getEditor()
						.getText()
						.replace(`<img src="${mediaPreview}">`, '');

					if (mediaPreview && filteredString) {
						setQuillContext(filteredString);
						quillRef.current.getEditor().setText(filteredString);
						if (urlPreviewList.length >= 6) {
							toast['error'](<>{'이미지는 최대 6개로 제한합니다'}</>);

							// 이걸 해줘야 텍스트 입력 + 이미지가 6개일 때 editor에 이미지가 추가되지 않음
							setUrlPreviewList((prev: any) => [...prev]);
						} else {
							const newName = `${generateImageUID()}.png`;

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
							}
						}
					}
				}

				if (notifyTextChange) {
					const newNotifyFunction = lodash.debounce(() => notifyTextChange(), 1000);

					newNotifyFunction();
				}
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
					<SendSvg />
					<span>submit</span>
				</button>
			);
		}, [editorSubmitEvent, quillContext, submitButtonOutside]);

		return (
			<>
				<div style={{ position: 'relative' }}>
					<input
						ref={inputFileRef}
						type="file"
						accept="image/*"
						style={{ position: 'absolute', top: '-10000px' }}
					/>
					<div
						id="quillWrapper"
						className={Style['quillWrap']}
						style={customStyleObj(0, [
							{ name: 'quillMinHeight', value: quillMinHeight },
							{ name: 'quillMaxHeight', value: quillMaxHeight },
						])}
					>
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

						{!!urlPreviewList.length && (
							<div
								className={Style['imageListArea']}
								style={{ gridColumn: 'span 1' }}
							>
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

						{!submitButtonOutside && submitButtonMemo}
					</div>
					{submitButtonOutside && submitButtonMemo}
				</div>
			</>
		);
	},
);

DTechQuill.displayName = 'DTechQuill';

export default DTechQuill;
