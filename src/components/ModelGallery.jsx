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

  // Centraliza a miniatura ativa rolando só a faixa de miniaturas (sem mexer na rolagem da galeria).
  React.useEffect(() => {
    const strip = thumbsRef.current;
    const thumb = strip?.children[index];
    if (!strip || !thumb) return;
    strip.scrollTo({ left: thumb.offsetLeft - (strip.clientWidth - thumb.offsetWidth) / 2, behavior: 'smooth' });
  }, [index]);

  // Arrastar para o lado troca a foto no celular.
  const touchStart = React.useRef(null);
  const onTouchStart = (e) => { const t = e.touches[0]; touchStart.current = { x: t.clientX, y: t.clientY }; };
  const onTouchEnd = (e) => {
    if (!touchStart.current) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - touchStart.current.x;
    const dy = t.clientY - touchStart.current.y;
    touchStart.current = null;
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.3) go(dx < 0 ? 1 : -1);
  };

  const look = looks[index];

  return (
    <div className="gallery-backdrop" onClick={onClose}>
      <div className="gallery" role="dialog" aria-modal="true" aria-label={`Looks da ${model.name}`} onClick={(e) => e.stopPropagation()}>
        <button ref={closeRef} className="gallery-close" aria-label="Fechar galeria" onClick={onClose}><X size={20} /></button>

        <div className="gallery-stage" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
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
