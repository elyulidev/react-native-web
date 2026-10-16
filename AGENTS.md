# Agents — React Native + Expo Course App

This file is read by AI agents at the start of every session in this repo.

---

## Project overview

A bilingual (ES / PT) course platform that renders conference-style lessons built from typed JSON content arrays. The app is built with **Expo**, **NativeWind**, and **Expo Router**. All package management uses **Bun**.

---

## Key paths

```
src/
  lib/lang/
    es/           ← Spanish (canonical source — edit this first)
      module-1/     conf-1.ts … conf-8.ts
      module-2/     conf-9.ts … conf-16.ts
      module-3/     conf-17.ts … conf-26.ts
      module-4/     conf-27.ts … conf-36.ts
      module-5/     conf-37.ts … conf-48.ts
      index.ts      imports + exports all modules
    pt/           ← Portuguese (translated copy of ES)
      (identical structure)
    index.ts      ← top-level re-export
  lib/           ← components, helpers
components/      ← shared UI components
src/app/         ← Expo Router file-based routes
```

---

## Conference file anatomy

Each `conf-N.ts` exports a `CurriculumTopic` typed as:

```ts
import type { CurriculumTopic } from "../../../../types/types";

export const conferenceN: CurriculumTopic = {
  id: "conf-N",
  title: "Conf. N: <Title>",
  content: [ /* ...blocks */ ],
};
```

---

## Content block types

Every element inside `content` has a `type` field. Available types:

| type | Shape | Notes |
|---|---|---|
| `heading` | `{ text: string }` | Section heading |
| `subtitle` | `{ text: string }` | Sub-section heading |
| `paragraph` | `{ text: string }` | Body text (supports bold `**...**` and inline `` `code` ``) |
| `divider` | `{}` | Visual divider |
| `code` | `{ language: string, code: string }` | Code block. Language is always `"bash"` or `"typescript"` |
| `image` | `{ imageUrl: string, caption?: string }` | Image + optional caption |
| `featureCard` | `{ featureItems: [{ icon, title, text }] }` | Grid of feature cards |
| `callout` | `{ alertType: "info"\|"warning"\|"danger"\|"tip", text: string }` | Highlighted callout box |
| `twoColumn` | `{ columns: [{ title, content: string[] }] }` | Two-column comparison (used for RN vs Web) |

### Block list for a conference

Every conference follows a general pattern (not enforced, but common):

```
heading → paragraph → divider → subtitle → (paragraph|featureCard|image|twoColumn|code|callout)* → repeat
```

---

## Editing conferences — rules

### 1. Always edit ES first, then mirror to PT

Spanish (`es/`) is the canonical source. Portuguese (`pt/`) is a translation.
When changing technical content: **edit ES, then edit PT with equivalent Portuguese text**.

Exception: PT-specific typos (e.g. leftover Cyrillic characters from broken translations) may be fixed in PT without touching ES.

### 2. Preserve exact block structure

Every `content` block is separated by commas. Do not remove or reorder blocks unless explicitly asked. When replacing text inside a block, keep the same `type` and sibling keys.

### 3. Do not use the Read tool output line numbers for Edit

The Read tool prefixes lines with `<number>: `. The actual file content starts **after** the colon+space. When copying text into an Edit `oldString`, strip the line number prefix.

### 4. Use the full line in Edit oldStrings

Short partial strings (e.g. just `code: "..."`) may not match uniquely and will fail. Always include enough surrounding context (e.g. the whole line or multiple lines) to make the match unique.

### 5. File encoding: watch for Cyrillic leftovers

Broken PT translations from a prior automated pipeline may contain Russian Cyrillic characters (`и`, `не`, `для`, `в`) in place of normal PT text. These render as `?` or garbled characters in some consoles.

To detect them:
```powershell
$cont = Get-Content -LiteralPath <file> -Raw
[regex]::Matches($cont, '[\u0400-\u04FF]')
```

The `edit` tool requires the actual Unicode character in the oldString, not its console rendering.

### 6. Bun commands in conference content

This course uses **Bun** as its runtime. Official Expo docs for Bun:
- `bun create expo my-app` (NOT `bunx create-expo-app`)
- `bun expo start` (NOT `bunx expo start`)
- `bun expo install <pkg>` (NOT `npm install`)

Reference: https://docs.expo.dev/guides/using-bun.md

---

## Technical facts — verified Sep 2026

Use these when editing conferences to keep content current:

| Topic | Current truth |
|---|---|
| React Native | 0.87. New Architecture is default/only since 0.82 (`"nueva arquitectura"` is outdated) |
| Expo SDK | 57. `npx expo start` / `bun expo start` |
| SafeAreaView | Core version is iOS-only. Always recommend `react-native-safe-area-context` |
| StyleSheet.create | Does not improve performance. Recommend NativeWind as this course's styling approach |
| Event mapping (web) | `onHoverIn` → `onPressIn` (NOT `onMouseOver` → `onLongPress`) |
| Airbnb + React Native | Abandoned in 2018. Replace with Shopify and Discord in company lists |
| Tesla + React Native | No confirmed production use. Do not list. |
| React → RN knowledge transfer | Say "the majority", not "75%" (unsourced figure) |
| Expo `create-expo` with Bun | `bun create expo my-app` |
| `create-expo-app` with npx | `npx create-expo-app my-app` |
| TanStack Query | v5: `isPending` (not `status === 'pending'`), `gcTime` (not `cacheTime`), no `onSuccess` callback |
| Drizzle ORM | v1: `$defaultFn`/`sql` for per-row defaults; enum is TS-only in SQLite |

---

## Checking for Cyrillic corruption across all PT files

Run this to find any remaining broken characters in the entire `src/lib/lang/` tree:

```powershell
$files = Get-ChildItem src/lib/lang -Recurse -Filter *.ts
foreach ($f in $files) {
  $cont = Get-Content -LiteralPath $f.FullName -Raw
  $m = [regex]::Matches($cont, '[\u0400-\u04FF]')
  if ($m.Count -gt 0) { "FOUND $($m.Count) in $($f.FullName)" }
}
```

---

## Tooling gotchas (this environment)

- `Select-String` works in PowerShell; the `Grep` tool is broken on this Windows machine (Expand-Archive module error). Always use bash + `Select-String` instead of the Grep tool.
- `rg` (ripgrep) is not installed. Do not use it.
- `bunx tsc --noEmit --skipLibCheck <file>` is the fastest way to verify a `.ts` file compiles.
- The `edit` tool requires you to have called `Read` on the file at least once in the conversation.
