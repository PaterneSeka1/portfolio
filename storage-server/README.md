# Storage server

Petit service HTTP qui reçoit, stocke et sert les fichiers uploadés depuis l'administration du
portfolio (photo de profil, CV, logo, images de projets, médiathèque). À déployer sur votre serveur
OVH (VPS ou dédié) — l'application Next.js elle-même reste sur Vercel, dont le système de fichiers
est en lecture seule et ne peut donc pas stocker ces fichiers.

## Déploiement sur le serveur OVH

Prérequis : Docker + Docker Compose installés sur le serveur, un sous-domaine pointant vers son IP
(ex. `storage.votredomaine.com`), et un reverse proxy HTTPS (Nginx + Certbot, ou Caddy qui gère le
certificat automatiquement).

> **Spécifique OVH** : si le serveur a le « Network Firewall » activé dans le manager OVH, pensez à
> y autoriser les ports 80 et 443 (et 22 pour SSH) — ce pare-feu bloque tout par défaut
> indépendamment de celui du système (`ufw`/`iptables`). Sur un VPS OVH classique, il est
> généralement désactivé par défaut, mais à vérifier dans l'onglet « Network » de l'instance.

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
