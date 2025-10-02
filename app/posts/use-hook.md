# The New use() Hook in React 19: Simplifying Prop Drilling

Posted on March 15, 2025
By Alex Rivera

## Introduction

React 19 introduces several exciting features aimed at improving developer experience and performance, and one of the most anticipated is the `use()` hook. This new hook promises to streamline how we handle asynchronous data and context values in our components, particularly by reducing the infamous "prop drilling" problem. Prop drilling occurs when you pass data through multiple layers of components that don't need it, leading to cluttered code and maintenance challenges.

In this post, we'll dive deep into the `use()` hook: what it is, how to use it, real-world examples, and how it can transform your component architecture. Whether you're building complex UIs with nested components or integrating async operations seamlessly, `use()` is a game-changer.

## What is the use() Hook?

The `use()` hook is a versatile primitive in React 19 that allows you to read values from contexts, refs, or even promises directly within your component's render phase. Unlike traditional hooks like `useContext` or `useEffect`, `use()` integrates natively with React's Suspense system, enabling concurrent rendering features without boilerplate.

Key capabilities:

- **Context Consumption**: Read context values without explicitly calling `useContext` or ensuring a provider wraps the component tree in every scenario.
- **Ref Access**: Directly access ref values, simplifying imperative handle patterns.
- **Promise Handling**: Consume promises for async data fetching, suspending the component until resolved—perfect for data-driven UIs.

This hook is especially powerful in large applications where prop drilling becomes a bottleneck. By leveraging contexts more fluidly, `use()` lets you centralize state management while keeping components lean.

## Syntax and Basic Usage

The `use()` hook takes a single argument: the resource you want to read (a context, ref, or promise). It returns the resolved value synchronously during render.

Here's the basic syntax:

```ts
import { use } from 'react';

function MyComponent({ themeContext }) {
  // Reading a context value
  const theme = use(themeContext);

  // Or reading a promise
  const data = use(fetchDataPromise);

  return <div style={{ color: theme.primaryColor }}>Hello, World!</div>;
}
```

Note: `use()` must be called at the top level of your component (like other hooks) and only during render. It throws an error if called in event handlers or loops.

For contexts, you'll still need a `createContext` and provider, but `use()` simplifies consumption:

```ts
import { createContext } from 'react';

const ThemeContext = createContext();

function ThemeProvider({ children, theme }) {
  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
}

// In a child component
function Button() {
  const theme = use(ThemeContext); // No need for useContext!
  return <button style={theme.buttonStyle}>Click me</button>;
}
```

## Real-World Examples: Eliminating Prop Drilling

Imagine a dashboard app where user preferences (like theme and language) need to be accessible across dozens of components. Without `use()`, you'd drill props down the tree or use `useContext` everywhere. With `use()`, it's effortless.

### Example 1: Themed Dashboard

```ts
import { createContext, Suspense } from 'react';
import { use } from 'react'; // Hypothetical import for clarity

const UserContext = createContext();

function App() {
  const userPrefs = { theme: 'dark', lang: 'en' };
  return (
    <UserContext.Provider value={userPrefs}>
      <Suspense fallback={<div>Loading...</div>}>
        <Dashboard />
      </Suspense>
    </UserContext.Provider>
  );
}

function Header() {
  const { theme } = use(UserContext);
  return <header className={`header ${theme}`}>Welcome</header>;
}

function Sidebar() {
  const { lang } = use(UserContext);
  return <aside>{lang === 'en' ? 'Menu' : 'Menú'}</aside>;
}

function Dashboard() {
  // No props needed!
  return (
    <div className="dashboard">
      <Header />
      <Sidebar />
      <MainContent />
    </div>
  );
}
```

Here, `Header` and `Sidebar` access the context directly, avoiding prop passes through `Dashboard`.

### Example 2: Async Data with Promises

For data fetching, `use()` shines with Suspense:

```ts
import { use } from 'react';

async function fetchUser(id) {
  const res = await fetch(`/api/user/${id}`);
  return res.json();
}

function UserProfile({ userId }) {
  const user = use(fetchUser(userId)); // Suspends until resolved
  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.bio}</p>
    </div>
  );
}

// Wrap in Suspense in parent
function App() {
  return (
    <Suspense fallback={<Spinner />}>
      <UserProfile userId={1} />
    </Suspense>
  );
}
```

This eliminates `useEffect` and state management for loading states—React handles suspension automatically.

## Migrating from useContext

If you're using `useContext` today, migrating to `use()` is straightforward:

1. **Replace Calls**: Swap `const value = useContext(MyContext);` with `const value = use(MyContext);`.
2. **Error Boundaries**: Ensure your app uses Suspense for async cases; `use()` will throw promises to be caught by Suspense.
3. **Ref Handling**: For refs, `use(ref)` reads the current value, similar to `useImperativeHandle` but simpler.

Potential Gotchas:

- `use()` doesn't work outside of React's render phase.
- For dynamic contexts, ensure the argument is stable (use `useMemo` if needed).

Before migration, test in a feature branch—React 19's canary releases make this easy.

## Benefits for Component Composition

`use()` enhances composition by:

- **Reducing Boilerplate**: Fewer prop types and default props.
- **Better Performance**: Integrates with concurrent features like Transitions, avoiding unnecessary re-renders.
- **Improved Readability**: Components focus on UI, not data plumbing.
- **Scalability**: Ideal for design systems where themes or configs propagate deeply.

In monorepos or micro-frontends, it centralizes shared state without global stores like Redux (unless needed for complex logic).

## Future Implications

As React evolves toward more concurrent and async-first patterns, `use()` lays the groundwork for server components and streaming UIs in frameworks like Next.js. Expect integrations with:

- Enhanced caching in React Query or SWR.
- Zero-config async/await in components.
- Deeper Suspense optimizations.

This hook signals React's shift from imperative to declarative data flow, potentially reducing reliance on external state libraries.

## Conclusion

The `use()` hook in React 19 is more than a convenience—it's a paradigm shift for building maintainable, performant apps. By simplifying prop drilling and async handling, it empowers you to write cleaner code that scales. Start experimenting in your projects today, and watch your components become more composable and joyful to work with.

If you have questions or examples to share, drop a comment below!

_Tags: React 19, Hooks, Context, Suspense, Prop Drilling_
