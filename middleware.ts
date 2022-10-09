/* eslint-disable no-duplicate-imports */
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const middleware = (request: NextRequest) => {
	const cookieValue = request.cookies.get('token');
	const pagePath = request.nextUrl.pathname;

	const protectedRoutesArray = [
		// '/',
		'/[username]',
		'/notifications',
		'/post/[postId]',
		'/messages',
		'/search',
		'/dashboard',
		'/chat',
	];

	const isWithProtectedRoutes = () => {
		for (let index = 0; index < protectedRoutesArray.length; index++) {
			if (pagePath.startsWith(protectedRoutesArray[index]) || pagePath === '/') return true;
		}
		return false;
	};

	if (!cookieValue && isWithProtectedRoutes()) {
		return NextResponse.redirect(
			new URL(`/${process.env.NODE_ENV === 'production' ? 'dtech/' : ''}login`, request.url),
		);
		// return NextResponse.redirect(
		// 	`http://localhost:3065/${process.env.NODE_ENV === 'production' ? 'dtech/' : ''}login`,
		// );
	}
};

export default middleware;
