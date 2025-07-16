import { PAYMENT_METHODS, INSTRUMENT_CLASSES } from "../../app/_data/paymentConstants";

export const initialFormData = {
    customer_id: '',
    paymentMethod: PAYMENT_METHODS.CASH,
    chequeType: "single",
    inputFields: [
        {
            chq_number: "",
            receipt_amount: "",
            bank_id: "",
            sb_acc_number: "",
            instrument_class_id: INSTRUMENT_CLASSES.OTHERS,
            cheque_date: null,
        },
    ],
};
