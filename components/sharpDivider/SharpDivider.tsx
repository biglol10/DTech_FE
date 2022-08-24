import Style from './SharpDivider.module.scss';

const SharpDivider = ({
	content = '',
	className = '',
}: {
	content?: string;
	className?: string;
}) => {
	return (
		<div className={`${Style['sharpDivider']} ${className}`}>
			<span></span>
			<span className={!content ? Style['hidden'] : ''}>{content}</span>
			<span></span>
		</div>
	);
};

export default SharpDivider;
