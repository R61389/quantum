import { Zap, Mail, Phone, MapPin, Linkedin, Instagram, Facebook, Youtube } from "lucide-react";

const footerNav = {
  Empresa: [
    { label: "Laboratorio", href: "#laboratorio" },
    { label: "Casos de Éxito", href: "#casos-de-exito" },
    { label: "Proceso de Trabajo", href: "#proceso" },
    { label: "Preguntas Frecuentes", href: "#faq" },
  ],
  Soluciones: [
    { label: "Conversión a Litio", href: "#soluciones" },
    { label: "Sistemas UPS", href: "#soluciones" },
    { label: "Energía Solar", href: "#soluciones" },
    { label: "Montacargas", href: "#soluciones" },
    { label: "Electromovilidad", href: "#soluciones" },
  ],
};

// Placeholder contact details — replace with verified real business info before launch.
const contact = {
  email: "contacto@quantumbatteries.bo",
  phone: "+591 2 000 0000",
  location: "La Paz, Bolivia",
};

const social = [
  { icon: Linkedin, label: "LinkedIn", href: "#" },
  { icon: Instagram, label: "Instagram", href: "#" },
  { icon: Facebook, label: "Facebook", href: "#" },
  { icon: Youtube, label: "YouTube", href: "#" },
];

export function Footer() {
  return (
    <footer className="relative border-t border-foreground/10 pb-10 pt-20">
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <a href="#top" className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[linear-gradient(135deg,#00205B,#4968A2)]">
                <Zap className="h-5 w-5 text-white" strokeWidth={2.5} />
              </span>
              <span className="text-sm font-semibold tracking-tight text-foreground">
                QUANTUM <span className="text-foreground/50">BATTERIES</span>
              </span>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Ingeniería, ensamblaje y modernización de baterías de litio de
              alto rendimiento para aplicaciones industriales y energéticas
              en Bolivia.
            </p>
            <div className="mt-6 flex gap-3">
              {social.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-foreground/10 text-foreground/50 transition-colors hover:border-primary/40 hover:text-foreground"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerNav).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-sm font-semibold text-foreground">{title}</h3>
              <ul className="mt-4 space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="text-sm font-semibold text-foreground">Contacto</h3>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-quantum-navy-light" />
                <a href={`mailto:${contact.email}`} className="hover:text-foreground">
                  {contact.email}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-quantum-navy-light" />
                <a href={`tel:${contact.phone.replace(/\s+/g, "")}`} className="hover:text-foreground">
                  {contact.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MapPin className="h-4 w-4 shrink-0 text-quantum-navy-light" />
                {contact.location}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-foreground/10 pt-8 sm:flex-row">
          <p className="text-xs text-foreground/40">
            © {new Date().getFullYear()} Quantum Batteries Bolivia. Todos los derechos reservados.
          </p>
          <p className="text-xs text-foreground/40">Ingeniería de Litio · Bolivia</p>
        </div>
      </div>
    </footer>
  );
}
