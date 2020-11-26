import { AuthResponse } from 'src/graphql';
import { DateTime } from 'luxon';

const TOKEN = 'token';
const EXPIRES_AT = 'expiresAt';

export const tokenManager = { save, remove, get };

function save({ token, issuedAt, expiresIn }: AuthResponse) {
  const expiresAt = DateTime.fromMillis(issuedAt).plus({ seconds: expiresIn }).toJSDate();
  localStorage.setItem(TOKEN, token);
  localStorage.setItem(EXPIRES_AT, DateTime.fromJSDate(expiresAt).toISO());
}

function remove() {
  localStorage.removeItem(TOKEN);
  localStorage.removeItem(EXPIRES_AT);
}

function get() {
  const token = localStorage.getItem(TOKEN);
  const expiresAt = localStorage.getItem(EXPIRES_AT);

  if (DateTime.local() >= DateTime.fromISO(expiresAt)) {
    remove();
    return undefined;
  }

  return token;
}
