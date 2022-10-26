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
	argTypes: {
		title: {
			defaultValue: '제목',
			description: '게시글 제목',
		},
		content: {
			defaultValue: '게시물 내용....<br/>안녕하세요.',
			description: '게시글 내용',
		},
		likeCnt: {
			defaultValue: 23,
			description: '게시글 추천수',
		},
		techNm: {
			defaultValue: 'Javascript',
			description: '게시글 기술 분류',
			options: ['Javascript', 'React', 'Vue', 'Android', 'iOS', 'nodejs'],
			control: { type: 'select' },
		},
		liked: {
			defaultValue: true,
			description: '로그인 회원의 게시물 "좋아요" 클릭 유무',
			options: [true, false],
			control: { type: 'radio' },
		},
		userName: {
			defaultValue: '홍길동',
			description: '게시글 작성자명',
		},
		userTitle: {
			defaultValue: '책임',
			description: '게시글 작성자 직책',
		},
	},
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
