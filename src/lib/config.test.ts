import { afterEach, describe, expect, it, vi } from 'vitest';

const azureApiBaseUrl = 'https://huygensoftsitebackend-crg8d6c8fnhpe4e3.westeurope-01.azurewebsites.net';

afterEach(() => {
  vi.unstubAllGlobals();
  vi.resetModules();
});

describe('contact endpoint configuration', () => {
  it('uses the runtime API origin ahead of any build-time value and removes trailing slashes', async () => {
    vi.stubGlobal('window', {
      __HUYGENSOFT_CONFIG__: {
        contactApiBaseUrl: `${azureApiBaseUrl}///`,
      },
    });

    const { getContactApiBaseUrl, getContactEndpoint } = await import('./config');

    expect(getContactApiBaseUrl()).toBe(azureApiBaseUrl);
    expect(getContactEndpoint()).toBe(`${azureApiBaseUrl}/api/v1/contact-messages`);
  });

  it('uses the local proxy when no public API origin is configured during development', async () => {
    vi.stubGlobal('window', {});

    const { getContactEndpoint } = await import('./config');

    expect(getContactEndpoint()).toBe('/api/v1/contact-messages');
  });
});
