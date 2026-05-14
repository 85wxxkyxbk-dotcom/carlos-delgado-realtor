═══════════════════════════════════════════════════════════════
  Carlos Delgado Real Estate — Site Configuration Guide
  Last updated: May 2026
═══════════════════════════════════════════════════════════════

FILE STRUCTURE
──────────────
  index.html   → Layout, design, modals, bilingual logic, form logic.
                 Do NOT edit unless adding new sections.
  data.js      → All editable config: contact info, booking, form
                 endpoint, brokerage, properties.
                 THIS IS THE ONLY FILE YOU NEED TO EDIT.
  README.txt   → This file.

HOW TO CONFIGURE
────────────────
Open data.js and fill in the values in window.SITE_CONFIG.
Every field is documented inline. Key fields:

  phoneDisplay      → "(305) 761-8706"
  phoneHref         → "tel:+13057618706"
  whatsappDisplay   → "(305) 761-8706"
  whatsappHref      → "https://wa.me/13057618706"
  email             → "carlosdelgadorealtor@gmail.com"
  bookingLink       → Your Google Calendar Appointment URL (see below)
  formEndpoint      → Your Formspree endpoint URL (see below)
  formFallbackMode  → "email" or "whatsapp" (used if formEndpoint empty)
  formSubject       → Subject line for email fallback
  brokerage         → "Keller Williams"
  license           → "Licensed Real Estate Agent · Florida"

═══════════════════════════════════════════════════════════════
  GOOGLE CALENDAR APPOINTMENT SCHEDULE
═══════════════════════════════════════════════════════════════

1. Go to Google Calendar → click the + next to "Other calendars"
   → select "Create new calendar" (or use your existing one).

2. Open Google Calendar Settings → find your calendar → scroll
   to "Appointment schedules" → click "Create appointment schedule".

3. Configure: name, duration (15 min), availability windows,
   buffer time, booking form questions.

4. Click "Open booking page" → copy the URL from the browser.
   It looks like:
   https://calendar.google.com/calendar/appointments/schedules/AcZss…

5. Paste it into data.js:
   bookingLink: 'https://calendar.google.com/calendar/...',

Result: the "Book 15 min" / "Agendar 15 min" buttons will open
your booking page in a new tab. If left empty, they open the
contact modal (consultation form) instead — valid fallback.

═══════════════════════════════════════════════════════════════
  FORMSPREE — LEAD FORM CONNECTION
═══════════════════════════════════════════════════════════════

Formspree receives form submissions and forwards them to your
email automatically (no backend code required).

SETUP:
1. Go to https://formspree.io and create a free account.
2. Click "New Form" → give it a name (e.g. "CD Realty Leads").
3. Copy the endpoint URL shown — it looks like:
   https://formspree.io/f/xxxxxxxx
4. Paste it into data.js:
   formEndpoint: 'https://formspree.io/f/xxxxxxxx',
5. Formspree will send a confirmation email to verify your address.
   Click the link in that email.

FIELDS SENT IN EACH SUBMISSION:
  name, contact, service, area, budget, pets, message,
  language, source, submitted_at, page
  (plus any service-specific fields from the modal form)

TESTING:
- With formEndpoint filled in: submit the form → check your email.
  Formspree free plan: 50 submissions/month.
- Without formEndpoint: the site falls back to opening your email
  client with the lead data pre-filled (formFallbackMode: 'email').

FORM FEEDBACK (no alert popups):
- Success: shows a green message inline below the submit button.
- Error:   shows a red message inline below the submit button.
- Both are bilingual (EN/ES).

═══════════════════════════════════════════════════════════════
  NOTION CRM — CONNECTING FORMSPREE TO NOTION
═══════════════════════════════════════════════════════════════

IMPORTANT: Do NOT hardcode any Notion API key in index.html
or data.js. API keys must stay server-side or in automation
platform credentials (Zapier / Make / Formspree workflows).

OPTION A — Zapier (easiest, no code):
1. Create a free Zapier account at https://zapier.com
2. New Zap → Trigger: "Formspree" → Event: "New Submission"
3. Connect your Formspree account, select your form.
4. Action: "Notion" → "Create Database Item"
5. Map fields:
     Name      → {{name}}
     Contact   → {{contact}}
     Service   → {{service}}
     Area      → {{area}}
     Budget    → {{budget}}
     Message   → {{message}}
     Language  → {{language}}
     Source    → {{source}}
     Date      → {{submitted_at}}
6. Turn on the Zap. Every new lead appears in your Notion CRM.

OPTION B — Make (formerly Integromat):
1. Create account at https://make.com
2. New scenario → Add module: "Formspree" → "Watch Submissions"
3. Add module: "Notion" → "Create a Database Item"
4. Map the same fields as above.
5. Schedule: every 15 minutes or on-demand.

OPTION C — Formspree built-in integrations (paid plan):
1. In your Formspree dashboard → Integrations tab.
2. Select "Zapier" or look for direct Notion integration.
3. Follow the guided setup.

RECOMMENDED NOTION DATABASE FIELDS:
  Name (title)    → Text
  Contact         → Text
  Service         → Select (Buy / Sell / Rent / Invest)
  Area            → Text
  Budget          → Text
  Language        → Select (EN / ES)
  Source          → Text
  Message         → Text
  Date            → Date
  Status          → Select (New / Contacted / Active / Closed)
  Notes           → Text

═══════════════════════════════════════════════════════════════
  ADDING PROPERTY LISTINGS
═══════════════════════════════════════════════════════════════

When you have real listings, add them to the PROPERTIES array
in data.js. Full field documentation is in data.js.

While PROPERTIES is empty, the site shows the "Personalized
Property Search" cards automatically — this is the correct
behavior for launch.

═══════════════════════════════════════════════════════════════
  DEPLOYMENT CHECKLIST
═══════════════════════════════════════════════════════════════

Before going live:

  [ ] Fill in bookingLink with your Google Calendar URL
  [ ] Fill in formEndpoint with your Formspree endpoint
  [ ] Verify form submission works (submit a test lead)
  [ ] Check email arrives in carlosdelgadorealtor@gmail.com
  [ ] Update og:image meta tag in index.html with a real photo
  [ ] Update canonical URL if domain changes
  [ ] Upload both index.html and data.js to the same folder
  [ ] Test on mobile (WhatsApp button, Book 15 min, language toggle)

═══════════════════════════════════════════════════════════════
