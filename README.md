# 💪 FitLog

A dark, no-nonsense workout library and daily plan tracker built from the requirements and Figma reference.

## Technologies
- Next.js App Router
- React + TypeScript
- Tailwind CSS v4
- Lucide React icons
- FitLog REST API
- localStorage persistence

## Features
1. Responsive Figma-inspired dark UI for mobile, tablet and desktop.
2. Workout library loaded from the FitLog API with loading state.
3. Sort workouts by duration, calories or rating.
4. Dynamic workout detail pages with specs and instructions.
5. Today's Plan and Saved tabs with live counters.
6. Five-workout daily plan cap with toast feedback.
7. Mark as Done and Remove actions.
8. localStorage persistence across reloads.
9. Custom 404 page and App Router navigation.

## API
- `https://api.abcz.workers.dev/api/fitlog`
- `https://api.abcz.workers.dev/api/fitlog/:id`

## Run locally
```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Build
npm run build
npm start

## Deployment
Deploy to Vercel, Netlify, Cloudflare Pages, or another Next.js-compatible host. The app uses normal App Router routes, so platform rewrites should preserve `/workout/:id` and `/my-plan`.
