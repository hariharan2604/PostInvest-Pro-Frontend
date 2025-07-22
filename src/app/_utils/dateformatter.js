export const formatDateStd = (dateStr) => {
    const date = new Date(dateStr);
    const returnDate = `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;
    return returnDate;


}

export const formatToLocaleString = (date) => {
    return new Date(date).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric', })
}