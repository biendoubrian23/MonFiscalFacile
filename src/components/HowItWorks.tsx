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
    <section id="comment-ca-marche" className="-mt-32 pb-8 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Problème */}
        <div className="grid lg:grid-cols-2 gap-8 items-center mb-16">
          {/* Image à gauche */}
          <div className="relative aspect-square max-w-3xl mx-auto lg:mx-0 min-h-[950px] lg:min-h-[800px]">
            <Image
              src="/section2.png"
              alt="La complexité fiscale qui submerge les indépendants"
              fill
              className="object-contain scale-[1.35] -translate-x-20"
            />
          </div>
          
          {/* Texte à droite */}
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal leading-tight">
              Perdu dans la paperasse fiscale ?
            </h2>
            <div className="space-y-4 text-lg text-slate">
              <p>
                Chaque année, c'est la même histoire. Des dizaines de formulaires, 
                des règles qui changent, des termes incompréhensibles.
              </p>
              <p>
                Vous savez qu'il existe des moyens de payer moins d'impôts. 
                Mais lesquels ? Par où commencer ?
              </p>
              <p className="font-medium text-charcoal">
                Résultat : vous payez plus que nécessaire, sans même le savoir.
              </p>
            </div>
            <div className="pt-4">
              <p className="text-primary-600 font-semibold text-lg">
                Et si quelqu'un faisait le tri pour vous ?
              </p>
            </div>
          </div>
        </div>

        {/* Titre section étapes */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4">
            3 étapes. 3 minutes. Des économies.
          </h2>
          <p className="text-lg text-slate max-w-2xl mx-auto">
            Pas besoin d'être expert fiscal. Notre outil fait le travail pour vous.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div 
              key={step.number}
              className="relative bg-offwhite border border-gray-200 p-8 hover:shadow-md transition-shadow"
            >
              {/* Numéro */}
              <span className="text-6xl font-bold text-primary-100 absolute top-4 right-4">
                {step.number}
              </span>
              
              {/* Contenu */}
              <div className="relative z-10">
                <h3 className="text-xl font-semibold text-charcoal mb-3">
                  {step.title}
                </h3>
                <p className="text-slate">
                  {step.description}
                </p>
              </div>

              {/* Ligne de connexion */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-primary-200" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
