import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { useModal } from '@utils/hooks/customHooks';
import { modalUISize } from '@utils/constants/uiConstants';

interface IDataReturn {
	success: boolean;
	data: string;
	resultData: string;
}

interface IServerProps {
	[name: string]: IDataReturn;
}

interface ICallback {
	result: IDataReturn;
	randomNumber: number;
}

const ApiTestPage: React.FC<IServerProps> = (props) => {
	const [fetchedData] = useState<IServerProps>(props);
	const [callbackState, setCallbackState] = useState<ICallback>();
	const testApiStore = useSelector((state: IServerProps) => state.testApi);

	const dispatch = useDispatch();
	const { handleModal } = useModal();

	const callbackFunctionAlert = (data: ICallback) => {
		data.result.resultData += 'safdasdf hihihihihihihihi';
		setCallbackState(data);
	};

	const getTestApi = () => {
		dispatch({ type: 'TESTAPIFETCH', callbackFn: callbackFunctionAlert });
	};

	const openModal = () => {
		handleModal({
			modalOpen: true,
			modalContent: (
				<div>
					slkfjadlf
					<br />
					aslkdfjwlerepqwijr
				</div>
			),
			modalSize: modalUISize.LARGE,
			modalTitle: 'This is modal Title',
		});
	};

	return (
		<div>
			the response data is {fetchedData.axiosData.resultData}
			<br />
			<br />
			<br />
			<button onClick={() => getTestApi()}>Click me to getTestApi</button>
			<br />
			<br />
			<br />
			the data of store is {testApiStore && testApiStore.resultData}
			<br />
			<br />
			<br />
			the data from callback state is{' '}
			{callbackState && callbackState.randomNumber + callbackState.result.resultData.length}
			<br />
			{callbackState && callbackState.result.resultData}
			<br />
			<br />
			<br />
			<button onClick={() => openModal()}>Open sample modal</button>
		</div>
	);
};

export const getServerSideProps = async (context: any) => {
	// console.log(context);
	// console.log(context.req.cookies);

	const axiosData = await axios.get('http://localhost:3066/api/testApi').then((response) => {
		if (response) {
			return response.data;
		}
	});

	return { props: { axiosData } };
};

export default ApiTestPage;
