# 💼 Supervivencia Laboral / Sopravvivenza Lavorativa

Una web de humor para gente que está cansada de trabajar. Herramientas absurdas, sarcasmo y supervivencia laboral.

Un sito umoristico per gente che è stancissima di lavorare. Strumenti assurdi, sarcasmo e sopravvivenza lavorativa.

## 🌐 Web

| Español | Italiano |
|---------|----------|
| [supervivencia-laboral.netlify.app/es](https://supervivencia-laboral.netlify.app/es) | [supervivencia-laboral.netlify.app/it](https://supervivencia-laboral.netlify.app/it) |

## 🛠️ Herramientas / Strumenti

| Herramienta (ES) | Strumento (IT) | Descripción |
|------------------|----------------|-------------|
| ¿Cuánto falta para cobrar? | Quanto manca per lo stipendio? | Calcula días, horas y minutos hasta tu próximo sueldo |
| ¿Cuánto falta para el viernes? | Quanto manca al venerdì? | Contador definitivo hasta el fin de semana |
| Vida vs Salario | Vita vs Stipendio | Calcula cuánto vale realmente tu vida laboral |
| Calculadora de Jubilación | Calcolatrice Pensione | Cuánto tiempo te queda de trabajo |
| Libro de Firmas | Libro delle Firme | Firma por tus derechos laborales |
| Pega al Jefe | Colpisci il Boss | Minijuego para liberar ira acumulada |

## 📁 Estructura del proyecto

```
supervivencia-laboral/
├── src/
│   ├── components/          # Componentes React interactivos
│   │   ├── Navigation.astro
│   │   ├── SalaryCountdown.tsx / IT
│   │   ├── FridayCountdown.tsx / IT
│   │   ├── LifeSalaryCalc.tsx / IT
│   │   ├── RetirementCalc.tsx / IT
│   │   ├── SignatureBook.tsx / IT
│   │   └── BossHitsGame.tsx / IT
│   ├── layouts/
│   │   └── Base.astro       # Layout principal con footer
│   ├── pages/
│   │   ├── es/              # Páginas en español
│   │   ├── it/              # Páginas en italiano
│   │   ├── api/firmas.ts    # API para Libro de Firmas
│   │   └── shop/            # Tienda (placeholder)
│   ├── data/
│   │   ├── es/phrases.ts    # Frases en español
│   │   └── it/phrases.ts    # Frases en italiano
│   ├── utils/
│   │   ├── localStorage.ts  # Utilidades de persistencia
│   │   └── dates.ts         # Cálculos de fechas
│   └── styles/
│       └── global.css       # Estilos globales retro
├── public/
│   ├── favicon.svg          # Icono de maletín
│   └── robots.txt
├── astro.config.mjs
├── netlify.toml
└── package.json
```

## ⚡ Características

- **i18n completo**: ES/IT con routing por prefijo
- **Sin login**: Todo anónimo, datos en localStorage
- **Retro 90s**: Estética intencional de vieja web
- **Frases adaptadas**: No traducciones literales, humor cultural
- **Libro de Firmas**: Única funcionalidad con base de datos (Netlify Blobs)
- **Responsive**: Funciona en móvil y desktop

## 🚀 Desarrollo

```bash
# Instalar dependencias
pnpm install

# Desarrollo local
pnpm dev

# Build
pnpm build

# Preview
pnpm preview
```

## 📝 Licencia

Hecho con desmotivación y café por [RaulMGuerrero](https://raulmguerrero.com)
