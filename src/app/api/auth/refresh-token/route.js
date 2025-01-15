import { cookies } from 'next/headers';

export const POST = async (req) => {
    const cookieStore = cookies();
    const refreshToken = cookieStore.get('refreshToken')?.value;

    if (!refreshToken) {
        return new Response(JSON.stringify({ success: false, message: 'No refresh token found' }), { status: 400 });
    }

    try {
        const response = await fetch(`${process.env.API_URL}/auth/refresh-token`, {}, {
            headers: { Authorization: `Bearer ${refreshToken}` },
        });

        if (response.data?.accessToken) {
            cookieStore.set('accessToken', response.data.accessToken, { httpOnly: true, path: '/', maxAge: 60 * 60 }); s
            return new Response(JSON.stringify({ success: true, accessToken: response.data.accessToken }), { status: 200 });
        }

        return new Response(JSON.stringify({ success: false, message: 'Failed to refresh token' }), { status: 400 });
    } catch (error) {
        console.error('Token refresh failed', error);
        return new Response(JSON.stringify({ success: false, message: 'Token refresh failed' }), { status: 500 });
    }
};
