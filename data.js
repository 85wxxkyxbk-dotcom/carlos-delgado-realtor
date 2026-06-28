/*
  data.js - Carlos Delgado Real Estate
  Public runtime configuration for the static website.

  Keep secrets out of this file. Supabase anon/publishable keys are public by
  design; never place service_role keys or private CRM tokens here.
*/

window.SITE_CONFIG = {
  phoneDisplay: '(305) 761-8706',
  phoneHref: 'tel:+13057618706',
  phoneTel: '+13057618706',

  whatsappDisplay: '(305) 761-8706',
  whatsappHref: 'https://wa.me/13057618706',
  whatsappNumber: '13057618706',

  email: 'carlosdelgadorealtor@gmail.com',

  bookingLink: 'https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ0Kwtr25cdm7Fy-T7eoQQnNbr7FiohkW5cIgn_6mgLgTaBAvyTrqY6CG2XPILqokubHs_zMs-c5',
  bookingUrl: 'https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ0Kwtr25cdm7Fy-T7eoQQnNbr7FiohkW5cIgn_6mgLgTaBAvyTrqY6CG2XPILqokubHs_zMs-c5',

  formEndpoint: 'https://hook.us2.make.com/tphrappyukal3v4zpfb3uv1lqyucvvq7',
  formFallbackMode: 'email',
  formSubject: 'New real estate lead - Carlos Delgado',

  brokerage: 'Keller Williams',
  brokerageName: 'Keller Williams',
  license: 'Licensed Real Estate Agent - Florida',

  supabaseUrl: 'https://alrspggdnsghnltiioaj.supabase.co',
  supabaseAnonKey: 'sb_publishable_ifSJ5gQr0uCADqCrteimbA_ZMyYpGyl',

  analytics: {
    gaMeasurementId: 'G-HLKQ6NP1MV',
    gtmId: '',
    metaPixelId: ''
  }
};

window.PROPERTIES = [
  // Add real listings here when ready.
];
