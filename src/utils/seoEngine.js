/**
 * Dynamic Google Search Index Tag Injector
 * Pure functional utility that programmatically updates document metadata
 * for optimal SEO performance across all view states.
 */

const seoRegistry = {
  home: {
    title: 'APEX Bespoke Tailoring — Custom Motorcycle Racing Leathers',
    description: 'Engineered for velocity. Tailored for survival. APEX Bespoke Tailoring delivers custom motorcycle leather suits, made-to-measure track leathers, and premium one-piece racing suit builder experiences for elite riders worldwide.',
    keywords: 'custom motorcycle leather suits, made to measure track leathers, one piece racing suit builder, bespoke racing suit, motorcycle track gear, premium racing leathers, custom fit motorcycle suit',
    ogImage: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=1200',
  },
  configure: {
    title: 'Suit Configurator — Build Your Custom Racing Leathers | APEX Bespoke',
    description: 'Design your perfect custom motorcycle leather suit with our interactive configurator. Choose 1-piece or 2-piece suits, ventilation, protection systems, and team presets. Made-to-measure track leathers built for elite performance.',
    keywords: 'custom motorcycle leather suits configurator, one piece racing suit builder, made to measure track leathers, racing suit customization, motorcycle leather suit design',
    ogImage: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=800',
  },
  measure: {
    title: 'Anatomical Measurement — Precision Fit for Racing Leathers | APEX',
    description: 'Submit your biometric measurements for a precision-tailored custom motorcycle racing suit. Our anatomical sizing grid ensures perfect fit for maximum protection and aerodynamic performance on the track.',
    keywords: 'made to measure track leathers, custom motorcycle leather suits sizing, racing suit measurement guide, bespoke motorcycle suit fitting, anatomical racing gear sizing',
    ogImage: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=800',
  },
  presets: {
    title: 'Team Presets — Pro Racing Suit Designs | APEX Bespoke Tailoring',
    description: 'Explore professional team racing suit presets from GP Shadow-Line, Corsair Factory Racing, and Monza Heritage Edition. Premium custom motorcycle leather suits inspired by championship-winning designs.',
    keywords: 'racing team suit designs, custom motorcycle leather suits presets, GP racing suit, factory racing leathers, professional motorcycle racing gear',
    ogImage: 'https://images.unsplash.com/photo-1609630875171-b1321377ee65?q=80&w=600',
  },
};

/**
 * Injects or updates a meta tag in the document head
 * @param {string} name - The name or property attribute of the meta tag
 * @param {string} content - The content value
 * @param {string} type - 'name' or 'property' for the attribute type
 */
function injectMetaTag(name, content, type = 'name') {
  if (typeof document === 'undefined') return;

  let meta = document.querySelector(`meta[${type}="${name}"]`);
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute(type, name);
    document.head.appendChild(meta);
  }
  meta.setAttribute('content', content);
}

/**
 * Removes a meta tag from the document head
 * @param {string} name - The name or property attribute
 * @param {string} type - 'name' or 'property'
 */
function removeMetaTag(name, type = 'name') {
  if (typeof document === 'undefined') return;

  const meta = document.querySelector(`meta[${type}="${name}"]`);
  if (meta) {
    meta.remove();
  }
}

/**
 * Updates all SEO metadata for the given view state
 * @param {string} viewState - The current view state key
 */
export function updateSEO(viewState) {
  if (typeof document === 'undefined') return;

  const config = seoRegistry[viewState] || seoRegistry.home;

  // Update document title
  document.title = config.title;

  // Update standard meta tags
  injectMetaTag('description', config.description, 'name');
  injectMetaTag('keywords', config.keywords, 'name');

  // Update Open Graph tags
  injectMetaTag('og:title', config.title, 'property');
  injectMetaTag('og:description', config.description, 'property');
  injectMetaTag('og:image', config.ogImage, 'property');
  injectMetaTag('og:type', 'website', 'property');
  injectMetaTag('og:site_name', 'APEX Bespoke Tailoring', 'property');

  // Update Twitter Card tags
  injectMetaTag('twitter:card', 'summary_large_image', 'name');
  injectMetaTag('twitter:title', config.title, 'name');
  injectMetaTag('twitter:description', config.description, 'name');
  injectMetaTag('twitter:image', config.ogImage, 'name');

  // Update canonical link
  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    document.head.appendChild(canonical);
  }
  canonical.setAttribute('href', `https://apexbespoke.com/${viewState === 'home' ? '' : viewState}`);

  // Update robots meta
  injectMetaTag('robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1', 'name');

  // Structured data for rich snippets
  let structuredData = document.querySelector('script[type="application/ld+json"]');
  if (!structuredData) {
    structuredData = document.createElement('script');
    structuredData.setAttribute('type', 'application/ld+json');
    document.head.appendChild(structuredData);
  }

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'APEX Bespoke Custom Motorcycle Racing Suit',
    description: config.description,
    image: config.ogImage,
    brand: {
      '@type': 'Brand',
      name: 'APEX Bespoke Tailoring',
    },
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
    category: 'Motorcycle Racing Gear',
  };

  structuredData.textContent = JSON.stringify(schema);
}

/**
 * Gets SEO configuration for a view state without injecting
 * @param {string} viewState
 * @returns {Object} SEO config object
 */
export function getSEOConfig(viewState) {
  return seoRegistry[viewState] || seoRegistry.home;
}

/**
 * Preloads critical images for better LCP performance
 * @param {string[]} imageUrls
 */
export function preloadImages(imageUrls) {
  if (typeof document === 'undefined') return;

  imageUrls.forEach((url) => {
    const link = document.createElement('link');
    link.setAttribute('rel', 'preload');
    link.setAttribute('as', 'image');
    link.setAttribute('href', url);
    link.setAttribute('fetchpriority', 'high');
    document.head.appendChild(link);
  });
}

export default updateSEO;