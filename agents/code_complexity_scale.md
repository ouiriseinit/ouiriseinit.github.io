Complexity Scale
A visual framework for mapping file types to complexity tiers in a project.
Overview
plain
┌─────────────────────────────────────────────────────────────────┐
│  🔴 TEST DRIVE        │  🟡 UTILITY LAYER    │  🟢 COMPONENT LAYER │
│  ───────────────────  │  ──────────────────  │  ─────────────────  │
│                       │                      │                     │
│  • .py                │  • .utils.js         │  • .ui.js           │
│  • .test.py           │  • .test.js          │  • .html            │
│                       │  • .serve.js         │  • .css             │
│                       │                      │  • .app.tsx         │
│                       │                      │                     │
│  💡 Quick scripts     │  🔧 Helpers, tests,  │  🏗️  Full UI        │
│     & unit tests      │     server logic     │     architecture    │
│                       │                      │                     │
│  LOW COMPLEXITY ◄─────┼──── MEDIUM COMPLEXITY┼────► HIGH COMPLEXITY │
│                       │                      │         │           │
│                       │                      │         ▼           │
│                       │                      │    ┌─────────┐      │
│                       │                      │    │components/    │
│                       │                      │    │style/global   │
│                       │                      │    │    ...       │
│                       │                      │    └────┬────┘      │
│                       │                      │         │           │
│                       └──────────────────────┘         │           │
│                                                        │           │
│                     ◄──────────────────────────────────┘           │
│                         FEEDBACK LOOP                              │
│              (Component layer feeds back to Test Drive)            │
└─────────────────────────────────────────────────────────────────┘
Tiers
🔴 Test Drive — Low Complexity
Table
Extension	Purpose
.py	Quick scripts, prototypes, one-off utilities
.test.py	Unit tests, validation scripts, smoke tests
Mindset: Move fast, validate ideas, iterate quickly.
🟡 Utility Layer — Medium Complexity
Table
Extension	Purpose
.utils.js	Shared helper functions, common logic
.test.js	JavaScript test suites, integration tests
.serve.js	Server logic, API endpoints, middleware
Mindset: Build reliable infrastructure, test thoroughly, serve data.
🟢 Component Layer — High Complexity
Table
File / Folder	Purpose
.ui.js	UI component logic, interactive elements
.html	Structure, markup, semantic layout
.css	Styling, theming, responsive design
.app.tsx	Main application entry, routing, state
components/	Reusable UI components
style/global	Global styles, design tokens, CSS variables
Mindset: Architect the full experience, compose from pieces, maintain consistency.
Feedback Loop
plain
     ┌─────────────────────────────────────┐
     │                                     │
     ▼                                     │
┌─────────┐      ┌──────────────┐      ┌─────────────┐
│  Test   │ ───► │   Utility    │ ───► │  Component  │
│  Drive  │      │   Layer      │      │   Layer     │
│ (.py)   │      │ (.utils.js)  │      │ (.app.tsx)  │
└─────────┘      └──────────────┘      └──────┬──────┘
     ▲                                        │
     └────────────────────────────────────────┘
              Feedback Loop
How it works:
Prototype in .py — validate the concept fast
Build utilities in .js — harden the logic
Compose components in .tsx/.html/.css — ship the full feature
Feed back learnings from the component layer into new .py test scripts
Repeat
Usage
Use this scale to:
Estimate effort when starting a new file
Decide where to prototype — start at the lowest tier
Refactor direction — move stable code up the complexity chain
Onboard teammates — show them the project's complexity landscape at a glance
Quick Reference
Table
Tier	Color	Files	When to Use
Test Drive	🔴 Red	.py, .test.py	Prototyping, testing, validation
Utility	🟡 Yellow	.utils.js, .test.js, .serve.js	Shared logic, server code, JS tests
Component	🟢 Green	.ui.js, .html, .css, .app.tsx, components/, style/	Full UI, production features
Generated from handwritten complexity scale sketch.