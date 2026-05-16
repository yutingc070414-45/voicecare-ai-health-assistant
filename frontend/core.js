/* ============================================================
   VoiceCare CORE — Icons + Shell + Voice Engine
   Load this script FIRST in every page.
   ============================================================ */

/* ---- ICONS ---- */
const IC = {
  logo: () =>
    `<img src="voicecare.svg" style="width:78px;height:78px;object-fit:contain;display:block;" alt="VoiceCare"/>`,
  mic: () =>
    `<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect x="8" y="2" width="8" height="12" rx="4" fill="white"/><path d="M4 12 Q4 20 12 20 Q20 20 20 12" fill="none" stroke="white" stroke-width="2" stroke-linecap="round"/><rect x="11" y="20" width="2" height="3" rx="1" fill="white"/><rect x="8" y="23" width="8" height="1.5" rx="0.75" fill="white"/></svg>`,
  mic2: () =>
    `<svg width="14" height="14" viewBox="0 0 24 24" fill="none"><rect x="8" y="2" width="8" height="12" rx="4" fill="#D4537E"/><path d="M4 12 Q4 20 12 20 Q20 20 20 12" fill="none" stroke="#D4537E" stroke-width="2" stroke-linecap="round"/></svg>`,
  gear: () =>
    `<svg width="13" height="13" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="2" stroke="#D4537E" stroke-width="1.2"/><path d="M7 1v1.5M7 11.5V13M1 7h1.5M11.5 7H13M2.6 2.6l1.1 1.1M10.3 10.3l1.1 1.1M2.6 11.4l1.1-1.1M10.3 3.7l1.1-1.1" stroke="#D4537E" stroke-width="1.2" stroke-linecap="round"/></svg>`,
  globe: () =>
    `<svg width="13" height="13" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5.5" stroke="#D4537E" stroke-width="1.2"/><path d="M7 1.5 Q9.5 7 7 12.5" fill="none" stroke="#D4537E" stroke-width="1.2"/><path d="M7 1.5 Q4.5 7 7 12.5" fill="none" stroke="#D4537E" stroke-width="1.2"/><line x1="1.5" y1="7" x2="12.5" y2="7" stroke="#D4537E" stroke-width="1.2"/></svg>`,
  user: () =>
    `<svg width="13" height="13" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="4.5" r="2.5" stroke="#D4537E" stroke-width="1.2"/><path d="M2 12.5 Q2 9 7 9 Q12 9 12 12.5" fill="none" stroke="#D4537E" stroke-width="1.2" stroke-linecap="round"/></svg>`,
  check: () =>
    `<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" fill="#1D9E75"/><path d="M7 12 L10 15 L17 8" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  home: () =>
    `<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M3 9L10 3L17 9V17H13V13H7V17H3V9Z" fill="none" stroke="#C4CDD2" stroke-width="1.4" stroke-linejoin="round" stroke-linecap="round"/></svg>`,
  book: () =>
    `<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="3" y="4" width="14" height="13" rx="3" stroke="#B4B2A9" stroke-width="1.4" fill="none"/><rect x="7" y="2" width="2" height="4" rx="1" fill="#B4B2A9"/><rect x="11" y="2" width="2" height="4" rx="1" fill="#B4B2A9"/><line x1="3" y1="8" x2="17" y2="8" stroke="#B4B2A9" stroke-width="1.4"/><rect x="6" y="11" width="3" height="3" rx="0.5" fill="#B4B2A9"/><rect x="11" y="11" width="3" height="3" rx="0.5" fill="#B4B2A9"/></svg>`,
  report: () =>
    `<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="3" y="2" width="14" height="17" rx="3" stroke="#B4B2A9" stroke-width="1.4" fill="none"/><path d="M6 11 L8 11 L9.5 8 L11 14 L12.5 10.5 L14 11 L16 11" fill="none" stroke="#B4B2A9" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  history: () =>
    `<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="2" y="4" width="16" height="12" rx="3" stroke="#B4B2A9" stroke-width="1.4" fill="none"/><line x1="6" y1="9" x2="14" y2="9" stroke="#B4B2A9" stroke-width="1.4" stroke-linecap="round"/><line x1="6" y1="12" x2="11" y2="12" stroke="#B4B2A9" stroke-width="1.4" stroke-linecap="round"/><path d="M6 16 L6 19 L10 16" fill="#B4B2A9"/></svg>`,
  contact: () =>
    `<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="8" r="3" stroke="#B4B2A9" stroke-width="1.4" fill="none"/><path d="M4 17 Q4 13 10 13 Q16 13 16 17" stroke="#B4B2A9" stroke-width="1.4" stroke-linecap="round" fill="none"/><line x1="14" y1="4" x2="17" y2="4" stroke="#B4B2A9" stroke-width="1.4" stroke-linecap="round"/><line x1="15.5" y1="2.5" x2="15.5" y2="5.5" stroke="#B4B2A9" stroke-width="1.4" stroke-linecap="round"/></svg>`,
  calendar: () =>
    `<svg width="154" height="124" viewBox="0 0 38 38" fill="none"><rect x="4" y="6" width="30" height="26" rx="5" fill="#F4C0D1"/><rect x="4" y="6" width="30" height="10" rx="5" fill="#D4537E"/><rect x="4" y="13" width="30" height="3" fill="#D4537E"/><rect x="10" y="3" width="3" height="7" rx="1.5" fill="#993556"/><rect x="25" y="3" width="3" height="7" rx="1.5" fill="#993556"/><rect x="9" y="22" width="5" height="5" rx="1" fill="#F4C0D1"/><rect x="17" y="22" width="5" height="5" rx="1" fill="#D4537E"/><rect x="25" y="22" width="5" height="5" rx="1" fill="#F4C0D1"/><circle cx="30" cy="30" r="6" fill="#D4537E"/><rect x="29" y="27.5" width="2" height="5" rx="1" fill="white"/><rect x="27.5" y="29" width="5" height="2" rx="1" fill="white"/></svg>`,
  ecg: () =>
    `<svg width="154" height="124" viewBox="0 0 38 38" fill="none"><rect x="5" y="3" width="24" height="30" rx="4" fill="#F4C0D1"/><rect x="5" y="3" width="24" height="7" rx="4" fill="#D4537E"/><rect x="5" y="7" width="24" height="3" fill="#D4537E"/><rect x="9" y="14" width="16" height="2" rx="1" fill="#993556"/><path d="M9 21 L12 21 L14 17 L16 25 L18 20 L20 23 L22 21 L25 21" fill="none" stroke="#D4537E" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><rect x="9" y="27" width="10" height="2" rx="1" fill="#D4537E"/></svg>`,
};

/* ---- SHELL BUILDER ---- */
const PAGES = [
  { id: "index.html", lbl: "Home", icon: () => IC.home() },
  { id: "book.html", lbl: "Book", icon: () => IC.book() },
  { id: "report.html", lbl: "Report", icon: () => IC.report() },
  { id: "history.html", lbl: "History", icon: () => IC.history() },
  { id: "contact.html", lbl: "Contact", icon: () => IC.contact() },
];

function buildShell(activePage) {
  const sc = VC.sc;

  const user = JSON.parse(localStorage.getItem("vc_user") || "null");

  return `

<div class="topbar">
  <a class="logo-wrap" href="index.html">${IC.logo()}<div><div class="logo-name">VoiceCare</div><div class="logo-tag">Your health, heard</div></div></a>
  <div class="topbar-right">
    <div class="mode-pill">

      <button class="mode-opt" data-mode="voice" onclick="VC.setMode('voice')">
  <span data-lang="common.voice">Voice</span>
</button>

<button class="mode-opt" data-mode="standard" onclick="VC.setMode('standard')">
  <span data-lang="common.standard">Standard</span>
</button>

    </div>


${VC.getAuthButtons()}

  </div>
</div>
<nav class="navbar">
  ${PAGES.map(
    (
      p,
    ) => `<a class="nav-item${p.id === activePage ? " active" : ""}" href="${p.id}" data-page="${p.id}">${p.icon()}
  <span 
  class="nav-label" 
  data-lang="nav.${p.lbl.toLowerCase()}">
  ${p.lbl}
</span>
  </a>`,
  ).join("")}
  
</nav>
<div class="panel-ov" id="panel-ov" onclick="VC.closeSettings()"></div>
<div class="spnl" id="spnl">

  <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;">

    <span style="font-size:16px;font-weight:600;">
     Profile
    </span>

    <button style="background:none;border:none;font-size:22px;cursor:pointer;color:var(--g500);line-height:1;" onclick="VC.closeSettings()" aria-label="Close settings">×</button>

  </div>

  <div style="
  padding:0 0 20px;
  border-bottom:1px solid var(--p100);
  margin-bottom:16px;
  text-align:center;
">

  <!-- Avatar -->
  <div class="profile-avatar">
    ${(user?.name || "G").charAt(0).toUpperCase()}
  </div>

  <!-- Name -->
  <div class="profile-name">
    ${user?.name || "Guest User"}
  </div>

  <!-- Email -->
  <div class="profile-email">
    ${user?.email || "No email"}
  </div>

  <!-- Edit -->
  <button
    class="profile-edit-btn"
    onclick="VC.editProfile()"
  >
    Edit profile
  </button>

</div>

  <div class="plbl" data-lang="settings.language">Language</div>

  <div class="lg" style="margin-bottom:14px;">
    <button class="lb${VC.lang === "EN" ? " active" : ""}"    onclick="VC.setLang(this,'EN')">English</button>
    <button class="lb${VC.lang === "中文" ? " active" : ""}"  onclick="VC.setLang(this,'中文')">中文</button>
    <button class="lb${VC.lang === "PL" ? " active" : ""}"    onclick="VC.setLang(this,'PL')">Polski</button>
    <button class="lb${VC.lang === "FR" ? " active" : ""}"    onclick="VC.setLang(this,'FR')">Français</button>
  </div>
  <div class="div"></div>
  <div class="plbl" data-lang="settings.voiceShortcuts">Voice shortcuts</div>
  ${[
    ["book", "Book"],
    ["report", "Report"],
    ["history", "History"],
    ["contact", "Contact"],
    ["dictate", "Dictate"],
  ]
    .map(
      ([id, lbl]) => `
  <div class="scr"><span class="scm">${lbl}</span><input class="sci" id="sc-${id}" value="${sc[id] || lbl}"/></div>`,
    )
    .join("")}
  <div class="div"></div>
  <div class="plbl" data-lang="settings.voiceFeedback">Voice feedback</div>
  <div class="scr"><span style="flex:1;font-size:12px;color:var(--g900);" data-lang="settings.readActions">Read actions aloud</span><button id="tog-read" class="tgb" onclick="VC.togFeedback('tog-read')" style="background:var(--p400);color:#fff;" data-lang="common.on">On</button></div>
  <div class="scr"><span style="flex:1;font-size:12px;color:var(--g900);" data-lang="settings.confirmNav">Confirm before navigating</span><button id="tog-nav" class="tgb" onclick="VC.togFeedback('tog-nav')" style="background:var(--p400);color:#fff;" data-lang="common.on">On</button></div>
  <div class="div"></div>
  <div class="plbl" data-lang="settings.mode">Mode</div>
  <div style="display:flex;gap:6px;">
    <button class="btn" style="flex:1;" onclick="VC.setMode('voice');VC.closeSettings();" data-lang="settings.voiceDefault">Voice (default)</button>
    <button class="btn" style="flex:1;" onclick="VC.setMode('standard');VC.closeSettings();" data-lang="common.standard">Standard</button>
  </div>
  
<button
  class="logout-btn"
  onclick="VC.logout()"
>
  Log out
</button>

</div>


<div id="vc-toast"></div>`;
}

/* ============================================================
   VOICE ENGINE
   ============================================================ */
const VC = {
  getAuthButtons() {
    const user = JSON.parse(localStorage.getItem("vc_user") || "null");

    if (user) {
      return `
  <button class="tb-btn profile-top-btn" onclick="VC.openSettings()">

    <div class="top-avatar">
      ${(user.name || "G").charAt(0).toUpperCase()}
    </div>

    <span>${user.name || "Profile"}</span>

  </button>
`;
    }

    return `
      <button class="tb-btn" onclick="location.href='signin.html'">
        ${IC.user()}
        <span data-lang="common.signIn">Sign in</span>
      </button>

      <button class="tb-btn pri" onclick="location.href='signin.html'">
        <span data-lang="common.signUp">Sign up</span>
      </button>
    `;
  },

  mode: localStorage.getItem("vc_mode") || "voice",
  lang: localStorage.getItem("vc_lang") || "EN",

  sc: {
    book: localStorage.getItem("vc_sc_book") || "Book",
    report: localStorage.getItem("vc_sc_report") || "Report",
    history: localStorage.getItem("vc_sc_history") || "History",
    contact: localStorage.getItem("vc_sc_contact") || "Contact",
    dictate: localStorage.getItem("vc_sc_dictate") || "Dictate",
  },
  listening: false,
  thinking: false,
  recog: null,
  flow: null,
  pending: null,
  page: "",
  API: "http://127.0.0.1:8788/api/ai",

  /* ---- GLOBAL COMMANDS ---- */
  globals: [
    { p: /\bhome\b|go home/, a: () => VC.nav("index.html") },
    { p: /\bbook\b|make appointment|booking/, a: () => VC.nav("book.html") },
    { p: /\breport\b|my results|check report/, a: () => VC.nav("report.html") },
    {
      p: /\bhistory\b|my history|past appointments/,
      a: () => VC.nav("history.html"),
    },
    { p: /\bcontact\b|call us|email us/, a: () => VC.nav("contact.html") },
    { p: /sign in|log in|login/, a: () => VC.nav("signin.html") },
    { p: /sign up|register|create account/, a: () => VC.nav("signin.html") },
    { p: /\bsettings\b|preferences/, a: () => VC.openSettings() },
    { p: /\bhelp\b|what can i say|commands/, a: () => VC.showHelp() },
    { p: /standard mode|type mode/, a: () => VC.setMode("standard") },
    { p: /voice mode|speak mode/, a: () => VC.setMode("voice") },
  ],

  /* ---- INIT ---- */
  async init(page) {
    this.page = page;

    await this.loadLocales();

    this.applyMode(this.mode);

    document
      .querySelectorAll(".mode-opt")
      .forEach((b) =>
        b.classList.toggle("active", b.dataset.mode === this.mode),
      );

    this._applyLang();
  },

  async loadLocales() {
    const map = {
      EN: "en",
      中文: "zh",
      PL: "pl",
      FR: "fr",
    };

    const file = map[this.lang] || "en";

    try {
      const res = await fetch(`locales/${file}.json?v=20260516-lang4`, {
        cache: "no-store",
      });
      if (!res.ok) throw new Error(`Missing locale file: ${file}`);
      this.T = await res.json();
    } catch (e) {
      console.warn("VoiceCare locale load failed; using inline text.", e);
      this.T = {};
    }
  },

  /* ---- GREET ---- */

  greet(page) {
    const keyMap = {
      "index.html": "greetIndex",
      "book.html": "greetBook",
      "report.html": "greetReport",
      "history.html": "greetHistory",
      "contact.html": "greetContact",
      "signin.html": "greetSignin",
    };
    const msg = this.t(keyMap[page] || "greetIndex");
    this.bubble("normal", msg, "");
    this.speak(msg, () => setTimeout(() => this.startSR(), 500));
  },

  /* ---- SPEECH RECOGNITION ---- */
  initSR() {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) {
      this.bubble(
        "err",
        "Voice recognition not supported. Please use Chrome.",
        "",
      );
      return false;
    }
    this.recog = new SR();
    this.recog.continuous = false;
    this.recog.interimResults = true;
    this.recog.lang = this.srLang();
    this.recog.onstart = () => {
      this.listening = true;
      this.micState("listening");
      this.trans("Listening...", false);
    };
    this.recog.onresult = (e) => {
      let f = "",
        i = "";
      for (let x = e.resultIndex; x < e.results.length; x++) {
        const t = e.results[x][0].transcript;
        e.results[x].isFinal ? (f += t) : (i += t);
      }
      this.trans(f || i, !!f);
      if (f) this.process(f.trim());
    };
    this.recog.onerror = (e) => {
      this.stopSR();
      const m = {
        "not-allowed":
          "Microphone access denied. Please allow microphone in browser settings.",
        "no-speech": "No speech detected. Please try again.",
        network: "Network error. Check your connection.",
      };
      if (e.error !== "aborted")
        this.bubble(
          "err",
          m[e.error] || "Couldn't hear you. Please try again.",
          "",
        );
    };
    this.recog.onend = () => this.stopSR();
    return true;
  },
  srLang() {
    return (
      { EN: "en-US", 中文: "zh-CN", PL: "pl-PL", FR: "fr-FR" }[this.lang] ||
      "en-US"
    );
  },
  startSR() {
    if (!this.recog) this.initSR();
    if (!this.recog) return;
    try {
      this.recog.lang = this.srLang();
      this.recog.start();
    } catch (e) {}
  },
  stopSR() {
    this.listening = false;
    this.micState("idle");
  },
  toggleMic() {
    this.listening ? this.recog.stop() : this.startSR();
  },

  /* ---- PROCESS INPUT ---- */
  async process(text) {
    if (!text || this.thinking) return;
    const lower = text.toLowerCase().trim();

    // Pending confirm
    if (this.pending) {
      if (/yes|correct|confirm|right|ok|yep|yeah/.test(lower)) {
        const fn = this.pending.action;
        this.pending = null;
        fn();
      } else if (/no|wrong|try again|nope/.test(lower)) {
        this.pending = null;
        this.bubble("normal", "Okay, let's try again. " + this.hintText(), "");
        setTimeout(() => this.startSR(), 500);
      } else {
        this.bubble(
          "warn",
          'Say <strong>"Yes confirm"</strong> or <strong>"No, try again"</strong>.',
          "",
        );
        setTimeout(() => this.startSR(), 500);
      }
      return;
    }

    // Global commands
    for (const g of this.globals) {
      if (g.p.test(lower)) {
        g.a();
        return;
      }
    }

    // Page flow
    if (this.flow && this.flow.handle) {
      await this.flow.handle(text, lower);
      return;
    }

    // Fallback AI intent
    this.thinking = true;
    this.micState("thinking");
    this.bubble(
      "dim",
      `<span class="dots"><span></span><span></span><span></span></span> Understanding: <em>"${this.esc(text)}"</em>...`,
      "",
    );
    try {
      const r = await this
        .claude(`You are an AI assistant for VoiceCare medical portal. User said: "${text}". Current page: ${this.page}.
Determine intent. Return ONLY valid JSON: {"intent":"navigate|book|report|history|contact|signin|help|unknown","page":"index.html or book.html or report.html or history.html or contact.html or signin.html or null","confidence":"high or low","msg":"<1 sentence friendly response>"}`);
      this.thinking = false;
      this.micState("idle");
      let p;
      try {
        p = JSON.parse(r.replace(/```json|```/g, "").trim());
      } catch (e) {
        this.bubble("err", "I didn't understand. Say Help for options.", "");
        return;
      }
      if (p.confidence === "low") {
        this.pending = {
          action: () => {
            if (p.page) this.nav(p.page);
          },
        };
        this.bubble(
          "warn",
          `Did you want to: <strong>${p.msg}</strong>?`,
          'Say <strong>"Yes confirm"</strong> or <strong>"No, try again"</strong>.',
        );
        setTimeout(() => this.startSR(), 400);
      } else if (p.page) {
        this.nav(p.page);
      } else {
        this.bubble(
          "err",
          "I didn't understand. Say <strong>Help</strong> for available commands.",
          "",
        );
      }
    } catch (e) {
      this.thinking = false;
      this.micState("err");
      this.bubble(
        "err",
        "Connection issue. Please check your internet and try again.",
        "",
      );
    }
  },

  hintText() {
    return this.flow && this.flow.hint
      ? this.flow.hint()
      : 'Say a command or "Help" for options.';
  },

  /* ---- NAVIGATION ---- */
  nav(page) {
    this.bubble(
      "ok",
      `${IC.check()} Going to <strong>${page.replace(".html", "")}</strong>...`,
      "",
    );
    this.speak("Navigating to " + page.replace(".html", ""));
    setTimeout(() => (location.href = page), 700);
  },

  /* ---- CLAUDE API ---- */
  async claude(prompt) {
    const languageName =
      { EN: "English", 中文: "Simplified Chinese", PL: "Polish", FR: "French" }[
        this.lang
      ] || "English";
    const localizedPrompt = `The current interface language is ${languageName}. Any user-facing text in your answer must be in ${languageName}.\n\n${prompt}`;
    const r = await fetch(this.API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: localizedPrompt, lang: this.lang }),
    });
    const d = await r.json();
    if (d.error) throw new Error(d.error);
    return d.text || "";
  },

  /* ---- TTS ---- */
  speak(text, cb) {
    if (!("speechSynthesis" in window) || this.mode !== "voice") {
      if (cb) cb();
      return;
    }
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text.replace(/<[^>]*>/g, ""));
    u.lang = this.srLang();
    u.rate = 0.95;
    u.pitch = 1;
    u.volume = 0.9;
    const voices = speechSynthesis.getVoices();
    const langRoot = this.srLang().split("-")[0].toLowerCase();
    const voice =
      voices.find((v) => v.lang?.toLowerCase().startsWith(langRoot)) ||
      voices[0];
    if (voice) u.voice = voice;
    if (cb) u.onend = cb;
    speechSynthesis.speak(u);
  },

  /* ---- HELP ---- */
  showHelp() {
    this.bubble(
      "normal",
      `<strong>Voice commands:</strong><br/>
      "Book" → book appointment<br/>
      "Report" → check results<br/>
      "History" → past appointments<br/>
      "Contact" → contact page<br/>
      "Home" → home page<br/>
      "Settings" → open settings<br/>
      "Help" → show this guide<br/>
      "Voice mode" / "Standard mode" → switch mode`,
      "Say any command to continue.",
    );
    setTimeout(() => this.startSR(), 400);
  },

  /* ---- UI HELPERS ---- */
  micState(s) {
    const m = document.getElementById("ai-mic");
    const l = document.getElementById("ai-mic-lbl");
    if (!m) return;
    m.className = "ai-mic";
    const mp = {
      listening: { c: "listening", l: "Listening" },
      thinking: { c: "thinking", l: "Thinking" },
      success: { c: "success", l: "Done" },
      err: { c: "err", l: "Error" },
      idle: { c: "", l: "Speak now" },
    };
    const st = mp[s] || mp.idle;
    if (st.c) m.classList.add(st.c);
    if (l) l.textContent = st.l;
  },
  bubble(type, html, hint) {
    const b = document.getElementById("ai-bubble");
    const h = document.getElementById("ai-hint");
    if (!b) return;
    b.className =
      "ai-bubble" +
      ({ err: " err", ok: " ok", warn: " warn", dim: " dim" }[type] || "");
    b.innerHTML = '<div class="ai-lbl">VoiceCare AI</div>' + html;
    if (h) h.innerHTML = hint || "";
  },
  trans(t, heard) {
    const el = document.getElementById("ai-trans");
    if (!el) return;
    el.textContent = t;
    el.className = "ai-trans" + (heard ? " heard" : "");
  },
  toast(msg, ms) {
    let t = document.getElementById("vc-toast");
    if (!t) {
      t = document.createElement("div");
      t.id = "vc-toast";
      document.body.appendChild(t);
    }
    t.textContent = msg;
    t.style.opacity = "1";
    clearTimeout(t._t);
    t._t = setTimeout(() => (t.style.opacity = "0"), ms || 2200);
  },
  esc(s) {
    return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  },

  /* ---- MODE ---- */
  applyMode(m) {
    this.mode = m;
    localStorage.setItem("vc_mode", m);
    document.body.classList.remove("voice-mode", "standard-mode");
    document.body.classList.add(m + "-mode");
    document
      .querySelectorAll(".mode-opt")
      .forEach((b) => b.classList.toggle("active", b.dataset.mode === m));
  },

  setMode(m) {
    this.applyMode(m);

    if (window.Lana && Lana._renderControls) {
      Lana._renderControls();
    }

    this.speak(
      m === "voice" ? "Voice mode activated" : "Standard mode activated",
    );

    this.toast(m === "voice" ? "Voice mode on" : "Standard mode on");
  },

  /* ---- TRANSLATIONS ---- */
  T: {},

  t(key) {
    const keys = key.split(".");

    let value = this.T;

    for (const k of keys) {
      value = value?.[k];
    }

    return value || key;
  },
  tf(key, vars = {}) {
    return Object.entries(vars).reduce(
      (text, [name, value]) => text.replaceAll(`{${name}}`, value),
      this.t(key),
    );
  },

  /* ---- SETTINGS ---- */
  openSettings() {
    document.getElementById("panel-ov")?.classList.add("open");
    document.getElementById("spnl")?.classList.add("open");
  },

  closeSettings() {
    document.getElementById("panel-ov")?.classList.remove("open");
    document.getElementById("spnl")?.classList.remove("open");
  },

  editProfile() {
    const user = JSON.parse(localStorage.getItem("vc_user") || "null");
    if (!user) return;

    document.querySelector(".profile-name").innerHTML = `
    <input id="edit-name" class="profile-edit-input" value="${user.name || ""}">
  `;

    document.querySelector(".profile-email").innerHTML = `
    <input id="edit-email" class="profile-edit-input" value="${user.email || ""}">
  `;

    document.querySelector(".profile-edit-btn").outerHTML = `
    <div class="profile-edit-actions">
      <button class="profile-save-btn" onclick="VC.saveProfile()">Save</button>
      <button class="profile-cancel-btn" onclick="location.reload()">Cancel</button>
    </div>
  `;
  },

  saveProfile() {
    const user = JSON.parse(localStorage.getItem("vc_user") || "null");
    if (!user) return;

    user.name = document.getElementById("edit-name").value.trim();
    user.email = document.getElementById("edit-email").value.trim();

    localStorage.setItem("vc_user", JSON.stringify(user));

    this.toast("Profile updated");

    setTimeout(() => {
      location.reload();
    }, 500);
  },

  async setLang(btn, code) {
    document
      .querySelectorAll(".lb")
      .forEach((b) => b.classList.remove("active"));

    btn.classList.add("active");

    this.lang = code;
    localStorage.setItem("vc_lang", code);

    const l = document.getElementById("lang-lbl");
    if (l) l.textContent = code;

    await this.loadLocales(); // important

    this._applyLang();

    if (this.recog) this.recog.lang = this.srLang();
    if (window.Lana?.recog) {
      try {
        window.Lana.recog.abort();
      } catch (e) {}
      window.Lana.recog = null;
      if (window.Lana.hasMic) setTimeout(() => window.Lana._startSR(), 200);
    }
    if (window.Lana?.awake) {
      window.Lana._status(this.t("lana.listening"), "#7C3AED");
      const callout = document.getElementById("vv-callout");
      if (callout) callout.textContent = this.t("lana.listening");
    }
  },

  _applyLang() {
    document.querySelectorAll("[data-lang]").forEach((el) => {
      const key = el.dataset.lang;
      const val = this.t(key);
      if (val !== key) el.innerHTML = val;
    });
    document.querySelectorAll("[data-lang-placeholder]").forEach((el) => {
      const key = el.dataset.langPlaceholder;
      const val = this.t(key);
      if (val !== key) el.placeholder = val;
    });
    document.querySelectorAll("[data-lang-value]").forEach((el) => {
      const key = el.dataset.langValue;
      const val = this.t(key);
      if (val !== key) el.value = val;
    });
    // RTL for Arabic
    document.documentElement.dir = this.lang === "AR" ? "rtl" : "ltr";
  },
  togFeedback(id) {
    const b = document.getElementById(id);
    if (!b) return;
    const on = b.textContent === "On";
    b.dataset.lang = on ? "common.off" : "common.on";
    b.textContent = this.t(b.dataset.lang);
    b.style.background = on ? "#F4C0D1" : "var(--p400)";
    b.style.color = on ? "#72243E" : "#fff";
  },

  logout() {
    localStorage.removeItem("vc_user");
    this.toast("Logged out");
    setTimeout(() => {
      location.href = "signin.html";
    }, 500);
  },

  saveSettings() {
    ["book", "report", "history", "contact", "dictate"].forEach((id) => {
      const el = document.getElementById("sc-" + id);
      if (!el) return;
      this.sc[id] = el.value || id;
      localStorage.setItem("vc_sc_" + id, this.sc[id]);
    });
    this.closeSettings();
    this.toast(this.t("settings.saved"));
  },
};
