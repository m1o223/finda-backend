export const createReminder = async (data) => {
  try {
    return {
      success: true,
      message: "Reminder created successfully",
      data
    }
  } catch (error) {
    throw new Error("Failed to create reminder")
  }
}

export const createZakatReminder = async (data) => {
  try {
    return {
      success: true,
      message: "Zakat reminder created successfully",
      data
    }
  } catch (error) {
    throw new Error("Failed to create zakat reminder")
  }
}