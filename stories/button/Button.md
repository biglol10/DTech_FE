# Button

Button Component

## _Usage_

```jsx
import { Button } from '@components/index';

return (
	<Button
		buttonType="none"
		content="Click me"
		basic={true}
		size="small"
		loading={flase}
		onClick={() => console.log('clicked')}
	/>
);
```

## _Options_

| props      | type                       | defualt value | desc                                                           |
| ---------- | -------------------------- | ------------- | -------------------------------------------------------------- |
| buttonType | primary / secondary / none | primary       | primary / secondary / none 타입 버튼                           |
| content    | string                     | ''            | 버튼 내용                                                      |
| basic      | boolean                    | false         | basic 타입 여뷰 (안의 배경색 fill타입, false일 때 배경색 fill) |
| size       | string                     | 'mini'        | 버튼 size                                                      |
| loading    | boolean                    | false         | loading 여부                                                   |
| onClick    | func                       | null          | 버튼 클릭 함수                                                 |
