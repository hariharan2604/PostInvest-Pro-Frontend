import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function middleware(request) {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken')?.value;

    // If no access token is found, redirect to the login page
    if (!accessToken) {
        return NextResponse.redirect(new URL('/', request.url)); // Redirect to login page
    }

    // If access token exists, allow the request to proceed
    return NextResponse.next();
}

// You can specify the paths you want this middleware to apply to
export const config = {
    matcher: ['/protected/:path*', '/dashboard/:path*', '/customer/:path*'], // Example: Protect routes under /protected, /dashboard, and /profile
};
