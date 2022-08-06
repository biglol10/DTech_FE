/* eslint-disable no-duplicate-imports */
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const middleware = (request: NextRequest) => {
    const cookieValue = request.cookies.get('token');
    const pagePath = request.nextUrl.pathname;

    const protectedRoutesArray = [
		'/',
		'/[username]',
		'/notifications',
		'/post/[postId]',
		'/messages',
		'/search',
		'/dashboard',
	];

	if (!cookieValue && protectedRoutesArray.includes(pagePath)) {
		return NextResponse.redirect(
			`http://localhost:3065/${process.env.NODE_ENV === 'production' ? 'dtech/' : ''}login`,
		);
	};
}

export default middleware;