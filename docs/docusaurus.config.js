// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "GrowPulse Docs",
  tagline: "Open source feature flagging and A/B testing platform.",
  url: "https://docs.growpulse.io",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenAnchors: "warn",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "growpulse", // Usually your GitHub org/user name.
  projectName: "growpulse", // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  // Kapa.ai chat bot on Docs page
  scripts: [
    {
      src: "https://widget.kapa.ai/kapa-widget.bundle.js",
      "data-website-id": "c4406b9f-35c5-43ca-b0c1-e7c0e261831f", // Safe to expose publicly
      "data-project-name": "GrowPulse",
      "data-project-color": "#7817d3",
      "data-modal-example-questions":
        "How do I create a feature flag?, How do I run an experiment?",
      "data-project-logo": "/img/gp-logo-white.svg",
      "data-modal-image": "/img/gp-logo-ai.svg",
      "data-button-width": "72px",
      "data-button-height": "72px",
      async: true,
    },
    {
      src: "https://w.appzi.io/w.js?token=jZ31J",
      async: true,
    },
  ],
  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          breadcrumbs: true,
          remarkPlugins: [
            [require("@docusaurus/remark-plugin-npm2yarn"), { sync: true }],
            require("remark-math"),
          ],
          rehypePlugins: [require("rehype-katex")],
          sidebarPath: require.resolve("./sidebars.js"),
          routeBasePath: "/", // Serve the docs at the site's root
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: "https://github.com/growpulse/growpulse/edit/main/docs/",
        },
        blog: false,
        theme: {
          customCss: [
            require.resolve("./src/styles/custom.scss"),
            require.resolve("modern-normalize/modern-normalize.css"),
          ],
        },
        gtag: {
          trackingID: "G-3W683MDLMQ",
        },
      }),
    ],
    [
      "redocusaurus",
      {
        // Plugin Options for loading OpenAPI files
        specs: [
          {
            spec: "../packages/back-end/generated/spec.yaml",
            route: "/api/",
          },
        ],
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    {
      navbar: {
        //hideOnScroll: true,
        //title: 'GrowPulse Docs',
        logo: {
          alt: "GrowPulse Docs",
          src: "img/growpulse-docslogo-light.png",
          srcDark: "img/growpulse-docslogo-dark.png",
        },
        items: [
          {
            to: "/",
            label: "Docs",
            activeBaseRegex: "/(?!api)",
            position: "left",
          },
          {
            to: "/api",
            label: "API",
            position: "left",
          },
          {
            href: "https://growpulse.io",
            label: "Home",
            position: "right",
          },
          {
            href: "https://app.growpulse.io",
            label: "Log in / sign up",
            position: "right",
          },
          {
            href: "https://github.com/growpulse/growpulse",
            label: "GitHub",
            position: "right",
          },
          {
            label: "Support",
            position: "right",
            items: [
              {
                href: "https://slack.growpulse.io",
                label: "Join our Slack",
                target: "_blank",
                rel: null,
              },
              {
                href:
                  "https://github.com/growpulse/growpulse/issues/new/choose",
                label: "Open an issue",
                target: "_blank",
                rel: null,
              },
            ],
            className: "navbar__link--support",
          },
        ],
      },
      metadata: [
        {
          name: "og:image",
          content: "https://cdn.growpulse.io/growpulse-github-card.png",
        },
        {
          name: "twitter:image",
          content: "https://cdn.growpulse.io/growpulse-github-card.png",
        },
        {
          name: "twitter:card",
          content: "summary_large_image",
        },
        {
          name: "twitter:domain",
          content: "growpulse.io",
        },
        {
          name: "twitter:site",
          content: "@growth_pulse",
        },
        {
          name: "twitter:creator",
          content: "growpulse",
        },
        {
          name: "og:type",
          content: "website",
        },
        {
          name: "og:site_name",
          content: "GrowPulse Docs",
        },
      ],
      prism: {
        theme: require("prism-react-renderer").themes.github,
        darkTheme: require("prism-react-renderer").themes.dracula,
        additionalLanguages: [
          "csharp",
          "ruby",
          "php",
          "java",
          "kotlin",
          "swift",
          "dart",
          "groovy",
          "scala",
          "json",
          "bash",
        ],
      },
      colorMode: {
        defaultMode: "light",
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
      algolia: {
        // The application ID provided by Algolia
        appId: "MN7ZMY63CG",

        // Public API key: it is safe to commit it
        apiKey: "43a7bc1b7a1494649e79a9fa7c3376be",

        indexName: "growpulse",

        // Optional: see doc section below
        contextualSearch: true,

        // Optional: Specify domains where the navigation should occur through window.location instead on history.push. Useful when our Algolia config crawls multiple documentation sites and we want to navigate with window.location.href to them.
        //externalUrlRegex: "external\\.com|domain\\.com",

        // Optional: Algolia search parameters
        searchParameters: {},

        // Optional: path for search page that enabled by default (`false` to disable it)
        searchPagePath: "search",

        //... other Algolia params
      },
    },
  plugins: ["docusaurus-plugin-sass"],

  stylesheets: [
    {
      href: "https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css",
      type: "text/css",
      integrity:
        "sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM",
      crossorigin: "anonymous",
    },
  ],
};

module.exports = config;
