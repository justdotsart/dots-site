"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

/* ===== Ajustes rápidos ===== */
const AUTO_INTERVAL_MS = 1800;
const RESPECT_REDUCED_MOTION = false;
const LOGO_CLASS = "h-20 w-auto md:h-24";

/* ===== Link oficial de la colección / mint ===== */
const MINT_URL = "https://opensea.io/collection/just-dots-art-rh";

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

/* ===== DOTS visibles en el hero ===== */
const TOP_DOT_IDS = [1, 2, 3, 4, 5, 6];

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
          {/* Botón Mint DOTS — mismo estilo, abre el link final en nueva pestaña */}
          <a
            href={MINT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-2xl px-3 py-1.5 bg-white text-black text-sm font-semibold hover:bg-white/90"
            aria-label="Mint DOTS"
          >
            Mint DOTS
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

/* ========================= Hero ========================= */
function Hero({ lang }) {
  return (
    <section className="relative max-w-6xl mx-auto px-4 pt-12 md:pt-16 pb-12">
      <div className="flex justify-end items-center gap-2 mb-10 -mt-12" aria-hidden>
        {TOP_DOT_IDS.map((i) => (
          <DotImage key={i} src={`/dots/${i}.png`} targetWidth={48} />
        ))}
      </div>

      <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight">
        {lang === "es" ? "Cada dot es una estrella. " : "Every dot is a star. "}
        <span className="text-white/70">{lang === "es" ? "En Robinhood." : "On Robinhood."}</span>
      </h1>

      <p className="mt-4 text-white/80 max-w-3xl text-xl md:text-2xl">
        {lang === "es" ? (
          <>
            <strong>1.100.000 criaturas. </strong>La colección de PFPs más grande jamás creada.
            Vive en <strong>Robinhood Chain</strong>. Mintea un DOT aleatorio por solo <strong>1 USD</strong>.
          </>
        ) : (
          <>
            <strong>1,100,000 creatures. </strong>The biggest PFP collection ever created.
            Living on <strong>Robinhood Chain</strong>. Mint a random DOT for just <strong>$1</strong>.
          </>
        )}
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
  <a
    id="mint"
    href={MINT_URL}
    target="_blank"
    rel="noopener noreferrer"
    className="rounded-2xl px-5 py-3 bg-white text-black font-semibold hover:bg-white/90"
    aria-label="Mint DOTS"
  >
    Mint DOTS
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
      { k: lang === "es" ? "Red" : "Network", v: "Robinhood" },
      { k: lang === "es" ? "Precio" : "Price", v: "$1" },
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

/* ========================= Icons & pixel disc ========================= */
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

/* ========================= CTA & Footer ========================= */
function CTASection({ lang }) {
  return (
    <section className="max-w-6xl mx-auto px-4 pb-20">
      <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-6 md:p-10 text-center">
        <h3 className="text-3xl md:text-4xl font-bold">
          {lang === "es" ? "Únete a la órbita DOTS" : "Join the DOTS orbit"}
        </h3>
        <p className="text-white/80 mt-3 text-lg md:text-2xl">
          {lang === "es"
            ? "El mint está activo. Obtén un DOT aleatorio por 1 USD en Robinhood Chain."
            : "The mint is live. Get a random DOT for $1 on Robinhood Chain."}
        </p>

        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <a
            href={MINT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-2xl px-5 py-3 bg-white text-black font-semibold hover:bg-white/90"
            aria-label="Mint DOTS on OpenSea"
          >
            Mint DOTS
          </a>

          <a
            href="https://x.com/justdots_art"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-2xl px-5 py-3 bg-white text-black font-semibold hover:bg-white/90 flex items-center gap-2"
            aria-label="Follow DOTS on X / Twitter"
          >
            {/* Twitter / X text */}
            Twitter / X
          </a>

          {/* Telegram button: reemplaza el href por el enlace de tu grupo */}
          <a
            href="https://t.me/justdotsart" /* <- pon aquí tu enlace real */
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-2xl px-5 py-3 bg-white text-black font-semibold hover:bg-white/90 flex items-center gap-2"
            aria-label="Join DOTS on Telegram"
          >
            {/* Telegram icon (SVG, inline para no depender de assets) */}
            <svg width="18" height="18" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M120 0C53.73 0 0 53.73 0 120s53.73 120 120 120 120-53.73 120-120S186.27 0 120 0z" fill="#0088cc"/>
              <path d="M178.2 70.7c-1.8 8.4-8.4 39.6-11.4 53.1-2.4 11.1-7.8 15.6-14.4 15.3-7.2-.3-10.8-4.8-19.2-9.3-17.4-9.6-28.8-15.3-41.4-23.4-8.1-5.1-7.8-8.1 1.8-12 3.9-1.8 16.2-5.4 26.1-8.1 9.9-2.7 26.1-7.2 38.4-11.4 2.7-1 5.4-.6 7.8 2.1 2.4 2.7 1.8 5.4.3 9.0z" fill="#fff"/>
            </svg>

            <span className="whitespace-nowrap">{lang === "es" ? "Telegram" : "Telegram"}</span>
          </a>
        </div>
      </div>
    </section>
  );
}


function Footer() {
  return (
    <footer className="border-t border-white/10 text-center text-xs text-white/60 py-8">
      <div className="max-w-6xl mx-auto px-4">© {new Date().getFullYear()} DOTS — Built on Robinhood Chain. All rights reserved.</div>
    </footer>
  );
}
