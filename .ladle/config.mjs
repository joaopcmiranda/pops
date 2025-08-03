import { resolve } from 'path';

/** @type {import('@ladle/react').UserConfig} */
export default {
  stories: 'apps/web/src/**/*.stories.{js,jsx,ts,tsx}',
  addons: {
    theme: {
      enabled: true,
      defaultState: 'light',
    },
    rtl: {
      enabled: false,
    },
    ladle: {
      enabled: true,
    },
  },
  build: {
    outDir: 'dist-ladle',
  },
  serve: {
    port: 61000,
  },
  viteConfig: (config) => {
    // Set up proper path resolution
    config.resolve = config.resolve || {};
    config.resolve.alias = config.resolve.alias || {};
    config.resolve.alias['@'] = resolve('./apps/web/src');
    
    // Ensure CSS processing
    config.css = config.css || {};
    
    // Include Tailwind config
    config.define = config.define || {};
    config.define.__TAILWIND_CONFIG__ = JSON.stringify(resolve('./apps/web/tailwind.config.js'));
    
    return config;
  },
};