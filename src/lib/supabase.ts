import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
)

let sessionId: string | null = null

export function getSessionId(): string {
  if (!sessionId) {
    sessionId = sessionStorage.getItem('ariva_session')

    if (!sessionId) {
      sessionId = crypto.randomUUID()
      sessionStorage.setItem('ariva_session', sessionId)
    }
  }

  return sessionId
}

export async function trackPageView() {
  await supabase.from('page_views').insert({
    session_id: getSessionId(),
    page: '/',
    referrer: document.referrer,
    user_agent: navigator.userAgent,
  })
}

export async function trackSectionView(sectionName: string) {
  await supabase.from('section_interactions').insert({
    session_id: getSessionId(),
    section_name: sectionName,
    interaction_type: 'view',
  })
}

export async function submitBookingInquiry(data: {
  name: string
  email: string
  phone: string
  destination: string
  travel_date: string
  guests: number
  message: string
  
}) {
  return supabase.from('booking_inquiries').insert(data)
}

export async function subscribeNewsletter(
  email: string,
  name: string
) {
  return supabase
    .from('newsletter_subscribers')
    .insert({ email, name })
}