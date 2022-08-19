/* eslint-disable no-control-regex */
import { useEffect, useState } from 'react';
import { Avatar, Button } from '@components/index';
import { techImage } from '@utils/constants/techs';
import { Label } from 'semantic-ui-react';
import classNames from 'classnames/bind';
import { useModal } from '@utils/hooks/customHooks';
import { modalUISize } from '@utils/constants/uiConstants';
import Image from 'next/image';
import { ChatList } from '@utils/types/commAndStoreTypes';
import axios from 'axios';
import Style from './SingleChatMessage.module.scss';

interface ChatListExtends extends ChatList {
	messageOwner: 'other' | 'mine';
	bottomRef: any;
}

const SingleChatMessage = ({
	messageOwner,
	value,
	imgList,
	linkList,
	bottomRef,
}: ChatListExtends) => {
	const [showCopyButton, setShowCopyButton] = useState(false);
	const [copyButtonClicked, setCopyButtonClicked] = useState(false);
	const [linkMetadata, setLinkMetadata] = useState<any>([]);

	const { handleModal } = useModal();

	const openImageModal = (imgSrc: string) => {
		handleModal({
			modalOpen: true,
			modalContent: (
				<img
					src={imgSrc}
					style={{
						maxHeight: '90%',
						maxWidth: '90%',
						display: 'block',
						margin: 'auto',
					}}
				/>
			),
			modalSize: modalUISize.LARGE,
			modalIsBasic: true,
		});
	};

	const cx = classNames.bind(Style);

	useEffect(() => {
		const result = async () => {
			await axios
				.get('http://localhost:3066/api/utils/getMetadata', {
					params: { linkList },
				})
				.then((response) => {
					const { metadataArr } = response.data;

					setLinkMetadata(metadataArr);
				})
				.catch((err) => {
					return null;
				});
		};

		if (linkList.length) result();
	}, [linkList]);

	useEffect(() => {
		bottomRef?.current?.scrollIntoView({ behavior: 'auto' });
	}, [bottomRef, linkMetadata]);

	return (
		<>
			<div
				className={Style['chatWrapper']}
				onMouseEnter={() => setShowCopyButton(true)}
				onMouseLeave={() => {
					setShowCopyButton(false);
					setCopyButtonClicked(false);
				}}
			>
				<div className={cx('singleChatDiv', messageOwner)}>
					<Label
						attached={`top ${messageOwner === 'other' ? 'left' : 'right'}`}
						className={Style['avatarLabel']}
					>
						<Avatar
							labelSize="mini"
							src={techImage['React']}
							color="black"
							content={'username1'}
						/>
					</Label>

					{value && (
						<Label
							basic
							pointing={`${messageOwner === 'other' ? 'left' : 'right'}`}
							className={cx('messageLabel', messageOwner)}
						>
							{/* <pre>{value}</pre> */}
							<pre>{`${value.replaceAll('\t', ' '.repeat(3))}`}</pre>
						</Label>
					)}

					{imgList?.length > 0 && (
						<div className={cx('imageListDiv', messageOwner)}>
							{imgList.map((item: { fileName: string; filePreview: string }, idx) => (
								<Image
									key={`asdf_${idx}`}
									src={item.filePreview} // 아직 이미지 S3에 올리는 작업을 하지 않았으니 미리보기 적용
									height={50}
									width={50}
									onClick={() => openImageModal(item.filePreview)}
								/>
							))}
						</div>
					)}
				</div>

				{showCopyButton && (
					<div className={Style['copyButton']}>
						<Button
							content={copyButtonClicked ? 'copied!' : 'copy'}
							color={copyButtonClicked ? 'google plus' : 'instagram'}
							buttonType="none"
							onClick={async () => {
								setCopyButtonClicked(true);
								if ('clipboard' in navigator) {
									await navigator.clipboard.writeText(
										value.replace(/[^\x00-\x7F]/g, ''),
									);
								} else {
									return document.execCommand(
										'copy',
										true,
										value.replace(/[^\x00-\x7F]/g, ''),
									);
								}
								setTimeout(() => {
									setCopyButtonClicked(false);
								}, 3000);
							}}
						/>
					</div>
				)}

				{!!linkMetadata.length && (
					<div className={Style['linkListDiv']}>
						<>
							{messageOwner !== 'other' &&
								Array(6 - linkMetadata.length - 1)
									.fill(0)
									.map((item: null, idx) => <div key={`emptyA_${idx}`}></div>)}
							{linkMetadata.map((item: { [name: string]: string }, idx: number) => {
								return (
									<a
										key={`ahref_${item.url}_${idx}`}
										href={item.url}
										target="_blank"
										rel="noopener noreferrer"
									>
										<div>
											<h4>{item.url}</h4>
											{item.status === 'success' && item.metadata_title && (
												<p>{item.metadata_title}</p>
											)}
											{item.status === 'success' &&
												item.metadata_description && (
													<div>{item.metadata_description}</div>
												)}
											{item.status === 'success' && item.metadata_image && (
												<img src={item.metadata_image} alt="" />
											)}
										</div>
									</a>
								);
							})}
						</>
					</div>
				)}
			</div>
		</>
	);
};

export default SingleChatMessage;
