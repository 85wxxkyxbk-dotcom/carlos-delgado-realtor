/* ═══════════════════════════════════════════════════════════════
   data.js — Carlos Delgado Real Estate
   ───────────────────────────────────────────────────────────────
   This is the ONLY file you need to edit to configure the site.
   index.html reads all values from here at runtime.
   PROPERTIES array is kept empty until you have real listings.
═══════════════════════════════════════════════════════════════ */

window.SITE_CONFIG = {

  /* ── PHONE ──────────────────────────────────────────────────
     phoneDisplay  → shown in the UI (free format)
     phoneHref     → used in tel: links (include +1)
     Legacy field phoneTel is also supported for backwards compat.  */
  phoneDisplay:  '(305) 761-8706',
  phoneHref:     'tel:+13057618706',
  phoneTel:      '+13057618706',         // legacy — keep in sync with phoneHref

  /* ── WHATSAPP ────────────────────────────────────────────────
     whatsappDisplay → shown next to the WhatsApp button
     whatsappHref    → full wa.me URL with country code (no +)
     Legacy field whatsappNumber is also supported.              */
  whatsappDisplay:  '(305) 761-8706',
  whatsappHref:     'https://wa.me/13057618706',
  whatsappNumber:   '13057618706',       // legacy — keep in sync with whatsappHref

  /* ── EMAIL ───────────────────────────────────────────────────
     Used for the email contact action and the mailto fallback.  */
  email: 'carlosdelgadorealtor@gmail.com',

  /* ── GOOGLE CALENDAR BOOKING ─────────────────────────────────
     Paste your Google Calendar Appointment Schedule URL here.
     Format: https://calendar.google.com/calendar/appointments/schedules/…
     Leave empty '' → "Book 15 min" buttons open the contact modal instead.
     bookingUrl is the legacy name; bookingLink takes priority.   */
  bookingLink: 'https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ0Kwtr25cdm7Fy-T7eoQQnNbr7FiohkW5cIgn_6mgLgTaBAvyTrqY6CG2XPILqokubHs_zMs-c5',
  bookingUrl:  'https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ0Kwtr25cdm7Fy-T7eoQQnNbr7FiohkW5cIgn_6mgLgTaBAvyTrqY6CG2XPILqokubHs_zMs-c5', // legacy alias

  /* ── FORM ENDPOINT (Formspree) ───────────────────────────────
     Step 1: Create a free account at https://formspree.io
     Step 2: Create a new form, get your endpoint URL
     Step 3: Paste it here, e.g.:
             'https://formspree.io/f/YOUR_FORM_ID'
     Leave empty '' → falls back to mailto (formFallbackMode below). */
  formEndpoint: 'https://formspree.io/f/xpqbeypy',

  /* ── FORM FALLBACK ───────────────────────────────────────────
     Used when formEndpoint is empty.
     'email'    → opens mailto: with the lead data (default)
     'whatsapp' → opens WhatsApp with the lead data pre-filled   */
  formFallbackMode: 'email',

  /* ── FORM EMAIL SUBJECT ──────────────────────────────────────
     Subject line used in the mailto fallback.                   */
  formSubject: 'New real estate lead · Carlos Delgado',

  /* ── BROKERAGE ───────────────────────────────────────────────
     Shown in the About section and footer.
     Leave empty '' to hide the brokerage line entirely.
     brokerageName is the legacy alias — kept for compatibility.  */
  brokerage:     'Keller Williams',
  brokerageName: 'Keller Williams',      // legacy alias

  /* ── LICENSE ─────────────────────────────────────────────────
     Displayed in the About credentials block.                   */
  license: 'Licensed Real Estate Agent · Florida',

};


/* ═══════════════════════════════════════════════════════════════
   PROPERTIES — Featured listings
   ───────────────────────────────────────────────────────────────
   Keep this array EMPTY until you have real listings to show.
   When empty, the site automatically shows the "Personalized
   Property Search" cards instead.

   To add a listing, copy the example object below, uncomment it,
   and fill in real values. Repeat for each property.

   Available fields:
     visible      — false to hide without deleting
     status       — "Active" | "Sold" | "Pending" | {en:'…',es:'…'}
     statusClass  — "sold" | "new"  (changes badge color)
     price        — "$750,000" | "$2,800/mo"
     area         — "Brickell" | "Doral" | etc.
     type         — "Condo" | {en:'Condo', es:'Condo'}
     title        — "2BD Waterfront Unit" | {en:'…', es:'…'}
     image        — Full URL to the property photo (1200×800 ideal)
     beds         — "2"
     baths        — "2"
     sqft         — "1,050"
     service      — "Compra" | "Renta" | "Inversión"
     link         — External listing URL or "#contact"

   Example:
   ─────────────────────────────────────────────────────────────
   {
     visible: true,
     status: { en: 'Active', es: 'Activo' },
     statusClass: 'new',
     price: '$650,000',
     area: 'Brickell',
     type: { en: 'Condo', es: 'Condo' },
     title: { en: '2BD Modern Condo · Bay Views', es: 'Condo 2H · Vistas a la Bahía' },
     image: 'https://images.unsplash.com/photo-REPLACE?w=900&q=80&fit=crop',
     beds: '2', baths: '2', sqft: '980',
     service: 'Compra',
     link: '#contact'
   }
   ─────────────────────────────────────────────────────────────
═══════════════════════�