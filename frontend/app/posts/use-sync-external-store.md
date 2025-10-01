# useSyncExternalStore: Integrating External Stores in React

In the ever-evolving landscape of React, managing state from external sources—such as browser APIs or third-party libraries—has always been a challenge. Traditional hooks like `useState` and `useReducer` excel at handling internal component state, but they fall short when dealing with mutable external data that needs to trigger re-renders efficiently. Enter `useSyncExternalStore`, an advanced hook introduced in React 18 that bridges this gap, particularly in the context of concurrent rendering.

This hook enables React to subscribe to external stores synchronously, ensuring that your components stay in sync with changes outside React's ecosystem without causing unnecessary re-renders or performance bottlenecks. In this post, we'll dive deep into `useSyncExternalStore`, explore its role in concurrent React, break down how it works, provide detailed code examples, compare it to familiar state management hooks, and highlight common pitfalls to avoid.

## The Role of useSyncExternalStore in Concurrent React

React's concurrent features, such as time slicing and priority-based rendering, aim to make applications more responsive by interrupting low-priority updates. However, external stores (e.g., the browser's `window` object or a WebSocket connection) don't inherently participate in React's reconciliation process. `useSyncExternalStore` solves this by providing a way to "sync" external state into React's fiber tree during the render phase, allowing concurrent features to work seamlessly.

Key benefits include:

- **Consistency Across Platforms**: It handles hydration mismatches between server and client by providing a `getServerSnapshot` option.
- **Performance Optimization**: Subscriptions are managed per-component instance, reducing overhead.
- **Integration with Concurrent Mode**: It prevents tearing (inconsistent reads during renders) by ensuring snapshot reads are atomic.

This hook is especially useful in modern apps dealing with real-time data, media queries, or legacy library integrations.

## How useSyncExternalStore Works

The hook's API is straightforward yet powerful:

```javascript
const state = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
```

- **`subscribe`**: A function that returns an unsubscribe function. It's called during render to set up a subscription to the external store. React calls this only when the component mounts or when the store changes.
- **`getSnapshot`**: A function that returns the current snapshot of the external state. Called during every render to read the value.
- **`getServerSnapshot`** (optional): Similar to `getSnapshot`, but used during server-side rendering to provide an initial value.

Under the hood, React uses this to track when the external state changes and force a re-render only when necessary. The subscription is cleaned up on unmount, preventing memory leaks.

## Detailed Examples

Let's see `useSyncExternalStore` in action with practical examples.

### Example 1: Integrating with Browser APIs (Dark Mode Detection)

A common use case is subscribing to the browser's `matchMedia` API for theme detection. Without this hook, you'd poll or use event listeners that might cause issues in concurrent mode.

Here's a custom hook using `useSyncExternalStore`:

```javascript
// hooks/useMediaQuery.js
import { useSyncExternalStore } from "react";

function subscribe(callback) {
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
}

function getSnapshot() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function getServerSnapshot() {
  // Fallback for SSR; could use a default or detect via headers
  return false;
}

export function useDarkMode() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
```

Now, in a component:

```javascript
// components/ThemeToggle.js
import { useDarkMode } from "../hooks/useMediaQuery";

function ThemeToggle() {
  const isDark = useDarkMode();

  return (
    <button onClick={() => document.documentElement.classList.toggle("dark")}>
      {isDark ? "☀️ Light Mode" : "🌙 Dark Mode"}
    </button>
  );
}
```

This setup ensures the component re-renders only when the user's system theme changes, and it works correctly during SSR by providing a server snapshot.

### Example 2: Integrating with Third-Party Libraries (WebSocket Store)

Suppose you're using a third-party WebSocket library like `socket.io-client`. You can wrap its state in `useSyncExternalStore` for React-friendly updates.

```javascript
// stores/websocketStore.js
import { io } from "socket.io-client";
import { useSyncExternalStore } from "react";

const socket = io("ws://localhost:3001");

function subscribe(callback) {
  socket.on("message", callback);
  return () => socket.off("message", callback);
}

function getSnapshot() {
  return socket.connected ? "Connected" : "Disconnected";
}

export function useWebSocketStatus() {
  return useSyncExternalStore(subscribe, getSnapshot);
}
```

In a component:

```javascript
// components/StatusIndicator.js
import { useWebSocketStatus } from "../stores/websocketStore";

function StatusIndicator() {
  const status = useWebSocketStatus();

  return (
    <div className={`status ${status.toLowerCase()}`}>Connection: {status}</div>
  );
}
```

This keeps your UI in sync with the WebSocket's connection state without manual effect management.

## Comparisons to useState and useReducer

While `useState` and `useReducer` are ideal for React-managed state, `useSyncExternalStore` shines with external, mutable data:

- **useState/useReducer**: Best for state you fully control (e.g., form inputs, counters). They trigger re-renders on setState calls and integrate natively with React's batching.
- **useSyncExternalStore**: Use for read-only subscriptions to external sources. It doesn't "set" state; it syncs it. Unlike `useEffect` + event listeners, it avoids stale closures and works with concurrent rendering.

| Feature           | useState/useReducer    | useSyncExternalStore       |
| ----------------- | ---------------------- | -------------------------- |
| State Ownership   | Internal (React)       | External (browser/lib)     |
| Updates           | Imperative (setState)  | Reactive (subscriptions)   |
| SSR Support       | Built-in               | Via getServerSnapshot      |
| Concurrent Safety | Yes                    | Yes, with atomic snapshots |
| Use Case          | UI state, derived data | Real-time, APIs, media     |

If your state is internal, stick with `useState`. For external sync, reach for this hook—it's more performant than polling with `useEffect`.

## Common Pitfalls and Best Practices

1. **Forgetting to Unsubscribe**: Always return a cleanup function from `subscribe`. React calls it on unmount, but if your external store has global listeners, ensure they're properly removed to avoid memory leaks.

2. **Stale Closures in getSnapshot**: Since `getSnapshot` runs during render, it must not depend on props/state that change. Use refs if needed for mutable values.

3. **Server-Client Mismatch**: Without `getServerSnapshot`, hydration errors can occur. Provide a sensible default or detect server environment.

4. **Over-Subscription**: Each component instance subscribes independently. For shared state, wrap in a custom hook and memoize if possible.

5. **Performance in Loops**: Avoid using it in lists without keys; React might create multiple subscriptions.

To mitigate these, test in Strict Mode and use React DevTools to inspect subscription lifecycles.

## Conclusion

`useSyncExternalStore` is a game-changer for integrating external state into React applications, especially as we lean into concurrent features. By providing a clean, performant way to subscribe to non-React data, it reduces boilerplate and improves reliability. Whether you're building responsive UIs with browser APIs or real-time apps with WebSockets, this hook deserves a spot in your toolkit.

Experiment with the examples above, and consider how it fits into your next project. For more on React 18's concurrent model, check out the official docs.

_Published on March 15, 2025_
