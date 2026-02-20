# AlphaGalleon

Institutional-Grade Personal Investment Banker.

## Architecture

- **Backend (The Brain):** Python / FastAPI + Google Gemini 2.5 Flash.
- **Frontend (The Interface):** React Native / Expo.
- **Data (The Feed):** NSE India + Screener.in connectors.

## Core Modules

1.  **Investment Memo:** Instant buy/sell/hold analysis based on live price & fundamentals.
2.  **Portfolio Architect:** Optimized asset allocation (WIP).
3.  **The Doctor:** Portfolio diagnostics (WIP).

## Setup

### Backend
1.  `cd backend`
2.  Create `.env` with `GOOGLE_API_KEY`.
3.  `pip install -r requirements.txt`
4.  Run: `uvicorn app.main:app --reload`

### Frontend
1.  `cd frontend`
2.  `npm install`
3.  Run: `npx expo start`

## API Endpoints
-   `POST /api/v1/brain/generate`: Direct Gemini prompt.
-   `GET /api/v1/market/price/{symbol}`: Live NSE price.
-   `GET /api/v1/market/fundamentals/{symbol}`: Screener.in ratios.
-   `POST /api/v1/brain/memo`: Full Investment Memo generation.
