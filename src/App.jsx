import React from 'react';
import { ArrowRight, ImageOff, Facebook, Instagram, Mail, Menu, MessageCircle, Music2, ShoppingBag, Sparkles } from 'lucide-react';
import ModelGallery from './components/ModelGallery.jsx';
import './index.css';

const models = [
  { slug: 'ane', name: 'Ane', role: 'A beleza em cada curva', image: 'images/ane.webp', alt: 'Ane veste lingerie de renda bordô em um estúdio de luz quente', number: '01' },
  { slug: 'dany', name: 'Dany', role: 'Um toque de ousadia', image: 'images/dany.webp', alt: 'Dany veste lingerie de renda preta em um estúdio elegante', number: '02' },
  { slug: 'mya', name: 'Mya', role: 'Leve como você', image: 'images/mya.webp', alt: 'Mya veste lingerie de cetim champanhe em um estúdio claro', number: '03' },
];

const socialLinks = [
  { name: 'Instagram', href: null, Icon: Instagram },
  { name: 'WhatsApp', href: null, Icon: MessageCircle },
  { name: 'Facebook', href: null, Icon: Facebook },
  { name: 'TikTok', href: null, Icon: Music2 },
  { name: 'E-mail', href: null, Icon: Mail },
];

function ModelPhoto({ model }) {
  const [missing, setMissing] = React.useState(false);
  return missing
    ? <span className="model-empty"><ImageOff size={24}/>Foto em breve</span>
    : <img src={model.image} alt={model.alt} onError={() => setMissing(true)}/>;
}

function App() {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [saved, setSaved] = React.useState(false);
  const [openModel, setOpenModel] = React.useState(null);
  const closeGallery = React.useCallback(() => setOpenModel(null), []);

  return <>
    <div className="announcement">Um convite para se sentir ainda mais você <span>✦</span> Frete especial na primeira compra</div>
    <header className="header">
      <button className="icon-button mobile-menu" aria-label="Abrir menu" onClick={() => setMenuOpen(!menuOpen)}><Menu size={21} /></button>
      <nav className={menuOpen ? 'nav nav-open' : 'nav'}><a href="#colecao">Coleção</a><a href="#modelos">Nossas musas</a><a href="#marca">Nossa essência</a></nav>
      <a className="brand" href="#top" aria-label="La Belle Luh início"><img src="images/wordmark.png" alt="La Belle Luh" /></a>
      <div className="header-actions"><a href="#modelos" className="account-link">Descubra seu estilo</a><button className="icon-button bag" aria-label="Salvar favoritos" onClick={() => setSaved(!saved)}><ShoppingBag size={20}/><span className="bag-count">{saved ? '1' : '0'}</span></button></div>
    </header>

    <main id="top">
      <section className="hero" id="colecao">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-line"/> Intimidade com a sua essência</div>
          <h1>Vista-se<br/>de <em>você.</em></h1>
          <p>Uma lingerie para cada versão sua.<br/>Feita para sentir, feita para florescer.</p>
          <a className="cta" href="#modelos">Explore a coleção <ArrowRight size={16}/></a>
          <div className="hero-note"><Sparkles size={15}/> Delicadeza que começa por dentro</div>
        </div>
        <div className="hero-art">
          <div className="hero-image"><img src="images/mya.webp" alt="Mya em lingerie de cetim, envolta em luz suave" /></div>
        </div>
        <div className="hero-vertical">BELEZA QUE FLORESCE DE DENTRO PARA FORA</div>
      </section>

      <section className="intro" id="marca"><span className="section-kicker">LA BELLE LUH · DESDE SEMPRE SUA</span><p>Para os dias em que você quer conquistar o mundo — e para os dias em que quer apenas <em>se abraçar.</em></p><div className="intro-flower">✳</div></section>

      <section className="models-section" id="modelos">
        <div className="section-heading"><div><span className="section-kicker">MULHERES DE VERDADE, BELEZAS ÚNICAS</span><h2>Conheça nossas <em>musas</em></h2></div><a className="text-link" href="#newsletter">Encontre a sua peça <ArrowRight size={15}/></a></div>
        <div className="model-grid">{models.map((model) => <article className="model-card" key={model.name}>
          <div className="model-photo"><button className="model-open" aria-label={`Ver looks da ${model.name}`} onClick={() => setOpenModel(model)}><ModelPhoto model={model}/></button><span className="model-number">{model.number} / {String(models.length).padStart(2, '0')}</span><button className="card-heart" aria-label={`Favoritar peças da ${model.name}`} onClick={() => setSaved(!saved)}>{saved ? '♥' : '♡'}</button><div className="photo-overlay"><span>Ver looks</span><ArrowRight size={16}/></div></div>
          <div className="model-meta"><div><h3>{model.role}</h3></div><span className="model-star">✳</span></div>
        </article>)}</div>
      </section>

      <section className="quote-band"><p><span className="quote-mark">“</span>O detalhe mais bonito<br/>é <em>ser você.</em><span className="quote-mark">”</span></p><span className="quote-sign">LA BELLE LUH ✦</span></section>

      <section className="newsletter" id="newsletter"><div><h2>Receba nossa coleção <em>em seu e-mail.</em></h2></div><form onSubmit={e => {e.preventDefault(); e.currentTarget.reset(); alert('Pronto! Você vai receber nossa coleção em seu e-mail.')}}><label className="sr-only" htmlFor="email">Seu e-mail</label><input id="email" type="email" placeholder="Seu e-mail" required/><button type="submit" aria-label="Inscrever-se"><ArrowRight size={19}/></button></form></section>
    </main>

    <footer className="footer"><div className="footer-brand"><img src="images/wordmark.png" alt="La Belle Luh"/><span>Beleza que floresce de dentro para fora.</span></div><div className="footer-links"><a href="#colecao">Coleção</a><a href="#modelos">Nossas musas</a><a href="#marca">Nossa essência</a></div><div className="footer-social"><span>Siga a gente</span><div className="social-icons">{socialLinks.map(({name,href,Icon}) => href ? <a className="social-icon" key={name} href={href} aria-label={name} title={name} target="_blank" rel="noreferrer"><Icon size={18}/></a> : <span className="social-icon social-icon-disabled" key={name} role="img" aria-label={`${name} — link a configurar`} title={`${name} — link a configurar`}><Icon size={18}/></span>)}</div></div><div className="copyright">© {new Date().getFullYear()} La Belle Luh · Feito com carinho no Brasil</div></footer>
    {openModel && <ModelGallery model={openModel} onClose={closeGallery} />}
  </>;
}

export default App;
