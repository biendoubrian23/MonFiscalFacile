import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ConfidentialitePage() {
  return (
    <main className="min-h-screen bg-offwhite">
      <Header />
      
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-charcoal mb-4">
            Politique de confidentialité
          </h1>
          <p className="text-slate mb-8">
            Chez MonFiscalFacile, nous prenons la protection de vos données très au sérieux. 
            Cette politique explique comment nous collectons, utilisons et protégeons vos informations.
          </p>

          <div className="bg-white border border-gray-200 p-8 space-y-8">
            {/* Responsable */}
            <div>
              <h2 className="text-xl font-semibold text-charcoal mb-4">
                1. Responsable du traitement
              </h2>
              <div className="text-slate space-y-2">
                <p>
                  Le responsable du traitement des données personnelles est MonFiscalFacile, 
                  dont les coordonnées figurent dans les <a href="/mentions-legales" className="text-primary-500 hover:underline">mentions légales</a>.
                </p>
                <p><strong>Contact DPO :</strong> dpo@monfiscalfacile.fr</p>
              </div>
            </div>

            {/* Données collectées */}
            <div>
              <h2 className="text-xl font-semibold text-charcoal mb-4">
                2. Données collectées
              </h2>
              <div className="text-slate space-y-3">
                <p>Nous collectons les données suivantes :</p>
                
                <h3 className="font-semibold text-charcoal mt-4">Données d'identification</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Nom et prénom</li>
                  <li>Adresse email</li>
                  <li>Mot de passe (chiffré)</li>
                </ul>

                <h3 className="font-semibold text-charcoal mt-4">Données fiscales (pour la simulation)</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Revenus déclarés (salaires, etc.)</li>
                  <li>Situation familiale</li>
                  <li>Déductions et réductions cochées</li>
                </ul>

                <h3 className="font-semibold text-charcoal mt-4">Données techniques</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Adresse IP</li>
                  <li>Type de navigateur</li>
                  <li>Pages visitées et durée de visite</li>
                </ul>
              </div>
            </div>

            {/* Finalités */}
            <div>
              <h2 className="text-xl font-semibold text-charcoal mb-4">
                3. Finalités du traitement
              </h2>
              <div className="text-slate space-y-3">
                <p>Vos données sont utilisées pour :</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Fournir nos services :</strong> simulation fiscale, calcul de l'impôt, identification des réductions</li>
                  <li><strong>Gérer votre compte :</strong> création, connexion, historique des simulations</li>
                  <li><strong>Améliorer notre service :</strong> analyse anonymisée des usages pour optimiser l'outil</li>
                  <li><strong>Vous contacter :</strong> notifications importantes, rappels fiscaux (si activés)</li>
                  <li><strong>Respecter nos obligations légales :</strong> facturation, obligations fiscales</li>
                </ul>
              </div>
            </div>

            {/* Base légale */}
            <div>
              <h2 className="text-xl font-semibold text-charcoal mb-4">
                4. Base légale du traitement
              </h2>
              <div className="text-slate space-y-3">
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Exécution du contrat :</strong> pour fournir les services que vous avez demandés</li>
                  <li><strong>Consentement :</strong> pour les newsletters et communications marketing (vous pouvez vous désinscrire à tout moment)</li>
                  <li><strong>Intérêt légitime :</strong> pour améliorer nos services et prévenir la fraude</li>
                  <li><strong>Obligation légale :</strong> pour respecter nos obligations fiscales et comptables</li>
                </ul>
              </div>
            </div>

            {/* Conservation */}
            <div>
              <h2 className="text-xl font-semibold text-charcoal mb-4">
                5. Durée de conservation
              </h2>
              <div className="text-slate space-y-3">
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Données de compte :</strong> conservées tant que votre compte est actif, puis 3 ans après la dernière connexion</li>
                  <li><strong>Données de simulation :</strong> conservées 3 ans pour permettre les comparaisons N-1</li>
                  <li><strong>Données de facturation :</strong> conservées 10 ans (obligation légale)</li>
                  <li><strong>Cookies :</strong> 13 mois maximum</li>
                </ul>
              </div>
            </div>

            {/* Partage */}
            <div>
              <h2 className="text-xl font-semibold text-charcoal mb-4">
                6. Partage des données
              </h2>
              <div className="text-slate space-y-3">
                <p>
                  <strong>Nous ne vendons jamais vos données.</strong>
                </p>
                <p>Vos données peuvent être partagées avec :</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Nos sous-traitants techniques :</strong> hébergement (Vercel), base de données (Supabase), paiement (Stripe)</li>
                  <li><strong>Autorités compétentes :</strong> uniquement sur réquisition légale</li>
                </ul>
                <p>
                  Tous nos sous-traitants sont soumis à des obligations strictes de confidentialité 
                  et sont conformes au RGPD.
                </p>
              </div>
            </div>

            {/* Sécurité */}
            <div>
              <h2 className="text-xl font-semibold text-charcoal mb-4">
                7. Sécurité des données
              </h2>
              <div className="text-slate space-y-3">
                <p>Nous mettons en œuvre des mesures de sécurité appropriées :</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Chiffrement des données en transit (HTTPS/TLS)</li>
                  <li>Chiffrement des mots de passe (bcrypt)</li>
                  <li>Accès restreint aux données personnelles</li>
                  <li>Sauvegardes régulières</li>
                  <li>Surveillance des accès et détection d'intrusion</li>
                </ul>
              </div>
            </div>

            {/* Vos droits */}
            <div>
              <h2 className="text-xl font-semibold text-charcoal mb-4">
                8. Vos droits
              </h2>
              <div className="text-slate space-y-3">
                <p>Conformément au RGPD, vous disposez des droits suivants :</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Droit d'accès :</strong> obtenir une copie de vos données personnelles</li>
                  <li><strong>Droit de rectification :</strong> corriger des données inexactes</li>
                  <li><strong>Droit à l'effacement :</strong> demander la suppression de vos données</li>
                  <li><strong>Droit à la portabilité :</strong> récupérer vos données dans un format lisible</li>
                  <li><strong>Droit d'opposition :</strong> vous opposer à certains traitements</li>
                  <li><strong>Droit de limitation :</strong> limiter le traitement de vos données</li>
                </ul>
                <p className="mt-4">
                  Pour exercer ces droits, contactez-nous à : <strong>dpo@monfiscalfacile.fr</strong>
                </p>
                <p>
                  Vous pouvez également déposer une réclamation auprès de la CNIL : 
                  <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-primary-500 hover:underline ml-1">www.cnil.fr</a>
                </p>
              </div>
            </div>

            {/* Cookies */}
            <div>
              <h2 className="text-xl font-semibold text-charcoal mb-4">
                9. Cookies
              </h2>
              <div className="text-slate space-y-3">
                <p>Nous utilisons les cookies suivants :</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Cookies essentiels :</strong> nécessaires au fonctionnement du site (authentification, panier)</li>
                  <li><strong>Cookies analytiques :</strong> pour comprendre comment vous utilisez le site (anonymisés)</li>
                </ul>
                <p>
                  Vous pouvez gérer vos préférences de cookies via les paramètres de votre navigateur.
                </p>
              </div>
            </div>

            {/* Modifications */}
            <div>
              <h2 className="text-xl font-semibold text-charcoal mb-4">
                10. Modifications
              </h2>
              <div className="text-slate space-y-3">
                <p>
                  Nous pouvons mettre à jour cette politique de confidentialité. En cas de modification 
                  importante, nous vous en informerons par email ou via une notification sur le site.
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
