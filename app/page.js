"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

/* ===== Ajustes rápidos ===== */
const AUTO_INTERVAL_MS = 1800;
const RESPECT_REDUCED_MOTION = false;
const LOGO_CLASS = "h-20 w-auto md:h-24";

/* ===== Escalado pixel-art (DOTS 10x14) ===== */
const NATIVE_W = 10;
const NATIVE_H = 14;
const SCALE = 12; // informativo

/* ===== Thumbs reales en /public/dots/* ===== */
const NUM_THUMBS = 41;
const DOTS_THUMBS = Array.from({ length: NUM_THUMBS }, (_, i) => `/dots/${i + 1}.png`);

/* ===== Placeholders deterministas ===== */
const PLACEHOLDER_DOTS = Array.from({ length: 24 }).map((_, i) => ({
  id: i + 1,
  hue: (i * 137) % 360,
  seed: ((i * 9301) % 233280) / 233280,
}));

/* ===== Conjuntos controlables para evitar duplicados =====
   Cámbialos aquí si quieres otras imágenes arriba/abajo.
*/
const TOP_DOT_IDS = [1, 2, 3, 4, 5, 6, 7, 8]; // los 8 del hero (derecha)
const DESIRED_BOTTOM_IDS = [10, 11, 12]; // preferencia para los 3 de sweepstakes

// asegura que los ids de abajo no repitan con los de arriba; si hay solapamiento,
// completa con los siguientes ids disponibles (1..NUM_THUMBS)
function computeBottomIds(topIds = [], desired = [], total = NUM_THUMBS) {
  const used = new Set(topIds);
  const result = [];
  for (const id of desired) {
    if (!used.has(id) && id >= 1 && id <= total) result.push(id);
  }
  // rellenar si hizo falta
  for (let i = 1; i <= total && result.length < desired.length; i++) {
    if (!used.has(i) && !result.includes(i)) result.push(i);
  }
  return result.slice(0, desired.length);
}

const BOTTOM_DOT_IDS = computeBottomIds(TOP_DOT_IDS, DESIRED_BOTTOM_IDS, NUM_THUMBS);

/* ========================= Canvas-based DotImage =========================
   Dibuja la imagen en un <canvas> con imageSmoothingEnabled = false para escalado "nítido/pixel-perfect".
   Props:
    - src
    - scale (opcional, entero)
    - targetWidth (opcional, px) -> calcula un scale entero cercano
    - alt, className
*/
function DotImage({ src = "/dots/1.png", scale, targetWidth, alt = "", className = "" }) {
  const canvasRef = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const img = new Image();
    img.src = src;
    img.crossOrigin = "anonymous";
    img.onload = () => {
      if (cancelled) return;
      const iw = img.naturalWidth || img.width || 1;
      const ih = img.naturalHeight || img.height || 1;
      let useScale = 1;
      if (typeof scale === "number" && scale >= 1) {
        useScale = Math.max(1, Math.floor(scale));
      } else if (targetWidth && iw > 0) {
        useScale = Math.max(1, Math.round(targetWidth / iw));
      }
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = iw * useScale;
      canvas.height = ih * useScale;
      canvas.style.width = `${canvas.width}px`;
      canvas.style.height = `${canvas.height}px`;
      const ctx = canvas.getContext("2d");
      ctx.imageSmoothingEnabled = false;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      setReady(true);
    };
    img.onerror = (e) => {
      if (cancelled) return;
      setReady(false);
      console.warn("DotImage failed to load:", src, e);
    };
    return () => {
      cancelled = true;
    };
  }, [src, scale, targetWidth]);

  const ariaHidden = alt ? undefined : true;

  return (
    <canvas
      ref={canvasRef}
      role={alt ? "img" : undefined}
      aria-hidden={ariaHidden}
      aria-label={alt || undefined}
      className={className}
      style={{ display: "inline-block", verticalAlign: "middle" }}
    />
  );
}

export default function DotsCosmicPoster() {
  const [lang, setLang] = useState("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main className="relative min-h-screen text-white overflow-hidden starry-bg" suppressHydrationWarning>
      <Header lang={lang} setLang={setLang} />
      <Hero lang={lang} />

      {/* sweepstakes block justo debajo del Hero */}
      <DotsSweepstakes lang={lang} />

      <KeyFacts lang={lang} />
      {mounted && <MiniGallery lang={lang} />}
      <CTASection lang={lang} />
      <Footer />
    </main>
  );
}

/* ========================= Header ========================= */
function Header({ lang, setLang }) {
  return (
    <header className="w-full sticky top-0 z-20 bg-black/40 backdrop-blur border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3">
          <Logo />
        </a>

        <div className="flex items-center gap-3">
          <a
            href="#mint"
            className="rounded-2xl px-3 py-1.5 bg-white text-black text-sm font-semibold hover:bg-white/90"
          >
            {lang === "es" ? "Mint pronto" : "Mint soon"}
          </a>
          <LangToggle lang={lang} setLang={setLang} />
        </div>
      </div>
    </header>
  );
}

function LangToggle({ lang, setLang }) {
  return (
    <button
      onClick={() => setLang((l) => (l === "es" ? "en" : "es"))}
      className="rounded-xl px-2 py-1 border border-white/20 text-xs text-white/70 hover:text-white hover:border-white/40"
      aria-label="Toggle language"
    >
      {lang.toUpperCase()}
    </button>
  );
}

// Logo
function Logo() {
  const CANDIDATES = ["/logo.png", "/logo.svg", "/logo.PNG", "/logo.webp"];
  const [i, setI] = useState(0);
  const [failed, setFailed] = useState(false);
  const src = CANDIDATES[i];

  return (
    <div className="flex items-center gap-2 min-h-8">
      {!failed ? (
        <img
          src={src}
          alt="DOTS logo"
          className={`${LOGO_CLASS} select-none`}
          onError={() => {
            if (i < CANDIDATES.length - 1) setI((n) => n + 1);
            else setFailed(true);
          }}
          draggable={false}
        />
      ) : (
        <>
          <div className="w-3 h-3 rounded-full bg-white animate-pulse" />
          <span className="font-semibold tracking-wide">DOTS</span>
        </>
      )}
    </div>
  );
}

/* ========================= Hero (8 dots aligned right, closer to header) */
function Hero({ lang }) {
  return (
    // reducimos un poco el padding-top para compactar zona del header
    <section className="relative max-w-6xl mx-auto px-4 pt-12 md:pt-16 pb-12">
      {/* 8 DOTs decorativos alineados a la derecha, menos espacio con header */}
      <div className="flex justify-end items-center gap-2 mb-10 -mt-12" aria-hidden>
        {TOP_DOT_IDS.map((i) => (
          // targetWidth 48 para mantener mismo tamaño que antes (aprox w-12)
          <DotImage key={i} src={`/dots/${i}.png`} targetWidth={48} />
        ))}
      </div>

      <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight">
        Every dot is a star. <span className="text-white/70">On Bitcoin.</span>
      </h1>

      <p className="mt-4 text-white/80 max-w-3xl text-xl md:text-2xl">
        {lang === "es" ? (
          <>
            <strong>1,100,000 criaturas. </strong>La colección de PFPs más grande de la historia.
            Nacidos en <strong>Bitcoin</strong>. Viajando eternamente por su red de nodos.
          </>
        ) : (
          <>
            <strong>1,100,000 creatures. </strong>The biggest PFP collection ever.
            Born on <strong>Bitcoin</strong>. Moving endlessly across its node network.
          </>
        )}
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        <a id="mint" href="#" className="rounded-2xl px-5 py-3 bg-white text-black font-semibold hover:bg-white/90" aria-disabled>
          {lang === "es" ? "Mint (pronto)" : "Mint (soon)"}
        </a>
      </div>
    </section>
  );
}

/* ========================= Key Facts ========================= */
function KeyFacts({ lang }) {
  const items = useMemo(
    () => [
      { k: lang === "es" ? "Supply" : "Supply", v: "1,100,000" },
      { k: lang === "es" ? "Seres" : "Types", v: "10" },
      { k: lang === "es" ? "Rasgos" : "Traits", v: lang === "es" ? "Muchos" : "A lot" },
      { k: lang === "es" ? "Red" : "Network", v: "Bitcoin" },
      { k: "Wen", v: "Soon" },
    ],
    [lang]
  );

  return (
    <section id="facts" className="max-w-6xl mx-auto px-4 pb-10">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {items.map((it, idx) => (
          <div key={`fact-${idx}`} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center">
            <div className="text-xs uppercase tracking-widest text-white/60">{it.k}</div>
            <div className="mt-1 text-3xl md:text-4xl font-bold">{it.v}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ========================= MiniGallery (sin cambios) */
function Thumb({ src, alt, width = 160, height = 224 }) {
  const [ok, setOk] = useState(true);
  const [currentSrc, setCurrentSrc] = useState(src);
  return ok ? (
    <img
      src={currentSrc}
      alt={alt}
      width={width}
      height={height}
      style={{ imageRendering: "pixelated" }}
      className="block"
      draggable={false}
      onError={() => {
        if (currentSrc.endsWith(".png")) setCurrentSrc(currentSrc.replace(/\.png$/i, ".PNG"));
        else if (currentSrc.endsWith(".PNG")) setCurrentSrc(currentSrc.replace(/\.PNG$/i, ".webp"));
        else setOk(false);
        console.warn("Image not found:", currentSrc);
      }}
    />
  ) : (
    <div className="text-white/60 text-xs">Image not found</div>
  );
}

function MiniGallery({ lang }) {
  const baseItems = DOTS_THUMBS.length ? DOTS_THUMBS : PLACEHOLDER_DOTS;
  const [items, setItems] = useState([]);
  const listRef = useRef(null);
  const trackRef = useRef(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const arr = [...baseItems];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    setItems(arr);
  }, []);

  const renderArr = items.length ? items : baseItems;
  const loopItems = [...renderArr, ...renderArr];
  const baseLen = renderArr.length || 1;

  const cardW = NATIVE_W * SCALE + 16;
  const computeStep = () => {
    const list = listRef.current;
    if (!list) return cardW + 12;
    const firstCard = list.querySelector("[data-card]");
    const gapEl = trackRef.current || list.querySelector("[data-track]");
    const style = gapEl ? window.getComputedStyle(gapEl) : window.getComputedStyle(list);
    const gap = parseFloat(style.columnGap || style.gap || "12");
    return (firstCard?.getBoundingClientRect().width || cardW) + gap;
  };

  useEffect(() => {
    if (!listRef.current) return;
    if (RESPECT_REDUCED_MOTION) {
      if (typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    }

    const list = listRef.current;
    let step = computeStep();
    const onResize = () => { step = computeStep(); };
    window.addEventListener("resize", onResize);

    const id = setInterval(() => {
      if (paused) return;
      const max = list.scrollWidth - list.clientWidth;
      if (max <= 0) return;
      const next = Math.min(list.scrollLeft + step, max);
      if (next >= max - step) {
        list.scrollTo({ left: 0, behavior: "auto" });
      } else {
        list.scrollTo({ left: next, behavior: "smooth" });
      }
    }, AUTO_INTERVAL_MS);

    return () => {
      clearInterval(id);
      window.removeEventListener("resize", onResize);
    };
  }, [paused]);

  const scrollByStep = (dir) => {
    const list = listRef.current;
    if (!list) return;
    const step = computeStep();
    const target = dir === "next" ? list.scrollLeft + step : list.scrollLeft - step;
    list.scrollTo({ left: target, behavior: "smooth" });
  };

  return (
    <section id="gallery" className="max-w-6xl mx-auto px-4 pb-14">
      <div className="flex items-end justify-between mb-4">
        <h2 className="text-xl md:text-2xl font-semibold">{lang === "es" ? "Algunos dots" : "Some dots"}</h2>
        <div className="text-sm text-white/70">{lang === "es" ? "Auto-carrusel • orden aleatorio" : "Auto-carousel • random order"}</div>
      </div>

      <div className="relative" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
        <button type="button" aria-label={lang === "es" ? "Anterior" : "Previous"} onClick={() => scrollByStep("prev")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 ml-[-6px] rounded-full border border-white/20 bg-black/40 backdrop-blur px-3 py-3 hover:bg-black/60 hidden sm:inline-flex">
          <ArrowLeftIcon />
        </button>
        <button type="button" aria-label={lang === "es" ? "Siguiente" : "Next"} onClick={() => scrollByStep("next")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 mr-[-6px] rounded-full border border-white/20 bg-black/40 backdrop-blur px-3 py-3 hover:bg-black/60 hidden sm:inline-flex">
          <ArrowRightIcon />
        </button>

        <div ref={listRef} className="overflow-x-auto snap-x snap-mandatory pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div ref={trackRef} data-track className="flex gap-3 pr-6">
            {loopItems.map((item, idx) => (
              <div key={`card-${idx}`} data-card className="snap-start shrink-0 rounded-2xl border border-white/10 bg-white/5 p-2 flex items-center justify-center"
                   style={{ width: NATIVE_W * SCALE + 16, height: NATIVE_H * SCALE + 16 }}>
                {typeof item === "string" ? (
                  <Thumb src={item} alt={`DOT #${(idx % baseLen) + 1}`} width={NATIVE_W * SCALE} height={NATIVE_H * SCALE} />
                ) : (
                  <PixelDisc hue={item.hue} seed={item.seed} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ========================= Icons, pixel disc & sweepstakes (actualizado: 3 dots encima del texto) */
function ArrowLeftIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}
function ArrowRightIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

function PixelDisc({ hue, seed }) {
  const canvasRef = useRef(null);
  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    const S = 96;
    c.width = S; c.height = S;
    const R = (n) => Math.abs(Math.sin(n * 9999 * seed));
    for (let y = 0; y < S; y++) {
      for (let x = 0; x < S; x++) {
        const dx = x - S / 2; const dy = y - S / 2;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist > S * 0.48) continue;
        const t = R(x * 0.13 + y * 0.17);
        const l = 45 + Math.floor(t * 45);
        ctx.fillStyle = `hsl(${hue}, 70%, ${l}%)`;
        ctx.fillRect(x, y, 1, 1);
      }
    }
  }, [hue, seed]);
  return <canvas ref={canvasRef} className="rounded-xl" aria-hidden="true" />;
}

/* ========================= DotsSweepstakes (actualizado: usa BOTTOM_DOT_IDS) */
function DotsSweepstakes({ lang }) {
  const isES = lang === "es";

  if (isES) {
    return (
      <section className="max-w-6xl mx-auto px-4 pb-8">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-6 md:p-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Mintea DOTS y participa en nuestro <span className="uppercase">GRAN SORTEO</span> — <span className="text-yellow-300 font-extrabold">¡Más de 3 BTC en premios! ¡¡¡300mil dólares!!!</span>
          </h2>

          {/* 3 DOTs pequeños centrados (usando BOTTOM_DOT_IDS para evitar repeticiones) */}
          <div className="flex justify-center gap-4 mt-12 mb-2" aria-hidden>
            {BOTTOM_DOT_IDS.map((i) => (
              <DotImage key={`bot-${i}`} src={`/dots/${i}.png`} targetWidth={64} />
            ))}
          </div>

          <p className="mt-12 text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
            Con <strong>DOTS</strong> no solo mintearás la colección NFT más grande de la historia (≈ 1.100.000 PFPs únicos); también entrarás automáticamente en varios sorteos con premios increíbles: BTCs, Ordinals destacados y más.
          </p>

          <ul className="mt-12 text-left max-w-3xl mx-auto space-y-3 text-base md:text-lg">
            <li><strong>Al 20% del mint:</strong> rifaremos <strong>100 premios de 0.005 BTC</strong> cada uno.</li>
            <li><strong>Al 50% del mint:</strong> rifaremos <strong>5 premios de 0.1 BTC</strong> cada uno, además de Ordinals de colecciones top.</li>
            <li><strong>Al 100%:</strong> rifa final por <strong>1 BTC</strong>, más premios adicionales de 0.1 BTC y Ordinals importantes.</li>
          </ul>

          <p className="mt-12 font-extrabold text-white/100 text-lg md:text-xl">¡MÁS DE <span className="uppercase">$300,000</span> EN PREMIOS! No te quedes sin tu DOT — sé parte de la colección NFT más grande de la historia.</p>

          <p className="mt-3 text-xs text-white/60">
            Consulta <a href="/terms" className="underline">Términos del Sorteo</a> para detalles y requisitos.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-6xl mx-auto px-4 pb-8">
      <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-6 md:p-10 text-center">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
          Mint DOTS & Enter Our <span className="uppercase">BIG RAFFLE</span> — <span className="text-yellow-300 font-extrabold">Over 3 BTC in prizes! More than 300k USD!!</span>
        </h2>

        {/* 3 DOTs pequeños centrados (usando BOTTOM_DOT_IDS para evitar repeticiones) */}
        <div className="flex justify-center gap-4 mt-12 mb-2" aria-hidden>
          {BOTTOM_DOT_IDS.map((i) => (
            <DotImage key={`bot-${i}`} src={`/dots/${i}.png`} targetWidth={64} />
          ))}
        </div>

        <p className="mt-12 text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
          With <strong>DOTS</strong> you won’t just mint the largest NFT collection in history (~1,100,000 unique PFPs); you’ll also be automatically entered into multiple raffles with incredible prizes — BTCs, high-value Ordinals and surprises.
        </p>

        <ul className="mt-12 text-left max-w-3xl mx-auto space-y-3 text-base md:text-lg">
          <li><strong>20% of the mint:</strong> we’ll raffle <strong>100 prizes of 0.005 BTC</strong> each.</li>
          <li><strong>50% of the mint:</strong> we’ll raffle <strong>5 prizes of 0.1 BTC</strong> each, plus several top-tier Ordinals.</li>
          <li><strong>100% completion:</strong> the final raffle for <strong>1 BTC</strong>, plus additional 0.1 BTC prizes and major Ordinals.</li>
        </ul>

        <p className="mt-12 font-extrabold text-white/100 text-lg md:text-xl">OVER <span className="uppercase">$300,000</span> IN PRIZES! Don’t miss your DOT — join the largest NFT collection in history.</p>

        <p className="mt-3 text-xs text-white/60">
          See <a href="/terms" className="underline">Raffles Terms</a> for full details.
        </p>
      </div>
    </section>
  );
}

/* ========================= CTA & Footer ========================= */
function CTASection({ lang }) {
  return (
    <section className="max-w-6xl mx-auto px-4 pb-20">
      <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-6 md:p-10 text-center">
        <h3 className="text-3xl md:text-4xl font-bold">{lang === "es" ? "Únete a la órbita DOTS" : "Join the DOTS orbit"}</h3>
        <p className="text-white/80 mt-3 text-lg md:text-2xl">
          {lang === "es" ? "Seguiremos publicando avances. Anunciaremos la fecha de mint público pronto." : "We’ll keep sharing progress. Public mint date announced soon."}
        </p>

        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <a href="https://x.com/justdots_art" target="_blank" rel="noopener noreferrer" className="rounded-2xl px-5 py-3 bg-white text-black font-semibold hover:bg-white/90">Twitter / X</a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10 text-center text-xs text-white/60 py-8">
      <div className="max-w-6xl mx-auto px-4">© {new Date().getFullYear()} DOTS — Built on Bitcoin. All rights reserved.</div>
    </footer>
  );
}
