// EOG · mini-proxy CORS — zero dipendenze, solo Node ≥ 18
// Uso:   node proxy.mjs          (ascolta su http://localhost:8787)
// Poi in EOG → «Chiavi & Config» → Proxy locale: http://localhost:8787
//
// Il browser chiama  POST /forward?target=<url-del-provider>
// e il proxy inoltra la richiesta (con l'header Authorization) al provider,
// restituendo la risposta in streaming con gli header CORS corretti.

import http from "node:http";

const PORT = process.env.PORT || 8787;

// Solo i provider di EOG: niente open proxy.
const ALLOWED_HOSTS = new Set([
  "api.deepseek.com",
  "api.moonshot.ai",
  "api.perplexity.ai",
  "localhost",
  "127.0.0.1",
]);

const server = http.createServer(async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");

  if (req.method === "OPTIONS") { res.writeHead(204); return res.end(); }

  const u = new URL(req.url, `http://localhost:${PORT}`);
  if (u.pathname !== "/forward" || req.method !== "POST") {
    res.writeHead(404, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ error: "usa POST /forward?target=<url>" }));
  }

  let target;
  try { target = new URL(u.searchParams.get("target")); }
  catch { res.writeHead(400); return res.end('{"error":"target non valido"}'); }

  if (!ALLOWED_HOSTS.has(target.hostname)) {
    res.writeHead(403);
    return res.end(JSON.stringify({ error: `host non consentito: ${target.hostname}` }));
  }

  const chunks = [];
  for await (const c of req) chunks.push(c);

  try {
    const upstream = await fetch(target, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(req.headers.authorization ? { Authorization: req.headers.authorization } : {}),
      },
      body: Buffer.concat(chunks),
    });

    res.writeHead(upstream.status, {
      "Content-Type": upstream.headers.get("content-type") || "application/json",
    });
    for await (const chunk of upstream.body) res.write(chunk);
    res.end();
  } catch (err) {
    res.writeHead(502, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: `inoltro fallito: ${err.message}` }));
  }
});

server.listen(PORT, () =>
  console.log(`◉ EOG proxy attivo → http://localhost:${PORT}  (Ctrl+C per fermare)`)
);
