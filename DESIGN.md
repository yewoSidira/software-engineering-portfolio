---
version: alpha
name: Yewo Sidira Portfolio
description: A backend engineer portfolio presented as a calm, technical workspace with blueprint accents and readable project evidence.
colors:
  background: "#080D16"
  surface: "#0D1522"
  foreground: "#EDF4FA"
  secondary: "#A2B2C1"
  muted: "#74889A"
  accent: "#58C8ED"
  accent-light: "#087CA1"
  border: "rgba(164, 195, 217, 0.13)"
typography:
  display:
    fontFamily: '"Space Grotesk", "Segoe UI", sans-serif'
  sans:
    fontFamily: '"DM Sans", "Segoe UI", sans-serif'
  mono:
    fontFamily: '"DM Mono", "Cascadia Code", monospace'
rounded:
  DEFAULT: "18px"
  sm: "6px"
  md: "9px"
  lg: "14px"
spacing:
  content-max: "1160px"
  section: "clamp(5rem, 9vw, 8rem)"
  card: "clamp(1.4rem, 2.5vw, 2rem)"
components:
  button:
    radius: "9px"
    min-height: "48px"
  card:
    radius: "14px"
    border: "1px solid semantic border"
  technical-panel:
    radius: "16px"
    treatment: "dark translucent surface with a restrained cyan highlight"
---

# Yewo Sidira Portfolio Design System

## Overview

### Creative North Star

Treat the page like an engineer's well-kept workbench: deep ink surfaces, crisp type, measured grid lines, and a single cyan signal that guides the eye toward project evidence. The visual language keeps the existing dark engineering concept while feeling quieter and more intentional than a generic terminal or dashboard.

### Product context and register

- **Audience and primary job:** Recruiters, engineering peers, and collaborators scan the work, understand the backend focus, and reach a project or contact link.
- **Target market(s) and evidence:** Not specified by the portfolio content; avoid locale-specific assumptions.
- **Locale(s) and language policy:** English content; use system sans-serif fallbacks for unserved glyphs.
- **Usage scene:** Quick review on laptop or phone, with project links and contact information easy to reach.
- **Register:** Personal brand and work showcase.
- **Memorable signature:** The core stack panel reads as a compact system profile set against a subtle blueprint grid.
- **Restraint:** Project content and links stay more prominent than decoration. Grid and code texture remain low contrast; no fake metrics, status claims, or decorative dashboard widgets.
- **Anti-references:** Avoid neon-heavy cyberpunk, terminal cosplay, generic gradient blobs, and admin-dashboard density.
- **Token ownership/runtime mapping:** This document records the visual contract. Runtime tokens and component overrides live in `static/css/premium.css`, imported last by `static/css/style.css`; base implementation remains in the existing section stylesheets.

## Colors

The canvas is ink navy (`background`), with slightly lighter blue-charcoal cards (`surface`). Near-white foreground and cool gray secondary text carry reading hierarchy. Cyan is expressive and reserved for links, focus, and primary actions. Green is semantic and used only for availability/status. Light mode shifts to a cool paper background and keeps the same hierarchy with a darker blue accent. Grid lines, borders, and ambient light remain low contrast.

## Typography

Space Grotesk provides the display voice for headings; DM Sans carries readable prose and controls; DM Mono is reserved for small technical labels and stack values. Keep hero text large and tightly tracked, body copy comfortable at a 60–70 character measure, and metadata small but legible. All families have system fallbacks.

## Layout

Use a centered content width up to 1160px. The hero pairs a large introduction with a technical stack panel on wide screens and stacks them on smaller screens. Content sections use generous vertical breathing room. Project cards use a two-column grid when space allows and one column on phones; links remain visible without hover. Navigation stays compact and fixed.

## Elevation & Depth

Separate surfaces through slight tone changes, fine borders, and restrained shadows. Blur is limited to the desktop navigation. Ambient gradients and grid texture should never reduce text contrast or compete with content.

## Shapes

Use practical rounded rectangles: 9px for actions, 14px for cards, and 16px for the technical panel. Small skill labels use modest 6px corners. Avoid pill shapes except for semantic availability where the existing content warrants it.

## Components

### Foundational visual states

Links and buttons keep a visible keyboard focus ring. Hover changes border or text color without moving layout. Disabled/private repository text remains subdued but readable and is not interactive. Respect `prefers-reduced-motion`; animation is atmospheric only.

### Buttons and actions

The cyan filled action is reserved for the main path. Secondary actions use a transparent surface and border. Use concise labels that state the destination or outcome.

### Navigation and data display

Navigation uses quiet text with a cyan active underline. Project statuses use compact labels; technology lists use restrained rectangular badges. Do not imply that planned architecture is implemented.

### Forms and overlays

No forms, dialogs, or overlays are present in the portfolio.

### Iconography

Use existing text and simple glyphs only. Keep labels alongside icons so navigation and actions remain understandable without symbols.

### Motion

Use short opacity and color transitions for interaction feedback. The background grid moves slowly on capable screens; reduced-motion settings disable it.

### Content and data visualization

Use direct, evidence-based project descriptions. Separate a working demo from source availability. Do not invent project metrics or screenshots.

## Do's and Don'ts

- **Do:** Keep the stack panel and project links easy to scan.
- **Do:** Preserve the dark technical palette while maintaining a clear light theme.
- **Don't:** Use glowing effects, animation, or accent color on every card.
- **Don't:** present concepts or planned architecture as shipped functionality.
