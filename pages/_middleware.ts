/* eslint-disable no-duplicate-imports */
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
// import cookie from 'js-cookie';

const middleware = (request: NextRequest) => {
	const cookieValue = request.cookies.token;
	// const url = request.url;

	console.log('request.page 객체는: ');
	console.log(request.page);

	const pagePath = request.page.name!;
	const pageParams = request.page.params;

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
	}

	// if (cookieValue && url === 'http://localhost:3065/') {
	// 	return NextResponse.redirect('http://localhost:3065/dashboard');
	// }

	// if (cookieValue && url === 'http://localhost:3065') {
	// 	return NextResponse.redirect('http://localhost:3065/dashboard');
	// }
};

export default middleware;

// import { NextResponse } from 'next/server';
// import { useSelector, useDispatch } from 'react-redux';

// const middleware = (req) => {
// 	const cookieValue = req.cookies.get('token');
// 	const url = req.url;

// 	console.log('cookieValue is');
// 	console.log(cookieValue);

// 	if (!cookieValue) {
// 		return NextResponse.redirect('http://localhost:3065/login');
// 	}

// 	if (cookieValue && url === 'http://localhost:3065') {
// 		return NextResponse.redirect('http://localhost:3065/dashboard');
// 	}
// };

// export default middleware;
