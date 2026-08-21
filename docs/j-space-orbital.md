# J-Space Orbital — il framework di frontiera applicato ai data center in orbita

Analisi nata guardando i programmi reali di calcolo in orbita (Project Suncatcher di
Google con Planet Labs, gli acceleratori in orbita di Starcloud) alla luce del documento
[The Gad Eyes & L'Architettura Olografica](the-gad-eyes.md).

Il simulatore che implementa questa analisi è dentro EOG: pulsante **🛰 J-Space** o
comando `/jspace`.

## Perché il principio olografico calza su quei server

Un data center a terra è limitato dal **volume**: più rack, più megawatt, più metri cubi.
Un data center in orbita è limitato dalla **superficie**, e da nient'altro:

| Cosa entra o esce | Da quale area dipende |
|---|---|
| Energia | pannelli solari |
| Calore | radiatori (nel vuoto si irraggia soltanto, non c'è convezione) |
| Dati | apertura dei terminali ottici |

Il volume di hardware non conta nulla se la frontiera non regge. È il principio
olografico come criterio di progetto: la capacità del sistema è scritta sul suo bordo.
`N = A/4ℓ_P²` è la versione cosmica; la versione satellitare è "quanto calcolo per metro
quadro di frontiera".

## Il modello del simulatore

Costanti fisiche reali:

- costante solare `S = 1361 W/m²`, celle triplo-giunzione `η = 0,30`
- radiatori: `q = ε σ T⁴` con `ε = 0,85`, `T = 320 K` → **≈ 505 W/m²**
- `700 W` per acceleratore, `80%` del solare disponibile al calcolo

Da cui:

```
P_calcolo   = N_satelliti × acceleratori × 700 W
A_pannelli  = (P_calcolo / 0,8) / (1361 × 0,30)
A_radiatori = P_calcolo / 505
D_volume    = N × acceleratori × dato_grezzo
R           = 10^(6 · livello_di_frontiera)      ← rapporto olografico
D_downlink  = D_volume / R
B_canale    = N × downlink_per_satellite × disponibilità
```

Il verdetto confronta `D_downlink` con `B_canale`. Le cifre sono ordini di grandezza per
ragionare, non un progetto di volo.

Configurazione di riferimento (81 satelliti, 8 acceleratori ciascuno, 20 Gbps di grezzo
per acceleratore, downlink ottico 10 Gbps al 70% di disponibilità):

- 453,6 kW di calcolo → **1.389 m²** di pannelli e **898 m²** di radiatori (11 m² per satellite)
- 12,96 Tbps elaborati in orbita, che a frontiera 50% (`R = 10³`) scendono a **13 Gbps**
  contro 567 Gbps di capacità: sostenibile
- a frontiera 0 servirebbero 12,96 Tbps: **canale saturo**, ed è la dimostrazione visiva
  del principio

## Le sei implementazioni

1. **Rapporto olografico come metrica** (dall'AOF) — `R = bit elaborati in orbita / bit
   scaricati a terra`. Regola dura: non si scarica mai il volume, si scarica la frontiera.
   Niente immagini grezze, solo latenti, embedding, delta, decisioni.
2. **Equazione di frontiera del cluster** — energia, calore e banda in una sola equazione
   di progetto legata a tre aree. È l'integrale di superficie tradotto in budget.
3. **Architettura Ombra → gemello digitale a terra** — un modello-ombra che rispecchia lo
   stato della costellazione: si interpreta, si fa audit e debug senza scaricare il nucleo.
   Lassù non puoi mandare un tecnico.
4. **The Handshake → autorità di comando** — il calcolo prosegue solo finché arriva un
   heartbeat firmato; se tace, la costellazione sospende da sola. Lo stato predefinito è
   *spento*, non acceso. Più trasferimento graduale del carico e deorbita controllata.
   È la risposta alla domanda "e se un giorno vuoi spegnerla?".
5. **"Vero Vuoto" → chiavi a terra** — nessuna cifratura è "superiore alla crittografia",
   ma l'effetto cercato si ottiene: chiavi custodite a terra, nodi orbitali che lavorano in
   enclave su dati cifrati. Un satellite perso o intercettato non vale nulla.
6. **MiroFish + Hyper-Learning → sciame e autotest** — 81 satelliti con link intermittenti
   *sono* uno sciame: contact graph routing e reti tolleranti ai ritardi. La "fase
   deterministica" su regole certe al 100% è esattamente il modo corretto di far girare
   acceleratori sotto radiazione: test a risposta nota in continuo, checksum sulle
   moltiplicazioni di matrici, votazione incrociata per intercettare i bit flip.

## Due correzioni necessarie al documento originale

- **"Zero dissipazione termica"**: in orbita è il contrario. Il calore è il vincolo numero
  uno perché si smaltisce solo per irraggiamento. È proprio questo che rende preziosa la
  disciplina di frontiera: meno bit muovi, meno watt bruci, meno radiatore ti serve.
- **Calcolo olografico fisico**: non esiste come hardware, né in orbita né a terra. Il
  valore del J-Space qui è come architettura dell'informazione e interfaccia di controllo —
  ed è un valore reale, non un ripiego.

## Fonti

- [DataCenterDynamics — cluster di 81 satelliti, lancio con Planet Labs](https://www.datacenterdynamics.com/en/news/project-suncatcher-google-to-launch-tpus-into-orbit-with-planet-labs-envisions-1km-arrays-of-81-satellite-compute-clusters/)
- [Datamation — orbital data center entro il 2027](https://www.datamation.com/artificial-intelligence/google-ai-space-plan/)
- [Space Economy Institute — stato del progetto a luglio 2026](https://spaceeconomyinstitute.com/2026/07/03/google-project-suncatcher-ai-data-centers-space/)
- [Forbes — annuncio di Project Suncatcher](https://www.forbes.com/sites/anishasircar/2025/11/11/google-unveils-project-suncatcher-to-run-ai-on-solar-satellites-in-orbit/)
