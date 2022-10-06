/** ****************************************************************************************
 * @설명 : 회원가입 Step4 컴포넌트
 ********************************************************************************************
 * 번호    작업자     작업일         브랜치                       변경내용
 *-------------------------------------------------------------------------------------------
 * 1      장보영      2022-07-20     feature/BY/register        최초작성
 ********************************************************************************************/

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { Header } from 'semantic-ui-react';

import { inputElCommStyle } from '@utils/styleRelated/stylehelper';
import profileImg from '@public/images/profile.png';
import { Label, Button } from '@components/index';
import Style from './RegisterComp.module.scss';

const RegisterStep5 = (props: any) => {
	const dispatch = useDispatch();
	const [registerData, setRegisterData] = useState(useSelector((state: any) => state.register));
	const [image, setImage] = useState(
		useSelector((state: any) => state.register.userProfileImage),
	);

	const imgRef = useRef<any>();

	useEffect(() => {}, [image]);

	const saveImage = (e: any) => {
		e.preventDefault();
		if (e.target.files[0]) {
			URL.revokeObjectURL(image.previewURL);
			const previewURL = URL.createObjectURL(e.target.files[0]);

			setImage((prev: any) => ({
				...prev,
				imageFile: e.target.files[0],
				previewURL,
			}));
		}
	};

	const deleteImage = () => {
		URL.revokeObjectURL(image.previewURL);
		setImage({ ...image, imageFile: null, previewURL: '' });
	};

	const clickNext = (goNext: boolean) => {
		if (goNext) {
			registerUser();
		} else {
			props.propFunction({ image, goNext });
		}
	};

	const registerUser = () => {
		dispatch({
			type: 'REGISTER_USER',
			registerData: { ...registerData, image },
			propFunction: props.propFunction,
		});
	};

	return (
		<>
			<div className={Style['stepDiv']}>
				<div className={Style['inputLabelHeader']}>
					<Header as="h3">프로필 사진</Header>
				</div>

				<div className={Style['uploader-wrapper']}>
					<input
						type="file"
						accept="image/*"
						ref={imgRef}
						onChange={saveImage}
						style={{ display: 'none' }}
					/>
					<div className={Style['img-wrapper']}>
						{image.imageFile !== null ? (
							// <img src={image.previewURL} />
							<Image src={image.previewURL} width={300} height={300} />
						) : (
							<Image src={profileImg} width={300} height={300} />
						)}
					</div>
					<div className={Style['upload-button-div']}>
						<Button
							className={Style['uploadBtn']}
							content="업로드"
							size="large"
							color="blue"
							buttonType="none"
							basic={true}
							onClick={() => imgRef.current.click()}
						/>
						<Button
							className={Style['uploadBtn']}
							content="삭제"
							size="large"
							color="blue"
							buttonType="none"
							basic={true}
							onClick={deleteImage}
						/>
					</div>
				</div>

				<div className={Style['buttonBelow']}>
					<Button
						className={Style['registerButton']}
						content="이전"
						size="large"
						color="google plus"
						buttonType="none"
						onClick={() => {
							clickNext(false);
						}}
					/>
					<Button
						className={Style['registerButton']}
						content="회원가입"
						size="large"
						color="google plus"
						buttonType="none"
						onClick={() => {
							clickNext(true);
						}}
					/>
				</div>
			</div>
		</>
	);
};

export default RegisterStep5;
