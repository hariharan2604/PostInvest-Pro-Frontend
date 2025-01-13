export async function POST(req) {
    try {
        // Parse the incoming request body (JSON)
        const requestBody = await req.json();

        // Make the POST request to the external API using fetch
        const externalApiResponse = await fetch(`${process.env.API_URL}/auth/agent-register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        });

        // Check if the response is successful
        if (!externalApiResponse.ok) {
            throw new Error(`External API error: ${externalApiResponse.statusText}`);
        }

        // Parse the response body from the external API
        const responseData = await externalApiResponse.json();

        // Return the data from the external API response
        return new Response(JSON.stringify(responseData), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error("Error calling external API:", error.message);

        // Return an error response
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}
