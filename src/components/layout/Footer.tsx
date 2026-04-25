import { MessageCircle, Phone, MapPin } from 'lucide-react';
import { Divider } from '../ui/Divider';

export function Footer() {
  return (
    <footer className="bg-charcoal-soft">
      <Divider />
      <div className="max-w-container mx-auto px-6 md:px-12 lg:px-20 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Left */}
          <div>
            <p className="font-italiana text-gold text-3xl mb-2">RA</p>
            <p className="font-cormorant text-ivory text-xl font-light mb-2">Rashi Agrawal</p>
            <p className="font-inter text-ivory-muted text-sm">Drawing rooms, drawn lives.</p>
          </div>

          {/* Center */}
          <div className="flex flex-col gap-3">
            <a
              href="https://wa.me/917732800853?text=Hello%20Rashi%2C%20I%20would%20like%20to%20commission%20a%20custom%20sketch."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-ivory-muted text-sm font-inter hover:text-gold transition-colors duration-200"
            >
              <MessageCircle size={14} className="text-wa-green" />
              Commission on WhatsApp
            </a>
            <a
              href="tel:+917732800853"
              className="flex items-center gap-2 text-ivory-muted text-sm font-inter hover:text-gold transition-colors duration-200"
            >
              <Phone size={14} className="text-gold" />
              +91 77328 00853
            </a>
            <span className="flex items-start gap-2 text-ivory-muted text-sm font-inter">
              <MapPin size={14} className="text-gold flex-shrink-0 mt-0.5" />
              Sarafa Bazar, Bari, Dholpur, Rajasthan
            </span>
          </div>

          {/* Right */}
          <div className="md:text-right">
            <p className="font-inter text-ivory-muted text-xs leading-relaxed">
              &copy; 2026 Rashi Agrawal.<br />
              All works hand-drawn and copyrighted.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
