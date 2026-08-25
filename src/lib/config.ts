declare global {
  interface Window {
    __HUYGENSOFT_CONFIG__?: {
      contactApiBaseUrl?: string;
    };
  }
}

function stripTrailingSlash(value: string) {
  return value.trim().replace(/\/+$/, '');
}

export function getSiteUrl() {
  return stripTrailingSlash(import.meta.env.VITE_SITE_URL || 'https://huygensoft.com');
}

export function getContactApiBaseUrl() {
  const runtimeValue = window.__HUYGENSOFT_CONFIG__?.contactApiBaseUrl;
  const buildValue = import.meta.env.VITE_CONTACT_API_BASE_URL;
  return stripTrailingSlash(runtimeValue || buildValue || '');
}

export function getContactEndpoint() {
  const baseUrl = getContactApiBaseUrl();
  if (baseUrl) return `${baseUrl}/api/v1/contact-messages`;
  return import.meta.env.DEV ? '/api/v1/contact-messages' : null;
}
