import { useState } from 'react';
import { useModal } from '@utils/hooks/customHooks';
import { modalUISize } from '@utils/constants/uiConstants';

const PrevieImageComp = ({
	fileName,
	filePreview,
	changeUrlPreviewList,
}: {
	fileName: string;
	filePreview: string;
	changeUrlPreviewList: Function;
}) => {
	const [imageHover, setImageHover] = useState(false);
	const { handleModal } = useModal();

	const openModal = () => {
		handleModal({
			modalOpen: true,
			modalContent: (
				<img
					src={filePreview}
					style={{
						maxHeight: '100%',
						maxWidth: '100%',
						display: 'block',
						margin: 'auto',
					}}
				/>
			),
			modalSize: modalUISize.LARGE,
			modalIsBasic: true,
		});
	};

	return (
		<div onMouseEnter={() => setImageHover(true)} onMouseLeave={() => setImageHover(false)}>
			<div onClick={() => openModal()}>
				<img src={filePreview} alt={fileName} />
			</div>

			{imageHover && (
				<button onClick={() => changeUrlPreviewList(fileName)}>
					<svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="16" height="16">
						<circle cx="8" cy="8" r="8" fill="#fe4663" />
					</svg>
				</button>
			)}
		</div>
	);
};

export default PrevieImageComp;
