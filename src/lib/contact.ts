import { getContactEndpoint } from './config';

export type ContactPayload = {
  name: string;
  email: string;
  organisation: string;
  phone: string;
  topic: string;
  message: string;
  locale: string;
  privacyAccepted: boolean;
  website: string;
  challengeToken?: string;
};

export type ContactField = 'name' | 'email' | 'message' | 'privacy';
export type ContactErrorCode = ContactField | 'configuration' | 'rate_limit' | 'unavailable' | 'generic';

export class ContactApiError extends Error {
  constructor(public readonly code: ContactErrorCode) {
    super(code);
  }
}

export function validateContact(payload: ContactPayload): Partial<Record<ContactField, ContactErrorCode>> {
  const errors: Partial<Record<ContactField, ContactErrorCode>> = {};
  if (payload.name.trim().length < 2) errors.name = 'name';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email.trim())) errors.email = 'email';
  if (payload.message.trim().length < 20) errors.message = 'message';
  if (!payload.privacyAccepted) errors.privacy = 'privacy';
  return errors;
}

export async function submitContact(payload: ContactPayload) {
  const endpoint = getContactEndpoint();
  if (!endpoint) throw new ContactApiError('configuration');

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Idempotency-Key': crypto.randomUUID(),
    },
    body: JSON.stringify(payload),
  });

  if (response.ok) return response.json() as Promise<{ id: string; status: 'accepted'; requestId: string }>;

  if (response.status === 429) throw new ContactApiError('rate_limit');
  if (response.status >= 500) throw new ContactApiError('unavailable');
  throw new ContactApiError('generic');
}
