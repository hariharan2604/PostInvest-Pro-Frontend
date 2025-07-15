import { cookies } from 'next/headers';
import { formatDateStd } from '@/app/_utils/dateformatter.js';


export async function POST(req) {
    try {
        const requestBody = await req.json();
        const cookieStore = await cookies();
        const accessToken = cookieStore.get('accessToken')?.value;
        const date = new Date(requestBody.investment_date);
        requestBody.scheme_id = requestBody?.scheme_id?.value;
        requestBody.investment_date = formatDateStd(date);

        const externalApiResponse = await fetch(`${process.env.API_URL}/investment/add`, {
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
