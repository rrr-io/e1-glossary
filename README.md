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
- `definition` explains the term for new fans. A term with no official E1 meaning leaves `e1` out.
- `list` (optional) adds a short list under the definition: an item with `href` is a link, to X for a handle or to `#team-…` for a team on the E1 Grid.
- `topic` groups the terms in the file; it is not shown on the page.
- `id` is the link to the card: `https://e1-glossary.rrriooo.com/#pit-stop` opens the page on Pit Stop.

## Editing the Racing Teams

The crews of the E1 Grid live in `src/teams.js`, one entry per team.

- Handles are X usernames without the `@`; each one opens the profile on X.
- Every role points to its card in the glossary (`term`); the role cards are in `src/terms.js`, topic `roles`.
- A team with an empty `crew` shows "Crew coming soon".

## How the page works

- Search and letter filters add up; letters with no term are turned off. The search also finds Racing Teams by name, livery, hashtag or crew handle, and shows their cards above the terms.
- "Check the Racing Teams" jumps to the E1 Grid.
- The floppy disk at the bottom right of every term card and Racing Team card turns it into a 1080×1350 image (`src/cardImage.js`, drawn on a canvas with the page fonts). On phones the share sheet opens, so the image can go straight to Photos or a post; on computers it downloads as `e1-glossary-<term or team id>.png`.
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
