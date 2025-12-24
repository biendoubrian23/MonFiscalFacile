"use client";

import { useState } from "react";
import { FileText, Download, Copy, Check, Info, ChevronRight, Printer } from "lucide-react";

// Données simulées - à connecter avec le simulateur
const mockDeclarationData = {
  salaireNet: 30000,
  impotAvant: 1664,
  impotApres: 890,
  economie: 774,
  items: [
    { case: "1AJ", libelle: "Salaires", montant: 30000, formulaire: "2042" },
    { case: "7DB", libelle: "Frais de garde (enfants < 6 ans)", montant: 2400, formulaire: "2042 RICI" },
    { case: "7UD", libelle: "Dons aux associations", montant: 150, formulaire: "2042 RICI" },
    { case: "6NS", libelle: "Versements PER", montant: 1000, formulaire: "2042" },
  ]
};

export default function RecapPage() {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleExportPDF = () => {
    // TODO: Implémenter l'export PDF
    alert("Export PDF en cours de développement...");
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 pb-24">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
            <FileText size={24} className="text-primary-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-charcoal">Mon Récap Déclaration</h1>
            <p className="text-slate text-sm">Tout ce que vous devez déclarer, prêt à reporter</p>
          </div>
        </div>
      </div>

      {/* Résumé économies */}
      <div className="bg-gradient-to-r from-primary-50 to-green-50 border border-primary-100 rounded-2xl p-6 mb-8">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-xs text-slate mb-1">Impôt initial</p>
            <p className="text-xl font-bold text-charcoal">{mockDeclarationData.impotAvant.toLocaleString()}€</p>
          </div>
          <div>
            <p className="text-xs text-slate mb-1">Après optimisation</p>
            <p className="text-xl font-bold text-green-600">{mockDeclarationData.impotApres.toLocaleString()}€</p>
          </div>
          <div>
            <p className="text-xs text-slate mb-1">Économie</p>
            <p className="text-xl font-bold text-primary-600">-{mockDeclarationData.economie.toLocaleString()}€</p>
          </div>
        </div>
      </div>

      {/* Boutons d'action */}
      <div className="flex gap-3 mb-8">
        <button
          onClick={handleExportPDF}
          className="flex-1 flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-4 rounded-xl transition-colors"
        >
          <Download size={18} />
          Exporter en PDF
        </button>
        <button
          onClick={handlePrint}
          className="flex items-center justify-center gap-2 bg-white border border-gray-200 hover:bg-gray-50 text-charcoal font-medium py-3 px-4 rounded-xl transition-colors"
        >
          <Printer size={18} />
        </button>
      </div>

      {/* Info box */}
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-6 flex items-start gap-3">
        <Info size={18} className="text-blue-500 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-blue-700">
          Reportez ces montants dans les cases correspondantes lors de votre déclaration sur impots.gouv.fr
        </p>
      </div>

      {/* Liste des cases à remplir */}
      <div className="space-y-4">
        <h2 className="font-semibold text-charcoal flex items-center gap-2">
          <span>Cases à remplir</span>
          <span className="text-xs bg-gray-100 text-slate px-2 py-1 rounded-full">
            {mockDeclarationData.items.length} éléments
          </span>
        </h2>

        {mockDeclarationData.items.map((item, index) => (
          <div
            key={index}
            className="bg-white border border-gray-100 rounded-xl p-4 hover:shadow-sm transition-shadow"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <span className="bg-primary-100 text-primary-700 font-mono font-bold text-sm px-3 py-1.5 rounded-lg">
                  {item.case}
                </span>
                <div>
                  <p className="font-medium text-charcoal">{item.libelle}</p>
                  <p className="text-xs text-slate">Formulaire {item.formulaire}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-charcoal">
                  {item.montant.toLocaleString()}€
                </span>
                <button
                  onClick={() => handleCopy(item.montant.toString(), item.case)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  title="Copier le montant"
                >
                  {copied === item.case ? (
                    <Check size={16} className="text-green-500" />
                  ) : (
                    <Copy size={16} className="text-slate" />
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lien vers impots.gouv */}
      <a
        href="https://www.impots.gouv.fr"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 flex items-center justify-between bg-gray-50 border border-gray-200 rounded-xl p-4 hover:bg-gray-100 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <FileText size={20} className="text-blue-600" />
          </div>
          <div>
            <p className="font-medium text-charcoal">Accéder à ma déclaration</p>
            <p className="text-xs text-slate">impots.gouv.fr</p>
          </div>
        </div>
        <ChevronRight size={20} className="text-slate" />
      </a>
    </div>
  );
}
