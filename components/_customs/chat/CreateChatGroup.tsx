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
import { IAuth, IUsersStatusArr } from '@utils/types/commAndStoreTypes';
import { generateAvatarImage } from '@utils/appRelated/helperFunctions';
import { useModal } from '@utils/hooks/customHooks';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import axios from 'axios';
import lodash from 'lodash';

import ChatSvg from '@styles/svg/chat.svg';

import Style from './CreateChatGroup.module.scss';

const CreateChatGroup = ({
	usersStatusArr,
	authStore,
}: {
	usersStatusArr: IUsersStatusArr[];
	authStore: IAuth;
}) => {
	const usersStatusArrClone = useMemo(() => {
		const arr = lodash.cloneDeep(
			usersStatusArr.filter((user) => user.USER_UID !== authStore.userUID),
		);

		return arr;
	}, [authStore.userUID, usersStatusArr]);

	// eslint-disable-next-line no-useless-escape
	const regExp = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g;

	const [allUsersArr, setAllUsersArr] = useState<IUsersStatusArr[]>(usersStatusArrClone);
	const [userCollection, setUserCollection] = useState<IUsersStatusArr[]>([]);
	const [chatRoomName, setChatRoomName] = useState('');
	const [userSearchText, setUserSearchText] = useState('');
	const [chatRoomError, setChatRoomError] = useState(false);
	const [userSearchError, setUserSearchError] = useState(false);
	const { handleModal } = useModal();
	const router = useRouter();

	const addUserCollection = (userObj: IUsersStatusArr) => {
		setUserSearchError(false);
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

	const createChatGroupFunc = useCallback(async () => {
		if (regExp.test(chatRoomName) || chatRoomName.length <= 2) {
			setChatRoomError(true);
			return;
		}

		if (userCollection.length === 0) {
			setUserSearchError(true);
			return;
		}

		userCollection.push({
			USER_UID: authStore.userUID,
			USER_ID: authStore.userId,
			USER_NM: authStore.userName,
			USER_TITLE: authStore.userTitle,
			USER_DETAIL: '',
			USER_IMG_URL: authStore.userProfileImg,
			USER_ADMIN_YN: '',
			ONLINE_STATUS: 'ONLINE',
		});

		const chatGroupFunc = await axios
			.post(
				`${process.env.NEXT_PUBLIC_BE_BASE_URL}/api/chat/createChatGroup`,
				{
					chatGroupName: chatRoomName,
					userParticipants: userCollection.map((item) => ({
						USER_UID: item.USER_UID,
						USER_ID: item.USER_ID,
					})),
					senderUID: authStore.userUID,
				},
				{ headers: { Authorization: `Bearer ${authStore.userToken}` } },
			)
			.then((response) => {
				return response.data;
			})
			.catch(() => {
				return {
					result: 'error',
				};
			});

		handleModal({
			modalOpen: false,
		});

		if (chatGroupFunc.result !== 'success') {
			toast['error'](<>{'채팅 그룹을 만들지 못했습니다'}</>);
			return;
		}

		router.push(`/chat/room/${chatGroupFunc.chatGroupUID}`);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [chatRoomName, handleModal, userCollection, authStore, regExp]);

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
					errorMsg={'채팅방 이름을 제대로 설정해주세요 (특수문자X, 최소3자이상)'}
					error={chatRoomError}
				>
					<InputDefault
						id="chatRoomInput"
						placeholder="대화방 이름을 입력하세요"
						value={chatRoomName}
						size="small"
						onChange={(obj: { value: string }) => {
							setChatRoomError(false);
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
					errorMsg={'최소 1명 이상 초대해야 합니다'}
					error={userSearchError}
				>
					<InputWithIcon
						id="userSearchInput"
						placeholder="멤버 찾기"
						value={userSearchText}
						size="small"
						onChange={(obj: { value: string }) => {
							setUserSearchError(false);
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
