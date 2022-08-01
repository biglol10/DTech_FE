# AvatarGroup

AvatarGroup Component

## _Usage_

```jsx
import { AvatarGroup } from '@components/index';

const imageList = [
	'https://ca.slack-edge.com/T02SCQ38A22-U039FT91QTD-g0ca8cf5c8e6-24',
	'https://ca.slack-edge.com/T02SCQ38A22-U02U080JHC2-29078f07fef3-24',
	'https://ca.slack-edge.com/T02SCQ38A22-USLACKBOT-sv41d8cd98f0-24',
	'https://ca.slack-edge.com/T02SCQ38A22-U02U2GTV8J0-3c397712af98-24',
	'https://ca.slack-edge.com/T02SCQ38A22-U0310788JFR-c2ebf48cb030-24',
];

return (
	<AvatarGroup
		className="sampleClassName"
		spacing={20}
		imageList={imageList}
		divHeight={20}
		showCount={true}
	/>
);
```

## _Options_

| props     | type          | defualt value | desc                                      |
| --------- | ------------- | ------------- | ----------------------------------------- |
| className | string        | ''            | AvatarGroup className                     |
| spacing   | number        | 0             | spacing (marginTop) in px                 |
| imageList | Array<string> | []            | 그룹에 들어갈 이미지 리스트               |
| divHeight | number        | 20            | div의 height 그리고 img의 height, width값 |
| showCount | boolean       | true          | member count 표시                         |
