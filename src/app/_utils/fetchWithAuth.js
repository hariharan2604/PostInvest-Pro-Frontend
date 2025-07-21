export async function fetchWithAuth(url, options = {}, retry = true) {
    try {
        const res = await fetch(url, {
            ...options,
        });

        if (res.status !== 401) {
            return res;
        }

        console.warn('⛔ Unauthorized. Trying to refresh token...');

        if (retry) {
            const refreshRes = await fetch('/api/auth/refresh-token', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            });

            console.log("🚀 ~ fetchWithAuth ~ refreshRes:", refreshRes);


            if (refreshRes.ok) {
                console.log('✅ Token refreshed. Retrying original request...');
                return fetchWithAuth(url, options, false);
            }

            console.warn('🔁 Token refresh failed. Logging out...');
        }

        try {
            await fetch('/api/auth/logout', { method: 'POST' });
        } catch (logoutErr) {
            console.error('⚠️ Failed to logout:', logoutErr);
        }

        if (typeof window !== 'undefined') {
            window.location.href = '/';
        }

        return null;

    } catch (err) {
        if (err.name === 'AbortError') {
            return null; 
        }

        console.error('❌ fetchWithAuth error:', err);
        throw err;
    }
}
