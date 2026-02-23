export interface Project {
  id: number;
  title: string;
  desc: string;
  tech: string[];
  color: string;
  icon: string;
}

export interface Skill {
  name: string;
  level: number;
  color: string;
}

export const NAV_ITEMS = ["Home", "Sobre", "Projetos", "Skills", "Contato"];

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: "ArcadeRank - Plataforma de Jogos",
    desc: "Plataforma para jogar e evoluir com sistema de gamificação",
    tech: ["React Native", "TypeScript", "Vite", "TailwindCSS"],
    color: "#00f0ff",
    icon: "◈",
  },
  {
    id: 2,
    title: "CryptoVault",
    desc: "Carteira DeFi multi-chain com swap integrado, staking e portfolio tracker com alertas personalizados.",
    tech: ["React Native", "Web3.js", "Solidity", "Node.js"],
    color: "#a855f7",
    icon: "⬡",
  },
  {
    id: 3,
    title: "Orbital CMS",
    desc: "Headless CMS com editor visual drag-n-drop, suporte a i18n e deploy automático via CI/CD pipeline.",
    tech: ["Next.js", "GraphQL", "PostgreSQL", "Docker"],
    color: "#c0c0d0",
    icon: "◎",
  },
  {
    id: 4,
    title: "SynthWave AR",
    desc: "App de realidade aumentada para performances musicais ao vivo. Efeitos visuais sincronizados ao BPM.",
    tech: ["Unity", "ARKit", "C#", "Wasm"],
    color: "#f472b6",
    icon: "⬢",
  },
];

export const SKILLS: Skill[] = [
  { name: "React Native / Expo", level: 95, color: "#00f0ff" },
  { name: "TypeScript", level: 92, color: "#00f0ff" },
  { name: "React / Next.js", level: 90, color: "#a855f7" },
  { name: "Node.js / GraphQL", level: 85, color: "#a855f7" },
  { name: "Python / ML", level: 75, color: "#c0c0d0" },
  { name: "AWS / DevOps", level: 78, color: "#c0c0d0" },
  { name: "UI/UX Design", level: 88, color: "#f472b6" },
  { name: "Web3 / Solidity", level: 65, color: "#f472b6" },
];

export const ORBIT_SKILLS = [
  { label: "React", angle: 0, r: 90 },
  { label: "TypeScript", angle: 45, r: 90 },
  { label: "Expo", angle: 90, r: 90 },
  { label: "GraphQL", angle: 135, r: 90 },
  { label: "Node.js", angle: 180, r: 90 },
  { label: "Docker", angle: 225, r: 90 },
  { label: "AWS", angle: 270, r: 90 },
  { label: "Python", angle: 315, r: 90 },
];

export const TIMELINE = [
  {
    year: "2026",
    title: "Junior Mobile Developer",
    company: "Sitallcom Sistemas Inteligentes",
    desc: "Desenvolvimento em React Native com Expo para dispositivos IOS e Android.",
  },
  {
    year: "2023",
    title: "Início da Jornada",
    company: "Freelancer",
    desc: "Primeiros projetos: e-commerce, landing pages, apps móveis.",
  },
];
