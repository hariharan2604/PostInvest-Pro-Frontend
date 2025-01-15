import { cookies } from 'next/headers';

export const POST = async (req) => {
    try {
        const requestBody = await req.json();

        const login = await fetch(`${process.env.API_URL}/auth/agent-login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        });
        const response = await login.json()
        if (response.data?.accessToken && response.data?.refreshToken) {
            const cookieStore = await cookies();

            // Set access and refresh tokens in cookies
            cookieStore.set('accessToken', response.data.accessToken, { httpOnly: true, path: '/', maxAge: 60 * 60 });
            cookieStore.set('userId', response.data.accessToken, { httpOnly: true, path: '/', maxAge: 60 * 60 });
            cookieStore.set('refreshToken', response.data.refreshToken, { httpOnly: true, path: '/', maxAge: 60 * 60 * 24 * 30 });

            return new Response(JSON.stringify({ success: true, user: response.data.user }), { status: 200 });
        }

        return new Response(JSON.stringify({ success: false, message: 'Invalid credentials' }), { status: 400 });
    } catch (error) {
        console.error('Login failed', error);
        return new Response(JSON.stringify({ success: false, message: error.response?.data?.message || 'Login failed' }), { status: 500 });
    }
};
