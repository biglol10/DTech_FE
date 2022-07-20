import { useEffect, useState } from 'react';

import axios from 'axios';
import DLogo from '@public/images/DLogo2.png';
import { Image, Button } from 'semantic-ui-react';
import classNames from 'classnames/bind';
import Style from './RegisterComp.module.scss';

const RegisterStep4 = (props: any) => {
	const [image, setImage] = useState({
		imageFile: null,
		previewURL: '',
	});
	let inputRef: any;

	useEffect(() => {}, [image]);
	const cx = classNames.bind(Style);

	const saveImage = (e: any) => {
		e.preventDefault();
		if (e.target.files[0]) {
			URL.revokeObjectURL(image.previewURL);
			const previewURL = URL.createObjectURL(e.target.files[0]);

			setImage((prev) => ({
				...prev,
				imageFile: e.target.files[0],
				previewURL,
			}));
		}
	};

	const deleteImage = () => {
		// console.log(image);
		URL.revokeObjectURL(image.previewURL);
		setImage({ imageFile: null, previewURL: '' });
	};

	const sendImageToServer = async () => {
		if (image.imageFile) {
			const formData = new FormData();

			formData.append('img', image.imageFile);
			await axios
				.post('http://localhost:3066/api/auth/uploadTest', formData)
				.then((res: any) => {
					console.log('결과');
					console.log(res);
				})
				.catch((err) => {
					console.log('실패');
					console.log(err);
				});
			setImage({
				imageFile: null,
				previewURL: '',
			});
		} else {
			alert('사진을 등록하세요!');
		}
	};

	return (
		<>
			<div className={Style['uploader-wrapper']}>
				<input
					type="file"
					accept="image/*"
					ref={(refParam) => (inputRef = refParam)}
					// onClick={(e) => (e.target.value = null)}
					onChange={saveImage}
					style={{ display: 'none' }}
				/>
				<div className={Style['img-wrapper']}>
					<img src={image.previewURL} />
				</div>
			</div>
			<div className={Style['upload-button']}>
				<Button variant="contained" onClick={() => inputRef.click()}>
					사진 올리기
				</Button>
				<Button variant="contained" onClick={deleteImage}>
					Delete
				</Button>
				<Button variant="contained" onClick={sendImageToServer}>
					Upload
				</Button>
			</div>
		</>
	);
};

export default RegisterStep4;
