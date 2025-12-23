"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import {
  Sparkles,
  CheckCircle,
  XCircle,
  Info,
  ArrowRight,
} from "lucide-react";

export default function SimulateurACREPage() {
  const [etape, setEtape] = useState(1);
  const [reponses, setReponses] = useState({
    nouvelleActivite: false,
    dateLancement: "",
    situationAvant: "",
    aideRecue: false,
  });
  const [resultat, setResultat] = useState<{eligible: boolean; economies: number} | null>(null);

  const questions = [
    {
      id: "nouvelleActivite",
      question: "Allez-vous créer ou reprendre une activité ?",
      type: "boolean",
    },
    {
      id: "dateLancement",
      question: "Quand avez-vous (ou allez-vous) démarrer cette activité ?",
      type: "date",
    },
    {
      id: "situationAvant",
      question: "Quelle était votre situation avant cette création ?",
      type: "select",
      options: [
        { value: "chomage", label: "Demandeur d'emploi" },
        { value: "salarie", label: "Salarié" },
        { value: "etudiant", label: "Étudiant" },
        { value: "rsa", label: "Bénéficiaire du RSA" },
        { value: "autre", label: "Autre situation" },
      ],
    },
    {
      id: "aideRecue",
      question: "Avez-vous déjà bénéficié de l'ACRE ces 3 dernières années ?",
      type: "boolean",
    },
  ];

  const calculerEligibilite = () => {
    // Logique simplifiée d'éligibilité
    const eligible = reponses.nouvelleActivite && 
      !reponses.aideRecue && 
      ["chomage", "rsa", "etudiant"].includes(reponses.situationAvant);
    
    const economies = eligible ? 3500 : 0; // Estimation moyenne
    
    setResultat({ eligible, economies });
    setEtape(5);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-charcoal">Simulateur ACRE</h1>
        <p className="text-slate mt-1">
          Vérifiez votre éligibilité à l'exonération de cotisations sociales
        </p>
      </div>

      {/* Progression */}
      <div className="flex items-center gap-2">
        {[1, 2, 3, 4].map((step) => (
          <div
            key={step}
            className={`h-2 flex-1 ${
              step <= etape ? "bg-primary-500" : "bg-gray-100"
            }`}
          />
        ))}
      </div>

      {/* Questions */}
      {etape <= 4 && !resultat && (
        <div className="bg-white border border-gray-100 p-6">
          <p className="text-sm text-slate mb-2">Question {etape}/4</p>
          <h2 className="text-lg font-semibold text-charcoal mb-6">
            {questions[etape - 1].question}
          </h2>

          {questions[etape - 1].type === "boolean" && (
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => {
                  setReponses({ ...reponses, [questions[etape - 1].id]: true });
                  etape < 4 ? setEtape(etape + 1) : calculerEligibilite();
                }}
                className="p-4 border border-gray-200 hover:border-primary-500 hover:bg-primary-50 transition-colors"
              >
                <span className="font-medium text-charcoal">Oui</span>
              </button>
              <button
                onClick={() => {
                  setReponses({ ...reponses, [questions[etape - 1].id]: false });
                  etape < 4 ? setEtape(etape + 1) : calculerEligibilite();
                }}
                className="p-4 border border-gray-200 hover:border-primary-500 hover:bg-primary-50 transition-colors"
              >
                <span className="font-medium text-charcoal">Non</span>
              </button>
            </div>
          )}

          {questions[etape - 1].type === "date" && (
            <div className="space-y-4">
              <input
                type="month"
                value={reponses.dateLancement}
                onChange={(e) => setReponses({ ...reponses, dateLancement: e.target.value })}
                className="w-full p-3 border border-gray-200 focus:border-primary-500 focus:outline-none"
              />
              <button
                onClick={() => setEtape(etape + 1)}
                disabled={!reponses.dateLancement}
                className="w-full py-3 bg-primary-500 text-white font-medium hover:bg-primary-600 disabled:bg-gray-200 disabled:text-slate transition-colors"
              >
                Continuer
              </button>
            </div>
          )}

          {questions[etape - 1].type === "select" && (
            <div className="space-y-2">
              {questions[etape - 1].options?.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => {
                    setReponses({ ...reponses, situationAvant: opt.value });
                    etape < 4 ? setEtape(etape + 1) : calculerEligibilite();
                  }}
                  className="w-full p-4 text-left border border-gray-200 hover:border-primary-500 hover:bg-primary-50 transition-colors"
                >
                  <span className="font-medium text-charcoal">{opt.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Résultat */}
      {resultat && (
        <div className="bg-white border border-gray-100 p-6">
          <div className={`w-16 h-16 mx-auto mb-4 flex items-center justify-center ${
            resultat.eligible ? "bg-green-50" : "bg-red-50"
          }`}>
            {resultat.eligible ? (
              <CheckCircle className="w-8 h-8 text-green-500" />
            ) : (
              <XCircle className="w-8 h-8 text-red-500" />
            )}
          </div>

          <h2 className={`text-xl font-semibold text-center mb-2 ${
            resultat.eligible ? "text-green-600" : "text-red-600"
          }`}>
            {resultat.eligible 
              ? "Vous êtes probablement éligible à l'ACRE !"
              : "Vous ne semblez pas éligible à l'ACRE"
            }
          </h2>

          {resultat.eligible && (
            <div className="text-center mb-6">
              <p className="text-3xl font-bold text-primary-600">
                ~{resultat.economies.toLocaleString()}€
              </p>
              <p className="text-sm text-slate">d'économies estimées la première année</p>
            </div>
          )}

          <div className="bg-blue-50 border border-blue-100 p-4 flex items-start gap-3 mb-6">
            <Info className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-blue-700">
              {resultat.eligible 
                ? "Pour bénéficier de l'ACRE, vous devez en faire la demande au moment de votre déclaration d'activité ou dans les 45 jours suivants."
                : "Certaines conditions spécifiques peuvent ouvrir droit à l'ACRE. Consultez le site de l'URSSAF pour plus de détails."
              }
            </p>
          </div>

          <button
            onClick={() => {
              setEtape(1);
              setResultat(null);
              setReponses({
                nouvelleActivite: false,
                dateLancement: "",
                situationAvant: "",
                aideRecue: false,
              });
            }}
            className="w-full py-3 border border-gray-200 text-charcoal font-medium hover:bg-gray-50 transition-colors"
          >
            Recommencer
          </button>
        </div>
      )}
    </div>
  );
}
