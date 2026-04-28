import { useState } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';

interface Props {
  onClose: () => void;
  onSuccess: () => void;
}

export function AdminLoginModal({ onClose, onSuccess }: Props) {
  const { login } = useAdmin();
  const [id,    setId]    = useState('');
  const [pass,  setPass]  = useState('');
  const [error, setError] = useState('');

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (login(id, pass)) onSuccess();
    else setError('Incorrect ID or password.');
  }

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-ink-black/75 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 12, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 12, scale: 0.96 }}
        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
        onClick={e => e.stopPropagation()}
        className="relative bg-charcoal border border-gold/20 rounded-sm p-7 w-full max-w-[340px] mx-4"
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 text-ivory-muted hover:text-ivory transition-colors"
        >
          <X size={16} />
        </button>

        <h2 className="font-cormorant text-ivory text-[1.5rem] font-light mb-5">Admin Access</h2>

        <form onSubmit={submit} className="flex flex-col gap-3">
          <div>
            <label className="block text-[0.6875rem] uppercase tracking-widest text-gold mb-1.5">
              Admin ID
            </label>
            <input
              autoFocus
              type="text"
              value={id}
              onChange={e => { setId(e.target.value); setError(''); }}
              className="w-full bg-ink-black border border-gold/20 focus:border-gold/50 text-ivory text-sm px-3 py-2 outline-none transition-colors rounded-sm"
              placeholder="Enter your ID"
            />
          </div>

          <div>
            <label className="block text-[0.6875rem] uppercase tracking-widest text-gold mb-1.5">
              Password
            </label>
            <input
              type="password"
              value={pass}
              onChange={e => { setPass(e.target.value); setError(''); }}
              className="w-full bg-ink-black border border-gold/20 focus:border-gold/50 text-ivory text-sm px-3 py-2 outline-none transition-colors rounded-sm"
              placeholder="Enter password"
            />
          </div>

          {error && <p className="text-red-400 text-xs mt-0.5">{error}</p>}

          <button
            type="submit"
            className="mt-1 w-full bg-gold/10 border border-gold/30 hover:bg-gold/20 text-gold text-sm py-2.5 rounded-sm transition-colors"
          >
            Enter
          </button>
        </form>
      </motion.div>
    </div>
  );
}
