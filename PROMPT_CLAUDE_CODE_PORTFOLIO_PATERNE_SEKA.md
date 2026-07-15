# PROMPT CLAUDE CODE — PORTFOLIO PROFESSIONNEL DE PATERNE SEKA

## Mission

Travaille directement dans le dépôt actuellement ouvert dans VS Code. Tu es à la fois Lead Product Designer, Senior Full-Stack Engineer et expert UX/UI. Ta mission est de reconstruire le portfolio de **Paterne SEKA** afin qu’il soit crédible auprès de grandes entreprises comme Orange, Moov Africa, des banques, institutions et entreprises internationales.

Le résultat attendu n’est pas une simple maquette : implémente réellement le site et son administration.

## Économie de contexte et de tokens

1. Inspecte d’abord uniquement `package.json`, l’arborescence, les configurations, les pages principales, les composants, les styles, le schéma Prisma et `.env.example`.
2. Ignore `node_modules`, `.next`, `dist`, `.git`, les ZIP et les fichiers binaires inutiles.
3. Ne charge jamais tout le projet dans une seule requête.
4. Travaille par étapes courtes et exécute les vérifications après chaque étape.
5. Ne produis pas de longues explications. Indique seulement les fichiers modifiés, les commandes exécutées, le résultat et l’étape suivante.
6. Réutilise ce qui est propre et fonctionnel. Ne réécris pas inutilement le projet.

---

## Positionnement

Nom : **Paterne SEKA**

Titre principal :

> Full-Stack Engineer & Product Builder

Promesse :

> Je conçois et développe des applications web, des plateformes métier et des produits numériques robustes, sécurisés et centrés utilisateur. De l’idée à la mise en production, j’accompagne les organisations dans leur transformation digitale.

Le portfolio doit montrer que Paterne sait comprendre un besoin métier, concevoir une architecture, développer le frontend et le backend, gérer les données, déployer et faire évoluer un produit.

---

## Identité visuelle obligatoire

Utilise uniquement :

- Bleu marine : `#0D1B2A`
- Bleu institutionnel : `#133A7C`
- Bleu accent : `#2563EB`
- Gris clair : `#F1F3F6`
- Blanc : `#FFFFFF`

Typographies :

- Titres : `Sora`
- Interface et textes : `Inter`

Valeurs :

- Professionnel
- Fiable
- Structuré
- Innovant

Interdictions :

- aucun changement de thème ;
- aucun violet, rose ou dégradé fantaisiste ;
- aucun effet gaming, crypto ou futuriste excessif ;
- aucune animation agressive ;
- aucun pourcentage fictif de compétence.

### Photos

Ne modifie jamais les photos de Paterne.

Il est interdit de :

- retoucher le visage ou la peau ;
- remplacer les vêtements ;
- régénérer la personne ;
- modifier les couleurs ou l’éclairage ;
- créer un faux portrait.

Les images originales peuvent seulement être redimensionnées proportionnellement, positionnées et recadrées visuellement avec CSS `object-fit`.

### Logo

Utilise le monogramme géométrique **PS** déjà fourni dans les ressources du projet. Prévois le logo horizontal, l’icône seule, la version blanche, le favicon et l’icône PWA. Ne crée pas un autre logo si les fichiers officiels sont présents.

---

## Hero

Le hero doit être visible immédiatement et occuper environ 90 % de la hauteur de l’écran.

Desktop :

- contenu à gauche ;
- grande photo originale à droite ;
- photo intégrée au hero, pas enfermée dans une petite carte ;
- fond bleu marine ;
- formes géométriques discrètes inspirées du logo ;
- navigation fixe, sobre et professionnelle.

Contenu :

- « Bonjour, je suis »
- « Paterne SEKA »
- « Full-Stack Engineer & Product Builder »
- la promesse de marque ;
- boutons `Découvrir mes réalisations`, `Me contacter`, `Télécharger mon CV` ;
- Abidjan, Côte d’Ivoire ;
- GitHub, LinkedIn et email ;
- disponibilité configurable depuis l’administration.

Les statistiques doivent être configurables. N’invente pas de données présentées comme réelles.

---

## Site public

Navigation :

- Accueil
- À propos
- Expertises
- Réalisations
- Parcours
- Contact
- Mon CV

Le lien `/admin` doit rester discret dans le footer.

### À propos

Présente Paterne comme un développeur orienté produit, capable d’aller du besoin métier au déploiement. Utilise ce texte de base :

> Passionné par la technologie et la résolution de problèmes complexes, je transforme les besoins métiers en solutions numériques performantes. Mon approche combine rigueur technique, expérience utilisateur et impact réel.

### Expertises

Créer des cartes pour :

- Frontend
- Backend
- Bases de données
- Architecture et API
- DevOps et déploiement
- Temps réel
- Solutions SaaS
- Conseil et accompagnement

Technologies : Next.js, React, TypeScript, Tailwind CSS, NestJS, Node.js, Prisma, PostgreSQL, MongoDB, Redis, Socket.IO, Docker, Nginx, PM2, Ubuntu, GitHub Actions et WordPress.

### Réalisations

Filtres :

- Tous
- Applications métier
- SaaS
- Sites web
- Publics
- Privés

Chaque carte contient un visuel, un type, un résumé, les technologies, la confidentialité, un CTA et un lien vers une étude de cas.

Projets initiaux :

#### RHVEDEM

Application métier privée.

> Plateforme interne de gestion des ressources humaines : employés, congés, notes de frais, documents, bulletins de salaire, signatures, rôles et notifications.

CTA : `Demander une démonstration`.

#### Ecodal Côte d’Ivoire

Site public conçu par Paterne.

URL réelle : `https://www.ecodalci.com/`

CTA : `Visiter la plateforme`.

#### Plateforme de ticketing

Application métier privée.

> Gestion des incidents et demandes internes avec workflow, attribution, priorités, SLA, historique, notifications et tableaux de bord.

CTA : `Demander une démonstration`.

#### Intranet d’entreprise

Application métier privée.

> Portail interne avec présences, géolocalisation, horaires, rapports, communication et gestion documentaire.

CTA : `Demander une démonstration`.

#### QR Restaurant

Produit SaaS privé.

> Commande par QR Code, gestion des tables, commandes en temps réel et architecture multi-établissements.

CTA : `Demander une démonstration`.

#### Héliopolis

Projet public. Utilise son URL GitHub réelle seulement si elle est disponible dans les données du projet.

Profil GitHub officiel : `https://github.com/PaterneSeka1`

Ne limite pas les réalisations aux dépôts publics. Ne révèle jamais un dépôt privé.

### Études de cas

Créer `/projets/[slug]` avec :

1. Contexte
2. Problème
3. Objectifs
4. Utilisateurs et rôles
5. Fonctionnalités
6. Architecture
7. Stack
8. Défis
9. Solutions
10. Résultats
11. Galerie
12. Lien public ou demande de démonstration

### Méthode de travail

- Compréhension du besoin
- Cadrage fonctionnel
- UX et architecture
- Développement
- Tests et optimisation
- Déploiement
- Maintenance et évolution

### Parcours

Timeline administrable avec :

- Veilleur des Médias — Développeur full-stack / Direction informatique
- Worldev — Développeur full-stack stagiaire
- Freelance — Développeur web et concepteur de solutions numériques

Ne fabrique aucune date. Toutes les dates restent configurables.

### Contact

Titre :

> Construisons une solution utile et performante

Champs :

- nom ;
- email ;
- entreprise ;
- téléphone facultatif ;
- type de projet ;
- budget facultatif ;
- délai ;
- message.

Ajouter Zod, messages de succès/erreur, anti-spam, sauvegarde en base et notification email si SMTP configuré.

### Footer

Logo, promesse, navigation, réseaux, copyright automatique, mentions légales, confidentialité et lien discret vers `/admin`.

---

## Administration complète

Créer un véritable espace protégé à `/admin`.

### Authentification

- email et mot de passe ;
- hash sécurisé ;
- session protégée ;
- déconnexion ;
- aucun secret ou mot de passe codé en dur côté client ;
- compte administrateur créé par seed ou variables d’environnement.

### Dashboard

- projets ;
- projets publiés ;
- messages ;
- vues si disponibles ;
- dernières modifications ;
- actions rapides.

### CRUD

#### Profil

Nom, titre, accroche, description, localisation, disponibilité, email, téléphone, WhatsApp, GitHub, LinkedIn, photo du hero et CV.

#### Identité

Logo, favicon, couleurs officielles, typographies et image Open Graph. Le public ne doit jamais avoir de sélecteur de thème.

#### Projets

Création, modification, suppression, brouillon/publication, tri, projet vedette, type, confidentialité, URL publique, URL GitHub, technologies, étude de cas, galerie, CTA et SEO.

#### Expertises

Titre, description, icône, technologies, ordre et visibilité.

#### Expériences

Entreprise, poste, période, missions, ordre et publication.

#### Compétences

Catégorie, technologie, icône, ordre et visibilité. Aucun pourcentage.

#### Médias

Upload, aperçu, alt, suppression, réutilisation, validation de type/taille. Ne jamais altérer les photos originales.

#### Messages

Liste, lecture, statut, archivage, suppression et réponse.

#### Paramètres

SEO, Open Graph, contact, réseaux, SMTP, analytics, domaine, maintenance et export/import JSON.

---

## Stack

Détecte d’abord la stack actuelle. Préserve une structure existante propre.

Si une reconstruction est nécessaire, utilise un monorepo npm :

- `apps/web` : Next.js App Router, TypeScript, Tailwind CSS
- `apps/api` : NestJS
- `packages/database` : Prisma avec MongoDB
- `packages/ui` si utile
- npm workspaces

Frontend :

- Next.js
- TypeScript strict
- Tailwind CSS
- Lucide React
- Framer Motion avec animations discrètes
- React Hook Form
- Zod
- TanStack Query si API NestJS séparée

Backend :

- NestJS
- API REST
- DTO validés
- Swagger
- gestion d’erreurs centralisée
- authentification sécurisée

Prisma/MongoDB, modèles minimaux :

- User
- Profile
- BrandSettings
- Project
- ProjectImage
- Expertise
- Skill
- Experience
- ContactMessage
- Media
- SiteSettings

Images :

- stockage local en développement ;
- abstraction Cloudinary ou équivalent en production ;
- aucune transformation automatique des portraits originaux.

---

## SEO, accessibilité et qualité

Mettre en place :

- metadata Next.js ;
- titre et description par page ;
- Open Graph ;
- Twitter cards ;
- sitemap ;
- robots.txt ;
- canonical ;
- JSON-LD `Person`, `WebSite` et `SoftwareApplication` ou `CreativeWork` ;
- HTML sémantique ;
- navigation clavier ;
- contrastes accessibles ;
- textes alternatifs ;
- images optimisées ;
- chargement différé ;
- bon score Lighthouse.

Responsive à tester : 375, 430, 768, 1024 et 1440 px.

---

## Sécurité et confidentialité

- Ne jamais exposer les dépôts privés.
- Ne jamais afficher ou committer de secrets.
- Fournir `.env.example`.
- Ne jamais inventer une URL.
- Utiliser `Demander une démonstration` pour les plateformes privées.
- Conserver les photos originales intactes.
- Tous les contenus majeurs doivent être administrables.

---

## Plan obligatoire

### Étape 1 — Audit

Inspecte le projet et résume très brièvement la stack, les éléments réutilisables, les problèmes et le plan.

### Étape 2 — Fondation

Structure, design tokens, polices, logo, médias, lint et TypeScript.

### Étape 3 — Site public

Navigation, hero, à propos, expertises, réalisations, études de cas, parcours, contact, footer et responsive.

### Étape 4 — Backend

Prisma, modèles, API, validation, seed et Swagger.

### Étape 5 — Admin

Authentification, dashboard, CRUD, médias, messages et paramètres.

### Étape 6 — SEO et performance

Metadata, sitemap, robots, JSON-LD, accessibilité et optimisation.

### Étape 7 — Vérification

Utilise les scripts réellement disponibles et exécute notamment, si définis :

```bash
npm install
npm run lint
npm run typecheck
npm run build
```

Corrige toutes les erreurs.

---

## Critères de fin

Le travail est terminé seulement si :

- le projet démarre et compile ;
- lint et TypeScript passent ;
- l’identité visuelle est respectée ;
- aucune photo n’a été modifiée ;
- le logo officiel est utilisé ;
- une photo originale est affichée en grand dans le hero ;
- les liens publics sont réels ;
- les projets privés restent confidentiels ;
- l’administration gère le contenu ;
- les routes admin sont protégées ;
- le site est responsive ;
- les formulaires sont validés ;
- le SEO est en place ;
- `.env.example` existe ;
- un README court explique installation, seed, développement et déploiement.

## Format de tes réponses

À chaque étape, réponds uniquement avec :

1. fichiers créés ou modifiés ;
2. commandes exécutées ;
3. résultat des tests ;
4. prochaine étape.

Commence maintenant par l’audit du dépôt ouvert.
