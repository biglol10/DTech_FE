# Button

Button Component

## _Usage_

```jsx
import { Box } from '@components/index';

return (
	<Box id="sampleBoxId" spacing={32} boxType="basic" textAlign="left" className="" onClick={() => ()}>
		<div>This is the Content for Box</div>
		<Message>
			<Message.Header>Changes in Service</Message.Header>
			<p>
				We updated our privacy policy here to better service our customers. We recommend
				reviewing the changes.
			</p>
		</Message>
		<Image
			src="https://media.istockphoto.com/photos/porcelain-stoneware-tiles-in-store-picture-id1312700805"
			size="small"
			wrapped
		/>
	</Box>
);
```

## _Options_

| props     | type                          | defualt value | desc                      |
| --------- | ----------------------------- | ------------- | ------------------------- |
| id        | string                        | ''            | Box id                    |
| spacing   | number                        | 0             | spacing (marginTop) in px |
| boxType   | 'basic' / 'primary' / 'error' | 'basic'       | box type                  |
| textAlign | 'left' / 'center' / 'right'   | 'left'        | box내 text의 align        |
| className | string                        | ''            | classname                 |
| onClick   | func                          | null          | box 클릭 함수             |
