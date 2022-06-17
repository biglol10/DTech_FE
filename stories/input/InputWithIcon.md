# InputDefault

InputWithIcon Component

## _Usage_

```jsx
import { InputWithIcon } from '@components/index';
import { useRef, useState } from 'react';

const inputRef = useRef();
const [error, setError] = useState(false);

const onSearchIconClick = () => {
	console.log('search icon clicked');
};

return (
	<InputWithIcon
		ref={inputRef}
		value={''}
		size="small"
		onChange={(result) => console.log(result)}
		error={error}
		regex={/^\d+$/}
		errorMsg={'잘못 입력하셨습니다'}
		placeholder="값을 입력해주세요"
		inputLabel=""
		inputLabelSize="h2"
		showInputLabel={false}
		type="default"
		readOnly={false}
		disabled={false}
		maxLength={20}
		errorLabelPosition="bottom"
		inputIcon={<Icon name="at" />}
	/>
);
```

## _Options_

| props              | type      | defualt value            | desc                                                       |
| ------------------ | --------- | ------------------------ | ---------------------------------------------------------- |
| ref                | Ref       | null                     | 부모로부터 받은 ref                                        |
| value              | string    | ''                       | input 값                                                   |
| size               | string    | 'small'                  | input tag size 설정                                        |
| onChange           | function  | null                     | input 값 변경에 따른 처리함수                              |
| error              | boolean   | false                    | input 값에 따른 에러상태                                   |
| regex              | RegExp    | undefined                | input 값 검증 정규식                                       |
| errorMsg           | string    | '유효하지 않는 값입니다' | 에러상태일 경우 표시 onChange로 반환할 에러 메시지         |
| placeholder        | string    | ''                       | input placeholder                                          |
| inputLabel         | string    | ''                       | input label 지정                                           |
| inputLabelSize     | string    | 'h2'                     | input label 크기 (h1 제외 h2 ~ h6)                         |
| showInputLabel     | boolean   | false                    | input label 표시/미표시                                    |
| type               | string    | 'default'                | default 일 경우 기본 input, password일 경우 비밀번호 input |
| readOnly           | boolean   | false                    | readOnly 지정                                              |
| disabled           | boolean   | false                    | disabled 지정                                              |
| maxLength          | number    | undefined                | input 최대 길이 지정                                       |
| errorLabelPosition | string    | 'bottom'                 | 에러문구 위치 지정 bottom 또는 right                       |
| inputIcon          | ReactNode | <Icon name='at'/>        | input왼쪽에 표시할 아이콘                                  |
