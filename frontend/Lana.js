/* ============================================================
   VoiceCare — Lana AI Nurse (Final Layout Version)

   LAYOUT:
   - Lana bubble: fixed bottom-right corner always
   - Chat conversation panel: slides up from bottom-right
   - Mic permission banner: top-left on home page only
   - No full-screen overlays
   - First page = home page (index.html)

   APPOINTMENT FLOW:
   Lana asks name → sex → DOB → IC/passport → phone →
   service → preferred date → preferred time → confirms
   ============================================================ */

const LANA_FALLBACK = {
  EN: {
    "lana.greetHome":
      "Hi! I am Lana, your VoiceCare nurse. Say Book to make an appointment, or Report to check your results.",
    "lana.greetBook":
      "Hi! I am on the booking page. Say Fill form and I will guide you through everything step by step.",
    "lana.greetReport":
      "Hi! Your reports are here. Say a report name or Read aloud to hear your results.",
    "lana.greetHistory":
      "Hi! This is your appointment history. Say Upcoming or Completed to filter.",
    "lana.greetContact":
      "Hi! Say Dictate to speak a message, or Call clinic to phone us.",
    "lana.greetSignin": "Hi! Say Sign in or Create account to continue.",
    "lana.greetDefault": "Hi! I am Lana. How can I help?",
    "lana.thinkingHint": "Let me think...",
    "lana.notSure":
      "Not sure about that. Try: Book, Report, History, Call clinic, or Help.",
    "lana.listening": "Listening...",
    "lana.ready": "Ready",
    "lana.sayHi": 'Say "Hi Lana"',
  },
  中文: {
    "lana.greetHome":
      "你好！我是 Lana，你的 VoiceCare 护理助手。说“预约”可以预约，或说“报告”查看结果。",
    "lana.greetBook":
      "你好！我在预约页面。说“填写表格”，我会一步一步帮你完成。",
    "lana.greetReport":
      "你好！你的报告在这里。说报告名称，或说“朗读”来听结果。",
    "lana.greetHistory":
      "你好！这里是你的预约历史。说“即将到来”或“已完成”来筛选。",
    "lana.greetContact": "你好！说“听写”可以语音留言，或说“致电诊所”。",
    "lana.greetSignin": "你好！说“登录”或“创建账户”继续。",
    "lana.greetDefault": "你好！我是 Lana。需要我帮你做什么？",
    "lana.thinkingHint": "让我想一下...",
    "lana.notSure": "我不太确定。请试试：预约、报告、历史、致电诊所或帮助。",
    "lana.listening": "正在聆听...",
    "lana.ready": "准备就绪",
    "lana.sayHi": "说“Hi Lana”",
  },
  PL: {
    "lana.greetHome":
      "Cześć! Jestem Lana, Twoja asystentka VoiceCare. Powiedz „Wizyta”, aby umówić wizytę, albo „Raport”, aby sprawdzić wyniki.",
    "lana.greetBook":
      "Cześć! Jesteś na stronie rezerwacji. Powiedz „Wypełnij formularz”, a przeprowadzę Cię krok po kroku.",
    "lana.greetReport":
      "Cześć! Twoje raporty są tutaj. Powiedz nazwę raportu albo „Czytaj na głos”, aby usłyszeć wyniki.",
    "lana.greetHistory":
      "Cześć! To historia Twoich wizyt. Powiedz „Nadchodzące” albo „Zakończone”, aby filtrować.",
    "lana.greetContact":
      "Cześć! Powiedz „Dyktuj”, aby nagrać wiadomość, albo „Zadzwoń do kliniki”.",
    "lana.greetSignin":
      "Cześć! Powiedz „Zaloguj się” albo „Utwórz konto”, aby kontynuować.",
    "lana.greetDefault": "Cześć! Jestem Lana. Jak mogę pomóc?",
    "lana.thinkingHint": "Chwileczkę...",
    "lana.notSure":
      "Nie jestem pewna. Spróbuj: Wizyta, Raport, Historia, Zadzwoń do kliniki albo Pomoc.",
    "lana.listening": "Słucham...",
    "lana.ready": "Gotowa",
    "lana.sayHi": 'Powiedz "Hi Lana"',
  },
  FR: {
    "lana.greetHome":
      "Bonjour ! Je suis Lana, votre assistante VoiceCare. Dites « Rendez-vous » pour prendre rendez-vous, ou « Rapport » pour consulter vos résultats.",
    "lana.greetBook":
      "Bonjour ! Vous êtes sur la page de rendez-vous. Dites « Remplir le formulaire » et je vous guiderai étape par étape.",
    "lana.greetReport":
      "Bonjour ! Vos rapports sont ici. Dites le nom d’un rapport ou « Lire à voix haute » pour écouter les résultats.",
    "lana.greetHistory":
      "Bonjour ! Voici votre historique de rendez-vous. Dites « À venir » ou « Terminés » pour filtrer.",
    "lana.greetContact":
      "Bonjour ! Dites « Dicter » pour laisser un message, ou « Appeler la clinique ».",
    "lana.greetSignin":
      "Bonjour ! Dites « Se connecter » ou « Créer un compte » pour continuer.",
    "lana.greetDefault": "Bonjour ! Je suis Lana. Comment puis-je vous aider ?",
    "lana.thinkingHint": "Je réfléchis...",
    "lana.notSure":
      "Je ne suis pas sûre. Essayez : Rendez-vous, Rapport, Historique, Appeler la clinique ou Aide.",
    "lana.listening": "J’écoute...",
    "lana.ready": "Prête",
    "lana.sayHi": 'Dites "Hi Lana"',
  },
};

const Lana = {
  awake: false,
  speaking: false,
  recog: null,
  hasMic: false,
  srRunning: false,
  mood: "idle",
  MIC_KEY: "vc_mic_granted",
  _pendingField: null,

  /* Appointment booking conversation state */
  booking: {
    active: false,
    step: 0,
    data: {},
    steps: [
      {
        key: "name",
        ask: "What is your full name?",
        hint: '"My name is Sarah Ali"',
      },
      {
        key: "sex",
        ask: "What is your sex? Male or female?",
        hint: '"Female" or "Male"',
      },
      {
        key: "dob",
        ask: "What is your date of birth?",
        hint: '"Born 12 March 1990"',
      },
      {
        key: "ic",
        ask: "What is your IC or passport number?",
        hint: '"My IC is 901212 04 1234"',
      },
      {
        key: "phone",
        ask: "What is your phone number?",
        hint: '"My number is 012 345 6789"',
      },
      {
        key: "service",
        ask: "Which service do you need? Blood test, check-up, X-ray, ECG, or specialist?",
        hint: '"Blood test"',
      },
      {
        key: "date",
        ask: "What is your preferred appointment date?",
        hint: '"Next Monday" or "28 April"',
      },
      {
        key: "time",
        ask: "What is your preferred time?",
        hint: '"Nine AM" or "Two PM"',
      },
    ],
  },

  MOODS: {
    idle: { dot: "#D4537E" },
    wake: { dot: "#D4537E" },
    listening: { dot: "#7C3AED" },
    thinking: { dot: "#BA7517" },
    speaking: { dot: "#1D9E75" },
    happy: { dot: "#D4537E" },
    error: { dot: "#A32D2D" },
  },

  t(key, vars = {}) {
    let text = window.VC ? VC.t(key) : key;
    if (text === key)
      text =
        LANA_FALLBACK[window.VC?.lang]?.[key] || LANA_FALLBACK.EN[key] || key;
    return Object.entries(vars).reduce(
      (s, [name, value]) => s.replaceAll(`{${name}}`, value),
      text,
    );
  },

  async ensureLocale() {
    if (!window.VC?.loadLocales) return;
    if (
      VC.t("lana.ready") === "lana.ready" ||
      VC.t("lana.greetDefault") === "lana.greetDefault"
    ) {
      await VC.loadLocales();
    }
  },

  langName() {
    return (
      { EN: "English", 中文: "Simplified Chinese", PL: "Polish", FR: "French" }[
        window.VC?.lang
      ] || "English"
    );
  },

  srLang() {
    return window.VC?.srLang ? VC.srLang() : "en-US";
  },

  wakePattern() {
    return /hi lana|hey lana|hello lana|wake lana|\blana\b|你好 lana|嗨 lana|唤醒 lana|cześć lana|hej lana|obudź lana|bonjour lana|salut lana|réveille lana|reveille lana|hi vi|hey vi|hello vi|wake vi|bibi|hivy|hivi|livi|ivy vi|lanad/i;
  },

  sleepPattern() {
    return /bye lana|goodbye lana|sleep lana|stop lana|再见 lana|睡觉 lana|停止 lana|pa lana|dobranoc lana|śpij lana|spij lana|arrête lana|arrete lana|au revoir lana|stop lana/i;
  },

  /* ============================================================
     INJECT UI
     ============================================================ */
  inject() {
    if (document.getElementById("Lana-root")) return;
    const el = document.createElement("div");
    el.id = "Lana-root";
    el.innerHTML = `
<style>
#Lana-root { font-family:'DM Sans',sans-serif; }
#Lana-root * { box-sizing:border-box; }

/* ── MIC PERMISSION BANNER (top-left, home page only) ── */
#vv-mic-banner {
  position:fixed; top:70px; left:16px; z-index:20000;
  background:#fff; border:2px solid #D4537E;
  border-radius:16px; padding:14px 18px;
  max-width:320px; box-shadow:0 4px 20px rgba(212,83,126,.2);
  display:none; flex-direction:column; gap:10px;
  animation:vv-banner-in .4s ease-out;
}
#vv-mic-banner.show { display:flex; }
@keyframes vv-banner-in { from{opacity:0;transform:translateX(-20px)} to{opacity:1;transform:translateX(0)} }
#vv-mic-banner-title {
  font-size:14px; font-weight:600; color:#993556;
}
#vv-mic-banner-body {
  font-size:13px; color:#444441; line-height:1.5;
}
#vv-mic-banner-btn {
  background:#D4537E; color:#fff; border:none;
  border-radius:30px; padding:10px 20px;
  font-size:13px; font-weight:600; font-family:'DM Sans',sans-serif;
  cursor:pointer; transition:background .2s; align-self:flex-start;
}
#vv-mic-banner-btn:hover { background:#993556; }
#vv-mic-banner-close {
  position:absolute; top:10px; right:14px;
  background:none; border:none; font-size:18px; color:#B4B2A9;
  cursor:pointer; line-height:1;
}

/* ── Lana BUBBLE (bottom-right, always visible) ── */
#vv-bubble {
  position:fixed; bottom:80px; right:20px; z-index:10000;
  display:flex; flex-direction:column; align-items:flex-end; gap:6px;
  cursor:pointer;
}
#vv-ball-wrap 
{ position:relative; width:168px; height:168px; }

#vv-ball-ring {
  position:absolute; inset:0; border-radius:50%;
  border:3px solid #F4C0D1;
  transition:border-color .4s, box-shadow .4s;
  animation:vv-float 3s ease-in-out infinite;
}
#vv-ball-ring.pulse {
  border-color:#9B8FE8;
  animation:vv-float 3s ease-in-out infinite, vv-rpulse 1.2s ease-in-out infinite;
}
#vv-ball-img {
  position:absolute; inset:4px; border-radius:50%;
  overflow:hidden; background:transparent;
}
#vv-ball-img img { width:100%; height:100%; object-fit:cover; object-position:center top; display:block; }
#vv-dot-status {
  width:14px; height:14px; border-radius:50%; background:#D4537E;
  border:2px solid #fff; position:absolute; bottom:2px; right:2px;
  animation:vv-dot 1.5s ease-in-out infinite;
}
#vv-callout {
  background:#fff; border:1.5px solid #D4537E;
  border-radius:12px 12px 4px 12px;
  padding:6px 12px; font-size:11px; font-weight:500; color:#993556;
  white-space:nowrap; box-shadow:0 3px 12px rgba(212,83,126,.2);
  animation:vv-bob 2.8s ease-in-out infinite;
  transition:background .2s, color .2s;
}
#vv-callout.active { background:#D4537E; color:#fff; }

/* ── CHAT PANEL (bottom-right, slides up) ── */
#vv-chat {
  position:fixed; bottom:100px; right:20px; z-index:9999;
  width:320px; max-height:480px;
  background:#fff; border:1.5px solid #F4C0D1;
  border-radius:20px 20px 4px 20px;
  box-shadow:0 8px 32px rgba(212,83,126,.18);
  display:none; flex-direction:column; overflow:hidden;
  transform-origin:bottom right;
  animation:vv-panel-in .3s ease-out;
}
#vv-chat.open { display:flex; }
@keyframes vv-panel-in { from{opacity:0;transform:scale(.92)} to{opacity:1;transform:scale(1)} }

/* Chat header */
#vv-chat-head {
  display:flex; align-items:center; gap:10px;
  padding:12px 16px; background:#FBEAF0;
  border-bottom:1px solid #F4C0D1; flex-shrink:0;
}
#vv-head-avatar {
  width:38px; height:38px; border-radius:50%;
  overflow:hidden; flex-shrink:0;
  border:2px solid #D4537E;
}
#vv-head-avatar img { width:100%; height:100%; object-fit:cover; object-position:center top; }
#vv-head-info { flex:1; }
#vv-head-name { font-size:13px; font-weight:600; color:#993556; }
#vv-head-status { font-size:10px; color:#B4B2A9; display:flex; align-items:center; gap:4px; }
#vv-status-dot { width:6px; height:6px; border-radius:50%; background:#D4537E; animation:vv-dot 1.5s ease-in-out infinite; }
#vv-chat-close {
  background:none; border:none; font-size:18px; color:#B4B2A9;
  cursor:pointer; padding:0; line-height:1;
}

/* Chat messages */
#vv-messages {
  flex:1; overflow-y:auto; padding:14px 14px 8px;
  display:flex; flex-direction:column; gap:8px;
}
.vv-msg {
  max-width:85%; padding:9px 13px;
  font-size:13px; line-height:1.5; word-break:break-word;
}
.vv-msg.Lana {
  background:#FBEAF0; color:#2C2C2A;
  border-radius:14px 14px 14px 4px; align-self:flex-start;
}
.vv-msg.user {
  background:#D4537E; color:#fff;
  border-radius:14px 14px 4px 14px; align-self:flex-end;
}
.vv-msg.hint {
  background:#F7F6F4; color:#888780;
  border-radius:10px; font-size:11px; font-style:italic;
  align-self:flex-start; padding:6px 10px;
}

/* Sound waves in chat */
#vv-waves {
  display:flex; gap:3px; align-items:center; height:16px;
  padding:0 4px; opacity:0; transition:opacity .3s;
}
#vv-waves.show { opacity:1; }
.vv-w { width:3px; background:#D4537E; border-radius:2px; animation:vv-wave .72s ease-in-out infinite; }
.vv-w:nth-child(1){height:4px; animation-delay:0s  }
.vv-w:nth-child(2){height:10px;animation-delay:.1s }
.vv-w:nth-child(3){height:16px;animation-delay:.2s }
.vv-w:nth-child(4){height:10px;animation-delay:.3s }
.vv-w:nth-child(5){height:4px; animation-delay:.4s }
@keyframes vv-wave { 0%,100%{transform:scaleY(.3)} 50%{transform:scaleY(1)} }

/* Transcript */
#vv-trans {
  padding:6px 14px 4px;
  font-size:11px; color:#B4B2A9; font-style:italic;
  min-height:22px; flex-shrink:0;
}
#vv-trans.heard { color:#993556; font-style:normal; }

/* Quick chips */
#vv-chips {
  display:flex; flex-wrap:wrap; gap:6px; padding:8px 14px;
  border-top:1px solid #F4C0D1; flex-shrink:0;
}
.vv-chip {
  background:#FBEAF0; border:1px solid #F4C0D1;
  border-radius:20px; padding:5px 12px;
  font-size:11px; font-weight:500; color:#993556; cursor:pointer;
  transition:all .15s;
}
.vv-chip:hover { background:#D4537E; color:#fff; border-color:#D4537E; }

/* Animations */
@keyframes vv-float  { 0%,100%{transform:translateY(0)}  50%{transform:translateY(-7px)} }
@keyframes vv-bob    { 0%,100%{transform:translateY(0)}  50%{transform:translateY(-3px)} }
@keyframes vv-pulse  { 0%,100%{transform:scale(1)}       50%{transform:scale(1.06)}      }
@keyframes vv-shake  { 0%,100%{transform:translateX(0)}  25%{transform:translateX(-5px)} 75%{transform:translateX(5px)} }
@keyframes vv-rpulse { 0%{box-shadow:0 0 0 0 rgba(155,143,232,.5)} 70%{box-shadow:0 0 0 10px rgba(155,143,232,0)} 100%{box-shadow:0 0 0 0 rgba(155,143,232,0)} }
@keyframes vv-dot    { 0%,100%{opacity:.3} 50%{opacity:1} }
</style>

<!-- MIC PERMISSION BANNER (top-left, home only) -->
<div id="vv-mic-banner">
  <button id="vv-mic-banner-close" onclick="document.getElementById('vv-mic-banner').classList.remove('show')">&times;</button>
  <div id="vv-mic-banner-title" data-lang="lana.micTitle">Allow microphone for hands-free access</div>
  <div id="vv-mic-banner-body" data-lang="lana.micBody">
    VoiceCare is designed to be completely hands-free. Allow microphone once — then just say <strong>"Hi Lana"</strong> any time.
  </div>
  <button id="vv-mic-banner-btn" onclick="Lana._grantMic()" data-lang="lana.allowMic">Yes, allow microphone</button>
</div>

<!-- Lana BUBBLE (bottom-right) -->
<div id="vv-bubble" onclick="Lana._onBubbleClick()">
  <div id="vv-callout">Say "Hi Lana"</div>
  <div id="vv-ball-wrap">
    <div id="vv-ball-ring"></div>
    <div id="vv-ball-img"><img src="Lana-char.svg" alt="Lana"/></div>
    <div id="vv-dot-status"></div>
  </div>
</div>

<!-- CHAT PANEL (bottom-right, above bubble) -->
<div id="vv-chat">
  <div id="vv-chat-head">
    <div id="vv-head-avatar"><img src="Lana-char.svg" alt="Lana"/></div>
    <div id="vv-head-info">
      <div id="vv-head-name">Lana</div>
      <div id="vv-head-status">
        <div id="vv-status-dot"></div>
        <span id="vv-stxt" data-lang="lana.ready">Ready</span>
      </div>
    </div>
    <div id="vv-waves">
      <div class="vv-w"></div><div class="vv-w"></div><div class="vv-w"></div>
      <div class="vv-w"></div><div class="vv-w"></div>
    </div>
    <button id="vv-chat-close" onclick="Lana.sleep()">&times;</button>
  </div>

  <div id="vv-messages"></div>
  <div id="vv-trans" data-lang="lana.waiting">Waiting for your voice...</div>

  <div id="vv-chips"></div>


</div>`;
    document.body.appendChild(el);
    if (window.VC) VC._applyLang();
  },

  _renderControls() {
  const box = document.getElementById("vv-chips");
  if (!box) return;

  const isStandard =
    window.VC &&
    VC.mode === "standard";

  if (isStandard) {

    box.innerHTML = `
      <div style="display:flex;gap:8px;width:100%;">

        <input
          id="vv-text-input"
          type="text"
          placeholder="Type to Lana..."
          style="
            flex:1;
            border:1px solid #F4C0D1;
            border-radius:20px;
            padding:8px 12px;
            font-size:12px;
            outline:none;
          "
          onkeydown="
            if(event.key==='Enter')
            Lana.sendText()
          "
        />

        <button
          onclick="Lana.sendText()"
          style="
            border:none;
            background:#D4537E;
            color:white;
            border-radius:20px;
            padding:8px 14px;
            cursor:pointer;
          "
        >
          Send
        </button>

      </div>
    `;

  } else {

    box.innerHTML = `
      <span class="vv-chip" onclick="Lana.cmd('Book appointment')">Book</span>
      <span class="vv-chip" onclick="Lana.cmd('Check my report')">Report</span>
      <span class="vv-chip" onclick="Lana.cmd('My history')">History</span>
      <span class="vv-chip" onclick="Lana.cmd('Call clinic')">Call</span>
      <span class="vv-chip" onclick="Lana.cmd('Help')">Help</span>
      <span class="vv-chip" onclick="Lana.cmd('Bye Lana')">Sleep</span>
    `;
  }
},

sendText() {
  const input =
    document.getElementById("vv-text-input");

  if (!input) return;

  const text = input.value.trim();

  if (!text) return;

  input.value = "";

  this.cmd(text);
},

  /* ============================================================
     ADD CHAT MESSAGE
     ============================================================ */


  _addMsg(text, type) {
    const box = document.getElementById("vv-messages");
    if (!box) return;
    const div = document.createElement("div");
    div.className = "vv-msg " + type;
    div.innerHTML = text;
    box.appendChild(div);
    box.scrollTop = box.scrollHeight;
  },

  _addHint(text) {
    this._addMsg(text, "hint");
  },

  /* ============================================================
     MIC PERMISSION
     ============================================================ */
  async _grantMic() {
    const btn = document.getElementById("vv-mic-banner-btn");
    if (btn) {
      btn.textContent = window.VC ? VC.t("lana.requesting") : "Requesting...";
      btn.disabled = true;
    }
    try {
      const s = await navigator.mediaDevices.getUserMedia({ audio: true });
      s.getTracks().forEach((t) => t.stop());
      this.hasMic = true;
      localStorage.setItem(this.MIC_KEY, "1");
      document.getElementById("vv-mic-banner")?.classList.remove("show");
      this._startSR();
      setTimeout(() => this._doWake(), 600);
    } catch (e) {
      if (btn) {
        btn.textContent = window.VC ? VC.t("lana.tryAgain") : "Try again";
        btn.disabled = false;
        btn.style.background = "#A32D2D";
      }
      const body = document.getElementById("vv-mic-banner-body");
      if (body)
        body.innerHTML = window.VC
          ? VC.t("lana.micBlocked")
          : '<strong style="color:#A32D2D">Blocked.</strong> Click the lock icon in the address bar, set Microphone to Allow, then refresh.';
    }
  },

  /* ============================================================
     SPEECH RECOGNITION
     ============================================================ */
  _startSR() {
    if (window.VC && VC.recog) {
      try {
        VC.recog.abort();
      } catch (e) {}
      VC.recog = null;
    }
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return;
    if (this.recog) {
      try {
        this.recog.abort();
      } catch (e) {}
      this.recog = null;
    }

    const r = new SR();
    r.continuous = true;
    r.interimResults = true;
    r.lang = this.srLang();
    r.maxAlternatives = 3;
    try {
      const sg = new (
        window.SpeechGrammarList || window.webkitSpeechGrammarList
      )();
      sg.addFromString(
        "#JSGF V1.0; grammar Lana; public <Lana> = hi Lana | hey Lana | hello Lana | bye Lana | 你好 Lana | cześć Lana | bonjour Lana;",
        1,
      );
      r.grammars = sg;
    } catch (e) {}
    this.recog = r;

    r.onstart = () => {
      this.srRunning = true;
    };
    r.onerror = (e) => {
      this.srRunning = false;
      if (e.error === "not-allowed") {
        this.hasMic = false;
        localStorage.removeItem(this.MIC_KEY);
      }
    };
    r.onend = () => {
      this.srRunning = false;
      if (this.hasMic && !this.speaking)
        setTimeout(() => {
          try {
            this.recog.start();
          } catch (e) {}
        }, 500);
    };

    r.onresult = (e) => {
      let interim = "",
        final = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        if (!this.awake && !e.results[i].isFinal) {
          for (let a = 0; a < e.results[i].length; a++) {
            if (this._isWake(e.results[i][a].transcript.toLowerCase().trim())) {
              this._doWake();
              return;
            }
          }
        }
        const t = e.results[i][0].transcript;
        e.results[i].isFinal ? (final += t) : (interim += t);
      }
      const text = final || interim,
        lower = text.toLowerCase().trim();
      if (this.awake) this._trans(text, !!final);
      if (!final) return;

      if (!this.awake) {
        if (this._isWake(lower)) this._doWake();
        return;
      }
      if (this.sleepPattern().test(lower)) {
        this.sleep();
        return;
      }
      if (!this.speaking) this._handle(final.trim(), lower);
    };

    try {
      r.start();
    } catch (e) {}
  },

  _isWake(lower) {
    return this.wakePattern().test(lower);
  },

  /* ============================================================
     BUBBLE CLICK
     ============================================================ */
  _onBubbleClick() {
    if (this.awake) {
      this.sleep();
      return;
    }
    if (this.hasMic && this.srRunning) {
      this._doWake();
      return;
    }
    if (this.hasMic && !this.srRunning) {
      this._startSR();
      setTimeout(() => this._doWake(), 600);
      return;
    }
    this._grantMic();
  },

  /* ============================================================
     WAKE / SLEEP
     ============================================================ */
  _doWake() {
    if (this.awake) return;
    this.awake = true;
    document.getElementById("vv-chat")?.classList.add("open");
    this._renderControls();
    document.getElementById("vv-callout")?.classList.add("active");

    const isVoiceMode = window.VC && VC.mode === "voice";

    document.getElementById("vv-callout").textContent = isVoiceMode
      ? this.t("lana.listening")
      : "Talk with Lana";

    document.getElementById("vv-mic-banner")?.classList.remove("show");
    this.setMood("wake");

    const page = window.location.pathname.split("/").pop() || "index.html";
    const greets = {
      "index.html": "lana.greetHome",
      "book.html": "lana.greetBook",
      "report.html": "lana.greetReport",
      "history.html": "lana.greetHistory",
      "contact.html": "lana.greetContact",
      "signin.html": "lana.greetSignin",
    };
    this.say(this.t(greets[page] || "lana.greetDefault"));
  },

  sleep() {
    this.awake = false;
    this.speaking = false;
    this.booking.active = false;
    this.booking.step = 0;
    this.booking.data = {};
    if (window.speechSynthesis) speechSynthesis.cancel();
    document.getElementById("vv-chat")?.classList.remove("open");
    const callout = document.getElementById("vv-callout");
    if (callout) {
      callout.textContent = this.t("lana.sayHi");
      callout.classList.remove("active");
    }
    this.setMood("idle");
    this._status(this.t("lana.sleeping"), "#888780");
  },

  /* ============================================================
     MOOD / UI
     ============================================================ */
  setMood(mood) {
    const m = this.MOODS[mood] || this.MOODS.idle;
    const ballRing = document.getElementById("vv-ball-ring");
    if (ballRing) ballRing.className = mood === "listening" ? "pulse" : "";
    const dotStatus = document.getElementById("vv-dot-status");
    if (dotStatus) dotStatus.style.background = m.dot;
    const statusDot = document.getElementById("vv-status-dot");
    if (statusDot) statusDot.style.background = m.dot;
    const waves = document.getElementById("vv-waves");
    if (waves) {
      waves.classList.toggle(
        "show",
        mood === "listening" || mood === "speaking",
      );
      document
        .querySelectorAll(".vv-w")
        .forEach((w) => (w.style.background = m.dot));
    }
  },

  _trans(t, heard) {
    const e = document.getElementById("vv-trans");
    if (!e) return;
    e.textContent = t;
    e.className = heard ? "heard" : "";
  },
  _status(txt, color) {
    const e = document.getElementById("vv-stxt");
    const d = document.getElementById("vv-status-dot");
    if (e) e.textContent = txt;
    if (d && color) d.style.background = color;
  },
  _wait(ms) {
    return new Promise((r) => setTimeout(r, ms));
  },

  /* ============================================================
     TEXT-TO-SPEECH
     ============================================================ */
  say(text, onEnd) {
    if (!window.speechSynthesis) {
      this._addMsg(text, "Lana");
      if (onEnd) onEnd();
      return;
    }
    this.speaking = true;
    this.setMood("speaking");
    this._status(this.t("lana.speaking"), "#1D9E75");
    this._addMsg(text, "Lana");
    speechSynthesis.cancel();

    const go = () => {
      const u = new SpeechSynthesisUtterance(text.replace(/<[^>]*>/g, ""));
      u.lang = this.srLang();
      u.rate = 0.92;
      u.pitch = 1.05;
      u.volume = 1;
      const vs = speechSynthesis.getVoices();
      const langRoot = this.srLang().split("-")[0].toLowerCase();
      const fem =
        vs.find(
          (v) =>
            v.lang?.toLowerCase().startsWith(langRoot) &&
            /samantha|victoria|karen|moira|tessa|fiona|female|woman|mei|ting|xiaoxiao|zosia|ewa|amelie|audrey|hortense/i.test(
              v.name,
            ),
        ) ||
        vs.find((v) => v.lang?.toLowerCase().startsWith(langRoot)) ||
        vs.find((v) =>
          /samantha|victoria|karen|moira|tessa|fiona|female|woman/i.test(
            v.name,
          ),
        );
      if (fem) u.voice = fem;
      u.onend = () => {
        this.speaking = false;
        if (this.awake) {
          this.setMood("listening");
          this._status(this.t("lana.listening"), "#7C3AED");
          setTimeout(() => {
            if (!this.srRunning) {
              try {
                this.recog?.start();
              } catch (e) {}
            }
          }, 300);
        }
        if (onEnd) onEnd();
      };
      u.onerror = () => {
        this.speaking = false;
        if (onEnd) onEnd();
      };
      speechSynthesis.speak(u);
    };
    if (speechSynthesis.getVoices().length > 0) {
      go();
    } else {
      speechSynthesis.onvoiceschanged = () => {
        speechSynthesis.onvoiceschanged = null;
        go();
      };
      setTimeout(go, 600);
    }
  },

  cmd(text) {
    this._addMsg(text, "user");
    this._trans(text, true);
    this._handle(text, text.toLowerCase());
  },

  /* ============================================================
     COMMAND HANDLER
     ============================================================ */
  _handle(text, lower) {
    // ── BOOKING CONVERSATION (active flow) ───────────────────
    if (this.booking.active) {
      this._bookingStep(text, lower);
      return;
    }

    // ── NAVIGATION ───────────────────────────────────────────
    if (
      /\bhome\b|go home|主页|首页|回首页|回主页|strona główna|strona glowna|accueil/.test(
        lower,
      )
    ) {
      this._nav("index.html", this.t("lana.navHome"));
      return;
    }
    if (
      /\bbook\b|make appointment|new appointment|book appointment|预约|挂号|预订|約|umów|umow|wizyta|rendez-vous/.test(
        lower,
      )
    ) {
      this._startBooking();
      return;
    }
    if (
      /\breport\b|my results|check result|报告|報告|结果|結果|检查报告|檢查報告|raport|wynik|résultat|resultat/.test(
        lower,
      )
    ) {
      this._nav("report.html", this.t("lana.navReport"));
      return;
    }
    if (
      /history|past appointment|历史|歷史|记录|紀錄|historia|historique/.test(
        lower,
      )
    ) {
      this._nav("history.html", this.t("lana.navHistory"));
      return;
    }
    if (/\bcontact\b|联系|聯絡|电话|電話|kontakt|contact/.test(lower)) {
      this._nav("contact.html", this.t("lana.navContact"));
      return;
    }
    if (
      /sign in|login|log in|登录|登入|zaloguj|connexion|connecter/.test(lower)
    ) {
      this._nav("signin.html", this.t("lana.navSignin"));
      return;
    }
    if (
      /sign up|register|create account|注册|註冊|utwórz konto|utworz konto|créer un compte|creer un compte/.test(
        lower,
      )
    ) {
      this._nav("signin.html", this.t("lana.navSignup"));
      return;
    }

    // ── PHONE CALL ───────────────────────────────────────────
    if (
      /call|phone|ring|dial|打电话|打電話|致电|致電|呼叫|zadzwoń|zadzwon|appel|appeler/.test(
        lower,
      )
    ) {
      this.say(this.t("lana.callingClinic"), () => {
        window.location.href = "tel:+00000000000";
      });
      return;
    }

    // ── SCROLL ───────────────────────────────────────────────
    if (
      /scroll down|go down|向下|przewiń w dół|przewin w dol|descendre|défiler vers le bas/.test(
        lower,
      )
    ) {
      window.scrollBy({ top: 320, behavior: "smooth" });
      this.say(this.t("lana.scrollingDown"));
      return;
    }
    if (
      /scroll up|go up|向上|przewiń w górę|przewin w gore|monter|défiler vers le haut/.test(
        lower,
      )
    ) {
      window.scrollBy({ top: -320, behavior: "smooth" });
      this.say(this.t("lana.scrollingUp"));
      return;
    }
    if (/\btop\b|back to top|顶部|góra|gora|haut/.test(lower)) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      this.say(this.t("lana.backToTop"));
      return;
    }

    // ── CLICK BUTTONS ────────────────────────────────────────
    if (
      /confirm booking|confirm appointment|确认预约|確認預約|potwierdź|potwierdz|confirmer/.test(
        lower,
      )
    ) {
      this._click([
        "Confirm booking",
        "Confirm",
        "确认预约",
        "Potwierdź",
        "Confirmer",
      ]);
      return;
    }
    if (/\bsend\b|send message|发送|發送|wyślij|wyslij|envoyer/.test(lower)) {
      this._click(["Send message", "Send", "发送", "Wyślij", "Envoyer"]);
      return;
    }
    if (/read aloud|read report|朗读|朗讀|czytaj|lire/.test(lower)) {
      this._click(["Read aloud", "朗读", "Czytaj", "Lire"]);
      return;
    }
    if (
      /start over|reset|重新开始|重新開始|重置|od nowa|réinitialiser|reinitialiser/.test(
        lower,
      )
    ) {
      this._click([
        "Start over",
        "Reset",
        "重新开始",
        "Od nowa",
        "Réinitialiser",
      ]);
      return;
    }
    if (/\bcancel\b|取消|anuluj|annuler/.test(lower)) {
      this._click(["Cancel", "取消", "Anuluj", "Annuler"]);
      return;
    }

    // ── FILL FORM (generic) ──────────────────────────────────
    if (
      /fill form|fill the form|fill in|填写|填表|wypełnij|wypelnij|remplir/.test(
        lower,
      )
    ) {
      this._startBooking();
      return;
    }

    // ── HELP ─────────────────────────────────────────────────
    if (/\bhelp\b|what can you do|帮助|幫助|pomoc|aide/.test(lower)) {
      this.say(this.t("lana.helpText"));
      this._addHint(this.t("lana.helpHint"));
      return;
    }

    // ── LOCAL FILL ───────────────────────────────────────────
    const local = this._local(text, lower);
    if (local) {
      this.setMood("happy");
      this.say(local.say, () => {
        if (local.do) local.do();
      });
      return;
    }

    // ── AI FALLBACK ──────────────────────────────────────────
    this._ai(text, lower);
  },

  /* ============================================================
     APPOINTMENT BOOKING CONVERSATION
     Lana asks each question one by one
     ============================================================ */
  _startBooking() {
    // Navigate to book page first if not already there
    const page = window.location.pathname.split("/").pop() || "index.html";
    if (page !== "book.html") {
      this.say(this.t("lana.bookingGo"), () => {
        location.href = "book.html";
        // booking will auto-start on book.html via sessionStorage flag
        sessionStorage.setItem("vv_start_booking", "1");
      });
      return;
    }
    this.booking.active = true;
    this.booking.step = 0;
    this.booking.data = {};
    this.say(this.t("lana.bookingIntro"), () => {
      this._askBookingStep();
    });
  },

  _askBookingStep() {
    if (this.booking.step >= this.booking.steps.length) {
      this._confirmBooking();
      return;
    }
    const s = this.booking.steps[this.booking.step];
    this.say(this.t(`lana.bookingSteps.${s.key}.ask`), () => {
      this._addHint(
        this.t("lana.examplePrefix") +
          " " +
          this.t(`lana.bookingSteps.${s.key}.hint`),
      );
      this.setMood("listening");
    });
  },

  _bookingStep(text, lower) {
    const s = this.booking.steps[this.booking.step];
    if (!s) {
      this._confirmBooking();
      return;
    }

    let value = this._extractValue(s.key, text, lower);

    if (!value) {
      this.say(
        this.t("lana.didNotCatch") +
          " " +
          this.t(`lana.bookingSteps.${s.key}.ask`),
      );
      return;
    }

    this.booking.data[s.key] = value;
    this._addMsg(text, "user");

    // Fill corresponding form field
    this._fillBookingField(s.key, value);

    this.booking.step++;

    if (this.booking.step >= this.booking.steps.length) {
      this._confirmBooking();
    } else {
      const confirm = this._formatValue(s.key, value);
      this.say(
        confirm +
          ". " +
          this.t(
            `lana.bookingSteps.${this.booking.steps[this.booking.step].key}.ask`,
          ),
        () => {
          this._addHint(
            this.t("lana.examplePrefix") +
              " " +
              this.t(
                `lana.bookingSteps.${this.booking.steps[this.booking.step].key}.hint`,
              ),
          );
        },
      );
    }
  },

  _extractValue(key, text, lower) {
    const clean = text
      .replace(/^(my|the|it is|is|its|i am|set to|iam)\s+/i, "")
      .trim();

    if (key === "name") {
      const m = lower.match(/(?:name is|i am|i'm|call me|my name is)\s+(.+)/);
      return m
        ? m[1].trim()
        : lower.length > 2 && !/^\d+$/.test(lower)
          ? clean
          : null;
    }
    if (key === "sex") {
      if (/female|woman|girl|she|her|f\b/.test(lower)) return "Female";
      if (/male|man|boy|he|him|m\b/.test(lower)) return "Male";
      return null;
    }
    if (key === "dob") {
      const m = lower.match(
        /(?:born|birthday|dob|birth date|date of birth)?\s*(?:on|is)?\s*(\d{1,2}[\s\/\-]\w+[\s\/\-]\d{2,4}|\w+ \d{1,2},?\s*\d{4}|\d{1,2}\/\d{1,2}\/\d{2,4})/,
      );
      return m ? m[1].trim() : lower.match(/\d/) ? clean : null;
    }
    if (key === "ic") {
      const m = text.match(/[\d\s\-]{6,}/);
      return m
        ? m[0].trim().replace(/\s+/g, "-")
        : clean.length > 5
          ? clean
          : null;
    }
    if (key === "phone") {
      const m = text.match(/[\d\s\-\+]{8,}/);
      return m ? m[0].trim() : null;
    }
    if (key === "service") {
      if (/blood/i.test(lower)) return "Blood test";
      if (/check.?up|general/i.test(lower)) return "General check-up";
      if (/x.?ray/i.test(lower)) return "X-ray";
      if (/ecg|heart/i.test(lower)) return "ECG / Heart screening";
      if (/specialist/i.test(lower)) return "Specialist referral";
      return null;
    }
    if (key === "date") {
      return clean.length > 3 ? clean : null;
    }
    if (key === "time") {
      const timeMap = {
        eight: "08:00",
        nine: "09:00",
        ten: "10:00",
        eleven: "11:00",
        two: "14:00",
        three: "15:00",
        four: "16:00",
      };
      const isPM = /pm/.test(lower);
      for (const [word, val] of Object.entries(timeMap)) {
        if (lower.includes(word)) return val;
      }
      const numM = lower.match(/(\d{1,2})(?::(\d{2}))?\s*(am|pm)?/);
      if (numM) {
        let h = parseInt(numM[1]);
        if ((numM[3] === "pm" || isPM) && h < 12) h += 12;
        return h.toString().padStart(2, "0") + ":" + (numM[2] || "00");
      }
      return null;
    }
    return clean.length > 0 ? clean : null;
  },

  _formatValue(key, val) {
    const label = this.t(`lana.bookingLabels.${key}`);
    return this.t("lana.fieldSet", {
      field: label === `lana.bookingLabels.${key}` ? key : label,
      value: val,
    });
  },

  _fillBookingField(key, value) {
    const map = {
      name: () => {
        this._fillField(["name", "full", "patient"], value);
      },
      sex: () => {
        this._fillField(["sex", "gender"], value);
      },
      dob: () => {
        this._fillField(["dob", "birth", "born"], value);
      },
      ic: () => {
        this._fillField(["ic", "nric", "passport", "id"], value);
      },
      phone: () => {
        this._fillField(["phone", "mobile", "tel", "number"], value);
      },
      service: () => {
        this._fillSelect(["service"], value);
      },
      date: () => {
        this._fillField(["date", "apptdate", "appointment"], value);
      },
      time: () => {
        this._fillSelect(["time"], value);
      },
    };
    if (map[key]) map[key]();
  },

  _confirmBooking() {
    this.booking.active = false;
    const d = this.booking.data;
    const summary = Object.entries(d)
      .map(([k, v]) => this._formatValue(k, v))
      .join(", ");
    this.say(this.t("lana.bookingSummary", { summary }));
    this._addHint(this.t("lana.confirmHint"));
  },

  /* ============================================================
     FILL HELPERS
     ============================================================ */
  _fillField(keywords, value) {
    const inputs = [
      ...document.querySelectorAll(
        "input:not([type=hidden]):not([type=submit]),textarea",
      ),
    ];
    for (const kw of keywords) {
      const f = inputs.find(
        (i) =>
          (i.id || "").toLowerCase().includes(kw) ||
          (i.placeholder || "").toLowerCase().includes(kw) ||
          (i.labels?.[0]?.textContent || "").toLowerCase().includes(kw) ||
          (i.name || "").toLowerCase().includes(kw),
      );
      if (f) {
        f.value = value;
        f.classList.add("done");
        f.dispatchEvent(new Event("input"));
        f.dispatchEvent(new Event("change"));
        return;
      }
    }
  },

  _fillSelect(keywords, value) {
    const selects = [...document.querySelectorAll("select")];
    for (const kw of keywords) {
      const s = selects.find(
        (i) =>
          (i.id || "").toLowerCase().includes(kw) ||
          (i.name || "").toLowerCase().includes(kw) ||
          (i.labels?.[0]?.textContent || "").toLowerCase().includes(kw),
      );
      if (s) {
        const opt = [...s.options].find(
          (o) =>
            o.value === value ||
            o.text === value ||
            o.text.toLowerCase().includes(value.toLowerCase()),
        );
        if (opt) {
          s.value = opt.value;
          s.classList.add("done");
          s.dispatchEvent(new Event("change"));
          return;
        }
      }
    }
    document.querySelectorAll("select").forEach((s) => {
      const opt = [...s.options].find((o) =>
        o.text.toLowerCase().includes(value.toLowerCase()),
      );
      if (opt) {
        s.value = opt.value;
        s.classList.add("done");
        s.dispatchEvent(new Event("change"));
      }
    });
  },

  _click(labels) {
    for (const lbl of labels) {
      const btn = [
        ...document.querySelectorAll("button,.btn,a[role=button]"),
      ].find((b) =>
        b.textContent.trim().toLowerCase().includes(lbl.toLowerCase()),
      );
      if (btn) {
        btn.click();
        this.say(this.t("lana.clicked", { label: lbl.trim() }));
        return;
      }
    }
    this.say(this.t("lana.buttonNotFound"));
  },

  _nav(page, msg) {
    this.setMood("happy");
    this.say(msg, () => {
      location.href = page;
    });
  },

  /* ============================================================
     LOCAL PATTERNS (for non-booking field fills)
     ============================================================ */
  _local(text, lower) {
    const nm = lower.match(
      /my name is (.+)|name is (.+)|i am (.+)|call me (.+)/,
    );
    if (nm) {
      const val = (nm[1] || nm[2] || nm[3] || nm[4]).trim();
      return {
        say: `Filling name as ${val}.`,
        do: () => this._fillField(["name", "full"], val),
      };
    }
    const em = lower.match(/my email is (\S+@\S+)|email (\S+@\S+)/);
    if (em) {
      const val = (em[1] || em[2]).trim();
      return {
        say: `Setting email to ${val}.`,
        do: () => {
          const f = document.querySelector("input[type=email]");
          if (f) {
            f.value = val;
            f.classList.add("done");
            f.dispatchEvent(new Event("input"));
          }
        },
      };
    }
    if (/blood test/.test(lower))
      return {
        say: "Selecting Blood test.",
        do: () => this._fillSelect(["service"], "Blood test"),
      };
    if (/check.?up|general/.test(lower))
      return {
        say: "Selecting General check-up.",
        do: () => this._fillSelect(["service"], "General check-up"),
      };
    if (/x.?ray/.test(lower))
      return {
        say: "Selecting X-ray.",
        do: () => this._fillSelect(["service"], "X-ray"),
      };
    if (/ecg|heart screen/.test(lower))
      return {
        say: "Selecting ECG screening.",
        do: () => this._fillSelect(["service"], "ECG / Heart screening"),
      };
    return null;
  },

  /* ============================================================
     CLAUDE API FALLBACK
     ============================================================ */
  async _ai(text, lower) {
    this.setMood("thinking");
    this._status(this.t("lana.thinking"), "#BA7517");
    this._addMsg(this.t("lana.thinkingHint"), "hint");
    try {
      const page = window.location.pathname.split("/").pop() || "index.html";
      const fields = [...document.querySelectorAll("input,select,textarea")]
        .filter((f) => f.id && f.offsetParent)
        .map((f) => ({
          id: f.id,
          type: f.type || f.tagName.toLowerCase(),
          placeholder: f.placeholder || "",
          label: f.labels?.[0]?.textContent?.trim() || "",
          value: f.value || "",
        }))
        .slice(0, 10);
      const buttons = [...document.querySelectorAll("button,.btn")]
        .filter((b) => b.offsetParent)
        .map((b) => b.textContent.trim())
        .filter(Boolean)
        .slice(0, 8);
      const res = await fetch("http://127.0.0.1:8787/api/lana", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text,
          page,
          fields,
          buttons,
          lang: window.VC?.lang || "EN",
          languageName: this.langName(),
        }),
      });
      if (!res.ok) throw new Error("api");
      const p = await res.json();
      this.setMood("happy");
      this._status(this.t("lana.listening"), "#7C3AED");
      if (p.action === "fill" && p.field_id && p.field_value) {
        const f = document.getElementById(p.field_id);
        if (f) {
          f.value = p.field_value;
          f.classList.add("done");
          f.dispatchEvent(new Event("input"));
          f.dispatchEvent(new Event("change"));
        }
        this.say(p.say || this.t("lana.filled"));
      } else if (p.action === "click" && p.button_text) {
        this.say(p.say || this.t("lana.clicking"), () =>
          this._click([p.button_text]),
        );
      } else if (p.action === "navigate" && p.page) {
        this._nav(p.page, p.say || this.t("lana.onMyWay"));
      } else if (p.action === "call") {
        this.say(p.say || this.t("lana.callingShort"), () => {
          window.location.href = "tel:+0000000000000";
        });
      } else if (p.action === "scroll") {
        window.scrollBy({ top: 320, behavior: "smooth" });
        this.say(p.say || this.t("lana.scrollingDown"));
      } else {
        this.say(p.say || this.t("lana.tryMainCommands"));
      }
    } catch (e) {
      this.setMood("happy");
      this._status(this.t("lana.listening"), "#7C3AED");
      this.say(this.t("lana.notSure"));
    }
  },

  /* ============================================================
     INIT
     ============================================================ */
  async init() {
    await this.ensureLocale();
    this.inject();
    const page = window.location.pathname.split("/").pop() || "index.html";
    const alreadyGranted = localStorage.getItem(this.MIC_KEY) === "1";

    if (alreadyGranted) {
      // Returning user — auto-start SR silently
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((s) => {
          s.getTracks().forEach((t) => t.stop());
          this.hasMic = true;
          this._startSR();
        })
        .catch(() => {
          localStorage.removeItem(this.MIC_KEY);
          if (page === "index.html")
            document.getElementById("vv-mic-banner")?.classList.add("show");
        });
    } else {
      // First visit — show banner only on home page
      if (page === "index.html") {
        setTimeout(() => {
          document.getElementById("vv-mic-banner")?.classList.add("show");
        }, 1200);
      }
    }

    // Auto-start booking if coming from redirect
    if (sessionStorage.getItem("vv_start_booking") === "1") {
      sessionStorage.removeItem("vv_start_booking");
      setTimeout(() => {
        if (this.hasMic && this.srRunning) {
          this._doWake();
          setTimeout(() => this._startBooking(), 1000);
        }
      }, 1500);
    }
  },
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => Lana.init());
} else {
  Lana.init();
}
