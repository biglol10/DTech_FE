import { useState } from 'react';
import { useModal } from '@utils/hooks/customHooks';
import { modalUISize } from '@utils/constants/uiConstants';
import CloseSvg from '@styles/svg/imgClose.svg';

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
					<CloseSvg />
				</button>
			)}
		</div>
	);
};

export default PrevieImageComp;
