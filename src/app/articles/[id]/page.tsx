"use client";

import { useParams } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, Share2, Bookmark, Linkedin, Twitter } from "lucide-react";

// Contenu de l'article
const articleContent = {
  id: 1,
  title: "Les 10 réductions d'impôts les plus oubliées par les salariés",
  excerpt: "Découvrez les déductions fiscales que 79% des salariés ne connaissent pas et comment en bénéficier facilement.",
  category: "Déductions fiscales",
  date: "20 décembre 2025",
  readTime: "8 min",
  author: "L'équipe MonFiscalFacile",
  image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2011&auto=format&fit=crop",
};

export default function ArticlePage() {
  const params = useParams();

  return (
    <main className="min-h-screen bg-offwhite">
      <Header />

      {/* Hero de l'article */}
      <section className="relative pt-16">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${articleContent.image}')` }}
        />
        <div className="absolute inset-0 bg-charcoal/75" />
        <div className="relative py-16 px-6">
          <div className="max-w-3xl mx-auto">
            {/* Retour */}
            <Link 
              href="/articles" 
              className="inline-flex items-center gap-2 text-gray-300 hover:text-white mb-8 transition-colors"
            >
              <ArrowLeft size={18} />
              <span>Retour aux articles</span>
            </Link>

            {/* Badge catégorie */}
            <span className="inline-block bg-primary-500 text-white text-sm font-medium px-4 py-1.5 mb-4">
              {articleContent.category}
            </span>

            {/* Titre */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              {articleContent.title}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-6 text-gray-300">
              <span className="flex items-center gap-2">
                <Calendar size={16} />
                {articleContent.date}
              </span>
              <span className="flex items-center gap-2">
                <Clock size={16} />
                {articleContent.readTime} de lecture
              </span>
              <span>Par {articleContent.author}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Contenu de l'article */}
      <article className="py-12 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white border border-gray-200 p-8 md:p-12">
            
            {/* Introduction */}
            <p className="text-lg text-charcoal leading-relaxed mb-8">
              Chaque année, des millions de salariés français passent à côté d'économies d'impôts 
              significatives, simplement parce qu'ils ignorent l'existence de certaines déductions 
              fiscales. Selon nos analyses, <strong>79% des contribuables salariés</strong> ne profitent 
              pas de toutes les réductions auxquelles ils ont droit. Voici les 10 plus importantes.
            </p>

            {/* Sommaire */}
            <div className="bg-gray-50 border-l-4 border-primary-500 p-6 mb-10">
              <h2 className="font-semibold text-charcoal mb-3">Dans cet article :</h2>
              <ol className="text-slate space-y-2 list-decimal list-inside">
                <li>Les frais réels de transport</li>
                <li>Le crédit d'impôt pour emploi à domicile</li>
                <li>Les dons aux associations</li>
                <li>Les frais de télétravail</li>
                <li>Le Plan d'Épargne Retraite (PER)</li>
                <li>Les frais de double résidence</li>
                <li>Les cotisations syndicales</li>
                <li>Les frais de formation professionnelle</li>
                <li>La réduction pour investissement locatif</li>
                <li>Les pensions alimentaires versées</li>
              </ol>
            </div>

            {/* Section 1 */}
            <h2 className="text-2xl font-bold text-charcoal mt-10 mb-4">
              1. Les frais réels de transport
            </h2>
            <p className="text-slate leading-relaxed mb-4">
              Par défaut, l'administration fiscale applique un abattement forfaitaire de 10% sur vos 
              revenus pour tenir compte de vos frais professionnels. Mais si vos frais réels dépassent 
              ce montant, vous pouvez opter pour la déduction des frais réels.
            </p>
            <p className="text-slate leading-relaxed mb-4">
              <strong>Les frais concernés :</strong> trajets domicile-travail (selon le barème 
              kilométrique), frais de péage, frais de stationnement, transports en commun.
            </p>
            <div className="bg-primary-50 p-4 mb-6">
              <p className="text-primary-700 font-medium">
                💡 Exemple : Pour 15 000 km/an avec une voiture de 5 CV, vous pouvez déduire 
                environ 3 900€ au lieu des 10% forfaitaires.
              </p>
            </div>

            {/* Section 2 */}
            <h2 className="text-2xl font-bold text-charcoal mt-10 mb-4">
              2. Le crédit d'impôt pour emploi à domicile
            </h2>
            <p className="text-slate leading-relaxed mb-4">
              Vous employez quelqu'un pour la garde d'enfants, le ménage, le jardinage ou l'aide 
              aux devoirs ? Vous bénéficiez d'un <strong>crédit d'impôt de 50%</strong> des sommes 
              versées, dans la limite de 12 000€ par an (+ 1 500€ par enfant à charge).
            </p>
            <p className="text-slate leading-relaxed mb-4">
              Ce crédit d'impôt est particulièrement avantageux car il vous est remboursé même si 
              vous n'êtes pas imposable.
            </p>

            {/* Section 3 */}
            <h2 className="text-2xl font-bold text-charcoal mt-10 mb-4">
              3. Les dons aux associations
            </h2>
            <p className="text-slate leading-relaxed mb-4">
              Les dons aux organismes d'intérêt général ouvrent droit à une réduction d'impôt de 
              <strong> 66% du montant donné</strong>, dans la limite de 20% du revenu imposable.
            </p>
            <p className="text-slate leading-relaxed mb-4">
              Pour les dons aux organismes d'aide aux personnes en difficulté (Restos du Cœur, 
              Secours Populaire...), le taux monte à <strong>75%</strong> jusqu'à 1 000€.
            </p>
            <div className="bg-primary-50 p-4 mb-6">
              <p className="text-primary-700 font-medium">
                💡 Un don de 100€ à une association caritative ne vous coûte en réalité que 25€ 
                après réduction d'impôt.
              </p>
            </div>

            {/* Section 4 */}
            <h2 className="text-2xl font-bold text-charcoal mt-10 mb-4">
              4. Les frais de télétravail
            </h2>
            <p className="text-slate leading-relaxed mb-4">
              Depuis la généralisation du télétravail, vous pouvez déduire certains frais liés à 
              votre activité à domicile :
            </p>
            <ul className="list-disc list-inside text-slate space-y-2 mb-4 ml-4">
              <li>Quote-part du loyer ou des intérêts d'emprunt</li>
              <li>Électricité, chauffage, internet</li>
              <li>Mobilier de bureau (chaise, bureau, écran...)</li>
              <li>Fournitures de bureau</li>
            </ul>
            <p className="text-slate leading-relaxed mb-4">
              L'administration accepte une déduction forfaitaire de <strong>2,50€ par jour de 
              télétravail</strong>, dans la limite de 580€ par an.
            </p>

            {/* Section 5 */}
            <h2 className="text-2xl font-bold text-charcoal mt-10 mb-4">
              5. Le Plan d'Épargne Retraite (PER)
            </h2>
            <p className="text-slate leading-relaxed mb-4">
              Les versements sur un PER sont <strong>déductibles de votre revenu imposable</strong>, 
              dans la limite de 10% des revenus professionnels (plafond de 35 194€ en 2025).
            </p>
            <p className="text-slate leading-relaxed mb-4">
              Pour un salarié dans la tranche à 30%, un versement de 5 000€ génère une économie 
              d'impôt de 1 500€.
            </p>

            {/* Section 6 */}
            <h2 className="text-2xl font-bold text-charcoal mt-10 mb-4">
              6. Les frais de double résidence
            </h2>
            <p className="text-slate leading-relaxed mb-4">
              Si vous êtes contraint de vivre loin de votre domicile familial pour des raisons 
              professionnelles, vous pouvez déduire les frais de double résidence : loyer du 
              second logement, frais de déplacement hebdomadaires, frais de repas supplémentaires.
            </p>

            {/* Section 7 */}
            <h2 className="text-2xl font-bold text-charcoal mt-10 mb-4">
              7. Les cotisations syndicales
            </h2>
            <p className="text-slate leading-relaxed mb-4">
              Les cotisations versées à un syndicat ouvrent droit à un <strong>crédit d'impôt 
              de 66%</strong> du montant versé, dans la limite de 1% du revenu brut.
            </p>

            {/* Section 8 */}
            <h2 className="text-2xl font-bold text-charcoal mt-10 mb-4">
              8. Les frais de formation professionnelle
            </h2>
            <p className="text-slate leading-relaxed mb-4">
              Les dépenses de formation non remboursées par votre employeur peuvent être déduites 
              de vos revenus : frais d'inscription, achat de manuels, frais de déplacement liés 
              à la formation.
            </p>

            {/* Section 9 */}
            <h2 className="text-2xl font-bold text-charcoal mt-10 mb-4">
              9. La réduction pour investissement locatif
            </h2>
            <p className="text-slate leading-relaxed mb-4">
              Les dispositifs Pinel, Denormandie ou le statut LMNP permettent de bénéficier de 
              réductions d'impôts significatives si vous investissez dans l'immobilier locatif.
            </p>
            <p className="text-slate leading-relaxed mb-4">
              Le dispositif Pinel offre jusqu'à <strong>21% de réduction</strong> sur 12 ans 
              pour un investissement plafonné à 300 000€.
            </p>

            {/* Section 10 */}
            <h2 className="text-2xl font-bold text-charcoal mt-10 mb-4">
              10. Les pensions alimentaires versées
            </h2>
            <p className="text-slate leading-relaxed mb-4">
              Les pensions alimentaires versées à vos enfants majeurs ou à un ex-conjoint sont 
              <strong> déductibles de votre revenu imposable</strong>. Pour un enfant majeur, 
              la déduction est plafonnée à 6 674€ par an (2025).
            </p>

            {/* Conclusion */}
            <div className="border-t border-gray-200 mt-12 pt-8">
              <h2 className="text-2xl font-bold text-charcoal mb-4">
                Comment vérifier si vous êtes concerné ?
              </h2>
              <p className="text-slate leading-relaxed mb-6">
                Plutôt que de passer des heures à éplucher les textes fiscaux, utilisez notre 
                simulateur gratuit. En quelques minutes, il analyse votre situation et identifie 
                toutes les réductions d'impôts auxquelles vous avez droit.
              </p>
              <Link 
                href="/simulation"
                className="inline-block bg-primary-500 text-white font-medium px-8 py-3 hover:bg-primary-600 transition-colors"
              >
                Lancer ma simulation gratuite
              </Link>
            </div>

            {/* Sources */}
            <div className="border-t border-gray-200 mt-12 pt-8">
              <h3 className="text-lg font-semibold text-charcoal mb-4">Sources</h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <a 
                    href="https://www.impots.gouv.fr/particulier/les-reductions-et-credits-dimpot" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary-500 hover:underline flex items-start gap-2"
                  >
                    <span className="text-slate">[1]</span>
                    impots.gouv.fr - Les réductions et crédits d'impôt
                  </a>
                </li>
                <li>
                  <a 
                    href="https://www.service-public.fr/particuliers/vosdroits/F1225" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary-500 hover:underline flex items-start gap-2"
                  >
                    <span className="text-slate">[2]</span>
                    service-public.fr - Frais réels déductibles
                  </a>
                </li>
                <li>
                  <a 
                    href="https://bofip.impots.gouv.fr/bofip/2494-PGP.html" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary-500 hover:underline flex items-start gap-2"
                  >
                    <span className="text-slate">[3]</span>
                    BOFiP - Bulletin Officiel des Finances Publiques (Barème kilométrique)
                  </a>
                </li>
                <li>
                  <a 
                    href="https://www.economie.gouv.fr/particuliers/credit-impot-emploi-domicile" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary-500 hover:underline flex items-start gap-2"
                  >
                    <span className="text-slate">[4]</span>
                    economie.gouv.fr - Crédit d'impôt pour l'emploi à domicile
                  </a>
                </li>
              </ul>
            </div>

            {/* Partage */}
            <div className="border-t border-gray-200 mt-12 pt-8">
              <p className="text-sm text-slate mb-4">Partager cet article :</p>
              <div className="flex gap-3">
                <a 
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(articleContent.title)}&url=${encodeURIComponent('https://monfiscalfacile.fr/articles/1')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-100 flex items-center justify-center text-slate hover:bg-gray-200 hover:text-charcoal transition-colors"
                >
                  <Twitter size={18} />
                </a>
                <a 
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://monfiscalfacile.fr/articles/1')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-100 flex items-center justify-center text-slate hover:bg-[#0A66C2] hover:text-white transition-colors"
                >
                  <Linkedin size={18} />
                </a>
              </div>
            </div>

          </div>

          {/* Navigation articles */}
          <div className="mt-8">
            <Link 
              href="/articles"
              className="inline-flex items-center gap-2 text-slate hover:text-primary-500 transition-colors"
            >
              <ArrowLeft size={18} />
              Voir tous les articles
            </Link>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  );
}
