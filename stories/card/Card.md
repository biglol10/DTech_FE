# BoardCard

BoardCard Component

## _Usage_

```jsx
// react-quill does not support ssr so you need to dynamically import the component
// import it in the page at first and then send that component through props

import { BoardCard } from '@components/index';

return (
	<BoardCard
		key={card.BOARD_CD}
		id={card.BOARD_CD}
		title={card.BOARD_TITLE}
		content={card.BOARD_CONTENT}
		likeCnt={card.LIKE_CNT}
		commentCnt={card.CMNT_CNT}
		images={card.IMG_LIST}
		liked={card.LIKED === 1}
		date={new Date(card.BOARD_DATE)}
		techNm={card.TECH_NM}
		boardUid={card.USER_UID}
		cb={deleteCb}
	/>
);
```

## _Options_

| props                    | type              | defualt value | desc                                                    |
| ------------------------ | ----------------- | ------------- | ------------------------------------------------------- |
| ref                      | useRef            | null          | Quill ref                                               |
| quillMinHeight           | number            | 80            | quill editor 최소 높이                                  |
| quillMaxHeight           | number            |               | quill editor 최대 높이                                  |
| returnQuillWrapperHeight | number            |               | quill 내용이 변경되었을 때 받아오는 quill editor height |
| handleSubmit             | func              | null          | quill editor에 엔터 쳤을 때 발생 이벤트                 |
| QuillSSR                 | quill-editor type |               | dynamic quill editor                                    |
| enterSubmit              | boolean           | true          | 엔터 시 submit실행 여부                                 |
