const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = Number(process.env.PORT || 8788);
const MODEL = process.env.OPENAI_MODEL || "gpt-4o-mini";
const API_KEY = process.env.OPENAI_API_KEY;

const bookingsFile = path.join(__dirname, "data", "bookings.json");
const contactsFile = path.join(__dirname, "data", "contacts.json");
const usersFile = path.join(__dirname, "data", "users.json");

function send(res, status, body) {
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  });
  res.end(JSON.stringify(body));
}

function readJsonFile(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8") || "[]");
  } catch {
    return [];
  }
}

function writeJsonFile(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

async function readBody(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  return JSON.parse(Buffer.concat(chunks).toString("utf8") || "{}");
}

function cleanJson(text) {
  return text.replace(/```json|```/g, "").trim();
}

function fallback(lang) {
  const map = {
    中文: "我不太确定。请试试：预约、报告、历史、致电诊所或帮助。",
    PL: "Nie jestem pewna. Spróbuj: Wizyta, Raport, Historia, Zadzwoń do kliniki albo Pomoc.",
    FR: "Je ne suis pas sûre. Essayez : Rendez-vous, Rapport, Historique, Appeler la clinique ou Aide.",
    EN: "Not sure about that. Try: Book, Report, History, Call clinic, or Help.",
  };

  return {
    action: "speak",
    field_id: null,
    field_value: null,
    button_text: null,
    page: null,
    say: map[lang] || map.EN,
    confidence: "low",
  };
}

async function askOpenAI(payload) {
  const {
    text = "",
    page = "index.html",
    fields = [],
    buttons = [],
    lang = "EN",
    languageName = "English",
  } = payload;

  const prompt = `You are Lana, a friendly hands-free AI nurse assistant for VoiceCare.
The current interface language is ${languageName}. Reply in ${languageName}.

Current page: ${page}
Visible form fields: ${JSON.stringify(fields)}
Visible buttons: ${JSON.stringify(buttons)}
User said: ${JSON.stringify(text)}

Understand multilingual commands, especially English, Simplified Chinese, Polish, and French.
Return ONLY valid JSON, no markdown:
{
  "action": "speak|fill|click|navigate|call|scroll",
  "field_id": "visible field id or null",
  "field_value": "value to fill or null",
  "button_text": "visible button text to click or null",
  "page": "index.html|book.html|report.html|history.html|contact.html|signin.html|null",
  "say": "warm one-sentence reply in ${languageName}",
  "confidence": "high|low"
}`;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: MODEL,
      temperature: 0.2,
      messages: [{ role: "user", content: prompt }],
    }),
  });

  if (!response.ok) throw new Error(await response.text());

  const data = await response.json();
  return JSON.parse(cleanJson(data.choices?.[0]?.message?.content || "{}"));
}

async function askOpenAIText(prompt) {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: MODEL,
      temperature: 0.1,
      messages: [{ role: "user", content: prompt }],
    }),
  });

  if (!response.ok) throw new Error(await response.text());

  const data = await response.json();
  return data.choices?.[0]?.message?.content || "";
}

const server = http.createServer(async (req, res) => {
  if (req.method === "OPTIONS") {
    return send(res, 200, { ok: true });
  }

  if (req.method === "GET" && req.url === "/api/health") {
    return send(res, 200, {
      status: "OK",
      message: "VoiceCare backend is running",
    });
  }

  if (req.method === "GET" && req.url === "/api/bookings") {
    return send(res, 200, readJsonFile(bookingsFile));
  }

  if (req.method === "POST" && req.url === "/api/bookings") {
    try {
      const payload = await readBody(req);
      const bookings = readJsonFile(bookingsFile);

      const newBooking = {
        id: Date.now(),
        ...payload,
        createdAt: new Date().toISOString(),
      };

      bookings.push(newBooking);
      writeJsonFile(bookingsFile, bookings);

      return send(res, 201, {
        message: "Booking saved successfully",
        booking: newBooking,
      });
    } catch {
      return send(res, 400, { error: "Invalid booking data" });
    }
  }

  if (req.method === "GET" && req.url === "/api/contacts") {
    return send(res, 200, readJsonFile(contactsFile));
  }

  if (req.method === "POST" && req.url === "/api/contact") {
    try {
      const payload = await readBody(req);
      const contacts = readJsonFile(contactsFile);

      const newContact = {
        id: Date.now(),
        ...payload,
        createdAt: new Date().toISOString(),
      };

      contacts.push(newContact);
      writeJsonFile(contactsFile, contacts);

      return send(res, 201, {
        message: "Contact message saved successfully",
        contact: newContact,
      });
    } catch {
      return send(res, 400, { error: "Invalid contact data" });
    }
  }

  if (req.method === "POST" && req.url === "/api/register") {
    try {
      const payload = await readBody(req);
      const users = readJsonFile(usersFile);

      const { name, email, password } = payload;

      if (!name || !email || !password) {
        return send(res, 400, {
          error: "Name, email, and password are required",
        });
      }

      const existingUser = users.find((user) => user.email === email);

      if (existingUser) {
        return send(res, 409, {
          error: "User already exists",
        });
      }

      const newUser = {
        id: Date.now(),
        name,
        email,
        password,
        createdAt: new Date().toISOString(),
      };

      users.push(newUser);
      writeJsonFile(usersFile, users);

      return send(res, 201, {
        message: "User registered successfully",
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
        },
      });
    } catch {
      return send(res, 400, { error: "Invalid register data" });
    }
  }

  if (req.method === "POST" && req.url === "/api/login") {
    try {
      const payload = await readBody(req);
      const users = readJsonFile(usersFile);

      const { email, password } = payload;

      if (!email || !password) {
        return send(res, 400, {
          error: "Email and password are required",
        });
      }

      const user = users.find(
        (user) => user.email === email && user.password === password
      );

      if (!user) {
        return send(res, 401, {
          error: "Invalid email or password",
        });
      }

      return send(res, 200, {
        message: "Login successful",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      });
    } catch {
      return send(res, 400, { error: "Invalid login data" });
    }
  }

  if (req.method === "POST" && ["/api/lana", "/api/ai"].includes(req.url)) {
    let payload;

    try {
      payload = await readBody(req);
    } catch {
      return send(res, 400, { error: "Invalid JSON" });
    }

    if (!API_KEY) {
      if (req.url === "/api/ai") {
        return send(res, 200, {
          error: "Missing OPENAI_API_KEY",
          text: "",
        });
      }

      return send(res, 200, fallback(payload.lang));
    }

    try {
      if (req.url === "/api/ai") {
        const text = await askOpenAIText(payload.prompt || "");
        return send(res, 200, { text });
      }

      const result = await askOpenAI(payload);
      return send(res, 200, { ...fallback(payload.lang), ...result });
    } catch (error) {
      console.error("OpenAI request failed:", error.message);
      return send(res, 200, fallback(payload.lang));
    }
  }

  return send(res, 404, { error: "Not found" });
});

server.listen(PORT, () => {
  console.log(`VoiceCare backend running at http://127.0.0.1:${PORT}`);
  console.log(`Model: ${MODEL}`);
});