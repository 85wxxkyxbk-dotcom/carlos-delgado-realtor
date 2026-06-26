# Panel privado `/admin` — Carlos Delgado Realty

Panel de administración protegido con login para gestionar **propiedades, leads, ventas, estadísticas y reportes**. No toca ni enlaza la web pública; vive en una carpeta `/admin` aparte del mismo repositorio.

---

## 1. Qué se creó / modificó

**Archivos nuevos (carpeta `admin/`):**
- `admin/index.html` — el panel completo (login + dashboard + propiedades + leads + reportes). Una sola página, sin build.
- `admin/admin-config.js` — credenciales públicas de Supabase (URL + publishable key). Único archivo a editar para conectar.
- `admin/schema.sql` — el esquema SQL completo (para tus registros / reconstruir).
- `admin/README-ADMIN.md` — este documento.

**Archivos modificados de la web pública** (solo adición, no se quitó nada):
- `carlos-delgado-realty-web/data.js` — se añadieron `supabaseUrl` y `supabaseAnonKey`.
- `carlos-delgado-realty-web/index.html` — se añadió la función `sendLeadToSupabase()` y una llamada en `submitLead()`. Es **aditiva y a prueba de fallos**: si Supabase fallara, tu flujo Make.com → Notion sigue igual.

**Backend (Supabase) — proyecto NUEVO y dedicado:**
- Proyecto `carlos-delgado-realty-admin` (ref `alrspggdnsghnltiioaj`, región us-east-1, plan Free).
- Se creó aparte **a propósito**: tu proyecto Supabase anterior ya aloja otra app (de estudio) y no convenía mezclarlas.
- Tablas: `properties`, `leads`, `admin_users`, `admin_allowlist`, `activity_logs`.
- Seguridad RLS activada en todas. Cálculos automáticos en `properties`.

---

## 2. Cómo acceder al admin

- **En local:** abre `admin/index.html` en el navegador.
- **Publicado:** sube la carpeta `admin/` al repositorio. Quedará en
  **`https://carlosdelgadorealty.com/admin/`**.
- Si no has iniciado sesión te muestra el login; no se puede ver el dashboard sin autenticarse.
- El admin **no aparece** en el menú público y lleva `noindex,nofollow` (Google no lo indexa).

## 3. Primer usuario administrador (YA CREADO)

- **Email:** `cdelgadocastello@gmail.com`
- **Contraseña temporal:** `CDRealty2026!`
- 👉 **Cámbiala en el primer acceso.** En el panel de Supabase:
  `Authentication → Users → (tu usuario) → Reset password`, o desde
  `https://supabase.com/dashboard/project/alrspggdnsghnltiioaj/auth/users`.

### Crear más administradores
1. Añade el correo a la lista blanca (SQL Editor de Supabase):
   `insert into public.admin_allowlist(email) values ('nuevo@correo.com');`
2. Crea el usuario en `Authentication → Users → Add user` (marca *Auto Confirm*).
3. Al crearse, el correo de la lista blanca se vuelve admin automáticamente.

Solo los correos de `admin_allowlist` pueden ser administradores. Cualquier otro
registro queda **sin acceso a ningún dato** (lo bloquea RLS).

## 4. Variables / configuración necesaria

Como el sitio es estático (GitHub Pages, sin servidor), no hay `.env`. La configuración
va en `admin/admin-config.js`:

| Clave | Valor | Nota |
|---|---|---|
| `SUPABASE_URL` | `https://alrspggdnsghnltiioaj.supabase.co` | Ya configurado |
| `SUPABASE_ANON_KEY` | `sb_publishable_…` | **Pública por diseño**, no es secreto |

> La `anon`/publishable key SIEMPRE va en el cliente; la seguridad real la dan las
> políticas RLS. **Nunca** pongas aquí la `service_role` key (esa sí es secreta).

## 5. Cómo probar el flujo completo

1. Abre `/admin` → inicia sesión con el usuario de arriba.
2. **Dashboard:** al principio sale vacío (no se inventaron datos).
3. **Propiedades → + Nueva propiedad:** crea una. Si pones tipo "Inversión propia",
   precio de compra, vendido, costos y fechas, verás calcularse solos
   *beneficio*, *días en mercado*, *comisión* y *diferencia listado vs vendido*.
   Para una venta solo-comisión (realtor), deja compra vacía: el beneficio sale "n/a"
   y se prioriza comisión / volumen / días.
4. **Márcala como "Vendida"** y vuelve al Dashboard: verás total vendido, comisión y
   días promedio actualizados.
5. **Leads → + Nuevo lead:** crea uno, cámbiale estado, asócialo a una propiedad.
6. **Formulario público:** envía el formulario de la web → aparece como lead nuevo
   (fuente *website*) en `/admin/leads`, **y además** sigue llegando a Make.com/Notion.
7. **Reportes:** gráficos de ventas/comisión por mes, leads por fuente y conversión.

## 6. Despliegue (subir a GitHub Pages)

Sube al repo `85wxxkyxbk-dotcom/carlos-delgado-realtor` (rama `main`):
- La carpeta **`admin/`** completa. Archivos: `index.html`, `admin-config.js`,
  `manifest.webmanifest`, `apple-touch-icon.png`, `icon-192.png`, `icon-512.png`
  (y opcional `schema.sql` / `README-ADMIN.md`). **Los .png y el manifest son
  necesarios para el icono de "app" en el teléfono.**
- El **`index.html`** y **`data.js`** públicos actualizados (los de `carlos-delgado-realty-web/`).

> ⚠️ Hay varias copias del sitio en tu disco. Sube la versión de
> `Mi Web para Real State/carlos-delgado-realty-web/` (es la que parché con la
> integración de leads). Mantén un solo origen para no divergir.

Método habitual: `github.com/85wxxkyxbk-dotcom/carlos-delgado-realtor/upload/main`
→ arrastra los archivos/carpeta → commit a `main`.

## 6b. Instalar el admin como app en el iPhone

Una vez subida la carpeta `admin/` a GitHub:
1. En tu iPhone, abre `carlosdelgadorealty.com/admin` en **Safari**.
2. Toca el botón **Compartir** (cuadrado con flecha) → **Agregar a inicio**.
3. Confirma. Te queda un icono "CD Admin" en la pantalla de inicio.
4. Al abrirlo desde ese icono se ve a pantalla completa, como una app.

No aparece ningún enlace al admin en la web pública (sigue siendo privado).
En desktop, simplemente guarda el marcador.

## 7. Seguridad implementada

- Rutas privadas: sin sesión válida no se ve el dashboard.
- Verificación doble: el usuario debe (a) autenticarse y (b) existir en `admin_users`.
- RLS en todas las tablas: leer/escribir requiere ser admin. El anónimo **solo** puede
  *insertar* leads (para el formulario), nunca leer.
- Lista blanca de correos para conceder admin (bloquea auto-registros maliciosos).
- `noindex` en `/admin` y sin enlaces desde la web pública.
- La publishable key es pública; la `service_role` nunca se expone.

## 8. Recomendaciones / pendientes (opcionales)

- [ ] **Cambiar la contraseña temporal** en el primer acceso (importante).
- [ ] En Supabase → Authentication → Providers/Settings, considera **desactivar
      "Allow new signups"** como capa extra (la lista blanca ya te protege, pero
      apagar el registro público es defensa en profundidad).
- [ ] (Opcional) Activar *Leaked Password Protection* en Auth (Supabase lo recomienda).
- [ ] Subir fotos reales: hoy el campo *fotos* guarda URLs. Si quieres subir imágenes
      desde el panel, se puede añadir Supabase Storage en una fase 2.
- [ ] La tabla `activity_logs` ya registra acciones; aún no hay una vista para verla
      (fácil de añadir si la quieres).
- [ ] El panel es responsive básico (sidebar colapsable en móvil). Pensado para
      escritorio principalmente.

---

**Stack:** sitio estático (HTML/CSS/JS) en GitHub Pages · Supabase (Postgres + Auth + RLS)
· Chart.js para gráficos · supabase-js v2. Sin framework, sin build, sin servidor propio.
