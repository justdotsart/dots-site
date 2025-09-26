// app/terms/page.js
import TermsClient from "./TermsClient";

export const metadata = {
  title: "Sweepstakes Terms · DOTS",
  description: "Terms and conditions for DOTS sweepstakes / rifas.",
};

export default function TermsPage() {
  // Server component: sólo renderiza el cliente que maneja el toggle de idioma.
  return (
    <main className="relative min-h-screen text-white overflow-hidden starry-bg">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <TermsClient />
      </div>
    </main>
  );
}
