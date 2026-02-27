import Stripe from "stripe";
import { env } from "./env.js";

export const stripe = env.STRIPE_SECRET_KEY
  ? new Stripe(env.STRIPE_SECRET_KEY, { apiVersion: "2023-10-16" })
  : null;

export const stripeWebhookSecret = env.STRIPE_WEBHOOK_SECRET || "";