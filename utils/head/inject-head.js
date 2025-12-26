// inject-head.js
// This script injects meta, link, and title tags into document.head

export const getHeadTags = () => [
  { tag: 'meta', attrs: { charset: 'UTF-8' } },
  { tag: 'meta', attrs: { name: 'viewport', content: 'width=device-width, initial-scale=1.0' } },
  { tag: 'meta', attrs: { name: 'description', content: 'Art, code, and creative technology by cauliflower. Explore projects, experiments, and resources for developers and artists.' } },
  { tag: 'meta', attrs: { name: 'author', content: 'cauliflower' } },
  { tag: 'meta', attrs: { name: 'keywords', content: 'art, code, creative coding, developer, portfolio, generative art, web development, three.js, personal website' } },
  { tag: 'meta', attrs: { name: 'theme-color', content: '#222' } },
  { tag: 'link', attrs: { rel: 'canonical', href: 'https://cauliflower.dev/' } },
  { tag: 'link', attrs: { rel: 'stylesheet', href: '@/styles.css' } },
  { tag: 'link', attrs: { rel: 'icon', type: 'image/png', href: '../../assets/images/Cauliflower.png' } },
  { tag: 'link', attrs: { rel: 'preload', href: '../../fonts/Iceberg-Regular.ttf', as: 'font', type: 'font/ttf', crossorigin: '' } },
  // Open Graph / Facebook
  { tag: 'meta', attrs: { property: 'og:type', content: 'website' } },
  { tag: 'meta', attrs: { property: 'og:url', content: 'https://cauliflower.dev/' } },
  { tag: 'meta', attrs: { property: 'og:title', content: 'Art & Code by cauliflower' } },
  { tag: 'meta', attrs: { property: 'og:description', content: 'Art, code, and creative technology by cauliflower. Explore projects, experiments, and resources for developers and artists.' } },
  { tag: 'meta', attrs: { property: 'og:image', content: '../../assets/images/Cauliflower.png' } },
  // Twitter Card
  { tag: 'meta', attrs: { name: 'twitter:card', content: 'summary_large_image' } },
  { tag: 'meta', attrs: { name: 'twitter:title', content: 'Art & Code by cauliflower' } },
  { tag: 'meta', attrs: { name: 'twitter:description', content: 'Art, code, and creative technology by cauliflower. Explore projects, experiments, and resources for developers and artists.' } },
  { tag: 'meta', attrs: { name: 'twitter:image', content: '../../assets/images/Cauliflower.png' } },
  // Accessibility & Progressive Enhancement
  { tag: 'meta', attrs: { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' } },
];

export const injectHeadTags = () => {
  const tags = getHeadTags();
  tags.forEach(({ tag, attrs }) => {
    const el = document.createElement(tag);
    Object.entries(attrs).forEach(([key, value]) => {
      if (value !== undefined) el.setAttribute(key, value);
    });
    document.head.appendChild(el);
  });
};

document.title = "cauliflower.dev";
injectHeadTags();
