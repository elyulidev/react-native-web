# Informe de Auditoría: Contenido desactualizado por conferencia

**Proyecto:** AI Studio — Curso React Native / Expo
**Fecha de auditoría:** 14 de septiembre de 2026
**Alcance:** 48 conferencias (`src/lib/lang/es/module-1..5/conf-*.ts`). Las versiones en portugués (`src/lib/lang/pt/`) replican el mismo contenido y deben aplicar los mismos cambios.
**Metodología:** cruce de cada afirmación técnica contra la documentación oficial vigente (React Native, Expo SDK 57, Expo Router, NativeWind, Drizzle ORM, TanStack Query v5, Reanimated 4, TMDB) y verificación de código en los archivos fuente.

---

## Resumen ejecutivo

- **Versiones de referencia verificadas (sept. 2026):** React Native 0.87, Expo SDK 57 (RN 0.86, React 19.2), Expo Router (bundled en SDK 57), Reanimated 4, TanStack Query v5, Drizzle ORM v1, Zustand 5, NativeWind v4.
- **13 conferencias contienen hallazgos** (desactualización, deprecación o imprecisión conceptual): conf-1, conf-10, conf-11, conf-12, conf-14, conf-18, conf-20, conf-21, conf-25, conf-26, conf-29, conf-30, conf-32, conf-34, conf-40, conf-41, conf-42, conf-43, conf-45, conf-46.
- **Los problemas más críticos:**
  1. **Reanimated 4** — el plugin de Babel `react-native-reanimated/plugin` ya no existe (conf-45).
  2. **expo-image-picker** — `MediaTypeOptions` está deprecado (conf-34).
  3. **expo-file-system** — API heredada `documentDirectory`/`copyAsync` deprecada a favor de la nueva API `File`/`Directory`/`Paths` (conf-34, conf-42, conf-46).
  4. **TanStack Query v5** — opciones eliminadas/renombradas (`cacheTime`, `onSuccess`, `isLoading`) aparecen como contenido o distractores de quiz (conf-29).
  5. **Drizzle ORM** — `default(new Date())` se evalúa al definir el esquema, no por fila; y `enum` en SQLite es solo validación de tipos (conf-20, conf-46).
  6. **Expo Router** — el contenido insiste en "registrar rutas" con `Stack.Screen`, cuando el registro es automático por sistema de archivos (conf-10, conf-11, conf-12).
  7. **SafeAreaView del core** — recomendado como solución general cuando RN/Expo recomiendan `react-native-safe-area-context` (conf-1, conf-30, conf-32, conf-40, conf-41, conf-43).

---

## Módulo 1 — Fundamentos

### Conf. 1 — Introducción a React Native y Expo

**Hallazgo 1.1 — Empresas que "usan" RN (desactualizado).**
- **Texto actual:** `"Utilizado por gigantes como Meta, Microsoft, Tesla, y Airbnb."`
- **Evidencia:** Airbnb **abandonó** React Native en 2018 y migró su app a código nativo (post oficial *"React Native at Airbnb"*, jun. 2018). Su inclusión como ejemplo de adopción actual es engañosa.
- **Veredicto:** 🟠 Actualizar. Reemplazar `Airbnb` por empresas con adopción vigente (Meta, Microsoft, Shopify, Coinbase, Discord) o eliminar la lista.

**Hallazgo 1.2 — `SafeAreaView` del core como solución general (impreciso/desactualizado).**
- **Texto actual:** sección completa (título `SafeAreaView`, imagen comparativa) que lo presenta como el mecanismo para respetar áreas seguras.
- **Evidencia:**
  - La propia documentación de RN marca `SafeAreaView` como **solo iOS** y remite al paquete comunitario: *"SafeAreaView renders nested content and automatically applies paddings [on] iOS… For Android, use `StatusBar` or `react-native-safe-area-context`"* — https://reactnative.dev/docs/safeareaview.
  - Expo documenta `react-native-safe-area-context` como la solución recomendada en proyectos Expo — https://docs.expo.dev/versions/latest/sdk/safe-area-context/.
- **Veredicto:** 🔴 Desactualizado. Recomendar explícitamente `react-native-safe-area-context` (con `SafeAreaProvider` + `SafeAreaView`) y aclarar las limitaciones de iOS-only del core.

> Nota positiva: la conf-6 ya usa correctamente `react-native-safe-area-context` (importación desde el paquete, no del core). Conviene unificar el criterio en todo el curso.

### Conf. 2 — Primer proyecto Expo

- El contenido describe la estructura del template por defecto (`app/(tabs)/index.tsx`, `app/(tabs)/explore.tsx`, `create-expo-app@latest`) que **coincide** con el template actual (SDK 50+). ✓ Vigente.
- Recomienda `npx expo start --tunnel` como solución a problemas de red local — sigue siendo una opción válida del CLI. ✓ Vigente.

### Conf. 7 — Fuentes y Splash Screen

- `useFonts` de `expo-font`, `SplashScreen.preventAutoHideAsync()` / `hideAsync()` en `app/_layout.tsx` — patrón vigente según docs de Expo. ✓ Vigente.

---

## Módulo 2 — Expo Router y Navegación

### Conf. 10 — Tabs

**Hallazgo 10.1 — "Decirle al layout raíz" (desactualizado).**
- **Texto actual:** `"Finalmente, debemos decirle a nuestro layout raíz (app/_layout.tsx) que renderice este grupo de pestañas como una sola pantalla dentro del Stack."` + `<Stack.Screen name="(tabs)" … />`.
- **Evidencia:** En Expo Router el **registro es automático por sistema de archivos**. `<Stack.Screen>` solo sirve para **personalizar opciones** de una ruta ya existente, no para declararla: *"Routes are automatically registered when files are added to the app directory"* — https://docs.expo.dev/router/introduction/. Algunas versiones <= SDK 49 exigían la declaración explícita; el contenido refleja ese modelo antiguo.
- **Veredicto:** 🟠 Actualizar el modelo mental: el archivo en `app/` crea la ruta; `Stack.Screen` (opcional) solo define opciones.

### Conf. 11 — Rutas dinámicas `[id]`

**Hallazgo 11.1 — "Registrar esta nueva ruta" (desactualizado).**
- **Texto actual:** `"A continuación, debemos registrar esta nueva ruta en nuestro layout raíz (app/_layout.tsx)."` con bloque `{/* app/_layout.tsx */}` que declara `<Stack.Screen name="profile/[id]" … />` como si fuera obligatorio.
- **Evidencia:** misma que 10.1. Crear `app/profile/[id].tsx` **ya registra** la ruta; `Stack.Screen` es solo para opciones. El ejemplo además mezcla dos planteos: declarar `profile/[id]` en el layout raíz **no es necesario** para que la ruta funcione.
- **Veredicto:** 🔴 Desactualizado. Simplificar: crear el archivo basta; usar `Stack.Screen` únicamente para `options` (título, presentación, etc.).

### Conf. 12 — Autenticación con grupos

**Hallazgo 12.1 — Registro manual + guardas obsoletas.**
- **Texto actual:** declara `<Stack.Screen name="(tabs)" … />` y pantallas de auth en el layout raíz, con lógica manual de "qué grupo renderizar".
- **Evidencia:**
  - El registro manual vuelve a ser innecesario (mismo criterio que 10.1/11.1).
  - Expo Router ahora ofrece **rutas protegidas nativas**: `<Stack.Protected guard={isLoggedIn}>` — https://docs.expo.dev/router/advanced/authentication/. Es el patrón recomendado para auth vs. el condicional manual.
- **Veredicto:** 🔴 Desactualizado. Migrar la estrategia de auth al modelo de `Stack.Protected` / grupos `(auth)` + `(app)` con guard, que elimina lógica manual.

### Conf. 14 — AsyncStorage

**Hallazgo 14.1 — Guardar "token de sesión" en AsyncStorage (recomendación incorrecta).**
- **Texto actual:** `"Para datos simples, como las preferencias del usuario o un token de sesión, AsyncStorage es la herramienta perfecta."`
- **Evidencia:** Expo documenta **`expo-secure-store`** como el almacenamiento adecuado para datos sensibles (tokens, credenciales): el módulo usa Keychain/Keystore cifrado. AsyncStorage no es seguro para secretos — https://docs.expo.dev/versions/latest/sdk/securestore/.
- **Veredicto:** 🔴 Desactualizado (recomendación de seguridad). Mantener AsyncStorage para preferencias no sensibles; mover tokens/credenciales a `expo-secure-store`.

---

## Módulo 3 — SQLite y Drizzle ORM

### Conf. 18 — Configuración de Drizzle

**Hallazgo 18.1 — `drizzle-kit studio` en el flujo Expo (desactualizado).**
- **Texto actual:** script `"studio": "drizzle-kit studio"` + `babel-plugin-inline-import` para `.sql`.
- **Evidencia:** Para Expo SQLite, Drizzle recomienda el plugin **`drizzle-studio-expo`**, que se abre desde las **Expo DevTools** (Shift+M), no `drizzle-kit studio` — https://orm.drizzle.team/kit-studio/. El flujo de migraciones también cambió en Drizzle v1 (nueva estructura de migraciones sin `journal.json`).
- **Veredicto:** 🟠 Actualizar: quitar `drizzle-kit studio` y `babel-plugin-inline-import` del setup moderno; documentar `drizzle-studio-expo`.

**Hallazgo 18.2 — Versiones de paquetes.**
- **Texto actual:** `npm i drizzle-orm` / `npm i -D drizzle-kit` (stable a secas).
- **Evidencia:** El soporte de Drizzle para `expo-sqlite` con el API actual requiere la serie `drizzle-orm` v1 y `expo-sqlite` (SDK 51+). Si el curso se escribió contra la documentación RC (`drizzle-orm@rc expo-sqlite@next drizzle-kit@rc`), hoy esos paquetes ya son estables: `npx expo install expo-sqlite` + última v1.
- **Veredicto:** 🟠 Revisar versionado y comandos en los pasos de instalación/migración para que coincidan con v1 estable.

> Nota: el uso de `SQLite.openDatabaseSync('db.db')` + `drizzle()` + `useMigrations` en conf-18/21/26 es el patrón vigente. ✓

### Conf. 20 — Schema y tipos

**Hallazgo 20.1 — `default(new Date().toISOString())` (error de comportamiento).**
- **Texto actual:** `createdAt: text('created_at').default(new Date().toISOString()), // Fecha de creación por defecto`.
- **Evidencia:** En Drizzle, `.default()` se evalúa **al definir el esquema**, no por fila insertada: todas las filas compartirían el mismo timestamp (el del arranque). Para valores por fila, Drizzle provee `$defaultFn: () => new Date().toISOString()` o `default(sql`(datetime('now'))`)` — https://orm.drizzle.team/docs/sql-schema-declaration#default-value.
- **Veredicto:** 🔴 Error funcional. Corregir con `$defaultFn` o SQL default.

**Hallazgo 20.2 — `enum` en SQLite (imprecisión conceptual).**
- **Texto actual:** `"solo acepte un conjunto predefinido de valores… usamos text con la opción enum"`.
- **Evidencia:** SQLite **no tiene tipo enum**: `text('priority', { enum: [...] })` solo valida en TypeScript; la base de datos aceptará cualquier string. Drizzle lo documenta para SQLite como validación de tipos, no restricción real — https://orm.drizzle.team/docs/sql-schema-declaration#enum (SQLite section).
- **Veredicto:** 🟠 Aclarar que es tipado de TS, no constraint de BD (decisión de diseño: ¿validar en app o añadir CHECK?).

### Conf. 21 / Conf. 25 / Conf. 26 — Migraciones y Drizzle Studio

- **Conf. 21:** la lista de opciones de quiz incluye `drizzle-kit push` / `drizzle-kit apply` / `drizzle-kit generate` / `drizzle-kit studio`. `push`/`apply` no son el flujo de migraciones para Expo (`generate` + `useMigrations` sí; `studio` ya no aplica — ver 18.1). 🟠 Revisar distractores.
- **Conf. 25:** `"Drizzle Studio es … usando drizzle-kit"` — en Expo el acceso es vía `drizzle-studio-expo` en DevTools (ver 18.1). 🟠 Actualizar.
- **Conf. 26:** usa `blank-ts` (template legítimo y vigente) y el flujo `generate` + `useMigrations` — ✓ salvo el script `studio` (repetir 18.1).

---

## Módulo 4 — APIs externas, TanStack Query y Zustand

### Conf. 27 — Variables de entorno

- Prefijo `EXPO_PUBLIC_` + acceso vía `process.env.EXPO_PUBLIC_*` — mecanismo vigente en SDK 49+. ✓ Vigente.
- Nota: advertir que las variables `EXPO_PUBLIC_` quedan embebidas en el bundle (nada de secretos de backend allí). La conferencia enseña API keys públicas de TMDB/TheMealDB, uso razonable; conviene una llamada explícita al límite de seguridad.

### Conf. 29 — TanStack Query v5

**Hallazgo 29.1 — Nombres de la API v4 como contenido vigente (desactualizado).**
- **Texto actual:** lista de estados: `isLoading`, `isError`, `isSuccess`.
- **Evidencia:** En v5, la distinción oficial es `isPending` (antes `isLoading`) vs `isFetching`; `isLoading` fue renombrado a `isPending` en la migración — https://tanstack.com/query/latest/docs/framework/react/guides/migrating-to-v5. `isError`/`isSuccess` siguen existiendo.
- **Veredicto:** 🟠 Actualizar a `isPending` en el material teórico y el ejemplo (`const { data: recipes, isLoading, isError }`).

**Hallazgo 29.2 — Opciones eliminadas como distractores de quiz (desactualizado).**
- **Texto actual (quiz):** opciones `["staleTime", "cacheTime", "enabled", "onSuccess"]`, respuesta correcta `enabled` (índice 2).
- **Evidencia:** En v5, `cacheTime` fue renombrado a `gcTime` y `onSuccess` **fue removido** de las opciones de `useQuery` — https://tanstack.com/query/latest/docs/framework/react/guides/migrating-to-v5. Los distractores enseñan nombres de API que ya no existen.
- **Veredicto:** 🔴 Corregir distractores: `staleTime` ✓, `gcTime`, `enabled` ✓ (respuesta), `onSuccess` → reemplazar por `refetchInterval` o similar vigente.

### Conf. 30 / Conf. 32 — Consumo de APIs (TMDB, búsqueda)

**Hallazgo 30/32 — `SafeAreaView` desde `react-native` (desactualizado).**
- **Texto actual (conf-30):** `import { SafeAreaView, FlatList, Text, View } from 'react-native';` · (conf-32) idéntico.
- **Evidencia:** mismo criterio que 1.2 — el core `SafeAreaView` es iOS-only y RN/Expo recomiendan `react-native-safe-area-context` — https://reactnative.dev/docs/safeareaview · https://docs.expo.dev/versions/latest/sdk/safe-area-context/.
- **Veredicto:** 🔴 Cambiar la importación al paquete `react-native-safe-area-context` (y envolver con `SafeAreaProvider` en el layout).

> Resto del contenido de conf-30/31/32 (TMDB, Zustand 5, `EXPO_PUBLIC_TMDB_API_KEY`) verificado vigente. La API de TMDB con `api_key` en query string sigue siendo el mecanismo v3 vigente. ✓

### Conf. 34 — ImagePicker y persistencia de imágenes

**Hallazgo 34.1 — `MediaTypeOptions.Images` deprecado (desactualizado).**
- **Texto actual:** `mediaTypes: ImagePicker.MediaTypeOptions.Images, // Solo imágenes`.
- **Evidencia:** Docs oficiales de `expo-image-picker` (SDK 57) marcan el enum como **deprecado**: en la entrada `MediaTypeOptions`: *"Deprecated: To set media types available in the image picker use an array of MediaType instead."* El API vigente es `mediaTypes: ['images']` — https://docs.expo.dev/versions/latest/sdk/imagepicker/.
- **Veredicto:** 🔴 Corregir a `mediaTypes: ['images']` (y `['images', 'videos']` en el ejemplo del picker).

**Hallazgo 34.2 — API legacy de `expo-file-system` (desactualizado).**
- **Texto actual:** `FileSystem.documentDirectory`, `FileSystem.makeDirectoryAsync`, `FileSystem.copyAsync` para mover la foto a directorio permanente.
- **Evidencia:** SDK 54+ introduce la API moderna `File`/`Directory`/`Paths` (clases, `Directory`, `Paths.document`, `File.copy()`); el API legacy (`documentDirectory`, `copyAsync`, etc.) queda disponible en `expo-file-system/legacy` y **deprecado** — https://docs.expo.dev/versions/latest/sdk/filesystem/ y https://docs.expo.dev/versions/latest/sdk/filesystem-legacy/.
- **Veredicto:** 🔴 Migrar el ejemplo a la nueva API (`Paths.document`, `new Directory(...).create()`, `new File(uri).copy(destination)`), alineado con los ejemplos oficiales del SDK 57.

---

## Módulo 5 — Avanzado, Reanimated y EAS

### Conf. 40 / Conf. 41 / Conf. 43 — Apps completas (real estate, search)

- Mismos hallazgos de `SafeAreaView` desde `react-native` (conf-40 línea 61 flujo `import { ... SafeAreaView } from 'react-native'`; conf-41/43 usan `<SafeAreaView className="flex-1 bg-slate-900">` en JSX). 🔴 Cambiar a `react-native-safe-area-context`.
- `npx create-expo-app … --template blank-ts` (conf-41) — template vigente. ✓

### Conf. 42 — Persistencia de imágenes

- `FileSystem.documentDirectory + filename` + `FileSystem.copyAsync` — misma deprecación que 34.2. 🔴 Migrar a la nueva API de `expo-file-system`.

### Conf. 45 — Reanimated

**Hallazgo 45.1 — Plugin de Babel inexistente en Reanimated 4 (desactualizado).**
- **Texto actual (babel.config.js):** `plugins: [ 'react-native-reanimated/plugin' ]`.
- **Evidencia:** Desde **Reanimated 4** (requiere Nueva Arquitectura), el plugin de Babel se movió a **`react-native-worklets/plugin`** (paquete `react-native-worklets`) — https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/getting-started/. El path `react-native-reanimated/plugin` ya no existe en v4.
- **Veredicto:** 🔴 Corregir: instalar `react-native-worklets` y usar `'react-native-worklets/plugin'`. Además explicitar que Reanimated 4 exige New Architecture (no funciona en arquitectura legacy).

> Los conceptos `useSharedValue`, `useAnimatedStyle`, `withTiming`, `withSpring` de la misma conferencia siguen vigentes. ✓

### Conf. 46 — Timestamps y persistencia

**Hallazgo 46.1 — `default(new Date())` en columna timestamp (error de comportamiento).**
- **Texto actual:** `createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(new Date())`.
- **Evidencia:** igual que 20.1 — el valor del default se fija al definir el esquema (arranque), no por fila. Usar `$defaultFn: () => new Date()` (o `sql`(unixepoch())``) para timestamps por fila — https://orm.drizzle.team/docs/sql-schema-declaration#default-value.
- **Veredicto:** 🔴 Error funcional. Corregir.

**Hallazgo 46.2 — API legacy de `expo-file-system`.**
- `FileSystem.documentDirectory` + `FileSystem.copyAsync` — misma deprecación que 34.2/42. 🔴 Migrar.

### Conf. 47 / Conf. 48 — EAS Build y cierre

- No se detectaron hallazgos de desactualización en la revisión de esta conferencia (flujo `eas build`, `eas submit`, arquitectura del proyecto). ✓ Vigente haste nueva revisión.

---

## Tabla resumen por conferencia

| Conf | Hallazgo | Severidad | Acción |
|------|----------|-----------|--------|
| 1 | Airbnb como adopción vigente; `SafeAreaView` core | 🟠/🔴 | Corregir lista; recomendar `react-native-safe-area-context` |
| 10 | "Decirle al layout raíz" que renderice tabs | 🟠 | Explicar registro automático |
| 11 | "Debemos registrar esta nueva ruta" + `Stack.Screen` | 🔴 | Crear archivo basta; `Stack.Screen` solo para options |
| 12 | Registro manual + guardas manuales de auth | 🔴 | Migrar a `Stack.Protected` |
| 14 | Token de sesión en AsyncStorage | 🔴 | Usar `expo-secure-store` para secretos |
| 18 | `drizzle-kit studio` + `babel-plugin-inline-import`; versionado | 🟠 | `drizzle-studio-expo`; v1 estable |
| 20 | `default(new Date().toISOString())`; `enum` en SQLite | 🔴/🟠 | `$defaultFn` / `sql`; aclarar tipo TS vs constraint |
| 21 | Distractores `push`/`apply`/`studio` | 🟠 | Quiz alineado al flujo Expo |
| 25 | Drizzle Studio vía `drizzle-kit` | 🟠 | DevTools + `drizzle-studio-expo` |
| 26 | Script `studio` | 🟠 | Ídem 25 |
| 27 | Env vars | ✓ | (opcional) nota de seguridad |
| 29 | `isLoading`/`cacheTime`/`onSuccess` v4 | 🔴 | `isPending`, `gcTime`, quitar `onSuccess` de distractores |
| 30, 32 | `SafeAreaView` desde core | 🔴 | `react-native-safe-area-context` |
| 34 | `MediaTypeOptions.Images`; API legacy FileSystem | 🔴 | `mediaTypes: ['images']`; nueva API File/Paths |
| 40, 41, 43 | `SafeAreaView` desde core | 🔴 | Ídem 30/32 |
| 42 | API legacy FileSystem | 🔴 | Nueva API File/Paths |
| 45 | `react-native-reanimated/plugin` | 🔴 | `react-native-worklets/plugin`; New Arch |
| 46 | `default(new Date())`; API legacy FileSystem | 🔴 | `$defaultFn`; nueva API File/Paths |

---

## Fuentes consultadas (versión septiembre 2026)

- React Native: https://reactnative.dev/docs/getting-started · https://reactnative.dev/docs/safeareaview
- Expo SDK 57 changelog: https://expo.dev/changelog/sdk-57
- Expo Router: https://docs.expo.dev/router/introduction/ · https://docs.expo.dev/router/advanced/authentication/
- expo-file-system (nueva API): https://docs.expo.dev/versions/latest/sdk/filesystem/ · (legacy): https://docs.expo.dev/versions/latest/sdk/filesystem-legacy/
- expo-image-picker: https://docs.expo.dev/versions/latest/sdk/imagepicker/
- expo-secure-store: https://docs.expo.dev/versions/latest/sdk/securestore/
- expo-font / splash screen: https://docs.expo.dev/versions/latest/sdk/font/
- Drizzle ORM (schema defaults y SQLite): https://orm.drizzle.team/docs/sql-schema-declaration · Kit Studio: https://orm.drizzle.team/kit-studio/
- TanStack Query v5 (migración): https://tanstack.com/query/latest/docs/framework/react/guides/migrating-to-v5
- Reanimated 4 (instalación): https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/getting-started/
- NativeWind v4: https://www.nativewind.dev/

*Nota: las URLs oficiales se verificaron en la fecha de auditoría; los números de SDK/versión pueden cambiar con lanzamientos futuros. Se recomienda re-auditar con cada release mayor de Expo/React Native.*