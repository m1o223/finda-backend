export const createReminder = async (data) => {
  try {
    // هون بتحط منطق إنشاء التذكير العادي
    return {
      success: true,
      message: "Reminder created successfully",
      data,
    };
  } catch (error) {
    throw new Error("Failed to create reminder");
  }
};

export const createZakatReminder = async (data) => {
  try {
    // منطق خاص بزكاة
    return {
      success: true,
      message: "Zakat reminder created successfully",
      data,
    };
  } catch (error) {
    throw new Error("Failed to create zakat reminder");
  }
};