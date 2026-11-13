import { memo } from 'react';
import { CATEGORIES } from '../data/seats.js';

function Seat({ seat, owner, isActive, onSelect }) {
  const state = seat.occupied ? 'occupied' : owner ? (isActive ? 'selected' : 'taken') : 'available';
  const price = seat.price === 0 ? 'Free' : `₹${seat.price}`;
  const label = `Seat ${seat.id}, ${CATEGORIES[seat.category].label}, ${price}, ${state}`;
  return (
    <button type="button" className={`seat ${seat.category} ${state}`} title={label} aria-label={label}
      aria-pressed={state === 'selected'} aria-disabled={seat.occupied} onClick={() => onSelect(seat)}>
      {seat.occupied ? '×' : owner ? `P${owner}` : seat.letter}
    </button>
  );
}
export default memo(Seat);
