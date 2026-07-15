export const projects = [
  {
    slug: "rhvedem",
    title: "RHVEDEM",
    category: "business",
    visibility: "private",
    summary:
      "Plateforme interne de gestion des ressources humaines : employés, congés, notes de frais, documents, bulletins de salaire, signatures, rôles et notifications.",
    technologies: ["Next.js", "NestJS", "Prisma", "PostgreSQL"],
    cta: { label: "Demander une démonstration", href: "/contact?projet=rhvedem" },
    caseStudy: {
      context:
        "Une organisation avait besoin de centraliser la gestion administrative de ses collaborateurs, jusque-là éclatée entre fichiers et échanges manuels.",
      problem:
        "Absence d'outil unique pour suivre congés, notes de frais, documents et bulletins de salaire, avec des rôles et des accès différenciés.",
      objectives: [
        "Centraliser les données RH dans un outil unique",
        "Sécuriser les accès selon les rôles",
        "Fiabiliser les processus de validation (congés, notes de frais)",
      ],
      users: ["Collaborateurs", "Managers", "Équipe RH", "Direction"],
      features: [
        "Gestion des employés et des documents",
        "Demandes et validation des congés",
        "Notes de frais",
        "Bulletins de salaire",
        "Signatures électroniques",
        "Rôles et permissions",
        "Notifications",
      ],
      architecture:
        "Application web avec API REST séparée, base de données relationnelle et gestion fine des rôles au niveau API.",
      stack: ["Next.js", "NestJS", "Prisma", "PostgreSQL"],
      challenges: [
        "Modéliser des workflows de validation à plusieurs niveaux",
        "Garantir la confidentialité des données sensibles (bulletins, documents RH)",
      ],
      solutions: [
        "Système de rôles et de permissions granulaire",
        "Séparation stricte des accès par périmètre métier",
      ],
      results: [
        "Centralisation des processus RH dans un outil unique",
        "Réduction du traitement manuel des congés et notes de frais",
      ],
      gallery: [],
    },
  },
  {
    slug: "ecodal-cote-divoire",
    title: "Ecodal Côte d'Ivoire",
    category: "website",
    visibility: "public",
    summary: "Site public conçu et développé par Paterne SEKA.",
    technologies: ["Next.js", "Tailwind CSS"],
    publicUrl: "https://www.ecodalci.com/",
    cta: { label: "Visiter la plateforme", href: "https://www.ecodalci.com/" },
    caseStudy: {
      context: "Présence web publique pour Ecodal Côte d'Ivoire.",
      problem: "Besoin d'un site vitrine professionnel et fiable.",
      objectives: ["Offrir une présence en ligne crédible et performante"],
      users: ["Visiteurs du site", "Clients et partenaires"],
      features: ["Présentation de l'activité", "Navigation publique"],
      architecture: "Site web public rendu avec Next.js.",
      stack: ["Next.js", "Tailwind CSS"],
      challenges: ["Livrer un site fiable et rapide à charger"],
      solutions: ["Développement soigné du frontend et des performances"],
      results: ["Site en production, accessible publiquement"],
      gallery: [],
    },
  },
  {
    slug: "plateforme-ticketing",
    title: "Plateforme de ticketing",
    category: "business",
    visibility: "private",
    summary:
      "Gestion des incidents et demandes internes avec workflow, attribution, priorités, SLA, historique, notifications et tableaux de bord.",
    technologies: ["Next.js", "NestJS", "Prisma"],
    cta: { label: "Demander une démonstration", href: "/contact?projet=plateforme-ticketing" },
    caseStudy: {
      context:
        "Des équipes internes traitaient incidents et demandes sans outil de suivi structuré.",
      problem:
        "Manque de traçabilité, d'attribution claire et de priorisation des demandes.",
      objectives: [
        "Structurer le traitement des incidents via un workflow",
        "Assurer le suivi des SLA",
        "Donner une visibilité globale via des tableaux de bord",
      ],
      users: ["Agents support", "Responsables d'équipe", "Demandeurs internes"],
      features: [
        "Workflow de traitement des tickets",
        "Attribution et priorités",
        "Suivi des SLA",
        "Historique des échanges",
        "Notifications",
        "Tableaux de bord",
      ],
      architecture: "Application web avec API REST dédiée et base de données relationnelle.",
      stack: ["Next.js", "NestJS", "Prisma"],
      challenges: ["Modéliser un workflow d'attribution flexible selon les équipes"],
      solutions: ["Système de statuts et de règles d'attribution configurables"],
      results: ["Traitement des incidents structuré et traçable"],
      gallery: [],
    },
  },
  {
    slug: "intranet-entreprise",
    title: "Intranet d'entreprise",
    category: "business",
    visibility: "private",
    summary:
      "Portail interne avec présences, géolocalisation, horaires, rapports, communication et gestion documentaire.",
    technologies: ["Next.js", "NestJS", "Prisma"],
    cta: { label: "Demander une démonstration", href: "/contact?projet=intranet-entreprise" },
    caseStudy: {
      context: "Une entreprise avait besoin d'un portail interne unifiant plusieurs usages du quotidien.",
      problem: "Informations et outils dispersés pour le suivi des présences et la communication interne.",
      objectives: [
        "Suivre les présences et horaires",
        "Centraliser la communication et les documents internes",
      ],
      users: ["Collaborateurs", "Managers", "Direction"],
      features: [
        "Suivi des présences et géolocalisation",
        "Gestion des horaires",
        "Rapports",
        "Communication interne",
        "Gestion documentaire",
      ],
      architecture: "Application web avec API REST dédiée et base de données relationnelle.",
      stack: ["Next.js", "NestJS", "Prisma"],
      challenges: ["Gérer la géolocalisation de façon fiable et respectueuse des données"],
      solutions: ["Suivi de présence géolocalisé avec contrôles d'accès stricts"],
      results: ["Portail interne unique pour la vie quotidienne de l'entreprise"],
      gallery: [],
    },
  },
  {
    slug: "qr-restaurant",
    title: "QR Restaurant",
    category: "saas",
    visibility: "private",
    summary:
      "Commande par QR Code, gestion des tables, commandes en temps réel et architecture multi-établissements.",
    technologies: ["Next.js", "NestJS", "Socket.IO", "Prisma"],
    cta: { label: "Demander une démonstration", href: "/contact?projet=qr-restaurant" },
    caseStudy: {
      context: "Des établissements souhaitaient digitaliser la prise de commande en salle.",
      problem: "Prise de commande manuelle, lente et sujette aux erreurs, sans vision temps réel en cuisine.",
      objectives: [
        "Permettre la commande par QR Code depuis la table",
        "Suivre les commandes en temps réel",
        "Supporter plusieurs établissements sur une même plateforme",
      ],
      users: ["Clients du restaurant", "Personnel de salle", "Cuisine", "Gérants"],
      features: [
        "Commande par QR Code",
        "Gestion des tables",
        "Commandes en temps réel",
        "Architecture multi-établissements",
      ],
      architecture:
        "Plateforme SaaS multi-tenant avec communication temps réel entre salle et cuisine.",
      stack: ["Next.js", "NestJS", "Socket.IO", "Prisma"],
      challenges: [
        "Garantir la synchronisation temps réel entre salle et cuisine",
        "Isoler proprement les données de chaque établissement",
      ],
      solutions: [
        "Communication en temps réel via Socket.IO",
        "Architecture multi-établissements avec cloisonnement des données",
      ],
      results: ["Réduction du temps de prise de commande", "Suivi en temps réel pour la cuisine"],
      gallery: [],
    },
  },
  {
    slug: "heliopolis",
    title: "Héliopolis",
    category: "website",
    visibility: "public",
    summary: "Projet public développé par Paterne SEKA.",
    technologies: ["Next.js"],
    cta: { label: "Voir sur GitHub", href: "https://github.com/PaterneSeka1" },
    caseStudy: {
      context: "Projet public réalisé et partagé sur le profil GitHub de Paterne SEKA.",
      problem: "Explorer et mettre en pratique une architecture de bout en bout sur un projet public.",
      objectives: ["Livrer un projet public complet et documenté"],
      users: ["Visiteurs", "Communauté de développeurs"],
      features: ["Fonctionnalités disponibles dans le dépôt public"],
      architecture: "Application web développée avec Next.js.",
      stack: ["Next.js"],
      challenges: ["Structurer un projet public clair et maintenable"],
      solutions: ["Organisation soignée du code et de la documentation"],
      results: ["Projet public disponible sur GitHub"],
      gallery: [],
    },
  },
];

export const categoryLabels = {
  all: "Tous",
  business: "Applications métier",
  saas: "SaaS",
  website: "Sites web",
  public: "Publics",
  private: "Privés",
};

export function getProjectBySlug(slug) {
  return projects.find((p) => p.slug === slug) ?? null;
}
