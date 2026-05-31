---
name: Industrial Ether
colors:
  surface: '#f8f9f9'
  surface-dim: '#d9dada'
  surface-bright: '#f8f9f9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f4f4'
  surface-container: '#edeeee'
  surface-container-high: '#e7e8e8'
  surface-container-highest: '#e1e3e3'
  on-surface: '#191c1c'
  on-surface-variant: '#404846'
  inverse-surface: '#2e3131'
  inverse-on-surface: '#f0f1f1'
  outline: '#707976'
  outline-variant: '#c0c8c5'
  surface-tint: '#3a665f'
  primary: '#37645d'
  on-primary: '#ffffff'
  primary-container: '#507d75'
  on-primary-container: '#f4fffb'
  inverse-primary: '#a1d0c7'
  secondary: '#516169'
  on-secondary: '#ffffff'
  secondary-container: '#d2e2ec'
  on-secondary-container: '#55656d'
  tertiary: '#565e54'
  on-tertiary: '#ffffff'
  tertiary-container: '#6f776c'
  on-tertiary-container: '#f7fff1'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#bcece3'
  primary-fixed-dim: '#a1d0c7'
  on-primary-fixed: '#00201c'
  on-primary-fixed-variant: '#204e47'
  secondary-fixed: '#d5e5ef'
  secondary-fixed-dim: '#b9c9d3'
  on-secondary-fixed: '#0e1d25'
  on-secondary-fixed-variant: '#3a4951'
  tertiary-fixed: '#dde5d8'
  tertiary-fixed-dim: '#c1c9bc'
  on-tertiary-fixed: '#161d15'
  on-tertiary-fixed-variant: '#41493f'
  background: '#f8f9f9'
  on-background: '#191c1c'
  surface-variant: '#e1e3e3'
typography:
  display-lg:
    fontFamily: Comfortaa
    fontSize: 48px
    fontWeight: '500'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Comfortaa
    fontSize: 32px
    fontWeight: '500'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: Comfortaa
    fontSize: 28px
    fontWeight: '500'
    lineHeight: 36px
  headline-md:
    fontFamily: Comfortaa
    fontSize: 24px
    fontWeight: '500'
    lineHeight: 32px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 64px
  max-width: 1280px
---

## Brand & Style
The brand personality shifts from earthy warmth to a cool, "Aero-Industrial" aesthetic. It balances the structural integrity of industrial design with a light, airy contemporary feel. The target audience values precision and professional reliability but expects a modern, friction-less digital experience.

The design style is **Refined Industrial Minimalism**. It utilizes heavy whitespace and a restricted color palette to create a sense of focus, while the introduction of rounded geometries and "Mint-Steel" tones softens the traditional harshness of industrial interfaces. The emotional response should be one of calm efficiency, technical clarity, and high-end sophistication, now infused with a friendly, approachable modernism.

## Colors
The palette abandons the warmth of terracotta for a "Mint-Steel" primary (`#5D8A82`), providing a fresh, desaturated green-blue that feels both organic and engineered. 

- **Primary:** A muted mint-grey used for key actions and brand presence.
- **Secondary:** An industrial slate-charcoal for deep contrast and high-hierarchy text.
- **Tertiary:** A soft sage-grey used for subtle backgrounds and decorative elements.
- **Neutral:** A range of cool greys starting from a near-white base to provide an airy, spacious environment.

Avoid pure blacks; use the secondary charcoal for shadows and text to maintain the soft-industrial tone.

## Typography
The typography pairing emphasizes a tech-forward, friendly geometry. **Comfortaa** provides a unique, rounded personality for headlines, conveying modern innovation and accessibility. **Plus Jakarta Sans** is used for all functional text; its clean letterforms provide the professional counter-balance to the playful headlines.

- **Headlines:** Use Comfortaa to create a distinctive, approachable, and tech-centric identity.
- **Body & UI:** Use Plus Jakarta Sans to ensure high readability and a contemporary, structured feel.
- **Micro-copy:** Use semi-bold weights for labels to maintain structure in data-heavy layouts.

## Layout & Spacing
The layout follows a **Fixed-Fluid Hybrid** model. Large desktop views use a centered 12-column grid with a generous 64px margin to reinforce the "airy" feel. Spacing is strictly based on an 8px scale.

- **Mobile:** 4-column grid, 16px margins, 16px gutters.
- **Tablet:** 8-column grid, 32px margins, 24px gutters.
- **Desktop:** 12-column grid, 64px margins, 24px gutters.

Vertical rhythm should favor breathing room; double the expected padding between sections to maintain the minimalist aesthetic. Elements should "float" within the whitespace rather than feeling constrained by borders.

## Elevation & Depth
Depth is achieved through **Tonal Layering** and **Soft Ambient Shadows**. Instead of harsh shadows, the design system uses subtle shifts in background color (using the Tertiary and Neutral palettes) to distinguish surfaces.

- **Surfaces:** Use high-transparency overlays (glassmorphism) sparingly on top of the mint-grey backgrounds to suggest airiness.
- **Shadows:** When necessary for functional elevation (like modals), use a very large blur (32px+) with very low opacity (5-8%) using a cool blue-grey tint instead of black.
- **Outlines:** Use 1px soft-grey borders for structural elements like cards and input fields to maintain the industrial "line-work" feel without the weight of shadows.

## Shapes
The shape language is **Softened Industrial**. By using a "Rounded" base (8px / 0.5rem), the UI feels more approachable and modern, harmonizing with the rounded geometry of the headline typography.

- **Standard Components:** 8px (0.5rem) for buttons, inputs, and small cards.
- **Large Containers:** 16px (1rem) for main sections or prominent dashboard widgets.
- **Interactive States:** Subtle expansion or scaling of rounded corners can be used to indicate focus.

## Components
- **Buttons:** High-contrast primary buttons using the Mint-Steel (`#5D8A82`) with white text. Use 0.5rem (8px) corner radius. Secondary buttons should use a thin slate-grey border with no fill.
- **Input Fields:** Use a subtle background fill (Neutral 100) and an 8px corner radius. The focus state should use a 2px Mint-Steel border.
- **Cards:** White or very light grey backgrounds with a 1px border. Avoid heavy shadows; use a 16px corner radius to make them feel friendly.
- **Chips:** Highly rounded (pill-shaped) with low-saturation background tints from the Tertiary palette.
- **Lists:** Clean, borderless rows separated by subtle 1px horizontal dividers. Increase vertical padding to 16px or 24px per row to enhance the "airy" sensation.
- **Data Visualization:** Use the primary Mint-Steel and its shades for charts, ensuring the industrial technicality remains legible.