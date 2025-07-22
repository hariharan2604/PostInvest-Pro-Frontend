export function scrollToFirstError(errorMap, refMap) {
    for (const field in errorMap) {
        if (errorMap[field] && refMap[field]?.current) {
            refMap[field].current.scrollIntoView({ behavior: "smooth", block: "center" });
            refMap[field].current.focus?.();
            break;
        }
    }


}
