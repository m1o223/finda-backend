import { Router } from "express";
import { calculateBusinessZakat } from "../services/zakatService.js";
import { createZakatReminder } from "../services/reminderService.js";

export const zakatRoutes = Router();

// حساب الزكاة
zakatRoutes.post("/calculate", (req, res) => {
  const { cash, inventoryValue, receivables, debts } = req.body || {};

  const zakat = calculateBusinessZakat({
    cash,
    inventoryValue,
    receivables,
    debts
  });

  res.json({
    success: true,
    zakat
  });
});

// إنشاء تذكير زكاة
zakatRoutes.post("/reminder", async (req, res) => {
  const { uid, date } = req.body;

  await createZakatReminder(uid, date);

  res.json({ success: true });
});