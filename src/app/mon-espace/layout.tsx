"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/contexts/AuthContext";
import {
  Calculator,
  FileText,
  Bell,
  Lightbulb,
  BarChart3,
  PlayCircle,
  HelpCircle,
  Settings,
  LogOut,
  Crown,
  ChevronRight,
  Menu,
  X,
  Loader2,
  Sparkles,
} from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  premium?: boolean;
  badge?: string;
  badgeColor?: string;
}

// Sidebar épurée - Navigation pour les salariés
const navItems: NavItem[] = [
  { label: "Simulateur", href: "/mon-espace/salarie", icon: <Calculator size={20} />, badge: "Principal", badgeColor: "bg-primary-500" },
  { label: "Mes Rappels", href: "/mon-espace/rappels", icon: <Bell size={20} /> },
  { label: "Historique", href: "/mon-espace/historique", icon: <BarChart3 size={20} /> },
  { label: "Comment déclarer", href: "/mon-espace/guide-declaration", icon: <PlayCircle size={20} /> },
  { label: "Aide", href: "/mon-espace/aide", icon: <HelpCircle size={20} /> },
  { label: "Mon compte", href: "/mon-espace/compte", icon: <Settings size={20} /> },
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
  const [isDevMode, setIsDevMode] = useState(false);
  const [devUser, setDevUser] = useState<{ name: string; email: string } | null>(null);

  // Vérifier mode dev au chargement
  useEffect(() => {
    const devMode = localStorage.getItem("dev_mode");
    const devUserData = localStorage.getItem("dev_user");
    if (devMode === "true" && devUserData) {
      setIsDevMode(true);
      setDevUser(JSON.parse(devUserData));
    }
  }, []);

  // Rediriger vers connexion si non authentifié ET pas en mode dev
  useEffect(() => {
    if (!loading && !user && !isDevMode) {
      // Attendre un peu pour laisser le temps de vérifier le localStorage
      const timer = setTimeout(() => {
        const devMode = localStorage.getItem("dev_mode");
        if (devMode !== "true") {
          router.push("/connexion");
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [user, loading, router, isDevMode]);

  const handleSignOut = async () => {
    // Nettoyer le mode dev aussi
    localStorage.removeItem("dev_mode");
    localStorage.removeItem("dev_user");
    setIsDevMode(false);
    setDevUser(null);
    await signOut();
    router.push("/");
  };

  // Afficher un loader pendant la vérification
  if (loading && !isDevMode) {
    return (
      <div className="min-h-screen bg-offwhite flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-primary-500 animate-spin" />
      </div>
    );
  }

  // Ne rien afficher si non authentifié ET pas en mode dev (redirection en cours)
  if (!user && !isDevMode) {
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
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-gray-200 transform transition-transform lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-screen flex flex-col overflow-hidden">
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

          {/* Navigation simple */}
          <nav className="flex-1 p-3 overflow-y-auto">
            <ul className="space-y-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href;

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                        isActive
                          ? "bg-primary-50 text-primary-600 font-medium shadow-sm"
                          : "text-slate hover:bg-gray-50 hover:text-charcoal"
                      }`}
                    >
                      <span className={isActive ? "text-primary-500" : ""}>{item.icon}</span>
                      <span className="flex-1 text-sm font-medium">{item.label}</span>
                      {item.badge && (
                        <span className={`${item.badgeColor || 'bg-gray-500'} text-white text-xs px-2 py-0.5 rounded-full`}>
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Profil utilisateur + Déconnexion */}
          <div className="p-3 border-t border-gray-200">
            <div className="flex items-center gap-3 px-2 py-2 mb-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center shadow-sm">
                <span className="text-white font-bold text-sm">
                  {devUser?.name?.charAt(0).toUpperCase() || profile?.full_name?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase() || "U"}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-charcoal text-sm truncate">
                  {devUser?.name || profile?.full_name || "Utilisateur"}
                </p>
                <p className="text-xs text-slate truncate">{devUser?.email || user?.email || "dev@test.com"}</p>
              </div>
            </div>
            <button
              onClick={() => {
                handleSignOut();
                setSidebarOpen(false);
              }}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-slate hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors"
            >
              <LogOut size={18} />
              <span className="text-sm">Se déconnecter</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Contenu principal */}
      <div className="flex-1 flex flex-col min-w-0 lg:ml-72">
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
        {/* Navigation mobile - bas de page */}
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-30 safe-area-pb">
          <div className="flex items-center justify-around py-2">
            <Link
              href="/mon-espace/salarie"
              className={`flex flex-col items-center gap-1 px-2 py-2 rounded-lg transition-colors ${
                pathname === "/mon-espace/salarie" ? "text-primary-500" : "text-slate"
              }`}
            >
              <Calculator size={22} />
              <span className="text-[10px] font-medium">Simulateur</span>
            </Link>
            <Link
              href="/mon-espace/rappels"
              className={`flex flex-col items-center gap-1 px-2 py-2 rounded-lg transition-colors ${
                pathname === "/mon-espace/rappels" ? "text-primary-500" : "text-slate"
              }`}
            >
              <Bell size={22} />
              <span className="text-[10px] font-medium">Rappels</span>
            </Link>
            <Link
              href="/mon-espace/compte"
              className={`flex flex-col items-center gap-1 px-2 py-2 rounded-lg transition-colors ${
                pathname === "/mon-espace/compte" ? "text-primary-500" : "text-slate"
              }`}
            >
              <Settings size={22} />
              <span className="text-[10px] font-medium">Compte</span>
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
}
