"use client";

import { useState, useEffect } from "react";
import { User, CreditCard, LogOut, ChevronRight, Check, Crown, Star, Mail, Phone, Calendar } from "lucide-react";

interface UserProfile {
  nom: string;
  prenom: string;
  email: string;
  telephone?: string;
  dateInscription: string;
  abonnement: "gratuit" | "premium";
}

const featuresGratuit = [
  "Simulation basique",
  "Checklist des réductions",
  "Guides pas à pas"
];

const featuresPremium = [
  "Simulation illimitée et détaillée",
  "Checklist personnalisée",
  "Guides avec vidéos exclusives",
  "Support prioritaire par email",
  "Rappels déclaration par SMS",
  "Export PDF de votre simulation"
];

export default function ComptePage() {
  const [isDevMode, setIsDevMode] = useState(false);
  const [profile, setProfile] = useState<UserProfile>({
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    dateInscription: new Date().toISOString().split("T")[0],
    abonnement: "gratuit"
  });

  useEffect(() => {
    // Vérifier le mode dev
    if (typeof window !== "undefined") {
      const devMode = localStorage.getItem("dev_mode") === "true";
      setIsDevMode(devMode);
      
      if (devMode) {
        setProfile({
          nom: "Dupont",
          prenom: "Brian",
          email: "brian@test.fr",
          telephone: "06 12 34 56 78",
          dateInscription: "2024-01-15",
          abonnement: "premium"
        });
      }
    }
  }, []);

  const handleUpgrade = () => {
    // TODO: Rediriger vers Stripe
    alert("Redirection vers la page de paiement...");
  };

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("dev_mode");
      localStorage.removeItem("dev_user");
      window.location.href = "/connexion";
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 pb-24">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl font-bold text-charcoal mb-2">Mon compte</h1>
        <p className="text-slate text-sm">
          Gérez votre profil et votre abonnement
        </p>
      </div>

      {/* Carte profil */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
            <User size={32} className="text-primary-600" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h2 className="font-bold text-charcoal text-lg">
                {profile.prenom || "Utilisateur"} {profile.nom}
              </h2>
              {profile.abonnement === "premium" && (
                <span className="bg-amber-100 text-amber-700 text-xs font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Crown size={12} /> Premium
                </span>
              )}
            </div>
            <p className="text-slate text-sm">{profile.email || "email@example.com"}</p>
          </div>
        </div>

        {/* Infos */}
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-sm">
            <Mail size={16} className="text-slate" />
            <span className="text-charcoal">{profile.email || "Non renseigné"}</span>
          </div>
          {profile.telephone && (
            <div className="flex items-center gap-3 text-sm">
              <Phone size={16} className="text-slate" />
              <span className="text-charcoal">{profile.telephone}</span>
            </div>
          )}
          <div className="flex items-center gap-3 text-sm">
            <Calendar size={16} className="text-slate" />
            <span className="text-charcoal">
              Membre depuis le {new Date(profile.dateInscription).toLocaleDateString("fr-FR")}
            </span>
          </div>
        </div>
      </div>

      {/* Abonnement actuel */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-slate uppercase tracking-wide mb-3">
          Mon abonnement
        </h3>

        {profile.abonnement === "gratuit" ? (
          <>
            {/* Plan gratuit */}
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-3">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="font-semibold text-charcoal">Plan Gratuit</p>
                  <p className="text-sm text-slate">Fonctionnalités de base</p>
                </div>
                <span className="text-lg font-bold text-charcoal">0€</span>
              </div>
              <ul className="space-y-2">
                {featuresGratuit.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-slate">
                    <Check size={14} className="text-green-500" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Upgrade Premium */}
            <div className="bg-gradient-to-br from-primary-50 to-primary-100 border-2 border-primary-200 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <Star size={20} className="text-primary-600" />
                <p className="font-bold text-primary-700">Passez Premium</p>
              </div>
              <ul className="space-y-2 mb-4">
                {featuresPremium.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-primary-700">
                    <Check size={14} className="text-primary-500" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                onClick={handleUpgrade}
                className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <Crown size={18} />
                Passer Premium - 9,99€/an
              </button>
              <p className="text-center text-xs text-primary-600 mt-2">
                Satisfait ou remboursé 30 jours
              </p>
            </div>
          </>
        ) : (
          /* Plan Premium actif */
          <div className="bg-gradient-to-br from-amber-50 to-amber-100 border-2 border-amber-200 rounded-xl p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Crown size={24} className="text-amber-600" />
                <div>
                  <p className="font-bold text-amber-800">Plan Premium</p>
                  <p className="text-sm text-amber-700">Accès complet</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-lg font-bold text-amber-800">9,99€</span>
                <p className="text-xs text-amber-600">/an</p>
              </div>
            </div>
            <ul className="space-y-2">
              {featuresPremium.map((feature, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-amber-800">
                  <Check size={14} className="text-amber-600" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="space-y-2">
        <button className="w-full flex items-center justify-between bg-white border border-gray-200 rounded-xl p-4 hover:bg-gray-50 transition-colors">
          <div className="flex items-center gap-3">
            <CreditCard size={20} className="text-slate" />
            <span className="font-medium text-charcoal">Gérer mon paiement</span>
          </div>
          <ChevronRight size={18} className="text-slate" />
        </button>

        <button 
          onClick={handleLogout}
          className="w-full flex items-center justify-between bg-white border border-red-200 rounded-xl p-4 hover:bg-red-50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <LogOut size={20} className="text-red-500" />
            <span className="font-medium text-red-600">Se déconnecter</span>
          </div>
          <ChevronRight size={18} className="text-red-400" />
        </button>
      </div>

      {/* Mode dev info */}
      {isDevMode && (
        <div className="mt-6 bg-purple-50 border border-purple-200 rounded-xl p-4">
          <p className="text-sm text-purple-700">
            🚀 <strong>Mode développeur actif</strong> - Données de test chargées
          </p>
        </div>
      )}
    </div>
  );
}
