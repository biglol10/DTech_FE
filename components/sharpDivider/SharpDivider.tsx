import Style from './SharpDivider.module.scss';

const SharpDivider = ({ content = '' }: { content?: string }) => {
	return (
		<div className={Style['sharpDivider']}>
			<span></span>
			<span className={!content ? Style['hidden'] : ''}>{content}</span>
			<span></span>
		</div>
	);
};

export default SharpDivider;
