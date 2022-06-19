# CheckboxDefault

Default Checkbox Component

## _Usage_

```jsx
import { CheckboxDefault } from '@components/index';
import { useRef, useState } from 'react';

const inputRef = useRef();
const [error, setError] = useState(false);

return (
	<CheckboxDefault
		id={id}
		checked=false
		onChange={onChangeFn}
		size="medium"
		disabled=false
	/>
);
```
