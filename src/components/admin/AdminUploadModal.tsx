import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { X, Upload } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { CATEGORIES } from '../../data/artworks';
import type { Category } from '../../data/artworks';

interface Props { onClose: () => void; }

export function AdminUploadModal({ onClose }: Props) {
  const { addArtwork } = useAdmin();
  const fileRef  = useRef<HTMLInputElement>(null);
  const [preview,  setPreview]  = useState<string | null>(null);
  const [title,    setTitle]    = useState('');
  const [category, setCategory] = useState<Category>('Portraits');
  const [medium,   setMedium]   = useState('');
  const [aspect,   setAspect]   = useState<'portrait' | 'landscape' | 'square'>('portrait');
  const [featured, setFeatured] = useState(false);
  const [error,    setError]    = useState('');

  const cats = CATEGORIES.filter(c => c !== 'All') as Category[];

  function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    if (!f.type.startsWith('image/')) { setError('Please select an image file.'); return; }
    const r = new FileReader();
    r.onload = ev => { setPreview(ev.target!.result as string); setError(''); };
    r.readAsDataURL(f);
  }

  function save() {
    if (!preview)      { setError('Please select an image.'); return; }
    if (!title.trim()) { setError('Please enter a title.'); return; }
    addArtwork({
      src: preview,
      title: title.trim(),
      category,
      aspect,
      medium: medium.trim() || 'Mixed media',
      featured,
    });
    onClose();
  }

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-ink-black/75 backdrop-blur-sm overflow-y-auto py-8"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 12, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 12, scale: 0.96 }}
        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
        onClick={e => e.stopPropagation()}
        className="relative bg-charcoal border border-gold/20 rounded-sm p-7 w-full max-w-md mx-4 my-auto"
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 text-ivory-muted hover:text-ivory transition-colors"
        >
          <X size={16} />
        </button>

        <h2 className="font-cormorant text-ivory text-[1.5rem] font-light mb-5">Upload Artwork</h2>

        <div className="flex flex-col gap-4">
          {/* Image picker */}
          <div
            onClick={() => fileRef.current?.click()}
            className="border-2 border-dashed border-gold/20 hover:border-gold/40 rounded-sm p-5 flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors min-h-[120px]"
          >
            {preview ? (
              <img src={preview} alt="preview" className="max-h-44 rounded-sm object-contain" />
            ) : (
              <>
                <Upload size={22} className="text-ivory-muted" />
                <span className="text-sm text-ivory-muted">Click to select image</span>
              </>
            )}
            <input ref={fileRef} type="file" accept="image/*" onChange={onFile} className="hidden" />
          </div>

          {/* Title */}
          <div>
            <label className="block text-[0.6875rem] uppercase tracking-widest text-gold mb-1.5">
              Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full bg-ink-black border border-gold/20 focus:border-gold/50 text-ivory text-sm px-3 py-2 outline-none transition-colors rounded-sm"
              placeholder="Artwork title"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-[0.6875rem] uppercase tracking-widest text-gold mb-1.5">
              Category
            </label>
            <select
              value={category}
              onChange={e => setCategory(e.target.value as Category)}
              className="w-full bg-ink-black border border-gold/20 focus:border-gold/50 text-ivory text-sm px-3 py-2 outline-none transition-colors rounded-sm"
            >
              {cats.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          {/* Medium */}
          <div>
            <label className="block text-[0.6875rem] uppercase tracking-widest text-gold mb-1.5">
              Medium
            </label>
            <input
              type="text"
              value={medium}
              onChange={e => setMedium(e.target.value)}
              className="w-full bg-ink-black border border-gold/20 focus:border-gold/50 text-ivory text-sm px-3 py-2 outline-none transition-colors rounded-sm"
              placeholder="e.g. Graphite on archival paper"
            />
          </div>

          {/* Aspect ratio */}
          <div>
            <label className="block text-[0.6875rem] uppercase tracking-widest text-gold mb-1.5">
              Aspect Ratio
            </label>
            <div className="flex gap-2">
              {(['portrait', 'landscape', 'square'] as const).map(a => (
                <button
                  key={a}
                  type="button"
                  onClick={() => setAspect(a)}
                  className={`flex-1 text-xs py-1.5 border rounded-sm transition-colors ${
                    aspect === a
                      ? 'border-gold/60 bg-gold/10 text-gold'
                      : 'border-gold/20 text-ivory-muted hover:border-gold/30'
                  }`}
                >
                  {a[0].toUpperCase() + a.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Featured */}
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={featured}
              onChange={e => setFeatured(e.target.checked)}
              className="accent-gold"
            />
            <span className="text-sm text-ivory-muted">Mark as featured</span>
          </label>

          {error && <p className="text-red-400 text-xs">{error}</p>}

          <div className="flex gap-3 pt-1">
            <button
              onClick={onClose}
              className="flex-1 border border-gold/20 hover:border-gold/40 text-ivory-muted text-sm py-2 rounded-sm transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={save}
              className="flex-1 bg-gold/10 border border-gold/40 hover:bg-gold/20 text-gold text-sm py-2 rounded-sm transition-colors"
            >
              Save Artwork
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
