import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import dynamic from 'next/dynamic';

const ReactQuill = dynamic(
	async () => {
		const { default: RQ } = await import('react-quill');

		return function comp({ forwardedRef, ...props }: any) {
			return <RQ ref={forwardedRef} {...props} onE />;
		};
	},
	{ ssr: false },
);

const DTechQuill = ({
	value = '<p></p>',
	handleSubmit = null,
}: {
	value?: string;
	handleSubmit?: any;
}) => {
	const [quillContext, setQuillContext] = useState(value);
	const [tempQuillContext, setTempQuillContext] = useState('');
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

			if (input.files) {
				const mediaPreview = URL.createObjectURL(input.files[0]);

				setUrlPreviewList([
					...urlPreviewList,
					{ fileName: input.files[0].name, filePreview: mediaPreview },
				]);
			}

			const fileInput = document.body.querySelector(':scope > input');

			if (fileInput !== null) {
				fileInput.remove();
			}
		};
	}, [urlPreviewList]);

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
									urlPreviewList,
								});
							setQuillContext('<p></p>');
							setUrlPreviewList([]);
						},
					},
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
		setQuillContext(tempQuillContext);
	}, [tempQuillContext]);

	return (
		<>
			<ReactQuill
				forwardedRef={quillRef}
				placeholder="내용을 입력하세요"
				modules={modules}
				formats={formats}
				value={quillContext}
				onChange={(content: any) => {
					setTempQuillContext(content);
				}}
			/>
			<div style={{ height: '50px', width: '100%', backgroundColor: 'red' }}>
				{urlPreviewList.map((item: any, idx: number) => {
					return (
						<img
							key={`urlPreview_${idx}`}
							src={item.filePreview}
							alt=""
							style={{ height: '30px', width: '30px' }}
						/>
					);
				})}
			</div>
		</>
	);
};

export default DTechQuill;
