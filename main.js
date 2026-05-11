// ============================================================
// BRAH SMASH BURGER — page interactions
// language toggle, scroll reveal, marquees, hero, loader
// ============================================================

// ─── i18n ───
const I18N = {
  pt: {
    'nav.menu': 'menu',
    'nav.about': 'sobre',
    'nav.gallery': 'galeria',
    'nav.events': 'eventos',
    'nav.visit': 'visita',
    'nav.order': 'encomendar',
    'hero.eyebrow': 'ericeira ・ smash burgers',
    'hero.tagline': 'EVERYONE NEEDS A',
    'hero.tagline-hand': 'a real one, brah',
    'hero.cta.order': 'pede no uber eats',
    'hero.cta.menu': 'ver menu',
    'hero.cta.visit': 'visita-nos',
    'hero.scroll': 'scroll para abrir',
    'marquee.text': ['smash burgers', 'ericeira', 'everyone needs a brah', 'open daily 12:30', 'brah'],
    'burger.section.eyebrow': 'scrolla, brah',
    'burger.cap.1': 'monta-se<br><span class="hand">camada a camada,</span><br>brah.',
    'burger.cap.1.meta': 'brioche · 2× 180g · queijo · brah mayo',
    'burger.cap.2': 'explode<br>em <em>câmara lenta</em>.',
    'burger.cap.2.meta': 'cada ingrediente · à sua maneira',
    'burger.cap.3': 'e dá-se o<br><em>smash</em>, brah.',
    'burger.cap.3.meta': 'a tua vez · pede já',
    'burger.progress': 'progresso',
    'menu.eyebrow': 'a brah collection',
    'menu.title': 'o menu',
    'menu.title.coral': 'sem rodeios',
    'menu.meta': 'pão brioche · 180g double smash · queijo americano · cá feito',
    'menu.combo': 'COMBO +€4.50 (batatas + bebida)',
    'sides.eyebrow': 'os companheiros',
    'sides.title': 'sides & molhos',
    'about.headline': 'EVERYONE NEEDS<br>',
    'about.headline.hand': 'a brah.',
    'about.p1': 'Nasceu na Ericeira em 2024 entre uma sessão de surf e uma vontade urgente: comer um smash burger como deve ser. Sem firulas, sem bullsh*t — só pão, carne, queijo e o respeito que isso merece.',
    'about.p2': '180g de carne premium esmagada a alta temperatura para criar aquela crosta caramelizada. Pão brioche feito todos os dias. Queijo americano que derrete como deve. Ponto.',
    'about.stat1.label': 'gramas por burger',
    'about.stat2.label': 'segundos no grelhador',
    'about.stat3.label': 'sítios na Ericeira',
    'gallery.eyebrow': 'a vibe',
    'gallery.title': 'real life',
    'events.eyebrow': 'pop-ups & noites',
    'events.title': 'eventos',
    'events.meta': 'segue @brah_smashburger para tudo',
    'event1.name': 'POP-UP VINTAGE SURFWEAR',
    'event1.meta': '18h às 22h · @secundaudaaaa · DJ Francisco Pina',
    'event1.hand': 'brahhhh',
    'event2.name': 'NIGHT OUT @ SUPLENDI',
    'event2.meta': '20h até tarde · cervejas e burgers ao pôr-do-sol',
    'event2.hand': 'we got your night',
    'event3.name': 'SUNDAY SMASH SESSION',
    'event3.meta': 'todos os domingos · 12h30 · ericeira',
    'event3.hand': 'all day brah',
    'visit.eyebrow': 'aparece',
    'visit.title': 'visita-nos',
    'visit.address.label': 'morada',
    'visit.address.value': 'Rua dos Ferreiros 3A<br>Ericeira, Mafra · 2655-279',
    'visit.hours.label': 'horário',
    'visit.hours.mon': '12:30 — 22:00',
    'visit.hours.fri': '12:30 — 22:30',
    'visit.contact.label': 'contacto',
    'visit.contact.ig': '@brah_smashburger',
    'visit.cta': 'abrir no maps',
    'visit.map.label': 'ericeira, portugal',
    'footer.tag': 'até já, brah',
    'footer.col1.title': 'morada',
    'footer.col2.title': 'horário',
    'footer.col3.title': 'segue',
    'footer.copyright': '© 2026 brah smash burger',
    'footer.made': 'feito com carne em Ericeira',
    'burgers': [
      { id: 'cheese', name: 'CHEESE BRAH', badge: 'BESTSELLER', desc: 'Double smash 180g, queijo americano duplo, pickles, cebola, mostarda, ketchup. Pão brioche.', price: '€11.90', tags: ['DOUBLE', 'PICKLES', 'BRIOCHE'] },
      { id: 'classic', name: 'CLASSIC BRAH', badge: 'O CLÁSSICO', desc: 'Double smash 180g, queijo americano, alface, tomate, cebola, brah mayo. Pão brioche.', price: '€12.50', tags: ['DOUBLE', 'FRESCO', 'BRAH MAYO'] },
      { id: 'bacon', name: 'BACON BRAH', badge: 'CRUNCH', desc: 'Double smash 180g, queijo americano, bacon crocante, brah mayo, cebola caramelizada. Pão brioche.', price: '€13.50', tags: ['BACON', 'CARAMELIZADA', 'DOUBLE'] },
      { id: 'vegan', name: 'VEGAN BRAH', badge: 'VEGGIE', desc: 'Beyond Meat, queijo plant-based, alface, tomate, pickles, brah mayo vegan. Pão brioche.', price: '€12.90', tags: ['BEYOND', 'PLANT', 'BRIOCHE'] }
    ],
    'sides_data': [
      { name: 'FRENCH FRIES', desc: 'salgadas, crocantes', price: '€3.50' },
      { name: 'SWEET POTATO FRIES', desc: 'batata doce, paprika', price: '€4.50' },
      { name: 'BRAH MAYO', desc: 'molho da casa', price: '€1.00' },
      { name: 'TRUFFLE MAYO', desc: 'maionese de trufa', price: '€1.50' }
    ]
  },
  en: {
    'nav.menu': 'menu',
    'nav.about': 'about',
    'nav.gallery': 'gallery',
    'nav.events': 'events',
    'nav.visit': 'visit',
    'nav.order': 'order',
    'hero.eyebrow': 'ericeira ・ smash burgers',
    'hero.tagline': 'EVERYONE NEEDS A',
    'hero.tagline-hand': 'a real one, brah',
    'hero.cta.order': 'order on uber eats',
    'hero.cta.menu': 'see the menu',
    'hero.cta.visit': 'visit us',
    'hero.scroll': 'scroll to unwrap',
    'marquee.text': ['smash burgers', 'ericeira', 'everyone needs a brah', 'open daily 12:30', 'brah'],
    'burger.section.eyebrow': 'scroll, brah',
    'burger.cap.1': 'it stacks<br><span class="hand">layer by layer,</span><br>brah.',
    'burger.cap.1.meta': 'brioche · 2× 180g · cheese · brah mayo',
    'burger.cap.2': 'explodes<br>in <em>slow-mo</em>.',
    'burger.cap.2.meta': 'every ingredient · its own way',
    'burger.cap.3': 'and the<br><em>smash</em> happens.',
    'burger.cap.3.meta': 'your turn · order now',
    'burger.progress': 'progress',
    'menu.eyebrow': 'the brah collection',
    'menu.title': 'the menu',
    'menu.title.coral': 'no fluff',
    'menu.meta': 'brioche bun · 180g double smash · american cheese · made daily',
    'menu.combo': 'COMBO +€4.50 (fries + drink)',
    'sides.eyebrow': 'the sidekicks',
    'sides.title': 'sides & dips',
    'about.headline': 'EVERYONE NEEDS<br>',
    'about.headline.hand': 'a brah.',
    'about.p1': 'Born in Ericeira in 2024 between a surf session and an urgent craving: a real smash burger. No frills, no bullsh*t — just bread, beef, cheese and the respect that combo deserves.',
    'about.p2': '180g of premium beef smashed hot to build that caramelized crust. Fresh brioche every day. American cheese that melts the way it should. Period.',
    'about.stat1.label': 'grams per burger',
    'about.stat2.label': 'seconds on the grill',
    'about.stat3.label': 'spots in ericeira',
    'gallery.eyebrow': 'the vibe',
    'gallery.title': 'real life',
    'events.eyebrow': 'pop-ups & nights',
    'events.title': 'events',
    'events.meta': 'follow @brah_smashburger for everything',
    'event1.name': 'VINTAGE SURFWEAR POP-UP',
    'event1.meta': '6pm to 10pm · @secundaudaaaa · DJ Francisco Pina',
    'event1.hand': 'brahhhh',
    'event2.name': 'NIGHT OUT @ SUPLENDI',
    'event2.meta': '8pm \'til late · beers & burgers at sundown',
    'event2.hand': 'we got your night',
    'event3.name': 'SUNDAY SMASH SESSION',
    'event3.meta': 'every sunday · 12:30 · ericeira',
    'event3.hand': 'all day brah',
    'visit.eyebrow': 'come thru',
    'visit.title': 'visit us',
    'visit.address.label': 'address',
    'visit.address.value': 'Rua dos Ferreiros 3A<br>Ericeira, Mafra · 2655-279',
    'visit.hours.label': 'hours',
    'visit.hours.mon': '12:30 — 22:00',
    'visit.hours.fri': '12:30 — 22:30',
    'visit.contact.label': 'contact',
    'visit.contact.ig': '@brah_smashburger',
    'visit.cta': 'open in maps',
    'visit.map.label': 'ericeira, portugal',
    'footer.tag': 'see ya, brah',
    'footer.col1.title': 'address',
    'footer.col2.title': 'hours',
    'footer.col3.title': 'follow',
    'footer.copyright': '© 2026 brah smash burger',
    'footer.made': 'made with beef in Ericeira',
    'burgers': [
      { id: 'cheese', name: 'CHEESE BRAH', badge: 'BESTSELLER', desc: 'Double 180g smash, double American cheese, pickles, onion, mustard, ketchup. Brioche bun.', price: '€11.90', tags: ['DOUBLE', 'PICKLES', 'BRIOCHE'] },
      { id: 'classic', name: 'CLASSIC BRAH', badge: 'THE CLASSIC', desc: 'Double 180g smash, American cheese, lettuce, tomato, onion, brah mayo. Brioche bun.', price: '€12.50', tags: ['DOUBLE', 'FRESH', 'BRAH MAYO'] },
      { id: 'bacon', name: 'BACON BRAH', badge: 'CRUNCH', desc: 'Double 180g smash, American cheese, crispy bacon, brah mayo, caramelized onion. Brioche bun.', price: '€13.50', tags: ['BACON', 'CARAMELIZED', 'DOUBLE'] },
      { id: 'vegan', name: 'VEGAN BRAH', badge: 'VEGGIE', desc: 'Beyond Meat patty, plant-based cheese, lettuce, tomato, pickles, vegan brah mayo. Brioche.', price: '€12.90', tags: ['BEYOND', 'PLANT', 'BRIOCHE'] }
    ],
    'sides_data': [
      { name: 'FRENCH FRIES', desc: 'salted, crispy', price: '€3.50' },
      { name: 'SWEET POTATO FRIES', desc: 'paprika dusted', price: '€4.50' },
      { name: 'BRAH MAYO', desc: 'house sauce', price: '€1.00' },
      { name: 'TRUFFLE MAYO', desc: 'truffle mayo', price: '€1.50' }
    ]
  }
};

// ─── apply language ───
let currentLang = localStorage.getItem('brah-lang') || 'pt';

function applyLang(lang) {
  currentLang = lang;
  document.documentElement.setAttribute('data-lang', lang);
  localStorage.setItem('brah-lang', lang);
  const dict = I18N[lang];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key] !== undefined) el.innerHTML = dict[key];
  });
  // burgers
  renderMenu();
  renderSides();
  // toggle UI
  document.querySelectorAll('.lang-toggle button').forEach(b => {
    b.classList.toggle('active', b.dataset.lang === lang);
  });
}

function renderMenu() {
  const grid = document.querySelector('.menu-grid');
  if (!grid) return;
  const dict = I18N[currentLang];
  const imgMap = {
    cheese: 'images/burger-cheese-hero.jpg',
    classic: 'images/burger-classic-hero.jpg',
    bacon: 'images/burger-bacon.jpg',
    vegan: 'images/burger-vegan.jpg'
  };
  const badgeClass = {
    cheese: 'bestseller',
    classic: '',
    bacon: '',
    vegan: 'veggie'
  };
  grid.innerHTML = dict.burgers.map(b => `
    <article class="burger-card reveal" data-burger="${b.id}">
      <div class="burger-card-img">
        <span class="burger-card-badge ${badgeClass[b.id]}">${b.badge}</span>
        <img src="${imgMap[b.id]}" alt="${b.name}" loading="lazy">
      </div>
      <div class="burger-card-body">
        <div class="burger-card-head">
          <h3 class="burger-card-name">${b.name}</h3>
          <span class="burger-card-price">${b.price}</span>
        </div>
        <p class="burger-card-desc">${b.desc}</p>
        <div class="burger-card-meta">
          ${b.tags.map(t => `<span class="tag">${t}</span>`).join('')}
        </div>
      </div>
    </article>
  `).join('');
  observeReveals();
}

function renderSides() {
  const grid = document.querySelector('.sides-grid');
  if (!grid) return;
  const dict = I18N[currentLang];
  grid.innerHTML = dict.sides_data.map(s => `
    <div class="side-card">
      <div>
        <div class="side-card-name">${s.name}</div>
        <div class="side-card-desc">${s.desc}</div>
      </div>
      <div class="side-card-price">${s.price}</div>
    </div>
  `).join('');
}

// ─── intersection observer reveal ───
let revealObserver;
function observeReveals() {
  if (!revealObserver) {
    revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          revealObserver.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
  }
  document.querySelectorAll('.reveal, .reveal-stagger').forEach(el => {
    if (!el.classList.contains('in')) revealObserver.observe(el);
  });
}

// ─── hero letter wiggle ───
function setupHeroLetters() {
  const wm = document.querySelector('.hero-wordmark');
  if (!wm) return;
  const text = wm.dataset.text || 'brah';
  wm.innerHTML = text.split('').map((l, i) => `<span class="letter" style="animation-delay:${i*0.05}s">${l}</span>`).join('');
}

// ─── nav scroll behavior ───
function setupNav() {
  const nav = document.querySelector('.nav');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 80);
  }, { passive: true });
}

// ─── loader ───
function hideLoader() {
  const loader = document.querySelector('.loader');
  if (loader) {
    setTimeout(() => loader.classList.add('gone'), 600);
  }
}

// ─── init ───
window.addEventListener('DOMContentLoaded', () => {
  applyLang(currentLang);
  setupHeroLetters();
  setupNav();
  observeReveals();
  document.querySelectorAll('.lang-toggle button').forEach(b => {
    b.addEventListener('click', () => applyLang(b.dataset.lang));
  });
});

window.addEventListener('load', hideLoader);
