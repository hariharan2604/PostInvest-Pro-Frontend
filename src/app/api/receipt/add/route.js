import { cookies } from 'next/headers';
import { PAYMENT_METHODS, INSTRUMENT_CLASSES } from '@/app/_data/paymentConstants';
import { formatDateStd } from '@/app/_utils/dateformatter';

export async function POST(req) {
    try {
        const body = await req.json();
        const cookieStore = await cookies();
        const token = cookieStore.get('accessToken')?.value;

        if (!token) {
            return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
        }

        const {
            paymentMethod,
            customer_id,
            inputFields = [],
        } = body;

        const isCash = paymentMethod === PAYMENT_METHODS.CASH; // CASH UUID
        const endpoint = `${process.env.API_URL}/receipt/add`;

        const responses = await Promise.all(
            inputFields.map(async (field, index) => {
                const payload = {
                    receipt_type_id: paymentMethod,
                    customer_id,
                    receipt_amount: field.receipt_amount,
                    chq_number: isCash ? null : field.chq_number,
                    cheque_date: isCash ? null : formatDateStd(field.cheque_date),
                    bank_id: isCash ? null : field.bank_id.value,
                    sb_acc_number: isCash ? null : field.sb_acc_number,
                    instrument_class_id: isCash ? INSTRUMENT_CLASSES.OTHERS :
                        field.instrument_class_id,
                };

                try {
                    const res = await fetch(endpoint, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`,
                        },
                        body: JSON.stringify(payload),
                    });

                    const data = await res.json();

                    return {
                        index,
                        success: data.code >= 400? false: true,
                        status: data.code,
                        data,
                    };
                } catch (error) {
                    return {
                        index,
                        success: false,
                        status: 500,
                        data: { message: error.message },
                    };
                }
            })
        );

        return new Response(JSON.stringify(responses), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (error) {
        console.error('Handler Error:', error);
        return new Response(
            JSON.stringify({ error: error.message || 'Internal Server Error' }),
            {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            }
        );
    }
}
