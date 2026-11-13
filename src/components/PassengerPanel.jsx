import { MEALS } from '../data/seats.js';

export default function PassengerPanel({ state, dispatch }) {
  const ids = Array.from({ length: state.count }, (_, i) => i + 1);
  return (
    <section className="card">
      <h2>Passengers</h2>
      <label className="field">Number of passengers
        <select value={state.count} onChange={(e) => dispatch({ type: 'SET_COUNT', count: Number(e.target.value) })}>
          {[1, 2, 3, 4, 5, 6].map((n) => <option key={n} value={n}>{n}</option>)}
        </select>
      </label>
      <ul className="passengers">
        {ids.map((id) => {
          const seat = state.seats[id];
          const isActive = state.active === id;
          return (
            <li key={id} className={isActive ? 'active' : ''}>
              <button type="button" className="select-p" aria-pressed={isActive} aria-label={`Select passenger ${id}`} onClick={() => dispatch({ type: 'SET_ACTIVE', id })}>
                <span className="badge">P{id}</span>
              </button>
              <div className="p-body">
                <input aria-label={`Passenger ${id} name`} placeholder={`Passenger ${id}`} value={state.names[id] ?? ''}
                  onFocus={() => dispatch({ type: 'SET_ACTIVE', id })}
                  onChange={(e) => dispatch({ type: 'SET_NAME', id, name: e.target.value })} />
                <div className="p-meta">
                  {seat ? (
                    <>Seat <b>{seat.id}</b> · {seat.price ? `₹${seat.price}` : 'Free'}
                      <button type="button" className="link" onClick={() => dispatch({ type: 'REMOVE_SEAT', id })}>Remove</button></>
                  ) : <span className="muted">No seat yet{isActive ? ' — pick one on the map' : ''}</span>}
                </div>
                <select aria-label={`Meal for passenger ${id}`} value={state.meals[id]?.id ?? 'none'}
                  onChange={(e) => dispatch({ type: 'SET_MEAL', id, meal: MEALS.find((m) => m.id === e.target.value) })}>
                  {MEALS.map((m) => <option key={m.id} value={m.id}>{m.name} — {m.price ? `₹${m.price}` : 'Free'}</option>)}
                </select>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
