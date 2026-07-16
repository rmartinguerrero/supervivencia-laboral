<p align="center">
  <img src="public/opengraph.png" alt="Sopravvivenza Lavorativa" width="100%">
</p>

<h1 align="center">💼 Sopravvivenza Lavorativa</h1>

<p align="center">
  <em>Un sito di umorismo per chi ha proprio rotto di lavorare.</em><br>
  Strumenti assurdi, sarcasmo e tanta, tanta rassegnazione.
</p>

<p align="center">
  🇮🇹 Italiano &nbsp;|&nbsp; <a href="README.md">🇪🇸 Español</a>
</p>

---

## 🌐 Sito web

| 🇮🇹 Italiano | 🇪🇸 Español |
|:---:|:---:|
| [job-survival.netlify.app/it](https://job-survival.netlify.app/it/) | [job-survival.netlify.app/es](https://job-survival.netlify.app/es/) |

## 🛠️ Strumenti

| Strumento | Descrizione |
|:---|:---|
| **Quanto manca per lo stipendio?** | Calcola giorni, ore e minuti che mancano al prossimo bonifico |
| **Quanto manca al venerdì?** | Il conto alla rovescia definitivo per il weekend |
| **Vita vs Stipendio** | Scopri quanto vale davvero la tua vita lavorativa |
| **Calcolatrice Pensione** | Quanto tempo manca prima della libertà... scusa, del pensionamento |
| **Libro delle Firme** | Firma per i tuoi diritti lavorativi |
| **Colpisci il Boss** | Un mini-giochino per sfogare tutta la rabbia repressa |

## 📁 Struttura del progetto

```
supervivencia-laboral/
├── src/
│   ├── components/          # Componenti React interattivi
│   ├── layouts/
│   │   └── Base.astro       # Layout principale con footer
│   ├── pages/
│   │   ├── es/              # Pagine in spagnolo
│   │   ├── it/              # Pagine in italiano
│   │   ├── api/firmas.ts    # API del Libro delle Firme
│   │   └── shop/            # Negozio (prossimamente)
│   ├── data/
│   │   ├── es/phrases.ts    # Frasi in spagnolo
│   │   └── it/phrases.ts    # Frasi in italiano
│   ├── utils/
│   │   ├── localStorage.ts  # Persistenza in localStorage
│   │   ├── dates.ts         # Calcoli sulle date
│   │   └── slugs.ts         # Traduzione degli URL
│   └── styles/
│       └── global.css       # Stili globali retro anni '90
├── public/
│   ├── favicon.svg
│   ├── opengraph.png
│   └── robots.txt
├── astro.config.mjs
├── netlify.toml
└── package.json
```

## ⚡ Caratteristiche

- 🌍 **i18n completo** — IT/ES con routing a prefisso
- 🔒 **Nessun login** — Tutto anonimo, i dati restano nel localStorage
- 💾 **Libro delle Firme** — L'unica funzionalità con database (Netlify Blobs)
- 🕹️ **Retro anni '90** — Estetica volutamente da vecchio sito web
- 😂 **Frasi adattate** — Umorismo locale, non traduzioni letterali
- 📱 **Responsive** — Funziona su mobile e desktop
- 🎉 **Confetti** — Perché il pensionamento è una festa

## 🚀 Sviluppo

```bash
# Installa le dipendenze
pnpm install

# Sviluppo locale
pnpm dev

# Build
pnpm build

# Anteprima
pnpm preview
```

## 🌐 API del Libro delle Firme

```bash
# Ottieni le firme (IT)
curl https://job-survival.netlify.app/api/firmas?lang=it&page=1&limit=20

# Ottieni le firme (ES)
curl https://job-survival.netlify.app/api/firmas?lang=es&page=1&limit=20

# Crea una firma
curl -X POST https://job-survival.netlify.app/api/firmas \
  -H "Content-Type: application/json" \
  -d '{"alias":"Marco","message":"Questa riunione poteva essere un\'email","category":"meno-riunioni","lang":"it"}'
```

## 📝 Licenza

Fatto con demotivazione e caffè da [RaulMGuerrero](https://raulmguerrero.com)
