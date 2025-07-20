import { NextResponse } from 'next/server';

export async function middleware(request) {
    const accessToken = request.cookies.get('accessToken')?.value;
    const refreshToken = request.cookies.get('refreshToken')?.value;

    if (accessToken) {
        return NextResponse.next();
    }

    if (!refreshToken) {
        if (request.nextUrl.pathname.startsWith('/api')) {
            return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), {
                status: 401,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!api/auth|registration$|$|_next/|favicon.ico|images/|fonts/|media/|icons/).*)',
    ],
};
