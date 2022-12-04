/* eslint-disable no-control-regex */

/** ****************************************************************************************
 * @설명 : 스킬 대시보드 페이지
 ********************************************************************************************
 * 번호    작업자     작업일         브랜치                       변경내용
 *-------------------------------------------------------------------------------------------
 * 1      변지욱     2022-08-27   feature/JW/chat            최초작성
 * 2      변지욱     2022-12-04   feature/JW/refactor        IntersectionObserver로 보이지 않는 이미지를 로드하지 않게 수정
 ********************************************************************************************/

import { useRef, useState, useEffect } from 'react';
import { Avatar, Button } from '@components/index';
import { techImage } from '@utils/constants/imageConstants';
import { Label } from 'semantic-ui-react';
import classNames from 'classnames/bind';
import { useModal } from '@utils/hooks/customHooks';
import dayjs from 'dayjs';
import { IMetadata } from '@utils/types/commAndStoreTypes';
import dompurify from 'dompurify';

import Style from './SingleChatMessage.module.scss';

interface ChatListExtends {
	value: string;
	msgId: string;
	imgList: string[];
	linkList: IMetadata[];
	messageOwner: 'other' | 'mine';
	sentTime: string | null | undefined;
	userName: string;
	isSamePreviousUserChat: boolean;
}

const SingleChatMessage = ({
	messageOwner,
	value,
	msgId,
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

	useEffect(() => {
		if (!imgList.length) return;
		const callback = (entries: any, observer: any) => {
			entries.forEach((entry: any) => {
				if (entry.isIntersecting) {
					const target = entry.target;

					target.src = target.dataset.src;
					observer.unobserve(target);
				}
			});
		};
		const options = {};
		const observer = new IntersectionObserver(callback, options);

		document.querySelectorAll(`[id^="img_${msgId}"]`).forEach((imgElement) => {
			observer.observe(imgElement);
		});
	}, [imgList, msgId]);

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

					{value && value !== '<p><br></p>' && (
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
											<span
												id={msgId}
												dangerouslySetInnerHTML={{
													__html: dompurify.sanitize(
														`${value.replaceAll('\t', ' '.repeat(3))}`,
													),
												}}
											></span>
											{/* <pre>{`${value.replaceAll('\t', ' '.repeat(3))}`}</pre> */}
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
											<span
												id={msgId}
												dangerouslySetInnerHTML={{
													__html: dompurify.sanitize(
														`${value.replaceAll('\t', ' '.repeat(3))}`,
													),
												}}
											></span>
											{/* <pre>{`${value.replaceAll('\t', ' '.repeat(3))}`}</pre> */}
										</Label>
									</>
								)}
							</div>
						</>
					)}
					{imgList && imgList.length > 0 && (
						<div className={cx('imageListDiv', messageOwner)}>
							{imgList.map((itemUrl: string, idx: number) => {
								return (
									<img
										style={{ height: '50px', width: '50px' }}
										key={`img_${msgId}_${idx}`}
										id={`img_${msgId}_${idx}`}
										// src={itemUrl}
										data-src={itemUrl}
										onClick={() => openImageModal(itemUrl)}
										alt=""
									/>
								);
							})}
							{/* bottomRef끝까지 가지 않아 일반 img태그 사용 */}
							{/* {imgList.map((itemUrl: string, idx: number) => (
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
							const $span = document.getElementById(msgId);
							let textToCopy = value;

							if ($span) {
								textToCopy = $span.innerText;
							}

							// idea from https://stackoverflow.com/questions/42920985/textcontent-without-spaces-from-formatting-text
							if ('clipboard' in navigator) {
								await navigator.clipboard.writeText(
									textToCopy.replace(/[\n]{2,}/g, '\n').trim(),
								);
							} else {
								return document.execCommand(
									'copy',
									true,
									textToCopy.replace(/[\n]{2,}/g, '\n').trim(),
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
							{linkList.map((item, idx: number) => {
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
