---
name: Banco Agrariol Core
colors:
  surface: '#fff8f5'
  surface-dim: '#e6d7cf'
  surface-bright: '#fff8f5'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#fff1e9'
  surface-container: '#faebe2'
  surface-container-high: '#f4e5dd'
  surface-container-highest: '#eee0d7'
  on-surface: '#211a15'
  on-surface-variant: '#514532'
  inverse-surface: '#372f29'
  inverse-on-surface: '#fdeee5'
  outline: '#837560'
  outline-variant: '#d6c4ac'
  surface-tint: '#7d5700'
  primary: '#7d5700'
  on-primary: '#ffffff'
  primary-container: '#ffb500'
  on-primary-container: '#6b4a00'
  inverse-primary: '#ffba30'
  secondary: '#705a4a'
  on-secondary: '#ffffff'
  secondary-container: '#fcddc8'
  on-secondary-container: '#776050'
  tertiary: '#2f6c00'
  on-tertiary: '#ffffff'
  tertiary-container: '#70db26'
  on-tertiary-container: '#275b00'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdeab'
  primary-fixed-dim: '#ffba30'
  on-primary-fixed: '#271900'
  on-primary-fixed-variant: '#5f4100'
  secondary-fixed: '#fcddc8'
  secondary-fixed-dim: '#dec1ad'
  on-secondary-fixed: '#28180c'
  on-secondary-fixed-variant: '#574334'
  tertiary-fixed: '#8efd49'
  tertiary-fixed-dim: '#73df2b'
  on-tertiary-fixed: '#092100'
  on-tertiary-fixed-variant: '#225100'
  background: '#fff8f5'
  on-background: '#211a15'
  surface-variant: '#eee0d7'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  title-lg:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-margin-mobile: 16px
  container-margin-desktop: 40px
  gutter: 16px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 32px
---

## Brand & Style
The design system is engineered to bridge the gap between traditional agricultural banking and modern digital finance. It adopts a **Modern Minimalist** aesthetic that prioritizes clarity, speed, and approachability. The goal is to evoke a sense of "Human Security"—technology that feels warm and grounded rather than cold and industrial.

The interface leverages generous whitespace to reduce cognitive load, ensuring that critical financial data remains the focal point. High-contrast elements and purposeful color application ensure the system is accessible to a wide demographic, including those in high-glare outdoor environments. The emotional response should be one of reliability, local pride, and effortless control.

## Colors
The palette is rooted in the Colombian landscape, using earth tones paired with high-visibility action colors. 

- **Primary (#FFB500):** Reserved for primary calls to action and critical interactive states. It provides high visibility and warmth.
- **Secondary (#5C4738):** Used for primary typography and deep-toned backgrounds to provide a softer, more organic alternative to pure black.
- **Success (#5BC500):** Symbolizing growth and "green" funds; used for positive balances and completed transactions.
- **Surface:** The background uses a subtle off-white (#FCFCFC) to reduce eye strain and provide a premium, paper-like feel.

All color combinations for text and iconography must meet WCAG 2.1 AA standards for contrast.

## Typography
This design system utilizes **Inter** for its exceptional legibility at small sizes and its neutral, systematic character. 

The type hierarchy is strictly defined to ensure a clear information scent. Headlines use tighter letter-spacing and heavier weights to establish dominance, while body copy maintains generous line-height for readability. For financial figures (amounts), use `title-lg` or `display-lg` to ensure they are the first thing a user sees on a dashboard.

## Layout & Spacing
The system uses an **8px linear scale** for all spacing and layout decisions. 

- **Mobile:** A 4-column fluid grid with 16px side margins. 
- **Desktop:** A 12-column fixed grid (max-width 1200px) centered in the viewport.

Layouts should favor "stacking" components vertically on mobile to ensure ease of reach for thumb-driven navigation. Use ample padding within containers (minimum 24px) to maintain the minimalist, airy feel.

## Elevation & Depth
Depth is communicated through **Tonal Layers** and extremely soft **Ambient Shadows**. 

1. **Level 0 (Base):** Off-white background (#FCFCFC).
2. **Level 1 (Cards):** Pure White (#FFFFFF) with a soft shadow (0px 4px 20px rgba(92, 71, 56, 0.06)). This level is for the main content containers.
3. **Level 2 (Modals/Overlays):** Pure White (#FFFFFF) with a more defined shadow (0px 12px 32px rgba(92, 71, 56, 0.12)).

Avoid heavy borders; use subtle 1px dividers in a lightened version of the Secondary color (opacity 8-12%) to separate list items.

## Shapes
The design system employs a **Rounded** corner strategy (0.5rem / 8px base) to balance modernity with friendliness. 

Interactive elements like buttons and input fields use the base 8px radius. Larger containers (cards) use `rounded-lg` (16px), and notification badges or specialized "pill" buttons use `rounded-xl` (24px) to distinguish them from structural UI.

## Components

- **Action Buttons:** Primary buttons must be #FFB500 with #5C4738 text. They should have a minimum height of 56px on mobile to comply with Fitts's Law, ensuring easy tapping.
- **Transaction Cards:** Use Level 1 elevation. Icons should be placed in a circular container with 10% opacity of the category color (e.g., Green for income).
- **Input Fields:** Use a 1px border (#5C4738 at 20% opacity) that thickens and changes to the Info color (#418FE9) on focus. Labels should always be visible above the field.
- **Chips:** Used for filtering transaction history. Use a light background (#F0F0F0) and transition to #5C4738 when selected.
- **Empty States:** Use simplified, warm illustrations in the Secondary color palette to guide users toward their first action.
- **Progress Bars:** For financial goals, use a thick 8px track with #5BC500 for the fill to indicate growth and success.