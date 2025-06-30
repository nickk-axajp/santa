import { IsAllowedResponse } from './types';

export async function canAsk(username: string): Promise<boolean> {
  const res = await fetch(`/api/can-ask/${encodeURIComponent(username)}`);

  if (res.status === 404) {
    throw new Error(
      'You need to ask your parents to create an account for you.'
    );
  }

  if (!res.ok) {
    throw new Error('Something went wrong. Please try again later.');
  }

  return ((await res.json()) as IsAllowedResponse).allowed;
}

export async function sendWish(username: string, wish: string): Promise<void> {
  const res = await fetch('/api/ask-santa', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, wish }),
  });

  if (!res.ok) {
    throw new Error('Something went wrong. Please try again later');
  }
}
