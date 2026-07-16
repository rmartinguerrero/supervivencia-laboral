<p align="center">
  <img src="public/opengraph.png" alt="Supervivencia Laboral" width="100%">
</p>

<h1 align="center">💼 Supervivencia Laboral</h1>

<p align="center">
  <em>Web de humor para gente que está cansada de trabajar.</em><br>
  Herramientas absurdas, sarcasmo y supervivencia laboral.
</p>

<p align="center">
  <a href="readme-IT.md">🇮🇹 Italiano</a> &nbsp;|&nbsp; 🇪🇸 Español
</p>

---

## 🌐 Web

| 🇪🇸 Español | 🇮🇹 Italiano |
|:---:|:---:|
| [job-survival.netlify.app/es](https://job-survival.netlify.app/es/) | [job-survival.netlify.app/it](https://job-survival.netlify.app/it/) |

## 🛠️ Herramientas

| Herramienta | Descripción |
|:---|:---|
| **¿Cuánto falta para cobrar?** | Calcula días, horas y minutos hasta tu próximo sueldo |
| **¿Cuánto falta para el viernes?** | El contador definitivo hasta el fin de semana |
| **Vida vs Salario** | Calcula cuánto vale realmente tu vida laboral |
| **Calculadora de Jubilación** | Cuánto tiempo te queda de esclavitud... digo, de trabajo |
| **Libro de Firmas** | Firma por tus derechos laborales |
| **Pega al Jefe** | Minijuego para liberar toda la ira acumulada |

## 📁 Estructura del proyecto

```
supervivencia-laboral/
├── src/
│   ├── components/          # Componentes React interactivos
│   ├── layouts/
│   │   └── Base.astro       # Layout principal con footer
│   ├── pages/
│   │   ├── es/              # Páginas en español
│   │   ├── it/              # Páginas en italiano
│   │   ├── api/firmas.ts    # API del Libro de Firmas
│   │   └── shop/            # Tienda (próximamente)
│   ├── data/
│   │   ├── es/phrases.ts    # Frases en español
│   │   └── it/phrases.ts    # Frases en italiano
│   ├── utils/
│   │   ├── localStorage.ts  # Persistencia en localStorage
│   │   ├── dates.ts         # Cálculos de fechas
│   │   └── slugs.ts         # Traducción de URLs
│   └── styles/
│       └── global.css       # Estilos globales retro 90s
├── public/
│   ├── favicon.svg
│   ├── opengraph.png
│   └── robots.txt
├── astro.config.mjs
├── netlify.toml
└── package.json
```

## ⚡ Características

- 🌍 **i18n completo** — ES/IT con routing por prefijo
- 🔒 **Sin login** — Todo anónimo, datos en localStorage
- 💾 **Libro de Firmas** — La única funcionalidad con base de datos (Netlify Blobs)
- 🕹️ **Retro 90s** — Estética intencional de vieja web
- 😂 **Frases adaptadas** — Humor cultural, no traducciones literales
- 📱 **Responsive** — Funciona en móvil y desktop
- 🎉 **Confetti** — Porque la jubilación es motivo de celebración

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

## 🌐 API del Libro de Firmas

```bash
# Obtener firmas (ES)
curl https://job-survival.netlify.app/api/firmas?lang=es&page=1&limit=20

# Obtener firmas (IT)
curl https://job-survival.netlify.app/api/firmas?lang=it&page=1&limit=20

# Crear una firma
curl -X POST https://job-survival.netlify.app/api/firmas \
  -H "Content-Type: application/json" \
  -d '{"alias":"Pepe","message":"Esta reunión podía ser un email","category":"menos-reuniones","lang":"es"}'
```

## 📝 Licencia

Hecho con desmotivación y café por [RaulMGuerrero](https://raulmguerrero.com)
