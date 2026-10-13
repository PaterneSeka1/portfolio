/**
 * Seed content for projects. French is stored in the main fields, English in `en`.
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
    featured: true,
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
    slug: "intranet",
    title: "Intranet VEDEM",
    category: "business",
    visibility: "private",
    featured: true,
    summary:
      "Portail interne qui réunit le suivi des présences, les horaires, les rapports, la communication interne et la gestion documentaire.",
    technologies: ["Next.js", "NestJS", "Prisma"],
    cta: { label: "Parlons-en", href: "/contact?project=intranet" },
    seoTitle: "Intranet VEDEM — Un portail interne pour le quotidien de l'entreprise",
    caseStudy: {
      headline: "Un portail interne pour le quotidien de l'entreprise",
      context: "Portail interne destiné aux collaborateurs, aux managers et à la direction.",
      problem:
        "Le suivi des présences, la communication interne et les documents doivent être accessibles depuis un point d'entrée unique.",
      objectives: [
        "Suivre les présences et les horaires",
        "Centraliser la communication et les documents internes",
        "Produire des rapports exploitables par les managers",
      ],
      constraints: ["Géolocalisation à utiliser de façon fiable et respectueuse des données personnelles"],
      solution:
        "Un portail web unique qui rassemble les outils du quotidien, avec des accès adaptés à chaque profil.",
      features: [
        "Suivi des présences avec géolocalisation",
        "Gestion des horaires",
        "Rapports",
        "Communication interne",
        "Gestion documentaire",
      ],
      users: ["Collaborateurs", "Managers", "Direction"],
      stack: ["Next.js", "NestJS", "Prisma"],
      results: ["Un point d'entrée unique pour les usages internes du quotidien"],
      ctaTitle: "Envie de réunir vos outils internes dans un seul portail ?",
    },
    en: {
      title: "Intranet VEDEM",
      summary:
        "Internal portal bringing together attendance tracking, working hours, reports, internal communication and document management.",
      ctaLabel: "Let's talk",
      seoTitle: "Intranet VEDEM — An internal portal for everyday work",
      caseStudy: {
        headline: "An internal portal for everyday work",
        context: "Internal portal for employees, managers and management.",
        problem:
          "Attendance tracking, internal communication and documents need to be reachable from a single entry point.",
        objectives: [
          "Track attendance and working hours",
          "Centralise internal communication and documents",
          "Produce reports managers can act on",
        ],
        constraints: ["Geolocation used reliably and with respect for personal data"],
        solution: "A single web portal bringing everyday tools together, with access tailored to each profile.",
        features: [
          "Attendance tracking with geolocation",
          "Working hours management",
          "Reports",
          "Internal communication",
          "Document management",
        ],
        users: ["Employees", "Managers", "Management"],
        results: ["A single entry point for everyday internal use"],
        ctaTitle: "Want to bring your internal tools into a single portal?",
      },
    },
  },
  {
    slug: "chatbot-ai",
    title: "Chatbot IA VEDEM",
    category: "ai",
    visibility: "private",
    featured: true,
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
    category: "website",
    visibility: "public",
    featured: false,
    summary: "Projet public développé avec Next.js et partagé sur GitHub.",
    technologies: ["Next.js"],
    githubUrl: "https://github.com/PaterneSeka1",
    cta: { label: "Parlons-en", href: "/contact?project=heliopolis" },
    caseStudy: {
      context: "Projet public réalisé et partagé sur le profil GitHub de Paterne SEKA.",
      stack: ["Next.js"],
    },
    en: {
      summary: "Public project built with Next.js and shared on GitHub.",
      ctaLabel: "Let's talk",
      caseStudy: {
        context: "Public project built and shared on Paterne SEKA's GitHub profile.",
      },
    },
  },
];
