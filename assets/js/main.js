/* Philippines Listing Service — site behaviour (no dependencies) */
(function(){
"use strict";
const S = window.SITE;
const P = S.properties.find(p => p.featured) || S.properties[0];
const $ = (s, r=document) => r.querySelector(s);
const $$ = (s, r=document) => [...r.querySelectorAll(s)];
const pad = n => String(n).padStart(3,"0");
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));

/* ---------- Icons ---------- */
const ICONS = {
  phone:'<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>',
  wa:'<path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"/><path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1"/>',
  viber:'<path d="M12 3c5 0 8 2.5 8 7.5S17 18 12 18l-3.5 3v-3.4C5.5 16.7 4 14.4 4 10.5 4 5.5 7 3 12 3z"/><path d="M10 8.5c.5 2 1.8 3.4 3.8 4.2M13 7.5a2.5 2.5 0 0 1 2 2"/>',
  mail:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
  pin:'<path d="M12 21s-7-6.2-7-11.5a7 7 0 1 1 14 0C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
  area:'<path d="M3 9V3h6M21 9V3h-6M3 15v6h6M21 15v6h-6"/>',
  home:'<path d="M3 11 12 4l9 7"/><path d="M5 10v10h14V10"/><path d="M10 20v-5h4v5"/>',
  homes:'<path d="M2 12 8 7l6 5"/><path d="M4 11v8h8v-8"/><path d="M13 9l5-4 4 3.5"/><path d="M14 19h7v-8"/>',
  car:'<path d="M5 17h14v-5l-2-5H7l-2 5z"/><circle cx="8" cy="17" r="2"/><circle cx="16" cy="17" r="2"/>',
  pool:'<path d="M2 18c2 0 2-1.5 4-1.5S8 18 10 18s2-1.5 4-1.5 2 1.5 4 1.5 2-1.5 4-1.5"/><path d="M8 15V5a2 2 0 0 1 4 0M16 15V5a2 2 0 0 0-4 0M8 9h8"/>',
  shield:'<path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z"/><path d="m9 12 2 2 4-4"/>',
  sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1 7 17M17 7l2.1-2.1"/>',
  bolt:'<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',
  doc:'<path d="M6 2h9l5 5v15H6z"/><path d="M14 2v6h6M9 13h7M9 17h7"/>',
  key:'<circle cx="8" cy="15" r="4"/><path d="m11 12 9-9M17 6l3 3M14 9l2 2"/>',
  hammer:'<path d="m14 6 4 4-9 9-4-4z"/><path d="m13 3 8 8-2 2-8-8z"/>',
  check:'<circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 5-6"/>',
  cash:'<rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="3"/><path d="M6 10v4M18 10v4"/>',
  cal:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
  clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  camera:'<path d="M4 7h3l2-3h6l2 3h3v12H4z"/><circle cx="12" cy="13" r="3.5"/>',
  chev:'<path d="m6 9 6 6 6-6"/>',
  left:'<path d="m15 6-6 6 6 6"/>',
  right:'<path d="m9 6 6 6-6 6"/>',
  close:'<path d="M6 6l12 12M18 6 6 18"/>',
  menu:'<path d="M4 7h16M4 12h16M4 17h16"/>',
  school:'<path d="m2 9 10-5 10 5-10 5z"/><path d="M6 11v5c3 2 9 2 12 0v-5"/>',
  hospital:'<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M12 7v6M9 10h6M9 21v-4h6v4"/>',
  bag:'<path d="M5 8h14l-1 13H6z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/>',
  road:'<path d="M8 3 4 21M16 3l4 18M12 4v3M12 11v3M12 18v2"/>',
  fb:'<path d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v7h4v-7h3l1-4h-4V8z"/>',
  msgr:'<path d="M12 3C7 3 3 6.7 3 11.3c0 2.5 1.2 4.8 3.2 6.3V21l3-1.7c.9.3 1.8.4 2.8.4 5 0 9-3.7 9-8.4S17 3 12 3z"/><path d="m7 13 3.5-3.5 2.5 2.5L17 9"/>',
  link:'<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>',
  print:'<path d="M6 9V3h12v6"/><rect x="3" y="9" width="18" height="8" rx="2"/><path d="M7 14h10v7H7z"/>',
  info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5v.5"/>',
  grid:'<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>'
};
const I = (n, cls="") => `<svg ${cls?`class="${cls}"`:""} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[n]||""}</svg>`;
$$("[data-icon]").forEach(el => el.insertAdjacentHTML("afterbegin", I(el.dataset.icon)));

/* ---------- Contact links ---------- */
const num = S.agent.phoneIntl.replace(/[^\d]/g,"");
const LINKS = {
  tel: `tel:${S.agent.phoneIntl}`,
  wa: (t="") => `https://wa.me/${num}${t?`?text=${encodeURIComponent(t)}`:""}`,
  viber: `viber://chat?number=%2B${num}`,
  mail: (subj="", body="") => `mailto:${S.agent.email}?subject=${encodeURIComponent(subj)}${body?`&body=${encodeURIComponent(body)}`:""}`
};
const WA_HELLO = `Hi ${S.agent.name.split(" ")[0]}, I'm interested in the ${P.shortTitle} (${P.address}). Could you send me more details?`;
const priceLabel = p => p.price ? p.price : "Price on request";
const pageUrl = () => location.href.split("#")[0];

/* ---------- Header / footer / mobile bar ---------- */
const here = (location.pathname.split("/").pop() || "index.html");
const navLink = (href, label) => `<a href="${href}"${here===href?' aria-current="page"':""}>${label}</a>`;
const forSale = S.properties.filter(p => p.status === "for-sale");
const buyMenu = `
  ${forSale.map(p => `<a href="${p.url}"><img src="${p.image}" alt="" loading="lazy"><span><b>${esc(p.shortTitle)}</b><small>${esc(p.area)} · ${esc(priceLabel(p))}</small></span><span class="tag tag--line">For sale</span></a>`).join("")}
  <hr>
  <a href="properties.html?type=House+%26+Lot"><span><b>Houses &amp; Lots</b><small>Family homes and redevelopment sites</small></span></a>
  <a href="properties.html?type=Lot"><span><b>Lots</b><small>Land for building your own</small></span></a>
  <a href="properties.html?type=Condominium"><span><b>Condominiums</b><small>Upcoming listings</small></span></a>
  <a href="properties.html"><span><b>View all properties</b><small>${forSale.length} for sale · more coming soon</small></span></a>`;

const header = $("#site-header");
if (header) header.innerHTML = `
  <a class="skip" href="#main">Skip to content</a>
  <header class="header"><div class="wrap">
    <a class="logo" href="index.html" aria-label="${esc(S.brand)} home">
      <img src="images/brand/pls-logo.png" alt="${esc(S.brand)} logo" width="46" height="42">
      <span class="logo__text"><span class="logo__name">${esc(S.brand)}</span><span class="logo__sub">Private property · Philippines</span></span>
    </a>
    <nav class="nav" id="nav" aria-label="Main">
      ${navLink("index.html","Home")}
      <div class="nav__drop" data-open="false"><button type="button" aria-expanded="false" aria-haspopup="true">Buy ${I("chev")}</button><div class="nav__menu">${buyMenu}</div></div>
      ${navLink("properties.html","Properties")}
      ${navLink(P.url,"The Residence")}
      ${navLink("about.html","About")}
      ${navLink("contact.html","Contact")}
    </nav>
    <div class="header__cta">
      <a class="btn btn--ghost btn--sm" href="${LINKS.tel}">${I("phone")}${esc(S.agent.phoneDisplay)}</a>
      <a class="btn btn--primary btn--sm" href="${P.url}#viewing">Private viewing</a>
      <button class="burger" type="button" aria-label="Open menu" aria-controls="nav" aria-expanded="false">${I("menu")}</button>
    </div>
  </div></header>`;

const footer = $("#site-footer");
if (footer) footer.innerHTML = `
  <footer class="footer"><div class="wrap">
    <div class="footer__cta"><div><span class="eyebrow">By appointment</span><h2>Experience it <em>in person</em>.</h2></div><div class="lux-actions"><a class="btn btn--primary" href="${P.url}#viewing">Arrange a private viewing</a><a class="btn btn--ghost-light" href="${LINKS.wa(WA_HELLO)}" target="_blank" rel="noopener">${I("wa")}WhatsApp</a></div></div>
    <div class="footer__grid">
      <div>
        <a class="logo" href="index.html"><img src="images/brand/pls-logo.png" alt="" width="46" height="42"><span class="logo__text"><span class="logo__name">${esc(S.brand)}</span><span class="logo__sub">${esc(S.domain)}</span></span></a>
        <p style="margin-top:16px;max-width:36ch">${esc(S.tagline)} Serving buyers across all cities of the Philippines.</p>
        <div class="share" data-share></div>
      </div>
      <div><h4>Explore</h4><ul>
        <li><a href="index.html">Home</a></li><li><a href="properties.html">Properties</a></li>
        <li><a href="${P.url}">Bel-Air II Family Home</a></li><li><a href="${P.url}#gallery">Photo gallery</a></li><li><a href="fact-sheet.html">Fact sheet (PDF)</a></li></ul></div>
      <div><h4>Company</h4><ul>
        <li><a href="about.html">About</a></li><li><a href="contact.html">Contact</a></li>
        <li><a href="privacy.html">Privacy policy</a></li><li><a href="privacy.html#disclaimer">Property disclaimer</a></li></ul></div>
      <div><h4>Talk to ${esc(S.agent.name.split(" ")[0])}</h4><ul>
        <li><a href="${LINKS.tel}">${esc(S.agent.phoneDisplay)}</a></li>
        <li><a href="${LINKS.wa(WA_HELLO)}" target="_blank" rel="noopener">WhatsApp</a> · <a href="${LINKS.viber}">Viber</a></li>
        <li><a href="${LINKS.mail("Property enquiry")}">${esc(S.agent.email)}</a></li>
        <li>Viewing by appointment only</li></ul></div>
    </div>
    <div class="footer__bottom"><span>© <span data-year></span> ${esc(S.brand)}. All rights reserved.</span><span>Some property images are digital renovation concepts — <a href="privacy.html#disclaimer">see disclaimer</a>. Stock photography via Unsplash.</span></div>
  </div></footer>
  <nav class="mbar" aria-label="Quick contact">
    <a href="${LINKS.tel}">${I("phone")}Call</a>
    <a class="wa" href="${LINKS.wa(WA_HELLO)}" target="_blank" rel="noopener">${I("wa")}WhatsApp</a>
    <a class="vb" href="${LINKS.viber}">${I("viber")}Viber</a>
    <a class="eq" href="${P.url}#viewing">${I("cal")}Viewing</a>
  </nav>`;
$$("[data-year]").forEach(e => e.textContent = new Date().getFullYear());

/* Header state on scroll */
const hdr = $(".header");
const onScroll = () => hdr && hdr.classList.toggle("is-scrolled", window.scrollY > 40);
onScroll(); window.addEventListener("scroll", onScroll, {passive:true});

/* Nav behaviour */
const burger = $(".burger"), nav = $("#nav");
burger && burger.addEventListener("click", () => { const o = nav.classList.toggle("is-open"); burger.setAttribute("aria-expanded", o); });
$$(".nav__drop").forEach(d => {
  const b = $("button", d);
  b.addEventListener("click", e => { e.stopPropagation(); const o = d.dataset.open !== "true"; d.dataset.open = o; b.setAttribute("aria-expanded", o); });
});
document.addEventListener("click", e => { $$(".nav__drop").forEach(d => { if (!d.contains(e.target)) { d.dataset.open = "false"; $("button",d).setAttribute("aria-expanded","false"); } }); });
document.addEventListener("keydown", e => { if (e.key === "Escape") $$(".nav__drop").forEach(d => d.dataset.open = "false"); });

/* ---------- Bindings from config ---------- */
const get = (o, path) => path.split(".").reduce((a,k) => a?.[k], o);
$$("[data-bind]").forEach(el => { const v = get({site:S, p:P, agent:S.agent}, el.dataset.bind); if (v) el.textContent = v; else if (el.dataset.fallback) el.textContent = el.dataset.fallback; });
$$("[data-price]").forEach(el => el.textContent = priceLabel(P));
$$("[data-href]").forEach(el => {
  const k = el.dataset.href;
  el.href = k==="tel" ? LINKS.tel : k==="wa" ? LINKS.wa(WA_HELLO) : k==="viber" ? LINKS.viber : k==="mail" ? LINKS.mail(`Enquiry: ${P.shortTitle}`) : el.href;
  if (k==="wa") { el.target = "_blank"; el.rel = "noopener"; }
});

/* ---------- Property cards ---------- */
const facts = p => [
  p.lotArea && `<span>${I("area")}${esc(p.lotArea)}</span>`,
  p.homes && `<span>${I("homes")}2 homes</span>`,
  p.parking && `<span>${I("car")}${esc(p.parking.replace("Up to ","≤ "))}</span>`,
  p.pool && `<span>${I("pool")}Pool</span>`
].filter(Boolean).join("");
const card = (p, featured=false) => {
  if (p.status === "coming-soon") return `
    <div class="pcard pcard--soon" data-type="${esc(p.type)}">
      <div class="pcard__img"><img src="${p.image}" alt="Upcoming ${esc(p.type)} listing" loading="lazy"><span class="tag">${esc(p.type)}</span></div>
      <div class="pcard__body"><div class="pcard__price">Coming soon</div><p class="pcard__title">${esc(p.shortTitle)}</p>
      <div class="pcard__loc">${I("pin")}Get notified when it's listed</div>
      <div class="pcard__facts"><a href="${LINKS.wa("Hi, please notify me when your next property listing goes live.")}" target="_blank" rel="noopener">Notify me on WhatsApp →</a></div></div>
    </div>`;
  const total = S.rooms.reduce((a,r)=>a+r.files.length,0);
  return `
    <article class="pcard${featured?" pcard--featured":""}" data-type="${esc(p.type)}">
      <a class="pcard__img" href="${p.url}"><img src="${featured ? p.image.replace("-cs","-c") : p.image}" alt="${esc(p.shortTitle)} — ${esc(p.area)}" loading="lazy"><span class="tag">For sale</span><span class="pcard__count">${I("camera")}${total}</span></a>
      <div class="pcard__wrap" style="display:flex;flex-direction:column;flex:1">
        <a class="pcard__body" href="${p.url}" style="text-decoration:none;color:inherit">
          <span class="eyebrow" style="margin:0">${esc(p.type)}</span>
          <div class="pcard__price">${esc(priceLabel(p))}</div>
          <p class="pcard__title">${esc(p.title)}</p>
          <div class="pcard__loc">${I("pin")}${esc(p.address)}</div>
          ${featured ? `<p style="color:var(--muted);font-size:.92rem;margin:4px 0 0">Main house and separate guest house on a ${esc(p.lotArea)} ${esc(p.orientation.toLowerCase())} in a 24/7 secured gated village. ${esc(p.payment)} · reservation ${esc(p.reservationFee)}.</p>` : ""}
          <div class="pcard__facts">${facts(p)}</div>
        </a>
        <div class="pcard__actions">
          ${featured?`<a class="btn btn--primary btn--sm" href="${p.url}">View the residence</a>`:""}
          <a class="btn btn--ghost btn--sm" href="${LINKS.wa(WA_HELLO)}" target="_blank" rel="noopener">${I("wa")}WhatsApp</a>
          ${featured?"":`<a class="btn btn--ghost btn--sm" href="${LINKS.tel}">${I("phone")}Call</a>`}
        </div>
      </div>
    </article>`;
};
$$("[data-cards]").forEach(box => {
  const mode = box.dataset.cards;
  const params = new URLSearchParams(location.search);
  const render = () => {
    let list = S.properties.slice();
    const type = $("#f-type")?.value ?? params.get("type") ?? "";
    const status = $("#f-status")?.value ?? "";
    if (mode === "home") list = list.filter(p => !p.featured).slice(0, 3);
    if (mode === "all-home") list = [P, ...list.filter(p => !p.featured).slice(0, 4)];
    if (type) list = list.filter(p => p.type === type);
    if (status) list = list.filter(p => p.status === status);
    box.innerHTML = list.length ? list.map(p => card(p, (mode==="all"||mode==="all-home") && p.featured && !type && !status)).join("") :
      `<p class="lead">No listings match yet — <a href="${LINKS.wa("Hi, I'm looking for a property. Can you let me know when something matches?")}" target="_blank" rel="noopener">tell us what you're looking for</a> and we'll message you first.</p>`;
    bindImgFallback(box);
  };
  if ($("#f-type") && params.get("type")) $("#f-type").value = params.get("type");
  $$("#f-type,#f-status").forEach(s => s.addEventListener("change", render));
  render();
});
$$("[data-featured-card]").forEach(box => { box.innerHTML = card(P, true); });

/* ---------- Rooms, gallery, as-is ---------- */
const imgPath = (r, n, sm) => `images/property/${r.slug}/belair-${r.slug}-${pad(n)}${sm?"-cs":"-c"}.jpg`;
const asIsPath = r => `images/property/as-is/as-is-${r.asIs}.jpg`;
const ALL = [];
S.rooms.forEach(r => r.files.forEach((n,i) => ALL.push({ src: imgPath(r,n), sm: imgPath(r,n,true), room: r.label, slug: r.slug, asis: asIsPath(r),
  alt: `${r.label} renovation concept ${i+1}, ${P.shortTitle}, ${P.area}`, cap: `Renovation concept ${i+1} of ${r.files.length} — furnishings and finishes shown are not included.` })));
const ASIS = S.rooms.map(r => ({ src:asIsPath(r), sm:asIsPath(r), room:r.label, slug:r.slug,
  alt:`${r.label} as it is today, ${P.address}`, cap:`As it stands today — actual current condition` }));

$$("[data-rooms]").forEach(box => {
  const cls = i => i===0||i===6 ? " room--wide" : i===1||i===7 ? " room--tall" : i===10 ? " room--long" : "";
  const pick = {0:4, 1:2, 6:1};
  box.innerHTML = S.rooms.map((r,i) => `<a class="room${cls(i)}" href="${P.url}#gallery" data-room-link="${r.slug}">
    <img src="${imgPath(r, r.files[pick[i]||0], !cls(i))}" alt="${esc(r.label)} renovation concept — ${esc(P.area)}" loading="lazy">
    <span class="room__label"><b>${esc(r.label)}</b><small>${r.files.length} photos</small></span></a>`).join("");
});
$$("[data-room-link]").forEach(a => a.addEventListener("click", () => sessionStorageSafe("room", a.dataset.roomLink)));
function sessionStorageSafe(k, v){ try { v===undefined ? (v = sessionStorage.getItem(k), sessionStorage.removeItem(k)) : sessionStorage.setItem(k, v); } catch(e) {} return v; }

const gal = $("[data-gallery]");
if (gal) {
  const tabs = $("[data-room-tabs]");
  tabs.innerHTML = `<button type="button" role="tab" aria-selected="true" data-r="">All (${ALL.length})</button>` +
    S.rooms.map(r => `<button type="button" role="tab" aria-selected="false" data-r="${r.slug}">${esc(r.label)} (${r.files.length})</button>`).join("");
  const draw = slug => {
    const list = ALL.map((x,i)=>({...x,i})).filter(x => !slug || x.slug === slug);
    gal.innerHTML = list.map(x => `<button type="button" data-lb="all" data-i="${x.i}" aria-label="Open ${esc(x.alt)}"><img src="${x.sm}" alt="${esc(x.alt)}" loading="lazy"><small>${esc(x.room)}</small></button>`).join("");
  };
  tabs.addEventListener("click", e => { const b = e.target.closest("button"); if (!b) return; $$("button",tabs).forEach(t => t.setAttribute("aria-selected", t===b)); draw(b.dataset.r); });
  const pre = sessionStorageSafe("room") || (location.hash.startsWith("#room-") ? location.hash.slice(6) : "");
  if (pre && S.rooms.some(r=>r.slug===pre)) { $$("button",tabs).forEach(t => t.setAttribute("aria-selected", t.dataset.r===pre)); draw(pre); setTimeout(()=>$("#gallery")?.scrollIntoView(),50); } else draw("");
}
$$("[data-asis]").forEach(box => box.innerHTML = ASIS.map((x,i) => `<figure><button type="button" data-lb="asis" data-i="${i}" aria-label="Open ${esc(x.alt)}"><img src="${x.sm}" alt="${esc(x.alt)}" loading="lazy"></button><figcaption>${esc(x.room)}</figcaption></figure>`).join(""));
$$("[data-compare]").forEach(box => {
  const pick = ["front-house","kitchen","living-room","patio","dining-room","guest-house"];
  box.innerHTML = pick.map(slug => { const r = S.rooms.find(x=>x.slug===slug), a = ASIS.find(x=>x.slug===slug);
    return `<div class="compare__item"><div class="compare__pair">
      <figure><img src="${a.src}" alt="${esc(a.alt)}" loading="lazy"><figcaption><span class="tag">Today</span></figcaption></figure>
      <figure><img src="${imgPath(r, r.files[slug==="kitchen"?2:slug==="patio"?1:0], true)}" alt="${esc(r.label)} renovation concept" loading="lazy"><figcaption><span class="tag tag--gold">Concept</span></figcaption></figure></div>
      <div class="compare__body"><b>${esc(r.label)}</b><a href="${P.url}#gallery" data-room-link="${slug}">View ${r.files.length}</a></div></div>`; }).join("");
  $$("[data-room-link]", box).forEach(a => a.addEventListener("click", () => sessionStorageSafe("room", a.dataset.roomLink)));
});

/* Mosaic on property page */
$$("[data-mosaic]").forEach(box => {
  const picks = [4, 11, 15, 33, 41].map(i => ({...ALL[i], i}));
  box.innerHTML = picks.map((x,k) => `<button type="button" data-lb="all" data-i="${x.i}" aria-label="Open photo: ${esc(x.room)}"><img src="${x.src}" alt="${esc(x.alt)}" ${k?'loading="lazy"':'fetchpriority="high"'}></button>`).join("") +
    `<button type="button" class="btn btn--gold btn--sm mosaic__all" data-lb="all" data-i="0">${I("grid")}All ${ALL.length} photographs</button>`;
});

/* ---------- Lightbox ---------- */
const lb = document.createElement("div");
lb.className = "lb"; lb.setAttribute("aria-hidden","true"); lb.setAttribute("role","dialog"); lb.setAttribute("aria-modal","true"); lb.setAttribute("aria-label","Photo viewer");
lb.innerHTML = `<div class="lb__top"><div><b data-lb-room></b><small data-lb-count></small></div><button class="lb__close" type="button" aria-label="Close">${I("close")}</button></div>
  <div class="lb__stage"><button class="lb__btn lb__prev" type="button" aria-label="Previous photo">${I("left")}</button><img alt=""><button class="lb__btn lb__next" type="button" aria-label="Next photo">${I("right")}</button><figure class="lb__asis" hidden><img alt=""><span>As it stands today</span></figure></div>
  <div class="lb__cap"></div><div class="lb__thumbs"></div>`;
document.body.appendChild(lb);
let set = ALL, cur = 0, lastFocus = null;
const show = i => {
  cur = (i + set.length) % set.length; const x = set[cur];
  $(".lb__stage > img", lb).src = x.src; $(".lb__stage > img", lb).alt = x.alt;
  const ai = $(".lb__asis", lb); if (x.asis) { ai.hidden = false; $("img", ai).src = x.asis; $("img", ai).alt = `${x.room} as it stands today`; } else ai.hidden = true;
  $("[data-lb-room]", lb).textContent = x.room; $("[data-lb-count]", lb).textContent = `${cur+1} / ${set.length}`;
  $(".lb__cap", lb).textContent = x.cap;
  $$(".lb__thumbs button", lb).forEach((b,k) => b.setAttribute("aria-current", k===cur));
  $$(".lb__thumbs button", lb)[cur]?.scrollIntoView({block:"nearest", inline:"center"});
  [set[cur+1], set[cur-1]].forEach(n => { if (n) { const im = new Image(); im.src = n.src; } });
};
const openLB = (which, i) => {
  set = which === "asis" ? ASIS : ALL; lastFocus = document.activeElement;
  $(".lb__thumbs", lb).innerHTML = set.map((x,k) => `<button type="button" aria-label="Photo ${k+1}" data-k="${k}"><img src="${x.sm}" alt="" loading="lazy"></button>`).join("");
  lb.setAttribute("aria-hidden","false"); document.body.style.overflow = "hidden"; show(+i||0); $(".lb__close", lb).focus();
};
const closeLB = () => { lb.setAttribute("aria-hidden","true"); document.body.style.overflow = ""; lastFocus && lastFocus.focus(); };
document.addEventListener("click", e => { const t = e.target.closest("[data-lb]"); if (t) { e.preventDefault(); openLB(t.dataset.lb, t.dataset.i); } });
$(".lb__close", lb).addEventListener("click", closeLB);
$(".lb__prev", lb).addEventListener("click", () => show(cur-1));
$(".lb__next", lb).addEventListener("click", () => show(cur+1));
$(".lb__thumbs", lb).addEventListener("click", e => { const b = e.target.closest("button"); if (b) show(+b.dataset.k); });
lb.addEventListener("click", e => { if (e.target === lb || e.target.classList.contains("lb__stage")) closeLB(); });
document.addEventListener("keydown", e => { if (lb.getAttribute("aria-hidden")==="true") return;
  if (e.key==="Escape") closeLB(); if (e.key==="ArrowRight") show(cur+1); if (e.key==="ArrowLeft") show(cur-1);
  if (e.key==="Tab") { const f = $$("button", lb).filter(b=>b.offsetParent); if (e.shiftKey && document.activeElement===f[0]) { e.preventDefault(); f[f.length-1].focus(); } else if (!e.shiftKey && document.activeElement===f[f.length-1]) { e.preventDefault(); f[0].focus(); } } });
let tx = null;
$(".lb__stage", lb).addEventListener("touchstart", e => { tx = e.touches[0].clientX; }, {passive:true});
$(".lb__stage", lb).addEventListener("touchend", e => { if (tx===null) return; const d = e.changedTouches[0].clientX - tx; if (Math.abs(d) > 45) show(cur + (d<0?1:-1)); tx = null; });

/* ---------- Share ---------- */
$$("[data-share]").forEach(box => {
  const u = encodeURIComponent(box.dataset.url ? new URL(box.dataset.url, location.href).href : pageUrl());
  const t = encodeURIComponent(`${P.title} — ${P.address}`);
  box.innerHTML = `
    <a href="https://www.facebook.com/sharer/sharer.php?u=${u}" target="_blank" rel="noopener" aria-label="Share on Facebook">${I("fb")}</a>
    <a href="https://www.facebook.com/dialog/send?link=${u}&app_id=&redirect_uri=${u}" data-msgr target="_blank" rel="noopener" aria-label="Share on Messenger">${I("msgr")}</a>
    <a href="https://wa.me/?text=${t}%20${u}" target="_blank" rel="noopener" aria-label="Share on WhatsApp">${I("wa")}</a>
    <a href="viber://forward?text=${t}%20${u}" aria-label="Share on Viber">${I("viber")}</a>
    <button type="button" data-copy aria-label="Copy link">${I("link")}</button>`;
  // Messenger: on phones use the app link; on desktop fall back to the Facebook share dialog.
  const m = $("[data-msgr]", box); if (/Android|iPhone|iPad/i.test(navigator.userAgent)) m.href = `fb-messenger://share/?link=${u}`; else m.href = `https://www.facebook.com/sharer/sharer.php?u=${u}`;
  $("[data-copy]", box).addEventListener("click", async ev => {
    const btn = ev.currentTarget; try { await navigator.clipboard.writeText(decodeURIComponent(u)); } catch(e) { prompt("Copy this link:", decodeURIComponent(u)); return; }
    btn.innerHTML = I("check"); setTimeout(() => btn.innerHTML = I("link"), 1600);
  });
});

/* ---------- Nearby tabs ---------- */
$$("[data-nearby]").forEach(box => {
  const tabs = $$(".ntabs button", box), lists = $$("[data-list]", box);
  tabs.forEach(t => t.addEventListener("click", () => { tabs.forEach(x => x.setAttribute("aria-selected", x===t)); lists.forEach(l => l.hidden = l.dataset.list !== t.dataset.tab); }));
});

/* ---------- Home search ---------- */
const sf = $("#search-form");
sf && sf.addEventListener("submit", e => { e.preventDefault(); const t = $("#s-type").value; location.href = "properties.html" + (t ? `?type=${encodeURIComponent(t)}` : ""); });

/* ---------- Forms (viewing + enquiry) ---------- */
const minDate = (() => { const d = new Date(); d.setDate(d.getDate()+3); return d.toISOString().slice(0,10); })();
$$("input[type=date][data-min3]").forEach(i => { i.min = minDate; });
$$("form[data-lead]").forEach(form => {
  const started = Date.now();
  const kind = form.dataset.lead; // "viewing" | "enquiry"
  let channel = "wa";
  $$(".seg button", form).forEach(b => b.addEventListener("click", () => { channel = b.dataset.ch; $$(".seg button", form).forEach(x => x.setAttribute("aria-selected", x===b)); $("[data-submit-label]", form).textContent = channel==="wa" ? "Send via WhatsApp" : "Send via email"; }));
  const setErr = (el, on) => el.closest(".field")?.classList.toggle("field--error", on);
  $$("input,select,textarea", form).forEach(el => el.addEventListener("input", () => setErr(el, false)));
  form.addEventListener("submit", e => {
    e.preventDefault();
    if ($(".hp input", form)?.value) return;            // honeypot: bots fill hidden fields
    if (Date.now() - started < 2500) return;            // too fast to be a person
    let ok = true, first = null;
    $$("[required]", form).forEach(el => {
      let bad = el.type === "checkbox" ? !el.checked : !el.value.trim();
      if (!bad && el.type === "email") bad = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value.trim());
      if (!bad && el.name === "phone") bad = el.value.replace(/\D/g,"").length < 10;
      if (!bad && el.type === "date") bad = el.value < minDate;
      setErr(el, bad); if (bad) { ok = false; first = first || el; }
    });
    if (!ok) { first.focus(); return; }
    const v = n => (form.elements[n]?.value || "").trim();
    const lines = [
      kind === "viewing" ? `VIEWING REQUEST — ${P.shortTitle}` : `ENQUIRY — ${P.shortTitle}`,
      `Property: ${P.address}`,
      `Name: ${v("name")}`, `Mobile: ${v("phone")}`, v("email") && `Email: ${v("email")}`,
      v("buyer") && `Buyer type: ${v("buyer")}`,
      v("date") && `Preferred date: ${new Date(v("date")+"T00:00").toDateString()}`, v("time") && `Preferred time: ${v("time")}`,
      v("message") && `Message: ${v("message")}`,
      `Sent from: ${pageUrl()}`
    ].filter(Boolean).join("\n");
    const url = channel === "wa" ? LINKS.wa(lines) : LINKS.mail(kind==="viewing" ? `Viewing request: ${P.shortTitle}` : `Enquiry: ${P.shortTitle}`, lines);
    window.open(url, channel === "wa" ? "_blank" : "_self");
    form.classList.add("form--sent");
    $("[data-again]", form)?.addEventListener("click", () => { form.reset(); form.classList.remove("form--sent"); });
    if (window.gtag) gtag("event", "generate_lead", { form: kind, channel });
  });
});

/* ---------- Sub-nav active state ---------- */
const sublinks = $$(".subnav a");
if (sublinks.length && "IntersectionObserver" in window) {
  const io = new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting) sublinks.forEach(a => a.classList.toggle("is-active", a.getAttribute("href") === "#"+en.target.id)); }), {rootMargin:"-45% 0px -50% 0px"});
  sublinks.forEach(a => { const t = $(a.getAttribute("href")); t && io.observe(t); });
}

/* ---------- Reveal on scroll ---------- */
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); } }), {rootMargin:"0px 0px -8% 0px"});
  $$(".reveal").forEach(el => io.observe(el));
} else $$(".reveal").forEach(el => el.classList.add("is-in"));

/* ---------- Image fallback (keeps layout tidy if a stock photo is missing) ---------- */
function bindImgFallback(root=document){ $$("img", root).forEach(im => { const f = () => im.parentElement && im.parentElement.classList.add("img-missing"); if (im.complete && im.naturalWidth === 0 && im.getAttribute("src")) f(); else im.addEventListener("error", f, {once:true}); }); }
bindImgFallback();

/* ---------- Fact sheet auto-print ---------- */
if (document.body.dataset.autoprint !== undefined && /[?&]print=1/.test(location.search)) setTimeout(() => window.print(), 600);

/* ---------- Google Analytics (only when an ID is set in config.js) ---------- */
if (S.gaMeasurementId) {
  const s = document.createElement("script"); s.async = true; s.src = `https://www.googletagmanager.com/gtag/js?id=${S.gaMeasurementId}`; document.head.appendChild(s);
  window.dataLayer = window.dataLayer || []; window.gtag = function(){ dataLayer.push(arguments); }; gtag("js", new Date()); gtag("config", S.gaMeasurementId);
}
})();
