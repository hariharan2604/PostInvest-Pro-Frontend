import { useRef } from "react";

export const createRefMap = (formData) => {
    const refMap = {};
    Object.keys(formData).forEach((field) => {
        refMap[field] = useRef();
    });
    return refMap;
};
