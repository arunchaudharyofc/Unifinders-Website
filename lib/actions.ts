/**
 * SERVER ACTIONS — Form handlers
 * These run exclusively on the server. No DB credentials leak to the client.
 */
'use server'

import { createClient } from '@/utils/supabase/server'

export type AppointmentFormState = {
  success: boolean
  message: string
}

export async function submitAppointment(
  _prevState: AppointmentFormState,
  formData: FormData
): Promise<AppointmentFormState> {
  const name = formData.get('name')?.toString().trim()
  const email = formData.get('email')?.toString().trim()
  const phone = formData.get('phone')?.toString().trim()
  const country = formData.get('country')?.toString().trim()

  // Server-side validation
  if (!name || !email) {
    return { success: false, message: 'Name and email are required.' }
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { success: false, message: 'Please enter a valid email address.' }
  }

  const supabase = await createClient()
  const { error } = await supabase.from('appointments').insert({
    full_name: name,
    email,
    phone: phone || null,
    country: country || null,
  })

  if (error) {
    console.error('[Action] submitAppointment error:', error.message)
    return { success: false, message: 'Something went wrong. Please try again.' }
  }

  return { success: true, message: 'Appointment requested! We will contact you within 24 hours.' }
}
