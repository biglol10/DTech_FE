/** ****************************************************************************************
 * @설명 : 회원가입 Step4 컴포넌트
 ********************************************************************************************
 * 번호    작업자     작업일         브랜치                       변경내용
 *-------------------------------------------------------------------------------------------
 * 1      장보영      2022-07-20     feature/BY/register        최초작성
 ********************************************************************************************/

import { useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';

import { Label, Button } from '@components/index';
import Style from './RegisterComp.module.scss';

const RegisterStep4 = (props: any) => {
	const dispatch = useDispatch();
	const [registerData, setRegisterData] = useState(props.registerData);
	const [image, setImage] = useState(
		props.registerData.image !== undefined
			? props.registerData.image
			: {
					imageFile: null,
					previewURL: '',
			  },
	);

	let inputRef: any;

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
		setImage({ imageFile: null, previewURL: '' });
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
			<Label content="프로필 사진" size="big" />
			<div className={Style['uploader-wrapper']}>
				<input
					type="file"
					accept="image/*"
					ref={(refParam) => (inputRef = refParam)}
					onChange={saveImage}
					style={{ display: 'none' }}
				/>
				<div className={Style['img-wrapper']}>
					{image !== undefined ? <img src={image.previewURL} /> : <img />}
				</div>
			</div>
			<div className={Style['upload-button']}>
				<Button
					className={Style['registerButton']}
					content="업로드"
					size="large"
					color="grey"
					buttonType="none"
					onClick={() => inputRef.click()}
				/>
				<Button
					className={Style['registerButton']}
					content="삭제"
					size="large"
					color="grey"
					buttonType="none"
					onClick={deleteImage}
				/>
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
		</>
	);
};

export default RegisterStep4;
