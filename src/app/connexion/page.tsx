"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2, Mail, Lock, User, AlertCircle, CheckCircle } from "lucide-react";

// Icône Google
function GoogleIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

export default function ConnexionPage() {
  const router = useRouter();
  const { user, signIn, signUp, signInWithGoogle, loading: authLoading } = useAuth();
  
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Passe-droit dev : simuler une connexion
  const handleDevLogin = () => {
    localStorage.setItem("dev_mode", "true");
    localStorage.setItem("dev_user", JSON.stringify({ name: "Brian", email: "brian@test.com" }));
    router.push("/mon-espace");
  };

  // Rediriger si déjà connecté
  useEffect(() => {
    if (user && !authLoading) {
      router.push("/mon-espace");
    }
  }, [user, authLoading, router]);

  const handleGoogleSignIn = async () => {
    setError(null);
    setGoogleLoading(true);
    try {
      const { error } = await signInWithGoogle();
      if (error) {
        setError("Erreur lors de la connexion avec Google");
        setGoogleLoading(false);
      }
      // Pas besoin de setGoogleLoading(false) si succès car redirect
    } catch (err) {
      setError("Une erreur est survenue avec Google");
      setGoogleLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await signIn(email, password);
        if (error) {
          if (error.message.includes("Invalid login credentials")) {
            setError("Email ou mot de passe incorrect");
          } else if (error.message.includes("Email not confirmed")) {
            setError("Veuillez confirmer votre email avant de vous connecter");
          } else {
            setError(error.message);
          }
        } else {
          router.push("/mon-espace");
        }
      } else {
        if (password.length < 6) {
          setError("Le mot de passe doit contenir au moins 6 caractères");
          setLoading(false);
          return;
        }
        
        const { error } = await signUp(email, password, fullName);
        if (error) {
          if (error.message.includes("User already registered")) {
            setError("Un compte existe déjà avec cet email");
          } else {
            setError(error.message);
          }
        } else {
          setSuccess("Compte créé ! Vérifiez votre boîte mail pour confirmer votre inscription.");
          setEmail("");
          setPassword("");
          setFullName("");
        }
      }
    } catch (err) {
      setError("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  // Afficher un loader pendant la vérification auth
  if (authLoading) {
    return (
      <main className="min-h-screen bg-offwhite flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-primary-500 animate-spin" />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-offwhite flex flex-col">
      {/* Header minimal */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <Link href="/" className="flex items-center">
            <Image src="/logo.png" alt="MonFiscalFacile" width={150} height={40} className="h-8 w-auto" />
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
            <p className="text-slate text-center mb-6">
              {isLogin 
                ? "Accédez à votre espace optimisation" 
                : "Commencez à économiser sur vos impôts"
              }
            </p>

            {/* Bouton Google */}
            <button
              onClick={handleGoogleSignIn}
              disabled={googleLoading || loading}
              className="w-full mb-6 bg-white border border-gray-300 py-3 px-4 font-medium text-charcoal hover:bg-gray-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 rounded-lg"
            >
              {googleLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <GoogleIcon />
              )}
              {isLogin ? "Continuer avec Google" : "S'inscrire avec Google"}
            </button>

            {/* Séparateur */}
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-slate">ou par email</span>
              </div>
            </div>

            {/* Messages d'erreur et de succès */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}
            
            {success && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-green-700">{success}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Nom complet (inscription uniquement) */}
              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">
                    Nom complet
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate" />
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full border border-gray-300 pl-12 pr-4 py-3 text-charcoal focus:border-primary-500 focus:outline-none"
                      placeholder="Jean Dupont"
                      required={!isLogin}
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-gray-300 pl-12 pr-4 py-3 text-charcoal focus:border-primary-500 focus:outline-none"
                    placeholder="votre@email.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">
                  Mot de passe
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border border-gray-300 pl-12 pr-4 py-3 text-charcoal focus:border-primary-500 focus:outline-none"
                    placeholder="••••••••"
                    required
                    minLength={6}
                  />
                </div>
                {!isLogin && (
                  <p className="text-xs text-slate mt-1">6 caractères minimum</p>
                )}
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
                disabled={loading}
                className="w-full bg-primary-500 text-white py-4 font-semibold hover:bg-primary-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    {isLogin ? "Connexion..." : "Création..."}
                  </>
                ) : (
                  isLogin ? "Se connecter" : "Créer mon compte"
                )}
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-gray-200 text-center">
              <p className="text-slate">
                {isLogin ? "Pas encore de compte ?" : "Déjà un compte ?"}
                <button
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setError(null);
                    setSuccess(null);
                  }}
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

      {/* Passe-droit dev - bouton visible en bas à gauche */}
      <button
        onClick={handleDevLogin}
        className="fixed bottom-4 left-4 px-3 py-2 bg-gray-800 hover:bg-primary-500 text-white rounded-lg text-xs font-medium transition-all shadow-lg flex items-center gap-2"
        title="Mode Dev"
      >
        🚀 Dev
      </button>
    </main>
  );
}
