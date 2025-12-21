"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import {
  User,
  Building2,
  MapPin,
  Users,
  Briefcase,
  Save,
  Loader2,
  CheckCircle,
} from "lucide-react";

export default function ProfilPage() {
  const { profile } = useAuth();
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  // Données de profil fiscal (en production, charger depuis Supabase)
  const [formData, setFormData] = useState({
    fullName: profile?.full_name || "",
    statut: "micro-entreprise",
    activite: "services",
    codePostal: "75001",
    situationFamiliale: "celibataire",
    enfants: "0",
    autresRevenus: "non",
    revenuConjoint: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setSaved(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    // Simuler la sauvegarde
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    setSaving(false);
    setSaved(true);
    
    // Réinitialiser le message de succès après 3 secondes
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-3xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-charcoal mb-2">Profil fiscal</h1>
        <p className="text-slate">
          Renseignez vos informations pour des recommandations personnalisées
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Informations personnelles */}
        <section className="bg-white border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-primary-50 flex items-center justify-center">
              <User className="w-5 h-5 text-primary-500" />
            </div>
            <h2 className="text-lg font-bold text-charcoal">Informations personnelles</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-charcoal mb-2">
                Nom complet
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full border border-gray-300 px-4 py-3 text-charcoal focus:border-primary-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-charcoal mb-2">
                Code postal
              </label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate" />
                <input
                  type="text"
                  name="codePostal"
                  value={formData.codePostal}
                  onChange={handleChange}
                  className="w-full border border-gray-300 pl-12 pr-4 py-3 text-charcoal focus:border-primary-500 focus:outline-none"
                  maxLength={5}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Situation professionnelle */}
        <section className="bg-white border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-blue-50 flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-blue-500" />
            </div>
            <h2 className="text-lg font-bold text-charcoal">Situation professionnelle</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-charcoal mb-2">
                Statut juridique
              </label>
              <select
                name="statut"
                value={formData.statut}
                onChange={handleChange}
                className="w-full border border-gray-300 px-4 py-3 text-charcoal focus:border-primary-500 focus:outline-none bg-white"
              >
                <option value="micro-entreprise">Micro-entreprise</option>
                <option value="eurl">EURL</option>
                <option value="sasu">SASU</option>
                <option value="ei">Entreprise Individuelle</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-charcoal mb-2">
                Type d'activité
              </label>
              <select
                name="activite"
                value={formData.activite}
                onChange={handleChange}
                className="w-full border border-gray-300 px-4 py-3 text-charcoal focus:border-primary-500 focus:outline-none bg-white"
              >
                <option value="services">Prestations de services (BNC)</option>
                <option value="commerciale">Activité commerciale (BIC)</option>
                <option value="liberale">Profession libérale</option>
                <option value="artisanale">Activité artisanale</option>
              </select>
            </div>
          </div>
        </section>

        {/* Situation familiale */}
        <section className="bg-white border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-green-50 flex items-center justify-center">
              <Users className="w-5 h-5 text-green-500" />
            </div>
            <h2 className="text-lg font-bold text-charcoal">Situation familiale</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-charcoal mb-2">
                Situation
              </label>
              <select
                name="situationFamiliale"
                value={formData.situationFamiliale}
                onChange={handleChange}
                className="w-full border border-gray-300 px-4 py-3 text-charcoal focus:border-primary-500 focus:outline-none bg-white"
              >
                <option value="celibataire">Célibataire</option>
                <option value="marie">Marié(e) / Pacsé(e)</option>
                <option value="divorce">Divorcé(e)</option>
                <option value="veuf">Veuf/Veuve</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-charcoal mb-2">
                Nombre d'enfants à charge
              </label>
              <select
                name="enfants"
                value={formData.enfants}
                onChange={handleChange}
                className="w-full border border-gray-300 px-4 py-3 text-charcoal focus:border-primary-500 focus:outline-none bg-white"
              >
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4+</option>
              </select>
            </div>
          </div>

          {formData.situationFamiliale === "marie" && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">
                    Votre conjoint a-t-il des revenus ?
                  </label>
                  <select
                    name="autresRevenus"
                    value={formData.autresRevenus}
                    onChange={handleChange}
                    className="w-full border border-gray-300 px-4 py-3 text-charcoal focus:border-primary-500 focus:outline-none bg-white"
                  >
                    <option value="non">Non</option>
                    <option value="oui">Oui</option>
                  </select>
                </div>
                {formData.autresRevenus === "oui" && (
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">
                      Revenu annuel net du conjoint
                    </label>
                    <input
                      type="number"
                      name="revenuConjoint"
                      value={formData.revenuConjoint}
                      onChange={handleChange}
                      placeholder="30000"
                      className="w-full border border-gray-300 px-4 py-3 text-charcoal focus:border-primary-500 focus:outline-none"
                    />
                  </div>
                )}
              </div>
            </div>
          )}
        </section>

        {/* Bouton de sauvegarde */}
        <div className="flex items-center justify-between">
          <div>
            {saved && (
              <div className="flex items-center gap-2 text-green-600">
                <CheckCircle size={20} />
                <span className="font-medium">Modifications enregistrées</span>
              </div>
            )}
          </div>
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 bg-primary-500 text-white px-6 py-3 font-semibold hover:bg-primary-600 transition-all disabled:opacity-50"
          >
            {saving ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                Enregistrement...
              </>
            ) : (
              <>
                <Save size={20} />
                Enregistrer
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
