/* ═══════════════════════════════════════════════════════════════
   admin-config.js — Carlos Delgado Realty · Panel privado
   ───────────────────────────────────────────────────────────────
   Único archivo que necesitas editar para conectar el panel.

   IMPORTANTE sobre seguridad:
   La SUPABASE_ANON_KEY (publishable key) es PÚBLICA por diseño.
   Va siempre en el cliente y no es un secreto. La seguridad real
   la dan las políticas RLS de la base de datos (Row Level Security),
   que solo permiten leer/escribir a usuarios autenticados que estén
   registrados en la tabla admin_users.

   NUNCA pongas aquí la "service_role key" — esa sí es secreta y
   jamás debe ir en el navegador.
═══════════════════════════════════════════════════════════════ */

window.ADMIN_CONFIG = {
  SUPABASE_URL: 'https://alrspggdnsghnltiioaj.supabase.co',
  SUPABASE_ANON_KEY: 'sb_publishable_ifSJ5gQr0uCADqCrteimbA_ZMyYpGyl',

  BRAND_NAME: 'Carlos Delgado Realty',

  // Porcentaje de comisión por defecto al crear una propiedad (editable por fila)
  DEFAULT_COMMISSION_PCT: 3,
};
