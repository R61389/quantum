"use client";

import { motion, AnimatePresence } from "motion/react";
import { X, Sparkles } from "lucide-react";

import { useAssistant } from "./context";
import { WhatsAppIcon } from "./whatsapp-icon";

export function WhatsAppFloatButton() {
  const { isOpen, openAssistant, closeAssistant } = useAssistant();

  return (
    <div className="fixed bottom-6 right-6 z-[60] flex flex-col items-end gap-3">
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0, transition: { delay: 1.2, duration: 0.5 } }}
            exit={{ opacity: 0, x: 16, transition: { duration: 0.25, delay: 0 } }}
            className="glass-strong hidden max-w-[220px] items-center gap-2 rounded-2xl px-4 py-3 text-xs text-foreground/80 shadow-xl sm:flex"
          >
            <Sparkles className="h-4 w-4 shrink-0 text-quantum-navy-light" />
            Habla con nuestro asistente de baterías de litio
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => (isOpen ? closeAssistant() : openAssistant())}
        aria-label={isOpen ? "Cerrar asistente" : "Abrir asistente de baterías de litio"}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        className="relative flex h-16 w-16 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_30px_-6px_rgba(37,211,102,0.6)]"
      >
        <motion.span
          aria-hidden
          className="absolute inset-0 rounded-full bg-[#25D366]"
          animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
        />
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.span
              key="close"
              initial={{ opacity: 0, rotate: -45 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 45 }}
              className="relative"
            >
              <X className="h-7 w-7" />
            </motion.span>
          ) : (
            <motion.span
              key="open"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              className="relative"
            >
              <WhatsAppIcon className="h-8 w-8" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
