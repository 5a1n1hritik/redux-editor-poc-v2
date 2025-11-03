
# 🧠 CMS Page Builder (POC) — My Learning Journey

This project is a **Proof of Concept (POC)** I built to **learn how a drag-and-drop CMS Page Builder works internally**.  
The main purpose was not to build a production tool, but to **understand the core logic** behind systems like Webflow, Framer, or Wix — how they manage components, state, and UI dynamically.


## 🎯 Learning Goals
Before starting this project, my main goals were:

- To learn **how Redux works in an editor environment**.  
- To understand **how components can be added, updated, and nested dynamically**.  
- To explore **React DnD** for drag-and-drop functionality.  
- To manage page layouts as **JSON data structures**.  
- To create a **scalable foundation** that can evolve into a visual CMS.


## 🧩 What I Built
This project simulates a **mini CMS Page Builder**, where:

- Components (Text, Container, Button, etc.) can be **dragged from a sidebar** and **dropped on a Canvas**.  
- Each drop updates the **Redux state**, which holds the component structure as a **JSON tree**.  
- Components can be **nested** inside each other — for example, a Container can hold a Text or Button.  
- The Canvas **re-renders in real time** whenever Redux state changes.

It’s a simple, educational implementation of **drag–drop + Redux + dynamic rendering**.


## 🧠 What I Learned

### 🔹 1. Redux in an Editor
This was the biggest takeaway.  
I learned how **Redux** can power a live editor by keeping all UI data centralized in one store.

Key learnings:
- How to design a **global editor state** for dynamic components.  
- How **actions and reducers** work together to manage nested data.  
- How **recursive updates** help maintain parent-child relationships.  
- How React components can **auto-render** based on Redux updates.

> 🔸 Earlier I used Redux for simple counters and API calls.  
> This project helped me understand **how editors actually use Redux** to manage component hierarchies and live UIs.


### 🔹 2. React DnD (Drag & Drop)
I learned to:
- Use `useDrag` and `useDrop` hooks to move components around.  
- Restrict drop zones so that only valid placements (like child into a container) are allowed.  
- Trigger Redux updates on every successful drop.

It gave me confidence in handling **controlled drag-and-drop interactions**.


### 🔹 3. Recursive Rendering
I learned how to render deeply nested structures recursively —  
so a container can contain multiple levels of components without manually defining each layer.

This helped me understand **tree-based UI rendering** and **dynamic component generation**.


### 🔹 4. JSON as the Source of Truth
Every component (and its children) is stored in Redux as **JSON**, like this:

```json
{
  "id": "1",
  "type": "Container",
  "children": [
    { "id": "2", "type": "Text" },
    { "id": "3", "type": "Button" }
  ]
}
```

This taught me how **data-driven UIs** work — the same concept used in real CMS systems.


### 🔹 5. Component Abstraction

I created a reusable structure for all editor items:

```ts
interface EditorItem {
  id: string;
  type: string;
  props: Record<string, any>;
  children?: EditorItem[];
}
```

This made it easier to extend the editor with new components later (like HeroSection, Navbar, or Image).


## 💡 Personal Takeaways

- I finally understood **Redux beyond simple examples** — especially its role in UI builders.
- Learned to handle **deeply nested data and recursive rendering** confidently.
- Improved my knowledge of **state-driven UI architecture**.
- Realized how **no-code and CMS platforms** structure their internal logic.Built more confidence in using **React + Redux + TypeScript** together.

> 🧠 This project wasn’t just coding practice — it changed how I think about state management and UI design systems.


## 🌱 Future Plans

If I continue this project, I’d like to add:

* 🎨 **Property Editor** — for editing component styles and text.
* 🧱 **Custom Component Library** — Navbar, Hero, Footer, Card, etc.
* 💾 **Save / Load Feature** — store page JSON in backend.
* ⚙️ **Preview Mode** — switch between edit and preview view.


## 🛠️ Tech Stack

| Technology          | Purpose                     |
| ------------------- | --------------------------- |
| **Next.js / React** | Frontend framework          |
| **Redux Toolkit**   | Global state management     |
| **React DnD**       | Drag-and-drop functionality |
| **TypeScript**      | Type safety and scalability |


## 🧑‍💻 Author

**Hritik** — Full Stack Developer

> Built this POC purely for **learning and self-growth**, exploring how editors, CMS systems, and visual page builders work behind the scenes.


## 🏁 Summary

This project gave me **hands-on experience in combining Redux with React DnD** to manage complex, nested UIs.
It taught me the real-world logic behind **CMS-like editors** and how to structure apps that rely entirely on **data-driven rendering**.

Even though it’s a learning project, it helped me **grow as a developer** and think like a **system designer**.

---

⭐ If you’re also learning Redux or exploring how CMS builders work — I hope this inspires you to build your own version too!
