import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Logo & Tagline */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center">
              <Image src="/logo.png" alt="MonFiscalFacile" width={150} height={40} className="h-8 w-auto" />
            </Link>
            <p className="mt-4 text-slate max-w-sm">
              Moins d'impôts. Sans devenir expert.
            </p>
          </div>

          {/* Liens Produit */}
          <div>
            <h4 className="font-semibold text-charcoal mb-4">Produit</h4>
            <ul className="space-y-3">
              <li>
                <Link href="#comment-ca-marche" className="text-slate hover:text-charcoal transition-colors">
                  Comment ça marche
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-slate hover:text-charcoal transition-colors">
                  Tarifs
                </Link>
              </li>
              <li>
                <Link href="/simulation" className="text-slate hover:text-charcoal transition-colors">
                  Simulation gratuite
                </Link>
              </li>
            </ul>
          </div>

          {/* Liens Légaux */}
          <div>
            <h4 className="font-semibold text-charcoal mb-4">Légal</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/mentions-legales" className="text-slate hover:text-charcoal transition-colors">
                  Mentions légales
                </Link>
              </li>
              <li>
                <Link href="/confidentialite" className="text-slate hover:text-charcoal transition-colors">
                  Confidentialité
                </Link>
              </li>
              <li>
                <Link href="/cgv" className="text-slate hover:text-charcoal transition-colors">
                  CGV
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer & Copyright */}
        <div className="pt-8 border-t border-gray-200">
          <p className="text-sm text-slate-light mb-4 max-w-3xl">
            MonFiscalFacile propose des simulations basées sur la réglementation fiscale en vigueur. 
            Ces informations ne constituent pas un conseil fiscal personnalisé et ne remplacent pas 
            l'avis d'un professionnel.
          </p>
          <p className="text-sm text-slate-light">
            © {new Date().getFullYear()} MonFiscalFacile. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}
