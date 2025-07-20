import { cookies } from 'next/headers';

export async function GET(req) {
    try {
        const cookieStore = await cookies();
        const accessToken = cookieStore.get('accessToken')?.value;
        if (!accessToken) {
            return new Response(JSON.stringify({ message: 'Unauthorized' }), {
                status: 401,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const { searchParams } = new URL(req.url);
        const search = searchParams.get('search');
        const requestBody = { search };


        const externalApiResponse = await fetch(`${process.env.API_URL}/customer/list`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
            body: JSON.stringify(requestBody),
        });

        const responseData = await externalApiResponse.json();

        return new Response(JSON.stringify(responseData), {
            status: externalApiResponse.status, // Preserve external status code
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error("Error fetching customer list:", error.message);

        return new Response(JSON.stringify({
            status: "error",
            code: 500,
            data: null,
            error: error.message,
        }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}
