import { cookies } from 'next/headers';

export async function GET(req, { params }) {
    try {
        const requestBody = {}
        const cookieStore = await cookies();
        const accessToken = cookieStore.get('accessToken')?.value;
        // const userId = cookieStore.get('userId')?.value;
        const { id } = await params;
        requestBody.customerId = id;

        const externalApiResponse = await fetch(`${process.env.API_URL}/customer/detail`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
            body: JSON.stringify(requestBody),
        });

        if (!externalApiResponse.ok) {
            throw new Error(`External API error: ${externalApiResponse.statusText}`);
        }

        const responseData = await externalApiResponse.json();

        return new Response(JSON.stringify(responseData), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error("Error calling external API:", error.message);

        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}