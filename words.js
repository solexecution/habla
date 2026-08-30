/*
 * Hablá — 187 high-frequency Spanish words & phrases for starting conversations.
 *
 * Each entry: { id, es, en, pron, cat, ex, exEn, pri, hook }
 *   id   — stable ascii slug; also the audio filename (audio/<id>.mp3)
 *   es   — Spanish
 *   en   — English meaning
 *   pron — light phonetic hint for English speakers (stress in CAPS)
 *   cat  — category key (see CATEGORIES below)
 *   ex   — a short, natural example sentence in Spanish (contextual encoding)
 *   exEn — English translation of the example
 *   pri  — frequency/utility tier (1 = core, 2 = common, 3 = useful)
 *   hook — a memory aid linking the Spanish to an English cognate and/or a
 *          genuine Slovak (SK) look-alike, or a sound-alike mnemonic. Built for a
 *          Slovak + English speaker: recall is far faster when a new word hangs
 *          off a word you already know.
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
  { id: "hola", es: "hola", en: "hi / hello", pron: "OH-lah", cat: "saludos", pri: 1, ex: "¡Hola! ¿Cómo estás?", exEn: "Hi! How are you?", hook: "Sounds like EN “hello” — both open with an H." },
  { id: "buenos-dias", es: "buenos días", en: "good morning", pron: "BWEH-nohs DEE-ahs", cat: "saludos", pri: 1, ex: "Buenos días, ¿durmió bien?", exEn: "Good morning, did you sleep well?", hook: "bueno ≈ “bonus” (good); día ≈ “diurnal” (day)." },
  { id: "buenas-tardes", es: "buenas tardes", en: "good afternoon", pron: "BWEH-nahs TAR-dehs", cat: "saludos", pri: 2, ex: "Buenas tardes, ¿en qué le ayudo?", exEn: "Good afternoon, how can I help you?", hook: "tarde ≈ EN “tardy” — late in the day = afternoon." },
  { id: "buenas-noches", es: "buenas noches", en: "good evening / good night", pron: "BWEH-nahs NOH-chehs", cat: "saludos", pri: 2, ex: "Buenas noches, hasta mañana.", exEn: "Good night, see you tomorrow.", hook: "noche ≈ “nocturnal”; SK noc = night." },
  { id: "que-tal", es: "¿qué tal?", en: "how's it going?", pron: "keh TAHL", cat: "saludos", pri: 2, ex: "¡Hola! ¿Qué tal?", exEn: "Hi! How's it going?", hook: "qué = “what” → literally “what such?”" },
  { id: "como-estas", es: "¿cómo estás?", en: "how are you?", pron: "KOH-moh ehs-TAHS", cat: "saludos", pri: 1, ex: "Hola María, ¿cómo estás?", exEn: "Hi María, how are you?", hook: "estar ≈ “state / status” — how's your state?" },
  { id: "como-esta-usted", es: "¿cómo está usted?", en: "how are you? (formal)", pron: "KOH-moh ehs-TAH oos-TEHD", cat: "saludos", pri: 2, ex: "Buenos días, ¿cómo está usted?", exEn: "Good morning, how are you?", hook: "usted = the polite “you”." },
  { id: "que-onda", es: "¿qué onda?", en: "what's up? (casual)", pron: "keh OHN-dah", cat: "saludos", pri: 3, ex: "¿Qué onda, amigo?", exEn: "What's up, buddy?", hook: "onda ≈ “undulate” (a wave) → “what wave?”" },
  { id: "adios", es: "adiós", en: "goodbye", pron: "ah-DYOHS", cat: "saludos", pri: 1, ex: "Adiós, que te vaya bien.", exEn: "Goodbye, take care.", hook: "English borrows “adios”; a + Dios = “to God”." },
  { id: "chau", es: "chau", en: "bye", pron: "chow", cat: "saludos", pri: 2, ex: "Chau, nos hablamos luego.", exEn: "Bye, we'll talk later.", hook: "Same as Italian “ciao”." },
  { id: "hasta-luego", es: "hasta luego", en: "see you later", pron: "AHS-tah LWEH-goh", cat: "saludos", pri: 2, ex: "Me voy, hasta luego.", exEn: "I'm off, see you later.", hook: "hasta = “until”, luego = “later”." },
  { id: "hasta-manana", es: "hasta mañana", en: "see you tomorrow", pron: "AHS-tah mah-NYAH-nah", cat: "saludos", pri: 2, ex: "Buen trabajo, hasta mañana.", exEn: "Good work, see you tomorrow.", hook: "English borrows “mañana” = tomorrow." },
  { id: "hasta-pronto", es: "hasta pronto", en: "see you soon", pron: "AHS-tah PROHN-toh", cat: "saludos", pri: 3, ex: "Gracias por todo, hasta pronto.", exEn: "Thanks for everything, see you soon.", hook: "pronto ≈ EN “pronto” (quickly) = soon." },
  { id: "nos-vemos", es: "nos vemos", en: "see you", pron: "nohs VEH-mohs", cat: "saludos", pri: 2, ex: "Nos vemos el viernes.", exEn: "See you on Friday.", hook: "ver ≈ “view” → “we see each other”." },
  { id: "bienvenido", es: "bienvenido", en: "welcome", pron: "byehn-veh-NEE-doh", cat: "saludos", pri: 3, ex: "¡Bienvenido a mi casa!", exEn: "Welcome to my home!", hook: "bien + venido = literally “well-come”." },

  // ── Cortesía (12) ─────────────────────────────────────────
  { id: "por-favor", es: "por favor", en: "please", pron: "por fah-VOR", cat: "cortesia", pri: 1, ex: "Un café, por favor.", exEn: "A coffee, please.", hook: "favor ≈ EN “favour” → “as a favour” = please." },
  { id: "gracias", es: "gracias", en: "thank you", pron: "GRAH-syahs", cat: "cortesia", pri: 1, ex: "Muchas gracias por tu ayuda.", exEn: "Thank you very much for your help.", hook: "≈ “gratitude / grace”." },
  { id: "muchas-gracias", es: "muchas gracias", en: "thank you very much", pron: "MOO-chahs GRAH-syahs", cat: "cortesia", pri: 2, ex: "Muchas gracias, muy amable.", exEn: "Thank you very much, that's very kind.", hook: "mucho ≈ “much” + gracias." },
  { id: "de-nada", es: "de nada", en: "you're welcome", pron: "deh NAH-dah", cat: "cortesia", pri: 1, ex: "—Gracias. —De nada.", exEn: "—Thanks. —You're welcome.", hook: "nada = nothing (“annihilate”) → “it's nothing”." },
  { id: "con-gusto", es: "con gusto", en: "my pleasure", pron: "kohn GOOS-toh", cat: "cortesia", pri: 3, ex: "Con gusto te ayudo.", exEn: "I'll gladly help you.", hook: "gusto ≈ EN “gusto” = with pleasure." },
  { id: "perdon", es: "perdón", en: "sorry / excuse me", pron: "per-DOHN", cat: "cortesia", pri: 1, ex: "Perdón, ¿me repites eso?", exEn: "Sorry, can you repeat that?", hook: "≈ EN “pardon”." },
  { id: "disculpa", es: "disculpa", en: "excuse me (informal)", pron: "dees-KOOL-pah", cat: "cortesia", pri: 2, ex: "Disculpa, ¿tienes hora?", exEn: "Excuse me, do you have the time?", hook: "≈ “dis-culpa” = un-blame → excuse (culprit)." },
  { id: "lo-siento", es: "lo siento", en: "I'm sorry", pron: "loh SYEHN-toh", cat: "cortesia", pri: 1, ex: "Lo siento, fue mi culpa.", exEn: "I'm sorry, it was my fault.", hook: "sentir ≈ “sentiment” → “I feel it”." },
  { id: "con-permiso", es: "con permiso", en: "excuse me (passing by)", pron: "kohn per-MEE-soh", cat: "cortesia", pri: 3, ex: "Con permiso, voy a pasar.", exEn: "Excuse me, I'm coming through.", hook: "permiso ≈ “permission” → “with your permission”." },
  { id: "no-hay-problema", es: "no hay problema", en: "no problem", pron: "noh eye proh-BLEH-mah", cat: "cortesia", pri: 2, ex: "No hay problema, yo lo hago.", exEn: "No problem, I'll do it.", hook: "problema ≈ “problem”; SK problém." },
  { id: "salud", es: "salud", en: "cheers / bless you", pron: "sah-LOOD", cat: "cortesia", pri: 3, ex: "¡Salud, por nosotros!", exEn: "Cheers, to us!", hook: "≈ “salutary / salute” = health → cheers." },
  { id: "encantado", es: "encantado", en: "delighted (to meet you)", pron: "ehn-kahn-TAH-doh", cat: "cortesia", pri: 3, ex: "Encantado de conocerte.", exEn: "Delighted to meet you.", hook: "≈ “enchanted” to meet you." },

  // ── Presentarse (15) ──────────────────────────────────────
  { id: "me-llamo", es: "me llamo…", en: "my name is…", pron: "meh YAH-moh", cat: "presentarse", pri: 1, ex: "Hola, me llamo Ana.", exEn: "Hi, my name is Ana.", hook: "llamar ≈ “claim / clamour” (to call) → “I call myself”." },
  { id: "soy", es: "soy…", en: "I am…", pron: "soy", cat: "presentarse", pri: 1, ex: "Soy profesor de inglés.", exEn: "I am an English teacher.", hook: "From ser; think “soy = so I am”." },
  { id: "mi-nombre-es", es: "mi nombre es…", en: "my name is…", pron: "mee NOHM-breh ehs", cat: "presentarse", pri: 2, ex: "Mi nombre es Carlos.", exEn: "My name is Carlos.", hook: "nombre ≈ “nominal / name”." },
  { id: "como-te-llamas", es: "¿cómo te llamas?", en: "what's your name?", pron: "KOH-moh teh YAH-mahs", cat: "presentarse", pri: 1, ex: "¿Cómo te llamas?", exEn: "What's your name?", hook: "Literally “how do you call yourself?”" },
  { id: "mucho-gusto", es: "mucho gusto", en: "nice to meet you", pron: "MOO-choh GOOS-toh", cat: "presentarse", pri: 1, ex: "Mucho gusto, soy Pedro.", exEn: "Nice to meet you, I'm Pedro.", hook: "gusto ≈ “gusto” → much pleasure." },
  { id: "igualmente", es: "igualmente", en: "likewise", pron: "ee-gwahl-MEHN-teh", cat: "presentarse", pri: 2, ex: "—Mucho gusto. —Igualmente.", exEn: "—Nice to meet you. —Likewise.", hook: "igual ≈ “equal” → “equally / likewise”." },
  { id: "soy-de", es: "soy de…", en: "I'm from…", pron: "soy deh", cat: "presentarse", pri: 1, ex: "Soy de México.", exEn: "I'm from Mexico.", hook: "de = “of / from” (as in “de luxe”)." },
  { id: "de-donde-eres", es: "¿de dónde eres?", en: "where are you from?", pron: "deh DOHN-deh EH-rehs", cat: "presentarse", pri: 1, ex: "¿De dónde eres?", exEn: "Where are you from?", hook: "dónde = where → “from where are you?”" },
  { id: "vivo-en", es: "vivo en…", en: "I live in…", pron: "VEE-voh ehn", cat: "presentarse", pri: 2, ex: "Vivo en Guadalajara.", exEn: "I live in Guadalajara.", hook: "vivir ≈ “vivid / survive” = to live." },
  { id: "tengo-anos", es: "tengo … años", en: "I'm … years old", pron: "TEHN-goh … AH-nyohs", cat: "presentarse", pri: 2, ex: "Tengo treinta años.", exEn: "I'm thirty years old.", hook: "año ≈ “annual / anniversary” = year." },
  { id: "trabajo-en", es: "trabajo en…", en: "I work in / at…", pron: "trah-BAH-hoh ehn", cat: "presentarse", pri: 2, ex: "Trabajo en un hospital.", exEn: "I work at a hospital.", hook: "trabajo ≈ “travail” (hard work)." },
  { id: "estudio", es: "estudio…", en: "I study…", pron: "ehs-TOO-dyoh", cat: "presentarse", pri: 2, ex: "Estudio medicina.", exEn: "I study medicine.", hook: "≈ “study”; SK štúdium." },
  { id: "hablo-un-poco-de-espanol", es: "hablo un poco de español", en: "I speak a little Spanish", pron: "AH-bloh oon POH-koh deh ehs-pah-NYOHL", cat: "presentarse", pri: 2, ex: "Hablo un poco de español.", exEn: "I speak a little Spanish.", hook: "poco ≈ “paucity” = little." },
  { id: "estoy-aprendiendo-espanol", es: "estoy aprendiendo español", en: "I'm learning Spanish", pron: "ehs-TOY ah-prehn-DYEHN-doh ehs-pah-NYOHL", cat: "presentarse", pri: 2, ex: "Estoy aprendiendo español.", exEn: "I'm learning Spanish.", hook: "aprender ≈ “apprentice” = to learn." },
  { id: "este-es-mi-amigo", es: "este es mi amigo", en: "this is my friend", pron: "EHS-teh ehs mee ah-MEE-goh", cat: "presentarse", pri: 3, ex: "Mira, este es mi amigo Luis.", exEn: "Look, this is my friend Luis.", hook: "amigo ≈ “amicable / amigo” = friend." },

  // ── Preguntas para romper el hielo (15) ───────────────────
  { id: "como-te-va", es: "¿cómo te va?", en: "how's it going for you?", pron: "KOH-moh teh vah", cat: "preguntas", pri: 2, ex: "¿Cómo te va en el trabajo?", exEn: "How's it going at work?", hook: "va from ir “to go” → “how goes it?”" },
  { id: "que-haces", es: "¿qué haces?", en: "what do you do? / what are you doing?", pron: "keh AH-sehs", cat: "preguntas", pri: 2, ex: "¿Qué haces este fin de semana?", exEn: "What are you doing this weekend?", hook: "hacer ≈ “factory / fact” (to make/do)." },
  { id: "a-que-te-dedicas", es: "¿a qué te dedicas?", en: "what do you do (for work)?", pron: "ah keh teh deh-DEE-kahs", cat: "preguntas", pri: 2, ex: "¿A qué te dedicas?", exEn: "What do you do for work?", hook: "dedicar ≈ “dedicate” → what you dedicate yourself to." },
  { id: "que-te-gusta-hacer", es: "¿qué te gusta hacer?", en: "what do you like to do?", pron: "keh teh GOOS-tah ah-SEHR", cat: "preguntas", pri: 2, ex: "¿Qué te gusta hacer los domingos?", exEn: "What do you like to do on Sundays?", hook: "gustar ≈ “gusto” = to please/like." },
  { id: "tienes-hermanos", es: "¿tienes hermanos?", en: "do you have siblings?", pron: "TYEH-nehs er-MAH-nohs", cat: "preguntas", pri: 3, ex: "¿Tienes hermanos?", exEn: "Do you have siblings?", hook: "hermano = brother/sibling (Latin germanus → “germane”)." },
  { id: "de-que-parte-eres", es: "¿de qué parte eres?", en: "what part are you from?", pron: "deh keh PAR-teh EH-rehs", cat: "preguntas", pri: 3, ex: "¿De qué parte de México eres?", exEn: "What part of Mexico are you from?", hook: "parte ≈ “part”." },
  { id: "hablas-ingles", es: "¿hablas inglés?", en: "do you speak English?", pron: "AH-blahs een-GLEHS", cat: "preguntas", pri: 2, ex: "Perdón, ¿hablas inglés?", exEn: "Excuse me, do you speak English?", hook: "inglés ≈ “English”." },
  { id: "que-musica-te-gusta", es: "¿qué música te gusta?", en: "what music do you like?", pron: "keh MOO-see-kah teh GOOS-tah", cat: "preguntas", pri: 3, ex: "¿Qué música te gusta?", exEn: "What music do you like?", hook: "música ≈ “music”; SK muzika." },
  { id: "tienes-planes", es: "¿tienes planes?", en: "do you have plans?", pron: "TYEH-nehs PLAH-nehs", cat: "preguntas", pri: 3, ex: "¿Tienes planes para hoy?", exEn: "Do you have plans for today?", hook: "planes ≈ “plans”; SK plán." },
  { id: "cual-es-tu-comida-favorita", es: "¿cuál es tu comida favorita?", en: "what's your favorite food?", pron: "kwahl ehs too koh-MEE-dah fah-voh-REE-tah", cat: "preguntas", pri: 3, ex: "¿Cuál es tu comida favorita?", exEn: "What's your favorite food?", hook: "favorita ≈ “favourite”; SK favorit." },
  { id: "te-gusta-viajar", es: "¿te gusta viajar?", en: "do you like to travel?", pron: "teh GOOS-tah vyah-HAR", cat: "preguntas", pri: 3, ex: "¿Te gusta viajar?", exEn: "Do you like to travel?", hook: "viajar ≈ “voyage” = to travel." },
  { id: "vienes-seguido", es: "¿vienes seguido?", en: "do you come here often?", pron: "VYEH-nehs seh-GEE-doh", cat: "preguntas", pri: 3, ex: "¿Vienes seguido a este café?", exEn: "Do you come to this café often?", hook: "seguido ≈ “sequence / consecutive” = often." },
  { id: "que-recomiendas", es: "¿qué recomiendas?", en: "what do you recommend?", pron: "keh reh-koh-MYEHN-dahs", cat: "preguntas", pri: 2, ex: "¿Qué recomiendas del menú?", exEn: "What do you recommend from the menu?", hook: "recomendar ≈ “recommend”." },
  { id: "me-puedes-ayudar", es: "¿me puedes ayudar?", en: "can you help me?", pron: "meh PWEH-dehs ah-yoo-DAR", cat: "preguntas", pri: 2, ex: "¿Me puedes ayudar, por favor?", exEn: "Can you help me, please?", hook: "poder ≈ “potent” (can); ayudar ≈ “aid”." },
  { id: "nos-conocemos", es: "¿nos conocemos?", en: "have we met?", pron: "nohs koh-noh-SEH-mohs", cat: "preguntas", pri: 3, ex: "Perdona, ¿nos conocemos?", exEn: "Sorry, have we met?", hook: "conocer ≈ “recognise / cognition”." },

  // ── Respuestas comunes (12) ───────────────────────────────
  { id: "si", es: "sí", en: "yes", pron: "see", cat: "respuestas", pri: 1, ex: "—¿Vienes? —Sí.", exEn: "—Are you coming? —Yes.", hook: "Sounds like EN “see” → “yes, I see”." },
  { id: "no", es: "no", en: "no", pron: "noh", cat: "respuestas", pri: 1, ex: "No, gracias.", exEn: "No, thank you.", hook: "Same as EN “no”; SK nie." },
  { id: "bien", es: "bien", en: "well / fine", pron: "byehn", cat: "respuestas", pri: 1, ex: "—¿Cómo estás? —Bien.", exEn: "—How are you? —Fine.", hook: "≈ “benefit / benign” = good/well." },
  { id: "muy-bien", es: "muy bien", en: "very well", pron: "mwee byehn", cat: "respuestas", pri: 1, ex: "Todo va muy bien, gracias.", exEn: "Everything's going very well, thanks.", hook: "muy = very + bien = well." },
  { id: "mas-o-menos", es: "más o menos", en: "so-so", pron: "mahs oh MEH-nohs", cat: "respuestas", pri: 2, ex: "—¿Qué tal? —Más o menos.", exEn: "—How's it going? —So-so.", hook: "más ≈ “mass/plus” (more); menos ≈ “minus” (less)." },
  { id: "claro", es: "claro", en: "of course / sure", pron: "KLAH-roh", cat: "respuestas", pri: 1, ex: "—¿Me ayudas? —¡Claro!", exEn: "—Will you help me? —Of course!", hook: "≈ “clear” → “clearly, sure”." },
  { id: "por-supuesto", es: "por supuesto", en: "of course", pron: "por soo-PWEHS-toh", cat: "respuestas", pri: 2, ex: "Por supuesto que puedes.", exEn: "Of course you can.", hook: "supuesto ≈ “supposed / presupposed” → of course." },
  { id: "esta-bien", es: "está bien", en: "it's okay / alright", pron: "ehs-TAH byehn", cat: "respuestas", pri: 1, ex: "Está bien, no te preocupes.", exEn: "It's okay, don't worry.", hook: "“it is in a good state”." },
  { id: "no-se", es: "no sé", en: "I don't know", pron: "noh seh", cat: "respuestas", pri: 1, ex: "No sé dónde está.", exEn: "I don't know where it is.", hook: "saber ≈ “savvy” (to know) → “I don't know”." },
  { id: "no-entiendo", es: "no entiendo", en: "I don't understand", pron: "noh ehn-TYEHN-doh", cat: "respuestas", pri: 1, ex: "Perdón, no entiendo.", exEn: "Sorry, I don't understand.", hook: "entender ≈ “attend / intend” = to understand." },
  { id: "tal-vez", es: "tal vez", en: "maybe", pron: "tahl vehs", cat: "respuestas", pri: 2, ex: "Tal vez mañana.", exEn: "Maybe tomorrow.", hook: "vez ≈ “vice / -times” → “such a time” = maybe." },
  { id: "creo-que-si", es: "creo que sí", en: "I think so", pron: "KREH-oh keh see", cat: "respuestas", pri: 2, ex: "—¿Está abierto? —Creo que sí.", exEn: "—Is it open? —I think so.", hook: "creer ≈ “credo / creed” = to believe." },

  // ── Palabras de pregunta (10) ─────────────────────────────
  { id: "que", es: "qué", en: "what", pron: "keh", cat: "interrog", pri: 1, ex: "¿Qué es esto?", exEn: "What is this?", hook: "The Latin “qu-” of English question words." },
  { id: "quien", es: "quién", en: "who", pron: "kyehn", cat: "interrog", pri: 1, ex: "¿Quién es él?", exEn: "Who is he?", hook: "From Latin qui → the “wh-/qu-” of “who”." },
  { id: "donde", es: "dónde", en: "where", pron: "DOHN-deh", cat: "interrog", pri: 1, ex: "¿Dónde está el baño?", exEn: "Where is the bathroom?", hook: "Think “DON-de is the place” = where." },
  { id: "cuando", es: "cuándo", en: "when", pron: "KWAHN-doh", cat: "interrog", pri: 1, ex: "¿Cuándo llegas?", exEn: "When do you arrive?", hook: "Latin quando → “when”." },
  { id: "por-que", es: "por qué", en: "why", pron: "por KEH", cat: "interrog", pri: 1, ex: "¿Por qué no vienes?", exEn: "Why aren't you coming?", hook: "Literally “for what” = why." },
  { id: "como", es: "cómo", en: "how", pron: "KOH-moh", cat: "interrog", pri: 1, ex: "¿Cómo se dice esto?", exEn: "How do you say this?", hook: "Italian “come” = how." },
  { id: "cual", es: "cuál", en: "which", pron: "kwahl", cat: "interrog", pri: 2, ex: "¿Cuál prefieres?", exEn: "Which one do you prefer?", hook: "≈ “quality / qual-” → which one." },
  { id: "cuanto", es: "cuánto", en: "how much", pron: "KWAHN-toh", cat: "interrog", pri: 1, ex: "¿Cuánto cuesta?", exEn: "How much does it cost?", hook: "≈ “quantity” = how much." },
  { id: "cuantos", es: "cuántos", en: "how many", pron: "KWAHN-tohs", cat: "interrog", pri: 2, ex: "¿Cuántos años tienes?", exEn: "How old are you?", hook: "≈ “quantity” (plural) = how many." },
  { id: "para-que", es: "para qué", en: "what for", pron: "PAH-rah keh", cat: "interrog", pri: 3, ex: "¿Para qué es esto?", exEn: "What is this for?", hook: "para = “for” → “for what?”" },

  // ── Sentimientos y estados (12) ───────────────────────────
  { id: "feliz", es: "feliz", en: "happy", pron: "feh-LEES", cat: "sentimientos", pri: 2, ex: "Hoy estoy muy feliz.", exEn: "Today I'm very happy.", hook: "≈ “felicity / felicitations” = happy." },
  { id: "triste", es: "triste", en: "sad", pron: "TREES-teh", cat: "sentimientos", pri: 2, ex: "Estoy un poco triste.", exEn: "I'm a little sad.", hook: "≈ EN “triste” (poetic) = sad." },
  { id: "cansado", es: "cansado", en: "tired", pron: "kahn-SAH-doh", cat: "sentimientos", pri: 2, ex: "Estoy muy cansado hoy.", exEn: "I'm very tired today.", hook: "Mnemonic: too tired to “can-do”." },
  { id: "contento", es: "contento", en: "glad / content", pron: "kohn-TEHN-toh", cat: "sentimientos", pri: 3, ex: "Estoy contento con el resultado.", exEn: "I'm glad with the result.", hook: "≈ “content” = glad." },
  { id: "emocionado", es: "emocionado", en: "excited", pron: "eh-moh-syoh-NAH-doh", cat: "sentimientos", pri: 3, ex: "Estoy emocionado por el viaje.", exEn: "I'm excited about the trip.", hook: "≈ “emotional” → moved/excited." },
  { id: "nervioso", es: "nervioso", en: "nervous", pron: "ner-VYOH-soh", cat: "sentimientos", pri: 3, ex: "Estoy nervioso por el examen.", exEn: "I'm nervous about the exam.", hook: "≈ “nervous”; SK nervózny." },
  { id: "tengo-hambre", es: "tengo hambre", en: "I'm hungry", pron: "TEHN-goh AHM-breh", cat: "sentimientos", pri: 1, ex: "Tengo hambre, vamos a comer.", exEn: "I'm hungry, let's eat.", hook: "Mnemonic: “HAM-bre” — hungry for ham." },
  { id: "tengo-sed", es: "tengo sed", en: "I'm thirsty", pron: "TEHN-goh sehd", cat: "sentimientos", pri: 2, ex: "Tengo sed, ¿hay agua?", exEn: "I'm thirsty, is there water?", hook: "sed = thirst (as in “sedentary in the desert, thirsty”)." },
  { id: "tengo-frio", es: "tengo frío", en: "I'm cold", pron: "TEHN-goh FREE-oh", cat: "sentimientos", pri: 2, ex: "Tengo frío, cierra la ventana.", exEn: "I'm cold, close the window.", hook: "frío ≈ “frigid / fridge” = cold." },
  { id: "tengo-calor", es: "tengo calor", en: "I'm hot", pron: "TEHN-goh kah-LOR", cat: "sentimientos", pri: 2, ex: "Tengo calor, hace mucho sol.", exEn: "I'm hot, it's very sunny.", hook: "calor ≈ “calorie / scald” = heat." },
  { id: "estoy-bien", es: "estoy bien", en: "I'm fine", pron: "ehs-TOY byehn", cat: "sentimientos", pri: 1, ex: "Gracias, estoy bien.", exEn: "Thanks, I'm fine.", hook: "estar (state) + bien (well)." },
  { id: "estoy-ocupado", es: "estoy ocupado", en: "I'm busy", pron: "ehs-TOY oh-koo-PAH-doh", cat: "sentimientos", pri: 2, ex: "Ahora estoy ocupado.", exEn: "I'm busy right now.", hook: "ocupado ≈ “occupied” = busy." },

  // ── Verbos esenciales (20) ────────────────────────────────
  { id: "ser", es: "ser", en: "to be (permanent)", pron: "sehr", cat: "verbos", pri: 1, ex: "Quiero ser médico.", exEn: "I want to be a doctor.", hook: "≈ “essence” → permanent being." },
  { id: "estar", es: "estar", en: "to be (state/place)", pron: "ehs-TAR", cat: "verbos", pri: 1, ex: "¿Dónde vas a estar?", exEn: "Where are you going to be?", hook: "≈ “state / status / stay” → temporary being." },
  { id: "tener", es: "tener", en: "to have", pron: "teh-NEHR", cat: "verbos", pri: 1, ex: "Voy a tener una reunión.", exEn: "I'm going to have a meeting.", hook: "≈ “tenant / tenure” (to hold) = have." },
  { id: "hacer", es: "hacer", en: "to do / make", pron: "ah-SEHR", cat: "verbos", pri: 1, ex: "¿Qué vas a hacer hoy?", exEn: "What are you going to do today?", hook: "Latin facere ≈ “factory / fact” = make/do." },
  { id: "ir", es: "ir", en: "to go", pron: "eer", cat: "verbos", pri: 1, ex: "Quiero ir al cine.", exEn: "I want to go to the movies.", hook: "Latin ire ≈ “itinerary / exit” = to go." },
  { id: "venir", es: "venir", en: "to come", pron: "veh-NEER", cat: "verbos", pri: 2, ex: "¿Puedes venir mañana?", exEn: "Can you come tomorrow?", hook: "≈ “advent / venue” (a coming) = to come." },
  { id: "querer", es: "querer", en: "to want / love", pron: "keh-REHR", cat: "verbos", pri: 1, ex: "¿Qué quieres comer?", exEn: "What do you want to eat?", hook: "≈ “query / quest” (to seek) = to want." },
  { id: "poder", es: "poder", en: "to be able to / can", pron: "poh-DEHR", cat: "verbos", pri: 1, ex: "No puedo ir hoy.", exEn: "I can't go today.", hook: "≈ “potent / power” = to be able." },
  { id: "saber", es: "saber", en: "to know (facts)", pron: "sah-BEHR", cat: "verbos", pri: 1, ex: "Quiero saber la verdad.", exEn: "I want to know the truth.", hook: "≈ “savvy / sage” = to know." },
  { id: "conocer", es: "conocer", en: "to know (people/places)", pron: "koh-noh-SEHR", cat: "verbos", pri: 2, ex: "Me gustaría conocer México.", exEn: "I'd like to get to know Mexico.", hook: "≈ “cognition / recognise” = to be acquainted." },
  { id: "hablar", es: "hablar", en: "to speak", pron: "ah-BLAR", cat: "verbos", pri: 1, ex: "¿Podemos hablar un momento?", exEn: "Can we talk for a moment?", hook: "The app's name: ¡Habla! = “Speak!”" },
  { id: "decir", es: "decir", en: "to say / tell", pron: "deh-SEER", cat: "verbos", pri: 1, ex: "¿Qué quieres decir?", exEn: "What do you mean?", hook: "≈ “dictate / diction” = to say." },
  { id: "comer", es: "comer", en: "to eat", pron: "koh-MEHR", cat: "verbos", pri: 1, ex: "Vamos a comer algo.", exEn: "Let's eat something.", hook: "Mnemonic: “come here to eat.”" },
  { id: "beber", es: "beber", en: "to drink", pron: "beh-BEHR", cat: "verbos", pri: 2, ex: "¿Quieres beber algo?", exEn: "Do you want something to drink?", hook: "≈ “imbibe / beverage” = to drink." },
  { id: "gustar", es: "gustar", en: "to like (be pleasing)", pron: "goos-TAR", cat: "verbos", pri: 1, ex: "Me gusta este lugar.", exEn: "I like this place.", hook: "≈ “gusto / disgust” = to please." },
  { id: "entender", es: "entender", en: "to understand", pron: "ehn-tehn-DEHR", cat: "verbos", pri: 2, ex: "Quiero entender mejor.", exEn: "I want to understand better.", hook: "≈ “attend / intend” = to understand." },
  { id: "necesitar", es: "necesitar", en: "to need", pron: "neh-seh-see-TAR", cat: "verbos", pri: 2, ex: "Necesito un poco de ayuda.", exEn: "I need a little help.", hook: "≈ “necessity / necessary” = to need." },
  { id: "ayudar", es: "ayudar", en: "to help", pron: "ah-yoo-DAR", cat: "verbos", pri: 2, ex: "¿Te puedo ayudar?", exEn: "Can I help you?", hook: "≈ “aid” = to help." },
  { id: "trabajar", es: "trabajar", en: "to work", pron: "trah-bah-HAR", cat: "verbos", pri: 2, ex: "Tengo que trabajar hoy.", exEn: "I have to work today.", hook: "≈ “travail” = to labour/work." },
  { id: "vivir", es: "vivir", en: "to live", pron: "vee-VEER", cat: "verbos", pri: 2, ex: "Me gusta vivir aquí.", exEn: "I like living here.", hook: "≈ “vivid / survive / revive” = to live." },

  // ── Conectores y muletillas (12) ──────────────────────────
  { id: "y", es: "y", en: "and", pron: "ee", cat: "conectores", pri: 1, ex: "Tú y yo.", exEn: "You and I.", hook: "One sound, “ee” = and." },
  { id: "pero", es: "pero", en: "but", pron: "PEH-roh", cat: "conectores", pri: 1, ex: "Quiero ir, pero no puedo.", exEn: "I want to go, but I can't.", hook: "Careful: pero = but, but perro = dog!" },
  { id: "porque", es: "porque", en: "because", pron: "POR-keh", cat: "conectores", pri: 1, ex: "No voy porque estoy cansado.", exEn: "I'm not going because I'm tired.", hook: "por + que = “for that” = because." },
  { id: "tambien", es: "también", en: "also / too", pron: "tahm-BYEHN", cat: "conectores", pri: 1, ex: "Yo también quiero.", exEn: "I want to, too.", hook: "tan + bien = “so well too” → also." },
  { id: "entonces", es: "entonces", en: "so / then", pron: "ehn-TOHN-sehs", cat: "conectores", pri: 2, ex: "Entonces, ¿qué hacemos?", exEn: "So, what do we do?", hook: "Mnemonic: “and-then-ces” = then/so." },
  { id: "pues", es: "pues", en: "well… (filler)", pron: "pwehs", cat: "conectores", pri: 2, ex: "Pues… no lo sé.", exEn: "Well… I don't know.", hook: "The Spanish “well…” pause word." },
  { id: "o-sea", es: "o sea", en: "I mean / that is", pron: "oh SEH-ah", cat: "conectores", pri: 3, ex: "Es tarde, o sea, mejor mañana.", exEn: "It's late, I mean, better tomorrow.", hook: "Literally “or be it” = that is / I mean." },
  { id: "ademas", es: "además", en: "besides / moreover", pron: "ah-deh-MAHS", cat: "conectores", pri: 3, ex: "Además, no tengo tiempo.", exEn: "Besides, I don't have time.", hook: "a + de + más = “to more” = moreover." },
  { id: "por-eso", es: "por eso", en: "that's why", pron: "por EH-soh", cat: "conectores", pri: 2, ex: "Por eso llegué tarde.", exEn: "That's why I arrived late.", hook: "por + eso = “for that” = that's why." },
  { id: "aunque", es: "aunque", en: "although", pron: "AH-oon-keh", cat: "conectores", pri: 3, ex: "Iré aunque llueva.", exEn: "I'll go even though it rains.", hook: "Contains que; “even-que” = although." },
  { id: "mientras", es: "mientras", en: "while", pron: "MYEHN-trahs", cat: "conectores", pri: 3, ex: "Espera aquí mientras vuelvo.", exEn: "Wait here while I come back.", hook: "Mnemonic: “meantime-tras” = while/meanwhile." },
  { id: "sin-embargo", es: "sin embargo", en: "however", pron: "seen ehm-BAR-goh", cat: "conectores", pri: 3, ex: "Es caro; sin embargo, me gusta.", exEn: "It's expensive; however, I like it.", hook: "sin = without → “without embargo” = however." },

  // ── Números (16) ──────────────────────────────────────────
  { id: "cero", es: "cero", en: "zero", pron: "SEH-roh", cat: "numeros", pri: 2, ex: "Empezamos desde cero.", exEn: "We start from zero.", hook: "≈ “zero”; SK nula." },
  { id: "uno", es: "uno", en: "one", pron: "OO-noh", cat: "numeros", pri: 1, ex: "Solo quiero uno.", exEn: "I only want one.", hook: "≈ “uno / unit / union” = one." },
  { id: "dos", es: "dos", en: "two", pron: "dohs", cat: "numeros", pri: 1, ex: "Somos dos personas.", exEn: "We are two people.", hook: "≈ “duo / dual” = two." },
  { id: "tres", es: "tres", en: "three", pron: "trehs", cat: "numeros", pri: 1, ex: "Tengo tres hermanos.", exEn: "I have three siblings.", hook: "≈ “trio / triple”; SK tri = three." },
  { id: "cuatro", es: "cuatro", en: "four", pron: "KWAH-troh", cat: "numeros", pri: 1, ex: "Son las cuatro.", exEn: "It's four o'clock.", hook: "≈ “quatro / quart” = four." },
  { id: "cinco", es: "cinco", en: "five", pron: "SEEN-koh", cat: "numeros", pri: 1, ex: "Cinco minutos, por favor.", exEn: "Five minutes, please.", hook: "≈ “cinque / quint(et)” = five." },
  { id: "seis", es: "seis", en: "six", pron: "says", cat: "numeros", pri: 2, ex: "Nos vemos a las seis.", exEn: "See you at six.", hook: "≈ “sextet”; SK šesť = six." },
  { id: "siete", es: "siete", en: "seven", pron: "SYEH-teh", cat: "numeros", pri: 2, ex: "La tienda abre a las siete.", exEn: "The shop opens at seven.", hook: "≈ “septet / September”; SK sedem." },
  { id: "ocho", es: "ocho", en: "eight", pron: "OH-choh", cat: "numeros", pri: 2, ex: "Trabajo ocho horas.", exEn: "I work eight hours.", hook: "≈ “octo / octopus / October” = eight." },
  { id: "nueve", es: "nueve", en: "nine", pron: "NWEH-veh", cat: "numeros", pri: 2, ex: "Llego a las nueve.", exEn: "I arrive at nine.", hook: "≈ “novem / November” = nine." },
  { id: "diez", es: "diez", en: "ten", pron: "dyehs", cat: "numeros", pri: 1, ex: "Cuesta diez pesos.", exEn: "It costs ten pesos.", hook: "≈ “decimal / dime / decade” = ten." },
  { id: "veinte", es: "veinte", en: "twenty", pron: "VAYN-teh", cat: "numeros", pri: 2, ex: "Faltan veinte minutos.", exEn: "There are twenty minutes left.", hook: "≈ “vigin-” (vigintillion) = twenty." },
  { id: "cincuenta", es: "cincuenta", en: "fifty", pron: "seen-KWEHN-tah", cat: "numeros", pri: 3, ex: "Son cincuenta pesos.", exEn: "That's fifty pesos.", hook: "cinco (5) → cincuenta (50)." },
  { id: "cien", es: "cien", en: "one hundred", pron: "syehn", cat: "numeros", pri: 2, ex: "Tengo cien dólares.", exEn: "I have one hundred dollars.", hook: "≈ “cent / century / percent” = hundred." },
  { id: "mil", es: "mil", en: "one thousand", pron: "meel", cat: "numeros", pri: 3, ex: "Cuesta mil pesos.", exEn: "It costs a thousand pesos.", hook: "≈ “mille / millennium / mile” = thousand." },
  { id: "primero", es: "primero", en: "first", pron: "pree-MEH-roh", cat: "numeros", pri: 2, ex: "Tú vas primero.", exEn: "You go first.", hook: "≈ “primary / premier / prime” = first." },

  // ── Tiempo y días (15) ────────────────────────────────────
  { id: "hoy", es: "hoy", en: "today", pron: "oy", cat: "tiempo", pri: 1, ex: "Hoy es un buen día.", exEn: "Today is a good day.", hook: "Mnemonic: “oy! — today!”" },
  { id: "manana", es: "mañana", en: "tomorrow / morning", pron: "mah-NYAH-nah", cat: "tiempo", pri: 1, ex: "Te veo mañana.", exEn: "I'll see you tomorrow.", hook: "English borrows “mañana” = tomorrow." },
  { id: "ayer", es: "ayer", en: "yesterday", pron: "ah-YEHR", cat: "tiempo", pri: 2, ex: "Ayer fui al mercado.", exEn: "Yesterday I went to the market.", hook: "Fr “hier”, Latin heri = yesterday." },
  { id: "ahora", es: "ahora", en: "now", pron: "ah-OH-rah", cat: "tiempo", pri: 1, ex: "Lo hago ahora mismo.", exEn: "I'll do it right now.", hook: "Contains hora (hour) → “at this hour” = now." },
  { id: "despues", es: "después", en: "after / later", pron: "dehs-PWEHS", cat: "tiempo", pri: 2, ex: "Hablamos después.", exEn: "We'll talk later.", hook: "≈ “post-” → after/later." },
  { id: "siempre", es: "siempre", en: "always", pron: "SYEHM-preh", cat: "tiempo", pri: 2, ex: "Siempre tomo café.", exEn: "I always drink coffee.", hook: "Music term “sempre” = always." },
  { id: "nunca", es: "nunca", en: "never", pron: "NOON-kah", cat: "tiempo", pri: 2, ex: "Nunca he estado allí.", exEn: "I've never been there.", hook: "Mnemonic: “none-ka” = never." },
  { id: "lunes", es: "lunes", en: "Monday", pron: "LOO-nehs", cat: "tiempo", pri: 2, ex: "El lunes empiezo.", exEn: "I start on Monday.", hook: "luna (moon) → Monday = moon-day." },
  { id: "martes", es: "martes", en: "Tuesday", pron: "MAR-tehs", cat: "tiempo", pri: 3, ex: "El martes tengo clase.", exEn: "On Tuesday I have class.", hook: "Marte (Mars) → Tuesday (cf. Fr mardi)." },
  { id: "miercoles", es: "miércoles", en: "Wednesday", pron: "MYEHR-koh-lehs", cat: "tiempo", pri: 3, ex: "Nos vemos el miércoles.", exEn: "See you on Wednesday.", hook: "Mercurio (Mercury) → Wednesday." },
  { id: "jueves", es: "jueves", en: "Thursday", pron: "HWEH-vehs", cat: "tiempo", pri: 3, ex: "El jueves es feriado.", exEn: "Thursday is a holiday.", hook: "Júpiter/Jove → Thursday (cf. Fr jeudi)." },
  { id: "viernes", es: "viernes", en: "Friday", pron: "VYEHR-nehs", cat: "tiempo", pri: 2, ex: "Por fin es viernes.", exEn: "It's finally Friday.", hook: "Venus → Friday (cf. Fr vendredi)." },
  { id: "sabado", es: "sábado", en: "Saturday", pron: "SAH-bah-doh", cat: "tiempo", pri: 2, ex: "El sábado descanso.", exEn: "On Saturday I rest.", hook: "≈ “Sabbath”; SK sobota." },
  { id: "domingo", es: "domingo", en: "Sunday", pron: "doh-MEEN-goh", cat: "tiempo", pri: 2, ex: "El domingo veo a mi familia.", exEn: "On Sunday I see my family.", hook: "“dominical” (the Lord's day) = Sunday." },
  { id: "fin-de-semana", es: "fin de semana", en: "weekend", pron: "feen deh seh-MAH-nah", cat: "tiempo", pri: 2, ex: "¡Buen fin de semana!", exEn: "Have a good weekend!", hook: "fin ≈ “final” + semana (week) = weekend." },

  // ── Personas y familia (12) ───────────────────────────────
  { id: "amigo", es: "amigo", en: "friend (m)", pron: "ah-MEE-goh", cat: "personas", pri: 1, ex: "Él es mi mejor amigo.", exEn: "He is my best friend.", hook: "≈ “amigo / amicable / amity” = friend." },
  { id: "amiga", es: "amiga", en: "friend (f)", pron: "ah-MEE-gah", cat: "personas", pri: 2, ex: "Ella es una buena amiga.", exEn: "She is a good friend.", hook: "amigo → amiga: -a marks female." },
  { id: "familia", es: "familia", en: "family", pron: "fah-MEE-lyah", cat: "personas", pri: 1, ex: "Quiero mucho a mi familia.", exEn: "I love my family very much.", hook: "≈ “family”; SK família / familiárny." },
  { id: "madre", es: "madre", en: "mother", pron: "MAH-dreh", cat: "personas", pri: 1, ex: "Mi madre cocina muy bien.", exEn: "My mother cooks very well.", hook: "≈ “maternal”; SK matka = mother." },
  { id: "padre", es: "padre", en: "father", pron: "PAH-dreh", cat: "personas", pri: 1, ex: "Mi padre trabaja mucho.", exEn: "My father works a lot.", hook: "≈ “paternal / padre”." },
  { id: "hermano", es: "hermano", en: "brother", pron: "er-MAH-noh", cat: "personas", pri: 2, ex: "Tengo un hermano menor.", exEn: "I have a younger brother.", hook: "Latin germanus → “germane” (of the same stock) = brother." },
  { id: "hermana", es: "hermana", en: "sister", pron: "er-MAH-nah", cat: "personas", pri: 2, ex: "Mi hermana vive en Perú.", exEn: "My sister lives in Peru.", hook: "hermano → hermana: -a marks female." },
  { id: "hijo", es: "hijo", en: "son", pron: "EE-hoh", cat: "personas", pri: 2, ex: "Su hijo tiene cinco años.", exEn: "Her son is five years old.", hook: "Latin filius (cf. “filial”); j is a soft H." },
  { id: "hija", es: "hija", en: "daughter", pron: "EE-hah", cat: "personas", pri: 2, ex: "Mi hija estudia arte.", exEn: "My daughter studies art.", hook: "hijo → hija: -a marks female." },
  { id: "novio", es: "novio", en: "boyfriend", pron: "NOH-vyoh", cat: "personas", pri: 3, ex: "Él es mi novio.", exEn: "He is my boyfriend.", hook: "≈ “nov-” (new) → a new(-ish) partner; cf. “novice”." },
  { id: "novia", es: "novia", en: "girlfriend", pron: "NOH-vyah", cat: "personas", pri: 3, ex: "Ella es mi novia.", exEn: "She is my girlfriend.", hook: "novio → novia; also “bride” (cf. “nuptial”)." },
  { id: "gente", es: "gente", en: "people", pron: "HEHN-teh", cat: "personas", pri: 2, ex: "Hay mucha gente aquí.", exEn: "There are a lot of people here.", hook: "≈ “gentry / gentile” = folk/people." },

  // ── Lugares comunes (10) ──────────────────────────────────
  { id: "casa", es: "casa", en: "house / home", pron: "KAH-sah", cat: "lugares", pri: 1, ex: "Voy a casa.", exEn: "I'm going home.", hook: "English uses “casa”; cf. “casino” (little house)." },
  { id: "trabajo", es: "trabajo", en: "work / job", pron: "trah-BAH-hoh", cat: "lugares", pri: 1, ex: "Me gusta mi trabajo.", exEn: "I like my job.", hook: "≈ “travail” = work/labour." },
  { id: "escuela", es: "escuela", en: "school", pron: "ehs-KWEH-lah", cat: "lugares", pri: 2, ex: "Los niños están en la escuela.", exEn: "The children are at school.", hook: "≈ “school / scholar”; SK škola." },
  { id: "restaurante", es: "restaurante", en: "restaurant", pron: "rehs-tow-RAHN-teh", cat: "lugares", pri: 2, ex: "Conozco un buen restaurante.", exEn: "I know a good restaurant.", hook: "≈ “restaurant”; SK reštaurácia." },
  { id: "bano", es: "baño", en: "bathroom", pron: "BAH-nyoh", cat: "lugares", pri: 1, ex: "¿Dónde está el baño?", exEn: "Where is the bathroom?", hook: "≈ “bath / bagno” = bathroom." },
  { id: "calle", es: "calle", en: "street", pron: "KAH-yeh", cat: "lugares", pri: 2, ex: "Vivo en esta calle.", exEn: "I live on this street.", hook: "Latin callis (path); cf. Italian “calle”." },
  { id: "ciudad", es: "ciudad", en: "city", pron: "syoo-DAHD", cat: "lugares", pri: 2, ex: "Es una ciudad muy bonita.", exEn: "It's a very beautiful city.", hook: "Latin civitas ≈ “city / civic”." },
  { id: "pais", es: "país", en: "country", pron: "pah-EES", cat: "lugares", pri: 2, ex: "¿De qué país eres?", exEn: "What country are you from?", hook: "Fr “pays” → cf. “peasant / landscape” = country." },
  { id: "aqui", es: "aquí", en: "here", pron: "ah-KEE", cat: "lugares", pri: 1, ex: "Ven aquí, por favor.", exEn: "Come here, please.", hook: "Mnemonic: “a-KEY is right here”." },
  { id: "alli", es: "allí", en: "there", pron: "ah-YEE", cat: "lugares", pri: 2, ex: "Está allí, en la mesa.", exEn: "It's there, on the table.", hook: "aquí (here) vs allí (there) — “a-YEE, over there”." },

  // ── Sustantivos útiles (11) ───────────────────────────────
  { id: "agua", es: "agua", en: "water", pron: "AH-gwah", cat: "utiles", pri: 1, ex: "Un vaso de agua, por favor.", exEn: "A glass of water, please.", hook: "Latin aqua → “aquarium / aquatic” = water." },
  { id: "cafe", es: "café", en: "coffee", pron: "kah-FEH", cat: "utiles", pri: 1, ex: "¿Quieres un café?", exEn: "Would you like a coffee?", hook: "≈ “café / coffee”; SK káva." },
  { id: "comida", es: "comida", en: "food", pron: "koh-MEE-dah", cat: "utiles", pri: 1, ex: "La comida está deliciosa.", exEn: "The food is delicious.", hook: "≈ “comestible” (edible) = food; cf. comer." },
  { id: "dinero", es: "dinero", en: "money", pron: "dee-NEH-roh", cat: "utiles", pri: 1, ex: "No tengo dinero hoy.", exEn: "I don't have money today.", hook: "Latin denarius → “dinar”; the coin = money." },
  { id: "tiempo", es: "tiempo", en: "time / weather", pron: "TYEHM-poh", cat: "utiles", pri: 1, ex: "No tengo tiempo ahora.", exEn: "I don't have time now.", hook: "≈ “tempo / temporal” = time." },
  { id: "cosa", es: "cosa", en: "thing", pron: "KOH-sah", cat: "utiles", pri: 2, ex: "Una cosa más, por favor.", exEn: "One more thing, please.", hook: "Fr “chose”, Latin causa = a thing/matter." },
  { id: "dia", es: "día", en: "day", pron: "DEE-ah", cat: "utiles", pri: 1, ex: "¡Que tengas un buen día!", exEn: "Have a good day!", hook: "≈ “diary / diurnal” = day." },
  { id: "nombre", es: "nombre", en: "name", pron: "NOHM-breh", cat: "utiles", pri: 1, ex: "¿Cuál es tu nombre?", exEn: "What's your name?", hook: "≈ “nominal / nominate” = name." },
  { id: "telefono", es: "teléfono", en: "phone", pron: "teh-LEH-foh-noh", cat: "utiles", pri: 2, ex: "¿Me das tu teléfono?", exEn: "Can I have your phone number?", hook: "≈ “telephone”; SK telefón." },
  { id: "idioma", es: "idioma", en: "language", pron: "ee-DYOH-mah", cat: "utiles", pri: 2, ex: "El español es un idioma bonito.", exEn: "Spanish is a beautiful language.", hook: "≈ “idiom” = a language." },
  { id: "palabra", es: "palabra", en: "word", pron: "pah-LAH-brah", cat: "utiles", pri: 2, ex: "No entiendo esta palabra.", exEn: "I don't understand this word.", hook: "≈ “palaver / parable / parole” = word/speech." },
];

// Guard: the whole point of the app is the curated 187.
if (typeof console !== "undefined" && WORDS.length !== 187) {
  console.warn("Expected 187 words, found", WORDS.length);
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { WORDS, CATEGORIES };
}
