# ◉ EOG — Eyes of God

Assistente personale in stile **Jarvis**, con interfaccia HUD scura viola/ciano e il logo animato:
un **occhio che si apre e si chiude dentro un esagono**, circondato da anelli di telemetria rotanti.

Tutta l'app è **un solo file HTML** (`index.html`): niente build, niente dipendenze, si apre nel browser.

## Avvio rapido

1. Apri `index.html` nel browser (doppio clic, oppure `npx serve .` per servirlo in locale).
2. Clicca **⚙ Chiavi & Config** in alto a destra e inserisci le API key gratuite dei provider che vuoi usare.
3. Scegli il cervello dal selettore in basso e parla con EOG.

Se un provider blocca le chiamate dirette dal browser (CORS), avvia il mini-proxy incluso:

```bash
node proxy.mjs        # ascolta su http://localhost:8787
```

poi imposta `http://localhost:8787` nel campo **Proxy locale** delle impostazioni.
Il proxy è a zero dipendenze (Node ≥ 18) e inoltra solo verso i provider di EOG — non è un open proxy.

## I cervelli (router integrato nella chat)

Tutti usano endpoint compatibili OpenAI, quindi il router è unico:

| Cervello | Endpoint | Modello predefinito | Chiave |
|---|---|---|---|
| DeepSeek · chat | `api.deepseek.com` | `deepseek-chat` | sì (piano free) |
| DeepSeek · reasoner | `api.deepseek.com` | `deepseek-reasoner` | sì |
| Kimi K2 | `api.moonshot.ai` | `kimi-k2-turbo-preview` | sì |
| Perplexity Sonar | `api.perplexity.ai` | `sonar` | sì |
| Ollama · Gemma (locale) | `localhost:11434` | `gemma3` | no |

Le chiavi restano **solo nel tuo browser** (localStorage): non vengono salvate nel repository né inviate altrove.
Endpoint e nomi dei modelli sono modificabili dalle impostazioni, così l'app non invecchia quando escono nuove versioni.

Per Gemma in locale: installa [Ollama](https://ollama.com), poi

```bash
ollama pull gemma3
OLLAMA_ORIGINS=* ollama serve
```

## I moduli (colonna sinistra)

| Categoria | Strumenti |
|---|---|
| **Cervelli** | DeepSeek, Kimi, Perplexity |
| **Browser Agent** | Fellou, Deep Action |
| **Cervelli creativi** | Nano Banana Pro (con reasoning), Krea AI, Napkin AI |
| **Studio** | Genspark, Google AI Studio, NotebookLM, Kling AI, CapCut AI, Google Flow · Music |
| **Locale & Open** | Ollama, Gemma, OpenClaw |

Ogni modulo si apre con un tocco nella scheda corrispondente (piani gratuiti).

## Il logo

L'emblema è SVG puro animato in CSS, quindi pesa pochi KB e resta nitido a ogni dimensione:

- **battito di palpebre** ogni ~5,5 s (`scaleY` sul gruppo dell'occhio);
- **pupilla** che pulsa lentamente;
- **due anelli** tratteggiati che ruotano in direzioni opposte;
- **esagono** con gradiente viola → magenta → ciano, come nel mood di riferimento.

Le animazioni rispettano `prefers-reduced-motion`.

## Roadmap

- [ ] Input vocale (Web Speech API) e risposta parlata, per il vero effetto Jarvis
- [ ] Memoria persistente delle conversazioni (IndexedDB)
- [ ] Comandi rapidi `/immagine`, `/video`, `/musica` che instradano verso i moduli creativi
- [ ] PWA installabile su telefono con l'occhio come icona
