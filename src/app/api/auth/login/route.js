import { cookies } from 'next/headers';
const isLocal = process.env.NEXT_PUBLIC_SITE_ENV === 'local';
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
        const { data, ...cleansed } = response;
        if (data?.accessToken && data?.refreshToken) {
            const cookieStore = await cookies();
            const cookieOptions = {
                httpOnly: true,
                secure: !isLocal, 
                path: '/',
                sameSite: isLocal ? 'Strict' : 'Lax',  
            }
            // Set access and refresh tokens in cookies
            cookieStore.set('accessToken', response.data.accessToken, {
                ...cookieOptions,
                maxAge: 60 * 15, // 15 minutes
            });

            cookieStore.set('userId', response.data.id, {
                ...cookieOptions,
                maxAge: 60 * 15, // Match access token validity
            });

            cookieStore.set('agentName', response.data.name, {
                ...cookieOptions,
                maxAge: 60 * 15, // Match access token validity
            });

            cookieStore.set('refreshToken', response.data.refreshToken, {
                ...cookieOptions,
                maxAge: 60 * 60 * 24 * 30, // 30 days
            });

            return new Response(JSON.stringify(cleansed), { status: 200 });
        }

        return new Response(JSON.stringify(cleansed), { status: 400 });
    } catch (error) {
        console.error('Login failed', error);
        return new Response(JSON.stringify({ success: false, message: error.response?.data?.message || 'Login failed' }), { status: 500 });
    }
};
