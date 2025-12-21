export default function BeforeAfter() {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4">
            Visualisez vos économies
          </h2>
          <p className="text-lg text-slate max-w-2xl mx-auto">
            Un exemple concret basé sur un profil type de freelance.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-0 border border-gray-200">
            {/* Avant */}
            <div className="bg-gray-50 p-8 md:p-12 border-b md:border-b-0 md:border-r border-gray-200">
              <p className="text-sm font-medium text-slate uppercase tracking-wider mb-4">
                Situation actuelle
              </p>
              <p className="text-5xl font-bold text-charcoal mb-2">
                9 500€
              </p>
              <p className="text-slate">
                Impôts et charges / an
              </p>
              
              <div className="mt-8 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate">CA annuel</span>
                  <span className="text-charcoal font-medium">36 000€</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate">Dépenses déclarées</span>
                  <span className="text-charcoal font-medium">4 800€</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate">Déductions utilisées</span>
                  <span className="text-danger font-medium">35%</span>
                </div>
              </div>
            </div>

            {/* Après */}
            <div className="bg-primary-50 p-8 md:p-12">
              <p className="text-sm font-medium text-primary-600 uppercase tracking-wider mb-4">
                Situation optimisée
              </p>
              <p className="text-5xl font-bold text-primary-600 mb-2">
                7 800€
              </p>
              <p className="text-primary-700">
                Impôts et charges / an
              </p>
              
              <div className="mt-8 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-primary-700">CA annuel</span>
                  <span className="text-primary-900 font-medium">36 000€</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-primary-700">Dépenses déclarées</span>
                  <span className="text-primary-900 font-medium">7 200€</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-primary-700">Déductions utilisées</span>
                  <span className="text-primary-900 font-medium">78%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Économie */}
          <div className="bg-primary-500 text-white p-6 text-center">
            <p className="text-sm font-medium uppercase tracking-wider mb-1">
              Économie potentielle
            </p>
            <p className="text-4xl font-bold">
              +1 700€ / an
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
