# TextWithDotAnimation

TextWithDotAnimation Component

## _Usage_

```jsx
import { TextWithDotAnimation } from '@components/index';

return (
	<TextWithDotAnimation
		content={`익명의 사용자가 입력중입니다`}
		marginLeftValue={20}
		dotSize={8}
		hide={false}
	/>
);
```

## _Options_

| props           | type          | defualt value  | desc                                                                             |
| --------------- | ------------- | -------------- | -------------------------------------------------------------------------------- |
| content         | string        | ''             | Text 내용                                                                        |
| marginLeftValue | number        | 0              | text와 dot의 간격                                                                |
| dotSize         | number        | 10             | dot의 width, height사이즈                                                        |
| hide            | boolean       | false          | 내용+dot 표시 여부                                                               |
| color           | string        | 'black'        | dot color                                                                        |
| uiType          | typeof uiType | 'dot-flashing' | 'dot-flashing', 'dot-elastic', 'dot-pulse', 'dot-carousel', 'dot-typing' 중 하나 |
| className       | string        | ''             | className                                                                        |
