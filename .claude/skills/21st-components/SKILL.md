---
name: 21st-components
description: Browse and install open-source React UI components from 21st.dev (a community registry of Tailwind CSS + Radix UI components in the shadcn/ui style) into the current project via the shadcn CLI. Use this whenever the user wants to add a UI component — buttons, forms, modals, pricing sections, hero sections, navbars, tables, animated components, etc. — and mentions 21st.dev, pastes a 21st.dev component/profile URL, or just asks for a "nice looking" / "modern" / "polished" component without wanting to hand-build it from scratch. Also use it to search 21st.dev for a component matching a description before writing custom UI code.
---

# 21st.dev component installation

21st.dev (https://21st.dev, source: https://github.com/serafimcloud/21st) is an
open-source, community-run registry of React components built with Tailwind CSS
and Radix UI, in the same spirit as shadcn/ui. Its registry is **shadcn-compatible**:
every component ships as a small JSON manifest that the `shadcn` CLI can fetch and
drop straight into the project's source tree, wiring up its dependencies along the way.

Prefer pulling a component from 21st.dev over hand-writing one from scratch when the
user wants something visually polished — the registry exists specifically for
this, and it saves significant time versus building common UI patterns
(pricing tables, hero sections, animated buttons, testimonials, etc.) by hand.

## Prerequisites

The target project needs shadcn/ui's CLI scaffolding in place before a component can
be installed, because 21st.dev components are installed *through* that CLI:

1. A React project with Tailwind CSS configured.
2. A `components.json` at the project root (created by `shadcn init`).

Check for `components.json` first. If it's missing, run the initializer before
installing anything:

```bash
npx shadcn@latest init
```

Answer its prompts based on the project's actual setup (TypeScript vs JS, App
Router vs Pages Router, existing Tailwind config path, etc.) — don't guess if you
can inspect the project's `tsconfig.json` / `tailwind.config.*` first.

## Finding a component

21st.dev is browsable and searchable at https://21st.dev — components are organized
by category (buttons, forms, navigation, marketing sections, etc.) and by author
profile. If the user already gave you a specific component or profile URL, use it
directly. Otherwise:

- Use WebFetch/WebSearch against `21st.dev` with the user's description (e.g. "21st.dev
  pricing table component") to find a matching component page.
- Each component page has an "Add" / install command shown on the page itself — prefer
  copying that exact command over guessing the slug, since author/component-name
  slugs aren't always predictable from the display name.

## Installing a component

Once you have the component's page URL, install it with:

```bash
npx shadcn@latest add "<21st.dev component url>"
```

This is the same pattern as installing an ordinary shadcn/ui component, just pointed
at a 21st.dev registry URL instead of a shadcn slug. The CLI will:

- Copy the component's source file(s) into the project (typically under
  `components/` or wherever `components.json` points).
- Add any missing npm dependencies (e.g. `framer-motion`, `@radix-ui/react-*`) to
  `package.json` and install them.
- Add any Tailwind config additions the component needs (custom keyframes, colors)
  if the component declares them.

Run the project's package manager install afterward only if the CLI didn't already
trigger it (check `package.json` for new deps that aren't yet in `node_modules`).

## Verifying the install

After running the add command:

1. Confirm the new component file(s) exist where `components.json`'s `aliases`
   config says they should.
2. Re-check `package.json` for newly-added dependencies and make sure they installed
   cleanly (no errors in the CLI output).
3. Open the component file briefly to see its expected props/usage — many 21st.dev
   components include a demo/example usage block or comment showing how to import
   and render them.
4. Wire it into the page the user actually wants it on, importing it the way the
   component file exports it (default vs named export — check rather than assume).

## Troubleshooting

- **"No `components.json` found"** — run `npx shadcn@latest init` first (see
  Prerequisites).
- **CLI can't resolve the URL** — double-check the URL is a component page (not a
  category or search-results page); copy the install command shown on the page
  itself rather than constructing one by hand.
- **Style conflicts with existing Tailwind theme** — 21st.dev components generally
  use CSS variables matching shadcn/ui's default theme tokens (`--primary`,
  `--background`, etc.); if the project's `globals.css` doesn't define these yet,
  `shadcn init` sets them up.
