import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

const faqs = [
  {
    question: "¿Cuánto dura una batería de litio LiFePO4?",
    answer:
      "Entre 3,000 y 6,000 ciclos de carga/descarga según la aplicación y el régimen de uso — en operación diaria típica eso equivale a 8-12 años de vida útil, frente a los 1-2 años de una batería de plomo-ácido equivalente. La vida útil real depende de la profundidad de descarga, la temperatura de operación y la calidad del BMS.",
  },
  {
    question: "¿Qué garantía ofrecen y qué cubre?",
    answer:
      "Garantía nacional sobre celdas y sistema de gestión de batería (BMS), con periodo exacto según la aplicación (se detalla en cada cotización). A diferencia de un importador o un proveedor extranjero, el respaldo se gestiona localmente: no dependes de reclamos internacionales ni de tiempos de espera de meses.",
  },
  {
    question: "¿Litio vs. plomo-ácido: cuál conviene realmente?",
    answer:
      "El litio cuesta más al inicio, pero en el costo total de propiedad (TCO) gana: 3-5x más ciclos de vida, carga hasta 5x más rápida, sin mantenimiento (no hay agua ni sulfatación), peso ~50% menor, y mantiene su capacidad incluso a descargas profundas. Para uso industrial con ciclos diarios, el punto de equilibrio frente al plomo-ácido suele llegar antes de los 2 años.",
  },
  {
    question: "¿Cuál es el retorno de inversión (ROI) esperado?",
    answer:
      "Depende de la aplicación, pero los ahorros vienen de tres frentes: menor costo operativo (sin reemplazos frecuentes ni mantenimiento), menor tiempo muerto (mayor disponibilidad de equipo) y mayor productividad (cargas más rápidas). En montacargas y flotas de electromovilidad, clientes suelen recuperar la inversión adicional frente a plomo-ácido en 18-30 meses de operación continua.",
  },
  {
    question: "¿Cómo se estructuran los costos?",
    answer:
      "La cotización se arma según voltaje, capacidad (Ah) y BMS requerido para tu aplicación — no vendemos packs genéricos de catálogo. Usa la Calculadora de Litio o cuéntanos tu proyecto y te enviamos una cotización con el detalle de costos por componente.",
  },
  {
    question: "¿Para qué aplicaciones industriales sirve el litio?",
    answer:
      "Montacargas y equipo de manejo de materiales, energía solar (residencial e industrial), electromovilidad (flotas y vehículos eléctricos), y soluciones personalizadas para minería, manufactura, agroindustria y centros de distribución. Cada aplicación tiene requisitos distintos de voltaje, ciclos y BMS — por eso diseñamos a medida.",
  },
  {
    question: "¿Es compatible con mi sistema actual?",
    answer:
      "En la mayoría de los casos sí, sin cambiar todo el equipo. Usa 'Diagnóstico Guiado' o 'Identificar mi Batería' para que evaluemos voltaje, dimensiones y conector de tu sistema actual y confirmemos el equivalente correcto en litio.",
  },
  {
    question: "¿Cómo es el proceso de instalación?",
    answer:
      "Para reemplazos directos (mismo voltaje y dimensiones), la instalación es sencilla y no requiere modificar el equipo. Para proyectos nuevos o de mayor escala, nuestro equipo técnico acompaña el dimensionamiento e instalación en sitio. Siempre incluimos asesoramiento técnico durante la puesta en marcha.",
  },
  {
    question: "¿Qué tan segura es una batería de litio LiFePO4?",
    answer:
      "LiFePO4 es la química de litio más segura disponible: es térmicamente estable, no es propensa a fuga térmica (thermal runaway) como el NMC, y cada pack incluye un BMS que protege contra sobrecarga, sobredescarga, cortocircuito y temperatura excesiva. Es el estándar preferido para uso industrial y estacionario precisamente por su perfil de seguridad.",
  },
  {
    question: "¿Qué pasa después de la compra? ¿Solo me venden y ya?",
    answer:
      "No. Te acompañamos durante toda la vida útil de la batería: soporte técnico permanente, programa de reciclaje al final de su vida útil, y atención postventa real con presencia nacional — cuando otros proveedores desaparecen después de la venta, nosotros seguimos disponibles.",
  },
];

export function FaqView() {
  return (
    <div>
      <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
        Respuestas técnicas y comerciales a las dudas más comunes. Si tu
        proyecto necesita algo más específico, cuéntanos y te conectamos con
        un asesor.
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
