# Storage server

Petit service HTTP qui reçoit, stocke et sert les fichiers uploadés depuis l'administration du
portfolio (photo de profil, CV, logo, images de projets, médiathèque). À déployer sur votre serveur
OVH (VPS ou dédié) — l'application Next.js elle-même reste sur Vercel, dont le système de fichiers
est en lecture seule et ne peut donc pas stocker ces fichiers.

Ce même VPS peut aussi héberger la base PostgreSQL de production (service `db` du
`docker-compose.yml`) — voir la section dédiée plus bas.

## Déploiement sur le serveur OVH

Prérequis : Docker + Docker Compose installés sur le serveur, un sous-domaine pointant vers son IP
(ex. `storage.votredomaine.com`), et un reverse proxy HTTPS (Nginx + Certbot, ou Caddy qui gère le
certificat automatiquement).

> **Spécifique OVH** : si le serveur a le « Network Firewall » activé dans le manager OVH, pensez à
> y autoriser les ports 80 et 443 (et 22 pour SSH) — ce pare-feu bloque tout par défaut
> indépendamment de celui du système (`ufw`/`iptables`). Sur un VPS OVH classique, il est
> généralement désactivé par défaut, mais à vérifier dans l'onglet « Network » de l'instance. Si
> vous activez aussi la base de données (`db`), pensez à autoriser également son port (5432 par
> défaut, ou la valeur de `POSTGRES_PORT`).

```bash
# Sur le serveur OVH
git clone <ce dépôt> portfolio
cd portfolio/storage-server
cp .env.example .env
# Renseigner STORAGE_TOKEN (openssl rand -hex 32) et PUBLIC_BASE_URL dans .env
docker compose up -d --build
```

Exemple de configuration Caddy (`Caddyfile`), la plus simple pour obtenir le HTTPS automatiquement :

```
storage.votredomaine.com {
    reverse_proxy localhost:8787
}
```

Avec Nginx, un reverse proxy classique vers `http://127.0.0.1:8787` + Certbot pour le certificat
suffit également.

## Variables d'environnement côté application Next.js (Vercel)

Ajouter dans les paramètres du projet Vercel :

```
STORAGE_API_URL=https://storage.votredomaine.com
STORAGE_API_TOKEN=<la même valeur que STORAGE_TOKEN>
```

Sans ces variables, l'application retombe automatiquement sur un stockage local dans
`public/uploads` — utile en développement, mais non fonctionnel une fois déployé sur Vercel.

## Vérification

```bash
curl https://storage.votredomaine.com/health
# {"status":"ok"}
```

## Base de données PostgreSQL sur le même VPS (alternative à Neon/Supabase)

Le `docker-compose.yml` inclut un service `db` (Postgres 16) prêt à l'emploi si vous préférez
héberger la base sur votre propre VPS plutôt que chez un fournisseur managé.

```bash
# Dans storage-server/.env, en plus de STORAGE_TOKEN et PUBLIC_BASE_URL :
# POSTGRES_PASSWORD (obligatoire, générer avec openssl rand -hex 24)
# POSTGRES_USER, POSTGRES_DB, POSTGRES_PORT (optionnels, valeurs par défaut : portfolio / portfolio / 5432)
docker compose up -d --build
```

`DATABASE_URL` à définir côté Vercel :

```
postgresql://<POSTGRES_USER>:<POSTGRES_PASSWORD>@<ip-ou-domaine-du-vps>:<POSTGRES_PORT>/<POSTGRES_DB>?sslmode=disable
```

**À savoir avant de partir sur cette option :**

- **Accessibilité** : Vercel n'a pas d'IP de sortie fixe (sauf plan Enterprise/Secure Compute), donc
  impossible de restreindre le port Postgres par IP côté pare-feu OVH — le port doit rester ouvert
  à toutes les IP, protégé uniquement par un mot de passe fort (`POSTGRES_PASSWORD` généré
  aléatoirement, jamais un mot de passe simple).
- **Chiffrement** : cette configuration par défaut ne chiffre pas la connexion (`sslmode=disable`).
  Acceptable pour un portfolio à faible trafic, mais si vous voulez du TLS, il faudra monter des
  certificats dans le conteneur Postgres (hors du scope de ce README minimal) — ou repasser sur un
  fournisseur managé (Neon/Supabase) qui le fournit nativement.
- **Connexions simultanées** : les fonctions serverless Vercel peuvent ouvrir plusieurs connexions
  concurrentes ; Postgres accepte par défaut jusqu'à 100 connexions (`max_connections`), largement
  suffisant pour le trafic d'un portfolio. Si le trafic admin augmente significativement, ajouter un
  pooler (PgBouncer) devant `db` est la prochaine étape recommandée — non nécessaire pour démarrer.
- **Sauvegardes** : contrairement à un fournisseur managé, les sauvegardes ne sont pas automatiques.
  Le volume Docker `portfolio_db_data` persiste les données entre redémarrages, mais pensez à un
  `pg_dump` régulier (cron) si les données comptent.
