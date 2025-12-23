"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/contexts/AuthContext";
import {
  LayoutDashboard,
  User,
  ClipboardList,
  Bell,
  BookOpen,
  LogOut,
  Crown,
  ChevronRight,
  Menu,
  X,
  Loader2,
  Lock,
  Calculator,
  History,
  CreditCard,
  HelpCircle,
  Sparkles,
  TrendingUp,
} from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  premium?: boolean;
  badge?: string;
  badgeColor?: string;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

const navSections: NavSection[] = [
  {
    title: "Tableau de bord",
    items: [
      { label: "Vue d'ensemble", href: "/mon-espace", icon: <LayoutDashboard size={20} /> },
      { label: "Mes simulations", href: "/mon-espace/simulations", icon: <History size={20} /> },
    ],
  },
  {
    title: "Outils",
    items: [
      { label: "Calculatrices", href: "/mon-espace/calculatrices", icon: <Calculator size={20} />, badge: "Nouveau", badgeColor: "bg-primary-500" },
      { label: "Plan d'action", href: "/mon-espace/plan-action", icon: <ClipboardList size={20} />, premium: true },
      { label: "Rappels fiscaux", href: "/mon-espace/rappels", icon: <Bell size={20} />, premium: true },
    ],
  },
  {
    title: "Ressources",
    items: [
      { label: "Guides pratiques", href: "/mon-espace/guides", icon: <BookOpen size={20} />, premium: true },
      { label: "Profil fiscal", href: "/mon-espace/profil", icon: <User size={20} /> },
    ],
  },
  {
    title: "Compte",
    items: [
      { label: "Abonnement", href: "/mon-espace/abonnement", icon: <CreditCard size={20} /> },
      { label: "Aide", href: "/mon-espace/aide", icon: <HelpCircle size={20} /> },
    ],
  },
];

export default function MonEspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, profile, isPremium, signOut, loading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Rediriger vers connexion si non authentifié
  useEffect(() => {
    if (!loading && !user) {
      router.push("/connexion");
    }
  }, [user, loading, router]);

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  // Afficher un loader pendant la vérification
  if (loading) {
    return (
      <div className="min-h-screen bg-offwhite flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-primary-500 animate-spin" />
      </div>
    );
  }

  // Ne rien afficher si non authentifié (redirection en cours)
  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-offwhite flex">
      {/* Overlay mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-72 bg-white border-r border-gray-200 transform transition-transform lg:transform-none ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <Link href="/">
                <Image src="/logo.png" alt="MonFiscalFacile" width={150} height={40} className="h-8 w-auto" />
              </Link>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden text-slate hover:text-charcoal"
                title="Fermer le menu"
                aria-label="Fermer le menu"
              >
                <X size={24} />
              </button>
            </div>
          </div>

          {/* Profil utilisateur */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">
                  {profile?.full_name?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-charcoal truncate">
                  {profile?.full_name || "Utilisateur"}
                </p>
                <p className="text-sm text-slate truncate">{user.email}</p>
              </div>
            </div>
            
            {/* Badge abonnement */}
            <div className="mt-4">
              {isPremium ? (
                <div className="bg-gradient-to-r from-amber-400 to-amber-500 text-white px-4 py-2.5 rounded-lg flex items-center gap-2 shadow-md">
                  <Crown size={18} />
                  <span className="font-semibold">Premium actif</span>
                  <Sparkles size={14} className="ml-auto" />
                </div>
              ) : (
                <Link
                  href="/mon-espace/abonnement"
                  className="block bg-gradient-to-r from-gray-50 to-gray-100 hover:from-primary-50 hover:to-primary-100 border border-gray-200 hover:border-primary-200 transition-all px-4 py-3 rounded-lg group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center group-hover:bg-primary-100">
                        <TrendingUp size={16} className="text-slate group-hover:text-primary-500" />
                      </div>
                      <div>
                        <span className="text-sm font-medium text-charcoal block">Compte Gratuit</span>
                        <span className="text-xs text-primary-500">Débloquer tout →</span>
                      </div>
                    </div>
                    <ChevronRight size={18} className="text-slate group-hover:text-primary-500 transition-colors" />
                  </div>
                </Link>
              )}
            </div>
          </div>

          {/* Navigation par sections */}
          <nav className="flex-1 p-3 overflow-y-auto">
            {navSections.map((section) => (
              <div key={section.title} className="mb-6">
                <h3 className="text-xs font-semibold text-slate uppercase tracking-wider px-4 mb-2">
                  {section.title}
                </h3>
                <ul className="space-y-1">
                  {section.items.map((item) => {
                    const isActive = pathname === item.href;
                    const isLocked = item.premium && !isPremium;

                    return (
                      <li key={item.href}>
                        {isLocked ? (
                          <Link
                            href="/mon-espace/abonnement"
                            className="flex items-center gap-3 px-4 py-2.5 text-slate hover:bg-gray-50 rounded-lg transition-colors group"
                            onClick={() => setSidebarOpen(false)}
                          >
                            <span className="text-slate group-hover:text-charcoal">{item.icon}</span>
                            <span className="flex-1 text-sm">{item.label}</span>
                            <Lock size={14} className="text-slate" />
                          </Link>
                        ) : (
                          <Link
                            href={item.href}
                            onClick={() => setSidebarOpen(false)}
                            className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${
                              isActive
                                ? "bg-primary-50 text-primary-600 font-medium shadow-sm"
                                : "text-slate hover:bg-gray-50 hover:text-charcoal"
                            }`}
                          >
                            <span className={isActive ? "text-primary-500" : ""}>{item.icon}</span>
                            <span className="flex-1 text-sm">{item.label}</span>
                            {item.badge && (
                              <span className={`${item.badgeColor || 'bg-gray-500'} text-white text-xs px-2 py-0.5 rounded-full`}>
                                {item.badge}
                              </span>
                            )}
                          </Link>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </nav>

          {/* Actions du bas */}
          <div className="p-3 border-t border-gray-200">
            <Link
              href="/simulation"
              className="flex items-center justify-center gap-2 bg-primary-500 hover:bg-primary-600 text-white px-4 py-3 rounded-lg font-semibold transition-all mb-2"
            >
              <Calculator size={18} />
              Nouvelle simulation
            </Link>
            <button
              onClick={() => {
                handleSignOut();
                setSidebarOpen(false);
              }}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-slate hover:bg-gray-50 hover:text-charcoal rounded-lg transition-colors"
            >
              <LogOut size={18} />
              <span className="text-sm">Se déconnecter</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Contenu principal */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header mobile amélioré */}
        <header className="lg:hidden bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-30">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="w-10 h-10 flex items-center justify-center text-slate hover:text-charcoal hover:bg-gray-100 rounded-lg transition-colors"
              title="Ouvrir le menu"
              aria-label="Ouvrir le menu"
            >
              <Menu size={24} />
            </button>
            <Link href="/mon-espace" className="flex items-center gap-2">
              <Image src="/logo.png" alt="MonFiscalFacile" width={120} height={32} className="h-6 w-auto" />
            </Link>
            <Link
              href="/simulation"
              className="w-10 h-10 flex items-center justify-center bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
              title="Nouvelle simulation"
            >
              <Calculator size={20} />
            </Link>
          </div>
        </header>

        {/* Contenu de la page avec padding pour bottom nav mobile */}
        <main className="flex-1 p-4 lg:p-8 pb-24 lg:pb-8 overflow-y-auto">
          {children}
        </main>

        {/* Bottom Navigation Mobile */}
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-30 safe-area-pb">
          <div className="flex items-center justify-around py-2">
            <Link
              href="/mon-espace"
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors ${
                pathname === "/mon-espace" ? "text-primary-500" : "text-slate"
              }`}
            >
              <LayoutDashboard size={22} />
              <span className="text-xs font-medium">Accueil</span>
            </Link>
            <Link
              href="/mon-espace/simulations"
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors ${
                pathname === "/mon-espace/simulations" ? "text-primary-500" : "text-slate"
              }`}
            >
              <History size={22} />
              <span className="text-xs font-medium">Simulations</span>
            </Link>
            <Link
              href="/mon-espace/calculatrices"
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors ${
                pathname === "/mon-espace/calculatrices" ? "text-primary-500" : "text-slate"
              }`}
            >
              <Calculator size={22} />
              <span className="text-xs font-medium">Outils</span>
            </Link>
            <Link
              href="/mon-espace/profil"
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors ${
                pathname === "/mon-espace/profil" ? "text-primary-500" : "text-slate"
              }`}
            >
              <User size={22} />
              <span className="text-xs font-medium">Profil</span>
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
}
