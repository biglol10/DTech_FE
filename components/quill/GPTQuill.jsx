import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const CustomQuill = (props) => {
	const [value, setValue] = useState('');
	const [imagePreview, setImagePreview] = useState(null);

	useEffect(() => {
		const handlePaste = (event) => {
			const { items } = event.clipboardData;

			for (let i = 0; i < items.length; i++) {
				if (items[i].type.startsWith('image')) {
					event.preventDefault();
					const imgFile = items[i].getAsFile();
					const imgURL = URL.createObjectURL(imgFile);

					setImagePreview(imgURL);
					break;
				}
			}
		};

		const quillElement = document.getElementsByClassName('ql-container')[0];

		quillElement && quillElement.addEventListener('paste', handlePaste);

		return () => {
			quillElement && quillElement.removeEventListener('paste', handlePaste);
		};
	}, []);

	const handleChange = (content) => {
		setValue(content);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		// eslint-disable-next-line react/prop-types
		props.onSubmit(value);
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<ReactQuill value={value} onChange={handleChange} />
				<button type="submit">Submit</button>
			</form>
			{imagePreview && (
				<div>
					<h3>Image Preview</h3>
					<img src={imagePreview} alt="Pasted" />
				</div>
			)}
		</div>
	);
};

export default CustomQuill;
