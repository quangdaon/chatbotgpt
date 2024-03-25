import { browser } from '$app/environment';
import { writable } from 'svelte/store';

export function localStorageWritable<T>(key: string, value: T, reviver?: (this: any, key: string, value: any) => any) {
  if (!browser)
    return writable<T>(value);

  var stored = localStorage.getItem(key);
  var store = writable<T>(stored ? JSON.parse(stored, reviver) : value);

  store.subscribe((v) => localStorage.setItem(key, JSON.stringify(v)));

  return store;
}

