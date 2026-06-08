import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://gihrvyrvoocuqqgdphus.supabase.co'
const supabaseAnonKey = 'sb_publishable__4WQSOB2PwdtjWJNIrYjMg_tqkLzZ0f'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
