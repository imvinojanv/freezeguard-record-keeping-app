export const greetingDay = () => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayOfWeekName = daysOfWeek[dayOfWeek];

    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    const dateString = today.toLocaleDateString('en-US', options);

    return {dayOfWeekName, dateString};
}