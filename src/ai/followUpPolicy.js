// src/ai/followUpPolicy.js

export function needsTime(text) {

    const hasHour = /\d{1,2}/.test(text)

    return !hasHour

}

export function needsMorningEvening(text) {

    if (text.includes("صباح") || text.includes("مساء")) {

        return false
    }

    const hasHour = /\d{1,2}/.test(text)

    return hasHour
}