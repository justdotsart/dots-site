"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

/* ===== Ajustes rápidos ===== */
const AUTO_INTERVAL_MS = 1800;        // velocidad auto-carrusel (ms entre pasos)
const RESPECT_REDUCED_MOTION = false; // true: respeta prefers-reduced-motion
const LOGO_CLASS = "h-20 w-auto md:h-24"; // h-18 no existe en Tailwind (usa h-20/h-24/etc)

/* ===== Escalado pixel-art (DOTS 10x14) ===== */
const NATIVE_W = 10;
const NATIVE_H = 14;
const SCALE = 12; // 12 => 120x168

/* ===== Thumbs reales en /public/dots/* ===== */
// Genera /dots/1.png ... /dots/41.png automáticamente
const NUM_THUMBS = 41;
const DOTS_THUMBS = Array.from({ length: NUM_THUMBS }, (_, i) => `/dots/${i + 1}.png`);

/* ===== Placeholders deterministas (sin Math.random para evitar hydration mismatch) ===== */
const PLACEHOLDER_DOTS = Array.from({ length: 24 }).map((_, i) => ({
  id: i + 1,
  hue: (i * 137) % 360,
  seed: ((i * 9301) % 233280) / 233280,
}));

export default function DotsCosmicPoster() {
  const [lang, setLang] = useState("en");
  const [mounted, setMounted] = useState(false); // para evitar randomness antes de hidratar

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main
      className="relative min-h-screen text-white overflow-hidden starry-bg"
      suppressHydrationWarning
    >
      {/* Fondo ahora es solo CSS: .starry-bg (definida en globals.css) */}
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

        {/* Nav eliminado */}

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

// Logo grande (usa /public/logo.png o /public/logo.svg)
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
    <section className="relative max-w-6xl mx-auto px-4 pt-16 md:pt-24 pb-12">
      <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
        <>Every dot is a star. <span className="text-white/70">On Bitcoin.</span></>
      </h1>

      {/* Subtexto (versión solicitada) – más grande */}
      <p className="mt-4 text-white/80 max-w-3xl text-lg md:text-xl">
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
        <a
          id="mint"
          href="#"
          className="rounded-2xl px-5 py-3 bg-white text-black font-semibold hover:bg-white/90"
          aria-disabled
        >
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
      { k: "Wen", v: "Soon" }, // meme
    ],
    [lang]
  );

  return (
    <section id="facts" className="max-w-6xl mx-auto px-4 pb-10">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {items.map((it, idx) => (
          <div
            key={`fact-${idx}`}
            className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center"
          >
            <div className="text-xs uppercase tracking-widest text-white/60">{it.k}</div>
            <div className="mt-1 text-2xl font-bold">{it.v}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ========================= MiniGallery (random + autoplay + botones) ========================= */
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
  const [items, setItems] = useState([]); // randomized once
  const listRef = useRef(null);
  const trackRef = useRef(null);
  const [paused, setPaused] = useState(false);

  // Randomize order on mount (solo en cliente)
  useEffect(() => {
    const arr = [...baseItems];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    setItems(arr);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderArr = items.length ? items : baseItems;
  const loopItems = [...renderArr, ...renderArr]; // duplicado para loop
  const baseLen = renderArr.length || 1;

  const cardW = NATIVE_W * SCALE + 16; // ancho interior
  const computeStep = () => {
    const list = listRef.current;
    if (!list) return cardW + 12;
    const firstCard = list.querySelector("[data-card]");
    const gapEl = trackRef.current || list.querySelector("[data-track]");
    const style = gapEl ? window.getComputedStyle(gapEl) : window.getComputedStyle(list);
    const gap = parseFloat(style.columnGap || style.gap || "12");
    return (firstCard?.getBoundingClientRect().width || cardW) + gap;
  };

  // Auto-play horizontal scroll
  useEffect(() => {
    if (!listRef.current) return;

    if (RESPECT_REDUCED_MOTION) {
      if (
        typeof window !== "undefined" &&
        window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        return;
      }
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

  // Controles manuales
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
        <h2 className="text-xl md:text-2xl font-semibold">
          {lang === "es" ? "Algunos dots" : "Some dots"}
        </h2>
        <div className="text-sm text-white/70">
          {lang === "es" ? "Auto-carrusel • orden aleatorio" : "Auto-carousel • random order"}
        </div>
      </div>

      <div
        className="relative"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Botones (desktop) */}
        <button
          type="button"
          aria-label={lang === "es" ? "Anterior" : "Previous"}
          onClick={() => scrollByStep("prev")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 ml-[-6px] rounded-full border border-white/20 bg-black/40 backdrop-blur px-3 py-3 hover:bg-black/60 hidden sm:inline-flex"
        >
          <ArrowLeftIcon />
        </button>
        <button
          type="button"
          aria-label={lang === "es" ? "Siguiente" : "Next"}
          onClick={() => scrollByStep("next")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 mr-[-6px] rounded-full border border-white/20 bg-black/40 backdrop-blur px-3 py-3 hover:bg-black/60 hidden sm:inline-flex"
        >
          <ArrowRightIcon />
        </button>

        {/* Track */}
        <div
          ref={listRef}
          className="overflow-x-auto snap-x snap-mandatory pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <div ref={trackRef} data-track className="flex gap-3 pr-6">
            {loopItems.map((item, idx) => (
              <div
                key={`card-${idx}`}
                data-card
                className="snap-start shrink-0 rounded-2xl border border-white/10 bg-white/5 p-2 flex items-center justify-center"
                style={{ width: NATIVE_W * SCALE + 16, height: NATIVE_H * SCALE + 16 }}
              >
                {typeof item === "string" ? (
                  <Thumb
                    src={item}
                    alt={`DOT #${(idx % baseLen) + 1}`}
                    width={NATIVE_W * SCALE}
                    height={NATIVE_H * SCALE}
                  />
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

/* ========================= Placeholder disc (solo si faltan thumbs) ========================= */
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
        <h3 className="text-2xl md:text-3xl font-bold">
          {lang === "es" ? "Únete a la órbita DOTS" : "Join the DOTS orbit"}
        </h3>
        <p className="text-white/80 mt-3 text-lg md:text-xl">
          {lang === "es"
            ? "Seguiremos publicando avances. Anunciaremos la fecha de mint público pronto."
            : "We’ll keep sharing progress. Public mint date announced soon."}
        </p>

        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <a
            href="https://x.com/justdots_art"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-2xl px-5 py-3 bg-white text-black font-semibold hover:bg-white/90"
          >
            Twitter / X
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10 text-center text-xs text-white/60 py-8">
      <div className="max-w-6xl mx-auto px-4">
        © {new Date().getFullYear()} DOTS — Built on Bitcoin. All rights reserved.
      </div>
    </footer>
  );
}
