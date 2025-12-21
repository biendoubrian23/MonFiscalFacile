import Link from "next/link";

export default function CTASection() {
  return (
    <section className="py-20 px-6 bg-charcoal">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Combien pouvez-vous économiser ?
        </h2>
        <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
          La simulation est gratuite. Les économies sont réelles.
        </p>
        
        <Link 
          href="/simulation"
          className="inline-block bg-primary-500 text-white px-10 py-4 font-semibold text-lg hover:bg-primary-600 transition-all duration-200"
        >
          Commencer maintenant
        </Link>
        
        <p className="mt-6 text-sm text-gray-500">
          Rejoignez les 2 500+ indépendants qui optimisent déjà
        </p>
      </div>
    </section>
  );
}
