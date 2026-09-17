# Revisión crítica de conversión — Quantum Batteries Bolivia

Rol: Director de Producto / UX-UI Senior / Copywriter B2B / Especialista en Conversión.
Objetivo: identificar qué reduce la conversión comercial de la landing actual, por qué, y qué cambiar — con impacto esperado.

Estado del sitio al momento de esta revisión: 14 secciones en una sola página de scroll (`app/page.tsx`), tema oscuro premium, paleta azul, asistente/asesor comercial con lead scoring ya integrado.

**Nota de implementación:** los hallazgos 1, 2, 5, 6 y 7 (reordenamiento de `LifetimePartner`, consolidación de `CaseStudies` a 4 categorías, enlace de navbar, CTAs intermedios y eliminación de la referencia a "Tesla Energy") ya fueron corregidos en el código como parte de esta misma revisión, por ser cambios de bajo riesgo y alta confianza. Los hallazgos 3 y 4 quedan documentados como recomendación pendiente: el 3 porque implica una decisión de rediseño de contenido más amplia, y el 4 porque depende de datos reales del cliente que no están disponibles en este repositorio.

---

## 1. Hallazgo crítico: el argumento comercial más fuerte está enterrado

**Qué pasa:** `LifetimePartner` — la sección "Tu aliado durante toda la vida útil de la batería", que contiene el mensaje que el propio brief define como uno de los argumentos comerciales principales ("No solo vendemos una batería. Te acompañamos durante toda su vida útil.") — está en la posición 9 de 14, después de `CaseStudies` y antes de `Process`. Para llegar ahí el visitante ya atravesó Hero → TrustedBy → Solutions → TechComparison → EngineeringLab → BmsSystem → CaseStudies: seis secciones técnicas antes de tocar el diferenciador de confianza.

**Por qué reduce conversión:** en B2B industrial, la confianza (garantía, soporte, continuidad del proveedor) suele pesar más que la ficha técnica al momento de decidir escribir. Un comprador que evalúa switching cost desde plomo-ácido quiere saber primero "¿qué pasa si algo falla en el año 3?" antes de leer sobre balanceo de celdas. Retrasar ese mensaje 6 secciones significa que una fracción de visitantes abandona antes de verlo — justo el argumento diseñado para vencer la objeción "¿y si el proveedor desaparece?".

**Cambio propuesto:** mover `LifetimePartner` a la posición inmediatamente después de `Solutions` (antes de `TechComparison`). Estructura sugerida: Hero → TrustedBy → Solutions → **LifetimePartner** → TechComparison → EngineeringLab → BmsSystem → CaseStudies → Process → Stats → Testimonials → FAQ → FinalCTA.

**Impacto esperado:** mayor probabilidad de que el visitante llegue al mensaje de confianza antes del punto de abandono típico (el "fold" técnico es donde más se pierde tráfico en landings largas). Refuerza la promesa antes de pedir el esfuerzo de leer contenido técnico.

---

## 2. Hallazgo crítico: `CaseStudies` contradice la reestructuración de `Solutions`

**Qué pasa:** El brief pidió exactamente 4 categorías de solución (Soluciones Personalizadas, Montacargas, Energía Solar, Electromovilidad), y así quedó `Solutions` (`components/sections/solutions.tsx`). Pero `CaseStudies` (`components/sections/case-studies.tsx`) sigue mostrando **6 sectores**: Industria, Energía Solar, Minería, Montacargas, Electromovilidad, Equipos Especializados. "Industria" y "Equipos Especializados" no existen como categoría en ningún otro punto del sitio (ni en Solutions, ni en las opciones del flujo comercial del asesor, que sólo ofrece Solar/Montacargas/Electromovilidad/Personalizada).

**Por qué reduce conversión:** rompe la promesa central del brief — "toda la landing debe girar alrededor de la solución del cliente, no del producto" — al reintroducir una taxonomía de catálogo justo después de haberla eliminado. Un visitante que llegó convencido de que existen 4 rutas claras ve luego 6 sectores distintos y pierde la sensación de claridad/enfoque que se buscaba. También genera fricción de datos: si un visitante llega desde el caso "Minería", no tiene un botón de asesor comercial que ofrezca "Minería" como opción — el flujo de calificación de leads no cubre ese caso.

**Cambio propuesto:** reducir `CaseStudies` a los mismos 4 sectores de `Solutions` (fusionar "Minería" y "Equipos Especializados" dentro de "Soluciones Personalizadas", ya que ambos son, por definición, proyectos a medida). Cada card de caso debería enlazar/mapear explícitamente a una de las 4 categorías, reforzando la consistencia en vez de fragmentarla.

**Impacto esperado:** mensaje más consistente y creíble; reduce la carga cognitiva; alinea 1:1 los casos de éxito con las opciones reales que el asesor comercial ofrece, evitando que un lead llegue con una expectativa ("mi caso es minería") que el flujo de calificación no reconoce.

---

## 3. Hallazgo crítico: exceso de contenido técnico "cómo lo hacemos" repetido tres veces

**Qué pasa:** `TechComparison`, `EngineeringLab` y `BmsSystem` — tres secciones consecutivas — comunican esencialmente lo mismo desde ángulos distintos: "nuestra ingeniería es rigurosa y confiable". Son 3 de las 14 secciones (>20% del scroll total) dedicadas a profundidad técnica de producto, justo lo opuesto al mandato de orientar todo hacia la solución del cliente.

**Por qué reduce conversión:** para un comprador B2B industrial que ya decidió confiar (por el diferenciador de garantía/soporte, ver hallazgo 1), tres secciones técnicas seguidas antes de llegar a prueba social (`CaseStudies`, `Testimonials`) y al CTA final es fricción innecesaria. Alarga el tiempo hasta la conversión y aumenta la tasa de abandono a mitad de página — el punto más común de drop-off en landings largas.

**Cambio propuesto:** consolidar `TechComparison` + `BmsSystem` en una sola sección con tabs o acordeón (comparador de químicas y monitoreo BMS son ambos "por qué confiar en la tecnología", pueden convivir). Mantener `EngineeringLab` como la única sección de "cómo fabricamos". Esto reduce el total de secciones de 14 a 12-13 sin perder información, solo comprimiendo su presentación.

**Impacto esperado:** scroll más corto, mayor tasa de visitantes que llegan al CTA final y al asesor comercial; menor fatiga de lectura antes del punto de decisión.

---

## 4. Hallazgo alto: datos de prueba social marcados como ilustrativos, no reales

**Qué pasa:** `Stats`, `CaseStudies` y `Testimonials` tienen comentarios explícitos en el código señalando que las cifras y citas son representativas/ilustrativas, no datos verificados ("Illustrative figures — replace with verified real metrics before production launch", "Representative testimonial themes — replace with real, attributed client quotes", "Representative project archetypes — replace with real client case studies"). `TrustedBy` también usa "Placeholder sector badges — swap for real client/institution logos before launch."

**Por qué reduce conversión:** son exactamente los elementos que construyen confianza (prueba social, cifras de impacto, logos de clientes) — y actualmente son ficticios. Publicar la landing así no solo no ayuda a la conversión: es un riesgo reputacional y potencialmente legal si un cliente pregunta por un caso o testimonio que no existe. No es un problema de diseño, es un bloqueador de lanzamiento.

**Cambio propuesto:** antes de cualquier lanzamiento a producción, sustituir estas 4 secciones con datos reales (proyectos ejecutados, testimonios atribuibles con consentimiento del cliente, logos autorizados). Si aún no existen suficientes casos reales, es preferible mostrar menos elementos pero verídicos (p. ej. 2 casos reales) que 6 casos genéricos — la autenticidad convierte más que el volumen.

**Impacto esperado:** evita el riesgo de credibilidad/legal; cuando se reemplace con datos reales, mejora directa en confianza percibida, que es el driver #1 de conversión en ventas B2B de alto ticket.

---

## 5. Hallazgo medio: el diferenciador de "acompañamiento de por vida" no tiene entrada en el menú de navegación

**Qué pasa:** el navbar (`components/sections/navbar.tsx`) enlaza a `#soluciones`, `#tecnologia`, `#laboratorio`, `#casos-de-exito`, `#proceso`, `#faq` — pero `LifetimePartner` no tiene un `id` ni aparece en esa lista, a pesar de ser, según el propio brief, uno de los argumentos comerciales principales.

**Por qué reduce conversión:** un visitante que llega con la objeción específica "¿qué pasa después de la venta?" no tiene forma de saltar directo a la respuesta — tiene que hacer scroll completo confiando en encontrarla. En un sitio orientado a decisión rápida de compradores ocupados, cada objeción clave debería ser accesible en un clic desde el menú.

**Cambio propuesto:** agregar `id="garantia"` (o similar) a la sección y un enlace "Garantía y Soporte" en el navbar, idealmente cerca del principio de la lista dado su peso comercial.

**Impacto esperado:** mejora la capacidad de autoservicio de visitantes que llegan con esa objeción específica (tráfico de retargeting o de búsqueda con intención de comparación de proveedores).

---

## 6. Hallazgo medio: no hay CTA intermedio después de las secciones de mayor intención de compra

**Qué pasa:** actualmente solo existen 3 puntos de entrada al asesor comercial: Hero, Navbar y FinalCTA (además del botón flotante de WhatsApp, siempre visible). No hay ningún CTA embebido después de `Solutions`, `LifetimePartner` o `CaseStudies` — los tres momentos de mayor intención de conversión, donde el visitante ya está convencido de la propuesta de valor específica a su caso.

**Por qué reduce conversión:** obliga al visitante interesado a recordar volver arriba o hacer scroll hasta el final para actuar. Cuanto más lejos está el CTA del momento de mayor interés, menor la tasa de clic — es un principio básico de landing pages de alta conversión.

**Cambio propuesto:** agregar un CTA secundario contextual al final de `Solutions` ("¿Tu caso no encaja en ninguna? Cuéntanos tu proyecto →") y otro al final de `CaseStudies` o `LifetimePartner`, ambos abriendo `openAssistant("comercial")`.

**Impacto esperado:** captura leads en el momento de mayor intención en vez de depender de que lleguen al final de una página de 12-14 secciones; suele traducirse en un aumento medible de la tasa de apertura del asesor comercial.

---

## 7. Hallazgo bajo: referencia directa a "Tesla Energy" como inspiración de filosofía de producto

**Qué pasa:** `BmsSystem` describe el sistema BMS como "inspirado en la filosofía de monitoreo de Tesla Energy". Es una referencia de inspiración, no una afirmación de afiliación, pero puede leerse como una asociación de marca no autorizada, especialmente en materiales que eventualmente podrían usarse en publicidad paga o prensa.

**Cambio propuesto:** reemplazar por una descripción sin nombre de marca de terceros — p. ej. "inspirado en los estándares de monitoreo de la industria de almacenamiento energético a gran escala" — preservando el mismo nivel de autoridad percibida sin el riesgo de marca.

**Impacto esperado:** elimina un riesgo legal/de marca menor pero innecesario; no afecta negativamente la percepción de calidad si se redacta bien.

---

## 8. Lo que ya está bien resuelto (no tocar)

- La transformación del asistente en filtro comercial con lead scoring (`lib/assistant/lead-scoring.ts`, `components/assistant/views/consultation-view.tsx`) responde directamente al mandato #4 del brief: identifica intención real, clasifica al lead (tibio/caliente/prioritario) y prioriza el contacto comercial en vez de solo informar.
- Los 4 CTAs primarios del sitio (Hero, Navbar desktop/mobile, FinalCTA) ya abren el flujo comercial (`openAssistant("comercial")`) en lugar del flujo de identificación de batería — el punto de entrada por defecto ahora es calificación de lead, no catálogo.
- `Solutions` con estructura Problema/Solución/Beneficio/ROI es el patrón correcto para B2B orientado a valor, y debería usarse como plantilla si se rediseña `CaseStudies` (hallazgo 2).
- El FAQ del asesor cubre los 9 temas requeridos por el brief (vida útil, garantías, comparación con plomo-ácido, ROI, costos, aplicaciones industriales, compatibilidad, instalación, seguridad).

---

## Resumen priorizado

| # | Hallazgo | Severidad | Esfuerzo | Estado |
|---|----------|-----------|----------|--------|
| 1 | Diferenciador de garantía/soporte enterrado en la posición 9/14 | Alta | Bajo (reordenar import en `page.tsx`) | ✅ Corregido |
| 2 | CaseStudies con 6 sectores vs. 4 categorías de Solutions | Alta | Medio (reescribir contenido de la sección) | ✅ Corregido |
| 3 | 3 secciones técnicas consecutivas y redundantes | Alta | Medio-alto (fusión de secciones) | Pendiente |
| 4 | Prueba social (stats/casos/testimonios/logos) es ficticia | Crítica para lanzamiento | Depende de disponibilidad de datos reales del cliente | Pendiente (bloqueador de lanzamiento) |
| 5 | Diferenciador de garantía sin entrada en el navbar | Media | Bajo | ✅ Corregido |
| 6 | Sin CTA intermedio en momentos de alta intención | Media | Bajo | ✅ Corregido |
| 7 | Referencia de marca de terceros ("Tesla Energy") | Baja | Trivial | ✅ Corregido |

Los hallazgos 1, 5 y 6 pueden resolverse en la misma sesión de trabajo sin riesgo (son reordenamientos y adiciones de enlaces/CTA). El hallazgo 2 requiere reescribir copy de `CaseStudies`. El hallazgo 4 depende de que el cliente entregue datos reales — es, con diferencia, el bloqueador más importante antes de cualquier lanzamiento a producción, por encima de cualquier ajuste visual.
