import { useState, useCallback } from 'react';
import { artworks } from './data/artworks';
import type { Artwork } from './data/artworks';
import { ThemeProvider } from './context/ThemeContext';

import { SmoothScroll }  from './components/layout/SmoothScroll';
import { Navbar }        from './components/layout/Navbar';
import { Footer }        from './components/layout/Footer';
import { Hero }          from './components/hero/Hero';
import { About }         from './components/about/About';
import { Featured }      from './components/featured/Featured';
import { Gallery }       from './components/gallery/Gallery';
import { Lightbox }      from './components/lightbox/Lightbox';
import { WhyCustom }     from './components/why/WhyCustom';
import { Process }       from './components/process/Process';
import { ContactCTA }    from './components/contact/ContactCTA';

export default function App() {
  const [lightboxArtwork, setLightboxArtwork] = useState<Artwork | null>(null);

  const openLightbox = useCallback((artwork: Artwork) => {
    setLightboxArtwork(artwork);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxArtwork(null);
  }, []);

  const goPrev = useCallback(() => {
    if (!lightboxArtwork) return;
    const idx = artworks.findIndex(a => a.id === lightboxArtwork.id);
    setLightboxArtwork(artworks[(idx - 1 + artworks.length) % artworks.length]);
  }, [lightboxArtwork]);

  const goNext = useCallback(() => {
    if (!lightboxArtwork) return;
    const idx = artworks.findIndex(a => a.id === lightboxArtwork.id);
    setLightboxArtwork(artworks[(idx + 1) % artworks.length]);
  }, [lightboxArtwork]);

  return (
    <ThemeProvider>
    <SmoothScroll>
      <div className="min-h-screen bg-ink-black">
        <Navbar />

        <main id="main-content">
          <Hero />
          <About />
          <Featured onOpen={openLightbox} />
          <Gallery onOpen={openLightbox} />
          <WhyCustom />
          <Process />
          <ContactCTA />
        </main>

        <Footer />

        <Lightbox
          artwork={lightboxArtwork}
          onClose={closeLightbox}
          onPrev={goPrev}
          onNext={goNext}
        />
      </div>
    </SmoothScroll>
    </ThemeProvider>
  );
}
