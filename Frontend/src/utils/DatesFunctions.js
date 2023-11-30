
export function getDaysInMonth(year, month) {
    const totalDays = new Date(year, month, 0).getDate();
    //? If the month is February, check if it is a leap year.
    if (month === 2) {
        return year % 4 === 0 ? totalDays : totalDays - 1;
    }
    return totalDays;
}

export function formatDate(inputDate) {

    if (!inputDate) return ""
    const months = [
        "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
        "JUL", "AUG", "SEPT", "OCT", "NOV", "DEC"
    ];
    const parts = inputDate.split('-');
    const year = parts[0];
    const month = months[parseInt(parts[1]) - 1];
    const day = parts[2];

    return `${day}-${month}-${year}`;
}

export function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}
export function formatCreatedAtDate(inputDate) {
    const date = new Date(inputDate);
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    return date.toLocaleDateString('en-US', options).toUpperCase();

}
export function extractDateAndTime(timestamp) {
    if (!timestamp) return
    const dateObj = new Date(timestamp);
    const year = dateObj.getFullYear();
    const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
    const day = dateObj.getDate().toString().padStart(2, '0');

    // Extract the time components
    let hours = dateObj.getHours();
    const minutes = dateObj.getMinutes();
    const seconds = dateObj.getSeconds();
    const ampm = hours >= 12 ? 'PM' : 'AM';

    // Convert hours to 12-hour format
    if (hours > 12) {
        hours -= 12;
    }

    // Ensure hours are always two digits
    hours = hours.toString().padStart(2, '0');

    const formattedDate = `${day}/${month}/${year}`;
    const formattedTime = `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} ${ampm}`;

    return {
        date: formattedDate,
        time: formattedTime,
    };
}

