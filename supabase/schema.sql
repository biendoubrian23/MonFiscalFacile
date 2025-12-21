-- =====================================================
-- MonFiscalFacile - Script SQL Supabase
-- =====================================================
-- Exécutez ce script dans l'éditeur SQL de Supabase
-- Dashboard > SQL Editor > New Query
-- =====================================================

-- =====================================================
-- 1. TABLE PROFILES
-- Stocke les informations utilisateur étendues
-- =====================================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  
  -- Abonnement
  subscription_tier TEXT DEFAULT 'free' CHECK (subscription_tier IN ('free', 'premium')),
  subscription_expires_at TIMESTAMPTZ,
  stripe_customer_id TEXT,
  
  -- Profil fiscal
  statut_juridique TEXT,
  type_activite TEXT,
  code_postal TEXT,
  situation_familiale TEXT,
  nombre_enfants INTEGER DEFAULT 0,
  revenus_conjoint NUMERIC(12,2),
  
  -- Métadonnées
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index pour les recherches
CREATE INDEX IF NOT EXISTS idx_profiles_subscription ON public.profiles(subscription_tier);
CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles(email);

-- Activer RLS (Row Level Security)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Politiques RLS pour profiles
-- Les utilisateurs peuvent voir et modifier leur propre profil
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- =====================================================
-- 2. TABLE SIMULATIONS
-- Stocke l'historique des simulations fiscales
-- =====================================================
CREATE TABLE IF NOT EXISTS public.simulations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  
  -- Données d'entrée
  chiffre_affaires NUMERIC(12,2) NOT NULL,
  statut TEXT NOT NULL,
  activite TEXT NOT NULL,
  situation_familiale TEXT,
  nombre_enfants INTEGER DEFAULT 0,
  revenus_conjoint NUMERIC(12,2) DEFAULT 0,
  kilometrage INTEGER DEFAULT 0,
  cv_fiscaux INTEGER DEFAULT 5,
  depenses_pro NUMERIC(12,2) DEFAULT 0,
  
  -- Résultats calculés
  resultat JSONB NOT NULL, -- Stocke le résultat complet de la simulation
  economies_potentielles NUMERIC(12,2),
  
  -- Métadonnées
  created_at TIMESTAMPTZ DEFAULT NOW(),
  nom TEXT -- Nom optionnel donné par l'utilisateur
);

-- Index pour les recherches
CREATE INDEX IF NOT EXISTS idx_simulations_user ON public.simulations(user_id);
CREATE INDEX IF NOT EXISTS idx_simulations_created ON public.simulations(created_at DESC);

-- Activer RLS
ALTER TABLE public.simulations ENABLE ROW LEVEL SECURITY;

-- Politiques RLS pour simulations
CREATE POLICY "Users can view own simulations"
  ON public.simulations FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own simulations"
  ON public.simulations FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own simulations"
  ON public.simulations FOR DELETE
  USING (auth.uid() = user_id);

-- =====================================================
-- 3. TABLE SUBSCRIPTIONS
-- Gère les abonnements premium (pour intégration Stripe)
-- =====================================================
CREATE TABLE IF NOT EXISTS public.subscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  
  -- Informations Stripe
  stripe_subscription_id TEXT UNIQUE,
  stripe_customer_id TEXT,
  stripe_price_id TEXT,
  
  -- État de l'abonnement
  status TEXT NOT NULL CHECK (status IN ('active', 'canceled', 'past_due', 'trialing', 'incomplete')),
  
  -- Période
  current_period_start TIMESTAMPTZ,
  current_period_end TIMESTAMPTZ,
  cancel_at_period_end BOOLEAN DEFAULT FALSE,
  canceled_at TIMESTAMPTZ,
  
  -- Métadonnées
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index
CREATE INDEX IF NOT EXISTS idx_subscriptions_user ON public.subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_stripe ON public.subscriptions(stripe_subscription_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_status ON public.subscriptions(status);

-- Activer RLS
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

-- Politiques RLS pour subscriptions
CREATE POLICY "Users can view own subscriptions"
  ON public.subscriptions FOR SELECT
  USING (auth.uid() = user_id);

-- Les insertions/updates sont gérées par le service role (webhooks Stripe)

-- =====================================================
-- 4. TABLE RAPPELS
-- Stocke les rappels fiscaux des utilisateurs
-- =====================================================
CREATE TABLE IF NOT EXISTS public.rappels (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  
  titre TEXT NOT NULL,
  description TEXT,
  date_echeance DATE NOT NULL,
  type TEXT DEFAULT 'perso' CHECK (type IN ('echeance', 'declaration', 'action', 'perso')),
  fait BOOLEAN DEFAULT FALSE,
  
  -- Notifications
  notifie BOOLEAN DEFAULT FALSE,
  notification_envoyee_at TIMESTAMPTZ,
  
  -- Métadonnées
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index
CREATE INDEX IF NOT EXISTS idx_rappels_user ON public.rappels(user_id);
CREATE INDEX IF NOT EXISTS idx_rappels_date ON public.rappels(date_echeance);
CREATE INDEX IF NOT EXISTS idx_rappels_fait ON public.rappels(fait);

-- Activer RLS
ALTER TABLE public.rappels ENABLE ROW LEVEL SECURITY;

-- Politiques RLS pour rappels
CREATE POLICY "Users can view own rappels"
  ON public.rappels FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own rappels"
  ON public.rappels FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own rappels"
  ON public.rappels FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own rappels"
  ON public.rappels FOR DELETE
  USING (auth.uid() = user_id);

-- =====================================================
-- 5. TABLE ACTIONS
-- Stocke le plan d'action personnalisé
-- =====================================================
CREATE TABLE IF NOT EXISTS public.actions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  
  titre TEXT NOT NULL,
  description TEXT,
  categorie TEXT,
  difficulte TEXT CHECK (difficulte IN ('facile', 'moyen', 'difficile')),
  gain_estime NUMERIC(10,2),
  
  statut TEXT DEFAULT 'a-faire' CHECK (statut IN ('a-faire', 'en-cours', 'fait')),
  date_completion TIMESTAMPTZ,
  
  -- Lien vers un guide
  guide_slug TEXT,
  
  -- Métadonnées
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index
CREATE INDEX IF NOT EXISTS idx_actions_user ON public.actions(user_id);
CREATE INDEX IF NOT EXISTS idx_actions_statut ON public.actions(statut);

-- Activer RLS
ALTER TABLE public.actions ENABLE ROW LEVEL SECURITY;

-- Politiques RLS pour actions
CREATE POLICY "Users can view own actions"
  ON public.actions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own actions"
  ON public.actions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own actions"
  ON public.actions FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own actions"
  ON public.actions FOR DELETE
  USING (auth.uid() = user_id);

-- =====================================================
-- 6. FUNCTIONS & TRIGGERS
-- =====================================================

-- Fonction pour créer automatiquement un profil à l'inscription
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger pour créer le profil automatiquement
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Fonction pour mettre à jour updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers pour updated_at sur chaque table
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_subscriptions_updated_at
  BEFORE UPDATE ON public.subscriptions
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_rappels_updated_at
  BEFORE UPDATE ON public.rappels
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_actions_updated_at
  BEFORE UPDATE ON public.actions
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- =====================================================
-- 7. FONCTION HELPER POUR VÉRIFIER LE PREMIUM
-- =====================================================

-- Fonction pour vérifier si un utilisateur est premium
CREATE OR REPLACE FUNCTION public.is_premium(user_uuid UUID)
RETURNS BOOLEAN AS $$
DECLARE
  tier TEXT;
  expires_at TIMESTAMPTZ;
BEGIN
  SELECT subscription_tier, subscription_expires_at
  INTO tier, expires_at
  FROM public.profiles
  WHERE id = user_uuid;
  
  IF tier = 'premium' THEN
    -- Vérifier si l'abonnement n'a pas expiré
    IF expires_at IS NULL OR expires_at > NOW() THEN
      RETURN TRUE;
    END IF;
  END IF;
  
  RETURN FALSE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- 8. VUES UTILES
-- =====================================================

-- Vue pour les statistiques utilisateur
CREATE OR REPLACE VIEW public.user_stats AS
SELECT 
  p.id as user_id,
  p.subscription_tier,
  COUNT(DISTINCT s.id) as total_simulations,
  COUNT(DISTINCT a.id) FILTER (WHERE a.statut = 'fait') as actions_completees,
  COUNT(DISTINCT a.id) as total_actions,
  COALESCE(SUM(a.gain_estime) FILTER (WHERE a.statut = 'fait'), 0) as gains_realises,
  COALESCE(SUM(a.gain_estime), 0) as gains_potentiels
FROM public.profiles p
LEFT JOIN public.simulations s ON s.user_id = p.id
LEFT JOIN public.actions a ON a.user_id = p.id
GROUP BY p.id, p.subscription_tier;

-- =====================================================
-- NOTES D'UTILISATION
-- =====================================================
-- 
-- 1. Après avoir exécuté ce script, allez dans Authentication > Settings
--    et configurez les emails de confirmation si nécessaire.
--
-- 2. Pour l'intégration Stripe :
--    - Créez un webhook Stripe pointant vers votre API
--    - Utilisez le service role key pour les opérations backend
--    - Mettez à jour subscription_tier dans profiles quand le paiement réussit
--
-- 3. Les politiques RLS garantissent que chaque utilisateur 
--    ne peut accéder qu'à ses propres données.
--
-- 4. Pour tester le premium manuellement :
--    UPDATE public.profiles 
--    SET subscription_tier = 'premium', 
--        subscription_expires_at = NOW() + INTERVAL '1 month'
--    WHERE email = 'votre@email.com';
--
-- =====================================================
