import { cookies } from 'next/headers';
import { formatDate } from '@/app/_utils/dateformatter.js';

export async function PUT(req, { params }) {
    try {
        const requestBody = await req.json();
        const cookieStore = await cookies();
        const accessToken = cookieStore.get('accessToken')?.value;
        const { id } = await params;
        const customerId = id;
        const date = new Date(requestBody.dob);
        requestBody.id = customerId;
        requestBody.city = requestBody?.city?.value;
        requestBody.state = requestBody?.state?.value;
        requestBody.dob = formatDate(date);

        const externalApiResponse = await fetch(`${process.env.API_URL}/customer/update`, {
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

