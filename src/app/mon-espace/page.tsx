"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function MonEspacePage() {
  const router = useRouter();

  // Redirection automatique vers le simulateur (page principale)
  useEffect(() => {
    router.replace("/mon-espace/salarie");
  }, [router]);

  // Afficher un loader pendant la redirection
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-slate text-sm">Chargement...</p>
      </div>
    </div>
  );
}

