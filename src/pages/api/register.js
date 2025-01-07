import axios from 'axios';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const externalApiResponse = await axios.post(`${process.env.API_URL}/auth/agent-register`, req.body
            );

            // Respond with the data received from the external API
            res.json(
                externalApiResponse.data,
            );
        } catch (error) {
            console.error("Error calling external API:", error.message);
            res.json(
                externalApiResponse.data
            )
        }
    } else {
        // Handle unsupported methods
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
