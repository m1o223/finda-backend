export async function generateAIReply(message) {
  if (!message) {
    throw new Error("Message is required");
  }

 return {
    reply: `🤖 BlueMind AI says: I received your message -> "${message}"`,
  };
}





