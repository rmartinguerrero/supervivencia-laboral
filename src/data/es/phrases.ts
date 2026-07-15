// Frases en español por categoría

// getDay(): 0=Dom, 1=Lun, 2=Mar, 3=Mié, 4=Jue, 5=Vie, 6=Sáb
export const fridayPhrases: Record<number, string[]> = {
  0: [ // Domingo
    "¿Por qué estás aquí? Mañana empieza todo de nuevo.",
    "Domingo por la tarde: el deporte rey es la ansiedad.",
    "Domingo. Disfruta, que el lunes es inevitable.",
    "Estás mirando esto en domingo. Eso dice mucho de ti.",
  ],
  1: [ // Lunes
    "El viernes está tan lejos que parece una leyenda.",
    "Lunes. El día más mentiroso: \"esta semana será fácil\".",
    "Empieza el infierno semanal. Respira hondo.",
    "Hoy es lunes. El café es tu único amigo.",
  ],
  2: [ // Martes
    "Sobrevives.",
    "Martes: ni principios ni finales. Solo sufrimiento.",
    "Sigues aquí. Impresionante.",
    "Martes. Ni siquiera el café te salva ya.",
  ],
  3: [ // Miércoles
    "Mitad de semana. No te emociones.",
    "Miércoles: el día que no sabe si ser lunes o viernes.",
    "Ya llevas 3 días. Solo quedan 2. O eso dicen.",
    "Miércoles. Estás en punto muerto emocional.",
  ],
  4: [ // Jueves
    "Ya casi puedes fingir que trabajas pensando en el viernes.",
    "Jueves: el eve del paraíso.",
    "Un día más. Ya puedes oler el fin de semana.",
    "Jueves. Tu productividad es imaginar el viernes.",
  ],
  5: [ // Viernes
    "¡LO HAS CONSEGUIDO! Bueno, técnicamente todavía estás trabajando.",
    "Viernes. Has sobrevivido otra semana.",
    "El viernes es hoy. Pero el lunes también existirá.",
    "Viernes por la mañana: la felicidad más mentirosa.",
  ],
  6: [ // Sábado
    "¿Por qué estás aquí? Mañana tampoco trabajas.",
    "Es sábado. Ve a tocar césped o algo.",
    "Sábado: descansa, que el lunes vuelve el sufrimiento.",
  ],
};

// Salario bajo: <1400€  |  Medio: 1400-2000€  |  Alto: ≥2000€
export const salaryPhrases = {
  low: [
    "¡Ya casi puedes volver a ser pobre con dinero!",
    "El banco está preparando tu breve momento de felicidad.",
    "Aguanta un poquito más. El dinero viene... supuestamente.",
    "Casi. MUY CASI. Pero tampoco es mucho.",
    "Tu nómina está a la vuelta de la esquina. Una esquina pobre.",
    "No gastes todo el sueldo en las primeras 48 horas. Ah, espera, ya no queda nada.",
    "La espera es larga, pero el dinero tampoco es mucho.",
    "Respira. Cada día es un paso hacia la felicidad efímera.",
    "Qué lejos está el dinero. Qué cerca está el hambre.",
    "Esperemos que no se rompa nada en casa.",
  ],
  mid: [
    "Aguanta. Tú puedes. Quizás.",
    "No gastes todo el sueldo en las primeras 48 horas.",
    "La espera es larga, pero al menos el dinero es decente.",
    "Respira. Cada día es un paso hacia la felicidad efímera.",
    "Has sobrevivido otro mes. Increíble.",
    "Tu nómina está a la vuelta de la esquina. Pero no gastes de más.",
    "Casi. El dinero viene, pero primero hay que sufrir un poco.",
    "Clase media: ni ricos ni pobres. Solo cansados.",
  ],
  high: [
    "Eres rico. ¿Para qué miras el calendario de nóminas?",
    "Tu sueldo tiene sueldo. Ya casi puedes comprarte otra cosa innecesaria.",
    "No eres un trabajador. Eres un ejecutivo disfrazado mirando cuándo cae el pastizal.",
    "Con ese sueldo ya puedes mirar a los demás trabajadores con desprecio mientras esperas.",
    "El banco está preparando tu breve momento de felicidad. Aunque ya tienes bastante.",
    "¿Necesitas un becario para que te cuente cuánto falta?",
    "Todavía queda mucho. Piensa en positivo... o en comprar algo caro.",
    "Al menos tienes trabajo. Y un buen sueldo. Deja de quejarte.",
  ],
  extraSummer: [
    "La paga extra de verano. El oasis del desierto laboral.",
    "Verano: cuando los trabajadores sueñan con algo de dinero extra.",
    "La paga de verano es como un rayo de sol... después de 6 meses de lluvia.",
  ],
  extraChristmas: [
    "La paga de Navidad. Los Reyes Magos traen algo por fin.",
    "Navidad: la única época donde el trabajo da algo a cambio.",
    "La extra de diciembre. El regalo que te das a ti mismo.",
  ],
};

export const lifeSalaryPhrases = {
  high: [
    "Eres rico. Podrías pagarme el hosting.",
    "¿Necesitas un becario?",
    "Con ese sueldo ya puedes mirar a los demás trabajadores con desprecio.",
    "No eres un trabajador. Eres un ejecutivo disfrazado.",
    "Tu sueldo tiene sueldo.",
  ],
  mid: [
    "No eres rico, pero al menos puedes fingirlo durante 48 horas después de cobrar.",
    "La vida cuesta dinero y tú estás participando activamente.",
    "Estás en la media. Ni te quejes ni celebres.",
    "Tu sueldo paga las cuentas. Apenas.",
    "Clase media: el limbo del capitalismo.",
  ],
  low: [
    "Estás trabajando para poder seguir trabajando.",
    "Esto no es un sueldo. Es una prueba de resistencia.",
    "Estás jodido.",
    "Tu nómina necesita asistencia psicológica.",
    "Trabajas tanto que no tienes ni tiempo de gastar lo que ganas.",
    "Tu sueldo es un chiste. Pero no tiene gracia.",
  ],
};

export const retirementPhrases = {
  decades: [
    "Todavía queda mucho. Ponte cómodo.",
    "Décadas por delante. ¿Has pensado en hobbies?",
    "La jubilación es un mito que te cuentan para que trabajes.",
    "Tranquilo, el tiempo vuela... dicen.",
    "Siendo realistas, esto es una maratón, no un sprint.",
  ],
  years: [
    "Ya cuentas los años. Casi te puedo oler la desesperación.",
    "Algunos años más. Ya puedes empezar a planear qué hacer con tu tiempo libre... si es que queda.",
    "Aún hay esperanza. Pero poca.",
    "La jubilación se acerca. Como un tren lento, pero se acerca.",
    "Pocos años. Ya es hora de que empieces a odiar menos.",
  ],
  months: [
    "¡Solo faltan meses! Ya puedes empezar a no contestar emails.",
    "La luz al final del túnel... o es un tren.",
    "Menos de un año. Ya puedes empezar a dormir las siestas sin culpa.",
    "Pronto serás libre. Bueno, más o menos.",
    "Meses. Puedes empezar a mirar a los jóvenes con pena.",
  ],
  days: [
    "¡Casi! Ya puedes empezar a mirar a tu jefe con lástima.",
    "Quedan días. Pronto serás libre de verdad.",
    "Ya puedes ir despidiéndote de los emails.",
    "A pocos días. Ya puedes oler la libertad.",
    "Casi es tuyo. aguanta un poquito más.",
  ],
  today: [
    "¡¡¡HOY TE JUBILAS!!! ¡FIN DE LA ESCLAVITUD MODERNA!",
    "¡¡¡LIBERTAD!!! ¡¡¡HAN PASADO DÉCADAS!!!",
    "¡CONFIETI! ¡LLAMOS A TU JEFE PARA DECIRLE QUE NO VIENES EL LUNES!",
    "¡HOY EMPIEZA TU VIDA REAL! ...espera, ¿cuál era la vida real?",
  ],
};

export const bossHitsPhrases = [
  "REUNIÓN INNECESARIA",
  "EMAIL A LAS 23:48",
  "¿TIENES UN MINUTO?",
  "TRABAJO EN EQUIPO",
  "PONTE LA CAMISETA",
  "ESTO ES UNA FAMILIA",
  "HORA EXTRA NO REMUNERADA",
  "REVISAMOS EL BUDGET",
  "AGENDAMOS UNA REUNIÓN PARA HABLAR DE LA REUNIÓN",
  "Necesitamos tu compromiso",
  "Vengan con ideas frescas",
  "Esto tiene mucho potencial",
  "Pensad fuera de la caja",
  "El cliente es rey",
  "Hay que ser proactivo",
  "Sin excusas",
  "Resultados, no excusas",
  "Somos un equipo",
];

export const signatureCategories = [
  { id: 'jornada-4', label: 'Jornada laboral de 4 días' },
  { id: 'reduccion-horas', label: 'Reducción de horas' },
  { id: 'salir-hora', label: 'Salir a mi hora' },
  { id: 'mas-salario', label: 'Más salario' },
  { id: 'menos-reuniones', label: 'Menos reuniones' },
  { id: 'no-fuera-horario', label: 'No trabajar fuera de horario' },
  { id: 'vacaciones', label: 'Vacaciones' },
  { id: 'otro', label: 'Otro' },
];

export const homePhrases = [
  "Bienvenido a tu zona de supervivencia laboral.",
  "Aquí no se productiviza. Aquí se sobrevive.",
  "Tu jefe no sabe que existes. Nosotros sí.",
  "Herramientas para trabajadores quemados.",
  "La web que tu empresa no quiere que veas.",
];

export const getRandomItem = <T>(arr: T[]): T => {
  return arr[Math.floor(Math.random() * arr.length)];
};
