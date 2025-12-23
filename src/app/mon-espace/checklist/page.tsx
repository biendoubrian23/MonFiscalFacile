"use client";

import { useState, useEffect } from "react";
import { CheckCircle, Circle, Info, ChevronDown, ChevronUp, Euro } from "lucide-react";

interface ChecklistItem {
  id: string;
  titre: string;
  description: string;
  economie: number;
  checked: boolean;
  categorie: string;
}

const checklistInitiale: ChecklistItem[] = [
  {
    id: "enfants",
    titre: "Enfants à charge déclarés",
    description: "Chaque enfant réduit votre impôt grâce au quotient familial",
    economie: 1500,
    checked: false,
    categorie: "Famille"
  },
  {
    id: "garde",
    titre: "Frais de garde (crèche, nounou)",
    description: "50% de crédit d'impôt sur les frais de garde jusqu'à 6 ans",
    economie: 1150,
    checked: false,
    categorie: "Famille"
  },
  {
    id: "pension",
    titre: "Pension alimentaire versée",
    description: "Déductible de vos revenus si vous versez une pension",
    economie: 800,
    checked: false,
    categorie: "Famille"
  },
  {
    id: "dons",
    titre: "Dons aux associations",
    description: "66% de réduction d'impôt sur vos dons",
    economie: 200,
    checked: false,
    categorie: "Générosité"
  },
  {
    id: "emploi-domicile",
    titre: "Emploi à domicile (ménage, jardinage)",
    description: "50% de crédit d'impôt sur les salaires versés",
    economie: 600,
    checked: false,
    categorie: "Services"
  },
  {
    id: "frais-reels",
    titre: "Frais réels (si > 10% du salaire)",
    description: "Transport, repas, télétravail... peuvent dépasser l'abattement",
    economie: 500,
    checked: false,
    categorie: "Travail"
  },
  {
    id: "per",
    titre: "Épargne retraite (PER)",
    description: "Les versements sont déductibles de vos revenus",
    economie: 900,
    checked: false,
    categorie: "Épargne"
  },
  {
    id: "ehpad",
    titre: "Parent en EHPAD ou dépendant",
    description: "25% de réduction sur les frais de dépendance",
    economie: 1200,
    checked: false,
    categorie: "Famille"
  },
];

export default function ChecklistPage() {
  const [items, setItems] = useState<ChecklistItem[]>(checklistInitiale);
  const [expandedCategorie, setExpandedCategorie] = useState<string | null>("Famille");

  // Charger depuis localStorage
  useEffect(() => {
    const saved = localStorage.getItem("checklist_salarie");
    if (saved) {
      const savedIds = JSON.parse(saved) as string[];
      setItems(prev => prev.map(item => ({
        ...item,
        checked: savedIds.includes(item.id)
      })));
    }
  }, []);

  // Sauvegarder
  const toggleItem = (id: string) => {
    setItems(prev => {
      const updated = prev.map(item => 
        item.id === id ? { ...item, checked: !item.checked } : item
      );
      const checkedIds = updated.filter(i => i.checked).map(i => i.id);
      localStorage.setItem("checklist_salarie", JSON.stringify(checkedIds));
      return updated;
    });
  };

  // Grouper par catégorie
  const categories = [...new Set(items.map(i => i.categorie))];
  
  const totalEconomie = items.filter(i => i.checked).reduce((acc, i) => acc + i.economie, 0);
  const totalPossible = items.reduce((acc, i) => acc + i.economie, 0);
  const progression = items.filter(i => i.checked).length / items.length;

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      {/* Header avec progression */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
        <h1 className="text-xl font-bold text-charcoal mb-2">Ma checklist déclaration</h1>
        <p className="text-slate text-sm mb-4">
          Cochez ce qui vous concerne pour ne rien oublier
        </p>
        
        {/* Barre de progression */}
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-slate">{items.filter(i => i.checked).length} / {items.length} vérifiés</span>
            <span className="font-semibold text-primary-600">{Math.round(progression * 100)}%</span>
          </div>
          <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-primary-400 to-primary-600 rounded-full transition-all duration-500"
              style={{ width: `${progression * 100}%` }}
            />
          </div>
        </div>

        {/* Économie totale */}
        <div className="bg-primary-50 rounded-lg p-4 flex items-center justify-between">
          <div>
            <p className="text-sm text-slate">Économie potentielle cochée</p>
            <p className="text-2xl font-bold text-primary-600">
              {totalEconomie.toLocaleString()}€
              <span className="text-sm font-normal text-slate ml-2">
                / {totalPossible.toLocaleString()}€ max
              </span>
            </p>
          </div>
          <Euro className="w-10 h-10 text-primary-300" />
        </div>
      </div>

      {/* Liste par catégorie */}
      <div className="space-y-3">
        {categories.map(categorie => {
          const catItems = items.filter(i => i.categorie === categorie);
          const catChecked = catItems.filter(i => i.checked).length;
          const isExpanded = expandedCategorie === categorie;

          return (
            <div key={categorie} className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              {/* Header catégorie */}
              <button
                onClick={() => setExpandedCategorie(isExpanded ? null : categorie)}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">{
                    categorie === "Famille" ? "👨‍👩‍👧‍👦" :
                    categorie === "Générosité" ? "❤️" :
                    categorie === "Services" ? "🏠" :
                    categorie === "Travail" ? "💼" :
                    categorie === "Épargne" ? "🐷" : "📋"
                  }</span>
                  <span className="font-semibold text-charcoal">{categorie}</span>
                  <span className="text-xs bg-gray-100 text-slate px-2 py-0.5 rounded-full">
                    {catChecked}/{catItems.length}
                  </span>
                </div>
                {isExpanded ? <ChevronUp size={20} className="text-slate" /> : <ChevronDown size={20} className="text-slate" />}
              </button>

              {/* Items */}
              {isExpanded && (
                <div className="border-t border-gray-100">
                  {catItems.map(item => (
                    <div 
                      key={item.id}
                      onClick={() => toggleItem(item.id)}
                      className={`flex items-start gap-3 p-4 cursor-pointer transition-all border-b border-gray-50 last:border-b-0 ${
                        item.checked ? "bg-primary-50/50" : "hover:bg-gray-50"
                      }`}
                    >
                      {/* Checkbox */}
                      <div className="mt-0.5">
                        {item.checked ? (
                          <CheckCircle className="w-6 h-6 text-primary-500" />
                        ) : (
                          <Circle className="w-6 h-6 text-gray-300" />
                        )}
                      </div>

                      {/* Contenu */}
                      <div className="flex-1 min-w-0">
                        <p className={`font-medium ${item.checked ? "text-primary-700" : "text-charcoal"}`}>
                          {item.titre}
                        </p>
                        <p className="text-sm text-slate mt-0.5">{item.description}</p>
                      </div>

                      {/* Économie */}
                      <div className={`text-right shrink-0 ${item.checked ? "text-primary-600" : "text-slate"}`}>
                        <p className="font-bold">+{item.economie}€</p>
                        <p className="text-xs">estimé</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Message de réassurance */}
      <div className="mt-6 flex items-start gap-3 bg-blue-50 border border-blue-100 rounded-xl p-4">
        <Info className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
        <p className="text-sm text-blue-800">
          Cette checklist vous aide à ne rien oublier. Les économies sont des estimations moyennes 
          qui dépendent de votre situation. Utilisez le <strong>Simulateur</strong> pour un calcul précis.
        </p>
      </div>
    </div>
  );
}
