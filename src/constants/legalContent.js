import { ORGANIZATION, SITE_NAME } from './seo';

const BUSINESS_NAME = SITE_NAME;
const SITE_URL = 'https://prosperityua.uk';
const CONTACT_EMAIL = 'info@prosperityua.uk';
const LAST_UPDATED = 'June 2026';

const sharedContact = {
  business: BUSINESS_NAME,
  address: `${ORGANIZATION.streetAddress}, ${ORGANIZATION.addressLocality}, ${ORGANIZATION.postalCode}, United Kingdom`,
  phone: ORGANIZATION.telephone,
  email: CONTACT_EMAIL,
  siteUrl: SITE_URL,
  lastUpdated: LAST_UPDATED,
};

export const LEGAL_PAGES = {
  '/privacy-policy': {
    title: 'Privacy Policy',
    eyebrow: 'Legal',
    description: `How ${BUSINESS_NAME} collects, uses, and protects your personal data under UK data protection law.`,
    sections: [
      {
        heading: 'Who we are',
        paragraphs: [
          `${BUSINESS_NAME} ("we", "us", "our") operates the website ${SITE_URL} and our restaurant at ${sharedContact.address}.`,
          `For data protection queries, contact us at ${CONTACT_EMAIL} or call ${sharedContact.phone}.`,
        ],
      },
      {
        heading: 'What data we collect',
        paragraphs: [
          'We may collect and process the following information when you use our website or contact us:',
        ],
        list: [
          'Identity and contact details (for example name, phone number, and email) when you book a table or send an enquiry.',
          'Booking details such as date, time, party size, and any notes you provide.',
          'Technical data including IP address, browser type, device information, and pages visited when you use our website.',
          'Cookie and analytics data if you accept analytics cookies (see our Cookie Policy).',
        ],
      },
      {
        heading: 'How we use your information',
        paragraphs: [
          'We use personal data to:',
        ],
        list: [
          'Process and manage table bookings and respond to enquiries.',
          'Operate, maintain, and improve our website and guest experience.',
          'Comply with legal and regulatory obligations.',
          'Measure website traffic and performance where you have consented to analytics cookies.',
        ],
        afterList: [
          'We do not sell your personal data. We only share information with service providers who help us run our business (for example booking or hosting services) and only where necessary.',
        ],
      },
      {
        heading: 'Lawful bases',
        paragraphs: [
          'Under UK GDPR we rely on:',
        ],
        list: [
          'Contract — to fulfil a booking or respond to your request.',
          'Legitimate interests — to operate our restaurant and website securely and effectively.',
          'Consent — for non-essential cookies and analytics.',
          'Legal obligation — where the law requires us to keep certain records.',
        ],
      },
      {
        heading: 'How long we keep data',
        paragraphs: [
          'We keep personal data only for as long as needed for the purposes above, including reasonable record-keeping for bookings and enquiries. Analytics data is retained according to Google Analytics settings.',
        ],
      },
      {
        heading: 'Your rights',
        paragraphs: [
          'You have the right to access, correct, erase, restrict, or object to certain processing of your personal data, and to withdraw consent where processing is based on consent. You may also lodge a complaint with the UK Information Commissioner\'s Office (ICO) at ico.org.uk.',
          `To exercise your rights, email ${CONTACT_EMAIL}.`,
        ],
      },
      {
        heading: 'Security',
        paragraphs: [
          'We take appropriate technical and organisational measures to protect personal data. No method of transmission over the internet is completely secure; we encourage you to use strong passwords where applicable and contact us if you suspect unauthorised access.',
        ],
      },
      {
        heading: 'Changes',
        paragraphs: [
          `We may update this Privacy Policy from time to time. The "Last updated" date at the bottom of this page will change when we do.`,
        ],
      },
    ],
  },
  '/cookie-policy': {
    title: 'Cookie Policy',
    eyebrow: 'Legal',
    description: `How ${BUSINESS_NAME} uses cookies and similar technologies on ${SITE_URL}.`,
    sections: [
      {
        heading: 'What are cookies?',
        paragraphs: [
          'Cookies are small text files stored on your device when you visit a website. They help the site work properly and, with your permission, help us understand how visitors use our pages.',
        ],
      },
      {
        heading: 'How we use cookies',
        paragraphs: [
          'When you first visit our website, you can choose to accept all cookies or continue with essential cookies only. You can change your mind by clearing site data in your browser and revisiting the site, or by contacting us.',
        ],
      },
      {
        heading: 'Types of cookies we use',
        subsections: [
          {
            title: 'Strictly necessary',
            body: 'Required for core site functionality such as remembering your cookie preference. These cannot be switched off through our banner.',
          },
          {
            title: 'Analytics (optional)',
            body: 'If you click "Accept all", we load Google Analytics 4 (Google LLC) to understand how guests use our menu, booking pages, and content. This helps us improve the website. Measurement ID: G-RB1B5L5NKG. Data may be processed in the United States under appropriate safeguards. You can read Google\'s privacy information at policies.google.com/privacy.',
          },
        ],
      },
      {
        heading: 'Managing cookies',
        paragraphs: [
          'Use our cookie banner to accept or reject analytics cookies. You can also block or delete cookies through your browser settings. Blocking all cookies may affect how some parts of the site work.',
        ],
      },
      {
        heading: 'More information',
        paragraphs: [
          `For questions about cookies or your data, contact ${CONTACT_EMAIL}. See also our Privacy Policy.`,
        ],
      },
    ],
  },
  '/terms-of-use': {
    title: 'Terms of Use',
    eyebrow: 'Legal',
    description: `Terms governing use of the ${BUSINESS_NAME} website.`,
    sections: [
      {
        heading: 'About these terms',
        paragraphs: [
          `These Terms of Use apply to your use of ${SITE_URL} operated by ${BUSINESS_NAME}. By using this website you agree to these terms. If you do not agree, please do not use the site.`,
        ],
      },
      {
        heading: 'Website content',
        paragraphs: [
          'Menu items, prices, opening hours, events, and photographs are provided for information. We aim to keep content accurate but may change menus, prices, and availability without notice. Please contact us to confirm details before visiting.',
        ],
      },
      {
        heading: 'Bookings',
        paragraphs: [
          'Online table requests are subject to confirmation. A booking is not guaranteed until we confirm it with you. We reserve the right to refuse or cancel bookings in line with our house policies and applicable law.',
        ],
      },
      {
        heading: 'Acceptable use',
        paragraphs: [
          'You must not misuse the website, attempt unauthorised access, introduce malware, scrape content for commercial reuse without permission, or use the site in any way that is unlawful or harmful to us or others.',
        ],
      },
      {
        heading: 'Intellectual property',
        paragraphs: [
          'Text, images, branding, and design on this website belong to Prosperity or our licensors and are protected by copyright and other laws. You may view and print pages for personal use only.',
        ],
      },
      {
        heading: 'External links',
        paragraphs: [
          'Our site may link to third-party websites (for example social media, delivery partners, or press coverage). We are not responsible for their content or privacy practices.',
        ],
      },
      {
        heading: 'Limitation of liability',
        paragraphs: [
          'To the fullest extent permitted by law, we are not liable for any indirect or consequential loss arising from use of this website. Nothing in these terms excludes liability that cannot be excluded under UK law.',
        ],
      },
      {
        heading: 'Governing law',
        paragraphs: [
          'These terms are governed by the laws of England and Wales. Courts in England and Wales have exclusive jurisdiction, subject to your statutory rights.',
        ],
      },
      {
        heading: 'Contact',
        paragraphs: [
          `Questions about these terms: ${CONTACT_EMAIL} · ${sharedContact.phone} · ${sharedContact.address}.`,
        ],
      },
    ],
  },
};

export function getLegalPage(pathname) {
  const path = pathname.endsWith('/') && pathname.length > 1 ? pathname.slice(0, -1) : pathname;
  return LEGAL_PAGES[path] || null;
}

export const FOOTER_LEGAL_LINKS = [
  { to: '/privacy-policy', label: 'Privacy Policy' },
  { to: '/cookie-policy', label: 'Cookie Policy' },
  { to: '/terms-of-use', label: 'Terms of Use' },
];

export { sharedContact as LEGAL_CONTACT };
