import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ContactApiError, submitContact, validateContact } from './contact';

const azureApiBaseUrl = 'https://huygensoftsitebackend-crg8d6c8fnhpe4e3.westeurope-01.azurewebsites.net';
const contactEndpoint = `${azureApiBaseUrl}/api/v1/contact-messages`;
const idempotencyKey = '7dbea4bb-4c9f-46e8-870d-2150944a5b4c';

const validPayload = {
  name: 'Ada Lovelace',
  email: 'ada@example.com',
  organisation: '',
  phone: '',
  topic: 'New software',
  message: 'We would like to discuss a new software product for our team.',
  locale: 'en-GB',
  privacyAccepted: true,
  website: '',
};

beforeEach(() => {
  vi.stubGlobal('window', {
    __HUYGENSOFT_CONFIG__: {
      contactApiBaseUrl: azureApiBaseUrl,
    },
  });
  vi.stubGlobal('crypto', { randomUUID: () => idempotencyKey });
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('validateContact', () => {
  it('accepts a complete enquiry', () => {
    expect(validateContact(validPayload)).toEqual({});
  });

  it('identifies the required contact fields', () => {
    expect(validateContact({ ...validPayload, name: 'A', email: 'invalid', message: 'too short', privacyAccepted: false })).toEqual({
      name: 'name',
      email: 'email',
      message: 'message',
      privacy: 'privacy',
    });
  });

  it('posts a valid enquiry to the configured API with an idempotency key', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ id: '4f4f8200-a0c5-49ac-aac0-e9481133e22e', status: 'accepted', requestId: 'request-id' }),
    });
    vi.stubGlobal('fetch', fetchMock);

    await expect(submitContact(validPayload)).resolves.toEqual({
      id: '4f4f8200-a0c5-49ac-aac0-e9481133e22e',
      status: 'accepted',
      requestId: 'request-id',
    });
    expect(fetchMock).toHaveBeenCalledWith(contactEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Idempotency-Key': idempotencyKey,
      },
      body: JSON.stringify(validPayload),
    });
  });

  it.each([
    [429, 'rate_limit'],
    [503, 'unavailable'],
  ] as const)('maps API status %i to %s', async (status, code) => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, status }));

    await expect(submitContact(validPayload)).rejects.toEqual(new ContactApiError(code));
  });
});
