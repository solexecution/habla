/*
 * Hablá — 187 high-frequency Spanish words & phrases for starting conversations.
 *
 * Each entry: { es, en, pron, cat }
 *   es   — Spanish
 *   en   — English meaning
 *   pron — light phonetic hint for English speakers (stress in CAPS)
 *   cat  — category key (see CATEGORIES below)
 *
 * The set is deliberately weighted toward greetings, courtesy, introductions
 * and icebreaker questions — the words that actually get a conversation going —
 * then rounded out with the connectors, verbs, numbers and time words you reach
 * for in almost every exchange.
 */

const CATEGORIES = {
  saludos:      "Greetings & goodbyes",
  cortesia:     "Politeness",
  presentarse:  "Introducing yourself",
  preguntas:    "Icebreaker questions",
  respuestas:   "Common responses",
  interrog:     "Question words",
  sentimientos: "Feelings & states",
  verbos:       "Essential verbs",
  conectores:   "Connectors & fillers",
  numeros:      "Numbers",
  tiempo:       "Time & days",
  personas:     "People & family",
  lugares:      "Common places",
  utiles:       "Useful nouns",
};

const WORDS = [
  // ── Saludos y despedidas (15) ──────────────────────────────
  { es: "hola", en: "hi / hello", pron: "OH-lah", cat: "saludos" },
  { es: "buenos días", en: "good morning", pron: "BWEH-nohs DEE-ahs", cat: "saludos" },
  { es: "buenas tardes", en: "good afternoon", pron: "BWEH-nahs TAR-dehs", cat: "saludos" },
  { es: "buenas noches", en: "good evening / good night", pron: "BWEH-nahs NOH-chehs", cat: "saludos" },
  { es: "¿qué tal?", en: "how's it going?", pron: "keh TAHL", cat: "saludos" },
  { es: "¿cómo estás?", en: "how are you?", pron: "KOH-moh ehs-TAHS", cat: "saludos" },
  { es: "¿cómo está usted?", en: "how are you? (formal)", pron: "KOH-moh ehs-TAH oos-TEHD", cat: "saludos" },
  { es: "¿qué onda?", en: "what's up? (casual)", pron: "keh OHN-dah", cat: "saludos" },
  { es: "adiós", en: "goodbye", pron: "ah-DYOHS", cat: "saludos" },
  { es: "chau", en: "bye", pron: "chow", cat: "saludos" },
  { es: "hasta luego", en: "see you later", pron: "AHS-tah LWEH-goh", cat: "saludos" },
  { es: "hasta mañana", en: "see you tomorrow", pron: "AHS-tah mah-NYAH-nah", cat: "saludos" },
  { es: "hasta pronto", en: "see you soon", pron: "AHS-tah PROHN-toh", cat: "saludos" },
  { es: "nos vemos", en: "see you", pron: "nohs VEH-mohs", cat: "saludos" },
  { es: "bienvenido", en: "welcome", pron: "byehn-veh-NEE-doh", cat: "saludos" },

  // ── Cortesía (12) ─────────────────────────────────────────
  { es: "por favor", en: "please", pron: "por fah-VOR", cat: "cortesia" },
  { es: "gracias", en: "thank you", pron: "GRAH-syahs", cat: "cortesia" },
  { es: "muchas gracias", en: "thank you very much", pron: "MOO-chahs GRAH-syahs", cat: "cortesia" },
  { es: "de nada", en: "you're welcome", pron: "deh NAH-dah", cat: "cortesia" },
  { es: "con gusto", en: "my pleasure", pron: "kohn GOOS-toh", cat: "cortesia" },
  { es: "perdón", en: "sorry / excuse me", pron: "per-DOHN", cat: "cortesia" },
  { es: "disculpa", en: "excuse me (informal)", pron: "dees-KOOL-pah", cat: "cortesia" },
  { es: "lo siento", en: "I'm sorry", pron: "loh SYEHN-toh", cat: "cortesia" },
  { es: "con permiso", en: "excuse me (passing by)", pron: "kohn per-MEE-soh", cat: "cortesia" },
  { es: "no hay problema", en: "no problem", pron: "noh eye proh-BLEH-mah", cat: "cortesia" },
  { es: "salud", en: "cheers / bless you", pron: "sah-LOOD", cat: "cortesia" },
  { es: "encantado", en: "delighted (to meet you)", pron: "ehn-kahn-TAH-doh", cat: "cortesia" },

  // ── Presentarse (15) ──────────────────────────────────────
  { es: "me llamo…", en: "my name is…", pron: "meh YAH-moh", cat: "presentarse" },
  { es: "soy…", en: "I am…", pron: "soy", cat: "presentarse" },
  { es: "mi nombre es…", en: "my name is…", pron: "mee NOHM-breh ehs", cat: "presentarse" },
  { es: "¿cómo te llamas?", en: "what's your name?", pron: "KOH-moh teh YAH-mahs", cat: "presentarse" },
  { es: "mucho gusto", en: "nice to meet you", pron: "MOO-choh GOOS-toh", cat: "presentarse" },
  { es: "igualmente", en: "likewise", pron: "ee-gwahl-MEHN-teh", cat: "presentarse" },
  { es: "soy de…", en: "I'm from…", pron: "soy deh", cat: "presentarse" },
  { es: "¿de dónde eres?", en: "where are you from?", pron: "deh DOHN-deh EH-rehs", cat: "presentarse" },
  { es: "vivo en…", en: "I live in…", pron: "VEE-voh ehn", cat: "presentarse" },
  { es: "tengo … años", en: "I'm … years old", pron: "TEHN-goh … AH-nyohs", cat: "presentarse" },
  { es: "trabajo en…", en: "I work in / at…", pron: "trah-BAH-hoh ehn", cat: "presentarse" },
  { es: "estudio…", en: "I study…", pron: "ehs-TOO-dyoh", cat: "presentarse" },
  { es: "hablo un poco de español", en: "I speak a little Spanish", pron: "AH-bloh oon POH-koh deh ehs-pah-NYOHL", cat: "presentarse" },
  { es: "estoy aprendiendo español", en: "I'm learning Spanish", pron: "ehs-TOY ah-prehn-DYEHN-doh ehs-pah-NYOHL", cat: "presentarse" },
  { es: "este es mi amigo", en: "this is my friend", pron: "EHS-teh ehs mee ah-MEE-goh", cat: "presentarse" },

  // ── Preguntas para romper el hielo (15) ───────────────────
  { es: "¿cómo te va?", en: "how's it going for you?", pron: "KOH-moh teh vah", cat: "preguntas" },
  { es: "¿qué haces?", en: "what do you do? / what are you doing?", pron: "keh AH-sehs", cat: "preguntas" },
  { es: "¿a qué te dedicas?", en: "what do you do (for work)?", pron: "ah keh teh deh-DEE-kahs", cat: "preguntas" },
  { es: "¿qué te gusta hacer?", en: "what do you like to do?", pron: "keh teh GOOS-tah ah-SEHR", cat: "preguntas" },
  { es: "¿tienes hermanos?", en: "do you have siblings?", pron: "TYEH-nehs er-MAH-nohs", cat: "preguntas" },
  { es: "¿de qué parte eres?", en: "what part are you from?", pron: "deh keh PAR-teh EH-rehs", cat: "preguntas" },
  { es: "¿hablas inglés?", en: "do you speak English?", pron: "AH-blahs een-GLEHS", cat: "preguntas" },
  { es: "¿qué música te gusta?", en: "what music do you like?", pron: "keh MOO-see-kah teh GOOS-tah", cat: "preguntas" },
  { es: "¿tienes planes?", en: "do you have plans?", pron: "TYEH-nehs PLAH-nehs", cat: "preguntas" },
  { es: "¿cuál es tu comida favorita?", en: "what's your favorite food?", pron: "kwahl ehs too koh-MEE-dah fah-voh-REE-tah", cat: "preguntas" },
  { es: "¿te gusta viajar?", en: "do you like to travel?", pron: "teh GOOS-tah vyah-HAR", cat: "preguntas" },
  { es: "¿vienes seguido?", en: "do you come here often?", pron: "VYEH-nehs seh-GEE-doh", cat: "preguntas" },
  { es: "¿qué recomiendas?", en: "what do you recommend?", pron: "keh reh-koh-MYEHN-dahs", cat: "preguntas" },
  { es: "¿me puedes ayudar?", en: "can you help me?", pron: "meh PWEH-dehs ah-yoo-DAR", cat: "preguntas" },
  { es: "¿nos conocemos?", en: "have we met?", pron: "nohs koh-noh-SEH-mohs", cat: "preguntas" },

  // ── Respuestas comunes (12) ───────────────────────────────
  { es: "sí", en: "yes", pron: "see", cat: "respuestas" },
  { es: "no", en: "no", pron: "noh", cat: "respuestas" },
  { es: "bien", en: "well / fine", pron: "byehn", cat: "respuestas" },
  { es: "muy bien", en: "very well", pron: "mwee byehn", cat: "respuestas" },
  { es: "más o menos", en: "so-so", pron: "mahs oh MEH-nohs", cat: "respuestas" },
  { es: "claro", en: "of course / sure", pron: "KLAH-roh", cat: "respuestas" },
  { es: "por supuesto", en: "of course", pron: "por soo-PWEHS-toh", cat: "respuestas" },
  { es: "está bien", en: "it's okay / alright", pron: "ehs-TAH byehn", cat: "respuestas" },
  { es: "no sé", en: "I don't know", pron: "noh seh", cat: "respuestas" },
  { es: "no entiendo", en: "I don't understand", pron: "noh ehn-TYEHN-doh", cat: "respuestas" },
  { es: "tal vez", en: "maybe", pron: "tahl vehs", cat: "respuestas" },
  { es: "creo que sí", en: "I think so", pron: "KREH-oh keh see", cat: "respuestas" },

  // ── Palabras de pregunta (10) ─────────────────────────────
  { es: "qué", en: "what", pron: "keh", cat: "interrog" },
  { es: "quién", en: "who", pron: "kyehn", cat: "interrog" },
  { es: "dónde", en: "where", pron: "DOHN-deh", cat: "interrog" },
  { es: "cuándo", en: "when", pron: "KWAHN-doh", cat: "interrog" },
  { es: "por qué", en: "why", pron: "por KEH", cat: "interrog" },
  { es: "cómo", en: "how", pron: "KOH-moh", cat: "interrog" },
  { es: "cuál", en: "which", pron: "kwahl", cat: "interrog" },
  { es: "cuánto", en: "how much", pron: "KWAHN-toh", cat: "interrog" },
  { es: "cuántos", en: "how many", pron: "KWAHN-tohs", cat: "interrog" },
  { es: "para qué", en: "what for", pron: "PAH-rah keh", cat: "interrog" },

  // ── Sentimientos y estados (12) ───────────────────────────
  { es: "feliz", en: "happy", pron: "feh-LEES", cat: "sentimientos" },
  { es: "triste", en: "sad", pron: "TREES-teh", cat: "sentimientos" },
  { es: "cansado", en: "tired", pron: "kahn-SAH-doh", cat: "sentimientos" },
  { es: "contento", en: "glad / content", pron: "kohn-TEHN-toh", cat: "sentimientos" },
  { es: "emocionado", en: "excited", pron: "eh-moh-syoh-NAH-doh", cat: "sentimientos" },
  { es: "nervioso", en: "nervous", pron: "ner-VYOH-soh", cat: "sentimientos" },
  { es: "tengo hambre", en: "I'm hungry", pron: "TEHN-goh AHM-breh", cat: "sentimientos" },
  { es: "tengo sed", en: "I'm thirsty", pron: "TEHN-goh sehd", cat: "sentimientos" },
  { es: "tengo frío", en: "I'm cold", pron: "TEHN-goh FREE-oh", cat: "sentimientos" },
  { es: "tengo calor", en: "I'm hot", pron: "TEHN-goh kah-LOR", cat: "sentimientos" },
  { es: "estoy bien", en: "I'm fine", pron: "ehs-TOY byehn", cat: "sentimientos" },
  { es: "estoy ocupado", en: "I'm busy", pron: "ehs-TOY oh-koo-PAH-doh", cat: "sentimientos" },

  // ── Verbos esenciales (20) ────────────────────────────────
  { es: "ser", en: "to be (permanent)", pron: "sehr", cat: "verbos" },
  { es: "estar", en: "to be (state/place)", pron: "ehs-TAR", cat: "verbos" },
  { es: "tener", en: "to have", pron: "teh-NEHR", cat: "verbos" },
  { es: "hacer", en: "to do / make", pron: "ah-SEHR", cat: "verbos" },
  { es: "ir", en: "to go", pron: "eer", cat: "verbos" },
  { es: "venir", en: "to come", pron: "veh-NEER", cat: "verbos" },
  { es: "querer", en: "to want / love", pron: "keh-REHR", cat: "verbos" },
  { es: "poder", en: "to be able to / can", pron: "poh-DEHR", cat: "verbos" },
  { es: "saber", en: "to know (facts)", pron: "sah-BEHR", cat: "verbos" },
  { es: "conocer", en: "to know (people/places)", pron: "koh-noh-SEHR", cat: "verbos" },
  { es: "hablar", en: "to speak", pron: "ah-BLAR", cat: "verbos" },
  { es: "decir", en: "to say / tell", pron: "deh-SEER", cat: "verbos" },
  { es: "comer", en: "to eat", pron: "koh-MEHR", cat: "verbos" },
  { es: "beber", en: "to drink", pron: "beh-BEHR", cat: "verbos" },
  { es: "gustar", en: "to like (be pleasing)", pron: "goos-TAR", cat: "verbos" },
  { es: "entender", en: "to understand", pron: "ehn-tehn-DEHR", cat: "verbos" },
  { es: "necesitar", en: "to need", pron: "neh-seh-see-TAR", cat: "verbos" },
  { es: "ayudar", en: "to help", pron: "ah-yoo-DAR", cat: "verbos" },
  { es: "trabajar", en: "to work", pron: "trah-bah-HAR", cat: "verbos" },
  { es: "vivir", en: "to live", pron: "vee-VEER", cat: "verbos" },

  // ── Conectores y muletillas (12) ──────────────────────────
  { es: "y", en: "and", pron: "ee", cat: "conectores" },
  { es: "pero", en: "but", pron: "PEH-roh", cat: "conectores" },
  { es: "porque", en: "because", pron: "POR-keh", cat: "conectores" },
  { es: "también", en: "also / too", pron: "tahm-BYEHN", cat: "conectores" },
  { es: "entonces", en: "so / then", pron: "ehn-TOHN-sehs", cat: "conectores" },
  { es: "pues", en: "well… (filler)", pron: "pwehs", cat: "conectores" },
  { es: "o sea", en: "I mean / that is", pron: "oh SEH-ah", cat: "conectores" },
  { es: "además", en: "besides / moreover", pron: "ah-deh-MAHS", cat: "conectores" },
  { es: "por eso", en: "that's why", pron: "por EH-soh", cat: "conectores" },
  { es: "aunque", en: "although", pron: "AH-oon-keh", cat: "conectores" },
  { es: "mientras", en: "while", pron: "MYEHN-trahs", cat: "conectores" },
  { es: "sin embargo", en: "however", pron: "seen ehm-BAR-goh", cat: "conectores" },

  // ── Números (16) ──────────────────────────────────────────
  { es: "cero", en: "zero", pron: "SEH-roh", cat: "numeros" },
  { es: "uno", en: "one", pron: "OO-noh", cat: "numeros" },
  { es: "dos", en: "two", pron: "dohs", cat: "numeros" },
  { es: "tres", en: "three", pron: "trehs", cat: "numeros" },
  { es: "cuatro", en: "four", pron: "KWAH-troh", cat: "numeros" },
  { es: "cinco", en: "five", pron: "SEEN-koh", cat: "numeros" },
  { es: "seis", en: "six", pron: "says", cat: "numeros" },
  { es: "siete", en: "seven", pron: "SYEH-teh", cat: "numeros" },
  { es: "ocho", en: "eight", pron: "OH-choh", cat: "numeros" },
  { es: "nueve", en: "nine", pron: "NWEH-veh", cat: "numeros" },
  { es: "diez", en: "ten", pron: "dyehs", cat: "numeros" },
  { es: "veinte", en: "twenty", pron: "VAYN-teh", cat: "numeros" },
  { es: "cincuenta", en: "fifty", pron: "seen-KWEHN-tah", cat: "numeros" },
  { es: "cien", en: "one hundred", pron: "syehn", cat: "numeros" },
  { es: "mil", en: "one thousand", pron: "meel", cat: "numeros" },
  { es: "primero", en: "first", pron: "pree-MEH-roh", cat: "numeros" },

  // ── Tiempo y días (15) ────────────────────────────────────
  { es: "hoy", en: "today", pron: "oy", cat: "tiempo" },
  { es: "mañana", en: "tomorrow / morning", pron: "mah-NYAH-nah", cat: "tiempo" },
  { es: "ayer", en: "yesterday", pron: "ah-YEHR", cat: "tiempo" },
  { es: "ahora", en: "now", pron: "ah-OH-rah", cat: "tiempo" },
  { es: "después", en: "after / later", pron: "dehs-PWEHS", cat: "tiempo" },
  { es: "siempre", en: "always", pron: "SYEHM-preh", cat: "tiempo" },
  { es: "nunca", en: "never", pron: "NOON-kah", cat: "tiempo" },
  { es: "lunes", en: "Monday", pron: "LOO-nehs", cat: "tiempo" },
  { es: "martes", en: "Tuesday", pron: "MAR-tehs", cat: "tiempo" },
  { es: "miércoles", en: "Wednesday", pron: "MYEHR-koh-lehs", cat: "tiempo" },
  { es: "jueves", en: "Thursday", pron: "HWEH-vehs", cat: "tiempo" },
  { es: "viernes", en: "Friday", pron: "VYEHR-nehs", cat: "tiempo" },
  { es: "sábado", en: "Saturday", pron: "SAH-bah-doh", cat: "tiempo" },
  { es: "domingo", en: "Sunday", pron: "doh-MEEN-goh", cat: "tiempo" },
  { es: "fin de semana", en: "weekend", pron: "feen deh seh-MAH-nah", cat: "tiempo" },

  // ── Personas y familia (12) ───────────────────────────────
  { es: "amigo", en: "friend (m)", pron: "ah-MEE-goh", cat: "personas" },
  { es: "amiga", en: "friend (f)", pron: "ah-MEE-gah", cat: "personas" },
  { es: "familia", en: "family", pron: "fah-MEE-lyah", cat: "personas" },
  { es: "madre", en: "mother", pron: "MAH-dreh", cat: "personas" },
  { es: "padre", en: "father", pron: "PAH-dreh", cat: "personas" },
  { es: "hermano", en: "brother", pron: "er-MAH-noh", cat: "personas" },
  { es: "hermana", en: "sister", pron: "er-MAH-nah", cat: "personas" },
  { es: "hijo", en: "son", pron: "EE-hoh", cat: "personas" },
  { es: "hija", en: "daughter", pron: "EE-hah", cat: "personas" },
  { es: "novio", en: "boyfriend", pron: "NOH-vyoh", cat: "personas" },
  { es: "novia", en: "girlfriend", pron: "NOH-vyah", cat: "personas" },
  { es: "gente", en: "people", pron: "HEHN-teh", cat: "personas" },

  // ── Lugares comunes (10) ──────────────────────────────────
  { es: "casa", en: "house / home", pron: "KAH-sah", cat: "lugares" },
  { es: "trabajo", en: "work / job", pron: "trah-BAH-hoh", cat: "lugares" },
  { es: "escuela", en: "school", pron: "ehs-KWEH-lah", cat: "lugares" },
  { es: "restaurante", en: "restaurant", pron: "rehs-tow-RAHN-teh", cat: "lugares" },
  { es: "baño", en: "bathroom", pron: "BAH-nyoh", cat: "lugares" },
  { es: "calle", en: "street", pron: "KAH-yeh", cat: "lugares" },
  { es: "ciudad", en: "city", pron: "syoo-DAHD", cat: "lugares" },
  { es: "país", en: "country", pron: "pah-EES", cat: "lugares" },
  { es: "aquí", en: "here", pron: "ah-KEE", cat: "lugares" },
  { es: "allí", en: "there", pron: "ah-YEE", cat: "lugares" },

  // ── Sustantivos útiles (11) ───────────────────────────────
  { es: "agua", en: "water", pron: "AH-gwah", cat: "utiles" },
  { es: "café", en: "coffee", pron: "kah-FEH", cat: "utiles" },
  { es: "comida", en: "food", pron: "koh-MEE-dah", cat: "utiles" },
  { es: "dinero", en: "money", pron: "dee-NEH-roh", cat: "utiles" },
  { es: "tiempo", en: "time / weather", pron: "TYEHM-poh", cat: "utiles" },
  { es: "cosa", en: "thing", pron: "KOH-sah", cat: "utiles" },
  { es: "día", en: "day", pron: "DEE-ah", cat: "utiles" },
  { es: "nombre", en: "name", pron: "NOHM-breh", cat: "utiles" },
  { es: "teléfono", en: "phone", pron: "teh-LEH-foh-noh", cat: "utiles" },
  { es: "idioma", en: "language", pron: "ee-DYOH-mah", cat: "utiles" },
  { es: "palabra", en: "word", pron: "pah-LAH-brah", cat: "utiles" },
];

// Guard: the whole point of the app is the curated 187.
if (typeof console !== "undefined" && WORDS.length !== 187) {
  console.warn("Expected 187 words, found", WORDS.length);
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { WORDS, CATEGORIES };
}
