# Flint Web

Flint is an open-source, AI-native API client. It brings the power of Postman, Swagger, and an AI assistant directly into your browser, backed by a high-performance Bun proxy.

## Tech Stack
- **Frontend:** React 18, TypeScript, Tailwind CSS, Zustand, Axios, Dexie.js, Monaco Editor, Vite, React Router v6.
- **Backend:** Bun, Express, Axios, Supabase JS, ws, dotenv.
- **Quality:** ESLint, Prettier, Vitest, Playwright, Husky.

## Running Locally

1. Install dependencies:
   ```bash
   bun install
   ```

2. Set up environment variables in `backend/.env` (see below).

3. Run both frontend and backend concurrently:
   ```bash
   bun run dev
   ```
   Or run them separately:
   ```bash
   bun run dev:frontend
   bun run dev:backend
   ```

## Environment Variables
Create a `.env` file in the `backend/` directory:
```env
PORT=3001
FLINT_AI_URL=http://localhost:8000
SUPABASE_URL=https://yourproject.supabase.co
SUPABASE_SERVICE_KEY=your-service-key
JWT_SECRET=your-jwt-secret
ALLOWED_ORIGINS=http://localhost:5173
PLUGIN_PORT=7700
```

## How It Works

### Proxy (Port 3001)
The core of the backend is the proxy route (`/routes/proxy.ts`). It forwards HTTP requests exactly as they are constructed in the frontend using Axios. It captures metrics (duration, size) and gracefully handles all network errors, returning structured responses instead of crashing.

### AI Integration
The AI Drawer in the frontend streams completions from the FastAPI service (expected on port 8000) via the Bun backend (`/routes/ai.ts`). The Bun backend attaches the user's auth token and uses Server-Sent Events (SSE) to stream the response token-by-token back to the frontend.

### Plugin Bridge (Port 7700)
The backend runs a separate WebSocket server (`/routes/plugin.ts`) on port 7700. This receives incoming events from editor plugins or external tools. It validates these events and broadcasts them to all connected frontend clients via a separate standard WebSocket connection.

## Deployment to Railway
1. Push the repository to GitHub.
2. In Railway, create a new project from the repository.
3. Configure the start command to build the frontend and start the bun backend.
   - Build Command: `bun run build`
   - Start Command: `cd backend && bun run start`
4. Add the required environment variables in the Railway dashboard.
