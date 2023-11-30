const SetDatesFilter = (filterType, fromDate, toDate) => {

    let startDate, endDate;
    if (filterType === "today") {
        startDate = new Date();
        startDate.setHours(0, 0, 0, 0);
        endDate = new Date();
        endDate.setHours(23, 59, 59, 999);
    } else if (filterType === "yesterday") {
        const currentDate = new Date();
        startDate = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            currentDate.getDate() - 1
        );
        startDate.setHours(0, 0, 0, 0);
        endDate = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            currentDate.getDate() - 1
        );
        endDate.setHours(23, 59, 59, 999);
    } else if (filterType === "7days") {
        startDate = new Date();
        startDate.setDate(startDate.getDate() - 7);
        endDate = new Date();
    } else if (filterType === "thismonth") {
        const currentDate = new Date();
        startDate = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            1
        );
        endDate = new Date();
    } else if (filterType === "lastmonth") {
        const currentDate = new Date();
        startDate = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth() - 1,
            1
        );
        endDate = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            0
        );
    } else if (filterType === "last3month") {
        const currentDate = new Date();
        startDate = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth() - 3,
            1
        );
        endDate = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth() - 1,
            0
        );
    } else if (filterType === "thisyear") {
        const currentDate = new Date();
        startDate = new Date(currentDate.getFullYear(), 0, 1);
        endDate = new Date();
    } else if (filterType === "custom") {
        startDate = new Date(fromDate)
        endDate = new Date(toDate)
    }

    return { startDate, endDate }

}
module.exports = SetDatesFilter;