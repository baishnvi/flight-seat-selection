import { useEffect } from 'react';

export default function Toast({ notice, onClose }) {
  useEffect(() => {
    if (!notice) return;
    const t = setTimeout(onClose, 3000);
    return () => clearTimeout(t);
  }, [notice, onClose]);
  if (!notice) return null;
  return <div className={`toast ${notice.type}`} role="alert">{notice.msg}</div>;
}
