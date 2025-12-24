import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function CGVPage() {
  return (
    <main className="min-h-screen bg-offwhite">
      <Header />
      
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-charcoal mb-4">
            Conditions Générales de Vente
          </h1>
          <p className="text-slate mb-8">
            Les présentes CGV régissent la vente des services proposés par MonFiscalFacile.
          </p>

          <div className="bg-white border border-gray-200 p-8 space-y-8">
            {/* Objet */}
            <div>
              <h2 className="text-xl font-semibold text-charcoal mb-4">
                1. Objet
              </h2>
              <div className="text-slate space-y-3">
                <p>
                  Les présentes Conditions Générales de Vente (CGV) définissent les droits et obligations 
                  des parties dans le cadre de la vente des services proposés par MonFiscalFacile, notamment :
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>L'accès à l'outil de simulation fiscale</li>
                  <li>L'abonnement Premium donnant accès aux fonctionnalités avancées</li>
                </ul>
              </div>
            </div>

            {/* Services */}
            <div>
              <h2 className="text-xl font-semibold text-charcoal mb-4">
                2. Description des services
              </h2>
              <div className="text-slate space-y-3">
                <h3 className="font-semibold text-charcoal mt-4">Offre Gratuite</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Accès limité à l'outil de simulation</li>
                  <li>Estimation approximative de l'impôt</li>
                  <li>Conseils généraux sur les déductions</li>
                </ul>

                <h3 className="font-semibold text-charcoal mt-4">Offre Premium - 3 mois (14,99€)</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Simulations illimitées</li>
                  <li>Analyse complète de la situation fiscale</li>
                  <li>Checklist personnalisée case par case</li>
                  <li>Calendrier fiscal et rappels</li>
                  <li>Historique des simulations</li>
                  <li>Support prioritaire par email</li>
                  <li>Accès pendant 3 mois à compter de l'achat</li>
                </ul>

                <h3 className="font-semibold text-charcoal mt-4">Offre Premium - Annuelle (19,99€)</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Tous les avantages de l'offre 3 mois</li>
                  <li>Accès pendant 12 mois à compter de l'achat</li>
                  <li>Économie de 25% par rapport à l'offre trimestrielle</li>
                </ul>
              </div>
            </div>

            {/* Prix */}
            <div>
              <h2 className="text-xl font-semibold text-charcoal mb-4">
                3. Prix
              </h2>
              <div className="text-slate space-y-3">
                <p>Les prix sont indiqués en euros TTC (toutes taxes comprises) :</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Offre Gratuite :</strong> 0€</li>
                  <li><strong>Premium 3 mois :</strong> 14,99€ TTC</li>
                  <li><strong>Premium Annuel :</strong> 19,99€ TTC</li>
                </ul>
                <p>
                  MonFiscalFacile se réserve le droit de modifier ses prix à tout moment. 
                  Les prix applicables sont ceux en vigueur au moment de la commande.
                </p>
              </div>
            </div>

            {/* Commande */}
            <div>
              <h2 className="text-xl font-semibold text-charcoal mb-4">
                4. Commande et paiement
              </h2>
              <div className="text-slate space-y-3">
                <p>
                  Pour souscrire à un abonnement Premium, vous devez :
                </p>
                <ol className="list-decimal pl-6 space-y-2">
                  <li>Créer un compte sur MonFiscalFacile</li>
                  <li>Choisir l'offre souhaitée (3 mois ou annuelle)</li>
                  <li>Procéder au paiement sécurisé par carte bancaire</li>
                </ol>
                <p>
                  Le paiement est effectué via notre prestataire sécurisé Stripe. 
                  Vos données bancaires ne sont jamais stockées sur nos serveurs.
                </p>
                <p>
                  L'accès aux fonctionnalités Premium est immédiat après confirmation du paiement.
                </p>
              </div>
            </div>

            {/* Durée */}
            <div>
              <h2 className="text-xl font-semibold text-charcoal mb-4">
                5. Durée et renouvellement
              </h2>
              <div className="text-slate space-y-3">
                <p>
                  <strong>Pas de renouvellement automatique.</strong>
                </p>
                <p>
                  L'abonnement Premium est un achat unique pour la durée choisie (3 mois ou 1 an). 
                  À l'expiration de cette période, votre compte repassera automatiquement en version gratuite.
                </p>
                <p>
                  Vous recevrez un email de rappel avant l'expiration pour vous permettre de renouveler 
                  si vous le souhaitez.
                </p>
              </div>
            </div>

            {/* Droit de rétractation */}
            <div>
              <h2 className="text-xl font-semibold text-charcoal mb-4">
                6. Droit de rétractation
              </h2>
              <div className="text-slate space-y-3">
                <p>
                  Conformément à l'article L221-18 du Code de la consommation, vous disposez d'un délai 
                  de <strong>14 jours</strong> à compter de la souscription pour exercer votre droit de rétractation, 
                  sans avoir à justifier de motif.
                </p>
                <p>
                  Pour exercer ce droit, envoyez un email à : <strong>contact@monfiscalfacile.fr</strong> 
                  en indiquant votre nom, email et la date de souscription.
                </p>
                <p>
                  Le remboursement sera effectué dans un délai de 14 jours suivant la réception de votre demande, 
                  via le même moyen de paiement que celui utilisé pour la commande.
                </p>
                <p className="bg-primary-50 p-4 rounded">
                  <strong>Exception :</strong> Conformément à l'article L221-28, si vous avez commencé à utiliser 
                  le service Premium avant la fin du délai de rétractation et que vous en avez fait la demande 
                  expresse, vous renoncez à votre droit de rétractation pour la partie du service déjà exécutée.
                </p>
              </div>
            </div>

            {/* Responsabilité */}
            <div>
              <h2 className="text-xl font-semibold text-charcoal mb-4">
                7. Limitation de responsabilité
              </h2>
              <div className="text-slate space-y-3">
                <p>
                  MonFiscalFacile fournit des outils de simulation et d'aide à la déclaration fiscale 
                  à titre informatif uniquement.
                </p>
                <p>
                  <strong>Les simulations ne constituent pas un conseil fiscal personnalisé</strong> et ne 
                  remplacent pas l'avis d'un professionnel (expert-comptable, avocat fiscaliste).
                </p>
                <p>
                  MonFiscalFacile ne saurait être tenu responsable :
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Des erreurs dans les données que vous saisissez</li>
                  <li>Des différences entre les estimations et le montant réel de votre impôt</li>
                  <li>Des décisions fiscales que vous prenez sur la base de nos simulations</li>
                  <li>Des interruptions temporaires du service pour maintenance</li>
                </ul>
              </div>
            </div>

            {/* Données personnelles */}
            <div>
              <h2 className="text-xl font-semibold text-charcoal mb-4">
                8. Données personnelles
              </h2>
              <div className="text-slate space-y-3">
                <p>
                  Le traitement de vos données personnelles est régi par notre 
                  <a href="/confidentialite" className="text-primary-500 hover:underline ml-1">Politique de confidentialité</a>.
                </p>
              </div>
            </div>

            {/* Réclamations */}
            <div>
              <h2 className="text-xl font-semibold text-charcoal mb-4">
                9. Réclamations et litiges
              </h2>
              <div className="text-slate space-y-3">
                <p>
                  Pour toute réclamation, contactez-nous à : <strong>contact@monfiscalfacile.fr</strong>
                </p>
                <p>
                  Nous nous engageons à répondre dans un délai de 48h ouvrées.
                </p>
                <p>
                  En cas de litige non résolu, vous pouvez recourir gratuitement au service de médiation :
                </p>
                <p className="bg-gray-50 p-4 rounded">
                  <strong>Médiateur de la consommation :</strong><br />
                  [Nom du médiateur à compléter]<br />
                  [Adresse et site web à compléter]
                </p>
                <p>
                  Les présentes CGV sont soumises au droit français. En cas de litige persistant, 
                  les tribunaux français seront seuls compétents.
                </p>
              </div>
            </div>

            {/* Modification des CGV */}
            <div>
              <h2 className="text-xl font-semibold text-charcoal mb-4">
                10. Modification des CGV
              </h2>
              <div className="text-slate space-y-3">
                <p>
                  MonFiscalFacile se réserve le droit de modifier les présentes CGV à tout moment. 
                  Les CGV applicables sont celles en vigueur à la date de la commande.
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
