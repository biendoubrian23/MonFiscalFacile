"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import {
  Bell,
  Calendar,
  CheckCircle,
  Clock,
  Crown,
  Plus,
  Trash2,
  AlertCircle,
} from "lucide-react";

interface Rappel {
  id: number;
  titre: string;
  date: string;
  type: "echeance" | "declaration" | "action" | "perso";
  fait: boolean;
}

// Données de démonstration
const rappelsDemo: Rappel[] = [
  {
    id: 1,
    titre: "Acompte TVA - 4ème trimestre",
    date: "2025-01-15",
    type: "echeance",
    fait: false,
  },
  {
    id: 2,
    titre: "Déclaration de revenus",
    date: "2025-05-25",
    type: "declaration",
    fait: false,
  },
  {
    id: 3,
    titre: "Paiement CFE",
    date: "2025-12-15",
    type: "echeance",
    fait: false,
  },
  {
    id: 4,
    titre: "Demander l'ACRE (si éligible)",
    date: "2025-02-01",
    type: "action",
    fait: true,
  },
  {
    id: 5,
    titre: "Régularisation cotisations URSSAF",
    date: "2025-11-30",
    type: "echeance",
    fait: false,
  },
];

export default function RappelsPage() {
  const { isPremium } = useAuth();
  const [rappels, setRappels] = useState(rappelsDemo);

  // Vérifier l'accès Premium
  if (!isPremium) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12">
        <div className="bg-white border border-gray-200 p-8">
          <div className="w-16 h-16 bg-amber-50 flex items-center justify-center mx-auto mb-6">
            <Crown className="w-8 h-8 text-amber-500" />
          </div>
          <h1 className="text-2xl font-bold text-charcoal mb-3">
            Rappels fiscaux
          </h1>
          <p className="text-slate mb-6">
            Ne manquez plus aucune échéance fiscale importante grâce aux rappels
            automatiques.
          </p>
          <ul className="text-left max-w-md mx-auto mb-8 space-y-3">
            <li className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-primary-500" />
              <span className="text-charcoal">Rappels automatiques par email</span>
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-primary-500" />
              <span className="text-charcoal">Toutes les échéances fiscales</span>
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-primary-500" />
              <span className="text-charcoal">Rappels personnalisés</span>
            </li>
          </ul>
          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 bg-primary-500 text-white px-8 py-4 font-semibold hover:bg-primary-600 transition-all"
          >
            <Crown size={20} />
            Débloquer les rappels
          </Link>
        </div>
      </div>
    );
  }

  // Trier par date
  const rappelsTries = [...rappels].sort((a, b) => {
    if (a.fait !== b.fait) return a.fait ? 1 : -1;
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });

  // Rappels à venir (non faits)
  const prochains = rappelsTries.filter((r) => !r.fait);
  const faits = rappelsTries.filter((r) => r.fait);

  // Formater la date
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  // Vérifier si une date est proche (moins de 7 jours)
  const isProche = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    const diffTime = date.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays >= 0 && diffDays <= 7;
  };

  // Marquer comme fait
  const toggleFait = (id: number) => {
    setRappels((prev) =>
      prev.map((r) => (r.id === id ? { ...r, fait: !r.fait } : r))
    );
  };

  // Supprimer un rappel
  const supprimer = (id: number) => {
    setRappels((prev) => prev.filter((r) => r.id !== id));
  };

  // Icône selon le type
  const getTypeIcon = (type: Rappel["type"]) => {
    switch (type) {
      case "echeance":
        return <Calendar className="w-4 h-4" />;
      case "declaration":
        return <AlertCircle className="w-4 h-4" />;
      case "action":
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <Bell className="w-4 h-4" />;
    }
  };

  const getTypeLabel = (type: Rappel["type"]) => {
    switch (type) {
      case "echeance":
        return "Échéance";
      case "declaration":
        return "Déclaration";
      case "action":
        return "Action";
      default:
        return "Personnel";
    }
  };

  return (
    <div className="max-w-3xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-charcoal mb-2">Rappels</h1>
          <p className="text-slate">
            Vos échéances fiscales et rappels personnalisés
          </p>
        </div>
        <button className="flex items-center gap-2 bg-primary-500 text-white px-4 py-2 font-semibold hover:bg-primary-600 transition-all">
          <Plus size={18} />
          Ajouter
        </button>
      </div>

      {/* Prochaines échéances */}
      {prochains.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-bold text-charcoal mb-4">
            À venir ({prochains.length})
          </h2>
          <div className="space-y-3">
            {prochains.map((rappel) => (
              <div
                key={rappel.id}
                className={`bg-white border p-4 flex items-center gap-4 ${
                  isProche(rappel.date)
                    ? "border-amber-300 bg-amber-50"
                    : "border-gray-200"
                }`}
              >
                <button
                  onClick={() => toggleFait(rappel.id)}
                  className="w-6 h-6 border-2 border-gray-300 hover:border-primary-500 flex items-center justify-center flex-shrink-0"
                >
                  {rappel.fait && <CheckCircle className="w-4 h-4 text-primary-500" />}
                </button>

                <div className="flex-1 min-w-0">
                  <p className="font-medium text-charcoal">{rappel.titre}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-sm text-slate flex items-center gap-1">
                      <Clock size={14} />
                      {formatDate(rappel.date)}
                    </span>
                    <span className="text-xs bg-gray-100 text-slate px-2 py-0.5 flex items-center gap-1">
                      {getTypeIcon(rappel.type)}
                      {getTypeLabel(rappel.type)}
                    </span>
                    {isProche(rappel.date) && (
                      <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5">
                        Bientôt
                      </span>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => supprimer(rappel.id)}
                  className="text-slate hover:text-red-500 transition-colors p-2"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Terminés */}
      {faits.length > 0 && (
        <section>
          <h2 className="text-lg font-bold text-charcoal mb-4">
            Terminés ({faits.length})
          </h2>
          <div className="space-y-3">
            {faits.map((rappel) => (
              <div
                key={rappel.id}
                className="bg-gray-50 border border-gray-200 p-4 flex items-center gap-4 opacity-60"
              >
                <button
                  onClick={() => toggleFait(rappel.id)}
                  className="w-6 h-6 bg-primary-500 flex items-center justify-center flex-shrink-0"
                >
                  <CheckCircle className="w-4 h-4 text-white" />
                </button>

                <div className="flex-1 min-w-0">
                  <p className="font-medium text-charcoal line-through">{rappel.titre}</p>
                  <span className="text-sm text-slate">{formatDate(rappel.date)}</span>
                </div>

                <button
                  onClick={() => supprimer(rappel.id)}
                  className="text-slate hover:text-red-500 transition-colors p-2"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Empty state */}
      {rappels.length === 0 && (
        <div className="text-center py-12 bg-white border border-gray-200">
          <Bell className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-slate">Aucun rappel pour le moment</p>
          <button className="mt-4 text-primary-500 hover:text-primary-600 font-medium">
            Ajouter un rappel
          </button>
        </div>
      )}
    </div>
  );
}
