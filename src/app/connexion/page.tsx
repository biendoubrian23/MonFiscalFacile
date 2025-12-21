"use client";

import Link from "next/link";
import { useState } from "react";

export default function ConnexionPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // En production, gérer l'authentification ici
    console.log("Submit", { email, password, isLogin });
  };

  return (
    <main className="min-h-screen bg-offwhite flex flex-col">
      {/* Header minimal */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <Link href="/" className="text-xl font-bold text-charcoal">
            MonFiscalFacile
          </Link>
        </div>
      </header>

      {/* Formulaire centré */}
      <div className="flex-grow flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="bg-white border border-gray-200 p-8">
            <h1 className="text-2xl font-bold text-charcoal mb-2 text-center">
              {isLogin ? "Connexion" : "Créer un compte"}
            </h1>
            <p className="text-slate text-center mb-8">
              {isLogin 
                ? "Accédez à votre espace optimisation" 
                : "Commencez à économiser sur vos impôts"
              }
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-300 px-4 py-3 text-charcoal focus:border-primary-500 focus:outline-none"
                  placeholder="votre@email.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">
                  Mot de passe
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-gray-300 px-4 py-3 text-charcoal focus:border-primary-500 focus:outline-none"
                  placeholder="••••••••"
                  required
                />
              </div>

              {isLogin && (
                <div className="text-right">
                  <Link 
                    href="/mot-de-passe-oublie" 
                    className="text-sm text-primary-500 hover:text-primary-600"
                  >
                    Mot de passe oublié ?
                  </Link>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-primary-500 text-white py-4 font-semibold hover:bg-primary-600 transition-all"
              >
                {isLogin ? "Se connecter" : "Créer mon compte"}
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-gray-200 text-center">
              <p className="text-slate">
                {isLogin ? "Pas encore de compte ?" : "Déjà un compte ?"}
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="ml-2 text-primary-500 font-medium hover:text-primary-600"
                >
                  {isLogin ? "S'inscrire" : "Se connecter"}
                </button>
              </p>
            </div>
          </div>

          <p className="text-sm text-slate-light text-center mt-6">
            En continuant, vous acceptez nos{" "}
            <Link href="/cgv" className="text-charcoal hover:text-primary-500">
              CGV
            </Link>
            {" "}et notre{" "}
            <Link href="/confidentialite" className="text-charcoal hover:text-primary-500">
              Politique de confidentialité
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
