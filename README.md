# BaseEvent — NFT Event Tickets on Base

Create, manage, and verify on‑chain event tickets as non‑transferable NFTs (SBT‑style) on Base.

- Live: https://lucasvanderlein.github.io/baseticket/
- Repo: https://github.com/lucasvanderlein/baseticket
- Contract (Base Sepolia): `0x82E87E8D356A4d222A2E603BA6bcfD83f0bd6Afb`  
  - Contract: https://sepolia.basescan.org/address/0x82E87E8D356A4d222A2E603BA6bcfD83f0bd6Afb  
  - Txns: https://sepolia.basescan.org/address/0x82E87E8D356A4d222A2E603BA6bcfD83f0bd6Afb#transactions  
  - Events: https://sepolia.basescan.org/address/0x82E87E8D356A4d222A2E603BA6bcfD83f0bd6Afb#events

## Why BaseEvent
- Verifiable attendance with non‑transferable NFT tickets.
- Transparent supply/limits on‑chain.
- Zero‑infra: open‑source UI, GitHub Pages hosting, wallet‑native UX.

## Features
- Create events (name, description, location, date/time, ticket cap).
- RSVP & mint SBT ticket on Base.
- “My Tickets” gallery; event details; organizer tools.
- Clean UI (React + Tailwind + shadcn/ui).
- Production‑ready SPA deploy on GitHub Pages with deep‑link support.

## Stack
- React, TypeScript, Vite, Tailwind, shadcn/ui, React Router
- Wagmi, Viem, Base Sepolia
- Hosting: GitHub Pages

## Quick start

```bash
# Node 18+ recommended
npm i
npm run dev      # http://localhost:8080
npm run build
npm run preview  # http://localhost:4173/baseticket/
```

## Configuration
- Vite base path is set for project pages: `/baseticket/` (see `vite.config.ts`).
- Contract address is set in `src/config/contracts.ts` as `BASE_EVENT_CONTRACT_ADDRESS`.
- Public assets (e.g. `public/ticket-template.png`) are referenced with the repo base in production.

## GitHub Pages (SPA) deep‑links
To support refresh and direct links like `/baseticket/profile`:

1) `public/404.html`
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>BaseEvent</title>
    <script>
      (function () {
        var l = window.location;
        var newUrl = l.protocol + '//' + l.host + '/baseticket/?p=' +
          encodeURIComponent(l.pathname + l.search + l.hash);
        l.replace(newUrl);
      })();
    </script>
  </head>
  <body></body>
  </html>
```

2) `index.html` (in `<head>`, before the app bootstraps)
```html
<script>
  (function () {
    try {
      var params = new URLSearchParams(window.location.search);
      var p = params.get('p');
      if (p) window.history.replaceState(null, '', decodeURIComponent(p));
    } catch {}
  })();
</script>
```

## Wallet injection guard
Prevents “Cannot redefine property: ethereum” when multiple extensions inject:

```html
<!-- put at the very start of <head> -->
<script>
  (function () {
    if (typeof window !== 'undefined') {
      const original = Object.defineProperty;
      Object.defineProperty = function (obj, prop, desc) {
        if (prop === 'ethereum' && obj === window && window.ethereum) {
          console.warn('Ethereum property already exists, skipping redefinition');
          return obj;
        }
        return original.call(this, obj, prop, desc);
      };
    }
  })();
</script>
```

## Deploy
- Ensure `vite.config.ts` uses `base: '/baseticket/'` in production.
- Push to `main`; enable GitHub Pages (Settings → Pages).  
- Verify deep‑links: `https://<user>.github.io/baseticket/profile` should load without 404.

## Troubleshooting
- 404 on refresh: ensure `public/404.html` + the URL restore script in `index.html`.
- Assets not showing on Pages: confirm paths include `/baseticket/`.
- Ethereum redefine error: include the guard script at the top of `<head>`.

## Roadmap
- QR check‑in & on‑site verification.
- Organizer dashboard (exports, stats, cancellations).
- Allowlists, anti‑bot guard, event cover images & OG previews.
- Paid tickets (USDC/Smart Wallet), organizer fees, analytics.
- Mainnet deploy, Basenames integration, audit.

## License
MIT
