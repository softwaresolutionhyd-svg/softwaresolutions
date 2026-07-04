# Signature

Laravel app for [signature.softwaresolutions.pk](https://signature.softwaresolutions.pk) — **Stair by Software Solutions**.

This repository is separate from the main [softwaresolutions](https://github.com/softwaresolutionhyd-svg/softwaresolutions) marketing site. Edit Signature-only code here.

## Setup

1. Copy your Laravel project files into this repo root (`composer.json`, `app/`, `public/`, etc.).
2. Keep `.env` on the server only — do not commit it.
3. Add GitHub Actions secrets (Settings → Secrets → Actions):

| Secret | Description |
|--------|-------------|
| `FTP_SERVER` | FTP host |
| `FTP_USERNAME` | FTP username |
| `FTP_PASSWORD` | FTP password |
| `FTP_SERVER_DIR` | Subdomain folder on hosting (document root parent; Laravel `public/` must be the web root) |

## Deploy

Push to `main` — GitHub Actions runs `composer install`, `npm run build`, then FTP deploy.

## Server (first time)

- Point subdomain document root to Laravel `public/`.
- Create `.env` on the server with `APP_KEY`, database, etc.
- `php artisan migrate --force` if needed.
- Ensure `storage/` and `bootstrap/cache/` are writable.
