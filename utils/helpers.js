module.exports = {
    format_date: (date) => {
        // Format date as MM/DD/YYYY
        console.log(date)
        if (date) {
            return date.toLocaleDateString();
        } else {
            return;
        }
    },
};