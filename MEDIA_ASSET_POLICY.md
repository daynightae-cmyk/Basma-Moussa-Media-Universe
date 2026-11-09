# Basma Media Universe — Source provenance and image policy

## Source
- NEW repository from Base44 «بصمة», app ID 6af1122f059da84360b9db9c.
- Original Base44 code SHA: 2a7aff17c0aa201765a0d2620a52df7314a60585, exported 2026-11-09.
- Original GitHub daynightae-cmyk/Basma-Moussa remains untouched.
- The first commit preserves the source before any visual updates.

## Interim visual policy
- Unapproved personal portraits and hero photography are not shown.
- New temporary face-free SVG art: /placeholders/hero-art.svg, /placeholders/portrait-art.svg, /placeholders/legal-art.svg.
- Brand logo and other editorial scenery were mirrored to /public/brand and /public/media.
- Replace placeholder mapping in src/lib/experience/assets.js only after approval of photos.
- media-download-manifest.json provides SHA256 hashes of mirrored media.
- The artwork is conceptual, not a real personal portrait, an actual filming location, or a live broadcast.

## Engineering / release
- Base44 TanStack Start / React / Tailwind structure preserved.
- No change to original GitHub repository, old Base44 app, or their data.
- The local Base44 CLI export downloaded source and built it; its automatic deploy attempt was rejected because no git hash was supplied. NO live publication is established.
- The new GitHub repository is not automatically connected to Base44 deployment.
- .env.local, base44/.app.jsonc, node_modules, and build outputs must remain ignored.
- Run npm ci, npm test, npm run lint, npm run build and inspect CI before considering production ready.
- A virtual stage preview is NOT ON AIR. Broadcasting and physical set controls require independently implemented and verified transport/backend.