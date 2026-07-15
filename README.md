# Portfolio — Paterne SEKA

Portfolio professionnel de Paterne SEKA (Full-Stack Engineer & Product Builder) : site public + administration complète, construits avec Next.js (App Router) et Prisma/PostgreSQL.

## Stack

- **Frontend** : Next.js, React, TypeScript/JavaScript, Tailwind CSS, Framer Motion
- **Backend** : Route Handlers & Server Actions Next.js, Prisma
- **Base de données** : PostgreSQL
- **Authentification admin** : session JWT (cookie httpOnly signé)

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

## Déploiement

1. Provisionner une base PostgreSQL et définir `DATABASE_URL` en production.
2. Définir les variables d'environnement (`SESSION_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `EMAIL_USER`/`EMAIL_PASS` si SMTP, `NEXT_PUBLIC_SITE_URL`).
3. `npm install` (regénère automatiquement le client Prisma via `postinstall`), puis `npm run db:migrate` et `npm run db:seed` (une seule fois, à l'initialisation).
4. `npm run build` puis `npm run start` (ou déploiement sur une plateforme compatible Next.js).

Les fichiers uploadés depuis l'administration (photo de profil, CV, logo, médias, galeries projets) sont stockés localement dans `public/uploads`. En production, prévoir un montage persistant ou une bascule vers un stockage objet (Cloudinary ou équivalent).
