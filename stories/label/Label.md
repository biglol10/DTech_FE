# Label

Label Component

## _Usage_

```jsx
import { Label } from '@components/index';

return (
	<Label
		basic
		content="LabelContent"
		iconOrImage="icon"
		icon={<Icon name="mail" />}
		color="green"
		borderNone
	/>
);
```

## _Options_

| props       | type                | defualt value                                        | desc                                           |
| ----------- | ------------------- | ---------------------------------------------------- | ---------------------------------------------- |
| basic       | boolean             | true                                                 | false일 경우 배경 fill                         |
| content     | string              | ''                                                   | label 내용                                     |
| iconOrImage | icon / image / none | none                                                 | label에 적용될 content                         |
| icon        | ReactNoe            | <Icon name="arrow alternate circle right outline" /> | 적용될 icon                                    |
| imageSrc    | string              | ''                                                   | 적용될 image                                   |
| color       | string              | 'black'                                              | label color                                    |
| borderNone  | boolean             | true                                                 | border 미표시 여부 (basic=true 일 경우에 쓰임) |
