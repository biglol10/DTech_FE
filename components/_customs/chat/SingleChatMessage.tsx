import { useEffect, useState } from 'react';
import { Avatar, Button } from '@components/index';
import { techImage } from '@utils/constants/techs';
import { Label, ListList } from 'semantic-ui-react';
import classNames from 'classnames/bind';
import { useModal } from '@utils/hooks/customHooks';
import { modalUISize } from '@utils/constants/uiConstants';
import Image from 'next/image';
import { ChatList } from '@utils/types/commTypes';
import axios from 'axios';
import Style from './SingleChatMessage.module.scss';

interface ChatListExtends extends ChatList {
	messageOwner: 'other' | 'mine';
}

const SingleChatMessage = ({ messageOwner, value, imgList, linkList }: ChatListExtends) => {
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
					console.log('data fetch error');
					console.log(err);
				});
		};

		if (linkList.length > 0) result();
	}, [linkList]);

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
					{/* <Divider hidden style={{ marginBottom: '7px' }} /> */}
					{value && (
						<Label
							basic
							pointing={`${messageOwner === 'other' ? 'left' : 'right'}`}
							className={cx('messageLabel', messageOwner)}
						>
							<pre>{value}</pre>
							{/* <pre>{`${value.replaceAll('\t', ' '.repeat(3))}`}</pre> */}
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

					{/* {linkList?.length > 0 && (
						<div className={cx('linkListDiv', messageOwner)}></div>
					)} */}
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
									await navigator.clipboard.writeText(value);
								} else {
									return document.execCommand('copy', true, value);
								}
								setTimeout(() => {
									setCopyButtonClicked(false);
								}, 3000);
							}}
						/>
					</div>
				)}

				<div className={Style['linkListDiv']}>
					{linkMetadata.length > 0 &&
						linkMetadata.map((item: { [name: string]: string }) => {
							return (
								// eslint-disable-next-line react/jsx-key
								<a href={item.url} target="_blank" rel="noopener noreferrer">
									<div>
										<h4>{item.url}</h4>
										{item.status === 'success' && <p>{item.metadata_title}</p>}
										{item.status === 'success' && (
											<div>{item.metadata_description}</div>
										)}
										{item.status === 'success' && (
											<img
												src={item.metadata_image}
												alt=""
												style={{
													height: '150px',
													width: '150px',
													borderRadius: '5px',
												}}
											/>
										)}
									</div>
								</a>
							);
						})}
				</div>
			</div>
		</>
	);
};

export default SingleChatMessage;
