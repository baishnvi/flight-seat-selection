import { useCallback } from 'react';
import useBooking from './hooks/useBooking.js';
import useSeatMap from './hooks/useSeatMap.js';
import { LAYOUTS } from './data/seats.js';
import PassengerPanel from './components/PassengerPanel.jsx';
import SeatMap from './components/SeatMap.jsx';
import Summary from './components/Summary.jsx';
import Toast from './components/Toast.jsx';

export default function App() {
  const [state, dispatch] = useBooking();
  const map = useSeatMap(state.layout);
  const onSelect = useCallback((seat) => dispatch({ type: 'SELECT_SEAT', seat }), [dispatch]);
  const closeToast = useCallback(() => dispatch({ type: 'CLEAR_NOTICE' }), [dispatch]);
  const activeName = state.names[state.active]?.trim() || `Passenger ${state.active}`;

  return (
    <div className="app">
      <header>
        <h1>Choose your seats</h1>
        <div className="seg" role="group" aria-label="Aircraft layout">
          {Object.entries(LAYOUTS).map(([id, l]) => (
            <button key={id} type="button" aria-pressed={state.layout === id}
              onClick={() => dispatch({ type: 'SET_LAYOUT', layout: id })}>{l.label}</button>
          ))}
        </div>
      </header>
      <main>
        <aside><PassengerPanel state={state} dispatch={dispatch} /></aside>
        <section className="card map-card">
          <h2>Seating for <span className="who">{activeName}</span></h2>
          <SeatMap {...map} seats={state.seats} active={state.active} onSelect={onSelect} />
        </section>
        <aside><Summary state={state} /></aside>
      </main>
      <Toast notice={state.notice} onClose={closeToast} />
    </div>
  );
}
