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
    if (/es-es/i.test(v.lang)) s += 2;                       // prefer a clear peninsular default
    else if (/es-us|es-mx|es-419/i.test(v.lang)) s += 1;
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
    else u.lang = "es-ES";
    speechSynthesis.cancel();
    speechSynthesis.speak(u);
  }

  // ── Tabs / routing ───────────────────────────────────────
  var views = {
    home: $("view-home"), learn: $("view-learn"), quiz: $("view-quiz"),
    browse: $("view-browse"), more: $("view-more")
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
      speak(deck[idx].es);
    }
  }

  on(flashcard, "click", function (e) {
    if (e.target.closest(".speak")) return; // let speak buttons handle themselves
    flip();
  });
  on($("btn-flip"), "click", flip);
  on($("fc-speak-front"), "click", function (e) { e.stopPropagation(); speak(deck[idx].es); });
  on($("fc-speak-back"), "click", function (e) { e.stopPropagation(); speak(deck[idx].es); });

  document.querySelectorAll(".rate-row .btn").forEach(function (b) {
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
    if (askEs) speak(w.es);
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
        '<span class="pron">' + w.pron + "</span>";
      on(el, "click", function () { speak(w.es); });
      box.appendChild(el);
    });
  }
  on($("browse-back"), "click", renderBrowse);

  // ── More / settings ──────────────────────────────────────
  function renderMore() { /* nothing dynamic besides install button state */ }

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
      $("install-text").textContent = "On iPhone/iPad: tap the Share button, then “Add to Home Screen.” On Android: use your browser menu → “Install app.”";
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
      navigator.serviceWorker.register("sw.js").catch(function () { /* offline still fine after first load */ });
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
    }
  });

  // ── Boot ─────────────────────────────────────────────────
  renderHome();
})();
