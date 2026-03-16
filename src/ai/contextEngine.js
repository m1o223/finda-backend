// src/ai/contextEngine.js

import { getContext, clearContext } from "./conversationMemory.js"

export function resolveContext(userId, text) {

    const ctx = getContext(userId)

    if (!ctx) return null

    if (ctx.type === "waiting_time") {

        const hour = parseInt(text)

        if (!isNaN(hour)) {

            clearContext(userId)

            return {
                type: "time_answer",
                hour
            }

        }

    }

    return null
}