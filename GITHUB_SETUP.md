# GitHub repo banana (ek dafa)

Agent is token se repo create nahi kar sakta — ye steps aap khud karein:

1. Open: https://github.com/new
2. **Owner:** `softwaresolutionhyd-svg`
3. **Repository name:** `signature`
4. **Private** (recommended)
5. README / .gitignore / license **mat** add karein (empty repo)
6. **Create repository**

Phir terminal mein (ya agent ko bolein "push kar do"):

```bash
cd /home/ubuntu/signature
git push -u origin main
```

Agar aap apne PC se push karna chahein, is folder ki files copy karke:

```bash
git clone https://github.com/softwaresolutionhyd-svg/signature.git
# scaffold files paste karein, phir:
git add .
git commit -m "Initial Signature repo"
git push
```

## Secrets (is naye repo mein)

Settings → Secrets → Actions:

| Secret | Value |
|--------|--------|
| `FTP_SERVER` | Hosting FTP host |
| `FTP_USERNAME` | FTP user |
| `FTP_PASSWORD` | FTP password |
| `FTP_SERVER_DIR` | Subdomain folder path |

## Laravel files

Apni Signature Laravel project ki **saari files** is repo ke **root** mein rakhein (`composer.json`, `app/`, `public/`, …).
