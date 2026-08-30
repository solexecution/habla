/*
 * Hablá — 187 high-frequency Spanish words & phrases for starting conversations.
 *
 * Each entry: { id, es, en, pron, cat, ex, exEn, pri }
 *   id   — stable ascii slug; also the audio filename (audio/<id>.mp3)
 *   es   — Spanish
 *   en   — English meaning
 *   pron — light phonetic hint for English speakers (stress in CAPS)
 *   cat  — category key (see CATEGORIES below)
 *   ex   — a short, natural example sentence in Spanish (contextual encoding —
 *          seeing a word used in a real sentence is the biggest retention lever)
 *   exEn — English translation of the example
 *   pri  — frequency/utility tier (1 = core, 2 = common, 3 = useful). New words
 *          are introduced lowest-tier-first, so learners meet the highest-payoff
 *          vocabulary before the long tail.
 *
 * The set is weighted toward greetings, courtesy, introductions and icebreaker
 * questions — the words that actually get a conversation going — then rounded out
 * with the connectors, verbs, numbers and time words you reach for in almost
 * every exchange.
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
  { id: "hola", es: "hola", en: "hi / hello", pron: "OH-lah", cat: "saludos", pri: 1, ex: "¡Hola! ¿Cómo estás?", exEn: "Hi! How are you?" },
  { id: "buenos-dias", es: "buenos días", en: "good morning", pron: "BWEH-nohs DEE-ahs", cat: "saludos", pri: 1, ex: "Buenos días, ¿durmió bien?", exEn: "Good morning, did you sleep well?" },
  { id: "buenas-tardes", es: "buenas tardes", en: "good afternoon", pron: "BWEH-nahs TAR-dehs", cat: "saludos", pri: 2, ex: "Buenas tardes, ¿en qué le ayudo?", exEn: "Good afternoon, how can I help you?" },
  { id: "buenas-noches", es: "buenas noches", en: "good evening / good night", pron: "BWEH-nahs NOH-chehs", cat: "saludos", pri: 2, ex: "Buenas noches, hasta mañana.", exEn: "Good night, see you tomorrow." },
  { id: "que-tal", es: "¿qué tal?", en: "how's it going?", pron: "keh TAHL", cat: "saludos", pri: 2, ex: "¡Hola! ¿Qué tal?", exEn: "Hi! How's it going?" },
  { id: "como-estas", es: "¿cómo estás?", en: "how are you?", pron: "KOH-moh ehs-TAHS", cat: "saludos", pri: 1, ex: "Hola María, ¿cómo estás?", exEn: "Hi María, how are you?" },
  { id: "como-esta-usted", es: "¿cómo está usted?", en: "how are you? (formal)", pron: "KOH-moh ehs-TAH oos-TEHD", cat: "saludos", pri: 2, ex: "Buenos días, ¿cómo está usted?", exEn: "Good morning, how are you?" },
  { id: "que-onda", es: "¿qué onda?", en: "what's up? (casual)", pron: "keh OHN-dah", cat: "saludos", pri: 3, ex: "¿Qué onda, amigo?", exEn: "What's up, buddy?" },
  { id: "adios", es: "adiós", en: "goodbye", pron: "ah-DYOHS", cat: "saludos", pri: 1, ex: "Adiós, que te vaya bien.", exEn: "Goodbye, take care." },
  { id: "chau", es: "chau", en: "bye", pron: "chow", cat: "saludos", pri: 2, ex: "Chau, nos hablamos luego.", exEn: "Bye, we'll talk later." },
  { id: "hasta-luego", es: "hasta luego", en: "see you later", pron: "AHS-tah LWEH-goh", cat: "saludos", pri: 2, ex: "Me voy, hasta luego.", exEn: "I'm off, see you later." },
  { id: "hasta-manana", es: "hasta mañana", en: "see you tomorrow", pron: "AHS-tah mah-NYAH-nah", cat: "saludos", pri: 2, ex: "Buen trabajo, hasta mañana.", exEn: "Good work, see you tomorrow." },
  { id: "hasta-pronto", es: "hasta pronto", en: "see you soon", pron: "AHS-tah PROHN-toh", cat: "saludos", pri: 3, ex: "Gracias por todo, hasta pronto.", exEn: "Thanks for everything, see you soon." },
  { id: "nos-vemos", es: "nos vemos", en: "see you", pron: "nohs VEH-mohs", cat: "saludos", pri: 2, ex: "Nos vemos el viernes.", exEn: "See you on Friday." },
  { id: "bienvenido", es: "bienvenido", en: "welcome", pron: "byehn-veh-NEE-doh", cat: "saludos", pri: 3, ex: "¡Bienvenido a mi casa!", exEn: "Welcome to my home!" },

  // ── Cortesía (12) ─────────────────────────────────────────
  { id: "por-favor", es: "por favor", en: "please", pron: "por fah-VOR", cat: "cortesia", pri: 1, ex: "Un café, por favor.", exEn: "A coffee, please." },
  { id: "gracias", es: "gracias", en: "thank you", pron: "GRAH-syahs", cat: "cortesia", pri: 1, ex: "Muchas gracias por tu ayuda.", exEn: "Thank you very much for your help." },
  { id: "muchas-gracias", es: "muchas gracias", en: "thank you very much", pron: "MOO-chahs GRAH-syahs", cat: "cortesia", pri: 2, ex: "Muchas gracias, muy amable.", exEn: "Thank you very much, that's very kind." },
  { id: "de-nada", es: "de nada", en: "you're welcome", pron: "deh NAH-dah", cat: "cortesia", pri: 1, ex: "—Gracias. —De nada.", exEn: "—Thanks. —You're welcome." },
  { id: "con-gusto", es: "con gusto", en: "my pleasure", pron: "kohn GOOS-toh", cat: "cortesia", pri: 3, ex: "Con gusto te ayudo.", exEn: "I'll gladly help you." },
  { id: "perdon", es: "perdón", en: "sorry / excuse me", pron: "per-DOHN", cat: "cortesia", pri: 1, ex: "Perdón, ¿me repites eso?", exEn: "Sorry, can you repeat that?" },
  { id: "disculpa", es: "disculpa", en: "excuse me (informal)", pron: "dees-KOOL-pah", cat: "cortesia", pri: 2, ex: "Disculpa, ¿tienes hora?", exEn: "Excuse me, do you have the time?" },
  { id: "lo-siento", es: "lo siento", en: "I'm sorry", pron: "loh SYEHN-toh", cat: "cortesia", pri: 1, ex: "Lo siento, fue mi culpa.", exEn: "I'm sorry, it was my fault." },
  { id: "con-permiso", es: "con permiso", en: "excuse me (passing by)", pron: "kohn per-MEE-soh", cat: "cortesia", pri: 3, ex: "Con permiso, voy a pasar.", exEn: "Excuse me, I'm coming through." },
  { id: "no-hay-problema", es: "no hay problema", en: "no problem", pron: "noh eye proh-BLEH-mah", cat: "cortesia", pri: 2, ex: "No hay problema, yo lo hago.", exEn: "No problem, I'll do it." },
  { id: "salud", es: "salud", en: "cheers / bless you", pron: "sah-LOOD", cat: "cortesia", pri: 3, ex: "¡Salud, por nosotros!", exEn: "Cheers, to us!" },
  { id: "encantado", es: "encantado", en: "delighted (to meet you)", pron: "ehn-kahn-TAH-doh", cat: "cortesia", pri: 3, ex: "Encantado de conocerte.", exEn: "Delighted to meet you." },

  // ── Presentarse (15) ──────────────────────────────────────
  { id: "me-llamo", es: "me llamo…", en: "my name is…", pron: "meh YAH-moh", cat: "presentarse", pri: 1, ex: "Hola, me llamo Ana.", exEn: "Hi, my name is Ana." },
  { id: "soy", es: "soy…", en: "I am…", pron: "soy", cat: "presentarse", pri: 1, ex: "Soy profesor de inglés.", exEn: "I am an English teacher." },
  { id: "mi-nombre-es", es: "mi nombre es…", en: "my name is…", pron: "mee NOHM-breh ehs", cat: "presentarse", pri: 2, ex: "Mi nombre es Carlos.", exEn: "My name is Carlos." },
  { id: "como-te-llamas", es: "¿cómo te llamas?", en: "what's your name?", pron: "KOH-moh teh YAH-mahs", cat: "presentarse", pri: 1, ex: "¿Cómo te llamas?", exEn: "What's your name?" },
  { id: "mucho-gusto", es: "mucho gusto", en: "nice to meet you", pron: "MOO-choh GOOS-toh", cat: "presentarse", pri: 1, ex: "Mucho gusto, soy Pedro.", exEn: "Nice to meet you, I'm Pedro." },
  { id: "igualmente", es: "igualmente", en: "likewise", pron: "ee-gwahl-MEHN-teh", cat: "presentarse", pri: 2, ex: "—Mucho gusto. —Igualmente.", exEn: "—Nice to meet you. —Likewise." },
  { id: "soy-de", es: "soy de…", en: "I'm from…", pron: "soy deh", cat: "presentarse", pri: 1, ex: "Soy de México.", exEn: "I'm from Mexico." },
  { id: "de-donde-eres", es: "¿de dónde eres?", en: "where are you from?", pron: "deh DOHN-deh EH-rehs", cat: "presentarse", pri: 1, ex: "¿De dónde eres?", exEn: "Where are you from?" },
  { id: "vivo-en", es: "vivo en…", en: "I live in…", pron: "VEE-voh ehn", cat: "presentarse", pri: 2, ex: "Vivo en Guadalajara.", exEn: "I live in Guadalajara." },
  { id: "tengo-anos", es: "tengo … años", en: "I'm … years old", pron: "TEHN-goh … AH-nyohs", cat: "presentarse", pri: 2, ex: "Tengo treinta años.", exEn: "I'm thirty years old." },
  { id: "trabajo-en", es: "trabajo en…", en: "I work in / at…", pron: "trah-BAH-hoh ehn", cat: "presentarse", pri: 2, ex: "Trabajo en un hospital.", exEn: "I work at a hospital." },
  { id: "estudio", es: "estudio…", en: "I study…", pron: "ehs-TOO-dyoh", cat: "presentarse", pri: 2, ex: "Estudio medicina.", exEn: "I study medicine." },
  { id: "hablo-un-poco-de-espanol", es: "hablo un poco de español", en: "I speak a little Spanish", pron: "AH-bloh oon POH-koh deh ehs-pah-NYOHL", cat: "presentarse", pri: 2, ex: "Hablo un poco de español.", exEn: "I speak a little Spanish." },
  { id: "estoy-aprendiendo-espanol", es: "estoy aprendiendo español", en: "I'm learning Spanish", pron: "ehs-TOY ah-prehn-DYEHN-doh ehs-pah-NYOHL", cat: "presentarse", pri: 2, ex: "Estoy aprendiendo español.", exEn: "I'm learning Spanish." },
  { id: "este-es-mi-amigo", es: "este es mi amigo", en: "this is my friend", pron: "EHS-teh ehs mee ah-MEE-goh", cat: "presentarse", pri: 3, ex: "Mira, este es mi amigo Luis.", exEn: "Look, this is my friend Luis." },

  // ── Preguntas para romper el hielo (15) ───────────────────
  { id: "como-te-va", es: "¿cómo te va?", en: "how's it going for you?", pron: "KOH-moh teh vah", cat: "preguntas", pri: 2, ex: "¿Cómo te va en el trabajo?", exEn: "How's it going at work?" },
  { id: "que-haces", es: "¿qué haces?", en: "what do you do? / what are you doing?", pron: "keh AH-sehs", cat: "preguntas", pri: 2, ex: "¿Qué haces este fin de semana?", exEn: "What are you doing this weekend?" },
  { id: "a-que-te-dedicas", es: "¿a qué te dedicas?", en: "what do you do (for work)?", pron: "ah keh teh deh-DEE-kahs", cat: "preguntas", pri: 2, ex: "¿A qué te dedicas?", exEn: "What do you do for work?" },
  { id: "que-te-gusta-hacer", es: "¿qué te gusta hacer?", en: "what do you like to do?", pron: "keh teh GOOS-tah ah-SEHR", cat: "preguntas", pri: 2, ex: "¿Qué te gusta hacer los domingos?", exEn: "What do you like to do on Sundays?" },
  { id: "tienes-hermanos", es: "¿tienes hermanos?", en: "do you have siblings?", pron: "TYEH-nehs er-MAH-nohs", cat: "preguntas", pri: 3, ex: "¿Tienes hermanos?", exEn: "Do you have siblings?" },
  { id: "de-que-parte-eres", es: "¿de qué parte eres?", en: "what part are you from?", pron: "deh keh PAR-teh EH-rehs", cat: "preguntas", pri: 3, ex: "¿De qué parte de México eres?", exEn: "What part of Mexico are you from?" },
  { id: "hablas-ingles", es: "¿hablas inglés?", en: "do you speak English?", pron: "AH-blahs een-GLEHS", cat: "preguntas", pri: 2, ex: "Perdón, ¿hablas inglés?", exEn: "Excuse me, do you speak English?" },
  { id: "que-musica-te-gusta", es: "¿qué música te gusta?", en: "what music do you like?", pron: "keh MOO-see-kah teh GOOS-tah", cat: "preguntas", pri: 3, ex: "¿Qué música te gusta?", exEn: "What music do you like?" },
  { id: "tienes-planes", es: "¿tienes planes?", en: "do you have plans?", pron: "TYEH-nehs PLAH-nehs", cat: "preguntas", pri: 3, ex: "¿Tienes planes para hoy?", exEn: "Do you have plans for today?" },
  { id: "cual-es-tu-comida-favorita", es: "¿cuál es tu comida favorita?", en: "what's your favorite food?", pron: "kwahl ehs too koh-MEE-dah fah-voh-REE-tah", cat: "preguntas", pri: 3, ex: "¿Cuál es tu comida favorita?", exEn: "What's your favorite food?" },
  { id: "te-gusta-viajar", es: "¿te gusta viajar?", en: "do you like to travel?", pron: "teh GOOS-tah vyah-HAR", cat: "preguntas", pri: 3, ex: "¿Te gusta viajar?", exEn: "Do you like to travel?" },
  { id: "vienes-seguido", es: "¿vienes seguido?", en: "do you come here often?", pron: "VYEH-nehs seh-GEE-doh", cat: "preguntas", pri: 3, ex: "¿Vienes seguido a este café?", exEn: "Do you come to this café often?" },
  { id: "que-recomiendas", es: "¿qué recomiendas?", en: "what do you recommend?", pron: "keh reh-koh-MYEHN-dahs", cat: "preguntas", pri: 2, ex: "¿Qué recomiendas del menú?", exEn: "What do you recommend from the menu?" },
  { id: "me-puedes-ayudar", es: "¿me puedes ayudar?", en: "can you help me?", pron: "meh PWEH-dehs ah-yoo-DAR", cat: "preguntas", pri: 2, ex: "¿Me puedes ayudar, por favor?", exEn: "Can you help me, please?" },
  { id: "nos-conocemos", es: "¿nos conocemos?", en: "have we met?", pron: "nohs koh-noh-SEH-mohs", cat: "preguntas", pri: 3, ex: "Perdona, ¿nos conocemos?", exEn: "Sorry, have we met?" },

  // ── Respuestas comunes (12) ───────────────────────────────
  { id: "si", es: "sí", en: "yes", pron: "see", cat: "respuestas", pri: 1, ex: "—¿Vienes? —Sí.", exEn: "—Are you coming? —Yes." },
  { id: "no", es: "no", en: "no", pron: "noh", cat: "respuestas", pri: 1, ex: "No, gracias.", exEn: "No, thank you." },
  { id: "bien", es: "bien", en: "well / fine", pron: "byehn", cat: "respuestas", pri: 1, ex: "—¿Cómo estás? —Bien.", exEn: "—How are you? —Fine." },
  { id: "muy-bien", es: "muy bien", en: "very well", pron: "mwee byehn", cat: "respuestas", pri: 1, ex: "Todo va muy bien, gracias.", exEn: "Everything's going very well, thanks." },
  { id: "mas-o-menos", es: "más o menos", en: "so-so", pron: "mahs oh MEH-nohs", cat: "respuestas", pri: 2, ex: "—¿Qué tal? —Más o menos.", exEn: "—How's it going? —So-so." },
  { id: "claro", es: "claro", en: "of course / sure", pron: "KLAH-roh", cat: "respuestas", pri: 1, ex: "—¿Me ayudas? —¡Claro!", exEn: "—Will you help me? —Of course!" },
  { id: "por-supuesto", es: "por supuesto", en: "of course", pron: "por soo-PWEHS-toh", cat: "respuestas", pri: 2, ex: "Por supuesto que puedes.", exEn: "Of course you can." },
  { id: "esta-bien", es: "está bien", en: "it's okay / alright", pron: "ehs-TAH byehn", cat: "respuestas", pri: 1, ex: "Está bien, no te preocupes.", exEn: "It's okay, don't worry." },
  { id: "no-se", es: "no sé", en: "I don't know", pron: "noh seh", cat: "respuestas", pri: 1, ex: "No sé dónde está.", exEn: "I don't know where it is." },
  { id: "no-entiendo", es: "no entiendo", en: "I don't understand", pron: "noh ehn-TYEHN-doh", cat: "respuestas", pri: 1, ex: "Perdón, no entiendo.", exEn: "Sorry, I don't understand." },
  { id: "tal-vez", es: "tal vez", en: "maybe", pron: "tahl vehs", cat: "respuestas", pri: 2, ex: "Tal vez mañana.", exEn: "Maybe tomorrow." },
  { id: "creo-que-si", es: "creo que sí", en: "I think so", pron: "KREH-oh keh see", cat: "respuestas", pri: 2, ex: "—¿Está abierto? —Creo que sí.", exEn: "—Is it open? —I think so." },

  // ── Palabras de pregunta (10) ─────────────────────────────
  { id: "que", es: "qué", en: "what", pron: "keh", cat: "interrog", pri: 1, ex: "¿Qué es esto?", exEn: "What is this?" },
  { id: "quien", es: "quién", en: "who", pron: "kyehn", cat: "interrog", pri: 1, ex: "¿Quién es él?", exEn: "Who is he?" },
  { id: "donde", es: "dónde", en: "where", pron: "DOHN-deh", cat: "interrog", pri: 1, ex: "¿Dónde está el baño?", exEn: "Where is the bathroom?" },
  { id: "cuando", es: "cuándo", en: "when", pron: "KWAHN-doh", cat: "interrog", pri: 1, ex: "¿Cuándo llegas?", exEn: "When do you arrive?" },
  { id: "por-que", es: "por qué", en: "why", pron: "por KEH", cat: "interrog", pri: 1, ex: "¿Por qué no vienes?", exEn: "Why aren't you coming?" },
  { id: "como", es: "cómo", en: "how", pron: "KOH-moh", cat: "interrog", pri: 1, ex: "¿Cómo se dice esto?", exEn: "How do you say this?" },
  { id: "cual", es: "cuál", en: "which", pron: "kwahl", cat: "interrog", pri: 2, ex: "¿Cuál prefieres?", exEn: "Which one do you prefer?" },
  { id: "cuanto", es: "cuánto", en: "how much", pron: "KWAHN-toh", cat: "interrog", pri: 1, ex: "¿Cuánto cuesta?", exEn: "How much does it cost?" },
  { id: "cuantos", es: "cuántos", en: "how many", pron: "KWAHN-tohs", cat: "interrog", pri: 2, ex: "¿Cuántos años tienes?", exEn: "How old are you?" },
  { id: "para-que", es: "para qué", en: "what for", pron: "PAH-rah keh", cat: "interrog", pri: 3, ex: "¿Para qué es esto?", exEn: "What is this for?" },

  // ── Sentimientos y estados (12) ───────────────────────────
  { id: "feliz", es: "feliz", en: "happy", pron: "feh-LEES", cat: "sentimientos", pri: 2, ex: "Hoy estoy muy feliz.", exEn: "Today I'm very happy." },
  { id: "triste", es: "triste", en: "sad", pron: "TREES-teh", cat: "sentimientos", pri: 2, ex: "Estoy un poco triste.", exEn: "I'm a little sad." },
  { id: "cansado", es: "cansado", en: "tired", pron: "kahn-SAH-doh", cat: "sentimientos", pri: 2, ex: "Estoy muy cansado hoy.", exEn: "I'm very tired today." },
  { id: "contento", es: "contento", en: "glad / content", pron: "kohn-TEHN-toh", cat: "sentimientos", pri: 3, ex: "Estoy contento con el resultado.", exEn: "I'm glad with the result." },
  { id: "emocionado", es: "emocionado", en: "excited", pron: "eh-moh-syoh-NAH-doh", cat: "sentimientos", pri: 3, ex: "Estoy emocionado por el viaje.", exEn: "I'm excited about the trip." },
  { id: "nervioso", es: "nervioso", en: "nervous", pron: "ner-VYOH-soh", cat: "sentimientos", pri: 3, ex: "Estoy nervioso por el examen.", exEn: "I'm nervous about the exam." },
  { id: "tengo-hambre", es: "tengo hambre", en: "I'm hungry", pron: "TEHN-goh AHM-breh", cat: "sentimientos", pri: 1, ex: "Tengo hambre, vamos a comer.", exEn: "I'm hungry, let's eat." },
  { id: "tengo-sed", es: "tengo sed", en: "I'm thirsty", pron: "TEHN-goh sehd", cat: "sentimientos", pri: 2, ex: "Tengo sed, ¿hay agua?", exEn: "I'm thirsty, is there water?" },
  { id: "tengo-frio", es: "tengo frío", en: "I'm cold", pron: "TEHN-goh FREE-oh", cat: "sentimientos", pri: 2, ex: "Tengo frío, cierra la ventana.", exEn: "I'm cold, close the window." },
  { id: "tengo-calor", es: "tengo calor", en: "I'm hot", pron: "TEHN-goh kah-LOR", cat: "sentimientos", pri: 2, ex: "Tengo calor, hace mucho sol.", exEn: "I'm hot, it's very sunny." },
  { id: "estoy-bien", es: "estoy bien", en: "I'm fine", pron: "ehs-TOY byehn", cat: "sentimientos", pri: 1, ex: "Gracias, estoy bien.", exEn: "Thanks, I'm fine." },
  { id: "estoy-ocupado", es: "estoy ocupado", en: "I'm busy", pron: "ehs-TOY oh-koo-PAH-doh", cat: "sentimientos", pri: 2, ex: "Ahora estoy ocupado.", exEn: "I'm busy right now." },

  // ── Verbos esenciales (20) ────────────────────────────────
  { id: "ser", es: "ser", en: "to be (permanent)", pron: "sehr", cat: "verbos", pri: 1, ex: "Quiero ser médico.", exEn: "I want to be a doctor." },
  { id: "estar", es: "estar", en: "to be (state/place)", pron: "ehs-TAR", cat: "verbos", pri: 1, ex: "¿Dónde vas a estar?", exEn: "Where are you going to be?" },
  { id: "tener", es: "tener", en: "to have", pron: "teh-NEHR", cat: "verbos", pri: 1, ex: "Voy a tener una reunión.", exEn: "I'm going to have a meeting." },
  { id: "hacer", es: "hacer", en: "to do / make", pron: "ah-SEHR", cat: "verbos", pri: 1, ex: "¿Qué vas a hacer hoy?", exEn: "What are you going to do today?" },
  { id: "ir", es: "ir", en: "to go", pron: "eer", cat: "verbos", pri: 1, ex: "Quiero ir al cine.", exEn: "I want to go to the movies." },
  { id: "venir", es: "venir", en: "to come", pron: "veh-NEER", cat: "verbos", pri: 2, ex: "¿Puedes venir mañana?", exEn: "Can you come tomorrow?" },
  { id: "querer", es: "querer", en: "to want / love", pron: "keh-REHR", cat: "verbos", pri: 1, ex: "¿Qué quieres comer?", exEn: "What do you want to eat?" },
  { id: "poder", es: "poder", en: "to be able to / can", pron: "poh-DEHR", cat: "verbos", pri: 1, ex: "No puedo ir hoy.", exEn: "I can't go today." },
  { id: "saber", es: "saber", en: "to know (facts)", pron: "sah-BEHR", cat: "verbos", pri: 1, ex: "Quiero saber la verdad.", exEn: "I want to know the truth." },
  { id: "conocer", es: "conocer", en: "to know (people/places)", pron: "koh-noh-SEHR", cat: "verbos", pri: 2, ex: "Me gustaría conocer México.", exEn: "I'd like to get to know Mexico." },
  { id: "hablar", es: "hablar", en: "to speak", pron: "ah-BLAR", cat: "verbos", pri: 1, ex: "¿Podemos hablar un momento?", exEn: "Can we talk for a moment?" },
  { id: "decir", es: "decir", en: "to say / tell", pron: "deh-SEER", cat: "verbos", pri: 1, ex: "¿Qué quieres decir?", exEn: "What do you mean?" },
  { id: "comer", es: "comer", en: "to eat", pron: "koh-MEHR", cat: "verbos", pri: 1, ex: "Vamos a comer algo.", exEn: "Let's eat something." },
  { id: "beber", es: "beber", en: "to drink", pron: "beh-BEHR", cat: "verbos", pri: 2, ex: "¿Quieres beber algo?", exEn: "Do you want something to drink?" },
  { id: "gustar", es: "gustar", en: "to like (be pleasing)", pron: "goos-TAR", cat: "verbos", pri: 1, ex: "Me gusta este lugar.", exEn: "I like this place." },
  { id: "entender", es: "entender", en: "to understand", pron: "ehn-tehn-DEHR", cat: "verbos", pri: 2, ex: "Quiero entender mejor.", exEn: "I want to understand better." },
  { id: "necesitar", es: "necesitar", en: "to need", pron: "neh-seh-see-TAR", cat: "verbos", pri: 2, ex: "Necesito un poco de ayuda.", exEn: "I need a little help." },
  { id: "ayudar", es: "ayudar", en: "to help", pron: "ah-yoo-DAR", cat: "verbos", pri: 2, ex: "¿Te puedo ayudar?", exEn: "Can I help you?" },
  { id: "trabajar", es: "trabajar", en: "to work", pron: "trah-bah-HAR", cat: "verbos", pri: 2, ex: "Tengo que trabajar hoy.", exEn: "I have to work today." },
  { id: "vivir", es: "vivir", en: "to live", pron: "vee-VEER", cat: "verbos", pri: 2, ex: "Me gusta vivir aquí.", exEn: "I like living here." },

  // ── Conectores y muletillas (12) ──────────────────────────
  { id: "y", es: "y", en: "and", pron: "ee", cat: "conectores", pri: 1, ex: "Tú y yo.", exEn: "You and I." },
  { id: "pero", es: "pero", en: "but", pron: "PEH-roh", cat: "conectores", pri: 1, ex: "Quiero ir, pero no puedo.", exEn: "I want to go, but I can't." },
  { id: "porque", es: "porque", en: "because", pron: "POR-keh", cat: "conectores", pri: 1, ex: "No voy porque estoy cansado.", exEn: "I'm not going because I'm tired." },
  { id: "tambien", es: "también", en: "also / too", pron: "tahm-BYEHN", cat: "conectores", pri: 1, ex: "Yo también quiero.", exEn: "I want to, too." },
  { id: "entonces", es: "entonces", en: "so / then", pron: "ehn-TOHN-sehs", cat: "conectores", pri: 2, ex: "Entonces, ¿qué hacemos?", exEn: "So, what do we do?" },
  { id: "pues", es: "pues", en: "well… (filler)", pron: "pwehs", cat: "conectores", pri: 2, ex: "Pues… no lo sé.", exEn: "Well… I don't know." },
  { id: "o-sea", es: "o sea", en: "I mean / that is", pron: "oh SEH-ah", cat: "conectores", pri: 3, ex: "Es tarde, o sea, mejor mañana.", exEn: "It's late, I mean, better tomorrow." },
  { id: "ademas", es: "además", en: "besides / moreover", pron: "ah-deh-MAHS", cat: "conectores", pri: 3, ex: "Además, no tengo tiempo.", exEn: "Besides, I don't have time." },
  { id: "por-eso", es: "por eso", en: "that's why", pron: "por EH-soh", cat: "conectores", pri: 2, ex: "Por eso llegué tarde.", exEn: "That's why I arrived late." },
  { id: "aunque", es: "aunque", en: "although", pron: "AH-oon-keh", cat: "conectores", pri: 3, ex: "Iré aunque llueva.", exEn: "I'll go even though it rains." },
  { id: "mientras", es: "mientras", en: "while", pron: "MYEHN-trahs", cat: "conectores", pri: 3, ex: "Espera aquí mientras vuelvo.", exEn: "Wait here while I come back." },
  { id: "sin-embargo", es: "sin embargo", en: "however", pron: "seen ehm-BAR-goh", cat: "conectores", pri: 3, ex: "Es caro; sin embargo, me gusta.", exEn: "It's expensive; however, I like it." },

  // ── Números (16) ──────────────────────────────────────────
  { id: "cero", es: "cero", en: "zero", pron: "SEH-roh", cat: "numeros", pri: 2, ex: "Empezamos desde cero.", exEn: "We start from zero." },
  { id: "uno", es: "uno", en: "one", pron: "OO-noh", cat: "numeros", pri: 1, ex: "Solo quiero uno.", exEn: "I only want one." },
  { id: "dos", es: "dos", en: "two", pron: "dohs", cat: "numeros", pri: 1, ex: "Somos dos personas.", exEn: "We are two people." },
  { id: "tres", es: "tres", en: "three", pron: "trehs", cat: "numeros", pri: 1, ex: "Tengo tres hermanos.", exEn: "I have three siblings." },
  { id: "cuatro", es: "cuatro", en: "four", pron: "KWAH-troh", cat: "numeros", pri: 1, ex: "Son las cuatro.", exEn: "It's four o'clock." },
  { id: "cinco", es: "cinco", en: "five", pron: "SEEN-koh", cat: "numeros", pri: 1, ex: "Cinco minutos, por favor.", exEn: "Five minutes, please." },
  { id: "seis", es: "seis", en: "six", pron: "says", cat: "numeros", pri: 2, ex: "Nos vemos a las seis.", exEn: "See you at six." },
  { id: "siete", es: "siete", en: "seven", pron: "SYEH-teh", cat: "numeros", pri: 2, ex: "La tienda abre a las siete.", exEn: "The shop opens at seven." },
  { id: "ocho", es: "ocho", en: "eight", pron: "OH-choh", cat: "numeros", pri: 2, ex: "Trabajo ocho horas.", exEn: "I work eight hours." },
  { id: "nueve", es: "nueve", en: "nine", pron: "NWEH-veh", cat: "numeros", pri: 2, ex: "Llego a las nueve.", exEn: "I arrive at nine." },
  { id: "diez", es: "diez", en: "ten", pron: "dyehs", cat: "numeros", pri: 1, ex: "Cuesta diez pesos.", exEn: "It costs ten pesos." },
  { id: "veinte", es: "veinte", en: "twenty", pron: "VAYN-teh", cat: "numeros", pri: 2, ex: "Faltan veinte minutos.", exEn: "There are twenty minutes left." },
  { id: "cincuenta", es: "cincuenta", en: "fifty", pron: "seen-KWEHN-tah", cat: "numeros", pri: 3, ex: "Son cincuenta pesos.", exEn: "That's fifty pesos." },
  { id: "cien", es: "cien", en: "one hundred", pron: "syehn", cat: "numeros", pri: 2, ex: "Tengo cien dólares.", exEn: "I have one hundred dollars." },
  { id: "mil", es: "mil", en: "one thousand", pron: "meel", cat: "numeros", pri: 3, ex: "Cuesta mil pesos.", exEn: "It costs a thousand pesos." },
  { id: "primero", es: "primero", en: "first", pron: "pree-MEH-roh", cat: "numeros", pri: 2, ex: "Tú vas primero.", exEn: "You go first." },

  // ── Tiempo y días (15) ────────────────────────────────────
  { id: "hoy", es: "hoy", en: "today", pron: "oy", cat: "tiempo", pri: 1, ex: "Hoy es un buen día.", exEn: "Today is a good day." },
  { id: "manana", es: "mañana", en: "tomorrow / morning", pron: "mah-NYAH-nah", cat: "tiempo", pri: 1, ex: "Te veo mañana.", exEn: "I'll see you tomorrow." },
  { id: "ayer", es: "ayer", en: "yesterday", pron: "ah-YEHR", cat: "tiempo", pri: 2, ex: "Ayer fui al mercado.", exEn: "Yesterday I went to the market." },
  { id: "ahora", es: "ahora", en: "now", pron: "ah-OH-rah", cat: "tiempo", pri: 1, ex: "Lo hago ahora mismo.", exEn: "I'll do it right now." },
  { id: "despues", es: "después", en: "after / later", pron: "dehs-PWEHS", cat: "tiempo", pri: 2, ex: "Hablamos después.", exEn: "We'll talk later." },
  { id: "siempre", es: "siempre", en: "always", pron: "SYEHM-preh", cat: "tiempo", pri: 2, ex: "Siempre tomo café.", exEn: "I always drink coffee." },
  { id: "nunca", es: "nunca", en: "never", pron: "NOON-kah", cat: "tiempo", pri: 2, ex: "Nunca he estado allí.", exEn: "I've never been there." },
  { id: "lunes", es: "lunes", en: "Monday", pron: "LOO-nehs", cat: "tiempo", pri: 2, ex: "El lunes empiezo.", exEn: "I start on Monday." },
  { id: "martes", es: "martes", en: "Tuesday", pron: "MAR-tehs", cat: "tiempo", pri: 3, ex: "El martes tengo clase.", exEn: "On Tuesday I have class." },
  { id: "miercoles", es: "miércoles", en: "Wednesday", pron: "MYEHR-koh-lehs", cat: "tiempo", pri: 3, ex: "Nos vemos el miércoles.", exEn: "See you on Wednesday." },
  { id: "jueves", es: "jueves", en: "Thursday", pron: "HWEH-vehs", cat: "tiempo", pri: 3, ex: "El jueves es feriado.", exEn: "Thursday is a holiday." },
  { id: "viernes", es: "viernes", en: "Friday", pron: "VYEHR-nehs", cat: "tiempo", pri: 2, ex: "Por fin es viernes.", exEn: "It's finally Friday." },
  { id: "sabado", es: "sábado", en: "Saturday", pron: "SAH-bah-doh", cat: "tiempo", pri: 2, ex: "El sábado descanso.", exEn: "On Saturday I rest." },
  { id: "domingo", es: "domingo", en: "Sunday", pron: "doh-MEEN-goh", cat: "tiempo", pri: 2, ex: "El domingo veo a mi familia.", exEn: "On Sunday I see my family." },
  { id: "fin-de-semana", es: "fin de semana", en: "weekend", pron: "feen deh seh-MAH-nah", cat: "tiempo", pri: 2, ex: "¡Buen fin de semana!", exEn: "Have a good weekend!" },

  // ── Personas y familia (12) ───────────────────────────────
  { id: "amigo", es: "amigo", en: "friend (m)", pron: "ah-MEE-goh", cat: "personas", pri: 1, ex: "Él es mi mejor amigo.", exEn: "He is my best friend." },
  { id: "amiga", es: "amiga", en: "friend (f)", pron: "ah-MEE-gah", cat: "personas", pri: 2, ex: "Ella es una buena amiga.", exEn: "She is a good friend." },
  { id: "familia", es: "familia", en: "family", pron: "fah-MEE-lyah", cat: "personas", pri: 1, ex: "Quiero mucho a mi familia.", exEn: "I love my family very much." },
  { id: "madre", es: "madre", en: "mother", pron: "MAH-dreh", cat: "personas", pri: 1, ex: "Mi madre cocina muy bien.", exEn: "My mother cooks very well." },
  { id: "padre", es: "padre", en: "father", pron: "PAH-dreh", cat: "personas", pri: 1, ex: "Mi padre trabaja mucho.", exEn: "My father works a lot." },
  { id: "hermano", es: "hermano", en: "brother", pron: "er-MAH-noh", cat: "personas", pri: 2, ex: "Tengo un hermano menor.", exEn: "I have a younger brother." },
  { id: "hermana", es: "hermana", en: "sister", pron: "er-MAH-nah", cat: "personas", pri: 2, ex: "Mi hermana vive en Perú.", exEn: "My sister lives in Peru." },
  { id: "hijo", es: "hijo", en: "son", pron: "EE-hoh", cat: "personas", pri: 2, ex: "Su hijo tiene cinco años.", exEn: "Her son is five years old." },
  { id: "hija", es: "hija", en: "daughter", pron: "EE-hah", cat: "personas", pri: 2, ex: "Mi hija estudia arte.", exEn: "My daughter studies art." },
  { id: "novio", es: "novio", en: "boyfriend", pron: "NOH-vyoh", cat: "personas", pri: 3, ex: "Él es mi novio.", exEn: "He is my boyfriend." },
  { id: "novia", es: "novia", en: "girlfriend", pron: "NOH-vyah", cat: "personas", pri: 3, ex: "Ella es mi novia.", exEn: "She is my girlfriend." },
  { id: "gente", es: "gente", en: "people", pron: "HEHN-teh", cat: "personas", pri: 2, ex: "Hay mucha gente aquí.", exEn: "There are a lot of people here." },

  // ── Lugares comunes (10) ──────────────────────────────────
  { id: "casa", es: "casa", en: "house / home", pron: "KAH-sah", cat: "lugares", pri: 1, ex: "Voy a casa.", exEn: "I'm going home." },
  { id: "trabajo", es: "trabajo", en: "work / job", pron: "trah-BAH-hoh", cat: "lugares", pri: 1, ex: "Me gusta mi trabajo.", exEn: "I like my job." },
  { id: "escuela", es: "escuela", en: "school", pron: "ehs-KWEH-lah", cat: "lugares", pri: 2, ex: "Los niños están en la escuela.", exEn: "The children are at school." },
  { id: "restaurante", es: "restaurante", en: "restaurant", pron: "rehs-tow-RAHN-teh", cat: "lugares", pri: 2, ex: "Conozco un buen restaurante.", exEn: "I know a good restaurant." },
  { id: "bano", es: "baño", en: "bathroom", pron: "BAH-nyoh", cat: "lugares", pri: 1, ex: "¿Dónde está el baño?", exEn: "Where is the bathroom?" },
  { id: "calle", es: "calle", en: "street", pron: "KAH-yeh", cat: "lugares", pri: 2, ex: "Vivo en esta calle.", exEn: "I live on this street." },
  { id: "ciudad", es: "ciudad", en: "city", pron: "syoo-DAHD", cat: "lugares", pri: 2, ex: "Es una ciudad muy bonita.", exEn: "It's a very beautiful city." },
  { id: "pais", es: "país", en: "country", pron: "pah-EES", cat: "lugares", pri: 2, ex: "¿De qué país eres?", exEn: "What country are you from?" },
  { id: "aqui", es: "aquí", en: "here", pron: "ah-KEE", cat: "lugares", pri: 1, ex: "Ven aquí, por favor.", exEn: "Come here, please." },
  { id: "alli", es: "allí", en: "there", pron: "ah-YEE", cat: "lugares", pri: 2, ex: "Está allí, en la mesa.", exEn: "It's there, on the table." },

  // ── Sustantivos útiles (11) ───────────────────────────────
  { id: "agua", es: "agua", en: "water", pron: "AH-gwah", cat: "utiles", pri: 1, ex: "Un vaso de agua, por favor.", exEn: "A glass of water, please." },
  { id: "cafe", es: "café", en: "coffee", pron: "kah-FEH", cat: "utiles", pri: 1, ex: "¿Quieres un café?", exEn: "Would you like a coffee?" },
  { id: "comida", es: "comida", en: "food", pron: "koh-MEE-dah", cat: "utiles", pri: 1, ex: "La comida está deliciosa.", exEn: "The food is delicious." },
  { id: "dinero", es: "dinero", en: "money", pron: "dee-NEH-roh", cat: "utiles", pri: 1, ex: "No tengo dinero hoy.", exEn: "I don't have money today." },
  { id: "tiempo", es: "tiempo", en: "time / weather", pron: "TYEHM-poh", cat: "utiles", pri: 1, ex: "No tengo tiempo ahora.", exEn: "I don't have time now." },
  { id: "cosa", es: "cosa", en: "thing", pron: "KOH-sah", cat: "utiles", pri: 2, ex: "Una cosa más, por favor.", exEn: "One more thing, please." },
  { id: "dia", es: "día", en: "day", pron: "DEE-ah", cat: "utiles", pri: 1, ex: "¡Que tengas un buen día!", exEn: "Have a good day!" },
  { id: "nombre", es: "nombre", en: "name", pron: "NOHM-breh", cat: "utiles", pri: 1, ex: "¿Cuál es tu nombre?", exEn: "What's your name?" },
  { id: "telefono", es: "teléfono", en: "phone", pron: "teh-LEH-foh-noh", cat: "utiles", pri: 2, ex: "¿Me das tu teléfono?", exEn: "Can I have your phone number?" },
  { id: "idioma", es: "idioma", en: "language", pron: "ee-DYOH-mah", cat: "utiles", pri: 2, ex: "El español es un idioma bonito.", exEn: "Spanish is a beautiful language." },
  { id: "palabra", es: "palabra", en: "word", pron: "pah-LAH-brah", cat: "utiles", pri: 2, ex: "No entiendo esta palabra.", exEn: "I don't understand this word." },
];

// Guard: the whole point of the app is the curated 187.
if (typeof console !== "undefined" && WORDS.length !== 187) {
  console.warn("Expected 187 words, found", WORDS.length);
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { WORDS, CATEGORIES };
}
