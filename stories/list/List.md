# Button

Button Component

## _Usage_

```jsx
import { List } from '@components/index';

const items = [
	{
		content: 'This is list 1',
	},
	{
		content: (
			<Label as="a" color="yellow" image>
				<img src="https://react.semantic-ui.com/images/avatar/small/christian.jpg" />
				Christian
				<Label.Detail>Co-worker</Label.Detail>
			</Label>
		),
	},
	{
		content: <div style={{ color: 'blue' }}>al;fdjeqruopqwru</div>,
	},
];

return <List id="sampleList1" listType="buletted" verticalAlign="middle" items={items} />;
```

## _Options_

| props         | type                      | defualt value | desc                        |
| ------------- | ------------------------- | ------------- | --------------------------- |
| id            | string                    | ''            | 고유 ID                     |
| listType      | buletted / ordered / none | 'none'        | list형태 (점, 순서, 미적용) |
| verticalAlign | top / middle / bottom     | middle        | 수직정렬                    |
| items         | array                     | []            | list items array            |
