import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="pt-16 pb-1 px-6 bg-gradient-to-b from-offwhite to-primary-50 overflow-hidden">
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
          <div className="relative lg:scale-[2] lg:translate-x-12 lg:translate-y-1">
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
        <div className="mt-8 pt-12 border-t border-gray-200 relative z-20">
          <p className="text-center text-slate-light text-sm mb-6">
            Déjà utilisé par plus de 843 indépendants
          </p>
          <div className="flex flex-wrap justify-center items-center gap-6 opacity-70">
            <span className="text-charcoal font-bold text-2xl" style={{ fontFamily: 'Dancing Script, cursive' }}>Freelances</span>
            <span className="text-gray-300">|</span>
            <span className="text-charcoal font-bold text-2xl" style={{ fontFamily: 'Dancing Script, cursive' }}>Auto-entrepreneurs</span>
            <span className="text-gray-300">|</span>
            <span className="text-charcoal font-bold text-2xl" style={{ fontFamily: 'Dancing Script, cursive' }}>Consultants</span>
            <span className="text-gray-300">|</span>
            <span className="text-charcoal font-bold text-2xl" style={{ fontFamily: 'Dancing Script, cursive' }}>Indépendants</span>
            <span className="text-gray-300">|</span>
            <span className="text-charcoal font-bold text-2xl" style={{ fontFamily: 'Dancing Script, cursive' }}>Pères de famille</span>
          </div>
        </div>
      </div>
    </section>
  );
}
