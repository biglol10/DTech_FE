/** ****************************************************************************************
 * @설명 : Card component stories
 ********************************************************************************************
 * 번호    작업자     작업일         브랜치                       변경내용
 *-------------------------------------------------------------------------------------------
 * 1      장보영     2022-08-16                              최초작성
 ********************************************************************************************/
import { ComponentMeta } from '@storybook/react';
import { BoardCard } from '@components/index';
import { ICard } from '@utils/types/componentTypes';

export default {
	title: 'Example/BoardCard',
	component: BoardCard,
	argTypes: {},
} as ComponentMeta<typeof BoardCard>;

export const CardSample = (args: ICard) => {
	return (
		<>
			<BoardCard {...args} />
		</>
	);
};

CardSample.args = {
	id: 'CardSample',
};
