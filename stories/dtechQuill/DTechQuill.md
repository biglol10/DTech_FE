# DTechQuill

DTechQuill Component (react-quill editor)

## _Usage_

```jsx

react-quill does not support ssr so you need to dynamically import the component

import { DTechQuill } from '@components/index';

const ReactQuill = dynamic(
	async () => {
		const { default: RQ } = await import('react-quill');

		return function comp({ forwardedRef, ...props }: any) {
			return <RQ ref={forwardedRef} {...props} />;
		};
	},
	{ ssr: false },
);

return (
	<DTechQuill
        quillMinHeight={80}
        quillMaxHeight={250}
        returnQuillWrapperHeight={(heightValue: number) => {
            console.log(heightValue);
        }}
        handleSubmit={(content: ChatList) => {
            setChatList((prev: ChatList[]) => [
                ...prev,
                {
                    value: content.value,
                    imgList: content.imgList,
                    linkList: content.linkList.map((item: any) => item.insert),
                },
            ]);
        }}
        QuillSSR={ReactQuill}
    />
);
```

## _Options_

| props                    | type              | defualt value | desc                                                    |
| ------------------------ | ----------------- | ------------- | ------------------------------------------------------- | --------------------------------------- |
| quillMinHeight           | number            | 80            | quill editor 최소 높이                                  |
| quillMaxHeight           | number            |               | quill editor 최대 높이                                  |
| returnQuillWrapperHeight | number            |               | quill 내용이 변경되었을 때 받아오는 quill editor height |
| handleSubmit             | func              | null          | 적용될 icon                                             | quill editor에 엔터 쳤을 때 발생 이벤트 |
| QuillSSR                 | quill-editor type |               | dynamic quill editor                                    |
