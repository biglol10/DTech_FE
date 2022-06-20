import { JSXElementConstructor as JSX } from 'react';
import { List as SemanticList } from 'semantic-ui-react';

interface IListItem {
	content: string | JSX.Element;
}

interface IList {
	id: string;
	listType: 'buletted' | 'ordered' | 'none';
	verticalAlign?: 'bottom' | 'middle' | 'top';
	items: IListItem[];
}

const List = ({ id = '', items, listType = 'none', verticalAlign = 'middle' }: IList) => {
	return (
		<SemanticList
			id={id}
			bulleted={listType === 'buletted'}
			ordered={listType === 'ordered'}
			verticalAlign={verticalAlign}
		>
			{items.map((item: any, idx: number) => {
				return (
					<SemanticList.Item key={`${id}_listItem_${idx}`}>
						{item.content}
					</SemanticList.Item>
				);
			})}
		</SemanticList>
	);
};

export default List;
