/** ****************************************************************************************
 * @설명 : List component
 ********************************************************************************************
 * 번호    작업자     작업일         브랜치                       변경내용
 *-------------------------------------------------------------------------------------------
 * 1      변지욱     2022-06-20                              최초작성
 ********************************************************************************************/

import React, { JSXElementConstructor as JSX } from 'react';
import { List as SemanticList } from 'semantic-ui-react';
import Style from './List.module.scss';

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
			{items.map((item: { content: React.ReactElement | string }, idx: number) => {
				return (
					<SemanticList.Item key={`${id}_listItem_${idx}`} className={Style['listItem']}>
						{item.content}
					</SemanticList.Item>
				);
			})}
		</SemanticList>
	);
};

export default List;
