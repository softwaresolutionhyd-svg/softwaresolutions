# Signature

Laravel app for [signature.softwaresolutions.pk](https://signature.softwaresolutions.pk) — **Stair by Software Solutions**.

Separate from the [softwaresolutions](https://github.com/softwaresolutionhyd-svg/softwaresolutions) marketing site.

## One-time: import scaffold into this repo

Scaffold is on branch `signature-repo-init` in `softwaresolutions`. Run locally:

```bash
git clone https://github.com/softwaresolutionhyd-svg/Signature.git
cd Signature
git pull https://github.com/softwaresolutionhyd-svg/softwaresolutions.git signature-repo-init
git push origin main
```

## Add Laravel project files

Copy your full Laravel app into this repo root (`composer.json`, `app/`, `public/`, etc.). Do not commit `.env`.

## GitHub Actions secrets

Settings → Secrets → Actions:

| Secret | Description |
|--------|-------------|
| `FTP_SERVER` | FTP host |
| `FTP_USERNAME` | FTP username |
| `FTP_PASSWORD` | FTP password |
| `FTP_SERVER_DIR` | Subdomain folder on hosting |

## Deploy

Push to `main` → `composer install`, `npm run build`, FTP deploy.

## Cursor Cloud Agent

To let the agent edit this repo, connect **Signature** to Cursor (same as `softwaresolutions`).

## Server (first time)

- Document root → Laravel `public/`
- `.env` on server only
- `storage/` and `bootstrap/cache/` writable
