import { cookies } from 'next/headers';

export const POST = async (req) => {
    const cookieStore =await cookies();
    const refreshToken = cookieStore.get('refreshToken')?.value;

    if (!refreshToken) {
        return new Response(JSON.stringify({ success: false, message: 'No refresh token found' }), { status: 400 });
    }
    
    try {
        const login = await fetch(`${process.env.API_URL}/auth/logout`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${refreshToken}`,
            },
            body: JSON.stringify(''),
        });
        const response = await login.json();
        if (response.code == 200) {
            cookieStore.set('accessToken', '', {
                httpOnly: true,
                path: '/',
                expires: new Date(0), // Expiry in the past to delete
            });
            cookieStore.set('refreshToken', '', {
                httpOnly: true,
                path: '/',
                expires: new Date(0), // Expiry in the past to delete
            });
            cookieStore.set('userId', '', {
                httpOnly: true,
                path: '/',
                expires: new Date(0), // Expiry in the past to delete
            });
            cookieStore.set('agentName', '', {
                httpOnly: true,
                path: '/',
                expires: new Date(0), // Expiry in the past to delete
            });
            return new Response(JSON.stringify({ success: true }), { status: 200 });
        }

        return new Response(JSON.stringify({ success: false, message: 'Logout Failed' }), { status: 400 });
    } catch (error) {
        console.error('Token refresh failed', error);
        return new Response(JSON.stringify({ success: false, message: 'Logout failed' }), { status: 500 });
    }
};

