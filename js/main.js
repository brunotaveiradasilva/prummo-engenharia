/* ==========================================================================
   Prummo Engenharia — animações
   Estrutura inspirada em prashantsani.com (GSAP + ScrollMagic), aqui com
   GSAP 3 + ScrollTrigger.
   ========================================================================== */
(function () {
  'use strict';

  if (!window.gsap || !window.ScrollTrigger) {
    document.documentElement.classList.remove('js');
    return;
  }

  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobile = () => window.innerWidth <= 760;
  const html = document.documentElement;

  $('#year').textContent = new Date().getFullYear();

  /* ------------------------------------------------------------------------
     Dados dos projetos (páginas 6–11 do PDF)
     ------------------------------------------------------------------------ */
  const PROJECTS = [
    {
      slug: 'sobrado-420',
      title: 'Sobrado unifamiliar',
      area: '420 m²',
      place: 'Campo Grande - MS',
      tags: ['ELE', 'HID', 'PISCINA'],
      desc: 'Projetos elétrico, hidrossanitário e de piscina para um sobrado unifamiliar de 420 m², modelados em 3D e compatibilizados com a arquitetura.',
      thumb: 'sobrado420-2.jpg',
      images: [
        { src: 'sobrado420-1.jpg', cls: 'wide', ar: '4/3', alt: 'Fachada do sobrado ao entardecer' },
        { src: 'sobrado420-2.jpg', cls: 'narrow', ar: '4/4.35', alt: 'Perspectiva da fachada do sobrado' },
        { src: 'sobrado420-3.jpg', cls: 'full light', ar: '16/9', alt: 'Modelo 3D das instalações elétricas e hidráulicas do sobrado' }
      ]
    },
    {
      slug: 'sobrado-520',
      title: 'Sobrado unifamiliar',
      area: '520 m²',
      place: 'Gov. Celso Ramos - SC',
      tags: ['HID', 'MANIFOLD', 'PISCINA', 'SPA'],
      desc: 'Projeto hidrossanitário com sistema de manifold, piscina e SPA para residência de 520 m² no litoral catarinense.',
      thumb: 'sobrado520-1.jpg',
      images: [
        { src: 'sobrado520-1.jpg', cls: 'full light', ar: '789/499', alt: 'Perspectiva frontal da residência' },
        { src: 'sobrado520-2.jpg', cls: 'wide light', ar: '16/9', alt: 'Isométrico da rede hidráulica com aquecimento solar' },
        { src: 'sobrado520-3.jpg', cls: 'narrow light', ar: '1/1', alt: 'Reservatórios e barrilete com manifold' },
        { src: 'sobrado520-4.jpg', cls: 'full light', ar: '459/213', alt: 'Esquema do manifold com válvula misturadora termostática' }
      ]
    },
    {
      slug: 'piscina-40',
      title: 'Piscina',
      area: '40 m²',
      place: 'Gov. Celso Ramos - SC',
      tags: ['PISCINA', 'SPA'],
      desc: 'Projeto de piscina e SPA: aspiração, retorno, hidromassagem e casa de máquinas detalhados em 3D e em planta cotada.',
      thumb: 'piscina-1.jpg',
      images: [
        { src: 'piscina-1.jpg', cls: 'full light', ar: '601/377', alt: 'Isométrico das tubulações da piscina' },
        { src: 'piscina-2.jpg', cls: 'narrow light', ar: '349/421', alt: 'Casa de máquinas com bombas e filtro' },
        { src: 'piscina-3.jpg', cls: 'wide light', ar: '444/352', alt: 'Planta cotada do SPA com dispositivos' }
      ]
    },
    {
      slug: 'hotel-bonito',
      title: 'Hotel',
      area: '1.140 m²',
      place: 'Bonito - MS',
      status: 'em andamento',
      tags: ['HID', 'ELE BT', 'ELE MT', 'SPDA', 'PISCINA', 'HVAC', 'PSCIP'],
      desc: 'Projetos complementares completos para um hotel de 1.140 m² em Bonito: hidrossanitário, elétrico de baixa e média tensão, SPDA, piscina, HVAC e PSCIP.',
      thumb: 'hotel-1.jpg',
      images: [
        { src: 'hotel-1.jpg', cls: 'full', ar: '1100/619', alt: 'Fachada do hotel com vegetação' },
        { src: 'hotel-2.jpg', cls: 'full light', ar: '716/550', alt: 'Modelo BIM com todas as disciplinas do hotel' }
      ]
    },
    {
      slug: 'modelagem-bim',
      title: 'Modelagem BIM',
      area: 'Residencial',
      place: 'Compatibilização',
      tags: ['HID', 'ESGOTO', 'ELE', '3D'],
      desc: 'Modelos 3D das instalações compatibilizados com a estrutura: cada tubo, conexão e eletroduto posicionado antes da obra começar.',
      thumb: 'bim-4.jpg',
      images: [
        { src: 'bim-4.jpg', cls: 'full', ar: '16/9', alt: 'Vista interna do modelo com tubulações de água e esgoto' },
        { src: 'bim-2.jpg', cls: 'half', ar: '4/5', alt: 'Modelo 3D da edificação com tubulações em terreno' },
        { src: 'bim-1.jpg', cls: 'half light', ar: '4/5', alt: 'Estrutura isométrica com instalações compatibilizadas' },
        { src: 'bim-3.jpg', cls: 'half', ar: '4/5', alt: 'Detalhe de tubulações de esgoto e água quente' },
        { src: 'bim-5.jpg', cls: 'half', ar: '4/5', alt: 'Vista noturna com eletrodutos iluminados' }
      ]
    }
  ];

  /* ------------------------------------------------------------------------
     Marca d'água PRUMMO (linhas do letreiro repetidas)
     ------------------------------------------------------------------------ */
  function buildWatermark(el) {
    const big = el.classList.contains('watermark--big');
    const rows = big ? 7 : 5;
    const rowH = big ? 170 : 150;
    const letterW = 320 * (rowH * 0.8 / 66);
    const H = rows * rowH;
    let g = '';
    for (let r = 0; r < rows; r++) {
      const offset = -((r * 137) % letterW) - letterW;
      let uses = '';
      for (let i = 0; i < 6; i++) {
        uses += `<use href="#wordmark" x="${offset + i * (letterW + 40)}" y="${r * rowH + rowH * 0.1}" width="${letterW}" height="${rowH * 0.8}"/>`;
      }
      g += `<g class="row" data-dir="${r % 2 ? 1 : -1}">${uses}</g>`;
    }
    el.innerHTML = `<svg viewBox="0 0 1600 ${H}" preserveAspectRatio="xMidYMid slice" fill="none" stroke="currentColor" stroke-width="1.1">${g}</svg>`;
    $$('use', el).forEach(u => u.setAttribute('vector-effect', 'non-scaling-stroke'));
  }
  $$('.watermark').forEach(buildWatermark);

  /* ------------------------------------------------------------------------
     Wireframes 3D flutuantes (os poliedros do site de referência)
     ------------------------------------------------------------------------ */
  const PHI = (1 + Math.sqrt(5)) / 2;
  const ICO_V = [[-1, PHI, 0], [1, PHI, 0], [-1, -PHI, 0], [1, -PHI, 0], [0, -1, PHI], [0, 1, PHI], [0, -1, -PHI], [0, 1, -PHI], [PHI, 0, -1], [PHI, 0, 1], [-PHI, 0, -1], [-PHI, 0, 1]];
  const ICO_E = [];
  for (let i = 0; i < 12; i++) for (let j = i + 1; j < 12; j++) {
    const d = Math.hypot(ICO_V[i][0] - ICO_V[j][0], ICO_V[i][1] - ICO_V[j][1], ICO_V[i][2] - ICO_V[j][2]);
    if (Math.abs(d - 2) < 0.01) ICO_E.push([i, j]);
  }
  const wires = [];
  let scrollVel = 0;

  $$('canvas.wire').forEach((c, idx) => {
    const size = +c.dataset.size || 100;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    c.width = c.height = size * dpr;
    c.style.width = c.style.height = size + 'px';
    const w = { c, ctx: c.getContext('2d'), size, dpr, color: c.dataset.color, ax: idx * 0.7, ay: idx * 1.3, visible: false };
    wires.push(w);
  });

  function drawWire(w) {
    const { ctx, size, dpr } = w;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, size, size);
    const cx = size / 2, cy = size / 2, R = size * 0.26;
    const sa = Math.sin(w.ax), ca = Math.cos(w.ax), sb = Math.sin(w.ay), cb = Math.cos(w.ay);
    const project = (v, scale) => {
      let [x, y, z] = v;
      let y1 = y * ca - z * sa, z1 = y * sa + z * ca;
      let x2 = x * cb + z1 * sb, z2 = -x * sb + z1 * cb;
      const p = 4 / (4 + z2 * 0.5);
      return [cx + x2 * R * scale * p, cy + y1 * R * scale * p, z2];
    };
    [[1, 1], [0.45, 0.55]].forEach(([scale, alpha]) => {
      const pts = ICO_V.map(v => project(v, scale));
      ctx.strokeStyle = w.color;
      ctx.lineWidth = 1;
      ICO_E.forEach(([a, b]) => {
        const depth = (pts[a][2] + pts[b][2]) / 2;
        ctx.globalAlpha = alpha * (0.35 + (depth + PHI) / (2 * PHI) * 0.65);
        ctx.beginPath();
        ctx.moveTo(pts[a][0], pts[a][1]);
        ctx.lineTo(pts[b][0], pts[b][1]);
        ctx.stroke();
      });
    });
    ctx.globalAlpha = 1;
  }

  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      const w = wires.find(x => x.c === e.target);
      if (w) w.visible = e.isIntersecting;
    });
  });
  wires.forEach(w => { io.observe(w.c); drawWire(w); });

  if (!reduce) {
    gsap.ticker.add((time, delta) => {
      const d = delta / 1000;
      scrollVel *= 0.92;
      wires.forEach((w, i) => {
        if (!w.visible) return;
        w.ax += d * (0.25 + i % 3 * 0.08) + scrollVel * 0.002;
        w.ay += d * (0.35 + i % 2 * 0.1) + scrollVel * 0.003;
        drawWire(w);
      });
    });
    ScrollTrigger.create({
      onUpdate: self => { scrollVel = gsap.utils.clamp(-60, 60, self.getVelocity() / 60); }
    });
  }

  /* ------------------------------------------------------------------------
     Utilitários
     ------------------------------------------------------------------------ */
  function prepDraw(els) {
    els.forEach(p => {
      const l = Math.ceil(p.getTotalLength()) + 1;
      p.style.strokeDasharray = l;
      p.style.strokeDashoffset = l;
    });
    return els;
  }

  function addFrameLines(el) {
    ['t', 'r', 'b', 'l'].forEach(s => {
      const i = document.createElement('span');
      i.className = 'frame-line ' + s;
      el.prepend(i);
    });
  }
  $$('[data-frame]').forEach(addFrameLines);

  function typeText(el, speed = 0.035) {
    const text = el.dataset.text;
    const o = { n: 0 };
    return gsap.to(o, {
      n: text.length,
      duration: text.length * speed,
      ease: 'none',
      onUpdate: () => { el.textContent = text.slice(0, Math.round(o.n)); }
    });
  }

  /* ------------------------------------------------------------------------
     Lista de projetos
     ------------------------------------------------------------------------ */
  const list = $('#projList');
  const arrow = '<svg viewBox="0 0 22 10"><path d="M0 5h20M16 1l4 4-4 4"/></svg>';
  list.innerHTML = PROJECTS.map((p, i) => `
    <li class="proj" data-index="${i}">
      <span class="proj__n">${String(i + 1).padStart(2, '0')}</span>
      <div>
        <h3 class="proj__title">${p.title} <em>— ${p.area}</em></h3>
        <p class="proj__meta">${p.place}${p.status ? `<span class="status">*${p.status}</span>` : ''}</p>
        <div class="tags">${p.tags.map(t => `<span>${t}</span>`).join('')}</div>
        <button class="proj__open" type="button" aria-label="Ver projeto: ${p.title} ${p.area}">Ver projeto ${arrow}</button>
      </div>
      <div class="proj__thumb"><img src="assets/img/${p.thumb}" alt="" loading="lazy"></div>
    </li>`).join('');

  /* ------------------------------------------------------------------------
     Transição "teleport" (4 painéis cruzando a tela)
     ------------------------------------------------------------------------ */
  const panels = $$('#teleport div');
  const nav = $('#nav');
  const modal = $('#projectModal');
  const burger = $('#hamburger');
  let busy = false;
  let navOpen = false;
  let modalOpen = false;
  let lastFocus = null;
  let modalTriggers = [];

  gsap.set(panels, { x: 0, xPercent: 101 });

  function teleport(direction, onCovered, onDone) {
    busy = true;
    const from = direction > 0 ? 101 : -101;
    if (reduce) {
      onCovered && onCovered();
      busy = false;
      onDone && onDone();
      return;
    }
    gsap.timeline({ onComplete: () => { busy = false; onDone && onDone(); } })
      .set(panels, { xPercent: from })
      .to(panels, { xPercent: 0, duration: 0.55, ease: 'power3.in', stagger: 0.09 })
      .add(() => onCovered && onCovered())
      .to(panels, { xPercent: -from, duration: 0.65, ease: 'power3.out', stagger: { each: 0.08, from: 'end' } }, '+=0.08');
  }

  function lock(on) {
    html.classList.toggle('is-locked', on);
    $('#main').setAttribute('aria-hidden', on ? 'true' : 'false');
  }

  /* ----- menu ----- */
  function staggerNav() {
    const items = $$('#nav li');
    gsap.fromTo(items,
      { opacity: 0, scale: 0.8, x: i => -i * 20, y: i => -i * 5 },
      { opacity: 1, scale: 1, x: 0, y: 0, duration: 1.2, ease: 'elastic.inOut(1, 0.6)', stagger: 0.08 });
    gsap.fromTo('#nav .row', { x: 0 }, { x: i => (i % 2 ? 1 : -1) * 120, duration: 8, ease: 'none' });
  }

  function openNav() {
    if (busy) return;
    lastFocus = document.activeElement;
    teleport(1, () => {
      gsap.set(nav, { visibility: 'visible' });
      gsap.set('#nav li', { opacity: 0 });
      nav.setAttribute('aria-hidden', 'false');
      lock(true);
      navOpen = true;
      burger.classList.add('is-open');
      burger.setAttribute('aria-expanded', 'true');
      burger.setAttribute('aria-label', 'Fechar menu');
    }, () => { staggerNav(); nav.focus(); });
  }

  function closeNav(target) {
    if (busy) return;
    teleport(-1, () => {
      gsap.set(nav, { visibility: 'hidden' });
      nav.setAttribute('aria-hidden', 'true');
      lock(false);
      navOpen = false;
      burger.classList.remove('is-open');
      burger.setAttribute('aria-expanded', 'false');
      burger.setAttribute('aria-label', 'Abrir menu');
      if (target) {
        window.scrollTo(0, target.getBoundingClientRect().top + window.scrollY);
        ScrollTrigger.update();
      }
    }, () => {
      if (target) target.setAttribute('tabindex', '-1'), target.focus({ preventScroll: true });
      else if (lastFocus) lastFocus.focus();
    });
  }

  burger.addEventListener('click', () => {
    if (modalOpen) return closeProjectViaHistory();
    navOpen ? closeNav() : openNav();
  });

  $$('#nav a').forEach(a => a.addEventListener('click', e => {
    e.preventDefault();
    closeNav($(a.getAttribute('href')));
  }));

  $('#mainLogo').addEventListener('click', e => {
    e.preventDefault();
    if (navOpen) return closeNav($('#home'));
    if (modalOpen) return closeProjectViaHistory();
    gsap.to(window, { scrollTo: 0, duration: reduce ? 0 : 1, ease: 'power3.inOut' });
  });

  $$('a[href^="#"]:not(#nav a):not(#mainLogo)').forEach(a => a.addEventListener('click', e => {
    const t = $(a.getAttribute('href'));
    if (!t) return;
    e.preventDefault();
    gsap.to(window, { scrollTo: t, duration: reduce ? 0 : 1, ease: 'power3.inOut' });
  }));

  /* ----- modal de projeto ----- */
  function projectHTML(i) {
    const p = PROJECTS[i];
    const next = PROJECTS[(i + 1) % PROJECTS.length];
    const facts = [
      ['Área', p.area],
      ['Local', p.place],
      ['Disciplinas', p.tags.join(' · ')]
    ];
    if (p.status) facts.push(['Status', p.status]);
    return `
      <article class="pm">
        <div class="watermark" aria-hidden="true"></div>
        <div class="container">
          <button class="pm__back" type="button" data-close>
            <svg viewBox="0 0 18 10"><path d="M18 5H2M6 1L2 5l4 4"/></svg> Voltar
          </button>
          <header class="pm__head">
            <p class="pm__kicker">Projeto ${String(i + 1).padStart(2, '0')} / ${String(PROJECTS.length).padStart(2, '0')}</p>
            <h2 class="pm__title" id="pmTitle">${p.title} — ${p.area}
              <svg viewBox="0 0 60 48" aria-hidden="true"><path d="M4 26l16 16L56 4"/></svg>
            </h2>
          </header>
          <dl class="pm__facts">${facts.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')}</dl>
          <p class="pm__desc">${p.desc}</p>
          <div class="pm__gallery">
            ${p.images.map(im => `
              <figure class="pm__img ${im.cls.split(' ').map(c => c === 'light' ? 'is-light' : 'pm__img--' + c).join(' ')}" style="aspect-ratio:${im.ar}">
                <img src="assets/img/${im.src}" alt="${im.alt}" loading="lazy">
              </figure>`).join('')}
          </div>
          <div class="pm__next">
            <button class="pm__back" type="button" data-close>
              <svg viewBox="0 0 18 10"><path d="M18 5H2M6 1L2 5l4 4"/></svg> Todos os projetos
            </button>
            <button type="button" data-next="${(i + 1) % PROJECTS.length}">
              <small>Próximo projeto →</small>
              <span>${next.title} — ${next.area}</span>
            </button>
          </div>
        </div>
      </article>`;
  }

  function animateProject() {
    modalTriggers.forEach(t => t.kill());
    modalTriggers = [];
    buildWatermark($('.watermark', modal));
    if (reduce) return;
    const check = $('.pm__title path', modal);
    prepDraw([check]);
    gsap.timeline({ delay: 0.1 })
      .from('.pm__back, .pm__kicker', { y: 20, opacity: 0, duration: 0.6, stagger: 0.08, ease: 'power3.out' })
      .from('.pm__title', { y: 50, opacity: 0, duration: 0.9, ease: 'expo.out' }, '-=.3')
      .to(check, { strokeDashoffset: 0, duration: 0.6, ease: 'power2.out' }, '-=.4')
      .from('.pm__facts > div', { y: 30, opacity: 0, duration: 0.6, stagger: 0.07, ease: 'power3.out' }, '-=.5')
      .from('.pm__desc', { y: 30, opacity: 0, duration: 0.7, ease: 'power3.out' }, '-=.4');

    // imagens entram alternando pelos lados (como os mockups do site de referência)
    $$('.pm__img', modal).forEach((fig, k) => {
      const tw = gsap.from(fig, {
        x: (k % 2 ? -1 : 1) * 120, scale: 1.06, opacity: 0, duration: 1, ease: 'expo.out',
        scrollTrigger: { trigger: fig, scroller: modal, start: 'top 92%' }
      });
      modalTriggers.push(tw.scrollTrigger);
      const img = $('img', fig);
      if (!fig.classList.contains('is-light')) {
        const par = gsap.fromTo(img, { yPercent: -6, scale: 1.12 }, {
          yPercent: 6, ease: 'none',
          scrollTrigger: { trigger: fig, scroller: modal, start: 'top bottom', end: 'bottom top', scrub: true }
        });
        modalTriggers.push(par.scrollTrigger);
      }
    });
  }

  function fillProject(i) {
    modal.innerHTML = projectHTML(i);
    modal.scrollTop = 0;
    modal.dataset.index = i;
  }

  function openProject(i, push = true) {
    if (busy) return;
    lastFocus = document.activeElement;
    if (push) history.pushState({ pm: i }, '', '#projeto-' + PROJECTS[i].slug);
    teleport(1, () => {
      fillProject(i);
      gsap.set(modal, { visibility: 'visible' });
      modal.setAttribute('aria-hidden', 'false');
      lock(true);
      modalOpen = true;
      burger.classList.add('is-open');
      burger.setAttribute('aria-label', 'Fechar projeto');
    }, () => { modal.focus(); animateProject(); });
  }

  function closeProject() {
    if (busy || !modalOpen) return;
    teleport(-1, () => {
      modalTriggers.forEach(t => t.kill());
      modalTriggers = [];
      gsap.set(modal, { visibility: 'hidden' });
      modal.setAttribute('aria-hidden', 'true');
      modal.innerHTML = '';
      lock(false);
      modalOpen = false;
      burger.classList.remove('is-open');
      burger.setAttribute('aria-label', 'Abrir menu');
      ScrollTrigger.refresh();
    }, () => { if (lastFocus) lastFocus.focus({ preventScroll: true }); });
  }

  function closeProjectViaHistory() {
    if (history.state && history.state.pm !== undefined) history.back();
    else closeProject();
  }

  function swapProject(i) {
    history.replaceState({ pm: i }, '', '#projeto-' + PROJECTS[i].slug);
    gsap.to('.pm', {
      opacity: 0, y: -30, duration: 0.35, ease: 'power2.in',
      onComplete: () => {
        fillProject(i);
        gsap.from('.pm', { opacity: 0, duration: 0.3 });
        animateProject();
      }
    });
  }

  list.addEventListener('click', e => {
    const li = e.target.closest('.proj');
    if (li) openProject(+li.dataset.index);
  });

  modal.addEventListener('click', e => {
    if (e.target.closest('[data-close]')) closeProjectViaHistory();
    const nx = e.target.closest('[data-next]');
    if (nx) swapProject(+nx.dataset.next);
  });

  window.addEventListener('popstate', e => {
    if (modalOpen && !(e.state && e.state.pm !== undefined)) closeProject();
    else if (e.state && e.state.pm !== undefined && !modalOpen) openProject(e.state.pm, false);
  });

  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    if (modalOpen) closeProjectViaHistory();
    else if (navOpen) closeNav();
  });

  // link direto: #projeto-slug
  const deep = PROJECTS.findIndex(p => location.hash === '#projeto-' + p.slug);
  if (deep > -1) {
    history.replaceState(null, '', location.pathname);
    setTimeout(() => openProject(deep), 400);
  }

  /* ------------------------------------------------------------------------
     Ilustração isométrica (serviços) — equivalente ao icosaedro montado
     por scroll do site de referência
     ------------------------------------------------------------------------ */
  function buildIso() {
    const svg = $('#isoBuild');
    const S = 20, C30 = Math.cos(Math.PI / 6), S30 = 0.5, CX = 222, CY = 215;
    const P = (x, y, z) => [CX + (x - y) * C30 * S, CY + (x + y) * S30 * S - z * S];
    const pts = arr => arr.map(p => P(...p).map(n => n.toFixed(1)).join(',')).join(' ');
    const line = (arr, cls) => `<polyline class="${cls}" points="${pts(arr)}"/>`;
    const slab = z => `<polygon class="slab" points="${pts([[0, 0, z], [10, 0, z], [10, 6, z], [0, 6, z]])}"/>`;
    const cols = (z0, z1) => [[0, 0], [5, 0], [10, 0], [10, 6], [5, 6], [0, 6]].map(([x, y]) => line([[x, y, z0], [x, y, z1]], 'st col')).join('');
    const box = (x0, y0, x1, y1, z0, z1) =>
      `<g class="tank"><polygon points="${pts([[x0, y1, z0], [x1, y1, z0], [x1, y1, z1], [x0, y1, z1]])}"/><polygon points="${pts([[x1, y0, z0], [x1, y1, z0], [x1, y1, z1], [x1, y0, z1]])}"/><polygon points="${pts([[x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1]])}"/></g>`;
    const node = (x, y, z) => { const [a, b] = P(x, y, z); return `<circle class="node" cx="${a}" cy="${b}" r="3.2"/>`; };

    svg.innerHTML = `
      <g class="iso-structure">
        ${slab(0)}${cols(0, 4)}${slab(4)}${cols(4, 8)}${slab(8)}
      </g>
      ${box(7.8, 0.8, 9.6, 2.6, 8, 9.6)}
      <g class="iso-pipes">
        ${line([[8.7, 1.7, 8], [8.7, 1.7, 0.6]], 'pipe pipe--cold')}
        ${line([[8.7, 1.7, 4.6], [2, 1.7, 4.6], [2, 4.2, 4.6]], 'pipe pipe--cold')}
        ${line([[8.7, 1.7, 0.6], [3, 1.7, 0.6], [3, 4.6, 0.6]], 'pipe pipe--cold')}
        ${line([[8.2, 2.4, 8], [8.2, 2.4, 0.3]], 'pipe pipe--hot')}
        ${line([[8.2, 2.4, 4.3], [2.6, 2.4, 4.3], [2.6, 4.4, 4.3]], 'pipe pipe--hot')}
        ${line([[8.2, 2.4, 0.3], [3.6, 2.4, 0.3], [3.6, 5, 0.3]], 'pipe pipe--hot')}
        ${line([[1.2, 5.3, 7.4], [1.2, 5.3, -1.2], [10.6, 5.3, -1.2]], 'pipe pipe--sewer')}
        ${line([[6, 3, 3.7], [6, 5.3, 3.7], [1.2, 5.3, 3.3]], 'pipe pipe--sewer')}
        ${line([[6, 3, -0.2], [6, 5.3, -0.2], [6, 5.3, -1.2]], 'pipe pipe--sewer')}
        ${line([[0.5, 0.5, 3.8], [4, 0.5, 3.8], [4, 3, 3.8], [7.4, 3, 3.8], [7.4, 5.6, 3.8]], 'pipe pipe--elec')}
        ${line([[0.5, 0.5, 7.8], [5, 0.5, 7.8], [5, 4, 7.8], [9.3, 4, 7.8]], 'pipe pipe--elec')}
      </g>
      <g class="iso-nodes">
        ${node(2, 4.2, 4.6)}${node(3, 4.6, 0.6)}${node(2.6, 4.4, 4.3)}${node(3.6, 5, 0.3)}
        ${node(6, 3, 3.7)}${node(6, 3, -0.2)}${node(7.4, 5.6, 3.8)}${node(9.3, 4, 7.8)}${node(4, 3, 3.8)}${node(5, 4, 7.8)}
      </g>`;
    return svg;
  }
  const iso = buildIso();


  /* ------------------------------------------------------------------------
     Seção atual na topbar
     ------------------------------------------------------------------------ */
  const secLabel = $('.topbar__section-inner');
  let currentLabel = 'início';
  function setLabel(txt) {
    if (txt === currentLabel) return;
    currentLabel = txt;
    if (reduce) { secLabel.textContent = txt; return; }
    gsap.timeline()
      .to(secLabel, { yPercent: -110, duration: 0.25, ease: 'power2.in' })
      .add(() => { secLabel.textContent = txt; })
      .fromTo(secLabel, { yPercent: 110 }, { yPercent: 0, duration: 0.35, ease: 'power3.out' });
  }
  $$('[data-label]').forEach(sec => {
    ScrollTrigger.create({
      trigger: sec, start: 'top 50%', end: 'bottom 50%',
      onToggle: self => { if (self.isActive) setLabel(sec.dataset.label); }
    });
  });
  ScrollTrigger.create({
    trigger: '#sobre', start: 'top 40px', end: 'bottom 40px',
    toggleClass: { targets: document.body, className: 'on-light' }
  });

  /* ------------------------------------------------------------------------
     Sem animação: mostra tudo e sai
     ------------------------------------------------------------------------ */
  const hscroll = $('#hscroll');
  if (reduce) {
    $$('.typed').forEach(t => (t.textContent = t.dataset.text));
    $$('.stat__n').forEach(n => (n.textContent = n.dataset.count));
    hscroll.classList.add('is-native');
    return;
  }

  /* ------------------------------------------------------------------------
     HOME: logo desenhado em linha + texto digitado
     ------------------------------------------------------------------------ */
  const drawHome = prepDraw($$('.home .draw'));
  const markDraw = drawHome.slice(0, 3);
  const wordDraw = drawHome.slice(3);
  gsap.set('.logo-lockup__mark .dot', { scale: 0, transformOrigin: 'center' });
  gsap.set('.logo-lockup__sub i, .gold-rule i', { scaleX: 0 });
  gsap.set('.logo-lockup__sub i:first-child, .gold-rule i:first-child', { transformOrigin: 'right center' });
  gsap.set('.logo-lockup__sub i:last-child, .gold-rule i:last-child', { transformOrigin: 'left center' });

  gsap.timeline({ delay: 0.25 })
    .to(markDraw[0], { strokeDashoffset: 0, duration: 1.1, ease: 'power2.inOut' })
    .to(markDraw[1], { strokeDashoffset: 0, duration: 0.8, ease: 'power2.inOut' }, '-=.5')
    .to(markDraw[2], { strokeDashoffset: 0, duration: 0.35, ease: 'power2.out' }, '-=.2')
    .to('.logo-lockup__mark .dot', { scale: 1, duration: 0.6, ease: 'back.out(4)' })
    .to(wordDraw, { strokeDashoffset: 0, duration: 0.9, ease: 'power2.inOut', stagger: 0.12 }, 0.7)
    .to('.logo-lockup__sub i', { scaleX: 1, duration: 0.9, ease: 'expo.out' }, '-=.4')
    .from('.logo-lockup__sub b', { opacity: 0, letterSpacing: '1em', duration: 1, ease: 'expo.out' }, '<')
    .add(typeText($('.home .typed')), '-=.3')
    .to('.gold-rule i', { scaleX: 1, duration: 1.2, ease: 'expo.out' }, '-=1.2')
    .from('.gold-rule b', { opacity: 0, y: 10, duration: 0.8 }, '<.2')
    .from('.scroll-cue', { opacity: 0, y: -10, duration: 0.6 }, '-=.4')
    .from('.home canvas.wire', { opacity: 0, scale: 0.4, duration: 1.2, ease: 'back.out(2)', stagger: 0.2 }, 1.2);

  gsap.to('.home__inner', {
    yPercent: -30, opacity: 0, scale: 0.94, ease: 'none',
    scrollTrigger: { trigger: '.home', start: 'top top', end: 'bottom top', scrub: true }
  });
  gsap.to('.home__foot', {
    opacity: 0, y: 40, ease: 'none',
    scrollTrigger: { trigger: '.home', start: 'top top', end: '30% top', scrub: true }
  });

  /* ------------------------------------------------------------------------
     Marca d'água: fileiras deslizam em sentidos opostos
     ------------------------------------------------------------------------ */
  $$('.sec .watermark').forEach(wm => {
    $$('.row', wm).forEach(row => {
      gsap.fromTo(row, { x: -80 * row.dataset.dir }, {
        x: 80 * row.dataset.dir, ease: 'none',
        scrollTrigger: { trigger: wm.parentElement, start: 'top bottom', end: 'bottom top', scrub: true }
      });
    });
  });

  // wireframes com parallax vertical
  $$('.sec canvas.wire').forEach((c, i) => {
    gsap.fromTo(c, { y: 60 + (i % 3) * 30 }, {
      y: -(60 + (i % 3) * 30), ease: 'none',
      scrollTrigger: { trigger: c.parentElement, start: 'top bottom', end: 'bottom top', scrub: true }
    });
  });

  /* ------------------------------------------------------------------------
     Rótulos de seção, títulos e molduras
     ------------------------------------------------------------------------ */
  $$('.sec-label').forEach(l => {
    gsap.timeline({ scrollTrigger: { trigger: l, start: 'top 88%' } })
      .from($('.n', l), { opacity: 0, x: -20, duration: 0.5, ease: 'power3.out' })
      .from($('i', l), { scaleX: 0, duration: 0.8, ease: 'expo.out' }, '-=.2')
      .from($('.t', l), { opacity: 0, x: -10, duration: 0.5 }, '-=.5');
  });

  ScrollTrigger.batch('.reveal-up', {
    start: 'top 90%',
    onEnter: els => gsap.fromTo(els, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'expo.out', stagger: 0.1, overwrite: true })
  });
  gsap.set('.reveal-up', { opacity: 0 });

  $$('[data-frame]').forEach(f => {
    const L = k => $(`:scope > .frame-line.${k}`, f);
    gsap.timeline({ scrollTrigger: { trigger: f, start: 'top 80%' } })
      .from(L('t'), { scaleX: 0, duration: 0.6, ease: 'power2.in' })
      .from(L('r'), { scaleY: 0, duration: 0.35, ease: 'none' })
      .from(L('b'), { scaleX: 0, duration: 0.6, ease: 'none' })
      .from(L('l'), { scaleY: 0, duration: 0.35, ease: 'power2.out' });
  });

  /* ------------------------------------------------------------------------
     SOBRE
     ------------------------------------------------------------------------ */
  gsap.fromTo('#sobre', { clipPath: 'inset(7% 5% 0% 5% round 40px)' }, {
    clipPath: 'inset(0% 0% 0% 0% round 0px)', ease: 'none',
    scrollTrigger: { trigger: '#sobre', start: 'top bottom', end: 'top 15%', scrub: true }
  });
  gsap.from('.about__band', {
    xPercent: 100, ease: 'none',
    scrollTrigger: { trigger: '#sobre', start: 'top 90%', end: 'top 20%', scrub: true }
  });
  const checkPaths = prepDraw($$('.checks path'));
  gsap.timeline({ scrollTrigger: { trigger: '.checks', start: 'top 85%' } })
    .from('.checks li', { x: -30, opacity: 0, duration: 0.6, stagger: 0.12, ease: 'power3.out' })
    .from('.checks svg', { scale: 0, duration: 0.5, stagger: 0.12, ease: 'back.out(3)' }, 0)
    .to(checkPaths, { strokeDashoffset: 0, duration: 0.4, stagger: 0.12 }, 0.3);
  gsap.from('.about__circle', {
    scale: 0.6, opacity: 0, rotate: -12, duration: 1.4, ease: 'expo.out',
    scrollTrigger: { trigger: '.about__circle', start: 'top 85%' }
  });
  gsap.fromTo('.about__circle img', { yPercent: -12 }, {
    yPercent: 0, ease: 'none',
    scrollTrigger: { trigger: '.about__circle', start: 'top bottom', end: 'bottom top', scrub: true }
  });
  gsap.timeline({ scrollTrigger: { trigger: '.team', start: 'top 85%' } })
    .from('.team__title', { y: 20, opacity: 0, duration: 0.6 })
    .from('.team__member img', { scale: 0, rotate: -90, duration: 0.9, ease: 'back.out(1.8)', stagger: 0.15 }, '-=.3')
    .from('.team__member figcaption', { x: -20, opacity: 0, duration: 0.6, stagger: 0.15 }, '-=.6');

  /* ------------------------------------------------------------------------
     SERVIÇOS
     ------------------------------------------------------------------------ */
  const isoStruct = prepDraw($$('.iso-structure polygon, .iso-structure polyline', iso));
  const isoPipes = prepDraw($$('.iso-pipes polyline', iso));
  gsap.set($$('.iso-nodes circle', iso), { scale: 0, transformOrigin: 'center', transformBox: 'fill-box' });
  gsap.set($$('.tank polygon', iso), { opacity: 0, y: -30 });
  gsap.set($$('.slab', iso), { fillOpacity: 0 });
  gsap.timeline({
    scrollTrigger: { trigger: iso, start: 'top 85%', end: 'bottom 35%', scrub: 0.8 }
  })
    .to(isoStruct, { strokeDashoffset: 0, duration: 1, stagger: 0.04, ease: 'none' })
    .to($$('.slab', iso), { fillOpacity: 1, duration: 0.4 }, '-=.3')
    .to($$('.tank polygon', iso), { opacity: 1, y: 0, duration: 0.4, stagger: 0.08, ease: 'back.out(2)' })
    .to(isoPipes, { strokeDashoffset: 0, duration: 0.6, stagger: 0.18, ease: 'none' })
    .to($$('.iso-nodes circle', iso), { scale: 1, duration: 0.2, stagger: 0.05, ease: 'back.out(3)' }, '-=.4');

  $$('.svc').forEach((card, i) => {
    const icon = prepDraw($$('.svc__icon path, .svc__icon circle', card));
    gsap.timeline({ scrollTrigger: { trigger: card, start: 'top 88%' } })
      .from(card, { y: 80, opacity: 0, duration: 1, ease: 'expo.out', delay: isMobile() ? 0 : i * 0.12 })
      .to(icon, { strokeDashoffset: 0, duration: 0.9, ease: 'power2.inOut', stagger: 0.08 }, '-=.6')
      .fromTo($('h3', card), { '--line': 0 }, { '--line': 1, duration: 0.6, ease: 'power3.out' }, '-=.7')
      .from($$('li', card), { x: -20, opacity: 0, duration: 0.5, stagger: 0.06, ease: 'power2.out' }, '-=.4');
  });

  /* ------------------------------------------------------------------------
     PROJETOS
     ------------------------------------------------------------------------ */
  const bigCheck = prepDraw($$('.check-big path'));
  gsap.to(bigCheck, { strokeDashoffset: 0, duration: 0.7, ease: 'power2.out', scrollTrigger: { trigger: '.check-big', start: 'top 85%' } });

  $$('.proj').forEach((li, i) => {
    gsap.timeline({ scrollTrigger: { trigger: li, start: 'top 90%' } })
      .from(li, { x: (i % 2 ? -1 : 1) * 100, opacity: 0, duration: 0.9, ease: 'expo.out' })
      .from($('.proj__thumb', li), { clipPath: 'inset(0 0 0 100% round 22px)', duration: 1, ease: 'expo.inOut' }, '-=.7')
      .from($$('.tags span', li), { y: 10, opacity: 0, duration: 0.3, stagger: 0.04 }, '-=.6');
  });

  /* ------------------------------------------------------------------------
     CAMPO: lâmpada acende, pílulas sobem, galeria horizontal fixada
     ------------------------------------------------------------------------ */
  gsap.fromTo('.bulb', { '--glow': 0 }, {
    '--glow': 1, ease: 'power2.in',
    scrollTrigger: { trigger: '.focus', start: 'top 80%', end: 'top 30%', scrub: true }
  });
  gsap.from('.pill', {
    y: 140, opacity: 0, rotate: i => (i - 1) * 6, duration: 1.3, ease: 'expo.out', stagger: 0.12,
    scrollTrigger: { trigger: '.focus__row', start: 'top 85%' }
  });
  $$('.pill img').forEach(img => {
    gsap.fromTo(img, { yPercent: -15 }, {
      yPercent: 0, ease: 'none',
      scrollTrigger: { trigger: img.parentElement, start: 'top bottom', end: 'bottom top', scrub: true }
    });
  });

  const track = $('.hscroll__track');
  const helmet = prepDraw($$('.helmet path'));
  gsap.to(helmet, { strokeDashoffset: 0, duration: 1, scrollTrigger: { trigger: '.hscroll', start: 'top 70%' } });

  ScrollTrigger.matchMedia({
    '(min-width: 761px)': function () {
      const dist = () => track.scrollWidth - window.innerWidth;
      const hTween = gsap.to(track, {
        x: () => -dist(), ease: 'none',
        scrollTrigger: {
          trigger: hscroll, start: 'center center', end: () => '+=' + dist(),
          pin: true, scrub: 1, invalidateOnRefresh: true, anticipatePin: 1,
          refreshPriority: 1 // calcula antes dos gatilhos que ficam abaixo do pin
        }
      });
      $$('.hcard', track).forEach(card => {
        gsap.from(card, {
          rotate: 6, scale: 0.85, opacity: 0.2, ease: 'none',
          scrollTrigger: { trigger: card, containerAnimation: hTween, start: 'left right', end: 'left 60%', scrub: true }
        });
      });
    },
    '(max-width: 760px)': function () {
      hscroll.classList.add('is-native');
      return () => hscroll.classList.remove('is-native');
    }
  });

  /* ------------------------------------------------------------------------
     ONDE PROJETAMOS
     ------------------------------------------------------------------------ */
  const stateChecks = prepDraw($$('.states path'));
  gsap.timeline({ scrollTrigger: { trigger: '.where__grid', start: 'top 75%' } })
    .from('.brmap .uf', { opacity: 0, duration: 0.8, stagger: { each: 0.025, from: 'random' }, ease: 'power2.out' })
    .from('.brmap .uf.is-on', { fill: 'rgba(212,174,98,0)', duration: 0.6, stagger: 0.12 }, '-=.2')
    .from('.brmap .pin use', { y: -40, opacity: 0, duration: 0.8, stagger: 0.15, ease: 'bounce.out' }, '-=.4')
    .from('.stat', { opacity: 0, y: 30, duration: 0.6 }, 0.3)
    .to('.stat__n', {
      innerText: 4, duration: 1.2, ease: 'power2.out',
      snap: { innerText: 1 },
      onUpdate: function () { const n = $('.stat__n'); n.textContent = String(Math.round(+n.textContent)).padStart(2, '0'); }
    }, '<')
    .from('.states li', { x: 20, opacity: 0, duration: 0.4, stagger: 0.1 }, '-=.8')
    .to(stateChecks, { strokeDashoffset: 0, duration: 0.3, stagger: 0.1 }, '-=.5')
    .from('.since', { y: 20, opacity: 0, duration: 0.6 }, '-=.2');
  gsap.from('.pin-ico', { y: -60, opacity: 0, duration: 0.9, ease: 'bounce.out', scrollTrigger: { trigger: '.pin-ico', start: 'top 85%' } });

  /* ------------------------------------------------------------------------
     CONTATO
     ------------------------------------------------------------------------ */
  gsap.from('.cta', {
    y: 60, opacity: 0, duration: 1, ease: 'expo.out', stagger: 0.12,
    scrollTrigger: { trigger: '.contact__grid', start: 'top 85%' }
  });

  window.addEventListener('load', () => ScrollTrigger.refresh());
})();
