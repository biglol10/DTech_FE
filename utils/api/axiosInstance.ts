/** ****************************************************************************************
 * @설명 : Axios Instance with Refresh Token Interceptor
 ********************************************************************************************
 * 번호    작업자     작업일         브랜치                       변경내용
 *-------------------------------------------------------------------------------------------
 * 1      Claude     2025-01-23                              최초작성 (Refresh Token 지원)
 ********************************************************************************************/

import axios, { AxiosError, AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';
import cookie from 'js-cookie';
import { ErrorCode } from '@utils/types/errorTypes';

/**
 * Axios 인스턴스 생성
 */
const axiosInstance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_BE_BASE_URL,
	timeout: 15000,
	withCredentials: true, // Refresh Token 쿠키를 위해 필수
	headers: {
		'Content-Type': 'application/json',
	},
});

/**
 * 현재 토큰 갱신 중인지 추적
 */
let isRefreshing = false;
let failedQueue: Array<{
	resolve: (value?: any) => void;
	reject: (reason?: any) => void;
}> = [];

/**
 * 대기 중인 요청들 처리
 */
const processQueue = (error: any = null, token: string | null = null) => {
	failedQueue.forEach((prom) => {
		if (error) {
			prom.reject(error);
		} else {
			prom.resolve(token);
		}
	});

	failedQueue = [];
};

/**
 * Request Interceptor
 * 모든 요청에 Access Token 추가
 */
axiosInstance.interceptors.request.use(
	(config: InternalAxiosRequestConfig) => {
		const accessToken = cookie.get('accessToken');

		if (accessToken && config.headers) {
			config.headers.Authorization = `Bearer ${accessToken}`;
		}

		return config;
	},
	(error) => {
		return Promise.reject(error);
	},
);

/**
 * Response Interceptor
 * 401 에러 시 자동으로 토큰 갱신 시도
 */
axiosInstance.interceptors.response.use(
	(response) => {
		return response;
	},
	async (error: AxiosError<any>) => {
		const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

		// 401 에러이고 아직 재시도하지 않은 경우
		if (error.response?.status === 401 && !originalRequest._retry) {
			const errorCode = error.response?.data?.errorCode;

			// Access Token이 만료된 경우
			if (errorCode === ErrorCode.ACCESS_TOKEN_EXPIRED) {
				if (isRefreshing) {
					// 이미 토큰 갱신 중이면 대기열에 추가
					return new Promise((resolve, reject) => {
						failedQueue.push({ resolve, reject });
					})
						.then((token) => {
							if (originalRequest.headers) {
								originalRequest.headers.Authorization = `Bearer ${token}`;
							}
							return axiosInstance(originalRequest);
						})
						.catch((err) => {
							return Promise.reject(err);
						});
				}

				originalRequest._retry = true;
				isRefreshing = true;

				try {
					// Refresh Token으로 새 Access Token 요청
					const response = await axios.post(
						`${process.env.NEXT_PUBLIC_BE_BASE_URL}/api/auth/refresh`,
						{},
						{
							withCredentials: true, // Refresh Token 쿠키 포함
						},
					);

					const { accessToken } = response.data;

					// 새 Access Token 저장
					cookie.set('accessToken', accessToken, {
						expires: 1 / 96, // 15분 (1/96일)
						secure: process.env.NODE_ENV === 'production',
						sameSite: 'strict',
					});

					// 대기 중인 요청들 처리
					processQueue(null, accessToken);

					// 원래 요청 재시도
					if (originalRequest.headers) {
						originalRequest.headers.Authorization = `Bearer ${accessToken}`;
					}

					return axiosInstance(originalRequest);
				} catch (refreshError: any) {
					// Refresh Token도 만료되었거나 갱신 실패
					processQueue(refreshError, null);

					// 토큰 정리
					cookie.remove('accessToken');
					cookie.remove('refreshToken');

					// 로그인 페이지로 리다이렉트
					if (typeof window !== 'undefined') {
						window.location.href = '/login';
					}

					return Promise.reject(refreshError);
				} finally {
					isRefreshing = false;
				}
			} else if (
				errorCode === ErrorCode.REFRESH_TOKEN_EXPIRED ||
				errorCode === ErrorCode.INVALID_ACCESS_TOKEN ||
				errorCode === ErrorCode.NO_TOKEN_PROVIDED
			) {
				// 토큰이 완전히 만료되었거나 유효하지 않음 - 로그인 필요
				cookie.remove('accessToken');
				cookie.remove('refreshToken');

				if (typeof window !== 'undefined') {
					window.location.href = '/login';
				}
			}
		}

		return Promise.reject(error);
	},
);

export default axiosInstance;
