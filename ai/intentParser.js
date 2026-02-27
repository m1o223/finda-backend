export function parseMessage(message) {

    const lower = message.toLowerCase();

    // 18:00
    const timeMatch = lower.match(/(\d{1,2}):(\d{2})/);

    // 8 pm
    const ampmMatch = lower.match(/(\d{1,2})\s?(am|pm)/);

    let reminderTime = new Date();

    if (timeMatch) {

        const hour = parseInt(timeMatch[1]);
        const minute = parseInt(timeMatch[2]);

        reminderTime.setHours(hour);
        reminderTime.setMinutes(minute);
        reminderTime.setSeconds(0);

    } else if (ampmMatch) {

        let hour = parseInt(ampmMatch[1]);
        const period = ampmMatch[2];

        if (period === "pm" && hour < 12) {
            hour += 12;
        }

        reminderTime.setHours(hour);
        reminderTime.setMinutes(0);
        reminderTime.setSeconds(0);

    } else {

        // إذا ما وجد وقت → بعد دقيقة
        reminderTime.setMinutes(reminderTime.getMinutes() + 1);
    }

    return {
        intent: "reminder",
        text: message,
        time: reminderTime.toISOString()
    };
}
