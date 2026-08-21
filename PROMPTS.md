# Prompt operativi — EOG / The Gad Eyes

Due prompt pronti da incollare. Il **Prompt 1** si usa una volta sola in una sessione
nuova: installa e verifica le skill, analizza il documento e prepara la base di
conoscenza. Il **Prompt 2** si usa come apertura di ogni sessione di lavoro successiva.

---

## Prompt 1 — Installazione skill + analisi del corpus

```
CONTESTO (leggilo, poi agisci)

Sono Enrico (EyesOfGod95). Due repository GitHub:
- EyesOfGod95/skills → sviluppo. Branch di lavoro: claude/eog-personal-ai-9msn8p
- EyesOfGod95/eyesofgod95.github.io → sito pubblico su GitHub Pages (branch main),
  online su https://eyesofgod95.github.io

PROGETTO EOG (Eyes of God): assistente personale stile Jarvis, tutto in un unico
index.html senza build né dipendenze, interfaccia HUD scura viola/magenta/ciano, in
italiano. Già implementato:
- logo SVG animato: occhio realistico nel nucleo di un atomo (orbite + elettroni) con
  pioggia di dati stile Matrix su canvas
- router multi-cervello su endpoint OpenAI-compatibili (DeepSeek chat/reasoner, Kimi K2,
  Perplexity Sonar, Gemma via Ollama) con modalità Auto che sceglie il modello in base
  alla domanda, streaming SSE, chiavi API salvate solo in localStorage
- voce: dettatura, risposte parlate, wake word "Ehi EOG"
- visione: allegato immagini instradato ai modelli multimodali
- memoria conversazioni in IndexedDB, export Markdown/JSON, comandi rapidi
  (/immagine /video /musica /diagramma ...), PWA installabile
- proxy.mjs: mini-proxy CORS zero-dipendenze per i provider che bloccano il browser

CORPUS TEORICO: nel repo, docs/the-gad-eyes.md contiene il documento "The Gad Eyes &
L'Architettura Olografica" (universo come fluido/vuoto superfluido, principio
olografico, Algoritmo Olografico di Frontiera, J-Space + MiroFish, Hyper-Learning).

IL TUO COMPITO

1) SKILL. Cerca su GitHub e sul web quali sono oggi le skill e i plugin per Claude Code
   più usati e meglio mantenuti: parti dal marketplace ufficiale anthropics/skills e
   dalle raccolte tipo "awesome claude code". Verifica sul campo — stelle, data
   dell'ultimo commit, presenza di un SKILL.md valido con frontmatter name/description.
   Non elencare nomi a memoria: controlla le fonti e riportami le date.

2) FILTRA. Tieni solo ciò che serve davvero a QUESTO progetto: frontend web e PWA,
   design e UI, test nel browser, documentazione, deploy su GitHub Pages, revisione del
   codice, creazione di nuove skill, ricerca e analisi documentale. Scarta il resto
   dicendomi perché.

3) INSTALLA a livello di progetto in EyesOfGod95/skills, in
   .claude/skills/<nome>/SKILL.md, così restano versionate nel repo; se il metodo
   corretto è il marketplace dei plugin, scrivimi i comandi esatti che devo lanciare io.
   Regole non negoziabili: leggi ogni SKILL.md prima di installarlo, nessuna chiave API
   o segreto nei file, nessuna skill che esegua codice remoto non ispezionato.

4) ANALIZZA docs/the-gad-eyes.md e producine una base di conoscenza in
   docs/gad-eyes-analisi.md che separi con chiarezza:
   (a) FISICA CONSOLIDATA — verifica tu stesso i numeri (raggio di Schwarzschild solare,
       area dell'orizzonte, limite olografico in qubit) e indica i valori corretti;
   (b) IPOTESI DI FRONTIERA — vuoto superfluido, gravità emergente, illusione
       dimensionale: attive nella ricerca ma non dimostrate;
   (c) COSTRUTTI ORIGINALI del documento — AOF, Vero Vuoto, Architettura Ombra,
       The Handshake, J-Space, MiroFish, Hyper-Learning: idee del progetto, non
       letteratura consolidata.
   Non presentare mai (b) o (c) come verificati. Aggiungi un glossario dei termini.

5) CREA due skill di progetto con skill-creator:
   - "the-gad-eyes": glossario, principi e criteri d'uso del framework olografico, con
     l'obbligo di distinguere fisica consolidata / ipotesi / costrutti originali;
   - "eog-project": convenzioni del progetto EOG (single-file, niente dipendenze,
     italiano, palette HUD, branch e deploy, chiavi solo in localStorage) così nelle
     sessioni future non devo rispiegarle.

6) VERIFICA che le skill installate siano riconosciute, elencale e provane almeno una
   per confermare che si attiva davvero.

7) DOCUMENTA in SKILLS.md: tabella delle skill (nome, origine, a cosa serve, frasi che
   la attivano, quando NON usarla), comandi per reinstallare tutto da zero su un altro
   computer, elenco delle skill scartate con motivazione.

8) COMMITTA e pusha su claude/eog-personal-ai-9msn8p. Non toccare altri branch.

RESTITUISCIMI IN CHAT: cosa hai installato e cosa hai scartato; il contenuto di
SKILLS.md; la sintesi dell'analisi; e un prompt di lavoro pronto da incollare che
riassuma contesto e skill disponibili.

Parlami in italiano, verifica ciò che affermi, e dimmi apertamente se qualcosa non è
stato possibile invece di aggirarlo.
```

---

## Prompt 2 — Utilizzo delle informazioni analizzate

```
CONTESTO

Progetto EOG (Eyes of God), il mio assistente personale stile Jarvis: single-file
index.html + PWA, sviluppo in EyesOfGod95/skills sul branch
claude/eog-personal-ai-9msn8p, pubblicato su https://eyesofgod95.github.io dal repo
EyesOfGod95/eyesofgod95.github.io (branch main). Nel repo di sviluppo trovi:
- SKILLS.md → inventario delle skill Claude Code installate e verificate
- docs/the-gad-eyes.md → documento "The Gad Eyes & L'Architettura Olografica" (verbatim)
- docs/gad-eyes-analisi.md → analisi che separa fisica consolidata, ipotesi di frontiera
  e costrutti originali del documento

COSA VOGLIO

1) Leggi SKILLS.md, docs/gad-eyes-analisi.md e index.html. Dimmi in concreto, una riga
   per voce, quali skill installate servono a EOG e quali principi del framework
   olografico sono traducibili in funzionalità reali OGGI, nel browser.

2) Distingui sempre due piani, senza confonderli:
   - METAFORA IMPLEMENTABILE: ciò che si può costruire davvero adesso con HTML/JS
     (per esempio: memoria "di frontiera" che comprime le conversazioni lunghe in
     riassunti-superficie invece di trascinare tutto il volume del contesto; una vista
     J-Space che mostra i cervelli attivi come sciame di agenti in orbita; un ciclo di
     auto-test deterministico che verifica le risposte su regole certe prima di passare
     ai casi complessi; un livello "Architettura Ombra" che spiega in chiaro cosa ha
     fatto il router senza esporre le chiavi);
   - FISICA SPECULATIVA: ciò che resta ispirazione e NON va spacciato per funzionante
     (calcolo olografico reale, sicurezza "superiore alla crittografia", zero
     dissipazione termica). Se ti chiedo di implementare qualcosa che ricade qui,
     dimmelo chiaramente e proponimi l'equivalente realizzabile.

3) Proponimi un piano di massimo 5 punti ordinato per rapporto valore/sforzo. Aree che
   mi interessano: configurazione delle chiavi API semplicissima dal telefono (incluso
   un cervello OpenRouter preconfigurato, che funziona dal browser senza proxy);
   qualità dell'interfaccia e del logo animato; affidabilità (gestione errori, test reali
   nel browser prima di pubblicare); documentazione d'uso in italiano.

4) Aspetta il mio ok sul piano, poi implementa un punto alla volta usando le skill
   pertinenti e verificando ogni modifica nel browser con screenshot reali, non solo a
   parole.

5) Per ogni punto approvato: commit descrittivo sul branch di sviluppo; quando è roba da
   mandare online, copia i file aggiornati anche nel repo del sito, pusha su main e
   confermami che il deploy di GitHub Pages è andato a buon fine.

REGOLE: italiano; nessuna chiave API nei file; nessun push su branch diversi da quelli
indicati; se una cosa non riesce dimmelo apertamente invece di aggirarla.
```
