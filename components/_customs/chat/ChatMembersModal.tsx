import React, { forwardRef } from 'react';
import { IUsersStatusArr } from '@utils/types/commAndStoreTypes';
import { Segment, Header, Icon, Divider } from 'semantic-ui-react';
import { Avatar } from '@components/index';
import { generateAvatarImage } from '@utils/appRelated/helperFunctions';

import Style from './ChatMembersModal.module.scss';

const ChatMembersModal = forwardRef<
	any,
	{ id: string; currentChatRoomName: string; chatGroupMembers: IUsersStatusArr[] }
>(({ id, currentChatRoomName, chatGroupMembers }, ref) => {
	return (
		<div ref={ref} id={id}>
			<Segment placeholder>
				<Header as="h3">
					<Icon name="rocketchat" />
					<Header.Content>{currentChatRoomName}의 멤버목록</Header.Content>
				</Header>

				<Segment.Group raised>
					<ul className={Style['userArrUl']}>
						{chatGroupMembers &&
							!!chatGroupMembers.length &&
							chatGroupMembers.map((user, idx) => {
								return (
									<React.Fragment key={`userLi_${idx}`}>
										<li>
											<Avatar
												content={`${user.USER_NM} (${user.USER_TITLE})`}
												src={
													user.USER_IMG_URL ||
													generateAvatarImage(user.USER_UID)
												}
												imageSize={'mini'}
											/>
										</li>
										<Divider
											key={`divider_${idx}`}
											hidden={idx === chatGroupMembers.length - 1}
											className={Style['divider']}
										/>
									</React.Fragment>
								);
							})}
					</ul>
				</Segment.Group>
			</Segment>
		</div>
	);
});

ChatMembersModal.displayName = 'ChatMembersModal';

export default ChatMembersModal;
