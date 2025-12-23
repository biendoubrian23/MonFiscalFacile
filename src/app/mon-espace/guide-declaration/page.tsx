"use client";

import { useState } from "react";
import { PlayCircle, ChevronRight, ExternalLink, CheckCircle, Image as ImageIcon } from "lucide-react";

interface GuideStep {
  id: string;
  titre: string;
  description: string;
  image?: string; // URL de la capture d'écran
  video?: string; // URL de la vidéo
  lien?: string; // Lien externe vers impots.gouv
}

interface Guide {
  id: string;
  titre: string;
  emoji: string;
  description: string;
  tempsEstime: string;
  etapes: GuideStep[];
}

const guides: Guide[] = [
  {
    id: "enfants",
    titre: "Déclarer ses enfants à charge",
    emoji: "👶",
    description: "Comment ajouter vos enfants pour bénéficier du quotient familial",
    tempsEstime: "2 min",
    etapes: [
      {
        id: "1",
        titre: "Connectez-vous sur impots.gouv.fr",
        description: "Rendez-vous sur votre espace particulier et cliquez sur 'Déclarer mes revenus'",
        lien: "https://www.impots.gouv.fr"
      },
      {
        id: "2",
        titre: "Accédez à la rubrique 'Situation de famille'",
        description: "Dans le menu de gauche, cliquez sur 'Situation et charges de famille'"
      },
      {
        id: "3",
        titre: "Renseignez le nombre d'enfants",
        description: "Indiquez le nombre d'enfants à charge dans la case prévue (cadre C)"
      },
      {
        id: "4",
        titre: "Complétez les informations",
        description: "Renseignez la date de naissance de chaque enfant"
      }
    ]
  },
  {
    id: "garde",
    titre: "Déclarer les frais de garde",
    emoji: "🏠",
    description: "Crèche, nounou, assistante maternelle... récupérez 50% en crédit d'impôt",
    tempsEstime: "3 min",
    etapes: [
      {
        id: "1",
        titre: "Récupérez vos attestations",
        description: "Votre crèche ou nounou vous a fourni une attestation fiscale annuelle"
      },
      {
        id: "2",
        titre: "Accédez à la rubrique 'Réductions et crédits d'impôt'",
        description: "Dans votre déclaration, cherchez la section 7"
      },
      {
        id: "3",
        titre: "Remplissez la case 7GA à 7GG",
        description: "Case 7GA : 1er enfant, 7GB : 2ème enfant, etc. Indiquez le montant net payé"
      },
      {
        id: "4",
        titre: "Le crédit sera calculé automatiquement",
        description: "50% du montant déclaré (plafonné à 1 150€ par enfant)"
      }
    ]
  },
  {
    id: "dons",
    titre: "Déclarer ses dons",
    emoji: "❤️",
    description: "Associations, Restos du cœur... récupérez 66% à 75% de vos dons",
    tempsEstime: "2 min",
    etapes: [
      {
        id: "1",
        titre: "Rassemblez vos reçus fiscaux",
        description: "Chaque association doit vous envoyer un reçu fiscal (papier ou email)"
      },
      {
        id: "2",
        titre: "Identifiez le type de don",
        description: "Organismes d'aide aux personnes = 75% | Autres associations = 66%"
      },
      {
        id: "3",
        titre: "Remplissez les cases 7UD ou 7UF",
        description: "7UD : dons aux organismes d'aide (75%) | 7UF : autres dons (66%)"
      }
    ]
  },
  {
    id: "emploi-domicile",
    titre: "Déclarer l'emploi à domicile",
    emoji: "🧹",
    description: "Ménage, jardinage, soutien scolaire... 50% de crédit d'impôt",
    tempsEstime: "3 min",
    etapes: [
      {
        id: "1",
        titre: "Récupérez l'attestation CESU ou Pajemploi",
        description: "Disponible sur votre espace URSSAF ou dans vos emails"
      },
      {
        id: "2",
        titre: "Accédez à la case 7DB",
        description: "Rubrique 'Réductions et crédits d'impôt' > Services à la personne"
      },
      {
        id: "3",
        titre: "Indiquez le montant total",
        description: "Somme des salaires + charges sociales payés dans l'année"
      }
    ]
  },
  {
    id: "frais-reels",
    titre: "Opter pour les frais réels",
    emoji: "🚗",
    description: "Si vos frais dépassent 10% de votre salaire, c'est plus avantageux",
    tempsEstime: "5 min",
    etapes: [
      {
        id: "1",
        titre: "Calculez vos frais réels",
        description: "Transport (barème km), repas (4,95€/jour si cantine > 9,90€), télétravail (2,50€/jour)"
      },
      {
        id: "2",
        titre: "Comparez avec l'abattement 10%",
        description: "Si frais réels > 10% du salaire net imposable, optez pour les frais réels"
      },
      {
        id: "3",
        titre: "Remplissez la case 1AK",
        description: "Indiquez le montant total de vos frais réels"
      },
      {
        id: "4",
        titre: "Conservez vos justificatifs",
        description: "Gardez-les 3 ans en cas de contrôle (factures, relevés kilométriques...)"
      }
    ]
  }
];

export default function GuideDeclarationPage() {
  const [selectedGuide, setSelectedGuide] = useState<Guide | null>(null);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);

  const toggleStep = (guideId: string, stepId: string) => {
    const key = `${guideId}-${stepId}`;
    setCompletedSteps(prev => 
      prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
    );
  };

  if (selectedGuide) {
    const guideProgress = selectedGuide.etapes.filter(e => 
      completedSteps.includes(`${selectedGuide.id}-${e.id}`)
    ).length / selectedGuide.etapes.length;

    return (
      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Header */}
        <button
          onClick={() => setSelectedGuide(null)}
          className="flex items-center gap-2 text-slate hover:text-charcoal mb-4 transition-colors"
        >
          ← Retour aux guides
        </button>

        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
          <div className="flex items-start gap-4 mb-4">
            <span className="text-4xl">{selectedGuide.emoji}</span>
            <div>
              <h1 className="text-xl font-bold text-charcoal">{selectedGuide.titre}</h1>
              <p className="text-slate text-sm">{selectedGuide.description}</p>
            </div>
          </div>

          {/* Progression */}
          <div className="flex items-center gap-3 bg-primary-50 rounded-lg p-3">
            <div className="flex-1">
              <div className="h-2 bg-primary-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary-500 rounded-full transition-all duration-300"
                  style={{ width: `${guideProgress * 100}%` }}
                />
              </div>
            </div>
            <span className="text-sm font-semibold text-primary-600">
              {Math.round(guideProgress * 100)}%
            </span>
          </div>
        </div>

        {/* Étapes */}
        <div className="space-y-3">
          {selectedGuide.etapes.map((etape, index) => {
            const isCompleted = completedSteps.includes(`${selectedGuide.id}-${etape.id}`);

            return (
              <div 
                key={etape.id}
                className={`bg-white border rounded-xl p-4 transition-all ${
                  isCompleted ? "border-primary-200 bg-primary-50/30" : "border-gray-200"
                }`}
              >
                <div className="flex items-start gap-4">
                  {/* Numéro / Check */}
                  <button
                    onClick={() => toggleStep(selectedGuide.id, etape.id)}
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all ${
                      isCompleted 
                        ? "bg-primary-500 text-white" 
                        : "bg-gray-100 text-slate hover:bg-gray-200"
                    }`}
                  >
                    {isCompleted ? <CheckCircle size={18} /> : <span className="font-bold">{index + 1}</span>}
                  </button>

                  {/* Contenu */}
                  <div className="flex-1">
                    <h3 className={`font-semibold ${isCompleted ? "text-primary-700" : "text-charcoal"}`}>
                      {etape.titre}
                    </h3>
                    <p className="text-sm text-slate mt-1">{etape.description}</p>

                    {/* Zone média (capture/vidéo) */}
                    {(etape.image || etape.video) && (
                      <div className="mt-3 bg-gray-100 rounded-lg p-4 flex items-center justify-center min-h-[120px]">
                        <div className="text-center text-slate">
                          <ImageIcon size={32} className="mx-auto mb-2 opacity-50" />
                          <p className="text-xs">Capture d'écran à venir</p>
                        </div>
                      </div>
                    )}

                    {/* Lien externe */}
                    {etape.lien && (
                      <a
                        href={etape.lien}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 mt-3 text-sm text-primary-600 hover:text-primary-700"
                      >
                        Ouvrir impots.gouv.fr <ExternalLink size={14} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Message fin */}
        {guideProgress === 1 && (
          <div className="mt-6 bg-green-50 border border-green-200 rounded-xl p-4 text-center">
            <p className="text-green-700 font-semibold">🎉 Bravo ! Vous avez terminé ce guide.</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl font-bold text-charcoal mb-2">Comment déclarer ?</h1>
        <p className="text-slate text-sm">
          Guides pas à pas avec captures d'écran pour remplir votre déclaration
        </p>
      </div>

      {/* Liste des guides */}
      <div className="space-y-3">
        {guides.map(guide => (
          <button
            key={guide.id}
            onClick={() => setSelectedGuide(guide)}
            className="w-full bg-white border border-gray-200 rounded-xl p-4 hover:border-primary-200 hover:shadow-sm transition-all text-left group"
          >
            <div className="flex items-center gap-4">
              <span className="text-3xl">{guide.emoji}</span>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-charcoal group-hover:text-primary-600 transition-colors">
                  {guide.titre}
                </h3>
                <p className="text-sm text-slate truncate">{guide.description}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-xs text-slate mb-1">{guide.tempsEstime}</p>
                <ChevronRight size={20} className="text-slate group-hover:text-primary-500 transition-colors" />
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Placeholder pour vidéos */}
      <div className="mt-8 bg-gray-50 border border-gray-200 rounded-xl p-6 text-center">
        <PlayCircle size={48} className="mx-auto text-gray-300 mb-3" />
        <h3 className="font-semibold text-charcoal mb-1">Vidéos tutorielles</h3>
        <p className="text-sm text-slate">
          Bientôt disponibles : des vidéos pour vous montrer exactement où cliquer
        </p>
      </div>
    </div>
  );
}
