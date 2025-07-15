import { cookies } from 'next/headers';
import { formatDateStd } from '@/app/_utils/dateformatter.js';
export async function POST(req) {
    try {
        const requestBody = await req.json();
        const cookieStore = await cookies();
        const accessToken = cookieStore.get('accessToken')?.value;
        const userId = cookieStore.get('userId')?.value;
        const date = new Date(requestBody.dob);
        requestBody.agent_id = userId;
        requestBody.city = requestBody?.city?.value;
        requestBody.state = requestBody?.state?.value;
        requestBody.dob = formatDateStd(date);

        const externalApiResponse = await fetch(`${process.env.API_URL}/customer/add-relation`, {
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