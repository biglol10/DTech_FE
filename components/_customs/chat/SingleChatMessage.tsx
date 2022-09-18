/* eslint-disable no-control-regex */
import { useRef, useState } from 'react';
import { Avatar, Button } from '@components/index';
import { techImage } from '@utils/constants/imageConstants';
import { Label } from 'semantic-ui-react';
import classNames from 'classnames/bind';
import { useModal } from '@utils/hooks/customHooks';
import { modalUISize } from '@utils/constants/uiConstants';
import Image from 'next/image';
import { ChatList } from '@utils/types/commAndStoreTypes';
import dayjs from 'dayjs';

import Style from './SingleChatMessage.module.scss';

interface ChatListExtends extends ChatList {
	messageOwner: 'other' | 'mine';
	sentTime: string | null | undefined;
	userName: string;
}

const SingleChatMessage = ({
	messageOwner,
	value,
	imgList,
	linkList,
	sentTime,
	userName,
}: ChatListExtends) => {
	const [showCopyButton, setShowCopyButton] = useState(false);
	const [copyButtonClicked, setCopyButtonClicked] = useState(false);

	const { handleModal } = useModal();

	console.log('imgList is ');
	console.log(imgList);
	console.log(typeof imgList);

	// console.log('imgimgimgimg');
	// console.log(imgList);
	// console.log(typeof imgList);
	// console.log(JSON.parse(imgList));
	// console.log(typeof JSON.parse(JSON.parse(JSON.stringify(`${imgList}`))));

	// console.log('linklinklink');
	// console.log(linkList);
	// console.log(typeof linkList);
	// console.log(typeof JSON.parse(JSON.stringify(`${linkList}`)));

	const sentTimeRef = useRef(sentTime ? dayjs(sentTime).format('HH:mm') : null);

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
							fontColor="black"
							content={userName}
						/>
					</Label>

					{value && (
						<>
							<div
								style={{
									display: 'flex',
									justifyContent: `${messageOwner === 'mine' ? 'right' : 'left'}`,
								}}
							>
								{messageOwner === 'other' ? (
									<>
										<Label
											basic
											pointing={'left'}
											className={cx('messageLabel', messageOwner)}
										>
											{/* <pre>{value}</pre> */}
											<pre>{`${value.replaceAll('\t', ' '.repeat(3))}`}</pre>
										</Label>
										<span style={{ alignSelf: 'flex-end' }}>
											{sentTimeRef.current}
										</span>
									</>
								) : (
									<>
										<span style={{ alignSelf: 'self-end' }}>
											{sentTimeRef.current}
										</span>
										<Label
											basic
											pointing={'right'}
											className={cx('messageLabel', messageOwner)}
										>
											{/* <pre>{value}</pre> */}
											<pre>{`${value.replaceAll('\t', ' '.repeat(3))}`}</pre>
										</Label>
									</>
								)}
							</div>
						</>
					)}
					{/* <span>{imgList}</span> */}
					{imgList && imgList.length > 0 && (
						<div className={cx('imageListDiv', messageOwner)}>
							{imgList.map((itemUrl: any, idx: number) => {
								return (
									<img
										style={{ height: '50px', width: '50px' }}
										key={`asdf_${idx}`}
										src={itemUrl}
										onClick={() => openImageModal(itemUrl)}
									/>
								);
							})}
							{/* {imgList.map((item: { fileName: string; filePreview: string }, idx) => (
								<Image
									key={`asdf_${idx}`}
									src={item.filePreview} // 아직 이미지 S3에 올리는 작업을 하지 않았으니 미리보기 적용
									height={50}
									width={50}
									onClick={() => openImageModal(item.filePreview)}
								/>
							))} */}
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

				{linkList && !!linkList.length && (
					<div className={Style['linkListDiv']}>
						<>
							{messageOwner !== 'other' &&
								Array(6 - linkList.length - 1)
									.fill(0)
									.map((item: null, idx) => <div key={`emptyA_${idx}`}></div>)}
							{linkList.map((item: { [name: string]: string }, idx: number) => {
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
