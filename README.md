# First Aid App (עזרה ראשונה)

A Hebrew-language first-aid reference web app. Browse step-by-step protocols for common emergencies, hear instructions read aloud, and quickly call emergency services.

## Features

- **First-aid protocols** — Step-by-step instructions for:
  - Defibrillator use (דפיברילטור)
  - CPR — adult (8+) and child/infant (ביצוע החייאה)
  - Burns (כוויות)
  - Snake bite (הכשת נחש)
  - Nosebleed (דימום מהאף)
  - Choking (חנק מגוף זר)
  - Fainting (עילפון)
- **Search** — Filter protocols by keyword (Hebrew).
- **Voice instructions** — Text-to-speech (Hebrew) for hands-free guidance.
- **Location** — “Where am I?” shows coordinates for sharing with emergency services.
- **Emergency shortcuts** — One-tap call to MDA (101) and Police (100).
- **PWA** — Installable and works offline via Vite PWA.

## Tech Stack

- **React 19** + **Vite 7**
- **vite-plugin-pwa** for installability and offline support
- Hebrew UI (RTL-friendly)


## Project Structure

```
first-aid-app/
├── src/
│   ├── App.jsx      # Main app, protocols data, and UI
│   ├── App.css      # Styles
│   └── main.jsx     # Entry point
├── index.html
├── vite.config.js
└── package.json
```

## Disclaimer

This app is for **reference only** and does not replace professional medical care or certified first-aid training. In an emergency, call **101** (MDA) or **100** (Police) and follow dispatcher instructions.


