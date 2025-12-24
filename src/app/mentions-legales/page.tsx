import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function MentionsLegalesPage() {
  return (
    <main className="min-h-screen bg-offwhite">
      <Header />
      
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-charcoal mb-8">
            Mentions légales
          </h1>

          <div className="bg-white border border-gray-200 p-8 space-y-8">
            {/* Propriété intellectuelle */}
            <div>
              <h2 className="text-xl font-semibold text-charcoal mb-4">
                1. Propriété intellectuelle
              </h2>
              <div className="text-slate space-y-3">
                <p>
                  L'ensemble du contenu présent sur le site MonFiscalFacile (textes, images, logos, 
                  graphismes, icônes, logiciels, base de données) est protégé par les lois françaises 
                  et internationales relatives à la propriété intellectuelle.
                </p>
                <p>
                  Toute reproduction, représentation, modification, publication, adaptation de tout ou 
                  partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est 
                  interdite, sauf autorisation écrite préalable de MonFiscalFacile.
                </p>
                <p>
                  Toute exploitation non autorisée du site ou de son contenu sera considérée comme 
                  constitutive d'une contrefaçon et poursuivie conformément aux dispositions des 
                  articles L.335-2 et suivants du Code de Propriété Intellectuelle.
                </p>
              </div>
            </div>

            {/* Responsabilité */}
            <div>
              <h2 className="text-xl font-semibold text-charcoal mb-4">
                2. Limitation de responsabilité
              </h2>
              <div className="text-slate space-y-3">
                <p>
                  MonFiscalFacile propose des outils de simulation fiscale à titre informatif. 
                  Les résultats fournis sont des estimations basées sur les informations que vous 
                  renseignez et la réglementation fiscale en vigueur au moment de la simulation.
                </p>
                <p>
                  <strong>Ces simulations ne constituent en aucun cas :</strong>
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Un conseil fiscal personnalisé</li>
                  <li>Une garantie du montant de votre impôt réel</li>
                  <li>Un avis professionnel d'expert-comptable ou de conseiller fiscal</li>
                </ul>
                <p>
                  Pour toute décision fiscale importante, nous vous recommandons de consulter un 
                  professionnel qualifié (expert-comptable, avocat fiscaliste).
                </p>
                <p>
                  MonFiscalFacile ne saurait être tenu responsable des erreurs, omissions ou résultats 
                  obtenus suite à l'utilisation des informations et outils fournis sur ce site.
                </p>
              </div>
            </div>

            {/* Données personnelles */}
            <div>
              <h2 className="text-xl font-semibold text-charcoal mb-4">
                3. Données personnelles
              </h2>
              <div className="text-slate space-y-3">
                <p>
                  Pour plus d'informations sur la collecte et le traitement de vos données personnelles, 
                  veuillez consulter notre <a href="/confidentialite" className="text-primary-500 hover:underline">Politique de confidentialité</a>.
                </p>
              </div>
            </div>

            {/* Cookies */}
            <div>
              <h2 className="text-xl font-semibold text-charcoal mb-4">
                4. Cookies
              </h2>
              <div className="text-slate space-y-3">
                <p>
                  Le site MonFiscalFacile utilise des cookies pour améliorer l'expérience utilisateur 
                  et analyser le trafic. En poursuivant votre navigation, vous acceptez l'utilisation 
                  de ces cookies.
                </p>
                <p>
                  Vous pouvez configurer votre navigateur pour refuser les cookies, mais certaines 
                  fonctionnalités du site pourraient ne plus fonctionner correctement.
                </p>
              </div>
            </div>

            {/* Droit applicable */}
            <div>
              <h2 className="text-xl font-semibold text-charcoal mb-4">
                5. Droit applicable
              </h2>
              <div className="text-slate space-y-3">
                <p>
                  Les présentes mentions légales sont régies par le droit français. En cas de litige, 
                  les tribunaux français seront seuls compétents.
                </p>
              </div>
            </div>

            {/* Date de mise à jour */}
            <div className="pt-6 border-t border-gray-200">
              <p className="text-sm text-slate">
                Dernière mise à jour : Décembre 2024
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
