import Seat from './Seat.jsx';
import { CATEGORIES } from '../data/seats.js';

export default function SeatMap({ status, rows, error, retry, seats, active, onSelect }) {
  if (status === 'loading') return <div className="state" role="status"><div className="spinner" />Loading seat map…</div>;
  if (status === 'error')
    return <div className="state error" role="alert">Couldn’t load the seat map. {error}<button className="btn" onClick={retry}>Try again</button></div>;

  const ownerOf = {};
  Object.entries(seats).forEach(([pid, s]) => { ownerOf[s.id] = Number(pid); });

  return (
    <div className="cabin">
      <div className="legend">
        {Object.entries(CATEGORIES).map(([k, c]) => (
          <span key={k}><i className={`swatch ${k}`} />{c.label} · {c.price ? `₹${c.price}` : 'Free'}</span>
        ))}
        <span><i className="swatch occupied" />Occupied</span>
        <span><i className="swatch selected" />Your seat</span>
        <span><i className="swatch taken" />Other passenger</span>
      </div>
      <div className="plane">
        <div className="row header" aria-hidden="true">
          <span className="rownum" />
          {rows[0].groups.map((g, i) => (
            <div className="group" key={i}>{g.map((s) => <span className="colhead" key={s.letter}>{s.letter}</span>)}</div>
          ))}
        </div>
        {rows.map(({ row, groups }) => (
          <div className="row" key={row}>
            <span className="rownum">{row}</span>
            {groups.map((g, i) => (
              <div className="group" key={i}>
                {g.map((seat) => (
                  <Seat key={seat.id} seat={seat} owner={ownerOf[seat.id]} isActive={ownerOf[seat.id] === active} onSelect={onSelect} />
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
