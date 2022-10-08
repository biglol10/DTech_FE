/** ****************************************************************************************
 * @설명 : Rootreducer (메인 reducer) (redux-toolkit, redux-saga)
 ********************************************************************************************
 * 번호    작업자     작업일         브랜치                   변경내용
 *-------------------------------------------------------------------------------------------
 * 1      변지욱     2022-06-16                           최초작성
 * 2      변지욱     2022-09-06   feature/JW/chatPage     Hydrate에 대한 로직 추가
 ********************************************************************************************/

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { createWrapper, HYDRATE } from 'next-redux-wrapper'; // nextjs friendly
import createSagaMiddleware from 'redux-saga';
import rootSaga from '@saga/index';

import usersSlice from './usersSlice';
import counterReducer from './counterSlice';
import modalSlice from './modalSlice';
import authSlice from './authSlice';
import registerSlice from './registerSlice';
import toastSlice from './toastSlice';
import appCommonSlice from './appCommon';

export const rootReducer = (state: any, action: any) => {
	switch (action.type) {
		case HYDRATE: {
			// // Attention! This will overwrite client state! Real apps should use proper reconciliation.

			const nextState = {
				...state, // use previous state
				...action.payload, // apply delta from hydration
			};

			// 이렇게 해야 client redux랑 머지가 가능함... 안 그러면 ssr에서 redux값을 가져올 때 hydration이 적용되어 값들이 초기화 되는 현상 발생
			if (state.auth) nextState.auth = state.auth;
			if (state.toastInfo) nextState.toastInfo = state.toastInfo;
			if (state.appCommon) nextState.appCommon = state.appCommon;

			return nextState;
		}
		default: {
			const combinedReducer = combineReducers({
				users: usersSlice,
				counter: counterReducer,
				modal: modalSlice,
				auth: authSlice,
				register: registerSlice,
				toastInfo: toastSlice,
				appCommon: appCommonSlice,
			});

			return combinedReducer(state, action);
		}
	}
};

// Next.js를 사용하게 되면 유저가 요청할 때 마다
// redux store를 새로(configureStore) 생성하게 되므로 redux store가 여러 개가 될 수 있다.
// makeStore로 하나의 스토어를 다루도록 설정

const devMode = process.env.NODE_ENV === 'development';
// const devMode = true;

const loggerMiddleware = // console.log를 위한 custom middleware
	() => (next: any) => (action: any) => {
		// console.log(action);
		return next(action);
	};

// thunk 대신 saga를 쓰는 이유
// 1. delay를 걸 수 있음 (thunk는 settimeout으로 직접 구현해야 함)
// 2. 실수로 클릭 (예를 들어 로그인) 2번하면 thunk에서는 2번 요청이 다 감... saga에서는 takeLatest라는게 있어서
//    2번의 요청이 동시에 들어왔으면 가장 마지막 것만 보내고 첫번째는 무시
// 3. throttle(or debounch) 적용하여 1초에 몇번까지 요청을 허용해준다 (3번이면 1초에 3번 초과하는 요청은 막음)

const sagaMiddleware = createSagaMiddleware();
const customMiddleware = [sagaMiddleware, loggerMiddleware];

const concatMiddleware: any =
	process.env.NODE_ENV === 'production' ? sagaMiddleware : customMiddleware;

export const store: any = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			// async Saga를 위해 resolve, reject를 반환해서 에러가 생기는 이슈로,
			// serializableCheck 미들웨어를 사용안함
			thunk: false,
			serializableCheck: false,
		}).concat(concatMiddleware),
	devTools: devMode, // redux devtools 확장 프로그램 사용 가능여부
});

store.sagaTask = sagaMiddleware.run(rootSaga);

const wrapper = createWrapper(() => store, { debug: devMode });

export default wrapper;

// * makeStore주석
// const makeStore = () => {
// 	const sagaMiddleware = createSagaMiddleware();
// 	const customMiddleware = [sagaMiddleware, loggerMiddleware];

// 	const concatMiddleware: any =
// 		process.env.NODE_ENV === 'production' ? sagaMiddleware : customMiddleware;

// 	const store: any = configureStore({
// 		reducer: rootReducer,
// 		middleware: (getDefaultMiddleware) =>
// 			getDefaultMiddleware({
// 				// async Saga를 위해 resolve, reject를 반환해서 에러가 생기는 이슈로,
// 				// serializableCheck 미들웨어를 사용안함
// 				thunk: false,
// 				serializableCheck: false,
// 			}).concat(concatMiddleware),
// 		devTools: devMode, // redux devtools 확장 프로그램 사용 가능여부
// 	});

// 	store.sagaTask = sagaMiddleware.run(rootSaga);
// 	return store;
// };
