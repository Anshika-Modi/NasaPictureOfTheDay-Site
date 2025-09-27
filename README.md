# NASA APOD — React + Tailwind (no proxy)

This is a minimal React + Vite + Tailwind project that fetches the NASA Astronomy Picture of the Day (APOD) and displays it in a card.

Key points:
- Uses Vite + React for fast dev experience.
- Uses Tailwind CSS for styling and responsiveness.
- Attempts to export the visible card to PDF using `html2canvas` + `jspdf` **without** a proxy.
  - Note: If the image host blocks cross-origin canvas reads (CORS), the PDF export may fail. In that case a proxy/server is required to fetch the image with permissive CORS headers.

## Setup

1. Install dependencies
```bash
npm install
```

2. Create a `.env` file (copy from `.env.example`) and set your NASA API key:
```
VITE_NASA_API_KEY=YOUR_KEY_HERE
```
You can use `DEMO_KEY` for low-rate testing.

3. Run the dev server
```bash
npm run dev
```

Open the app at the address printed by Vite (usually `http://localhost:5173`).

