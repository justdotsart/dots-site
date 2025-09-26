// app/terms/TermsClient.jsx
"use client";

import React, { useState } from "react";

export default function TermsClient() {
  const [lang, setLang] = useState("en");
  const isES = lang === "es";

  return (
    <div>
      {/* Language toggle */}
      <div className="flex justify-end mb-6">
        <button
          onClick={() => setLang((l) => (l === "es" ? "en" : "es"))}
          className="rounded-xl px-3 py-1 border border-white/10 text-sm text-white/80 hover:text-white"
        >
          {lang === "es" ? "EN" : "ES"}
        </button>
      </div>

      <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/8 to-white/3 p-6 md:p-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          {isES ? "Términos del Sorteo (Rifas) — DOTS" : "Raffles Terms — DOTS"}
        </h1>

        <p className="text-sm text-white/60 mb-6">
          {isES ? "Última actualización: Sep 2025 — Lee con atención antes de participar."
                : "Last updated: Sep 2025 — Please read carefully before participating."}
        </p>

        {/* Quick summary */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">{isES ? "Resumen rápido" : "Quick summary"}</h2>
          <p className="text-white/90">
            {isES ? (
              <>
                Para que cada rifa se lleve a cabo debe alcanzarse la meta de mint correspondiente
                (p. ej. 20%, 50% o 100% del total). Cada DOT minteado durante el proceso de mint
                actúa como entrada para las rifas asociadas a las metas alcanzadas.
              </>
            ) : (
              <>
                Each raffle will be executed <strong>only after</strong> the corresponding mint milestone is reached
                (e.g. 20%, 50% or 100% of the total mint). Every DOT minted during the public mint
                acts as an entry for the raffles linked to the milestones that are achieved.
              </>
            )}
          </p>
        </section>

        {/* Eligibility */}
        <section className="mb-6">
          <h3 className="text-lg font-semibold mb-2">{isES ? "1. Elegibilidad" : "1. Eligibility"}</h3>
          <ul className="list-disc pl-5 text-white/90 space-y-2">
            <li>{isES ? "Pueden participar personas mayores de edad según su jurisdicción local."
                        : "Participants must be of legal age in their local jurisdiction."}</li>
            <li>{isES ? "No se permiten cuentas o prácticas fraudulentas; la organización se reserva el derecho de descalificar."
                        : "No fraudulent accounts or behavior are allowed; the organizer reserves the right to disqualify."}</li>
          </ul>
        </section>

        {/* How to enter */}
        <section className="mb-6">
          <h3 className="text-lg font-semibold mb-2">{isES ? "2. Cómo participar" : "2. How to enter"}</h3>
          <p className="text-white/90 mb-3">
            {isES ? "La forma principal de entrada es a través del mint público de DOTS. Cada DOT mintado durante el periodo de mint se considera una entrada válida para las rifas correspondientes a la meta alcanzada."
                  : "The primary way to enter is by publicly minting DOTS. Each DOT minted during the mint window counts as one valid entry into the raffles tied to the milestone reached."}
          </p>

          <div className="bg-white/5 p-4 rounded-lg border border-white/6">
            <strong className="block mb-2">{isES ? "Hitos y premios" : "Milestones & prizes"}</strong>
            <ul className="list-disc pl-5 text-white/90 space-y-2">
              <li>{isES ? "Al 20% del mint: rifaremos 100 premios de 0.005 BTC cada uno." : "At 20%: we’ll raffle 100 prizes of 0.005 BTC each."}</li>
              <li>{isES ? "Al 50%: rifaremos 5 premios de 0.1 BTC cada uno + Ordinals seleccionados." : "At 50%: we’ll raffle 5 prizes of 0.1 BTC each + selected high-value Ordinals."}</li>
              <li>{isES ? "Al 100%: rifa final por 1 BTC + premios adicionales de 0.1 BTC y Ordinals de alto valor." : "At 100% completion: the final raffle for 1 BTC + additional 0.1 BTC prizes and major Ordinals."}</li>
            </ul>
          </div>
        </section>

        {/* Raffle trigger */}
        <section className="mb-6">
          <h3 className="text-lg font-semibold mb-2">{isES ? "3. Activación de la rifa" : "3. Raffle trigger"}</h3>
          <p className="text-white/90">
            {isES ? "Una rifa solo se realizará cuando el porcentaje de mint correspondiente sea alcanzado y confirmemos la métrica con nuestro backend y los datos on-chain. Si la meta no se alcanza, la rifa queda pendiente hasta que se cumpla."
                  : "A raffle will only be executed once the corresponding mint percentage has been reached and confirmed by our backend and on-chain data. If a milestone is not reached, that raffle remains pending until it is."}
          </p>
        </section>

        {/* Winner selection */}
        <section className="mb-6">
          <h3 className="text-lg font-semibold mb-2">{isES ? "4. Selección y notificación de ganadores" : "4. Winner selection & notification"}</h3>
          <ul className="list-disc pl-5 text-white/90 space-y-2">
            <li>{isES ? "Los ganadores se seleccionarán al azar mediante un proceso verificable y documentado." : "Winners will be selected at random via a documented and verifiable procedure."}</li>
            <li>{isES ? "Notificaremos a los ganadores vía la dirección de wallet asociada a su DOT, o mediante el canal de contacto que proporcionen cuando reclamen el premio."
                        : "We will notify winners via the wallet address associated with their DOT, or via contact details they provide when claiming the prize."}</li>
            <li>{isES ? "Los ganadores dispondrán de un plazo para reclamar; si no reclaman dentro del plazo, el premio podrá ser reasignado."
                        : "Winners will have a limited time to claim their prize; unclaimed prizes may be reassigned."}</li>
          </ul>
        </section>

        {/* Claiming prizes */}
        <section className="mb-6">
          <h3 className="text-lg font-semibold mb-2">{isES ? "5. Reclamo y entrega" : "5. Claiming & delivery"}</h3>
          <p className="text-white/90 mb-2">{isES ? "Para recibir el premio, el ganador deberá:" : "To receive a prize, the winner must:"}</p>
          <ul className="list-disc pl-5 text-white/90 space-y-2">
            <li>{isES ? "Proporcionar la dirección de wallet Bitcoin donde desea recibir el premio (u otro método acordado)." : "Provide the Bitcoin wallet address where they want to receive the prize (or an agreed alternative)."}</li>
            <li>{isES ? "Aceptar los términos adicionales de verificación (p. ej. pruebas de propiedad del DOT, KYC limitado si aplica por montos altos)." : "Accept any additional verification requirements (e.g. proof of DOT ownership, limited KYC for high-value prizes)."}</li>
            <li>{isES ? "DOTS / el equipo no se hace responsable de direcciones erróneas proporcionadas por el ganador." : "DOTS / the team are not responsible for incorrectly provided addresses by the winner."}</li>
          </ul>
        </section>

        {/* Taxes */}
        <section className="mb-6">
          <h3 className="text-lg font-semibold mb-2">{isES ? "6. Impuestos y costes" : "6. Taxes & fees"}</h3>
          <p className="text-white/90">
            {isES ? "Los premios pueden estar sujetos a impuestos o retenciones según la jurisdicción del ganador. El ganador es responsable de cualquier obligación fiscal asociada. DOTS podrá requerir información fiscal para entregar premios de alto valor."
                  : "Prizes may be subject to taxes or withholdings according to the winner’s jurisdiction. The winner is responsible for any tax liabilities. DOTS may request tax information for high-value awards."}
          </p>
        </section>

        {/* Disqualification */}
        <section className="mb-6">
          <h3 className="text-lg font-semibold mb-2">{isES ? "7. Descalificación y fraude" : "7. Disqualification & fraud"}</h3>
          <p className="text-white/90">
            {isES ? "Nos reservamos el derecho de descalificar entradas que resulten fraudulentas o manipuladas, así como de tomar medidas legales si fuese necesario."
                  : "We reserve the right to disqualify entries that are fraudulent or manipulated, and to take legal action if necessary."}
          </p>
        </section>

        {/* Changes & cancellation */}
        <section className="mb-6">
          <h3 className="text-lg font-semibold mb-2">{isES ? "8. Cambios y cancelación" : "8. Changes & cancellation"}</h3>
          <p className="text-white/90">
            {isES ? "DOTS se reserva el derecho de modificar las reglas del sorteo, ajustar premios o cancelar las rifas por causas técnicas, legales o de fuerza mayor. Cualquier cambio será comunicado por los canales oficiales."
                  : "DOTS reserves the right to modify raffle rules, adjust prizes, or cancel raffles due to technical, legal or force-majeure reasons. Any change will be announced via official channels."}
          </p>
        </section>

        {/* Liability */}
        <section className="mb-6">
          <h3 className="text-lg font-semibold mb-2">{isES ? "9. Responsabilidad" : "9. Liability"}</h3>
          <p className="text-white/90">
            {isES ? "En la máxima medida permitida por la ley, DOTS no será responsable por daños indirectos, pérdida de datos, lucro cesante, o cualquier daño derivado de la participación en las rifas."
                  : "To the fullest extent permitted by law, DOTS shall not be liable for indirect damages, data loss, lost profits, or any damages arising from participation in the raffles."}
          </p>
        </section>

        {/* Contact */}
        <section className="mb-2">
          <h3 className="text-lg font-semibold mb-2">{isES ? "Contacto" : "Contact"}</h3>
          <p className="text-white/90">
            {isES ? "Si tienes dudas sobre los términos, escribe a " : "If you have questions about the terms, email "}
            <a className="underline" href="mailto:hello@justdots.art">hello@justdots.art</a>
          </p>
        </section>

        <p className="text-xs text-white/60 mt-6">
          {isES ? "Estos términos son un resumen general. En caso de divergencia, prevalecerá la versión oficial publicada por DOTS."
                 : "These terms are a general summary. The official DOTS published terms prevail in case of discrepancy."}
        </p>
      </div>
    </div>
  );
}
