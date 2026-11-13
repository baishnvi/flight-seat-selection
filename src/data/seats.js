// Mock data: layouts, pricing categories, occupied seats and meals.
export const LAYOUTS = {
  '3-2': { label: '3–2', groups: [['A', 'B', 'C'], ['D', 'E']] },
  '2-3-2': { label: '2–3–2', groups: [['A', 'B'], ['C', 'D', 'E'], ['F', 'G']] },
};
export const ROWS = 12;

export const CATEGORIES = {
  standard: { label: 'Standard', price: 0 },
  preferred: { label: 'Preferred window', price: 150 },
  premium: { label: 'Premium', price: 250 },
  legroom: { label: 'Extra legroom', price: 350 },
};

export const MEALS = [
  { id: 'none', name: 'No meal', price: 0 },
  { id: 'snack', name: 'Veg sandwich & juice', price: 0 },
  { id: 'veg', name: 'Paneer rice bowl', price: 299 },
  { id: 'nonveg', name: 'Butter chicken combo', price: 349 },
  { id: 'vegan', name: 'Vegan millet salad', price: 279 },
];

const categoryFor = (row, isWindow) => {
  if (row === 1 || row === 10) return 'legroom';
  if (row <= 4) return 'premium';
  if (isWindow && row <= 9) return 'preferred';
  return 'standard';
};

export function buildSeats(layoutId) {
  const layout = LAYOUTS[layoutId];
  if (!layout) throw new Error(`Unknown layout "${layoutId}"`);
  const first = layout.groups[0][0];
  const last = layout.groups.at(-1).at(-1);
  let n = 0;
  return Array.from({ length: ROWS }, (_, i) => {
    const row = i + 1;
    return {
      row,
      groups: layout.groups.map((letters) =>
        letters.map((letter) => {
          n += 1;
          const category = categoryFor(row, letter === first || letter === last);
          return {
            id: `${row}${letter}`, row, letter, category,
            price: CATEGORIES[category].price,
            occupied: (n * 7 + row) % 5 === 0, // deterministic mock "already booked"
          };
        })
      ),
    };
  });
}

// Simulates an API call so loading / error states are real.
export const fetchSeatMap = (layoutId) =>
  new Promise((resolve, reject) =>
    setTimeout(() => {
      try { resolve(buildSeats(layoutId)); } catch (e) { reject(e); }
    }, 500)
  );
