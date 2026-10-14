/**
 * Seed content for projects. French is stored in the main fields, English in `en`.
 *
 * status: "published" (default) or "draft" for projects not ready to be shown.
 *
 * caseStudy keys (all optional, empty values are not rendered):
 *   headline            business-oriented title shown before the product name
 *   context, problem    text
 *   objectives          string[]
 *   constraints         string[]
 *   solution            text
 *   features            string[]
 *   users               string[]
 *   role                string[]  what Paterne personally did
 *   collaboration       text      who else worked on it
 *   architecture        text
 *   architectureDiagram text, one node per line ("Label | detail");
 *                       lines starting with "- " are parallel branches of the previous node
 *   stack               string[]
 *   challenges          string[]
 *   decisions           string[]
 *   results             string[]  factual only: no invented KPI
 *   nextSteps           string[]
 *   ctaTitle            contextual call to action at the end of the case study
 */
export const projects = [
  {
    slug: "scout-ascci",
    title: "SCOUT ASCCI",
    category: "business",
    visibility: "private",
    featured: true,
    summary:
      "Plateforme de suivi pédagogique pour le mouvement scout catholique de Côte d'Ivoire : scouts, présences, progression, cotisations, documents et autorisations de camp, de la paroisse au district.",
    technologies: ["Next.js", "NestJS", "Prisma", "PostgreSQL", "Cloudflare R2", "Docker"],
    cta: { label: "Discutons-en", href: "/contact?project=scout-ascci" },
    seoTitle: "SCOUT ASCCI — Suivi pédagogique d'un mouvement scout",
    seoDescription:
      "Plateforme multi-installations pour le suivi des scouts, des présences, des cotisations et des documents, conçue avec NestJS, Next.js et PostgreSQL.",
    caseStudy: {
      headline: "Digitaliser le suivi pédagogique d'un mouvement scout",
      context:
        "Plateforme destinée au mouvement scout catholique de Côte d'Ivoire, utilisée d'abord par les paroisses, puis par les districts, avec une organisation prévue jusqu'aux niveaux région et nation.",
      problem:
        "Le suivi des scouts — effectifs, présences, progression, cotisations, documents et autorisations parentales — doit être partagé entre chefs, parents et responsables, avec des données personnelles et médicales à protéger.",
      objectives: [
        "Centraliser le suivi des scouts de chaque paroisse",
        "Donner à chaque acteur (chef, parent, responsable) un accès adapté à son rôle",
        "Préparer l'extension aux niveaux district, région et nation",
      ],
      constraints: [
        "Données personnelles et médicales de mineurs",
        "Chaque installation garde ses propres données, qui ne circulent jamais vers une autre",
        "Un administrateur plateforme unique pour plusieurs installations",
      ],
      solution:
        "Une API unique déployée une fois par plateforme, chacune avec sa base, son stockage de fichiers et ses secrets, et des interfaces dédiées à la paroisse et au district. Les règles métier communes (rôles, branches, validations) sont partagées entre l'API et les interfaces.",
      features: [
        "Fiches scouts, parents et contacts d'urgence, avec import CSV",
        "Activités, réunions et présences, avec cartes à QR code",
        "Progression et badges par branche",
        "Cotisations et autorisations de camp",
        "Programmes et calendrier",
        "Documents stockés de façon privée, servis après contrôle des droits",
        "Tableaux de bord, rapports et journal d'audit",
      ],
      users: ["Chefs de groupe et d'unité", "Parents", "Responsables de district", "Administrateur plateforme"],
      role: [
        "Conception de l'architecture (monorepo, installations autonomes)",
        "Développement de l'API NestJS et des interfaces Next.js",
        "Modélisation des données avec Prisma et PostgreSQL",
        "Authentification, sessions et autorisations par rôle",
        "Déploiement sur VPS, sauvegardes chiffrées et intégration continue",
      ],
      architecture:
        "Monorepo pnpm : une API NestJS (Prisma, PostgreSQL), seule à accéder à la base, et deux interfaces Next.js (paroisse et district) qui relaient les appels côté serveur, sur une même origine. Les fichiers sont stockés sur Cloudflare R2 dans un espace privé et un espace public.",
      architectureDiagram:
        "Navigateur\nNginx | reverse proxy\nNext.js | espace paroisse ou district\nAPI NestJS | règles métier et droits\n- PostgreSQL | une base par installation\n- Cloudflare R2 | documents privés et publics",
      challenges: [
        "Isoler complètement les données de chaque installation",
        "Permettre à un administrateur unique d'agir sur plusieurs installations",
        "Protéger des données personnelles et médicales de mineurs",
      ],
      decisions: [
        "Jeton d'accès court (5 minutes) et session révocable avec rotation, en cookies httpOnly",
        "Jetons de l'administrateur plateforme signés en ECDSA, vérifiés par les autres installations avec la seule clé publique",
        "Toute route de l'API protégée par défaut, les routes publiques étant explicitement justifiées",
        "Sauvegardes chiffrées (AES-256-GCM) chaque nuit et avant chaque migration",
      ],
      results: [
        "Plateforme paroissiale et application district développées sur une base de code commune",
        "Lint, types, tests unitaires et build vérifiés à chaque modification par l'intégration continue",
      ],
      nextSteps: ["Ouverture aux niveaux région et nation"],
      ctaTitle: "Une organisation à plusieurs niveaux à outiller ?",
    },
    en: {
      title: "SCOUT ASCCI",
      summary:
        "Educational tracking platform for the Catholic scout movement of Côte d'Ivoire: scouts, attendance, progress, fees, documents and camp permissions, from parish to district.",
      ctaLabel: "Let's talk",
      seoTitle: "SCOUT ASCCI — Educational tracking for a scout movement",
      seoDescription:
        "Multi-installation platform for tracking scouts, attendance, fees and documents, built with NestJS, Next.js and PostgreSQL.",
      caseStudy: {
        headline: "Digitising the educational tracking of a scout movement",
        context:
          "Platform for the Catholic scout movement of Côte d'Ivoire, used first by parishes, then by districts, with an organisation designed to reach the regional and national levels.",
        problem:
          "Tracking scouts — membership, attendance, progress, fees, documents and parental permissions — has to be shared between leaders, parents and officials, with personal and medical data to protect.",
        objectives: [
          "Centralise scout tracking for each parish",
          "Give each person (leader, parent, official) access that matches their role",
          "Prepare the extension to district, regional and national levels",
        ],
        constraints: [
          "Personal and medical data of minors",
          "Each installation keeps its own data, which never flows to another one",
          "A single platform administrator for several installations",
        ],
        solution:
          "A single API deployed once per platform, each with its own database, file storage and secrets, and dedicated interfaces for parishes and districts. Shared business rules (roles, branches, validation) are used by both the API and the interfaces.",
        features: [
          "Scout, parent and emergency contact records, with CSV import",
          "Activities, meetings and attendance, with QR-code cards",
          "Progress and badges by branch",
          "Fees and camp permissions",
          "Programmes and calendar",
          "Documents stored privately, served after an access check",
          "Dashboards, reports and audit log",
        ],
        users: ["Group and unit leaders", "Parents", "District officials", "Platform administrator"],
        role: [
          "Architecture design (monorepo, standalone installations)",
          "Development of the NestJS API and Next.js interfaces",
          "Data modelling with Prisma and PostgreSQL",
          "Authentication, sessions and role-based authorisation",
          "VPS deployment, encrypted backups and continuous integration",
        ],
        architecture:
          "pnpm monorepo: a NestJS API (Prisma, PostgreSQL), the only component with database access, and two Next.js interfaces (parish and district) that relay calls server-side on a single origin. Files are stored on Cloudflare R2 in a private and a public space.",
        architectureDiagram:
          "Browser\nNginx | reverse proxy\nNext.js | parish or district space\nNestJS API | business rules and permissions\n- PostgreSQL | one database per installation\n- Cloudflare R2 | private and public documents",
        challenges: [
          "Fully isolating each installation's data",
          "Letting a single administrator act on several installations",
          "Protecting personal and medical data of minors",
        ],
        decisions: [
          "Short-lived access token (5 minutes) and revocable rotating session, in httpOnly cookies",
          "Platform administrator tokens signed with ECDSA, verified by other installations with the public key only",
          "Every API route protected by default, with public routes explicitly justified",
          "Encrypted backups (AES-256-GCM) every night and before each migration",
        ],
        results: [
          "Parish platform and district application built on a shared codebase",
          "Lint, types, unit tests and build checked on every change by continuous integration",
        ],
        nextSteps: ["Opening to the regional and national levels"],
        ctaTitle: "An organisation with several levels to equip?",
      },
    },
  },
  {
    slug: "intranet",
    title: "Intranet VEDEM",
    category: "business",
    visibility: "private",
    featured: true,
    summary:
      "Portail interne de l'entreprise : présences et planning, annonces, onglets métier par BU, messagerie en temps réel, pilotage et rapports exportables.",
    technologies: ["Next.js", "NestJS", "Prisma", "PostgreSQL", "Socket.IO", "Nginx", "PM2"],
    cta: { label: "Parlons-en", href: "/contact?project=intranet" },
    seoTitle: "Intranet VEDEM — Un portail interne pour le quotidien de l'entreprise",
    caseStudy: {
      headline: "Un portail interne pour le quotidien de l'entreprise",
      context: "Portail interne destiné aux collaborateurs, aux responsables de BU et à la direction.",
      problem:
        "Le suivi des présences, la communication interne et l'accès aux outils de chaque équipe doivent passer par un point d'entrée unique, avec une vision consolidée pour la direction.",
      objectives: [
        "Suivre les présences, les horaires et les plannings",
        "Centraliser la communication interne et les outils de chaque BU",
        "Produire des rapports exploitables par les responsables",
      ],
      constraints: [
        "Droits d'accès différents selon le rôle et la BU",
        "Géolocalisation à utiliser de façon fiable et respectueuse des données personnelles",
        "Postes partagés utilisés en mode kiosque",
      ],
      solution:
        "Un portail web unique, organisé par rôle et par BU, qui rassemble les outils du quotidien, la communication et le pilotage.",
      features: [
        "Présences, planning, congés et jours fériés",
        "Annonces et notifications",
        "Onglets métier configurés par BU",
        "Messagerie interne en temps réel",
        "Pilotage et rapports exportables en Excel et PDF",
        "Historique et journal d'activité",
        "Déploiement en mode kiosque sur Linux, macOS et Windows",
      ],
      users: ["Collaborateurs", "Responsables de BU", "Direction"],
      role: [
        "Conception de l'architecture et du modèle de données",
        "Développement full-stack : interface Next.js et API NestJS",
        "Messagerie et notifications en temps réel",
        "Génération des rapports (Excel, PDF)",
        "Déploiement et maintenance sur VPS (Nginx, PM2)",
      ],
      architecture:
        "Monorepo avec une interface Next.js et une API REST NestJS qui partagent un paquet de données Prisma sur PostgreSQL. Socket.IO assure la messagerie et les notifications en temps réel.",
      architectureDiagram:
        "Collaborateurs | navigateur ou kiosque\nNginx | reverse proxy\nNext.js | portail\nAPI NestJS | règles métier · PM2\n- PostgreSQL | via Prisma\n- Socket.IO | messagerie et notifications",
      stack: ["Next.js", "NestJS", "Prisma", "PostgreSQL", "Socket.IO", "Nginx", "PM2"],
      challenges: [
        "Gérer des droits d'accès croisés entre rôles et BU",
        "Verrouiller les postes partagés quel que soit le système d'exploitation",
      ],
      decisions: [
        "Un paquet de données partagé pour garder un seul schéma entre l'interface et l'API",
        "Socket.IO pour la messagerie plutôt qu'un rafraîchissement périodique",
        "Exports générés côté serveur pour des rapports fidèles",
      ],
      results: ["Un point d'entrée unique pour les usages internes du quotidien"],
      ctaTitle: "Envie de réunir vos outils internes dans un seul portail ?",
    },
    en: {
      title: "Intranet VEDEM",
      summary:
        "The company's internal portal: attendance and scheduling, announcements, business tabs by unit, real-time messaging, management dashboards and exportable reports.",
      ctaLabel: "Let's talk",
      seoTitle: "Intranet VEDEM — An internal portal for everyday work",
      caseStudy: {
        headline: "An internal portal for everyday work",
        context: "Internal portal for employees, business unit managers and senior management.",
        problem:
          "Attendance tracking, internal communication and each team's tools need a single entry point, with a consolidated view for management.",
        objectives: [
          "Track attendance, working hours and schedules",
          "Centralise internal communication and each unit's tools",
          "Produce reports managers can act on",
        ],
        constraints: [
          "Access rights that depend on role and business unit",
          "Geolocation used reliably and with respect for personal data",
          "Shared workstations used in kiosk mode",
        ],
        solution:
          "A single web portal, organised by role and business unit, bringing together everyday tools, communication and management.",
        features: [
          "Attendance, scheduling, leave and public holidays",
          "Announcements and notifications",
          "Business tabs configured per unit",
          "Real-time internal messaging",
          "Dashboards and reports exportable to Excel and PDF",
          "History and activity log",
          "Kiosk-mode deployment on Linux, macOS and Windows",
        ],
        users: ["Employees", "Business unit managers", "Senior management"],
        role: [
          "Architecture and data model design",
          "Full-stack development: Next.js interface and NestJS API",
          "Real-time messaging and notifications",
          "Report generation (Excel, PDF)",
          "VPS deployment and maintenance (Nginx, PM2)",
        ],
        architecture:
          "Monorepo with a Next.js interface and a NestJS REST API sharing a Prisma data package on PostgreSQL. Socket.IO powers real-time messaging and notifications.",
        architectureDiagram:
          "Employees | browser or kiosk\nNginx | reverse proxy\nNext.js | portal\nNestJS API | business rules · PM2\n- PostgreSQL | through Prisma\n- Socket.IO | messaging and notifications",
        challenges: [
          "Handling access rights that combine roles and business units",
          "Locking down shared workstations whatever the operating system",
        ],
        decisions: [
          "A shared data package to keep a single schema between the interface and the API",
          "Socket.IO for messaging rather than periodic refreshes",
          "Server-side exports for accurate reports",
        ],
        results: ["A single entry point for everyday internal use"],
        ctaTitle: "Want to bring your internal tools into a single portal?",
      },
    },
  },
  {
    slug: "vedem-ticket",
    title: "VEDEM Ticket",
    category: "business",
    visibility: "public",
    featured: true,
    summary:
      "Billetterie en ligne d'un dîner-gala : achat sans compte, paiement Wave ou en espèces, billets à QR code contrôlés à l'entrée et tableau de bord d'administration.",
    technologies: ["Next.js", "NestJS", "Prisma", "MongoDB", "Swagger"],
    publicUrl: "https://gala-ticket.vercel.app/",
    cta: { label: "Voir la billetterie", href: "https://gala-ticket.vercel.app/" },
    seoTitle: "VEDEM Ticket — Billetterie en ligne avec paiement mobile",
    seoDescription:
      "Billetterie événementielle avec paiement Wave ou en espèces, billets à QR code et contrôle d'accès à l'entrée.",
    caseStudy: {
      headline: "Vendre et contrôler les billets d'un événement",
      context: "Billetterie officielle d'un dîner-gala, avec plusieurs catégories de places.",
      problem:
        "Les billets doivent pouvoir être achetés simplement, payés par mobile money ou en espèces, puis contrôlés à l'entrée sans fraude ni double passage.",
      objectives: [
        "Permettre l'achat sans création de compte",
        "Accepter le paiement Wave et en espèces",
        "Contrôler chaque billet à l'entrée de façon fiable",
      ],
      constraints: [
        "Paiement Wave sans API ni webhook : confirmation manuelle sur preuve de paiement",
        "Stocks limités par catégorie de places",
        "Coordonnées des acheteurs à protéger",
      ],
      solution:
        "L'acheteur choisit ses places, paie par lien Wave ou en espèces, puis récupère ses billets à QR code avec un code personnel une fois le paiement validé. Le jour J, chaque billet est scanné à l'entrée.",
      features: [
        "Achat sans compte, plusieurs catégories dans une même commande",
        "Paiement Wave avec envoi d'une capture, ou en espèces",
        "Validation des paiements par l'administrateur",
        "Billets à QR code récupérables avec un code personnel",
        "Scan à l'entrée, chaque billet n'étant valable qu'une fois",
        "Invitations et catégories réservées",
        "Date et lieu de l'événement modifiables à tout moment",
      ],
      users: ["Acheteurs", "Invités", "Administrateur", "Équipe d'accueil"],
      role: [
        "Conception des règles métier et du modèle de données",
        "Développement de l'API NestJS et de l'interface Next.js",
        "Documentation de l'API avec Swagger",
        "Déploiement : interface sur Vercel, API sur VPS",
      ],
      architecture:
        "Une interface Next.js hébergée sur Vercel appelle une API NestJS hébergée sur un VPS. L'API accède à MongoDB à travers un contrat Prisma.",
      architectureDiagram:
        "Acheteurs et accueil | navigateur\nNext.js | billetterie et tableau de bord · Vercel\nAPI NestJS | commandes, paiements, billets · VPS\nMongoDB | via Prisma",
      stack: ["Next.js", "NestJS", "Prisma", "MongoDB", "Swagger"],
      challenges: [
        "Fiabiliser un paiement mobile sans API de confirmation",
        "Empêcher qu'un billet soit validé deux fois, même scanné au même instant",
      ],
      decisions: [
        "Billets générés uniquement après validation du paiement",
        "Stock revérifié au moment de la confirmation",
        "Validation à l'entrée par une mise à jour atomique",
      ],
      results: ["Billetterie en ligne, accessible publiquement"],
      ctaTitle: "Un événement à équiper d'une billetterie ?",
    },
    en: {
      title: "VEDEM Ticket",
      summary:
        "Online ticketing for a gala dinner: purchase without an account, payment by Wave or cash, QR-code tickets checked at the door and an admin dashboard.",
      ctaLabel: "See the ticketing site",
      seoTitle: "VEDEM Ticket — Online ticketing with mobile payment",
      seoDescription:
        "Event ticketing with Wave or cash payment, QR-code tickets and access control at the door.",
      caseStudy: {
        headline: "Selling and checking tickets for an event",
        context: "Official ticketing for a gala dinner, with several seat categories.",
        problem:
          "Tickets must be easy to buy, payable by mobile money or cash, then checked at the door with no fraud or double entry.",
        objectives: [
          "Allow purchases without creating an account",
          "Accept Wave and cash payments",
          "Check every ticket reliably at the door",
        ],
        constraints: [
          "Wave payment with no API or webhook: manual confirmation from a proof of payment",
          "Limited stock per seat category",
          "Buyers' contact details to protect",
        ],
        solution:
          "Buyers choose their seats, pay through a Wave link or in cash, then retrieve their QR-code tickets with a personal code once the payment is approved. On the day, each ticket is scanned at the door.",
        features: [
          "Purchase without an account, several categories in one order",
          "Wave payment with a screenshot upload, or cash",
          "Payment approval by the administrator",
          "QR-code tickets retrieved with a personal code",
          "Door scanning, each ticket valid only once",
          "Invitations and reserved categories",
          "Event date and venue editable at any time",
        ],
        users: ["Buyers", "Guests", "Administrator", "Door staff"],
        role: [
          "Business rules and data model design",
          "Development of the NestJS API and Next.js interface",
          "API documentation with Swagger",
          "Deployment: interface on Vercel, API on a VPS",
        ],
        architecture:
          "A Next.js interface hosted on Vercel calls a NestJS API hosted on a VPS. The API accesses MongoDB through a Prisma contract.",
        architectureDiagram:
          "Buyers and door staff | browser\nNext.js | ticketing and dashboard · Vercel\nNestJS API | orders, payments, tickets · VPS\nMongoDB | through Prisma",
        challenges: [
          "Making a mobile payment reliable without a confirmation API",
          "Preventing a ticket from being validated twice, even when scanned at the same moment",
        ],
        decisions: [
          "Tickets generated only after the payment is approved",
          "Stock checked again at confirmation time",
          "Door validation through an atomic update",
        ],
        results: ["Ticketing site live and publicly accessible"],
        ctaTitle: "An event that needs a ticketing system?",
      },
    },
  },
  {
    slug: "rh-vedem",
    title: "RH VEDEM",
    category: "business",
    visibility: "private",
    featured: true,
    summary:
      "Plateforme interne qui centralise les collaborateurs, les congés, les documents administratifs et les validations hiérarchiques.",
    technologies: ["Next.js", "Prisma", "MongoDB", "Nginx", "PM2"],
    cta: { label: "Discutons-en", href: "/contact?project=rh-vedem" },
    seoTitle: "RH VEDEM — Digitalisation de la gestion RH",
    caseStudy: {
      headline: "Digitalisation de la gestion RH",
      context:
        "Application interne de gestion des ressources humaines, utilisée par les collaborateurs, les managers et l'équipe RH.",
      problem:
        "Les démarches RH (congés, documents administratifs, validations) doivent être suivies dans un outil unique, avec des accès différents selon le rôle de chacun.",
      objectives: [
        "Réunir les informations des collaborateurs dans un outil unique",
        "Dématérialiser les demandes et leur circuit de validation hiérarchique",
        "Donner à chacun un accès adapté à son rôle",
      ],
      constraints: [
        "Données personnelles et documents RH confidentiels",
        "Circuits de validation propres à l'organisation",
        "Application interne à héberger et maintenir sur l'infrastructure de l'entreprise",
      ],
      solution:
        "Une application web interne où chaque collaborateur gère ses demandes, où les managers valident celles de leur équipe et où l'équipe RH dispose d'une vue d'ensemble, avec des droits définis selon le rôle de chaque utilisateur.",
      features: [
        "Gestion des collaborateurs et de leurs documents",
        "Demandes de congés et validation hiérarchique",
        "Notes de frais",
        "Bulletins de salaire",
        "Signatures",
        "Droits d'accès selon le rôle et les responsabilités",
        "Notifications",
      ],
      users: ["Collaborateurs", "Managers", "Équipe RH", "Direction"],
      role: [
        "Conception de l'architecture applicative",
        "Développement full-stack (interface et logique serveur)",
        "Modélisation des données",
        "Déploiement et configuration du serveur (Nginx, PM2)",
      ],
      architecture:
        "Application Next.js qui regroupe l'interface et la logique serveur, avec un accès aux données via Prisma sur MongoDB. En production, Nginx sert de reverse proxy et PM2 maintient l'application en service.",
      architectureDiagram: "Utilisateurs | navigateur\nNginx | reverse proxy\nNext.js | interface et logique serveur · PM2\nPrisma | accès aux données\nMongoDB | base de données",
      stack: ["Next.js", "Prisma", "MongoDB", "Nginx", "PM2"],
      challenges: [
        "Modéliser des circuits de validation à plusieurs niveaux",
        "Garantir la confidentialité des documents et des données RH",
      ],
      decisions: [
        "Next.js pour regrouper interface et logique serveur dans une seule application",
        "Prisma pour un accès aux données structuré et typé",
        "Nginx et PM2 pour une mise en production simple à maintenir sur serveur",
      ],
      results: ["Une plateforme unique pour les processus RH couverts, accessible selon le rôle de chacun"],
      ctaTitle: "Vous avez un processus métier à digitaliser ?",
    },
    en: {
      title: "RH VEDEM",
      summary:
        "Internal platform bringing together employee records, leave requests, administrative documents and management approvals.",
      ctaLabel: "Let's talk",
      seoTitle: "RH VEDEM — Digitalising HR management",
      caseStudy: {
        headline: "Digitalising HR management",
        context: "Internal human resources application used by employees, managers and the HR team.",
        problem:
          "HR processes (leave, administrative documents, approvals) need to be handled in a single tool, with different access depending on each person's role.",
        objectives: [
          "Bring employee information together in a single tool",
          "Move requests and their approval chain online",
          "Give everyone access that matches their role",
        ],
        constraints: [
          "Personal data and confidential HR documents",
          "Approval chains specific to the organisation",
          "Internal application to host and maintain on the company's infrastructure",
        ],
        solution:
          "An internal web application where employees manage their requests, managers approve their team's requests and the HR team has an overall view, with permissions defined by each user's role.",
        features: [
          "Employee records and documents",
          "Leave requests and management approval",
          "Expense reports",
          "Payslips",
          "Signatures",
          "Access rights based on role and responsibilities",
          "Notifications",
        ],
        users: ["Employees", "Managers", "HR team", "Management"],
        role: [
          "Application architecture design",
          "Full-stack development (interface and server logic)",
          "Data modelling",
          "Deployment and server configuration (Nginx, PM2)",
        ],
        architecture:
          "A Next.js application combining the interface and server logic, with data access through Prisma on MongoDB. In production, Nginx acts as a reverse proxy and PM2 keeps the application running.",
        architectureDiagram: "Users | browser\nNginx | reverse proxy\nNext.js | interface and server logic · PM2\nPrisma | data access\nMongoDB | database",
        challenges: [
          "Modelling multi-level approval chains",
          "Keeping HR documents and data confidential",
        ],
        decisions: [
          "Next.js to keep the interface and server logic in a single application",
          "Prisma for structured, typed data access",
          "Nginx and PM2 for a production setup that is simple to maintain",
        ],
        results: ["A single platform for the HR processes it covers, accessible according to each person's role"],
        ctaTitle: "Have a business process to digitise?",
      },
    },
  },
  {
    slug: "ticketing",
    title: "Ticketing VEDEM",
    category: "business",
    visibility: "private",
    featured: false,
    summary:
      "Plateforme de suivi des incidents et des demandes internes : traitement, attribution, priorités, délais de prise en charge, historique et notifications.",
    technologies: ["NestJS", "MongoDB", "SMTP", "Tâches planifiées"],
    cta: { label: "Parler du projet", href: "/contact?project=ticketing" },
    seoTitle: "Ticketing VEDEM — Centralisation des demandes et incidents internes",
    caseStudy: {
      headline: "Centraliser les demandes et incidents internes",
      context:
        "Application interne de gestion des incidents et des demandes, utilisée par les demandeurs, les agents de support et leurs responsables.",
      problem:
        "Les demandes doivent être tracées, attribuées à la bonne personne et priorisées, avec un suivi des délais et une visibilité globale pour les responsables.",
      objectives: [
        "Structurer le traitement des demandes avec un workflow clair",
        "Suivre les délais de prise en charge (SLA)",
        "Donner une vue d'ensemble aux responsables",
      ],
      constraints: [
        "Plusieurs équipes et niveaux de priorité",
        "Notifications fiables à chaque étape du traitement",
      ],
      solution:
        "Une plateforme où chaque demande suit un parcours défini — création, attribution, traitement, clôture — avec des notifications par e-mail et des traitements automatiques planifiés.",
      features: [
        "Workflow de traitement des tickets",
        "Attribution et priorités",
        "Suivi des délais de prise en charge (SLA)",
        "Historique des échanges",
        "Notifications par e-mail",
        "Tableaux de bord",
      ],
      users: ["Demandeurs internes", "Agents de support", "Responsables d'équipe"],
      role: [
        "Conception de l'API et du modèle de données",
        "Développement backend avec NestJS",
        "Mise en place des notifications e-mail et des tâches planifiées",
        "Déploiement",
      ],
      architecture:
        "Une interface web qui s'appuie sur une API NestJS. L'API stocke les tickets dans MongoDB, envoie les notifications par SMTP et exécute des tâches planifiées.",
      architectureDiagram: "Interface web\nAPI NestJS | règles métier\n- MongoDB | tickets et historique\n- SMTP | notifications e-mail\n- Planificateur | tâches récurrentes",
      stack: ["NestJS", "MongoDB", "SMTP", "Tâches planifiées"],
      challenges: ["Modéliser un workflow d'attribution adapté à plusieurs équipes"],
      decisions: [
        "Une API dédiée (NestJS) pour isoler les règles métier de l'interface",
        "Des tâches planifiées pour les traitements récurrents, sans action manuelle",
      ],
      results: ["Un traitement des demandes structuré et traçable, de la création à la clôture"],
      ctaTitle: "Besoin de centraliser vos demandes ou incidents internes ?",
    },
    en: {
      title: "Ticketing VEDEM",
      technologies: ["NestJS", "MongoDB", "SMTP", "Scheduled jobs"],
      summary:
        "Platform for tracking internal incidents and requests: handling, assignment, priorities, response times, history and notifications.",
      ctaLabel: "Talk about your project",
      seoTitle: "Ticketing VEDEM — Centralising internal requests and incidents",
      caseStudy: {
        headline: "Centralising internal requests and incidents",
        context:
          "Internal application for managing incidents and requests, used by requesters, support agents and their managers.",
        problem:
          "Requests need to be tracked, assigned to the right person and prioritised, with response-time monitoring and an overall view for managers.",
        objectives: [
          "Structure request handling with a clear workflow",
          "Monitor response times (SLA)",
          "Give managers an overall view",
        ],
        constraints: ["Several teams and priority levels", "Reliable notifications at every step"],
        solution:
          "A platform where every request follows a defined path — creation, assignment, handling, closure — with email notifications and scheduled automated jobs.",
        features: [
          "Ticket handling workflow",
          "Assignment and priorities",
          "Response-time (SLA) monitoring",
          "Conversation history",
          "Email notifications",
          "Dashboards",
        ],
        users: ["Internal requesters", "Support agents", "Team leads"],
        role: [
          "API and data model design",
          "Backend development with NestJS",
          "Email notifications and scheduled jobs",
          "Deployment",
        ],
        architecture:
          "A web interface backed by a NestJS API. The API stores tickets in MongoDB, sends notifications over SMTP and runs scheduled jobs.",
        architectureDiagram: "Web interface\nNestJS API | business rules\n- MongoDB | tickets and history\n- SMTP | email notifications\n- Scheduler | recurring jobs",
        stack: ["NestJS", "MongoDB", "SMTP", "Scheduled jobs"],
        challenges: ["Modelling an assignment workflow that fits several teams"],
        decisions: [
          "A dedicated API (NestJS) to keep business rules separate from the interface",
          "Scheduled jobs for recurring processing, with no manual action",
        ],
        results: ["Structured, traceable request handling from creation to closure"],
        ctaTitle: "Need to centralise your internal requests or incidents?",
      },
    },
  },
  {
    slug: "chatbot-ai",
    title: "Chatbot IA VEDEM",
    category: "ai",
    visibility: "private",
    featured: false,
    summary:
      "Assistant conversationnel interne fondé sur une architecture RAG : il retrouve les passages pertinents dans une base documentaire et s'appuie sur un modèle de langage pour formuler la réponse.",
    technologies: ["RAG", "API LLM", "Embeddings", "Recherche vectorielle"],
    cta: { label: "Étudions votre cas", href: "/contact?project=chatbot-ai" },
    seoTitle: "Chatbot IA VEDEM — Un assistant IA sur une base documentaire interne",
    caseStudy: {
      headline: "Un assistant IA pour interroger une base documentaire interne",
      context:
        "Projet d'assistant IA interne mené avec les ingénieurs IA de l'équipe.",
      problem:
        "Retrouver une information dans une documentation interne volumineuse prend du temps ; un assistant doit pouvoir répondre en s'appuyant sur ces documents.",
      objectives: [
        "Permettre d'interroger une base documentaire en langage naturel",
        "Appuyer les réponses sur les documents de référence",
        "Intégrer l'assistant dans l'environnement applicatif existant",
      ],
      constraints: ["Documents internes : l'accès et l'hébergement doivent rester maîtrisés"],
      solution:
        "Un assistant conversationnel qui recherche d'abord les passages pertinents (recherche vectorielle sur des embeddings), puis transmet ce contexte à un modèle de langage pour formuler la réponse.",
      features: [
        "Interface de conversation",
        "Recherche des passages pertinents dans la base documentaire",
        "Réponses générées à partir de ces passages",
      ],
      role: [
        "Intégration applicative de l'assistant",
        "Développement du backend et des API",
        "Déploiement",
      ],
      collaboration:
        "Les briques IA (chaîne RAG, choix et paramétrage des modèles) sont conçues en collaboration avec les ingénieurs IA. Je prends en charge l'intégration applicative, le backend et la mise en production.",
      architecture:
        "L'interface de conversation interroge une API backend. L'API recherche les passages pertinents dans un index vectoriel, puis interroge un modèle de langage avec ce contexte.",
      architectureDiagram: "Utilisateur\nInterface de conversation\nAPI backend | orchestration\n- Recherche vectorielle | embeddings des documents\n- API LLM | génération de la réponse",
      stack: ["RAG", "API LLM", "Embeddings", "Recherche vectorielle"],
      ctaTitle: "Un assistant IA sur vos propres documents ?",
    },
    en: {
      title: "AI Chatbot VEDEM",
      technologies: ["RAG", "LLM APIs", "Embeddings", "Vector search"],
      summary:
        "Internal conversational assistant built on a RAG architecture: it retrieves relevant passages from a document base and relies on a language model to write the answer.",
      ctaLabel: "Let's look at your case",
      seoTitle: "AI Chatbot VEDEM — An AI assistant over an internal document base",
      caseStudy: {
        headline: "An AI assistant to query an internal document base",
        context: "Internal AI assistant project carried out with the team's AI engineers.",
        problem:
          "Finding information in a large internal documentation takes time; an assistant should be able to answer based on those documents.",
        objectives: [
          "Query a document base in natural language",
          "Ground answers in the reference documents",
          "Integrate the assistant into the existing application environment",
        ],
        constraints: ["Internal documents: access and hosting must remain under control"],
        solution:
          "A conversational assistant that first retrieves relevant passages (vector search over embeddings), then passes that context to a language model to write the answer.",
        features: [
          "Chat interface",
          "Retrieval of relevant passages from the document base",
          "Answers generated from those passages",
        ],
        role: ["Application integration of the assistant", "Backend and API development", "Deployment"],
        collaboration:
          "The AI building blocks (RAG pipeline, model selection and tuning) are designed together with AI engineers. I handle application integration, the backend and production deployment.",
        architecture:
          "The chat interface calls a backend API. The API retrieves relevant passages from a vector index, then queries a language model with that context.",
        architectureDiagram: "User\nChat interface\nBackend API | orchestration\n- Vector search | document embeddings\n- LLM API | answer generation",
        stack: ["RAG", "LLM APIs", "Embeddings", "Vector search"],
        ctaTitle: "An AI assistant over your own documents?",
      },
    },
  },
  {
    slug: "qr-restaurant",
    title: "QR Restaurant",
    category: "saas",
    visibility: "private",
    featured: false,
    summary:
      "Commande par QR code, gestion des tables, commandes en temps réel et architecture multi-établissements.",
    technologies: ["Next.js", "NestJS", "Socket.IO", "Prisma"],
    cta: { label: "Parlons-en", href: "/contact?project=qr-restaurant" },
    caseStudy: {
      headline: "La commande en salle par QR code",
      context: "Produit destiné aux restaurants qui souhaitent digitaliser la prise de commande en salle.",
      problem: "La prise de commande manuelle est lente et ne donne pas de vision en temps réel à la cuisine.",
      objectives: [
        "Permettre la commande par QR code depuis la table",
        "Suivre les commandes en temps réel",
        "Accueillir plusieurs établissements sur une même plateforme",
      ],
      features: [
        "Commande par QR code",
        "Gestion des tables",
        "Commandes en temps réel",
        "Architecture multi-établissements",
      ],
      users: ["Clients du restaurant", "Personnel de salle", "Cuisine", "Gérants"],
      architecture: "Plateforme multi-établissements avec communication en temps réel entre la salle et la cuisine.",
      stack: ["Next.js", "NestJS", "Socket.IO", "Prisma"],
      challenges: [
        "Synchroniser en temps réel la salle et la cuisine",
        "Isoler proprement les données de chaque établissement",
      ],
      decisions: ["Socket.IO pour la communication en temps réel", "Cloisonnement des données par établissement"],
      ctaTitle: "Un produit SaaS à concevoir ?",
    },
    en: {
      summary: "QR-code ordering, table management, real-time orders and a multi-venue architecture.",
      ctaLabel: "Let's talk",
      caseStudy: {
        headline: "Table ordering by QR code",
        context: "Product for restaurants that want to digitise table ordering.",
        problem: "Taking orders by hand is slow and gives the kitchen no real-time view.",
        objectives: [
          "Let customers order from their table by QR code",
          "Track orders in real time",
          "Host several venues on the same platform",
        ],
        features: ["QR-code ordering", "Table management", "Real-time orders", "Multi-venue architecture"],
        users: ["Restaurant customers", "Floor staff", "Kitchen", "Managers"],
        architecture: "Multi-venue platform with real-time communication between the floor and the kitchen.",
        challenges: ["Keeping the floor and the kitchen in sync in real time", "Cleanly isolating each venue's data"],
        decisions: ["Socket.IO for real-time communication", "Data partitioned by venue"],
        ctaTitle: "A SaaS product to design?",
      },
    },
  },
  {
    slug: "ecodal-cote-divoire",
    title: "Ecodal Côte d'Ivoire",
    category: "website",
    visibility: "public",
    featured: false,
    summary: "Site vitrine de l'entreprise Ecodal Côte d'Ivoire, conçu et développé de bout en bout.",
    technologies: ["Next.js", "Tailwind CSS"],
    publicUrl: "https://www.ecodalci.com/",
    cta: { label: "Parlons de votre site", href: "/contact?project=ecodal-cote-divoire" },
    caseStudy: {
      headline: "Un site vitrine professionnel",
      context: "Présence en ligne de l'entreprise Ecodal Côte d'Ivoire.",
      problem: "Besoin d'un site vitrine professionnel, fiable et rapide à charger.",
      features: ["Présentation de l'activité", "Navigation publique"],
      stack: ["Next.js", "Tailwind CSS"],
      results: ["Site en ligne, accessible publiquement"],
      ctaTitle: "Besoin d'un site professionnel ?",
    },
    en: {
      summary: "Company website for Ecodal Côte d'Ivoire, designed and built end to end.",
      ctaLabel: "Let's talk about your website",
      caseStudy: {
        headline: "A professional company website",
        context: "Online presence for the company Ecodal Côte d'Ivoire.",
        problem: "The company needed a professional, reliable and fast-loading website.",
        features: ["Company presentation", "Public navigation"],
        results: ["Website live and publicly accessible"],
        ctaTitle: "Need a professional website?",
      },
    },
  },
  {
    slug: "heliopolis",
    title: "Héliopolis",
    category: "business",
    visibility: "public",
    featured: false,
    status: "draft",
    summary: "Application web en cours de développement, avec une interface Next.js et une API NestJS sur PostgreSQL.",
    technologies: ["Next.js", "NestJS", "Prisma", "PostgreSQL"],
    githubUrl: "https://github.com/PaterneSeka1/heliopolis",
    cta: { label: "Parlons-en", href: "/contact?project=heliopolis" },
    caseStudy: {
      context: "Projet en cours de développement, publié sur GitHub.",
      architecture: "Une interface Next.js et une API NestJS qui accède à PostgreSQL via Prisma.",
      stack: ["Next.js", "NestJS", "Prisma", "PostgreSQL"],
    },
    en: {
      summary: "Web application under development, with a Next.js interface and a NestJS API on PostgreSQL.",
      ctaLabel: "Let's talk",
      caseStudy: {
        context: "Project under development, published on GitHub.",
        architecture: "A Next.js interface and a NestJS API accessing PostgreSQL through Prisma.",
      },
    },
  },
  {
    slug: "souklou",
    title: "SOUKLOU",
    category: "saas",
    visibility: "public",
    featured: false,
    status: "draft",
    summary: "Interface de gestion d'établissements scolaires et d'élèves, en cours de développement.",
    technologies: ["React", "TypeScript", "TanStack Router", "TanStack Query", "Tailwind CSS"],
    githubUrl: "https://github.com/PaterneSeka1/SOUKLOU",
    cta: { label: "Parlons-en", href: "/contact?project=souklou" },
    caseStudy: {
      context: "Projet en cours de développement : l'interface est réalisée, le backend reste à construire.",
      features: ["Inscription, connexion et parcours d'accueil", "Tableau de bord", "Gestion des écoles et des élèves"],
      stack: ["React", "TypeScript", "TanStack Router", "TanStack Query", "Tailwind CSS"],
    },
    en: {
      summary: "Management interface for schools and students, under development.",
      ctaLabel: "Let's talk",
      caseStudy: {
        context: "Project under development: the interface is built, the backend is still to come.",
        features: ["Sign-up, sign-in and onboarding", "Dashboard", "School and student management"],
      },
    },
  },
];
