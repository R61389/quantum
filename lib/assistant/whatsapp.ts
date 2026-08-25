// Testing number (personal, not corporate) — the owner plans to swap this
// for a corporate WhatsApp Business number later. Format: country code +
// number, digits only (no +, spaces or dashes).
export const WHATSAPP_BUSINESS_NUMBER = "59174380719";

export function buildWhatsAppLink(message: string, number = WHATSAPP_BUSINESS_NUMBER): string {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export const DEFAULT_WHATSAPP_MESSAGE =
  "Hola, quisiera hablar con un ingeniero de Quantum Batteries Bolivia.";
