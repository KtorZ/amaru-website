// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const SITE_TITLE = 'Amaru Docs';
export const SITE_DESCRIPTION =
  'An open source Cardano node client, written in Rust';

export const GITHUB_REPOS = [
  'pragma-org/amaru',
  'jeluard/amaru-doctor',
  'pragma-org/uplc',
  'pragma-org/amaru-treasury',
  'SundaeSwap-finance/nawi',
];

export const SITE_METADATA = {
  title: {
    default: SITE_TITLE,
    template: '%s | scalar',
  },
  description: SITE_DESCRIPTION,
  keywords: ['Cardano', 'Rust'],
  authors: [{ name: 'Amaru Team' }],
  creator: 'Amaru Team',
  publisher: 'Amaru Team',
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: '/favicon/favicon.ico', sizes: '48x48' },
      { url: '/favicon/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/favicon/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon/favicon.ico' },
    ],
    apple: [{ url: '/favicon/apple-touch-icon.png', sizes: '180x180' }],
    shortcut: [{ url: '/favicon/favicon.ico' }],
  },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    siteName: 'Amaru Docs',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Amaru - An open source Cardano node client',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ['/og-image.jpg'],
    creator: '@amaru_cardano',
    handle: 'amaru_cardano',
    profile_link: 'https://x.com/amaru_cardano',
  },
  github: {
    org: 'pragma-org',
    user: 'amaru',
    repository_link: 'https://github.com/pragma-org/amaru.git',
    discussions_link: 'https://github.com/pragma-org/amaru/discussions',
    stargazer_link: 'https://github.com/pragma-org/amaru/stargazers',
  },
  discord: {
    invitation_link: 'https://discord.gg/Zbbumu9NMz',
  },
};
