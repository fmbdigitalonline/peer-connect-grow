import type { Competency, Subject } from "@/types";

export const subjects: Subject[] = [
  { id: "math", name: "Wiskunde", icon: "📐" },
  { id: "dutch", name: "Nederlands", icon: "📚" },
  { id: "english", name: "Engels", icon: "🇬🇧" },
  { id: "physics", name: "Natuurkunde", icon: "⚛️" },
  { id: "chemistry", name: "Scheikunde", icon: "🧪" },
  { id: "biology", name: "Biologie", icon: "🧬" },
  { id: "history", name: "Geschiedenis", icon: "🏛️" },
  { id: "geography", name: "Aardrijkskunde", icon: "🌍" },
  { id: "economy", name: "Economie", icon: "💰" },
  { id: "other", name: "Anders", icon: "📝" },
];

export const competencies: Competency[] = [
  // Verbinding (Connection)
  {
    id: "luisteren",
    name: "Actief luisteren",
    category: "verbinding",
    description: "Goed kunnen luisteren naar wat de ander zegt",
  },
  {
    id: "empathie",
    name: "Empathie tonen",
    category: "verbinding",
    description: "Je inleven in hoe de ander zich voelt",
  },
  {
    id: "communicatie",
    name: "Communicatie",
    category: "verbinding",
    description: "Duidelijk kunnen communiceren",
  },
  {
    id: "samenwerken",
    name: "Samenwerken",
    category: "verbinding",
    description: "Goed kunnen samenwerken met anderen",
  },
  // Eigenaarschap (Ownership)
  {
    id: "initiatief",
    name: "Initiatief nemen",
    category: "eigenaarschap",
    description: "Zelf actie ondernemen en dingen starten",
  },
  {
    id: "verantwoordelijkheid",
    name: "Verantwoordelijkheid",
    category: "eigenaarschap",
    description: "Verantwoordelijkheid nemen voor je acties",
  },
  {
    id: "zelfstandigheid",
    name: "Zelfstandigheid",
    category: "eigenaarschap",
    description: "Zelfstandig aan de slag kunnen",
  },
  {
    id: "doelen",
    name: "Doelen stellen",
    category: "eigenaarschap",
    description: "Concrete doelen voor jezelf bepalen",
  },
  // Groei (Growth)
  {
    id: "reflecteren",
    name: "Reflecteren",
    category: "groei",
    description: "Nadenken over je eigen ontwikkeling",
  },
  {
    id: "feedback",
    name: "Feedback vragen/geven",
    category: "groei",
    description: "Feedback kunnen vragen en geven",
  },
  {
    id: "leerhouding",
    name: "Leerhouding",
    category: "groei",
    description: "Altijd willen blijven leren",
  },
  {
    id: "doorzetten",
    name: "Doorzettingsvermogen",
    category: "groei",
    description: "Blijven doorgaan, ook als het moeilijk is",
  },
];

export const mockBuddies = [
  { id: "buddy1", name: "Sarah de Jong", expertise: ["math", "physics"], rating: 4.8 },
  { id: "buddy2", name: "Ahmed El-Hassan", expertise: ["dutch", "english"], rating: 4.9 },
  { id: "buddy3", name: "Lisa van Dam", expertise: ["biology", "chemistry"], rating: 4.7 },
  { id: "buddy4", name: "Mehmet Yilmaz", expertise: ["math", "economy"], rating: 4.6 },
];

// Mock localStorage helpers
export const getStorageData = <T>(key: string, defaultValue: T): T => {
  const stored = localStorage.getItem(key);
  return stored ? JSON.parse(stored) : defaultValue;
};

export const setStorageData = <T>(key: string, data: T): void => {
  localStorage.setItem(key, JSON.stringify(data));
};
