/* eslint-disable no-control-regex */
import { useRef, useState } from 'react';
import { Avatar, Button } from '@components/index';
import { techImage } from '@utils/constants/imageConstants';
import { Label } from 'semantic-ui-react';
import classNames from 'classnames/bind';
import { useModal } from '@utils/hooks/customHooks';
import dayjs from 'dayjs';
import { modalUISize } from '@utils/constants/uiConstants';

import Style from './SingleChatMessage.module.scss';

interface ChatListExtends {
	value: string;
	imgList: string[];
	linkList: any;
	messageOwner: 'other' | 'mine';
	sentTime: string | null | undefined;
	userName: string;
	isSamePreviousUserChat: boolean;
}

const SingleChatMessage = ({
	messageOwner,
	value,
	imgList,
	linkList,
	sentTime,
	userName,
	isSamePreviousUserChat,
}: ChatListExtends) => {
	const [copyButtonClicked, setCopyButtonClicked] = useState(false);
	const { handleModal } = useModal();
	const sentTimeRef = useRef(sentTime ? dayjs(sentTime).format('HH:mm') : null);

	const openImageModal = (imgSrc: string) => {
		handleModal({
			modalOpen: true,
			modalContent: (
				<img
					id="chatImageId"
					src={imgSrc}
					style={{
						maxHeight: '700px',
						maxWidth: '1000px',
						display: 'block',
						margin: 'auto',
					}}
				/>
			),
			// modalSize: modalUISize.LARGE,
			modalIsBasic: true,
			modalContentId: 'chatImageId',
			modalShowCloseIcon: 'N',
			modalFitContentWidth: true,
		});
	};

	const cx = classNames.bind(Style);

	return (
		<>
			<div className={Style['chatWrapper']}>
				<div className={cx('singleChatDiv', messageOwner)}>
					{!isSamePreviousUserChat ? (
						<Label
							attached={`top ${messageOwner === 'other' ? 'left' : 'right'}`}
							className={cx(
								'avatarLabel',
								isSamePreviousUserChat && 'avatarLabelHidden',
							)}
						>
							<Avatar
								labelSize="mini"
								src={techImage['React']}
								fontColor="black"
								content={userName}
							/>
						</Label>
					) : (
						<div
							className={cx(
								'avatarLabel',
								isSamePreviousUserChat && 'avatarLabelHidden',
							)}
						></div>
					)}

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
											<pre>{`${value.replaceAll('\t', ' '.repeat(3))}`}</pre>
										</Label>
										{!isSamePreviousUserChat && (
											<span style={{ alignSelf: 'flex-end' }}>
												{sentTimeRef.current}
											</span>
										)}
									</>
								) : (
									<>
										{!isSamePreviousUserChat && (
											<span style={{ alignSelf: 'self-end' }}>
												{sentTimeRef.current}
											</span>
										)}

										<Label
											basic
											pointing={'right'}
											className={cx('messageLabel', messageOwner)}
										>
											<pre>{`${value.replaceAll('\t', ' '.repeat(3))}`}</pre>
										</Label>
									</>
								)}
							</div>
						</>
					)}
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
							{/* bottomRef끝까지 가지 않아 일반 img태그 사용 */}
							{/* {imgList.map((itemUrl: any, idx: number) => (
								<Image
									key={`asdf_${idx}`}
									src={itemUrl}
									height={50}
									width={50}
									onClick={() => openImageModal(itemUrl)}
								/>
							))} */}
						</div>
					)}
				</div>

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
