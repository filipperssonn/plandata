'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

export async function signUp(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const fullName = formData.get('fullName') as string

  // Validera att NEXT_PUBLIC_SITE_URL är satt
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  if (!siteUrl) {
    console.error('NEXT_PUBLIC_SITE_URL is not set')
    return { error: 'Serverkonfigurationsfel. Kontakta support.' }
  }

  // Se till att URL:en är korrekt formaterad
  const redirectUrl = `${siteUrl.replace(/\/$/, '')}/auth/callback`
  
  console.log('SignUp attempt:', { email, redirectUrl })

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
      emailRedirectTo: redirectUrl,
    },
  })

  if (error) {
    console.error('SignUp error:', error)
    return { error: error.message }
  }

  // Logga resultatet för debugging
  console.log('SignUp result:', {
    user: data.user?.id,
    email: data.user?.email,
    emailConfirmed: data.user?.email_confirmed_at,
    session: !!data.session,
  })

  // Om användaren skapades men ingen session (väntar på e-postbekräftelse)
  if (data.user && !data.session) {
    return { success: 'Kolla din e-post för att verifiera ditt konto!' }
  }

  // Om användaren redan är verifierad (sällsynt fall)
  if (data.user && data.session) {
    return { success: 'Ditt konto är redan verifierat! Du kan logga in nu.' }
  }

  return { success: 'Kolla din e-post för att verifiera ditt konto!' }
}

export async function resendConfirmationEmail(formData: FormData) {
  const supabase = await createClient()
  const email = formData.get('email') as string

  if (!email) {
    return { error: 'E-postadress krävs' }
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  if (!siteUrl) {
    return { error: 'Serverkonfigurationsfel. Kontakta support.' }
  }

  const redirectUrl = `${siteUrl.replace(/\/$/, '')}/auth/callback`

  const { error } = await supabase.auth.resend({
    type: 'signup',
    email,
    options: {
      emailRedirectTo: redirectUrl,
    },
  })

  if (error) {
    console.error('Resend confirmation error:', error)
    return { error: error.message }
  }

  return { success: 'Bekräftelsemejl skickat! Kolla din e-post.' }
}

export async function signIn(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const redirectTo = formData.get('redirect') as string | null

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/', 'layout')
  redirect(redirectTo || '/dashboard')
}

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath('/', 'layout')
  redirect('/')
}

export async function resetPassword(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/reset-password`,
  })

  if (error) {
    return { error: error.message }
  }

  return { success: 'Kolla din e-post för återställningslänk!' }
}

export async function updatePassword(formData: FormData) {
  const supabase = await createClient()

  const password = formData.get('password') as string

  const { error } = await supabase.auth.updateUser({
    password,
  })

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}
