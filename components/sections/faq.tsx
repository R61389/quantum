import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { TextReveal } from "@/components/motion/text-reveal";
import { ScrollReveal } from "@/components/motion/scroll-reveal";

const faqs = [
  {
    question: "¿Cuánto dura una batería de litio LiFePO4 frente a una de plomo-ácido?",
    answer: "Una batería LiFePO4 bien diseñada soporta muchos más ciclos de carga y descarga que una de plomo-ácido equivalente, lo que se traduce en una vida útil considerablemente más larga y menor frecuencia de reemplazo, especialmente en uso intensivo.",
  },
  {
    question: "¿Puedo convertir mi sistema actual de plomo-ácido a litio sin cambiar todo el equipo?",
    answer: "En la mayoría de los casos sí. Evaluamos tu sistema actual (cargador, inversor, espacio disponible) durante el diagnóstico técnico y diseñamos el pack de litio y el BMS para integrarse con la infraestructura existente siempre que sea técnicamente viable.",
  },
  {
    question: "¿Qué garantía ofrecen sobre sus baterías y sistemas BMS?",
    answer: "Todos nuestros packs incluyen garantía sobre celdas y sistema BMS. El periodo exacto depende del tipo de aplicación, condiciones de uso y configuración del proyecto, y se detalla en cada cotización.",
  },
  {
    question: "¿Trabajan con proyectos industriales a gran escala?",
    answer: "Sí. Diseñamos soluciones desde sistemas UPS individuales hasta almacenamiento energético a escala industrial, con ingeniería, ensamblaje y soporte adaptados al volumen y complejidad del proyecto.",
  },
  {
    question: "¿Cómo funciona el diagnóstico y soporte remoto?",
    answer: "Los packs con telemetría permiten monitorear voltaje, temperatura y estado de cada celda de forma remota. Esto nos permite anticipar mantenimiento y ofrecer soporte técnico sin necesidad de intervención física inmediata.",
  },
  {
    question: "¿Fabrican baterías personalizadas para equipos específicos?",
    answer: "Sí. Diseñamos packs de litio a medida — dimensiones, capacidad, curva de descarga y configuración BMS — según los requerimientos técnicos exactos de tu equipo o aplicación.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="relative scroll-mt-28 py-28 lg:py-36">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <div className="flex justify-center">
            <Badge>Preguntas Frecuentes</Badge>
          </div>
          <TextReveal
            as="h2"
            text="Resolvemos tus dudas técnicas"
            className="mx-auto mt-5 justify-center text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl"
          />
        </div>

        <ScrollReveal className="mx-auto mt-14 max-w-2xl">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem key={faq.question} value={`item-${i}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </ScrollReveal>
      </div>
    </section>
  );
}
