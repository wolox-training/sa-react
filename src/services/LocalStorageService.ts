import { Nullable } from '../utils/types';

export interface SessionData {
  token: string;
  client: string;
  uid: string;
}

export enum StorageKeys {
  TOKEN = 'token',
  CLIENT = 'client',
  UID = 'uid'
}

export function saveSession({ token, client, uid }: SessionData) {
  localStorage.setItem(StorageKeys.TOKEN, token);
  localStorage.setItem(StorageKeys.CLIENT, client);
  localStorage.setItem(StorageKeys.UID, uid);
}

export function getSession(): Nullable<SessionData> {
  const token = localStorage.getItem(StorageKeys.TOKEN);
  const client = localStorage.getItem(StorageKeys.CLIENT);
  const uid = localStorage.getItem(StorageKeys.UID);

  if (!token || !client || !uid) {
    return null;
  }

  return { token, client, uid };
}

export const clearSession = () => localStorage.clear();
