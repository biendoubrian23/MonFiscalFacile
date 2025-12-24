import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="pt-20 sm:pt-24 md:pt-28 pb-1 px-6 bg-gradient-to-b from-offwhite to-primary-50 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Contenu textuel - Desktop */}
          <div className="lg:space-y-8">
            {/* Titre - responsive mobile */}
            <h1 className="text-[1.75rem] sm:text-4xl md:text-5xl lg:text-6xl font-bold text-charcoal leading-tight text-center lg:text-left">
              {/* Version mobile : sur 2 lignes */}
              <span className="block lg:hidden">
                <span className="block">Payez moins d'impôts.</span>
                <span className="block text-primary-500">Légalement.</span>
              </span>
              {/* Version desktop : original */}
              <span className="hidden lg:block">
                Payez moins d'impôts.
                <span className="text-primary-500"> Légalement.</span>
              </span>
            </h1>

            {/* Image MOBILE uniquement (< 768px) - Grande image comme avant */}
            <div className="md:hidden flex justify-center -mt-16 -mb-8 pointer-events-none">
              <div className="relative w-screen max-w-none h-[350px] -mx-6">
                <Image
                  src="/herosection1.png"
                  alt="Freelance qui optimise ses impôts sereinement"
                  fill
                  className="object-contain"
                  priority
                />
                {/* Badge statistique mobile */}
                <div className="absolute bottom-12 right-0 bg-white border border-gray-200 rounded-lg shadow-lg px-3 py-2 z-10">
                  <p className="text-sm font-bold text-primary-500">3 590€</p>
                  <p className="text-xs text-slate">économisés /an</p>
                </div>
              </div>
            </div>

            {/* Image TABLETTE uniquement (768px - 1024px) - Image réduite et centrée */}
            <div className="hidden md:flex lg:hidden justify-center mt-4 mb-4 pointer-events-none">
              <div className="relative w-full max-w-[50vw] h-[350px]">
                <Image
                  src="/herosection1.png"
                  alt="Freelance qui optimise ses impôts sereinement"
                  fill
                  className="object-contain"
                  priority
                />
                {/* Badge statistique tablette */}
                <div className="absolute bottom-4 right-0 bg-white border border-gray-200 rounded-lg shadow-lg px-3 py-2 z-10">
                  <p className="text-sm font-bold text-primary-500">3 590€</p>
                  <p className="text-xs text-slate">économisés /an</p>
                </div>
              </div>
            </div>
            
            <p className="text-lg sm:text-xl text-slate max-w-lg text-center lg:text-left mx-auto lg:mx-0 lg:!mt-8">
              Découvrez combien vous pouvez économiser. 
              Sans comptable, sans jargon.
            </p>

            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-3 sm:gap-4 lg:!mt-8 mt-4 relative z-50">
              <Link 
                href="/simulation"
                className="bg-primary-500 text-white px-6 sm:px-8 py-3 sm:py-4 font-semibold text-base sm:text-lg hover:bg-primary-600 hover:scale-105 active:scale-95 transition-all duration-200 text-center rounded-lg lg:rounded-none cursor-pointer shadow-md hover:shadow-lg"
              >
                Simuler mon économie
              </Link>
              <Link 
                href="#comment-ca-marche"
                className="border-2 border-charcoal text-charcoal px-6 sm:px-8 py-3 sm:py-4 font-semibold text-base sm:text-lg hover:bg-charcoal hover:text-white hover:scale-105 active:scale-95 transition-all duration-200 text-center rounded-lg lg:rounded-none cursor-pointer"
              >
                Comment ça marche
              </Link>
            </div>

            <p className="text-sm text-slate-light text-center lg:text-left mt-4">
              100% légal • Gratuit • Sans engagement
            </p>
          </div>

          {/* Zone image - Desktop uniquement */}
          <div className="relative lg:scale-[2] lg:translate-x-12 lg:translate-y-1 hidden lg:block">
            <div className="aspect-square relative min-h-[400px] lg:min-h-[550px]">
              <Image
                src="/herosection1.png"
                alt="Freelance qui optimise ses impôts sereinement"
                fill
                className="object-contain"
                priority
              />
            </div>
            
            {/* Badge statistique */}
            <div className="absolute bottom-1/4 left-32 bg-white border border-gray-200 rounded-lg shadow-sm px-1 py-0.5 z-10 animate-float">
              <p className="text-[10px] font-bold text-primary-500">3 590€</p>
              <p className="text-[6px] text-slate">d'économie en moyenne /an</p>
            </div>
          </div>
        </div>

        {/* Barre de confiance */}
        <div className="mt-8 pt-8 pb-8 lg:pt-12 border-t border-gray-200 relative z-20 bg-gradient-to-b from-primary-50 to-white">
          <p className="text-center text-slate-light text-sm mb-4 lg:mb-6">
            Déjà utilisé par 5 689 salariés
          </p>
          <p className="text-center text-charcoal font-medium text-base lg:text-lg max-w-2xl mx-auto px-4">
            <span className="text-primary-600">Saviez-vous que 67% des Français oublient des déductions fiscales ?</span>
            <br className="hidden sm:block" />
            <span className="text-slate">Ne laissez plus l'État garder votre argent.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
