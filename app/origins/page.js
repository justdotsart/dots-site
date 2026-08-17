"use client";

import React, { useState } from "react";

const MINT_URL = "https://opensea.io/collection/just-dots-art-rh";
const ORIGINALS_URL =
  "https://ordinals.com/address/bc1p0h5lk9hd0qzqfl0dk03lwrcaxdcxk50mmyejpsfh6gfdnqmj7dksmegvla";
const PARENT_URL =
  "https://ordinals.com/inscription/d2327d871236632272ada27e7254939666b010532a6ab3ea484908d6c6f590aai0";
const DELEGATE_URL =
  "https://ordinals.com/inscription/bebc2c925b1eb4715174444c630a8c08d86b5a030abe4bf579b68aa052443a51i0";

const COPY = {
  en: {
    navHome: "Home",
    navOrigins: "Origins",
    mint: "Mint DOTS",
    eyebrow: "THE STORY BEFORE THE INVASION",
    titleA: "100 CURSED DOTS.",
    titleB: "1.1 MILLION DESCENDANTS.",
    subtitle:
      "A tiny accident in Bitcoin history became the beginning of something much bigger.",
    intro:
      "Long before Just Dots became a population of 1.1 million different characters, there were only 100. They were drawn entirely by hand, inscribed permanently onto Bitcoin in May 2023, and then pushed into one of the strangest chapters in Ordinals history.",
    timeline: ["MAY 2023", "OP_66", "CURSED", "DELEGATED", "1.1M DOTS"],
    sections: [
      {
        n: "01",
        label: "BITCOIN'S VERSION OF NFTs",
        title: "First: what is an Ordinal?",
        body: [
          "The easiest way to understand an Ordinal is to think of it as Bitcoin's version of an NFT.",
          "An image or another digital artifact can be inscribed directly onto a satoshi—the smallest unit of Bitcoin. The inscription becomes part of Bitcoin's permanent transaction history, where anyone can inspect it, verify it and trace where it came from.",
          "That is where the first 100 DOTS were born.",
        ],
      },
      {
        n: "02",
        label: "THE CODE",
        title: "OP_66 turned them into misfits",
        body: [
          "Our original DOTS were inscribed using OP_66. Despite the intimidating name, OP_66 is simply a code—an instruction written inside a Bitcoin transaction.",
          "Bitcoin accepted the transactions and permanently stored their data. But the early software used to catalog Ordinals did not recognize that instruction as part of a standard inscription.",
        ],
        quote:
          "Imagine placing a painting safely inside a museum vault, but using a label the museum's computer cannot understand. The painting still exists. The catalog simply does not know how to register it.",
      },
      {
        n: "03",
        label: "CURSED, NOT ERASED",
        title: "The artifacts the catalog could not see",
        body: [
          "In the early days of Ordinals, several unusual formats appeared that the standard indexer could not catalog normally. The community called these digital misfits cursed inscriptions.",
          "Many were tracked in a separate sequence using negative numbers. OP_66 inscriptions were even stranger: their data existed permanently on Bitcoin, but canonical ord left them unbound—unable to be followed like regular Ordinals.",
          "The original DOTS became part of this chaotic, experimental period. Their early cursed records sit within the sub-20k range. They were real, permanently stored and simply outside the normal catalog.",
        ],
      },
      {
        n: "04",
        label: "PROVENANCE",
        title: "A parent from the cursed era",
        body: [
          "We did not want to erase that history or pretend the originals had never existed.",
          "Instead, we used a recognized cursed inscription from the same era as the parent of the collection. It was inscribed on May 24, 2023 at 21:59:43 UTC and belongs to the sub-10k cursed sequence.",
          "In Ordinals, a parent-child relationship creates verifiable provenance on Bitcoin. It shows that the inscriptions belong to the same family—and that connection cannot simply be added later as an editable database entry.",
        ],
      },
      {
        n: "05",
        label: "THE DOORWAY",
        title: "Every DOT still leads back to its original",
        body: [
          "The 100 DOTS received recognized inscriptions as children of that historic parent, but their cursed origins were never discarded.",
          "Each recognized DOT uses an Ordinals feature called a delegate. Think of the recognized inscription as a doorway and the delegate as the original room behind it.",
          "Open a recognized DOT and click delegate: you can travel directly back to its original OP_66 artifact. Nothing was deleted or overwritten. The connection to the strange piece of Bitcoin history that came first remains intact.",
        ],
      },
      {
        n: "06",
        label: "THE EVOLUTION",
        title: "How 100 became 1.1 million",
        body: [
          "Those 100 handmade characters became the visual DNA of everything that followed.",
          "Their shapes, colors, expressions and tiny personalities inspired more than 300 original traits. Those traits were combined algorithmically—not with artificial intelligence—to create 1.1 million different DOTS.",
          "The scale changed. The technology evolved. The chain expanded. But the idea stayed the same: extremely small characters with enough variation to become an enormous population.",
        ],
      },
    ],
    closing: [
      "From a code the catalog could not understand.",
      "From negative numbers and cursed history.",
      "From 100 handmade ancestors.",
      "To 1.1 million descendants ready to invade Robinhood Chain.",
    ],
    verifyTitle: "Don't trust the story. Verify it.",
    verifyText:
      "Every part of this origin can be inspected directly through the Ordinals explorer.",
    cards: {
      originals: ["ORIGINAL 100", "Explore the complete set of handmade ancestors."],
      parent: ["CURSED PARENT", "View the historic sub-10k parent inscription."],
      delegate: ["DELEGATE EXAMPLE", "Follow a doorway back to an original OP_66 artifact."],
      open: "Open on Ordinals ↗",
    },
    techTitle: "Technical note for the curious",
    techBody:
      "OP_66 is an unrecognized even opcode in this context. The transaction data was recorded on Bitcoin, but canonical ord did not recognize these envelopes as standard bound inscriptions. Delegation allows a recognized inscription to nominate another inscription as the source of its content, while parent-child provenance establishes the collection relationship on-chain.",
    nextTitle: "The next chapter has 1.1 million characters.",
    nextText: "Meet the descendants and help us invade Robinhood Chain.",
  },
  es: {
    navHome: "Inicio",
    navOrigins: "Origen",
    mint: "Mintear DOTS",
    eyebrow: "LA HISTORIA ANTES DE LA INVASIÓN",
    titleA: "100 DOTS MALDITOS.",
    titleB: "1,1 MILLONES DE DESCENDIENTES.",
    subtitle:
      "Un pequeño accidente en la historia de Bitcoin se convirtió en el comienzo de algo mucho más grande.",
    intro:
      "Mucho antes de que Just Dots se convirtiera en una población de 1,1 millones de personajes diferentes, solamente existían 100. Fueron creados completamente a mano, inscritos permanentemente en Bitcoin en mayo de 2023 y empujados hacia uno de los capítulos más extraños de la historia de Ordinals.",
    timeline: ["MAYO 2023", "OP_66", "MALDITOS", "DELEGADOS", "1,1M DOTS"],
    sections: [
      {
        n: "01",
        label: "LOS NFT DE BITCOIN",
        title: "Primero: ¿qué es un Ordinal?",
        body: [
          "La forma más fácil de entender un Ordinal es pensar en él como la versión de un NFT en Bitcoin.",
          "Una imagen u otro artefacto digital puede inscribirse directamente sobre un satoshi, la unidad más pequeña de Bitcoin. La inscripción pasa a formar parte del historial permanente de transacciones de Bitcoin, donde cualquiera puede inspeccionarla, verificarla y rastrear su procedencia.",
          "Allí nacieron los primeros 100 DOTS.",
        ],
      },
      {
        n: "02",
        label: "EL CÓDIGO",
        title: "OP_66 los convirtió en inadaptados",
        body: [
          "Nuestros DOTS originales fueron inscritos utilizando OP_66. Aunque el nombre parece intimidante, OP_66 es simplemente un código: una instrucción escrita dentro de una transacción de Bitcoin.",
          "Bitcoin aceptó las transacciones y almacenó permanentemente sus datos. Pero el software que catalogaba los Ordinals no reconocía esa instrucción como parte de una inscripción estándar.",
        ],
        quote:
          "Imagina una pintura guardada de forma segura dentro de la bóveda de un museo, pero con una etiqueta que su computadora no comprende. La pintura sigue existiendo. El catálogo simplemente no sabe cómo registrarla.",
      },
      {
        n: "03",
        label: "MALDITOS, NO BORRADOS",
        title: "Los artefactos que el catálogo no podía ver",
        body: [
          "Durante los primeros meses de Ordinals aparecieron formatos inusuales que el indexador estándar no podía catalogar normalmente. La comunidad llamó a estos inadaptados digitales cursed inscriptions o inscripciones malditas.",
          "Muchas fueron rastreadas en una secuencia separada con números negativos. Las OP_66 eran aún más extrañas: sus datos existían permanentemente en Bitcoin, pero canonical ord las dejó unbound, sin poder seguirlas como Ordinals normales.",
          "Los DOTS originales quedaron dentro de ese periodo caótico y experimental. Sus primeros registros cursed están en el rango sub-20k. Eran reales, permanentes y simplemente estaban fuera del catálogo normal.",
        ],
      },
      {
        n: "04",
        label: "PROCEDENCIA",
        title: "Un parent de la era maldita",
        body: [
          "No queríamos borrar esa historia ni fingir que los originales nunca habían existido.",
          "Por eso utilizamos una inscripción maldita reconocida de aquella época como parent de la colección. Fue inscrita el 24 de mayo de 2023 a las 21:59:43 UTC y pertenece a la secuencia cursed sub-10k.",
          "En Ordinals, la relación parent-child crea una procedencia verificable en Bitcoin. Demuestra que las inscripciones pertenecen a una misma familia y esa conexión no puede añadirse después como un dato editable.",
        ],
      },
      {
        n: "05",
        label: "LA PUERTA",
        title: "Cada DOT todavía conduce hacia su original",
        body: [
          "Los 100 DOTS recibieron inscripciones reconocidas como children de ese parent histórico, pero sus orígenes malditos nunca fueron descartados.",
          "Cada DOT reconocido utiliza una función de Ordinals llamada delegate. Imagina que la inscripción reconocida es una puerta y el delegate es la habitación original que existe detrás.",
          "Abre un DOT reconocido y pulsa delegate: viajarás directamente hacia su artefacto OP_66 original. Nada fue eliminado ni reemplazado. La conexión con aquel extraño fragmento de la historia de Bitcoin sigue intacta.",
        ],
      },
      {
        n: "06",
        label: "LA EVOLUCIÓN",
        title: "Cómo 100 se convirtieron en 1,1 millones",
        body: [
          "Aquellos 100 personajes hechos a mano se convirtieron en el ADN visual de todo lo que vino después.",
          "Sus formas, colores, expresiones y diminutas personalidades inspiraron más de 300 traits originales. Esos traits fueron combinados mediante un algoritmo—no mediante inteligencia artificial—para crear 1,1 millones de DOTS diferentes.",
          "La escala cambió. La tecnología evolucionó. La cadena se expandió. Pero la idea permaneció: personajes extremadamente pequeños, con suficiente variedad para convertirse en una población gigantesca.",
        ],
      },
    ],
    closing: [
      "De un código que el catálogo no podía comprender.",
      "De números negativos y una historia maldita.",
      "De 100 ancestros creados a mano.",
      "A 1,1 millones de descendientes listos para invadir Robinhood Chain.",
    ],
    verifyTitle: "No confíes en la historia. Verifícala.",
    verifyText:
      "Cada parte de este origen puede inspeccionarse directamente en el explorador de Ordinals.",
    cards: {
      originals: ["LOS 100 ORIGINALES", "Explora el conjunto completo de ancestros hechos a mano."],
      parent: ["PARENT MALDITO", "Visita la histórica inscripción parent sub-10k."],
      delegate: ["EJEMPLO DE DELEGATE", "Cruza una puerta hacia un artefacto OP_66 original."],
      open: "Abrir en Ordinals ↗",
    },
    techTitle: "Nota técnica para los curiosos",
    techBody:
      "OP_66 es, en este contexto, un opcode par no reconocido. Los datos de las transacciones fueron registrados en Bitcoin, pero canonical ord no reconoció estos envelopes como inscripciones estándar vinculadas. La delegación permite que una inscripción reconocida designe otra como fuente de su contenido, mientras que la procedencia parent-child establece on-chain la relación de la colección.",
    nextTitle: "El siguiente capítulo tiene 1,1 millones de personajes.",
    nextText: "Conoce a los descendientes y ayúdanos a invadir Robinhood Chain.",
  },
};

export default function OriginsPage() {
  const [lang, setLang] = useState("en");
  const t = COPY[lang];

  return (
    <main className="relative min-h-screen overflow-hidden text-white starry-bg">
      <Header lang={lang} setLang={setLang} t={t} />

      <section className="relative mx-auto max-w-6xl px-4 pb-16 pt-14 md:pb-24 md:pt-20">
        <DotRow />
        <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#CBFF00]">{t.eyebrow}</p>
        <h1 className="mt-5 max-w-5xl text-5xl font-black leading-[0.92] tracking-tight md:text-8xl">
          {t.titleA}
          <br />
          <span className="text-[#CBFF00]">{t.titleB}</span>
        </h1>
        <p className="mt-7 max-w-3xl text-xl font-semibold leading-relaxed text-white/85 md:text-2xl">
          {t.subtitle}
        </p>
        <p className="mt-5 max-w-3xl text-base leading-8 text-white/65 md:text-lg">{t.intro}</p>
        <Timeline items={t.timeline} />
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20">
        <div className="space-y-5">
          {t.sections.map((section) => (
            <StorySection key={section.n} section={section} />
          ))}
        </div>
      </section>

      <section className="border-y border-white/10 bg-black/30">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
          <div className="max-w-4xl space-y-3 text-2xl font-black leading-tight md:text-5xl">
            {t.closing.map((line, index) => (
              <p key={line} className={index === t.closing.length - 1 ? "text-[#CBFF00]" : "text-white"}>
                {line}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#CBFF00]">ON-CHAIN PROOF</p>
          <h2 className="mt-4 text-4xl font-black tracking-tight md:text-6xl">{t.verifyTitle}</h2>
          <p className="mt-4 text-lg leading-8 text-white/65">{t.verifyText}</p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <ProofCard title={t.cards.originals[0]} text={t.cards.originals[1]} href={ORIGINALS_URL} cta={t.cards.open} dots={[1, 2, 3]} />
          <ProofCard title={t.cards.parent[0]} text={t.cards.parent[1]} href={PARENT_URL} cta={t.cards.open} dots={[4, 5, 6]} />
          <ProofCard title={t.cards.delegate[0]} text={t.cards.delegate[1]} href={DELEGATE_URL} cta={t.cards.open} dots={[7, 8, 9]} />
        </div>

        <details className="group mt-8 rounded-2xl border border-white/10 bg-white/5 p-5 md:p-7">
          <summary className="cursor-pointer list-none font-bold text-white/85 marker:hidden">
            <span className="flex items-center justify-between gap-4">
              {t.techTitle}
              <span className="text-2xl text-[#CBFF00] transition-transform group-open:rotate-45">+</span>
            </span>
          </summary>
          <div className="mt-5 border-t border-white/10 pt-5 text-sm leading-7 text-white/60">
            <p>{t.techBody}</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <ReferenceLink href="https://docs.ordinals.com/inscriptions.html">Inscriptions ↗</ReferenceLink>
              <ReferenceLink href="https://docs.ordinals.com/inscriptions/delegate.html">Delegates ↗</ReferenceLink>
              <ReferenceLink href="https://docs.ordinals.com/guides/wallet.html">Parent-child ↗</ReferenceLink>
            </div>
          </div>
        </details>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20">
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-7 text-center md:p-12">
          <div className="flex justify-center"><DotStrip /></div>
          <h2 className="mt-7 text-3xl font-black tracking-tight md:text-5xl">{t.nextTitle}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/70">{t.nextText}</p>
          <a href={MINT_URL} target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex rounded-2xl bg-white px-6 py-3 font-bold text-black hover:bg-[#CBFF00]">
            {t.mint}
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function Header({ lang, setLang, t }) {
  return (
    <header className="sticky top-0 z-30 w-full border-b border-white/10 bg-black/50 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <a href="/" className="flex min-h-8 items-center gap-2">
          <Logo />
        </a>
        <nav className="flex items-center gap-2 sm:gap-3">
          <a href="/" className="hidden rounded-xl px-2 py-1 text-xs font-semibold uppercase tracking-wider text-white/60 hover:text-white sm:inline-flex">
            {t.navHome}
          </a>
          <span className="rounded-xl border border-[#CBFF00]/30 bg-[#CBFF00]/10 px-2 py-1 text-xs font-bold uppercase tracking-wider text-[#CBFF00]">
            {t.navOrigins}
          </span>
          <a href={MINT_URL} target="_blank" rel="noopener noreferrer" className="rounded-2xl bg-white px-3 py-1.5 text-sm font-semibold text-black hover:bg-[#CBFF00]">
            {t.mint}
          </a>
          <button onClick={() => setLang(lang === "en" ? "es" : "en")} className="rounded-xl border border-white/20 px-2 py-1 text-xs text-white/70 hover:border-white/40 hover:text-white" aria-label="Toggle language">
            {lang.toUpperCase()}
          </button>
        </nav>
      </div>
    </header>
  );
}

function Logo() {
  const candidates = ["/logo.png", "/logo.svg", "/logo.PNG", "/logo.webp"];
  const [index, setIndex] = useState(0);
  const [failed, setFailed] = useState(false);
  return !failed ? (
    <img
      src={candidates[index]}
      alt="DOTS logo"
      className="h-20 w-auto select-none md:h-24"
      onError={() => {
        if (index < candidates.length - 1) setIndex((current) => current + 1);
        else setFailed(true);
      }}
      draggable={false}
    />
  ) : (
    <><span className="h-3 w-3 rounded-full bg-white" /><span className="font-semibold tracking-wide">DOTS</span></>
  );
}

function DotRow() {
  return (
    <div className="mb-10 flex items-end gap-2" aria-hidden="true">
      {[1, 2, 3, 4, 5, 6].map((id, index) => (
        <img key={id} src={`/dots/${id}.png`} alt="" className={index % 2 ? "h-14 w-auto" : "h-11 w-auto"} style={{ imageRendering: "pixelated" }} />
      ))}
    </div>
  );
}

function DotStrip() {
  return (
    <div className="flex items-end gap-2" aria-hidden="true">
      {[10, 11, 12, 13, 14, 15, 16].map((id, index) => (
        <img key={id} src={`/dots/${id}.png`} alt="" className={index % 3 === 0 ? "h-16 w-auto" : "h-12 w-auto"} style={{ imageRendering: "pixelated" }} />
      ))}
    </div>
  );
}

function Timeline({ items }) {
  return (
    <div className="mt-12 overflow-x-auto pb-2">
      <div className="flex min-w-[720px] items-center">
        {items.map((item, index) => (
          <React.Fragment key={item}>
            <div className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-bold tracking-widest text-white/75">{item}</div>
            {index < items.length - 1 && <div className="h-px min-w-10 flex-1 bg-gradient-to-r from-white/20 to-[#CBFF00]/60" />}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

function StorySection({ section }) {
  return (
    <article className="grid gap-5 rounded-3xl border border-white/10 bg-white/[0.045] p-6 md:grid-cols-[120px_1fr] md:gap-8 md:p-10">
      <div>
        <div className="text-5xl font-black text-[#CBFF00] md:text-6xl">{section.n}</div>
        <div className="mt-2 text-[10px] font-bold uppercase tracking-[0.22em] text-white/45">{section.label}</div>
      </div>
      <div className="max-w-3xl">
        <h2 className="text-3xl font-black tracking-tight md:text-5xl">{section.title}</h2>
        <div className="mt-5 space-y-4 text-base leading-8 text-white/[0.68] md:text-lg">
          {section.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
        {section.quote && <blockquote className="mt-7 border-l-2 border-[#CBFF00] pl-5 text-lg font-semibold italic leading-8 text-white/85 md:text-xl">{section.quote}</blockquote>}
      </div>
    </article>
  );
}

function ProofCard({ title, text, href, cta, dots }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="group flex min-h-64 flex-col rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:-translate-y-1 hover:border-[#CBFF00]/60 hover:bg-white/[0.08]">
      <div className="flex h-20 items-end gap-1 overflow-hidden" aria-hidden="true">
        {dots.map((id) => <img key={id} src={`/dots/${id}.png`} alt="" className="h-16 w-auto" style={{ imageRendering: "pixelated" }} />)}
      </div>
      <h3 className="mt-6 text-xl font-black">{title}</h3>
      <p className="mt-2 flex-1 text-sm leading-6 text-white/60">{text}</p>
      <span className="mt-5 text-sm font-bold text-[#CBFF00]">{cta}</span>
    </a>
  );
}

function ReferenceLink({ href, children }) {
  return <a href={href} target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/15 px-3 py-1.5 text-xs font-semibold text-white/65 hover:border-[#CBFF00]/50 hover:text-[#CBFF00]">{children}</a>;
}

function Footer() {
  return (
    <footer className="border-t border-white/10 py-8 text-center text-xs text-white/50">
      <div className="mx-auto max-w-6xl px-4">© {new Date().getFullYear()} DOTS — Born on Bitcoin. Expanding on <span className="text-[#CBFF00]">Robinhood Chain</span>.</div>
    </footer>
  );
}
