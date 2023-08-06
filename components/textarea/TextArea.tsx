/** ****************************************************************************************
 * @설명 : TextArea component
 ********************************************************************************************
 * 번호    작업자     작업일         브랜치                       변경내용
 *-------------------------------------------------------------------------------------------
 * 1      변지욱     2022-08-16   feature/JW/textarea         최초작성
 ********************************************************************************************/

import { forwardRef, SyntheticEvent, useCallback, useImperativeHandle, useRef, useState } from 'react';
import { Form, TextArea as SemanticTextArea } from 'semantic-ui-react';

interface ITextArea {
	id?: string;
	className?: string;
	placeholder?: string;
	value?: string;
	onChange?: Function;
	rows?: number;
	minHeight?: number;
	spacing?: number;
}

const TextArea = forwardRef<any, ITextArea>(
	({ id = '', className = '', placeholder = '', value = '', onChange = null, rows = 3, minHeight = null, spacing = 0 }, ref) => {
		const [textAreaValue, setTextAreaValue] = useState<string | number | undefined>(value);
		const textAreaRef = useRef<any>();

		const onChangeFn = useCallback(
			(onChangeValue: string | number | undefined) => {
				setTextAreaValue(onChangeValue);
				onChange && onChange({ value: onChangeValue });
			},
			[onChange],
		);

		useImperativeHandle(ref, () => ({
			textArea: {
				element: textAreaRef.current,
				clear: () => {
					setTextAreaValue('');
				},
			},
		}));

		return (
			<Form style={{ marginTop: `${spacing}px` }}>
				<SemanticTextArea
					id={id}
					className={className}
					ref={textAreaRef}
					placeholder={placeholder}
					onChange={(e: SyntheticEvent, data) => onChangeFn(data.value)}
					rows={rows}
					style={minHeight && { minHeight }}
					value={textAreaValue}
				/>
			</Form>
		);
	},
);

TextArea.displayName = 'TextArea';

export default TextArea;
