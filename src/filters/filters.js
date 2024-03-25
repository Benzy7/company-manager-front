export const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const day = date.getDate();
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Add leading zero to month
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
};
