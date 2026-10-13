# Portfolio — Paterne SEKA

Portfolio professionnel de Paterne SEKA (Full-Stack Engineer — applications métier et solutions digitales) : site public bilingue FR/EN + administration complète, construits avec Next.js (App Router) et Prisma/PostgreSQL.

## Stack

- **Frontend** : Next.js, React, TypeScript/JavaScript, Tailwind CSS (polices Inter et Sora auto-hébergées)
- **Backend** : Route Handlers & Server Actions Next.js, Prisma
- **Base de données** : PostgreSQL
- **Authentification admin** : session JWT (cookie httpOnly signé)

## Structure du site public

| Route (FR) | Route (EN) | Contenu |
| --- | --- | --- |
| `/` | `/en` | Hero, réalisations principales, ce que je construis, méthode, mise en production, collaboration |
| `/work` | `/en/work` | Projets principaux + autres projets |
| `/work/[slug]` | `/en/work/[slug]` | Étude de cas (contexte, problème, rôle, architecture…) |
| `/expertise` | `/en/expertise` | Domaines d'expertise puis technologies |
| `/about` | `/en/about` | Parcours, collaboration, expérience (`#experience`) |
| `/contact` | `/en/contact` | Formulaire court (`?project=<slug>` pour citer un projet) |
| `/legal`, `/privacy` | `/en/legal`, `/en/privacy` | Mentions légales, confidentialité |

- Le français est servi sans préfixe (réécriture interne vers `app/[locale]` dans `proxy.js`), l'anglais sous `/en`.
- Textes d'interface : `lib/i18n/dictionaries/{fr,en}.js`. Contenu en base : colonnes en français + colonne JSON `en` (traduction, éditable dans l'admin ; un champ vide reprend le français).
- La typographie française (espaces insécables, apostrophes) est appliquée au rendu (`lib/i18n/typography.js`).
- Les anciennes URL (`/projets`, `/expertises`, `/parcours`, `/mentions-legales`, `/confidentialite`) redirigent en 308 (`next.config.js`).
- Carte de partage Open Graph : `/og/fr` et `/og/en` (1200×630, générées au build).
- Diagrammes d'architecture des études de cas : un bloc par ligne `Libellé | détail`, `- ` en début de ligne pour des branches parallèles. Ne jamais y mettre d'IP, d'URL privée ni de secret.

## Installation

Prérequis : Node.js 20+, Docker (pour la base de données locale).

```bash
npm install
cp .env.example .env
```

Renseigner dans `.env` :
- `DATABASE_URL` — laisser la valeur par défaut si vous utilisez le `docker-compose.yml` fourni
- `ADMIN_EMAIL` / `ADMIN_PASSWORD` — identifiants du compte administrateur créé par le seed
- `SESSION_SECRET` — générer avec `openssl rand -hex 32`
- `EMAIL_USER` / `EMAIL_PASS` — optionnel, pour l'envoi d'email depuis le formulaire de contact (sinon les messages sont uniquement enregistrés en base)
- `NEXT_PUBLIC_SITE_URL` — URL publique du site en production (sitemap, robots.txt, canonical)

Démarrer la base de données locale :

```bash
docker compose up -d
```

Appliquer le schéma et peupler la base :

```bash
npm run db:migrate
npm run db:seed
```

## Développement

```bash
npm run dev
```

Site public : http://localhost:3000 — Administration : http://localhost:3000/admin (identifiants définis via `ADMIN_EMAIL`/`ADMIN_PASSWORD`).

## Vérifications

```bash
npm run lint
npm run typecheck
npm run build
```

## Déploiement (Vercel)

Le système de fichiers de Vercel est en lecture seule à l'exécution : `public/uploads` ne
fonctionne qu'en développement local. En production, les uploads (photo de profil, CV, logo,
médias, galeries projets) passent par un petit service de stockage séparé — voir
[`storage-server/`](./storage-server) — à déployer sur un VPS.

1. **Base de données** : provisionner un PostgreSQL accessible depuis Vercel et définir
   `DATABASE_URL`. Soit un fournisseur managé (Neon/Supabase, pooling de connexions inclus), soit
   auto-hébergé sur le même VPS que `storage-server` via le service `db` de son
   `docker-compose.yml` — voir [`storage-server/README.md`](./storage-server/README.md#base-de-données-postgresql-sur-le-même-vps-alternative-à-neonsupabase)
   pour les compromis (pas de TLS ni de sauvegardes automatiques par défaut).
2. **Stockage fichiers** : déployer `storage-server/` sur le VPS (voir son README), puis définir
   côté Vercel `STORAGE_API_URL` et `STORAGE_API_TOKEN` (même valeur que `STORAGE_TOKEN` sur le
   VPS). Sans ces deux variables, l'admin plantera dès qu'on tente un upload.
3. Définir les autres variables d'environnement sur Vercel : `SESSION_SECRET`, `ADMIN_EMAIL`,
   `ADMIN_PASSWORD`, `EMAIL_USER`/`EMAIL_PASS` si SMTP, `NEXT_PUBLIC_SITE_URL` (domaine réel du
   site, pas `localhost`).
4. Appliquer les migrations et le seed **contre la base de production**, depuis votre machine :
   ```bash
   DATABASE_URL="<url de prod>" npx prisma migrate deploy
   DATABASE_URL="<url de prod>" ADMIN_EMAIL=... ADMIN_PASSWORD=... npm run db:seed
   ```
   (`npm install` régénère automatiquement le client Prisma via le script `postinstall`, y compris
   pendant le build Vercel.)

   ⚠️ Le seed **remplace** projets, expertises, compétences et expériences par le contenu de
   `lib/data/*` (le profil et les réglages SEO sont mis à jour). Exportez d'abord vos données
   depuis `/admin/parametres` si vous avez modifié du contenu dans l'admin.
5. Déployer sur Vercel (build command par défaut : `next build`).

### Checklist rapide avant de considérer le déploiement fonctionnel

- [ ] `DATABASE_URL` de prod configuré sur Vercel, migrations appliquées, seed exécuté
- [ ] `storage-server` déployé et joignable en HTTPS (`curl https://.../health`)
- [ ] `STORAGE_API_URL` / `STORAGE_API_TOKEN` définis sur Vercel
- [ ] `SESSION_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `NEXT_PUBLIC_SITE_URL` définis sur Vercel
- [ ] Test d'upload réel depuis `/admin` une fois déployé
