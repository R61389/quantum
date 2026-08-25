// Placeholder WhatsApp Business number — replace with the real number before
// launch. Format: country code + number, digits only (no +, spaces or dashes).
export const WHATSAPP_BUSINESS_NUMBER = "59170000000";

export function buildWhatsAppLink(message: string, number = WHATSAPP_BUSINESS_NUMBER): string {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export const DEFAULT_WHATSAPP_MESSAGE =
  "Hola, quisiera hablar con un ingeniero de Quantum Batteries Bolivia.";
