import React from 'react';
import { ChevronLeft, ChevronRight, ImageOff, X } from 'lucide-react';
import { looksFor } from '../data/looks.js';

export default function ModelGallery({ model, onClose }) {
  const looks = React.useMemo(() => looksFor(model.slug), [model.slug]);
  const [index, setIndex] = React.useState(0);
  const [missing, setMissing] = React.useState({});
  const closeRef = React.useRef(null);
  const thumbsRef = React.useRef(null);

  const go = React.useCallback((step) => setIndex((i) => (i + step + looks.length) % looks.length), [looks.length]);
  const markMissing = (slug) => setMissing((m) => (m[slug] ? m : { ...m, [slug]: true }));

  React.useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const previousFocus = document.activeElement;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKey);
      previousFocus?.focus?.();
    };
  }, [go, onClose]);

  React.useEffect(() => {
    thumbsRef.current?.children[index]?.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
  }, [index]);

  const look = looks[index];

  return (
    <div className="gallery-backdrop" onClick={onClose}>
      <div className="gallery" role="dialog" aria-modal="true" aria-label={`Looks da ${model.name}`} onClick={(e) => e.stopPropagation()}>
        <button ref={closeRef} className="gallery-close" aria-label="Fechar galeria" onClick={onClose}><X size={20} /></button>

        <div className="gallery-stage">
          {missing[look.slug]
            ? <div className="gallery-placeholder"><ImageOff size={28} /><span>Foto em breve</span></div>
            : <img key={look.image} src={look.image} alt={`${model.name} veste ${look.name.toLowerCase()}`} onError={() => markMissing(look.slug)} />}
          <button className="gallery-nav gallery-prev" aria-label="Foto anterior" onClick={() => go(-1)}><ChevronLeft size={22} /></button>
          <button className="gallery-nav gallery-next" aria-label="Próxima foto" onClick={() => go(1)}><ChevronRight size={22} /></button>
          <span className="gallery-counter">{String(index + 1).padStart(2, '0')} / {String(looks.length).padStart(2, '0')}</span>
        </div>

        <div className="gallery-info">
          <span className="section-kicker">{model.role}</span>
          <h3>{look.name}</h3>
          <p>{look.description}</p>
          <span className="gallery-model">Modelo: {model.name}</span>

          <div className="gallery-chips">
            {looks.map((l, i) => <button key={l.slug} className={i === index ? 'chip chip-active' : 'chip'} onClick={() => setIndex(i)}>{l.name}</button>)}
          </div>

          <div className="gallery-thumbs" ref={thumbsRef}>
            {looks.map((l, i) => (
              <button key={l.slug} className={i === index ? 'thumb thumb-active' : 'thumb'} aria-label={l.name} onClick={() => setIndex(i)}>
                {missing[l.slug]
                  ? <span className="thumb-empty"><ImageOff size={16} /></span>
                  : <img src={l.image} alt="" loading="lazy" onError={() => markMissing(l.slug)} />}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
