import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Artwork, Category } from '../../data/artworks';
import { SectionLabel } from '../ui/SectionLabel';
import { CategoryFilter } from './CategoryFilter';
import { MasonryGrid } from './MasonryGrid';
import { AdminLoginModal } from '../admin/AdminLoginModal';
import { AdminUploadModal } from '../admin/AdminUploadModal';
import { useAdmin } from '../../context/AdminContext';
import { fadeUp } from '../../lib/motion';
import { Plus, LogOut } from 'lucide-react';

interface Props {
  onOpen: (artwork: Artwork) => void;
}

export function Gallery({ onOpen }: Props) {
  const [active,     setActive]     = useState<'All' | Category>('All');
  const [showLogin,  setShowLogin]  = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const { isAdmin, logout, allArtworks, deleteArtwork } = useAdmin();

  const filtered = active === 'All'
    ? allArtworks
    : allArtworks.filter(a => a.category === active);

  function onPlusClick() {
    if (isAdmin) setShowUpload(true);
    else setShowLogin(true);
  }

  function onLoginSuccess() {
    setShowLogin(false);
    setShowUpload(true);
  }

  return (
    <section
      id="work"
      aria-labelledby="gallery-heading"
      className="py-24 md:py-32 lg:py-40 bg-charcoal section-glow"
    >
      <div className="max-w-container mx-auto px-6 md:px-12 lg:px-20">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40, filter: 'blur(6px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, margin: '-80px' }}
          className="mb-12 flex items-start justify-between gap-4"
        >
          <div>
            <SectionLabel>03 — The Collection</SectionLabel>
            <h2 id="gallery-heading" className="font-cormorant text-ivory text-section-h2 font-light">
              The full archive.
            </h2>
          </div>

          {/* Admin controls */}
          <div className="flex items-center gap-2 mt-3 shrink-0">
            {isAdmin && (
              <button
                onClick={logout}
                title="Exit admin mode"
                className="text-ivory-muted/40 hover:text-ivory-muted transition-colors"
                aria-label="Exit admin mode"
              >
                <LogOut size={13} />
              </button>
            )}
            <button
              onClick={onPlusClick}
              title={isAdmin ? 'Upload artwork' : 'Admin — add artwork'}
              aria-label="Add artwork"
              className="w-6 h-6 flex items-center justify-center border border-gold/20 hover:border-gold/50 text-gold/40 hover:text-gold rounded-sm transition-colors"
            >
              <Plus size={13} />
            </button>
          </div>
        </motion.div>

        {/* Filter */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="mb-12"
        >
          <CategoryFilter active={active} onChange={setActive} />
        </motion.div>

        {/* Grid */}
        <MasonryGrid
          artworks={filtered}
          onOpen={onOpen}
          isAdmin={isAdmin}
          onDelete={deleteArtwork}
        />
      </div>

      <AnimatePresence>
        {showLogin  && <AdminLoginModal  onClose={() => setShowLogin(false)}  onSuccess={onLoginSuccess} />}
        {showUpload && <AdminUploadModal onClose={() => setShowUpload(false)} />}
      </AnimatePresence>
    </section>
  );
}
