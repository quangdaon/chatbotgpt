import { browser } from '$app/environment';
import { writable } from 'svelte/store';

export function localStorageWritable<T>(key: string, value: T) {
  if (!browser)
    return writable<T>(value);

  var stored = localStorage.getItem(key);
  var store = writable<T>(stored ? JSON.parse(stored) : value);

  store.subscribe((v) => localStorage.setItem(key, JSON.stringify(v)));

  return store;
}
