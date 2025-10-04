import { useSyncExternalStore } from "react";
import type { Post, Project } from "~/types";

// type Pair = {key: "projects", value: Project[]} | {key: "posts", value: Post[]}

class ObservableMap<
  K extends "projects" | "posts",
  V extends Project[] | Post[],
> extends Map<K, V> {
  listeners = new Set<() => void>();
  set(key: K, value: V) {
    const result = super.set(key, value);
    this.emitChange();
    return result;
  }
  delete(key: K) {
    const result = super.delete(key);
    this.emitChange();
    return result;
  }
  emitChange() {
    for (const listener of this.listeners) {
      listener();
    }
  }
  subscribe(listener: () => void) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }
}

export const dataCache = new ObservableMap();

export function generateKey() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

export function useContentCache() {
  function subscribe(cb: () => void) {
    return dataCache.subscribe(cb);
  }
  function getSnapshot() {
    return dataCache;
  }
  return useSyncExternalStore(subscribe, getSnapshot, () => getSnapshot());
}
