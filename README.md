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

- **Frontend**: React 19 + Vite 7, `vite-plugin-pwa` for offline/installable support, Hebrew RTL UI.
- **Backend**: Python + Flask API serving first-aid protocols.


## Project Structure

```
first-aid-app/
├── backend/
│   ├── app.py           # Flask app and API endpoints
│   ├── data.py          # First-aid protocols data (Python dict)
│   └── requirements.txt # Python dependencies
├── src/
│   ├── App.jsx          # Main React app and UI
│   ├── App.css          # Styles
│   ├── data/
│   │   └── symptoms.js  # Frontend copy of protocols (fallback / legacy)
│   └── main.jsx         # React entry point
├── index.html
├── vite.config.js
├── package.json
└── README.md
```

## Development

- **Backend (Flask)**:
  - Create & activate a virtualenv (optional but recommended).
  - Install deps: `pip install -r backend/requirements.txt`
  - Run API: `flask --app backend.app run --port 8000`
- **Frontend (Vite/React)**:
  - Install deps: `npm install`
  - Run dev server: `npm run dev`

The React app calls the Flask API at `http://localhost:8000/api/protocols`. You can override the base URL with `VITE_API_BASE_URL` in your environment if needed.

## Disclaimer

This app is for **reference only** and does not replace professional medical care or certified first-aid training. In an emergency, call **101** (MDA) or **100** (Police) and follow dispatcher instructions.


