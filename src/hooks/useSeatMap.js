import { useEffect, useState } from 'react';
import { fetchSeatMap } from '../data/seats.js';

export default function useSeatMap(layout) {
  const [state, setState] = useState({ status: 'loading', rows: [] });
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    let live = true;
    setState({ status: 'loading', rows: [] });
    fetchSeatMap(layout)
      .then((rows) => live && setState({ status: 'ready', rows }))
      .catch((e) => live && setState({ status: 'error', rows: [], error: e.message }));
    return () => { live = false; };
  }, [layout, attempt]);
  return { ...state, retry: () => setAttempt((a) => a + 1) };
}
