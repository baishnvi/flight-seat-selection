const inr = (n) => (n === 0 ? 'Free' : `₹${n.toLocaleString('en-IN')}`);

export default function Summary({ state }) {
  const ids = Array.from({ length: state.count }, (_, i) => i + 1);
  const rows = ids.map((id) => {
    const seat = state.seats[id];
    const meal = state.meals[id];
    return { id, name: state.names[id]?.trim() || `Passenger ${id}`, seat, meal,
      seatPrice: seat?.price ?? 0, mealPrice: meal?.price ?? 0 };
  });
  const seatTotal = rows.reduce((s, r) => s + r.seatPrice, 0);
  const mealTotal = rows.reduce((s, r) => s + r.mealPrice, 0);
  const assigned = rows.filter((r) => r.seat).length;
  const grand = seatTotal + mealTotal;

  return (
    <section className="card">
      <h2>Price breakdown</h2>
      <ul className="breakdown">
        {rows.map((r) => (
          <li key={r.id}>
            <div><b>{r.name}</b>
              <div className="muted">{r.seat ? `Seat ${r.seat.id}` : 'No seat selected'}
                {r.meal && r.meal.id !== 'none' ? ` · ${r.meal.name}` : ''}</div></div>
            <div className="amt">{inr(r.seatPrice + r.mealPrice)}</div>
          </li>
        ))}
      </ul>
      <dl className="totals">
        <div><dt>Seats ({assigned}/{state.count})</dt><dd>{inr(seatTotal)}</dd></div>
        <div><dt>Meals</dt><dd>{inr(mealTotal)}</dd></div>
        <div className="grand"><dt>Total</dt><dd data-testid="total">{grand === 0 ? '₹0' : inr(grand)}</dd></div>
      </dl>
    </section>
  );
}
