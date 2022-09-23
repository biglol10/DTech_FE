import { useCallback, useEffect, useMemo, useState } from 'react';
import { InputLayout, InputWithIcon, InputDefault, Avatar, Button } from '@components/index';
import {
	Segment,
	Label as SemanticLabel,
	Header,
	Icon,
	Divider,
	Image as SemanticImage,
} from 'semantic-ui-react';
import { IUsersStatusArr } from '@utils/types/commAndStoreTypes';
import { generateAvatarImage } from '@utils/appRelated/helperFunctions';
import { useModal } from '@utils/hooks/customHooks';
import lodash from 'lodash';

import ChatSvg from '@styles/svg/chat.svg';

import Style from './CreateChatGroup.module.scss';

const CreateChatGroup = ({ usersStatusArr }: { usersStatusArr: IUsersStatusArr[] }) => {
	const usersStatusArrClone = useMemo(() => {
		const arr = lodash.cloneDeep(usersStatusArr);

		return arr;
	}, [usersStatusArr]);

	const [allUsersArr, setAllUsersArr] = useState<IUsersStatusArr[]>(usersStatusArrClone);
	const [userCollection, setUserCollection] = useState<IUsersStatusArr[]>([]);
	const [chatRoomName, setChatRoomName] = useState('');
	const [userSearchText, setUserSearchText] = useState('');
	const { handleModal } = useModal();

	const addUserCollection = (userObj: IUsersStatusArr) => {
		setAllUsersArr(allUsersArr.filter((user) => user.USER_UID !== userObj.USER_UID));
		setUserCollection((prev) => {
			prev.push(userObj);
			return prev;
		});
	};

	const deleteUserCollection = (e: any) => {
		const { useruidval } = e.target.dataset;

		const filterArr = userCollection.filter((user) => user.USER_UID !== useruidval);

		setUserCollection(filterArr);
	};

	useEffect(() => {
		setAllUsersArr((prev) => {
			if (userCollection.length === 0) {
				return usersStatusArrClone.filter((user) =>
					user.USER_NM.includes(userSearchText.length === 0 ? '' : userSearchText),
				);
			}
			const filterUserArr = usersStatusArrClone.filter(
				(item) =>
					!userCollection.some((individual) => individual.USER_UID === item.USER_UID) &&
					item.USER_NM.includes(userSearchText.length === 0 ? '' : userSearchText),
			);

			return filterUserArr;
		});
	}, [userCollection, userSearchText, usersStatusArrClone]);

	const createChatGroupFunc = useCallback(() => {
		handleModal({
			modalOpen: false,
		});
	}, [handleModal]);

	return (
		<Segment placeholder>
			<Header as="h2" className={Style['channelHeader']}>
				<ChatSvg style={{ height: '30px', width: '30px', marginRight: '10px' }} />
				<span>채널 생성</span>
				<Button
					content="생성"
					color="red"
					buttonType="none"
					size="small"
					onClick={createChatGroupFunc}
				/>
			</Header>

			<div style={{ width: '300px' }}>
				<InputLayout
					stretch={true}
					inputLabel="채널 이름"
					inputLabelSize="h5"
					showInputLabel={true}
					spacing={10}
				>
					<InputDefault
						id="chatRoomInput"
						placeholder="대화방 이름을 입력하세요"
						value={chatRoomName}
						size="small"
						onChange={(obj: { value: string }) => {
							setChatRoomName(obj.value);
						}}
					/>
				</InputLayout>
			</div>

			<div style={{ width: '300px' }}>
				<InputLayout
					stretch={true}
					inputLabel="멤버 찾기"
					inputLabelSize="h5"
					showInputLabel={true}
					spacing={30}
				>
					<InputWithIcon
						id="userSearchInput"
						placeholder="멤버 찾기"
						value={userSearchText}
						size="small"
						onChange={(obj: { value: string }) => {
							setUserSearchText(obj.value);
						}}
						inputIcon={<Icon name="delete" />}
					/>
				</InputLayout>
			</div>

			<Segment.Group raised>
				<ul className={Style['userArrUl']}>
					{allUsersArr &&
						!!allUsersArr.length &&
						allUsersArr.map((user, idx) => {
							return (
								<>
									<li
										key={`userLi_${idx}`}
										onClick={() => addUserCollection(user)}
									>
										<Avatar
											content={user.USER_NM}
											src={
												user.USER_IMG_URL ||
												generateAvatarImage(user.USER_UID)
											}
											imageSize={'mini'}
										/>
									</li>
									<Divider
										key={`divider_${idx}`}
										hidden={idx === usersStatusArrClone.length - 1}
										className={Style['divider']}
									/>
								</>
							);
						})}
				</ul>
			</Segment.Group>

			<Segment.Group className={Style['userCollectionSegment']}>
				{userCollection.map((user, idx) => {
					return (
						<SemanticLabel
							key={`semLabel_${idx}`}
							as="a"
							style={{ margin: '1px 2px' }}
							data-useruidval={user.USER_UID}
							onClick={(e: any) => {
								const newDeleteUserCollection = lodash.debounce(
									() => deleteUserCollection(e),
									100,
								);

								newDeleteUserCollection();
							}}
						>
							<SemanticImage
								src={user.USER_IMG_URL || generateAvatarImage(user.USER_UID)}
								avatar
							/>
							{user.USER_NM}
							<Icon name="delete" />
						</SemanticLabel>
					);
				})}
			</Segment.Group>
		</Segment>
	);
};

export default CreateChatGroup;
