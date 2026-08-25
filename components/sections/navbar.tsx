"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Zap } from "lucide-react";

import { Button } from "@/components/ui/button";
import { MagneticButton } from "@/components/motion/magnetic-button";
import { useAssistant } from "@/components/assistant/context";

const links = [
  { href: "#soluciones", label: "Soluciones" },
  { href: "#tecnologia", label: "Tecnología" },
  { href: "#laboratorio", label: "Laboratorio" },
  { href: "#casos-de-exito", label: "Casos de Éxito" },
  { href: "#proceso", label: "Proceso" },
  { href: "#faq", label: "FAQ" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { openAssistant } = useAssistant();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div className="container">
        <div
          className={`flex items-center justify-between rounded-2xl px-5 py-3 transition-all duration-500 ${
            scrolled ? "glass-strong" : "bg-transparent"
          }`}
        >
          <a href="#top" className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[linear-gradient(135deg,#00D4FF,#00FF88)]">
              <Zap className="h-5 w-5 text-black" strokeWidth={2.5} />
            </span>
            <span className="text-sm font-semibold tracking-tight text-white">
              QUANTUM <span className="text-white/50">BATTERIES</span>
            </span>
          </a>

          <nav className="hidden items-center gap-8 lg:flex">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-white/65 transition-colors hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden lg:block">
            <MagneticButton>
              <Button size="sm" onClick={() => openAssistant("identificar")}>
                Solicitar Cotización
              </Button>
            </MagneticButton>
          </div>

          <button
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setOpen((v) => !v)}
            className="rounded-lg border border-white/10 p-2 text-white lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="container overflow-hidden lg:hidden"
          >
            <div className="glass-strong mt-2 flex flex-col gap-1 rounded-2xl p-4">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm text-white/75 hover:bg-white/5 hover:text-white"
                >
                  {link.label}
                </a>
              ))}
              <Button
                size="sm"
                className="mt-2 w-full"
                onClick={() => {
                  setOpen(false);
                  openAssistant("identificar");
                }}
              >
                Solicitar Cotización
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
