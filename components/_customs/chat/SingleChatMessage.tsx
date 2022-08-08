import { useState } from 'react';
import { Avatar, Button } from '@components/index';
import { techImage } from '@utils/constants/techs';
import { Label } from 'semantic-ui-react';
import classNames from 'classnames/bind';
import { useModal } from '@utils/hooks/customHooks';
import { modalUISize } from '@utils/constants/uiConstants';
import Image from 'next/image';
import { ChatList } from '@utils/types/commTypes';
import Style from './SingleChatMessage.module.scss';

interface ChatListExtends extends ChatList {
	messageOwner: 'other' | 'mine';
}

const SingleChatMessage = ({ messageOwner, value, imgList, linkList }: ChatListExtends) => {
	const [showCopyButton, setShowCopyButton] = useState(false);
	const [copyButtonClicked, setCopyButtonClicked] = useState(false);

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

					{linkList?.length > 0 && (
						<div className={cx('linkListDiv', messageOwner)}></div>
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
			</div>
		</>
	);
};

export default SingleChatMessage;
