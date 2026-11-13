import { useReducer } from 'react';

// Single source of truth. seats / meals are keyed by passenger id.
const initial = { count: 1, active: 1, layout: '3-2', names: {}, seats: {}, meals: {}, notice: null };
const note = (state, type, msg) => ({ ...state, notice: { type, msg, id: Date.now() + Math.random() } });
const pick = (obj, ids) => Object.fromEntries(Object.entries(obj).filter(([k]) => ids.includes(Number(k))));

function reducer(state, a) {
  switch (a.type) {
    case 'SET_COUNT': {
      const ids = Array.from({ length: a.count }, (_, i) => i + 1);
      return { ...state, count: a.count, active: Math.min(state.active, a.count),
        seats: pick(state.seats, ids), meals: pick(state.meals, ids), names: pick(state.names, ids) };
    }
    case 'SET_ACTIVE': return { ...state, active: a.id };
    case 'SET_NAME': return { ...state, names: { ...state.names, [a.id]: a.name } };
    case 'SET_LAYOUT':
      if (a.layout === state.layout) return state;
      return note({ ...state, layout: a.layout, seats: {} }, 'info', 'Layout changed — seat selections were cleared.');
    case 'SELECT_SEAT': {
      const seat = a.seat;
      if (seat.occupied) return note(state, 'error', `Seat ${seat.id} is already occupied.`);
      const owner = Object.keys(state.seats).find((id) => state.seats[id].id === seat.id);
      if (owner && Number(owner) === state.active) {
        const { [state.active]: _, ...rest } = state.seats; // clicking own seat removes it
        return { ...state, seats: rest };
      }
      if (owner) return note(state, 'error', `Seat ${seat.id} is already assigned to another passenger.`);
      return { ...state, seats: { ...state.seats, [state.active]: seat } };
    }
    case 'REMOVE_SEAT': {
      const { [a.id]: _, ...rest } = state.seats;
      return { ...state, seats: rest };
    }
    case 'SET_MEAL': return { ...state, meals: { ...state.meals, [a.id]: a.meal } };
    case 'CLEAR_NOTICE': return { ...state, notice: null };
    default: return state;
  }
}

export default function useBooking() {
  return useReducer(reducer, initial);
}
