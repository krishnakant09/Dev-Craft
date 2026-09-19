# DevCraft 🚀

> **Modern Web Development Tutorials & Engineering Insights**  
> A high-performance, responsive web application and tutorial blog platform built with semantic HTML5, pure CSS Grid & Flexbox, and modular vanilla JavaScript.

[![Verification Suite](https://img.shields.io/badge/Verification-37%2F37%20Passed-success?style=flat-square&logo=checkmarx)](verify.js)
[![HTML5](https://img.shields.io/badge/HTML5-Semantic%20Architecture-E34F26?style=flat-square&logo=html5&logoColor=white)](index.html)
[![CSS3](https://img.shields.io/badge/CSS3-Grid%20%26%20Flexbox-1572B6?style=flat-square&logo=css3&logoColor=white)](style.css)
[![JavaScript](https://img.shields.io/badge/JavaScript-Vanilla%20ES6%2B-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](app.js)
[![Theme](https://img.shields.io/badge/Theme-Dark%20%2F%20Light%20Mode-6366F1?style=flat-square)](app.js)
[![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)](LICENSE)

---

## 📖 Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Architecture & Tech Stack](#architecture--tech-stack)
- [Directory Structure](#directory-structure)
- [Getting Started](#getting-started)
- [Automated Verification](#automated-verification)
- [Layout & Design System](#layout--design-system)
- [Accessibility (a11y) & SEO](#accessibility-a11y--seo)
- [Browser Compatibility](#browser-compatibility)
- [License](#license)

---

## 🌟 Overview

**DevCraft** is a modern engineering blog and tutorial platform designed for developers seeking in-depth, code-first guides on modern CSS layout architectures, JavaScript internals, design systems, and web performance.

Built without external runtime dependencies or heavy UI frameworks, DevCraft demonstrates how to build production-grade, fluid, and accessible web experiences using standard modern web technologies.

---

## ✨ Key Features

### 🎨 Design System & Theming
- **Dual-Theme Engine (Dark/Light)**: Persisted in `localStorage` with automatic system color-scheme detection (`prefers-color-scheme`).
- **Modern Typography**: Styled with **Plus Jakarta Sans** for body/headlines and **JetBrains Mono** for code snippets and badges.
- **Glassmorphic Sticky Header**: Frosted glass navigation with smooth border transitions on scroll.
- **Interactive Code Window**: Floating hero code preview featuring syntax-highlighted CSS Grid samples.

### 📐 Layout & Responsiveness
- **Two-Column Grid Architecture**: Main article stream paired with a sticky information sidebar (`minmax(0, 1fr) 340px`).
- **Flexible Card Grid**: Responsive multi-column layout for tutorial articles with hover elevations and animated tag badges.
- **Comprehensive Breakpoints**: Seamless responsiveness across desktop (`>1024px`), tablet (`<=1024px`), collapsed sidebar (`<=880px`), and mobile devices (`<=768px` & `<=480px`).
- **Mobile Navigation Drawer**: Accessible off-canvas navigation menu with animated hamburger toggle and keyboard support (`Escape` key).

### ⚡ Interactive Functionality (Vanilla JS)
- **Live Category Filtering**: Instant category filtering (`All`, `CSS & Layout`, `JavaScript`, `Architecture`, `Performance`) with smooth entrance and exit animations.
- **Interactive Newsletter Signup**: Client-side validation with real-time feedback and accessible live region announcements (`aria-live="polite"`).
- **Smooth Back-to-Top**: Quick-scroll back to the top of the viewport.
- **Dynamic Date Handling**: Automatic copyright year updates.
- **Simulated Infinite Loader**: Async load-more button feedback for extended archives.

---

## 🛠️ Architecture & Tech Stack

| Technology | Purpose |
|------------|---------|
| **HTML5** | Semantic, accessible structure (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`) |
| **CSS3** | CSS Grid, Flexbox, Custom Properties (tokens), Keyframes, Glassmorphism, Responsive Media Queries |
| **Vanilla JavaScript (ES6+)** | DOM manipulation, theme persistence, accessible drawer controls, filter logic, form validation |
| **Node.js** | Powers the automated structural and accessibility test verification runner (`verify.js`) |

---

## 📁 Directory Structure

```text
Dev-Craft/
├── index.html       # Semantic HTML5 single-page application structure
├── style.css        # Pure CSS design system, layout grid, tokens, & animations
├── app.js           # Interactive scripts (theming, filtering, navigation, forms)
├── verify.js        # Automated test verification suite (37 unit & structural checks)
└── README.md        # Comprehensive project documentation
```

---

## 🚀 Getting Started

No package manager installation or build step is required! You can run DevCraft directly in any modern browser.

### Option 1: Direct File Launch
Simply open `index.html` in your browser:
- Double-click `index.html`, or
- Right-click `index.html` &rarr; **Open with** &rarr; **Chrome / Edge / Firefox / Safari**.

### Option 2: Local HTTP Server

Using **VS Code Live Server**:
1. Install the "Live Server" extension.
2. Click **Go Live** in the bottom status bar.

Using **Python 3**:
```bash
# In the project directory
python -m http.server 3000
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

Using **Node.js `npx serve`**:
```bash
npx serve .
```

---

## 🧪 Automated Verification

DevCraft includes a dedicated automated verification script (`verify.js`) to assert structural integrity, semantic compliance, accessibility standards, responsive media queries, and script handlers.

To run the verification suite:

```bash
node verify.js
```

### Verification Checks Covered (37/37):
- ✅ Critical file existence (`index.html`, `style.css`, `app.js`)
- ✅ Semantic HTML elements (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`)
- ✅ Strict single `<h1>` heading hierarchy
- ✅ ARIA accessibility attributes (`aria-label`, `aria-expanded`, `aria-controls`, `role="tablist"`, `role="tab"`)
- ✅ Responsive two-column desktop CSS Grid layout
- ✅ Responsive media queries (1024px, 880px, 768px, 480px)
- ✅ Vanilla JS initialization methods (theming, mobile nav, category filters, newsletter)

---

## 📐 Layout & Design System

### Design Tokens (`style.css`)
```css
:root {
  /* Brand Accents */
  --primary: #4f46e5;
  --secondary: #06b6d4;
  --accent-purple: #8b5cf6;
  --accent-emerald: #10b981;

  /* Typography */
  --font-sans: 'Plus Jakarta Sans', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  /* Dimensions */
  --container-max: 1240px;
  --header-height: 72px;
}
```

### Responsive Breakpoints
| Breakpoint | Target Devices | Layout Behavior |
|------------|----------------|-----------------|
| `> 1024px` | Desktops & Large Displays | Two-column grid (`1fr 340px`), full navigation |
| `<= 1024px`| Small Laptops & Tablets | Compact padding, adjusted hero code preview |
| `<= 880px` | Portrait Tablets | Single-column layout (sidebar flows below tutorial grid) |
| `<= 768px` | Mobile Devices | Hamburger drawer menu, vertical button groups |
| `<= 480px` | Small Mobile Screens | Fluid typography, simplified metric cards |

---

## ♿ Accessibility (a11y) & SEO

- **Semantic Landmark Roles**: Full utilization of landmark tags for screen reader orientation.
- **Keyboard Navigation**: Focus indicators, tab indices, and `Escape` key listeners for interactive modals/drawers.
- **ARIA Standards**: Dynamic `aria-expanded` and `aria-selected` toggles reflecting real-time UI state.
- **Contrast & Readability**: Both dark and light color tokens meet WCAG AA contrast guidelines.
- **SEO Ready**: Optimized meta tags (description, author, viewport) and clean document outline.

---

## 🌐 Browser Compatibility

Tested and fully functional on all modern evergreen browsers:
- **Google Chrome** & Chromium-based browsers (Edge, Brave, Opera)
- **Mozilla Firefox**
- **Apple Safari**

---

## 📄 License

This project is licensed under the [MIT License](LICENSE) — free to use for personal, educational, and commercial projects.
