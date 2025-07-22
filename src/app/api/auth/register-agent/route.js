import { formatDateStd } from "@/app/_utils/dateformatter";

export async function POST(req) {
    try {
        const requestBody = await req.json();
        requestBody.dob = formatDateStd(requestBody.dob);
        const externalApiResponse = await fetch(`${process.env.API_URL}/auth/agent-register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
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
