# The Prop Setters Pattern: Empowering Users with Rendering Control

In the ever-evolving world of React component design, flexibility is key. One powerful technique for creating reusable, customizable components is the **prop setters pattern** (also known as prop getters). This approach allows component consumers to have fine-grained control over rendering logic without the verbosity of render props or the rigidity of fixed props. Popularized by experts like Kent C. Dodds in his insightful article ["How to Give Rendering Control to Users with Prop Getters"](https://kentcdodds.com/blog/how-to-give-rendering-control-to-users-with-prop-getters), this pattern strikes a balance between simplicity and power.

In this post, we'll dive into what prop setters are, explore real-world examples like modals and tooltips, compare them to alternatives like render props, and provide practical code implementations. By the end, you'll be equipped to implement this pattern in your own projects for more maintainable and user-friendly components.

## What Are Prop Setters?

Prop setters, or prop getters, are functions passed as props to a component that return the necessary props (like event handlers, attributes, or styles) for specific elements. Instead of the component dictating _how_ something renders, it delegates that control to the consumer.

The core idea:

- The component provides "getter" functions (e.g., `getToggleProps`, `getContentProps`).
- Consumers call these functions on their elements (e.g., `<button {...getToggleProps()}>`).
- This enables customization: consumers can add their own props, override behaviors, or integrate with their state management.

This pattern shines in interactive components where users need to hook into events or apply styles without forking the component code.

### Why Use Prop Setters?

- **Flexibility**: Users can compose behaviors without render props' boilerplate.
- **Reusability**: Components stay generic and adaptable.
- **Predictability**: Clear APIs reduce cognitive load compared to children-as-function patterns.
- **Accessibility**: Built-in support for ARIA attributes and keyboard events.

## Real-World Examples

Let's see prop setters in action with two common UI patterns: modals and tooltips.

### Example 1: Building a Modal Component

A modal typically needs an overlay, a trigger button, and content. With prop setters, the consumer controls the rendering while the component handles the logic.

Here's a basic implementation:

```jsx
// Modal.js
import { useState } from "react";

function Modal({ onClose, render }) {
  const [isOpen, setIsOpen] = useState(false);

  const getTriggerProps = () => ({
    onClick: () => setIsOpen(true),
    "aria-haspopup": "dialog",
  });

  const getOverlayProps = () => ({
    role: "dialog",
    "aria-modal": "true",
    onClick: (e) => {
      if (e.target === e.currentTarget) {
        setIsOpen(false);
        onClose?.();
      }
    },
    style: { display: isOpen ? "flex" : "none" },
  });

  const getCloseProps = () => ({
    onClick: () => {
      setIsOpen(false);
      onClose?.();
    },
    "aria-label": "Close modal",
  });

  return render({
    isOpen,
    getTriggerProps,
    getOverlayProps,
    getCloseProps,
  });
}

// Usage in a parent component
function App() {
  return (
    <Modal
      onClose={() => console.log("Modal closed")}
      render={({ isOpen, getTriggerProps, getOverlayProps, getCloseProps }) => (
        <>
          <button {...getTriggerProps()}>Open Modal</button>
          {isOpen && (
            <div {...getOverlayProps()}>
              <div className="modal-content">
                <h2>Modal Title</h2>
                <p>This is the modal content.</p>
                <button {...getCloseProps()}>Close</button>
              </div>
            </div>
          )}
        </>
      )}
    />
  );
}
```

In this example:

- `getTriggerProps` handles the open toggle.
- `getOverlayProps` manages the backdrop click and accessibility.
- The consumer can add custom styles (e.g., `className="my-modal"`) or additional handlers without breaking the component.

### Example 2: Creating a Tooltip Component

Tooltips require hover/focus detection and positioning. Prop setters allow users to render the trigger and tooltip elements flexibly.

```jsx
// Tooltip.js
import { useState } from "react";

function Tooltip({ children, text }) {
  const [isVisible, setIsVisible] = useState(false);

  const getTriggerProps = () => ({
    onMouseEnter: () => setIsVisible(true),
    onMouseLeave: () => setIsVisible(false),
    onFocus: () => setIsVisible(true),
    onBlur: () => setIsVisible(false),
    "aria-describedby": "tooltip",
  });

  const getTooltipProps = () => ({
    id: "tooltip",
    role: "tooltip",
    style: {
      display: isVisible ? "block" : "none",
      position: "absolute",
      background: "black",
      color: "white",
      padding: "4px 8px",
    },
  });

  return children({ getTriggerProps, getTooltipProps, isVisible });
}

// Usage
function App() {
  return (
    <Tooltip text="This is a tooltip!">
      {({ getTriggerProps, getTooltipProps, isVisible }) => (
        <div style={{ position: "relative" }}>
          <button {...getTriggerProps()}>Hover me</button>
          {isVisible && <div {...getTooltipProps()}>This is a tooltip!</div>}
        </div>
      )}
    </Tooltip>
  );
}
```

Here, the consumer can position the tooltip relative to the trigger and add animations or custom events seamlessly.

## Advantages Over Render Props

Render props (passing a function as a prop to share logic) are powerful but can lead to nested JSX and prop drilling. Prop setters offer:

- **Less Boilerplate**: No need for deep render prop chains; just spread props on elements.
- **Better Composition**: Easier to integrate with hooks like `useState` in the consumer.
- **Error-Prone Reduction**: Consumers can't accidentally misuse the API as easily.
- **Performance**: Avoids unnecessary re-renders from function props in some cases.

For instance, a render props modal might look like:

```jsx
<Modal
  render={({ isOpen, toggle }) => (
    <div>
      <button onClick={toggle}>Open</button>
      {isOpen && <ModalContent />}
    </div>
  )}
/>
```

This works but scales poorly. Prop setters keep it flat and explicit.

Compared to controlled props (e.g., passing `onClick` directly), setters centralize logic while allowing overrides.

## Code Implementations and Best Practices

### Full Implementation Tips

1. **Memoize Getters**: Use `useCallback` to prevent unnecessary re-renders.

   ```jsx
   const getTriggerProps = useCallback(
     () => ({
       onClick: () => setIsOpen((prev) => !prev),
     }),
     []
   );
   ```

2. **Handle Merging**: If consumers pass props to your component, merge them safely (e.g., using a utility like `lodash.merge` for objects).

3. **TypeScript Support**: Define interfaces for the returned props.

   ```tsx
   interface TriggerProps {
     onClick?: () => void;
     'aria-label'?: string;
   }
   const getTriggerProps = (): TriggerProps => ({ ... });
   ```

4. **Accessibility First**: Always include ARIA roles, labels, and keyboard support in defaults.

5. **Testing**: Mock the getters in unit tests to verify behavior without rendering full trees.

   ```jsx
   // Test example with @testing-library/react
   const { getByRole } = render(<MyComponent />);
   const button = getByRole("button");
   fireEvent.click(button);
   expect(getByText("Opened")).toBeInTheDocument();
   ```

6. **Avoid Overuse**: Reserve for complex interactions; simple props suffice for basic components.

### Common Pitfalls

- **Event Conflicts**: Ensure your getters don't override consumer handlers—use event pooling or call `e.stopPropagation()` judiciously.
- **State Synchronization**: If consumers manage external state, provide options to sync (e.g., `open` prop for controlled mode).
- **Bundle Size**: Keep components lean; extract logic to custom hooks if needed.

## Conclusion

The prop setters pattern is a game-changer for building flexible React components that empower users without sacrificing control. By drawing from Kent C. Dodds' wisdom, we've seen how it simplifies modals, tooltips, and more, outperforming render props in usability. Next time you're designing a reusable UI primitive, reach for prop getters—they'll make your code cleaner, more accessible, and a joy to compose.

If you've used this pattern, share your experiences in the comments! For further reading, check out Kent's original post and React's documentation on [compound components](https://react.dev/learn/passing-props-to-a-component#passing-props-to-a-component).

_Published on March 15, 2025_
