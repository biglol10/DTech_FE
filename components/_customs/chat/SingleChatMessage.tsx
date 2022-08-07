import { useState } from 'react';
import { Avatar, Button } from '@components/index';
import { techImage } from '@utils/constants/techs';
import { Divider, Label } from 'semantic-ui-react';
import Image from 'next/image';
import Style from './SingleChatMessage.module.scss';

const SingleChatMessage = ({
	messageOwner,
	context,
}: {
	messageOwner: string;
	context: string;
}) => {
	const [showCopyButton, setShowCopyButton] = useState(false);
	const [copyButtonClicked, setCopyButtonClicked] = useState(false);

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
				<div
					style={{
						alignSelf: `${messageOwner === 'other' ? 'self-start' : 'self-end'}`,
						display: 'flex',
						flexDirection: 'column',
					}}
					className={Style['singleChatDiv']}
				>
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
					<Label
						basic
						pointing={`${messageOwner === 'other' ? 'left' : 'right'}`}
						style={{
							maxWidth: '100%',
							borderColor: `${
								messageOwner === 'other' ? 'darkorange' : 'darkmagenta'
							}`,
							color: 'black !important',
							alignSelf: `${messageOwner === 'other' ? 'self-start' : 'self-end'}`,
						}}
					>
						<pre className={Style['preClass']}>{`${context.replaceAll(
							'\t',
							' '.repeat(3),
						)}`}</pre>
					</Label>
					<div
						style={{
							marginTop: '10px',
							display: 'flex',
							gap: '8px',
							alignSelf: `${messageOwner === 'other' ? 'self-start' : 'self-end'}`,
						}}
					>
						<Image src={techImage['React']} height={50} width={50} />
						<Image src={techImage['React']} height={50} width={50} />
						<Image src={techImage['React']} height={50} width={50} />
						<Image src={techImage['React']} height={50} width={50} />
						<Image src={techImage['React']} height={50} width={50} />
						<Image src={techImage['React']} height={50} width={50} />
					</div>
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
									await navigator.clipboard.writeText(context);
								} else {
									return document.execCommand('copy', true, context);
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
