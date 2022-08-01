import 'semantic-ui-css/semantic.min.css';
import 'react-quill/dist/quill.snow.css';

import { Provider } from 'react-redux';
import { makeStore } from '@store/rootReducer';
import { ModalPopup } from '@components/index';

export const parameters = {
	actions: { argTypesRegex: '^on[A-Z].*' },
	controls: {
		matchers: {
			color: /(background|color)$/i,
			date: /Date$/,
		},
		expanded: true,
	},
};

// 20220801... Redux + modal 적용
export const decorators = [
	(Story) => (
		<Provider store={makeStore()}>
			<Story />
			<ModalPopup />
		</Provider>
	),
];
