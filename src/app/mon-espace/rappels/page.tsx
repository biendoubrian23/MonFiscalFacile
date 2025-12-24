"use client"

import { useState } from "react"
import { Bell, Calendar, MapPin, ChevronLeft, ChevronRight, Clock, AlertCircle, CheckCircle2, Info, Euro, FileText, HelpCircle } from "lucide-react"

// Zones fiscales françaises
const ZONES_FISCALES = [
  { id: 1, nom: "Zone 1", description: "Départements 01 à 19 + Non-résidents", dateLimite: "22 mai 2025" },
  { id: 2, nom: "Zone 2", description: "Départements 20 à 54", dateLimite: "28 mai 2025" },
  { id: 3, nom: "Zone 3", description: "Départements 55 à 976 (DOM-TOM inclus)", dateLimite: "5 juin 2025" },
]

// Événements fiscaux 2025
const getEvenementsFiscaux = (zone: number) => {
  const dateLimiteDeclaration = zone === 1 ? 22 : zone === 2 ? 28 : 5
  const moisLimite = zone === 3 ? 5 : 4 // juin = 5, mai = 4 (0-indexed)

  return [
    {
      id: 1,
      titre: "Versement avance crédit d'impôt",
      description: "60% versés autour de mi-janvier (entre le 13 et 17)",
      tooltip: "🎁 L'État vous rembourse en avance 60% de vos réductions d'impôt de l'année précédente. L'argent arrive sur votre compte généralement entre le 13 et le 17 janvier (pas une date fixe !). Exemple : si vous avez eu 1000€ de crédit d'impôt pour une nounou, vous recevez environ 600€ automatiquement !",
      date: new Date(2025, 0, 15),
      type: "remboursement" as const,
      important: true,
    },
    {
      id: 2,
      titre: "Ouverture déclaration en ligne",
      description: "La déclaration de revenus 2024 est disponible",
      tooltip: "📝 C'est le moment où vous pouvez commencer à déclarer vos revenus sur impots.gouv.fr. Pas de panique, la plupart des infos sont déjà pré-remplies ! Vous n'avez qu'à vérifier et ajouter ce qui manque.",
      date: new Date(2025, 3, 10),
      type: "info" as const,
      important: true,
    },
    {
      id: 3,
      titre: "Date limite déclaration papier",
      description: "Pour ceux qui déclarent encore sur papier",
      tooltip: "📄 Si vous déclarez encore par courrier (formulaire papier), c'est votre date limite. Conseil : passez au numérique, c'est plus simple et vous avez plus de temps !",
      date: new Date(2025, 4, 20),
      type: "deadline" as const,
      important: true,
    },
    {
      id: 4,
      titre: `Date limite déclaration en ligne`,
      description: `${ZONES_FISCALES[zone - 1].description}`,
      tooltip: "⏰ C'est votre deadline pour déclarer en ligne ! Après cette date, vous risquez une pénalité de 10%. Pas de stress, ça prend souvent moins de 15 minutes si tout est pré-rempli.",
      date: new Date(2025, moisLimite, dateLimiteDeclaration),
      type: "deadline" as const,
      important: true,
    },
    {
      id: 5,
      titre: "Réception avis d'imposition",
      description: "Envoi des avis d'imposition par courrier/en ligne",
      tooltip: "📬 Vous recevez le récapitulatif officiel de votre impôt. Ce document est important : gardez-le ! Il vous servira pour des démarches (prêt immobilier, logement, aides sociales...).",
      date: new Date(2025, 6, 25),
      type: "info" as const,
      important: false,
    },
    {
      id: 6,
      titre: "1er prélèvement à la source ajusté",
      description: "Nouveau taux appliqué suite à la déclaration",
      tooltip: "💰 Votre taux de prélèvement sur votre salaire est mis à jour. Par exemple : si vous avez gagné plus l'an dernier, votre taux augmente un peu. Si vous avez eu des réductions d'impôt, il peut baisser !",
      date: new Date(2025, 8, 1),
      type: "versement" as const,
      important: false,
    },
    {
      id: 7,
      titre: "Solde crédit d'impôt",
      description: "40% restants versés autour de mi-septembre",
      tooltip: "🎉 Vous recevez les 40% restants de vos crédits d'impôt. L'argent arrive généralement entre fin août et mi-septembre (la date exacte varie chaque année). Exemple : si vous avez 1000€ de crédit d'impôt, vous avez eu ~600€ en janvier et maintenant vous recevez les ~400€ restants !",
      date: new Date(2025, 8, 15),
      type: "remboursement" as const,
      important: true,
    },
    {
      id: 8,
      titre: "Date limite versement PER",
      description: "Dernier jour pour déduire un versement PER",
      tooltip: "🐷 C'est la dernière chance pour mettre de l'argent sur votre Plan Épargne Retraite et le déduire de vos impôts ! Exemple : vous versez 1000€ → vous économisez jusqu'à 300€ d'impôts (selon votre taux).",
      date: new Date(2025, 11, 31),
      type: "deadline" as const,
      important: true,
    },
  ]
}

const MOIS = [
  "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
  "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
]

const JOURS = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"]

export default function RappelsPage() {
  const [zoneSelectionnee, setZoneSelectionnee] = useState(1)
  const [moisActuel, setMoisActuel] = useState(new Date().getMonth())
  const [anneeActuelle, setAnneeActuelle] = useState(2025)
  const [tooltipOuvert, setTooltipOuvert] = useState<number | null>(null)

  const evenements = getEvenementsFiscaux(zoneSelectionnee)

  // Obtenir les jours du mois pour le calendrier
  const getJoursDuMois = () => {
    const premierJour = new Date(anneeActuelle, moisActuel, 1)
    const dernierJour = new Date(anneeActuelle, moisActuel + 1, 0)
    const joursAvant = (premierJour.getDay() + 6) % 7 // Lundi = 0
    const totalJours = dernierJour.getDate()

    const jours: { jour: number; estMoisActuel: boolean; evenements: typeof evenements }[] = []

    // Jours du mois précédent
    const joursMoisPrecedent = new Date(anneeActuelle, moisActuel, 0).getDate()
    for (let i = joursAvant - 1; i >= 0; i--) {
      jours.push({ jour: joursMoisPrecedent - i, estMoisActuel: false, evenements: [] })
    }

    // Jours du mois actuel
    for (let i = 1; i <= totalJours; i++) {
      const dateJour = new Date(anneeActuelle, moisActuel, i)
      const eventsJour = evenements.filter(e => 
        e.date.getDate() === i && 
        e.date.getMonth() === moisActuel && 
        e.date.getFullYear() === anneeActuelle
      )
      jours.push({ jour: i, estMoisActuel: true, evenements: eventsJour })
    }

    // Jours du mois suivant
    const joursRestants = 42 - jours.length
    for (let i = 1; i <= joursRestants; i++) {
      jours.push({ jour: i, estMoisActuel: false, evenements: [] })
    }

    return jours
  }

  const naviguerMois = (direction: number) => {
    let nouveauMois = moisActuel + direction
    let nouvelleAnnee = anneeActuelle

    if (nouveauMois < 0) {
      nouveauMois = 11
      nouvelleAnnee--
    } else if (nouveauMois > 11) {
      nouveauMois = 0
      nouvelleAnnee++
    }

    setMoisActuel(nouveauMois)
    setAnneeActuelle(nouvelleAnnee)
  }

  const getTypeStyle = (type: string) => {
    switch (type) {
      case "deadline":
        return { bg: "bg-red-100", text: "text-red-700", border: "border-red-300", dot: "bg-red-500" }
      case "remboursement":
        return { bg: "bg-green-100", text: "text-green-700", border: "border-green-300", dot: "bg-green-500" }
      case "versement":
        return { bg: "bg-amber-100", text: "text-amber-700", border: "border-amber-300", dot: "bg-amber-500" }
      default:
        return { bg: "bg-blue-100", text: "text-blue-700", border: "border-blue-300", dot: "bg-blue-500" }
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "deadline":
        return <AlertCircle className="w-4 h-4" />
      case "remboursement":
        return <Euro className="w-4 h-4" />
      case "versement":
        return <Clock className="w-4 h-4" />
      default:
        return <Info className="w-4 h-4" />
    }
  }

  const aujourdhui = new Date()
  const prochainEvenement = evenements
    .filter(e => e.date >= aujourdhui)
    .sort((a, b) => a.date.getTime() - b.date.getTime())[0]

  const joursRestants = prochainEvenement 
    ? Math.ceil((prochainEvenement.date.getTime() - aujourdhui.getTime()) / (1000 * 60 * 60 * 24))
    : null

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div>
        <h1 className="text-2xl font-bold text-charcoal flex items-center gap-2">
          <Bell className="w-6 h-6 text-primary-500" />
          Mes Rappels Fiscaux
        </h1>
        <p className="text-slate mt-1">
          Calendrier fiscal 2025 personnalisé selon votre zone
        </p>
      </div>

      {/* Sélecteur de zone */}
      <div className="bg-white rounded-xl border border-slate/20 p-4">
        <div className="flex items-center gap-2 mb-3">
          <MapPin className="w-5 h-5 text-primary-500" />
          <h2 className="font-semibold text-charcoal">Votre zone fiscale</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {ZONES_FISCALES.map((zone) => (
            <button
              key={zone.id}
              onClick={() => setZoneSelectionnee(zone.id)}
              className={`p-3 rounded-lg border-2 text-left transition-all ${
                zoneSelectionnee === zone.id
                  ? "border-primary-500 bg-primary-500/5"
                  : "border-slate/20 hover:border-primary-300"
              }`}
            >
              <div className="font-semibold text-charcoal">{zone.nom}</div>
              <div className="text-xs text-slate mt-1">{zone.description}</div>
              <div className="text-sm font-medium text-primary-600 mt-2">
                📅 Limite : {zone.dateLimite}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Alerte prochain événement */}
      {prochainEvenement && joursRestants !== null && joursRestants <= 30 && (
        <div className={`rounded-xl p-4 ${getTypeStyle(prochainEvenement.type).bg} border ${getTypeStyle(prochainEvenement.type).border}`}>
          <div className="flex items-start gap-3">
            <div className={`p-2 rounded-full ${getTypeStyle(prochainEvenement.type).bg}`}>
              {getTypeIcon(prochainEvenement.type)}
            </div>
            <div className="flex-1">
              <div className="font-semibold text-charcoal">
                ⏰ Prochain événement dans {joursRestants} jour{joursRestants > 1 ? 's' : ''}
              </div>
              <div className={`font-medium ${getTypeStyle(prochainEvenement.type).text}`}>
                {prochainEvenement.titre}
              </div>
              <div className="text-sm text-slate mt-1">
                {prochainEvenement.date.toLocaleDateString('fr-FR', { 
                  weekday: 'long', 
                  day: 'numeric', 
                  month: 'long', 
                  year: 'numeric' 
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Calendrier */}
        <div className="bg-white rounded-xl border border-slate/20 p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-charcoal flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary-500" />
              Calendrier {anneeActuelle}
            </h2>
            <div className="flex items-center gap-2">
              <button
                onClick={() => naviguerMois(-1)}
                className="p-1.5 rounded-lg hover:bg-slate/10 transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-slate" />
              </button>
              <span className="font-medium text-charcoal min-w-[100px] text-center">
                {MOIS[moisActuel]}
              </span>
              <button
                onClick={() => naviguerMois(1)}
                className="p-1.5 rounded-lg hover:bg-slate/10 transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-slate" />
              </button>
            </div>
          </div>

          {/* Grille du calendrier */}
          <div className="grid grid-cols-7 gap-1">
            {JOURS.map((jour) => (
              <div key={jour} className="text-center text-xs font-medium text-slate py-2">
                {jour}
              </div>
            ))}
            {getJoursDuMois().map((jour, index) => {
              const estAujourdhui = jour.estMoisActuel && 
                jour.jour === aujourdhui.getDate() && 
                moisActuel === aujourdhui.getMonth() && 
                anneeActuelle === aujourdhui.getFullYear()

              return (
                <div
                  key={index}
                  className={`relative aspect-square flex flex-col items-center justify-center rounded-lg text-sm
                    ${jour.estMoisActuel ? "text-charcoal" : "text-slate/40"}
                    ${estAujourdhui ? "bg-primary-500 text-white font-bold" : ""}
                    ${jour.evenements.length > 0 && !estAujourdhui ? "bg-slate/5" : ""}
                  `}
                >
                  <span>{jour.jour}</span>
                  {jour.evenements.length > 0 && (
                    <div className="flex gap-0.5 mt-0.5">
                      {jour.evenements.slice(0, 2).map((evt, i) => (
                        <div
                          key={i}
                          className={`w-1.5 h-1.5 rounded-full ${getTypeStyle(evt.type).dot}`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Légende */}
          <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-slate/10">
            <div className="flex items-center gap-1.5 text-xs">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
              <span className="text-slate">Date limite</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs">
              <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
              <span className="text-slate">Remboursement</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs">
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              <span className="text-slate">Versement</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs">
              <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
              <span className="text-slate">Information</span>
            </div>
          </div>
        </div>

        {/* Liste des événements */}
        <div className="bg-white rounded-xl border border-slate/20 p-4">
          <h2 className="font-semibold text-charcoal flex items-center gap-2 mb-4">
            <FileText className="w-5 h-5 text-primary-500" />
            Dates clés 2025
          </h2>

          <div className="space-y-3 pr-2">
            {evenements
              .sort((a, b) => a.date.getTime() - b.date.getTime())
              .map((evt) => {
                const style = getTypeStyle(evt.type)
                const estPasse = evt.date < aujourdhui
                const isTooltipOpen = tooltipOuvert === evt.id

                return (
                  <div
                    key={evt.id}
                    className={`p-3 rounded-lg border ${style.border} ${style.bg} ${
                      estPasse ? "opacity-50" : ""
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-1.5 rounded-full ${style.bg} ${style.text}`}>
                        {getTypeIcon(evt.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className={`font-medium ${style.text}`}>
                            {evt.titre}
                          </span>
                          {evt.important && !estPasse && (
                            <span className="px-1.5 py-0.5 text-[10px] font-bold bg-red-500 text-white rounded">
                              IMPORTANT
                            </span>
                          )}
                          {estPasse && (
                            <CheckCircle2 className="w-4 h-4 text-green-500" />
                          )}
                          {/* Bouton info-bulle */}
                          <button
                            onClick={() => setTooltipOuvert(isTooltipOpen ? null : evt.id)}
                            className={`p-1 rounded-full transition-colors ${
                              isTooltipOpen 
                                ? "bg-primary-500 text-white" 
                                : "hover:bg-slate/10 text-slate"
                            }`}
                            title="Plus d'infos"
                          >
                            <HelpCircle className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-xs text-slate mt-0.5">{evt.description}</p>
                        
                        {/* Info-bulle dépliée */}
                        {isTooltipOpen && evt.tooltip && (
                          <div className="mt-2 p-3 bg-white rounded-lg border border-slate/20 shadow-sm">
                            <p className="text-sm text-charcoal leading-relaxed">
                              {evt.tooltip}
                            </p>
                          </div>
                        )}
                        
                        <p className="text-xs font-medium text-charcoal mt-1">
                          📅 {evt.date.toLocaleDateString('fr-FR', { 
                            weekday: 'long',
                            day: 'numeric', 
                            month: 'long' 
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })}
          </div>
        </div>
      </div>
    </div>
  )
}
