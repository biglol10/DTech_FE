/** ****************************************************************************************
 * @설명 : Authentication API with Refresh Token Support
 ********************************************************************************************
 * 번호    작업자     작업일         브랜치                       변경내용
 *-------------------------------------------------------------------------------------------
 * 1      Claude     2025-01-23                              최초작성 (Refresh Token 지원)
 ********************************************************************************************/

import axiosInstance from '@utils/api/axiosInstance';
import { ApiResponse } from '@utils/types/errorTypes';

/**
 * 로그인 요청 파라미터
 */
interface LoginParams {
	userId: string;
	password: string;
}

/**
 * 로그인 응답 데이터
 */
interface LoginResponse {
	success: true;
	result: 'success';
	accessToken: string;
	user: {
		name: string;
		userId: string;
		userUID: string;
		userProfileImg: string;
		time: string;
	};
}

/**
 * 토큰 정보 응답
 */
interface TokenResponse {
	success: true;
	user: {
		USER_UID: string;
		USER_ID: string;
		USER_NM: string;
		TEAM_CD: string;
		USER_TITLE: string;
		USER_ADMIN_YN: number;
		USER_IMG_URL: string;
	};
}

/**
 * Refresh Token 응답
 */
interface RefreshTokenResponse {
	success: true;
	accessToken: string;
	message: string;
}

/**
 * 로그인 API
 */
export const fireLoginRequest = async (params: LoginParams) => {
	try {
		const response = await axiosInstance.post<LoginResponse>('/api/auth/loginUser', params);

		if (response.data.success) {
			return {
				userName: response.data.user.name,
				userId: response.data.user.userId,
				time: response.data.user.time,
				userToken: response.data.accessToken,
				userUID: response.data.user.userUID,
				userProfileImg: response.data.user.userProfileImg,
				result: 'success' as const,
			};
		}

		return {
			result: 'error' as const,
			errMessage: '로그인에 실패했습니다',
		};
	} catch (error: any) {
		return {
			result: 'error' as const,
			errMessage: error.response?.data?.message || '로그인에 실패했습니다',
			errorCode: error.response?.data?.errorCode,
		};
	}
};

/**
 * Access Token으로 사용자 정보 조회
 */
export const fireTokenRequest = async (token: string) => {
	try {
		const response = await axiosInstance.post<TokenResponse>('/api/auth/getLoggedInUserInfo', {
			token,
		});

		if (response.data.success) {
			return response.data;
		}

		return {
			success: false,
			user: {},
		};
	} catch (error) {
		return {
			success: false,
			user: {},
		};
	}
};

/**
 * Refresh Token으로 새 Access Token 발급
 */
export const refreshAccessToken = async () => {
	try {
		const response = await axiosInstance.post<RefreshTokenResponse>('/api/auth/refresh');

		if (response.data.success) {
			return {
				success: true,
				accessToken: response.data.accessToken,
			};
		}

		return {
			success: false,
			error: 'Token refresh failed',
		};
	} catch (error: any) {
		return {
			success: false,
			error: error.response?.data?.message || 'Token refresh failed',
			errorCode: error.response?.data?.errorCode,
		};
	}
};

/**
 * 로그아웃 API
 */
export const fireLogoutRequest = async () => {
	try {
		const response = await axiosInstance.post('/api/auth/logout');

		return {
			success: true,
		};
	} catch (error) {
		// 로그아웃 실패해도 클라이언트 측에서는 성공으로 처리
		return {
			success: true,
		};
	}
};

/**
 * Legacy 지원을 위한 export (기존 코드 호환성)
 */
export { fireLoginRequest as default };
