# Flight Seat Selection & Passenger Management

React 18 + Vite app: choose 1–6 passengers, assign seats on a **3–2** or **2–3–2** aircraft, see live pricing, and pick meals (bonus).

**Live demo:** _add your Vercel / GitHub Pages link here_

## Run locally
```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in /dist
```

## Features
- Passenger count (1–6), editable names, switch the active passenger by clicking their card; each passenger keeps their seat when you switch.
- Two layouts with row numbers, column letters and aisles; switching layouts clears seats (ids/prices differ per layout) and shows a notice.
- Seat states: available, occupied (not selectable), selected (active passenger), taken (another passenger). Categories: Standard ₹0, Preferred window ₹150, Premium ₹250, Extra legroom ₹350 — colour-coded, price shown on hover/focus and in the legend.
- Click a seat to assign, click your own seat again (or "Remove") to unassign; picking another seat moves the passenger. Invalid actions show a toast.
- Price breakdown per passenger + seat total + meal total + grand total, updated instantly.
- **Bonus – meals:** one meal per passenger (free + paid), included in totals.
- Loading, error (with retry) and empty states; responsive down to mobile; keyboard accessible with ARIA labels.

## State management & seat assignment logic
All booking state lives in one `useReducer` (`src/hooks/useBooking.js`):

```
{ count, active, layout, names{pid}, seats{pid → seat}, meals{pid → meal}, notice }
```
- `seats` is keyed by passenger id, so **one passenger can never hold two seats** (assigning replaces the old one).
- On `SELECT_SEAT` the reducer checks, in order: seat occupied → error; seat already owned by another passenger → error; owned by the active passenger → toggle off; otherwise assign. This guarantees **a seat is never double-booked**.
- Switching passengers only changes `active`, so earlier assignments are retained.
- Reducing `count` drops the removed passengers' seats and meals.
- Totals are **derived** in `Summary.jsx` from `seats` + `meals` (no duplicated state), so they can't go out of sync.
- Seat data comes from `src/data/seats.js` (`buildSeats`, wrapped by `fetchSeatMap` to simulate an async call) and is loaded via the `useSeatMap` hook.

## Structure
```
src/
  App.jsx
  data/seats.js            layouts, categories, prices, meals, mock occupied seats
  hooks/useBooking.js      reducer (all business rules)
  hooks/useSeatMap.js      loading / error / ready
  components/              Seat, SeatMap, PassengerPanel, Summary, Toast
```

## Deploy
- **Vercel:** import the repo → framework "Vite" → deploy.
- **GitHub Pages:** `npm run build`, publish `dist/` (build uses relative base `./`).

## Live Demo

<img width="1366" height="768" alt="Screenshot (511)" src="https://github.com/user-attachments/assets/cf438133-f63e-4793-842e-59c90deb8f1b" />

