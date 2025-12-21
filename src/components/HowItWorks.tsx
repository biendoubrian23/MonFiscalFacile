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
    <section id="comment-ca-marche" className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
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
