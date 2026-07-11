# ◉ EOG — Eyes of God

Assistente personale in stile **Jarvis**, con interfaccia HUD scura viola/ciano e il logo animato:
un **occhio che si apre e si chiude dentro un esagono**, circondato da anelli di telemetria rotanti.

Tutta l'app è **un solo file HTML** (`index.html`): niente build, niente dipendenze, si apre nel browser.

## Avvio rapido

1. Apri `index.html` nel browser (doppio clic, oppure `npx serve .` per servirlo in locale).
2. Clicca **⚙ Chiavi & Config** in alto a destra e inserisci le API key gratuite dei provider che vuoi usare.
3. Scegli il cervello dal selettore in basso e parla con EOG — a voce col pulsante 🎙 o scrivendo.

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

## Voce (effetto Jarvis)

- **🎙 nella console**: detta il messaggio in italiano (Web Speech API) — al termine parte da solo.
- **🔊 Voce nella barra in alto**: EOG legge le risposte ad alta voce (sintesi vocale del browser).
- **👂 Ehi EOG**: ascolto continuo. Di' *«Ehi EOG, che tempo fa a Roma?»* e la domanda parte da sola;
  se dici solo *«Ehi EOG»*, risponde *«Dimmi»* e aspetta il comando. Si disattiva con lo stesso pulsante.

La dettatura e la wake word richiedono un browser con SpeechRecognition (Chrome/Edge) e il permesso microfono.

## Instradamento automatico (⚡ Auto)

In modalità **⚡ Auto** (predefinita) EOG sceglie da solo il cervello più adatto alla domanda:

| La domanda riguarda… | Cervello scelto |
|---|---|
| notizie, meteo, prezzi, web in tempo reale | Perplexity Sonar |
| codice, bug, matematica, ragionamento passo passo | DeepSeek Reasoner |
| testi lunghi e riassunti (o messaggi > 1500 caratteri) | Kimi K2 |
| privacy, offline, «in locale» | Gemma via Ollama |
| tutto il resto | DeepSeek chat |

Se il cervello ideale non ha la chiave configurata, EOG ripiega su uno già pronto;
il nome del cervello usato compare sull'etichetta della risposta.

## Memoria

Le conversazioni si salvano da sole in **IndexedDB** (solo sul tuo dispositivo):
le ritrovi nel selettore sessioni in alto, con **＋** per iniziarne una nuova e **🗑** per eliminare quella corrente.
All'apertura EOG riprende l'ultima sessione da dove l'avevi lasciata.

## Comandi rapidi

Scrivendoli nella chat aprono il modulo giusto e copiano il prompt negli appunti:

| Comando | Modulo |
|---|---|
| `/immagine <prompt>` | Nano Banana Pro (Google AI Studio) |
| `/video <prompt>` | Kling AI |
| `/musica <prompt>` | Google Flow · Music |
| `/diagramma <prompt>` | Napkin AI |
| `/montaggio` | CapCut AI |
| `/ricerca <prompt>` | Perplexity |
| `/studio` | NotebookLM |
| `/aiuto` | elenco comandi |

## Visione 🖼

Il pulsante **🖼** nella console allega una foto o una schermata (ridimensionata a 1024px lato massimo
per non appesantire la richiesta). In modalità ⚡ Auto l'immagine va da sola a un cervello che vede:
**Kimi** (con il modello `kimi-latest`) se ha la chiave, altrimenti **Gemma via Ollama** (gemma3 è multimodale).
Se scegli a mano un cervello senza vista, EOG ti avvisa invece di fallire; nelle richieste successive
ai cervelli solo-testo l'immagine viene omessa automaticamente.

## PWA — installala sul telefono

Servita via HTTPS (per esempio con GitHub Pages), EOG è **installabile**: `manifest.webmanifest` + `sw.js`
la rendono un'app standalone con **l'occhio nell'esagono come icona** (`icons/`), avviabile offline
(le chiamate AI richiedono comunque la rete). Su Android: menu del browser → *Aggiungi a schermata Home*.

### Deploy su GitHub Pages

Il workflow `.github/workflows/pages.yml` pubblica EOG a ogni push e **attiva Pages da solo**
al primo run (`configure-pages` con `enablement: true`). L'app è su
`https://eyesofgod95.github.io/skills/` — aprila dal telefono e installala dalla voce
*Aggiungi a schermata Home*.

## Export & backup

In **⚙ Chiavi & Config → Le tue conversazioni**:

- **Sessione → .md** scarica la conversazione corrente in Markdown leggibile;
- **Backup → .json** scarica tutte le sessioni;
- **Importa backup** le ripristina su un altro browser o dispositivo.

## Roadmap

- [x] Input vocale (Web Speech API) e risposta parlata, per il vero effetto Jarvis
- [x] Memoria persistente delle conversazioni (IndexedDB)
- [x] Comandi rapidi `/immagine`, `/video`, `/musica` che instradano verso i moduli creativi
- [x] PWA installabile su telefono con l'occhio come icona
- [x] Wake word ("Ehi EOG") con ascolto continuo
- [x] Instradamento automatico: EOG sceglie da solo il cervello più adatto alla domanda
- [x] Visione: analisi di foto e schermate dai cervelli multimodali
- [x] Deploy pubblico su GitHub Pages per installare la PWA dal telefono (attivazione automatica dal workflow)
- [x] Export delle conversazioni (Markdown e JSON) con import del backup
