import { createClient, type SupabaseClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

export const syncConfigurado = Boolean(url && anonKey)

/**
 * `null` quando as variáveis de ambiente não estão configuradas — o app continua
 * funcionando 100% local (Dexie) nesse caso, só não sincroniza entre aparelhos.
 */
export const supabase: SupabaseClient | null = syncConfigurado ? createClient(url as string, anonKey as string) : null
