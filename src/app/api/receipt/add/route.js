import { cookies } from 'next/headers';
import { PAYMENT_METHODS, INSTRUMENT_CLASSES } from '@/app/_data/paymentConstants';
import { formatDateStd } from '@/app/_utils/dateformatter';

export async function POST(req) {
    try {
        const requestBody = await req.json();
        const cookieStore = await cookies();
        const accessToken = cookieStore.get('accessToken')?.value;

        const {
            paymentMethod,
            customer_id,
            inputFields = [],
        } = requestBody;

        const isCash = paymentMethod === PAYMENT_METHODS.CASH;
        const endpoint = `${process.env.API_URL}/receipt/bulk-add`;

        const payload = inputFields.map((field) => ({
            receipt_type_id: paymentMethod,
            customer_id,
            receipt_amount: field.receipt_amount,
            chq_number: isCash ? null : field.chq_number,
            cheque_date: isCash ? null : formatDateStd(field.cheque_date),
            bank_id: isCash ? null : field.bank_id?.value,
            sb_acc_number: isCash ? null : field.sb_acc_number,
            instrument_class_id: isCash
                ? INSTRUMENT_CLASSES.OTHERS
                : field.instrument_class_id,
        }));

        const externalApiResponse = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
            body: JSON.stringify({ entries: payload }),
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
