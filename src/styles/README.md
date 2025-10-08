# Shared SCSS styles

This folder centralizes shared variables and mixins.

- `index.scss`: forwards variables, mixins, and helpers
- `_variables.scss`: colors, typography, spacing, z-index, etc.
- `_mixins.scss`: `respond-to` breakpoints, `fluid` function, `line-clamp`
- `_responsive.scss`: example helpers like `.container`

## Usage

In any SCSS file (global or module):

```scss
@use '@/styles' as *; // via tsconfig path alias or relative path

.title {
  font-size: fluid(16px, 24px);
  @include respond-to(md) {
    font-weight: 600;
  }
}
```

If you prefer relative path:

```scss
@use '../styles' as *;
```
