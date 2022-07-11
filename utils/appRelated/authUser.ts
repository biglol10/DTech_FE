import Router from 'next/router';

export const redirectUser = (ctx: any, location: string) => {
	if (ctx.req) {
		// ctx.req => /http request object, if(ctx.req) means user is on server-side
		ctx.res.writeHead(302, { Location: location }); // setting location on the server-side, to the location we are passing inside this function
		ctx.res.end();
	} else {
		// user is in client side
		Router.push(location);
	}
};
