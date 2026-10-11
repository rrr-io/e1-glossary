# E1 Glossary

Every term of the E1 race (Enhypen MAMA Grand Prix), from the Grid to the Podium: what each term means for MAMA voting.

A static React page built with Vite. No backend, no tracking.

## Run locally

```bash
npm install
npm run dev     # http://localhost:5173
npm test        # filters and page behaviour
npm run build   # static files in dist/
```

## Editing the terms

All the content lives in `src/terms.js`.

- `e1` is EMGP's official meaning, word for word. Change it only when the official list changes.
- `definition` and `example` explain the term for new fans.
- `topic` picks the section; topics are at the top of the file.
- `id` is the link to the card: `https://e1-glossary.rrriooo.com/#pit-stop` opens the page on Pit Stop.

## How the page works

- Search, topic and letter filters add up. Letters with no term in the chosen topic are turned off.
- On a phone the cards become a carousel you swipe sideways. The first card nudges twice when the page opens, next to a "Swipe" hint and a counter. With reduced motion turned on, nothing moves.

## Deploy

Every push to `main` runs the tests, builds the page and copies `dist/` to `/srv/e1-glossary` on the server with rsync. A failing test stops the deploy.

Repository secrets (the same ones used by my-race-engineer):

| Secret | Value |
| --- | --- |
| `SSH_HOST` | server address |
| `SSH_USER` | `ubuntu` |
| `SSH_KEY` | private key allowed on the server |

### First time on the server

1. DNS: an `A` record for `e1-glossary.rrriooo.com` pointing to the server.
2. The folder, owned by the deploy user:

   ```bash
   sudo mkdir -p /srv/e1-glossary && sudo chown ubuntu:ubuntu /srv/e1-glossary
   ```

3. A block in `/srv/caddy/Caddyfile`:

   ```
   e1-glossary.rrriooo.com {
       root * /srv/e1-glossary
       encode zstd gzip
       try_files {path} /index.html
       file_server

       @assets path /assets/*
       header @assets Cache-Control "public, max-age=31536000, immutable"
   }
   ```

4. Reload Caddy, which also gets the HTTPS certificate:

   ```bash
   docker exec caddy caddy reload --config /etc/caddy/Caddyfile
   ```

   Use the Caddyfile path the `caddy` container mounts, the same as for the other sites.
