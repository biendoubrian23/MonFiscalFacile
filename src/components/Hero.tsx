import Link from "next/link";

export default function Hero() {
  return (
    <section className="pt-32 pb-20 px-6 bg-gradient-to-b from-offwhite to-primary-50">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Contenu textuel */}
          <div className="space-y-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-charcoal leading-tight">
              Payez moins d'impôts.
              <span className="text-primary-500"> Légalement.</span>
            </h1>
            
            <p className="text-xl text-slate max-w-lg">
              Découvrez combien vous pouvez économiser. 
              Sans comptable, sans jargon.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/simulation"
                className="bg-primary-500 text-white px-8 py-4 font-semibold text-lg hover:bg-primary-600 transition-all duration-200 text-center"
              >
                Simuler mon économie
              </Link>
              <Link 
                href="#comment-ca-marche"
                className="border-2 border-charcoal text-charcoal px-8 py-4 font-semibold text-lg hover:bg-charcoal hover:text-white transition-all duration-200 text-center"
              >
                Comment ça marche
              </Link>
            </div>

            <p className="text-sm text-slate-light">
              100% légal • Gratuit • Sans engagement
            </p>
          </div>

          {/* Zone image */}
          <div className="relative">
            <div className="aspect-[4/3] bg-gray-200 border border-gray-300">
              {/* Placeholder pour image générée */}
              <div className="absolute inset-0 flex items-center justify-center text-slate">
                <div className="text-center p-8">
                  <p className="text-lg font-medium mb-2">Image Hero</p>
                  <p className="text-sm">Freelance confiant visualisant ses économies</p>
                </div>
              </div>
            </div>
            
            {/* Badge statistique */}
            <div className="absolute -bottom-4 -left-4 bg-white border border-gray-200 shadow-lg p-4">
              <p className="text-3xl font-bold text-primary-500">1 700€</p>
              <p className="text-sm text-slate">Économie moyenne / an</p>
            </div>
          </div>
        </div>

        {/* Barre de confiance */}
        <div className="mt-20 pt-12 border-t border-gray-200">
          <p className="text-center text-slate-light text-sm mb-6">
            Déjà utilisé par plus de 2 500 indépendants
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            <span className="text-charcoal font-medium">Freelances</span>
            <span className="text-gray-300">|</span>
            <span className="text-charcoal font-medium">Auto-entrepreneurs</span>
            <span className="text-gray-300">|</span>
            <span className="text-charcoal font-medium">Consultants</span>
            <span className="text-gray-300">|</span>
            <span className="text-charcoal font-medium">Indépendants</span>
          </div>
        </div>
      </div>
    </section>
  );
}
