# Basma Media Universe — verified selective import

**Canonical repository:** `daynightae-cmyk/Basma-Moussa-Media-Universe` (TanStack Start / React, `main`).

**Donor repository (read-only):** `daynightae-cmyk/Basma-Moussa`, branch `initialize-media-universe`, source SHA `83571f90f246fefdb64c19584c855cacd79f8674`.

**Base44 app:** `6af1390216540f96cd94a481` (`Basma-Moussa`), owner `knouxstore@gmail.com`. Login and app metadata/branch listing verified. The branch Sandbox source API is blocked with HTTP **402** (Builder subscription required). Accordingly, code was obtained from its GitHub donor branch; we have **not verified whether the Base44 preview contains additional unpushed edits**.

**Canonical prior SHA:** `3f21bbd3c486f49e6e083e128979c2c198fdaf0d`. Existing canonical content, approved local brand, imagery, entities, auth, navigation, original studio gallery, and backend structure were retained.

## Actual code ported
- Studio: six 3D-like CSS stage scene presets, six virtual cameras, bounded furniture layout/movement, light presets, stage props, control console, director room.
- Broadcast state machine: truthful preview/fail/connecting/live state transitions; ON AIR requires an acknowledged transport. Current app is preview-only and displays STANDBY.
- Story Atelier: theme/atmosphere/mood, storyboard sequence, local draft, reordered cards, preview; new route `/atelier`.
- Soundroom: mic-consent-aware Web Audio visualization (Sonic Sculpture) alongside the original rooms.
- Media: interactive spatial CSS-3D portal gallery alongside the existing media content.
- Legal Lens: interactive perspective prism with existing editorial outlines and links to actual public source sites, alongside original source explorer.
- Splash: SSR/client initial-render mismatch corrected. **Not** yet the requested full new mask/scales/logo choreography.
- Responsive repairs: soundroom no longer expands the 390px mobile viewport; desktop studio stage no longer overlaps the control rail.
- Original donor authored TypeScript/TSX adapted into plain JS/JSX with esbuild; no Next.js runtime imported into the canonical app.

## Local verification
- Node unit tests: **8/8 passed** (asset policy, six studio scene/camera presets, furniture bounds, honest broadcast, story card order).
- ESLint and Vite production build are mandatory before this import can be accepted.
- Chromium headless smoke: **5 routes × 2 viewports** (1440×900 and 390×844), all HTTP 200, no page exceptions after SSR splash repair, and no document-wide horizontal overflow after the soundroom repair.
- Interactive smoke: six-camera selector changes its pressed state, Media Galaxy selected story changes, Justice Prism facet changes, and Soundroom starts with the microphone inactive.
- Runtime evidence and screenshots: `K:\KNOUX_TOOLS\Basma-New-Forensics\runtime-qa`. The desktop original studio screenshot and the corrected screenshot were inspected.
- Backend environment limitation: Vite reports no `VITE_BASE44_APP_BASE_URL`; analytics returns HTTP **406** in the local preview. The real Base44 backend, auth, user roles, and actual streaming connection have **not** passed runtime verification.
- The original app remains unpublished from this repository; no deploy was performed.

## Known incomplete features — for the next production agent
1. Rebuild splash as one golden thread drawing a **theatrical** mask, scales of justice, then the approved original logo with a working Enter button, reliable skip/replay and reduced-motion behavior. The SSR bug repair does not fulfill this vision.
2. Upgrade CSS-3D furnishing to more convincing physically based 3D furniture (or tightly engineered 2.5D), verify mobile camera framing and manually compare screenshots. Today's furniture and scene are present, but not photorealistic.
3. Real ON AIR streaming needs secure backend, identity/roles, consent, provider, transport ack, reconnect, device permissions, and separate production tests; do not present the current preview as live broadcasting.
4. Soundroom microphone must be tested on a real permitted device; no unconsented recording.
5. Verify editorial legal sources, jurisdiction, timestamps and links; source cards are educational outlines, not legal advice.
6. Test Story Atelier local draft recovery, full keyboard reordering, persistent storage choices, and accessibility.
7. Test English LTR and extra devices; current smoke covered Arabic RTL, desktop 1440 and mobile 390 only.
8. Validate deployed production URL, connected Base44 services, CI, auth flows and screenshots before a release claim.
9. Compare the Base44 branch preview against the GitHub donor when Builder-level source access is available; preserve any additional unpublished unique changes.
10. Final visual art direction: reduce remaining generic panels, improve typography, stage proportions, lighting, cinematic continuity, and performance.

## Protection rules
Do not modify, reset, clean, delete or rewrite the older repository or `initialize-media-universe` branch. The donor branch remains a unique-work source and must be kept until visual and behavioral parity is verified.
