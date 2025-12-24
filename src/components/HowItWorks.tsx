import Image from "next/image";

export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Répondez à 6 questions",
      description: "Votre situation en 2 minutes. Pas de documents requis."
    },
    {
      number: "02",
      title: "Visualisez votre situation",
      description: "Un diagnostic clair de vos impôts actuels."
    },
    {
      number: "03",
      title: "Découvrez vos économies",
      description: "Des actions concrètes pour payer moins."
    }
  ];

  return (
    <section className="pt-8 md:pt-12 lg:-mt-32 pb-8 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Problème */}
        <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-8 items-center mb-8 lg:mb-16">
          
          {/* Titre - Mobile first (avant l'image) */}
          <h2 className="lg:hidden text-3xl md:text-4xl font-bold text-charcoal leading-tight text-center -mb-24">
            Perdu dans la paperasse fiscale ?
          </h2>

          {/* Image - Responsive : mobile/tablette/desktop */}
          <div className="relative w-screen max-w-none -mx-6 lg:mx-0 lg:w-full lg:max-w-4xl mx-auto aspect-square min-h-[500px] sm:min-h-[600px] md:min-h-[700px] lg:min-h-[1040px] order-1 lg:order-none -mb-32 lg:-mb-20 lg:-mt-40">
            <Image
              src="/section2.png"
              alt="La complexité fiscale qui submerge les indépendants"
              fill
              className="object-contain scale-[1.4] lg:scale-[1.75] lg:-translate-x-20"
            />
          </div>
          
          {/* Texte à droite */}
          <div className="space-y-6 order-2 lg:order-none text-justify lg:text-left">
            {/* Titre Desktop */}
            <h2 className="hidden lg:block text-3xl md:text-4xl font-bold text-charcoal leading-tight">
              Perdu dans la paperasse fiscale ?
            </h2>
            <div className="space-y-4 text-lg text-slate">
              <p>
                Chaque année, c'est la même histoire : des dizaines de formulaires, des règles qui changent, des termes incompréhensibles. Vous savez qu'il existe des moyens de payer moins d'impôts, mais lesquels ? Par où commencer ?
              </p>
              <p className="font-medium text-charcoal">
                Résultat : vous payez plus que nécessaire, sans même le savoir.
              </p>
            </div>
            <div className="pt-4">
              <p className="text-primary-600 font-semibold text-lg text-center lg:text-left">
                Et si quelqu'un faisait le tri pour vous ?
              </p>
            </div>
          </div>
        </div>

        {/* Titre section étapes */}
        <div id="comment-ca-marche" className="text-center mb-12 scroll-mt-24">
          <p className="text-sm font-semibold text-primary-500 uppercase tracking-widest mb-3">
            Comment ça marche
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4">
            3 minutes pour reprendre le contrôle
          </h2>
          <p className="text-lg text-slate max-w-xl mx-auto">
            Zéro jargon. Zéro stress. Juste des résultats.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-0 border border-slate/20">
          {steps.map((step, index) => (
            <div 
              key={step.number}
              className={`relative bg-white p-8 md:p-10 ${
                index < steps.length - 1 ? "md:border-r border-b md:border-b-0 border-slate/20" : ""
              }`}
            >
              {/* Numéro */}
              <div className="flex items-center gap-4 mb-5">
                <span className="text-4xl font-black text-primary-500">
                  {step.number}
                </span>
                <div className="h-px flex-1 bg-gradient-to-r from-primary-200 to-transparent" />
              </div>
              
              {/* Contenu */}
              <h3 className="text-lg font-bold text-charcoal mb-2">
                {step.title}
              </h3>
              <p className="text-slate text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Chiffre clé */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-charcoal text-white">
            <span className="text-2xl font-bold text-primary-400">843€</span>
            <span className="text-sm">économisés en moyenne par nos utilisateurs</span>
          </div>
        </div>
      </div>
    </section>
  );
}
