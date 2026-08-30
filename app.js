/* Hablá — app logic: spaced repetition, progress, quiz, browse. Vanilla JS. */
(function () {
  "use strict";

  var STORE_KEY = "habla.progress.v1";
  var DAY = 86400000;
  var SESSION_SIZE = 12; // cards per learn session

  // ── Persistence ──────────────────────────────────────────
  // state.cards[es] = { reps, ivl (days), ease, due (ms epoch), lapses }
  // state.streak = { count, last (yyyy-mm-dd) }
  var state = load();

  function load() {
    try {
      var raw = localStorage.getItem(STORE_KEY);
      if (raw) {
        var p = JSON.parse(raw);
        p.cards = p.cards || {};
        p.streak = p.streak || { count: 0, last: null };
        return p;
      }
    } catch (e) { /* corrupt or blocked storage — start fresh */ }
    return { cards: {}, streak: { count: 0, last: null } };
  }

  function save() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); }
    catch (e) { toast("Couldn't save — storage may be full or blocked"); }
  }

  function todayStr() {
    var d = new Date();
    return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
  }

  function cardOf(w) {
    return state.cards[w.es] || { reps: 0, ivl: 0, ease: 2.5, due: 0, lapses: 0 };
  }

  function isKnown(w) {
    var c = state.cards[w.es];
    return !!c && c.reps > 0;
  }

  function isDue(w, now) {
    var c = state.cards[w.es];
    if (!c) return true;            // never seen → available as new
    return c.due <= now;
  }

  // SM-2-lite scheduler
  function schedule(w, grade) {
    var c = cardOf(w);
    var now = Date.now();
    if (grade === "again") {
      c.reps = Math.max(1, c.reps); // it has now been seen
      c.lapses = (c.lapses || 0) + 1;
      c.ease = Math.max(1.3, c.ease - 0.2);
      c.ivl = 0;
      c.due = now + 60 * 1000;      // ~1 minute → resurfaces this session
    } else {
      c.reps += 1;
      if (grade === "hard") {
        c.ease = Math.max(1.3, c.ease - 0.15);
        c.ivl = c.ivl <= 0 ? 1 : Math.max(1, Math.round(c.ivl * 1.2));
      } else { // good
        c.ease = Math.min(2.8, c.ease + 0.05);
        if (c.reps === 1) c.ivl = 1;
        else if (c.reps === 2) c.ivl = 3;
        else c.ivl = Math.round(c.ivl * c.ease);
      }
      c.due = now + c.ivl * DAY;
    }
    state.cards[w.es] = c;
    bumpStreak();
    save();
  }

  function bumpStreak() {
    var t = todayStr();
    if (state.streak.last === t) return;
    var y = new Date(Date.now() - DAY);
    var yStr = y.getFullYear() + "-" + (y.getMonth() + 1) + "-" + y.getDate();
    state.streak.count = state.streak.last === yStr ? state.streak.count + 1 : 1;
    state.streak.last = t;
  }

  // ── Metrics ──────────────────────────────────────────────
  function knownCount() { return WORDS.filter(isKnown).length; }
  function dueCount() {
    var now = Date.now();
    return WORDS.filter(function (w) { return state.cards[w.es] && state.cards[w.es].due <= now; }).length;
  }

  // ── Session builder ──────────────────────────────────────
  // Priority: due review cards first, then brand-new words, capped at SESSION_SIZE.
  function buildSession() {
    var now = Date.now();
    var due = [], fresh = [];
    WORDS.forEach(function (w) {
      var c = state.cards[w.es];
      if (!c) fresh.push(w);
      else if (c.due <= now) due.push(w);
    });
    shuffle(due); shuffle(fresh);
    // Introduce brand-new words highest-frequency first (pri 1 → 3). shuffle
    // above randomizes within a tier; the stable sort keeps that order.
    fresh.sort(function (a, b) { return (a.pri || 2) - (b.pri || 2); });
    var deck = due.concat(fresh).slice(0, SESSION_SIZE);
    if (deck.length === 0) { // all caught up → light review of soonest-due
      deck = WORDS.slice().sort(function (a, b) {
        return (cardOf(a).due || 0) - (cardOf(b).due || 0);
      }).slice(0, SESSION_SIZE);
      shuffle(deck);
    }
    return deck;
  }

  function shuffle(a) {
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  // ── DOM helpers ──────────────────────────────────────────
  function $(id) { return document.getElementById(id); }
  function on(el, ev, fn) { el.addEventListener(ev, fn); }

  // ── Theme (light / dark, with system default) ────────────
  var THEME_KEY = "habla.theme";
  var themeMeta = document.querySelectorAll('meta[name="theme-color"]');
  function systemDark() {
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  }
  function effectiveDark() {
    var t = document.documentElement.getAttribute("data-theme");
    return t ? t === "dark" : systemDark();
  }
  function syncThemeColor() {
    // Collapse the two media-scoped metas to one accurate value for the current theme.
    var color = effectiveDark() ? "#0b1120" : "#f4f6fb";
    for (var i = 0; i < themeMeta.length; i++) themeMeta[i].setAttribute("content", color);
  }
  function applyTheme(t) {
    if (t === "light" || t === "dark") document.documentElement.setAttribute("data-theme", t);
    else document.documentElement.removeAttribute("data-theme");
    syncThemeColor();
  }
  function storedThemeChoice() {
    try { return localStorage.getItem(THEME_KEY) || "system"; } catch (e) { return "system"; }
  }
  function setTheme(choice) {
    try {
      if (choice === "system") localStorage.removeItem(THEME_KEY);
      else localStorage.setItem(THEME_KEY, choice);
    } catch (e) {}
    applyTheme(choice === "system" ? null : choice);
    renderThemeSeg();
  }
  function renderThemeSeg() {
    var choice = storedThemeChoice();
    themeSegBtns.forEach(function (b) {
      b.classList.toggle("active", b.dataset.themeChoice === choice);
    });
  }
  var themeSegBtns = document.querySelectorAll("#theme-seg button");
  themeSegBtns.forEach(function (b) {
    on(b, "click", function () { setTheme(b.dataset.themeChoice); });
  });
  // Keep in sync if the OS theme changes and the user is on "System".
  if (window.matchMedia) {
    var mq = window.matchMedia("(prefers-color-scheme: dark)");
    var onMq = function () { if (!document.documentElement.getAttribute("data-theme")) syncThemeColor(); };
    if (mq.addEventListener) mq.addEventListener("change", onMq); else if (mq.addListener) mq.addListener(onMq);
  }
  syncThemeColor();
  renderThemeSeg();

  // ── In-page confirm modal (replaces native confirm) ──────
  var modalScrim = $("modal-scrim"), modalConfirmCb = null;
  function openConfirm(opts, onYes) {
    $("modal-title").textContent = opts.title;
    $("modal-body").textContent = opts.body;
    $("modal-confirm").textContent = opts.confirmLabel || "Confirm";
    modalConfirmCb = onYes;
    modalScrim.classList.add("show");
    $("modal-cancel").focus();
  }
  function closeConfirm() { modalScrim.classList.remove("show"); modalConfirmCb = null; }
  on($("modal-cancel"), "click", closeConfirm);
  on($("modal-confirm"), "click", function () { var cb = modalConfirmCb; closeConfirm(); if (cb) cb(); });
  on(modalScrim, "click", function (e) { if (e.target === modalScrim) closeConfirm(); });

  var toastEl = $("toast"), toastTimer;
  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove("show"); }, 2200);
  }

  // ── Speech ───────────────────────────────────────────────
  var esVoice = null;
  // Rank the device's Spanish voices so we speak with the most natural one
  // available, not just the first match. Neural/enhanced voices win big.
  function scoreVoice(v) {
    if (!/^es/i.test(v.lang)) return -1;
    var n = (v.name || "").toLowerCase();
    var s = 10;
    if (/natural|neural|enhanced|premium/.test(n)) s += 8;   // Apple/MS/Google premium
    if (/online|multilingual/.test(n)) s += 3;               // cloud-backed, higher quality
    if (/google/.test(n)) s += 4;                            // Google español is very natural
    if (/microsoft/.test(n)) s += 2;
    // Prefer a Latin American accent to match the bundled Mexican audio.
    if (/es-mx|es-419|es-us/i.test(v.lang)) s += 2;
    else if (/es-co|es-ar|es-pe|es-cl|es-ve/i.test(v.lang)) s += 1;
    return s;
  }
  function pickVoice() {
    if (!("speechSynthesis" in window)) return;
    var best = null, bestScore = -1;
    speechSynthesis.getVoices().forEach(function (v) {
      var sc = scoreVoice(v);
      if (sc > bestScore) { bestScore = sc; best = v; }
    });
    esVoice = best;
  }
  if ("speechSynthesis" in window) {
    pickVoice();
    speechSynthesis.onvoiceschanged = pickVoice;
  }
  function speak(text) {
    if (!("speechSynthesis" in window)) { toast("Audio not supported here"); return; }
    // Strip helper punctuation/ellipsis so TTS reads cleanly.
    var clean = text.replace(/[…]/g, "").replace(/\s+/g, " ").trim();
    var u = new SpeechSynthesisUtterance(clean);
    u.rate = 0.92; u.pitch = 1;
    if (esVoice) { u.voice = esVoice; u.lang = esVoice.lang; }
    else u.lang = "es-MX";
    speechSynthesis.cancel();
    speechSynthesis.speak(u);
  }

  // Prefer the bundled human-quality recording (audio/<id>.mp3); if it's missing
  // or blocked, fall back to the device's Spanish TTS voice so audio always works.
  var audioCache = {};
  function playWord(w) {
    if (!w) return;
    if (!w.id) { speak(w.es); return; }
    try {
      var a = audioCache[w.id];
      if (!a) { a = new Audio("audio/" + w.id + ".mp3"); audioCache[w.id] = a; }
      a.onerror = function () { speak(w.es); };
      a.currentTime = 0;
      var p = a.play();
      if (p && p.catch) p.catch(function () { speak(w.es); });
    } catch (e) { speak(w.es); }
  }

  // ── Tabs / routing ───────────────────────────────────────
  var views = {
    home: $("view-home"), learn: $("view-learn"), quiz: $("view-quiz"),
    recall: $("view-recall"), browse: $("view-browse"), more: $("view-more")
  };
  var tabBtns = document.querySelectorAll("nav.tabs button");

  var currentTab = "home";
  function show(tab) {
    currentTab = tab;
    Object.keys(views).forEach(function (k) { views[k].classList.toggle("hidden", k !== tab); });
    tabBtns.forEach(function (b) {
      var active = b.dataset.tab === tab;
      b.classList.toggle("active", active);
      b.setAttribute("aria-selected", active ? "true" : "false");
    });
    if (tab === "home") renderHome();
    if (tab === "learn") startLearn();
    if (tab === "quiz") startQuiz();
    if (tab === "recall") startRecall();
    if (tab === "browse") renderBrowse();
    if (tab === "more") renderMore();
    window.scrollTo(0, 0);
  }
  tabBtns.forEach(function (b) {
    b.setAttribute("role", "tab");
    on(b, "click", function () { show(b.dataset.tab); });
  });

  // ── Home ─────────────────────────────────────────────────
  function renderHome() {
    var known = knownCount(), pct = Math.round((known / WORDS.length) * 100);
    $("stat-known").textContent = known;
    $("stat-due").textContent = dueCount();
    $("stat-streak").textContent = state.streak.count || 0;
    $("ring-val").textContent = pct + "%";
    var circ = 2 * Math.PI * 36;
    $("ring-fg").style.strokeDasharray = circ;
    $("ring-fg").style.strokeDashoffset = circ * (1 - pct / 100);
    renderBanner();
  }

  // A reliable, always-works nudge: streak-at-risk + due count. Loss aversion is
  // a strong motivator, and this fires whenever the app is opened.
  function renderBanner() {
    var b = $("due-banner"); if (!b) return;
    var due = dueCount(), practicedToday = state.streak.last === todayStr();
    if (due > 0 && !practicedToday) {
      b.innerHTML = "🔥 " + (state.streak.count > 0 ? "Keep your " + state.streak.count + "-day streak — " : "") +
        due + " word" + (due > 1 ? "s" : "") + " due" +
        "<button class=\"banner-btn\" id=\"banner-go\">Practice</button>";
      b.classList.remove("hidden");
      on($("banner-go"), "click", function () { show("recall"); });
    } else if (practicedToday && state.streak.count > 0) {
      b.innerHTML = "✓ Practiced today — " + state.streak.count + "-day streak going strong.";
      b.classList.remove("hidden");
    } else {
      b.classList.add("hidden");
    }
  }
  on($("btn-start-learn"), "click", function () { show("learn"); });
  on($("btn-start-quiz"), "click", function () { show("quiz"); });

  // ── Learn (flashcards) ───────────────────────────────────
  var deck = [], idx = 0, flipped = false;
  var flashcard = $("flashcard");

  function startLearn() {
    deck = buildSession(); idx = 0;
    $("learn-done").classList.add("hidden");
    $("learn-active").classList.remove("hidden");
    renderCard();
  }

  function renderCard() {
    if (idx >= deck.length) return finishLearn();
    var w = deck[idx];
    flipped = false;
    flashcard.classList.remove("flipped");
    $("rate-row").classList.remove("show");
    $("flip-row").classList.remove("hidden");

    $("fc-cat").textContent = CATEGORIES[w.cat];
    $("fc-cat2").textContent = CATEGORIES[w.cat];
    $("fc-es").textContent = w.es;
    $("fc-pron").textContent = w.pron;
    $("fc-en").textContent = w.en;
    $("fc-pron2").textContent = w.es + " · " + w.pron;
    $("fc-ex-es").textContent = w.ex;
    $("fc-ex-en").textContent = w.exEn;
    $("fc-hook").textContent = w.hook || "";

    $("learn-count").textContent = "Card " + (idx + 1) + " of " + deck.length;
    $("learn-progress").style.width = (idx / deck.length * 100) + "%";
  }

  function flip() {
    if (idx >= deck.length) return;
    flipped = !flipped;
    flashcard.classList.toggle("flipped", flipped);
    if (flipped) {
      $("rate-row").classList.add("show");
      $("flip-row").classList.add("hidden");
      playWord(deck[idx]);
    }
  }

  on(flashcard, "click", function (e) {
    if (e.target.closest(".speak")) return; // let speak buttons handle themselves
    flip();
  });
  on($("btn-flip"), "click", flip);
  on($("fc-speak-front"), "click", function (e) { e.stopPropagation(); playWord(deck[idx]); });
  on($("fc-speak-back"), "click", function (e) { e.stopPropagation(); playWord(deck[idx]); });

  document.querySelectorAll("#rate-row .btn").forEach(function (b) {
    on(b, "click", function () {
      schedule(deck[idx], b.dataset.grade);
      idx++;
      renderCard();
    });
  });

  function finishLearn() {
    $("learn-progress").style.width = "100%";
    $("learn-active").classList.add("hidden");
    $("learn-done").classList.remove("hidden");
    renderHome();
  }
  on($("btn-learn-again"), "click", startLearn);
  on($("learn-restart"), "click", startLearn);

  // ── Quiz ─────────────────────────────────────────────────
  var quizDeck = [], qIdx = 0, qScore = 0, QUIZ_N = 10;

  function startQuiz() {
    quizDeck = shuffle(WORDS.slice()).slice(0, QUIZ_N);
    qIdx = 0; qScore = 0;
    $("quiz-done").classList.add("hidden");
    $("quiz-active").classList.remove("hidden");
    renderQuiz();
  }

  function renderQuiz() {
    if (qIdx >= quizDeck.length) return finishQuiz();
    var w = quizDeck[qIdx];
    var askEs = Math.random() < 0.5; // alternate direction
    $("quiz-q").textContent = askEs ? w.es : w.en;
    $("quiz-sub").textContent = askEs ? "What does it mean?" : "How do you say it in Spanish?";
    $("quiz-count").textContent = "Question " + (qIdx + 1) + " of " + quizDeck.length;
    $("quiz-score").textContent = "Score: " + qScore;
    $("quiz-progress").style.width = (qIdx / quizDeck.length * 100) + "%";

    var correct = askEs ? w.en : w.es;
    var pool = shuffle(WORDS.filter(function (x) { return x.es !== w.es; }).slice());
    var opts = [correct];
    for (var i = 0; opts.length < 4 && i < pool.length; i++) {
      var cand = askEs ? pool[i].en : pool[i].es;
      if (opts.indexOf(cand) === -1) opts.push(cand);
    }
    shuffle(opts);

    var box = $("quiz-options");
    box.innerHTML = "";
    opts.forEach(function (o, i) {
      var btn = document.createElement("button");
      btn.className = "option";
      btn.dataset.opt = o;
      var key = document.createElement("span");
      key.className = "key"; key.textContent = i + 1;
      var label = document.createElement("span");
      label.textContent = o;
      btn.appendChild(key); btn.appendChild(label);
      on(btn, "click", function () { answer(btn, o === correct, correct, w, askEs); });
      box.appendChild(btn);
    });
  }

  function answer(btn, ok, correct, w, askEs) {
    var buttons = $("quiz-options").querySelectorAll(".option");
    buttons.forEach(function (b) {
      b.disabled = true;
      if (b.dataset.opt === correct) b.classList.add("correct");
    });
    if (ok) { qScore++; }
    else { btn.classList.add("wrong"); }
    if (askEs) playWord(w);
    $("quiz-score").textContent = "Score: " + qScore;
    setTimeout(function () { qIdx++; renderQuiz(); }, ok ? 650 : 1200);
  }

  function finishQuiz() {
    $("quiz-progress").style.width = "100%";
    $("quiz-active").classList.add("hidden");
    var done = $("quiz-done");
    done.classList.remove("hidden");
    var pct = Math.round(qScore / quizDeck.length * 100);
    $("quiz-result").textContent = pct >= 80 ? "¡Excelente! " + pct + "%" : pct >= 50 ? "Not bad — " + pct + "%" : "Keep going — " + pct + "%";
    $("quiz-detail").textContent = "You got " + qScore + " of " + quizDeck.length + " right.";
    bumpStreak(); save(); renderHome();
  }
  on($("btn-quiz-again"), "click", startQuiz);

  // ── Recall (productive practice: type it, or hands-free for the car) ──
  var rDeck = [], rIdx = 0, rMode = "type", rRevealed = false, rAnswered = false;
  var rAuto = false, rAutoTimer = null;

  // Accent-insensitive, punctuation-insensitive comparison key.
  function normalize(s) {
    return (s || "").toLowerCase()
      .normalize("NFD").replace(/[̀-ͯ]/g, "")   // strip accents
      .replace(/…/g, "")
      .replace(/[¿?¡!.,;:"'()]/g, "")
      .replace(/\s+/g, " ").trim();
  }
  // Keeps accents; ignores case, surrounding ¿¡?!, ellipsis — for an exact check.
  function stripEdges(s) {
    return (s || "").toLowerCase().replace(/…/g, "")
      .replace(/^[¿¡\s]+/, "").replace(/[?!.\s]+$/, "")
      .replace(/\s+/g, " ").trim();
  }
  function targetAnswer(w) { return w.es.replace(/…/g, "").replace(/\s+/g, " ").trim(); }

  function levenshtein(a, b) {
    var m = a.length, n = b.length, i, j, d = [];
    if (!m) return n; if (!n) return m;
    for (i = 0; i <= m; i++) d[i] = [i];
    for (j = 0; j <= n; j++) d[0][j] = j;
    for (i = 1; i <= m; i++) for (j = 1; j <= n; j++) {
      var c = a.charAt(i - 1) === b.charAt(j - 1) ? 0 : 1;
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + c);
    }
    return d[m][n];
  }

  function startRecall() {
    rDeck = buildSession(); rIdx = 0;
    $("recall-done").classList.add("hidden");
    setRecallMode(rMode);
  }

  function setRecallMode(mode) {
    rMode = mode;
    document.querySelectorAll("#recall-mode button").forEach(function (b) {
      b.classList.toggle("active", b.dataset.mode === mode);
    });
    clearTimeout(rAutoTimer);
    if (rIdx < rDeck.length) {
      $("recall-type").classList.toggle("hidden", mode !== "type");
      $("recall-hands").classList.toggle("hidden", mode !== "hands");
      renderRecall();
    }
  }

  function renderRecall() {
    clearTimeout(rAutoTimer);
    if (rIdx >= rDeck.length) return finishRecall();
    var w = rDeck[rIdx];
    rRevealed = false; rAnswered = false;
    $("recall-count").textContent = "Card " + (rIdx + 1) + " of " + rDeck.length;
    $("recall-progress").style.width = (rIdx / rDeck.length * 100) + "%";
    if (rMode === "type") renderRecallType(w); else renderRecallHands(w);
  }

  // ── Type mode ──
  function renderRecallType(w) {
    $("rc-cat").textContent = CATEGORIES[w.cat];
    $("rc-en").textContent = w.en.replace(/…/g, "");
    $("rc-sub").textContent = "";
    var inp = $("rc-input");
    inp.value = ""; inp.className = ""; inp.disabled = false;
    var fb = $("rc-feedback"); fb.textContent = ""; fb.className = "rc-feedback";
    $("rc-check").textContent = "Check";
    setTimeout(function () { try { inp.focus(); } catch (e) {} }, 40);
  }

  function checkRecall() {
    if (rAnswered) return;
    var w = rDeck[rIdx], inp = $("rc-input"), fb = $("rc-feedback");
    if (!normalize(inp.value)) return;
    var grade, hookHtml = w.hook ? "<span class=\"ex\">💡 " + esc(w.hook) + "</span>" : "";
    if (stripEdges(inp.value) === stripEdges(w.es)) {
      grade = "good"; inp.classList.add("ok"); fb.className = "rc-feedback ok";
      fb.innerHTML = "¡Correcto! ✓" + hookHtml;
    } else if (normalize(inp.value) === normalize(w.es)) {
      grade = "good"; inp.classList.add("ok"); fb.className = "rc-feedback close";
      fb.innerHTML = "Casi perfecto — cuida los acentos: <span class=\"ans\">" + esc(w.es) + "</span>" + hookHtml;
    } else if (levenshtein(normalize(inp.value), normalize(w.es)) <= (normalize(w.es).length <= 5 ? 1 : 2)) {
      grade = "hard"; inp.classList.add("bad"); fb.className = "rc-feedback close";
      fb.innerHTML = "Muy cerca. Respuesta: <span class=\"ans\">" + esc(w.es) + "</span>" + hookHtml;
    } else {
      grade = "again"; inp.classList.add("bad"); fb.className = "rc-feedback bad";
      fb.innerHTML = "La respuesta: <span class=\"ans\">" + esc(w.es) + "</span>" +
        "<span class=\"ex\">" + esc(w.ex) + " — " + esc(w.exEn) + "</span>" + hookHtml;
    }
    rAnswered = true; inp.disabled = true;
    playWord(w); schedule(w, grade);
    $("rc-check").textContent = "Next →";
  }

  function skipRecall() {
    if (rAnswered) { nextRecall(); return; }
    var w = rDeck[rIdx], inp = $("rc-input"), fb = $("rc-feedback");
    inp.classList.add("bad"); fb.className = "rc-feedback bad";
    fb.innerHTML = "La respuesta: <span class=\"ans\">" + esc(w.es) + "</span>" +
      "<span class=\"ex\">" + esc(w.ex) + " — " + esc(w.exEn) + "</span>" +
      (w.hook ? "<span class=\"ex\">💡 " + esc(w.hook) + "</span>" : "");
    rAnswered = true; inp.disabled = true;
    playWord(w); schedule(w, "again");
    $("rc-check").textContent = "Next →";
  }

  function nextRecall() { rIdx++; renderRecall(); }

  function esc(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  // ── Hands-free / car mode ──
  function renderRecallHands(w) {
    $("rh-cat").textContent = CATEGORIES[w.cat];
    $("rh-en").textContent = w.en.replace(/…/g, "");
    $("rh-es").textContent = w.es;
    $("rh-pron").textContent = w.pron;
    $("rh-hook").textContent = w.hook || "";
    $("rh-answer").classList.add("hidden");
    $("rh-reveal-row").classList.remove("hidden");
    $("rh-rate").classList.remove("show");
    $("rh-hint").textContent = rAuto ? "Auto mode — listening…" : "Say it out loud, then reveal";
    if (rAuto) rAutoTimer = setTimeout(revealHands, 3500);
  }

  function revealHands() {
    if (rRevealed) return;
    rRevealed = true;
    var w = rDeck[rIdx];
    $("rh-answer").classList.remove("hidden");
    $("rh-reveal-row").classList.add("hidden");
    playWord(w);
    if (rAuto) {
      // Passive exposure loop — no SRS grade written (honest: listening ≠ tested recall).
      $("rh-hint").textContent = "Auto mode — next in a moment…";
      rAutoTimer = setTimeout(function () { rIdx++; renderRecall(); }, 3600);
    } else {
      $("rh-rate").classList.add("show");
      $("rh-hint").textContent = "How did you do?";
    }
  }

  function gradeHands(grade) {
    if (!rRevealed) return;
    clearTimeout(rAutoTimer);
    schedule(rDeck[rIdx], grade);
    rIdx++; renderRecall();
  }

  function finishRecall() {
    clearTimeout(rAutoTimer);
    $("recall-progress").style.width = "100%";
    $("recall-type").classList.add("hidden");
    $("recall-hands").classList.add("hidden");
    $("recall-done").classList.remove("hidden");
    renderHome();
  }

  // Wire recall controls (once).
  document.querySelectorAll("#recall-mode button").forEach(function (b) {
    on(b, "click", function () { setRecallMode(b.dataset.mode); });
  });
  on($("rc-check"), "click", function () { if (rAnswered) nextRecall(); else checkRecall(); });
  on($("rc-skip"), "click", skipRecall);
  on($("rc-hintbtn"), "click", function () {
    var t = targetAnswer(rDeck[rIdx]);
    $("rc-sub").textContent = "Starts with “" + t.charAt(0) + "” · " +
      t.replace(/[^ ]/g, "_") + " · " + rDeck[rIdx].pron;
  });
  (function initAccents() {
    var chars = ["á", "é", "í", "ó", "ú", "ñ", "¿", "¡"], box = $("rc-accents");
    chars.forEach(function (ch) {
      var b = document.createElement("button");
      b.type = "button"; b.textContent = ch;
      on(b, "click", function () {
        var inp = $("rc-input"); if (inp.disabled) return;
        var s = inp.selectionStart || 0, e = inp.selectionEnd || 0;
        inp.value = inp.value.slice(0, s) + ch + inp.value.slice(e);
        inp.selectionStart = inp.selectionEnd = s + ch.length;
        inp.focus();
      });
      box.appendChild(b);
    });
  })();
  on($("rh-play"), "click", function () { playWord(rDeck[rIdx]); });
  on($("rh-reveal"), "click", revealHands);
  document.querySelectorAll("#rh-rate .btn").forEach(function (b) {
    on(b, "click", function () { gradeHands(b.dataset.grade); });
  });
  on($("rh-auto"), "change", function () {
    rAuto = this.checked;
    if (rIdx < rDeck.length) renderRecall();
  });
  on($("btn-recall-again"), "click", startRecall);

  // ── Browse ───────────────────────────────────────────────
  function renderBrowse() {
    $("browse-words").classList.add("hidden");
    $("browse-cats").classList.remove("hidden");
    var list = $("cat-list");
    list.innerHTML = "";
    Object.keys(CATEGORIES).forEach(function (key) {
      var words = WORDS.filter(function (w) { return w.cat === key; });
      var known = words.filter(isKnown).length;
      var el = document.createElement("div");
      el.className = "cat";
      el.innerHTML =
        '<div class="meta"><b>' + CATEGORIES[key] + '</b>' +
        '<span>' + known + " / " + words.length + " learned</span></div>" +
        '<div class="mini"><i style="width:' + (known / words.length * 100) + '%"></i></div>';
      on(el, "click", function () { renderCategory(key); });
      list.appendChild(el);
    });
  }

  function renderCategory(key) {
    $("browse-cats").classList.add("hidden");
    $("browse-words").classList.remove("hidden");
    $("browse-title").textContent = CATEGORIES[key];
    var box = $("word-list");
    box.innerHTML = "";
    WORDS.filter(function (w) { return w.cat === key; }).forEach(function (w) {
      var el = document.createElement("div");
      el.className = "word";
      el.innerHTML =
        '<span class="es">' + w.es + "</span>" +
        '<span class="known">' + (isKnown(w) ? "✓" : "") + "</span>" +
        '<span class="en">' + w.en + "</span>" +
        '<span class="pron">' + w.pron + "</span>" +
        '<span class="wex"><b>' + w.ex + "</b> — " + w.exEn + "</span>" +
        (w.hook ? '<span class="whook">💡 ' + w.hook + "</span>" : "");
      on(el, "click", function () { playWord(w); });
      box.appendChild(el);
    });
  }
  on($("browse-back"), "click", renderBrowse);

  // ── More / settings ──────────────────────────────────────
  function renderMore() { renderReminder(); }

  // ── Daily reminder ───────────────────────────────────────
  // A static PWA can't guarantee a background push without a server. We use the
  // Notification Triggers API for a real scheduled local notification where it's
  // supported (installed Android/Chrome), plus an in-app timer while the app is
  // open, and the always-on streak banner. The UI is honest about which applies.
  var REMIND_KEY = "habla.reminder";
  var reminder = loadReminder();
  var inAppTimer = null;

  function loadReminder() {
    try { return JSON.parse(localStorage.getItem(REMIND_KEY)) || { enabled: false, time: "19:00" }; }
    catch (e) { return { enabled: false, time: "19:00" }; }
  }
  function saveReminder() { try { localStorage.setItem(REMIND_KEY, JSON.stringify(reminder)); } catch (e) {} }

  function notifSupported() { return "Notification" in window && "serviceWorker" in navigator; }
  function triggersSupported() {
    return notifSupported() && "showTrigger" in Notification.prototype && typeof TimestampTrigger !== "undefined";
  }
  function fmt12(hhmm) {
    var p = hhmm.split(":"), h = +p[0], m = p[1];
    var ap = h < 12 ? "AM" : "PM", h12 = h % 12; if (h12 === 0) h12 = 12;
    return h12 + ":" + m + " " + ap;
  }

  function renderReminder() {
    var t = $("rem-toggle"), note = $("rem-note");
    if (!t) return;
    if (!notifSupported()) { t.disabled = true; t.checked = false; $("rem-time-row").classList.add("hidden"); note.textContent = "This browser doesn't support notifications."; return; }
    t.checked = reminder.enabled;
    $("rem-time").value = reminder.time;
    $("rem-time-row").classList.toggle("hidden", !reminder.enabled);
    if (reminder.enabled) {
      if (Notification.permission === "granted") {
        note.textContent = triggersSupported()
          ? "On — you'll get a reminder at " + fmt12(reminder.time) + " each day, even when the app is closed."
          : "On — a reminder shows at " + fmt12(reminder.time) + " while the app is open. Install Hablá to your home screen (browser menu → Install app) to get reminders when it's closed.";
      } else {
        note.textContent = "Notifications are blocked. Turn them on for this site in your browser settings, then toggle again.";
      }
    } else {
      note.textContent = "Off. A daily nudge is the single biggest thing that keeps a habit going.";
    }
  }

  function onReminderToggle() {
    var t = $("rem-toggle");
    if (t.checked) {
      var apply = function (perm) {
        if (perm !== "granted") { t.checked = false; reminder.enabled = false; saveReminder(); renderReminder(); toast("Allow notifications to get reminders"); return; }
        reminder.enabled = true; saveReminder(); renderReminder(); scheduleReminder();
        toast("Reminder set for " + fmt12(reminder.time));
      };
      if (Notification.permission === "granted") apply("granted");
      else {
        try {
          var p = Notification.requestPermission(apply);          // older callback form
          if (p && p.then) p.then(apply);                          // modern promise form
        } catch (e) { apply(Notification.permission); }
      }
    } else {
      reminder.enabled = false; saveReminder(); clearScheduled(); renderReminder(); toast("Reminder off");
    }
  }

  function onReminderTime() {
    reminder.time = $("rem-time").value || "19:00"; saveReminder();
    if (reminder.enabled && Notification.permission === "granted") { scheduleReminder(); toast("Reminder updated to " + fmt12(reminder.time)); }
  }

  function nextOccurrence(hhmm, addDays) {
    var p = hhmm.split(":"), d = new Date();
    d.setHours(+p[0], +p[1], 0, 0);
    if (addDays) d.setDate(d.getDate() + addDays);
    else if (d.getTime() <= Date.now()) d.setDate(d.getDate() + 1);
    return d;
  }

  function clearScheduled() {
    if (inAppTimer) { clearTimeout(inAppTimer); inAppTimer = null; }
    if (!("serviceWorker" in navigator)) return;
    navigator.serviceWorker.getRegistration().then(function (reg) {
      if (!reg || !reg.getNotifications) return;
      var close = function (ns) { ns.forEach(function (n) { if (n.tag && n.tag.indexOf("habla-daily") === 0) n.close(); }); };
      reg.getNotifications({ includeTriggered: true }).then(close).catch(function () {
        reg.getNotifications().then(close).catch(function () {});
      });
    }).catch(function () {});
  }

  function scheduleReminder() {
    if (!reminder.enabled || !notifSupported() || Notification.permission !== "granted") return;
    clearScheduled();
    var body = "Time for a quick Spanish session — keep your streak alive 🔥";
    var opts = { body: body, icon: "icons/icon-192.png", badge: "icons/icon-192.png", data: { url: "./" } };
    if (triggersSupported()) {
      navigator.serviceWorker.getRegistration().then(function (reg) {
        if (!reg) return;
        for (var i = 0; i < 7; i++) {
          var when = nextOccurrence(reminder.time, i);
          if (i === 0 && when.getTime() <= Date.now()) continue;
          try {
            reg.showNotification("¡Hablá!", Object.assign({}, opts, {
              tag: "habla-daily-" + i, showTrigger: new TimestampTrigger(when.getTime())
            }));
          } catch (e) {}
        }
      });
    }
    // Always: if the tab is open at the scheduled time, fire it and re-arm.
    var ms = nextOccurrence(reminder.time, 0).getTime() - Date.now();
    if (ms > 0 && ms < 25 * 3600 * 1000) {
      inAppTimer = setTimeout(function () {
        if (Notification.permission === "granted") {
          navigator.serviceWorker.getRegistration().then(function (reg) {
            if (reg && reg.showNotification) reg.showNotification("¡Hablá!", Object.assign({}, opts, { tag: "habla-daily-now" }));
            else { try { new Notification("¡Hablá!", opts); } catch (e) {} }
          }).catch(function () {});
        }
        scheduleReminder();
      }, ms + 500);
    }
  }

  on($("rem-toggle"), "change", onReminderToggle);
  on($("rem-time"), "change", onReminderTime);

  on($("btn-reset"), "click", function () {
    openConfirm({
      title: "Reset progress?",
      body: "This clears every learned word and your streak on this device. It can't be undone.",
      confirmLabel: "Reset"
    }, function () {
      state = { cards: {}, streak: { count: 0, last: null } };
      save();
      toast("Progress reset");
      renderHome();
    });
  });

  on($("btn-export"), "click", function () {
    var data = JSON.stringify(state, null, 2);
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(data).then(
        function () { toast("Progress copied to clipboard"); },
        function () { downloadJson(data); });
    } else {
      downloadJson(data);
    }
  });

  function downloadJson(data) {
    try {
      var blob = new Blob([data], { type: "application/json" });
      var url = URL.createObjectURL(blob);
      var a = document.createElement("a");
      a.href = url; a.download = "habla-progress.json";
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
      toast("Progress downloaded");
    } catch (e) { toast("Export not supported here"); }
  }

  // ── Install prompt ───────────────────────────────────────
  var deferredPrompt = null;
  var installBtn = $("btn-install");
  window.addEventListener("beforeinstallprompt", function (e) {
    e.preventDefault();
    deferredPrompt = e;
    installBtn.disabled = false;
  });
  on(installBtn, "click", function () {
    if (!deferredPrompt) {
      $("install-text").textContent = "On Android: open your browser menu (⋮) and tap “Install app” or “Add to home screen.”";
      return;
    }
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then(function () { deferredPrompt = null; installBtn.disabled = true; });
  });
  window.addEventListener("appinstalled", function () { toast("Installed! Find Hablá on your home screen."); });

  // ── Online/offline pill ──────────────────────────────────
  function netStatus() {
    var online = navigator.onLine;
    $("netdot").classList.toggle("off", !online);
    $("nettext").textContent = online ? "online" : "offline";
  }
  window.addEventListener("online", netStatus);
  window.addEventListener("offline", netStatus);
  netStatus();

  // ── Service worker ───────────────────────────────────────
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
      navigator.serviceWorker.register("sw.js").then(function () {
        // Re-arm the daily reminder each time the app opens (triggers only persist
        // a limited number ahead, and the in-app timer needs re-setting).
        if (reminder.enabled && Notification.permission === "granted") scheduleReminder();
      }).catch(function () { /* offline still fine after first load */ });
    });
  }

  // ── Keyboard shortcuts ───────────────────────────────────
  document.addEventListener("keydown", function (e) {
    // Modal takes priority when open.
    if (modalScrim.classList.contains("show")) {
      if (e.key === "Escape") { e.preventDefault(); closeConfirm(); }
      else if (e.key === "Enter") { e.preventDefault(); $("modal-confirm").click(); }
      return;
    }
    // The recall answer box: Enter checks / advances; never treat typing as shortcuts.
    if (e.target && e.target.id === "rc-input") {
      if (e.key === "Enter") { e.preventDefault(); if (rAnswered) nextRecall(); else checkRecall(); }
      return;
    }
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    var tag = (e.target && e.target.tagName) || "";
    if (tag === "INPUT" || tag === "TEXTAREA") return;

    if (currentTab === "learn" && idx < deck.length) {
      var isFlipKey = e.key === " " || e.key === "Enter" || e.key === "ArrowUp" || e.key === "ArrowDown";
      // If a button is focused, Space/Enter already activate it natively — don't double-flip.
      if (isFlipKey && tag === "BUTTON" && (e.key === " " || e.key === "Enter")) return;
      if (isFlipKey) {
        e.preventDefault(); flip();
      } else if (flipped && (e.key === "1" || e.key === "2" || e.key === "3")) {
        e.preventDefault();
        var grades = { "1": "again", "2": "hard", "3": "good" };
        schedule(deck[idx], grades[e.key]); idx++; renderCard();
      }
    } else if (currentTab === "quiz") {
      var n = parseInt(e.key, 10);
      if (n >= 1 && n <= 4) {
        var opts = $("quiz-options").querySelectorAll(".option");
        if (opts[n - 1] && !opts[n - 1].disabled) { e.preventDefault(); opts[n - 1].click(); }
      }
    } else if (currentTab === "recall" && rMode === "hands" && rIdx < rDeck.length) {
      if (e.key === " " || e.key === "Enter") {
        if (tag === "BUTTON") return;   // let a focused button activate itself
        e.preventDefault();
        if (!rRevealed) revealHands();
      } else if (rRevealed && (e.key === "1" || e.key === "3")) {
        e.preventDefault(); gradeHands(e.key === "1" ? "again" : "good");
      }
    }
  });

  // ── Boot ─────────────────────────────────────────────────
  renderHome();
})();
