/** ****************************************************************************************
 * @설명 : Authentication Hook with Refresh Token Support
 ********************************************************************************************
 * 번호    작업자     작업일         브랜치                       변경내용
 *-------------------------------------------------------------------------------------------
 * 1      Claude     2025-01-23                              최초작성 (Refresh Token 지원)
 ********************************************************************************************/

import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import cookie from 'js-cookie';
import { toast } from 'react-toastify';
import axiosInstance from '@utils/api/axiosInstance';
import { IAuth } from '@utils/types/commAndStoreTypes';
import * as RCONST from '@utils/constants/reducerConstants';

interface LoginCredentials {
	userId: string;
	password: string;
}

interface LoginResponse {
	success: boolean;
	accessToken: string;
	user: {
		name: string;
		userId: string;
		userUID: string;
		userProfileImg?: string;
		time: string;
	};
}

/**
 * 인증 관련 Hook
 * Access Token + Refresh Token 기반 인증 처리
 */
export const useAuth = () => {
	const dispatch = useDispatch();
	const router = useRouter();
	const auth = useSelector((state: { auth: IAuth }) => state.auth);

	/**
	 * 로그인
	 */
	const login = useCallback(
		async (credentials: LoginCredentials) => {
			try {
				const response = await axiosInstance.post<LoginResponse>('/api/auth/loginUser', credentials);

				const { accessToken, user } = response.data;

				// Access Token을 쿠키에 저장 (15분)
				cookie.set('accessToken', accessToken, {
					expires: 1 / 96, // 15분 = 1/96일
					secure: process.env.NODE_ENV === 'production',
					sameSite: 'strict',
				});

				// Redux에 사용자 정보 저장
				dispatch({
					type: RCONST.AUTH_SETTING,
					payload: {
						userName: user.name,
						userId: user.userId,
						userUID: user.userUID,
						userToken: accessToken,
						userProfileImg: user.userProfileImg || '',
					},
				});

				return { success: true, user };
			} catch (error: any) {
				const errorMessage = error.response?.data?.message || '로그인에 실패했습니다';
				toast.error(errorMessage);

				return { success: false, error: errorMessage };
			}
		},
		[dispatch],
	);

	/**
	 * 로그아웃
	 */
	const logout = useCallback(async () => {
		try {
			// 서버에 로그아웃 요청 (Refresh Token 쿠키 삭제)
			await axiosInstance.post('/api/auth/logout');
		} catch (error) {
			console.error('Logout request failed:', error);
		} finally {
			// 클라이언트 측 정리
			cookie.remove('accessToken');
			cookie.remove('refreshToken');

			// Redux 상태 초기화
			dispatch({ type: RCONST.AUTH_RESET });

			// 로그인 페이지로 리다이렉트
			router.push('/login');
		}
	}, [dispatch, router]);

	/**
	 * Access Token 수동 갱신 (필요 시)
	 */
	const refreshAccessToken = useCallback(async () => {
		try {
			const response = await axiosInstance.post('/api/auth/refresh');
			const { accessToken } = response.data;

			// 새 Access Token 저장
			cookie.set('accessToken', accessToken, {
				expires: 1 / 96, // 15분
				secure: process.env.NODE_ENV === 'production',
				sameSite: 'strict',
			});

			return { success: true, accessToken };
		} catch (error: any) {
			console.error('Token refresh failed:', error);

			// Refresh Token도 만료된 경우 로그아웃
			if (error.response?.data?.errorCode === 'REFRESH_TOKEN_EXPIRED') {
				await logout();
			}

			return { success: false, error: error.response?.data?.message };
		}
	}, [logout]);

	/**
	 * 토큰 기반 자동 로그인 (페이지 로드 시)
	 */
	const autoLogin = useCallback(async () => {
		const accessToken = cookie.get('accessToken');

		// Access Token이 없으면 Refresh Token으로 갱신 시도
		if (!accessToken) {
			const result = await refreshAccessToken();

			if (!result.success) {
				return false;
			}
		}

		// 사용자 정보 가져오기
		try {
			const response = await axiosInstance.post('/api/auth/getLoggedInUserInfo');
			const { user } = response.data;

			if (user) {
				dispatch({
					type: RCONST.AUTH_SETTING,
					payload: {
						userName: user.USER_NM,
						userId: user.USER_ID,
						userUID: user.USER_UID,
						userToken: accessToken || cookie.get('accessToken') || '',
						userProfileImg: user.USER_IMG_URL || '',
						userTeamCD: user.TEAM_CD || '',
						userTitle: user.USER_TITLE || '',
					},
				});

				return true;
			}
		} catch (error) {
			console.error('Auto login failed:', error);
			return false;
		}

		return false;
	}, [dispatch, refreshAccessToken]);

	return {
		auth,
		isAuthenticated: !!auth?.userName && !!auth?.userToken,
		login,
		logout,
		refreshAccessToken,
		autoLogin,
	};
};
