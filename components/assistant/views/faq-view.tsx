import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

const faqs = [
  {
    question: "¿Qué diferencia hay entre LiFePO4 y NMC?",
    answer: "LiFePO4 prioriza seguridad y ciclo de vida (ideal para uso industrial, UPS y solar). NMC prioriza densidad energética en menor espacio (ideal para electromovilidad ligera).",
  },
  {
    question: "¿Cuánto dura una batería de litio frente a una de plomo-ácido?",
    answer: "Una LiFePO4 bien diseñada soporta muchos más ciclos que una de plomo-ácido equivalente, lo que se traduce en una vida útil considerablemente más larga.",
  },
  {
    question: "¿Puedo convertir mi sistema actual sin cambiar todo el equipo?",
    answer: "En la mayoría de los casos sí. Usa 'Diagnóstico Guiado' o 'Identificar mi Batería' para que evaluemos tu caso específico.",
  },
  {
    question: "¿Qué garantía ofrecen?",
    answer: "Todos los packs incluyen garantía sobre celdas y BMS. El periodo exacto depende de la aplicación y se detalla en cada cotización.",
  },
  {
    question: "¿Cómo pido una cotización?",
    answer: "Puedes usar la Calculadora de Litio o Identificar mi Batería, y al final enviar el resumen directo a un ingeniero por WhatsApp.",
  },
];

export function FaqView() {
  return (
    <div>
      <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
        Respuestas rápidas a las dudas más comunes. Si no encuentras lo que
        buscas, puedes hablar directo con un ingeniero.
      </p>
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, i) => (
          <AccordionItem key={faq.question} value={`item-${i}`}>
            <AccordionTrigger className="py-4 text-sm">{faq.question}</AccordionTrigger>
            <AccordionContent className="pb-4 text-xs">{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
