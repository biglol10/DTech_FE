/** ****************************************************************************************
 * @설명 : Backend Error Code Types
 ********************************************************************************************
 * 번호    작업자     작업일         브랜치                       변경내용
 *-------------------------------------------------------------------------------------------
 * 1      Claude     2025-01-23                              최초작성 (Refresh Token 지원)
 ********************************************************************************************/

/**
 * Backend에서 반환하는 에러 코드
 * DTech_BE의 ErrorCode enum과 동일하게 유지
 */
export enum ErrorCode {
	// Authentication & Authorization
	ACCESS_TOKEN_EXPIRED = 'ACCESS_TOKEN_EXPIRED',
	REFRESH_TOKEN_EXPIRED = 'REFRESH_TOKEN_EXPIRED',
	INVALID_ACCESS_TOKEN = 'INVALID_ACCESS_TOKEN',
	INVALID_REFRESH_TOKEN = 'INVALID_REFRESH_TOKEN',
	NO_TOKEN_PROVIDED = 'NO_TOKEN_PROVIDED',
	INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
	UNAUTHORIZED = 'UNAUTHORIZED',
	FORBIDDEN = 'FORBIDDEN',

	// Resource Errors
	RESOURCE_NOT_FOUND = 'RESOURCE_NOT_FOUND',
	DUPLICATE_RESOURCE = 'DUPLICATE_RESOURCE',

	// Validation
	VALIDATION_ERROR = 'VALIDATION_ERROR',
	INVALID_INPUT = 'INVALID_INPUT',

	// Server Errors
	INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
	SERVICE_UNAVAILABLE = 'SERVICE_UNAVAILABLE',
}

/**
 * API 에러 응답 타입
 */
export interface ApiErrorResponse {
	success: false;
	message: string;
	errorCode?: ErrorCode;
	details?: any;
}

/**
 * API 성공 응답 타입 (제네릭)
 */
export interface ApiSuccessResponse<T = any> {
	success: true;
	result?: string; // 'success' 등
	[key: string]: any; // 유연한 응답 구조
}

export type ApiResponse<T = any> = ApiSuccessResponse<T> | ApiErrorResponse;
