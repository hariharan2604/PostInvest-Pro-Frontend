import { NextResponse } from 'next/server';

export function middleware(request) {

    const accessToken = request.cookies.get('accessToken')?.value;
    if (!accessToken) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!api/auth|registration$|$|_next/|favicon.ico|images/|fonts/|media/|icons/).*)',
    ],
};
