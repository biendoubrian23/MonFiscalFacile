import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const error = requestUrl.searchParams.get('error');
  const errorDescription = requestUrl.searchParams.get('error_description');
  const origin = requestUrl.origin;

  // Si erreur OAuth, rediriger vers connexion avec message
  if (error) {
    console.error('OAuth error:', error, errorDescription);
    return NextResponse.redirect(`${origin}/connexion?error=${encodeURIComponent(errorDescription || error)}`);
  }

  if (code) {
    try {
      const supabase = await createClient();
      const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
      
      if (exchangeError) {
        console.error('Error exchanging code:', exchangeError);
        return NextResponse.redirect(`${origin}/connexion?error=${encodeURIComponent('Erreur de connexion. Veuillez réessayer.')}`);
      }
    } catch (err) {
      console.error('Exception in callback:', err);
      return NextResponse.redirect(`${origin}/connexion?error=${encodeURIComponent('Erreur de connexion. Veuillez réessayer.')}`);
    }
  }

  // Rediriger vers l'espace privé après connexion
  return NextResponse.redirect(`${origin}/mon-espace`);
}
