import { cookies } from 'next/headers';

const isLocal = process.env.NEXT_PUBLIC_SITE_ENV === 'local';

export const POST = async () => {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get('refreshToken')?.value;

    if (!refreshToken) {
        return new Response(JSON.stringify({ success: false, message: 'No refresh token found' }), {
            status: 400,
        });
    }

    try {
        const rawResponse = await fetch(`${process.env.API_URL}/auth/refresh-token`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${refreshToken}`,
                'Content-Type': 'application/json',
            },
        });

        const responseData = await rawResponse.json();
        const newAccessToken = responseData?.data?.accessToken;

        if (newAccessToken) {
            const cookieOptions = {
                httpOnly: true,
                secure: !isLocal,
                path: '/',
                sameSite: isLocal ? 'Strict' : 'Lax',
                maxAge: 60 * 15,
            };

            cookieStore.set('accessToken', newAccessToken, cookieOptions);

            return new Response(JSON.stringify({ success: true, accessToken: newAccessToken }), {
                status: 200,
            });
        }

        return new Response(JSON.stringify({ success: false, message: 'Failed to refresh token' }), { status: 400 });
    } catch (error) {
        console.error('Token refresh failed', error);
        return new Response(JSON.stringify({ success: false, message: 'Token refresh failed' }), { status: 500 });
    }
};
