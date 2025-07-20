import { cookies } from 'next/headers';

export const POST = async () => {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get('refreshToken')?.value;

    if (refreshToken) {
        try {
            await fetch(`${process.env.API_URL}/auth/logout`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${refreshToken}`,
                    'Content-Type': 'application/json',
                },
            });
        } catch (err) {
            console.warn('Remote logout failed, continuing to clear cookies.', err);
        }
    }

    ['accessToken', 'refreshToken', 'userId', 'agentName'].forEach((name) => {
        cookieStore.set(name, '', {
            httpOnly: true,
            path: '/',
            maxAge: 0,
        });
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
};
