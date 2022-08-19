# TextArea

TextArea Component

## _Usage_

```jsx
import { TextArea } from '@components/index';

const ref = useRef<any>();

return (
	<TextArea
		minHeight={300}
		placeholder="내용을 입력하세요"
		onChange={(obj: { value: string }) => console.log(obj.value)}
		spacing={0}
		ref={ref}
		value={''}
		rows={3}
	/>
);
```

## _Options_

| props       | type     | defualt value | desc                                       |
| ----------- | -------- | ------------- | ------------------------------------------ |
| ref         | Ref      | null          | 부모로부터 받은 ref                        |
| value       | string   | ''            | textArea 초기값                            |
| placeholder | string   | ''            | textArea placeholder                       |
| onChange    | function | null          | textArea 값 변경에 따른 처리함수           |
| spacing     | number   | 0             | textArea margin-top 값                     |
| minHeight   | number   | null          | textArea minHeight                         |
| rows        | number   | 3             | textArea rows 개수 (minHeight없을 때 작동) |
