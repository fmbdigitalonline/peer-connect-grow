import { SupporteeProfile, Badge, LibraryItem, CommunityPost } from "@/types/supportee";

export const mockSupporteeProfile: SupporteeProfile = {
  id: "supportee-1",
  language: "nl",
  languageLevel: "intermediate",
  personalInfo: {
    name: "Lisa van der Berg",
    class: "3A",
    school: "Montessori College",
  },
  interests: ["Rekenen", "Presenteren", "Time management"],
  goals: "Meer zelfvertrouwen bij presentaties en beter plannen van mijn huiswerk",
  expectations: "Wekelijks contact met mijn buddy en concrete tips",
  privacyConsent: true,
  completedAt: new Date("2024-11-01"),
  currentStep: 5,
  xp: 145,
  sessionsCompleted: 3,
  status: "active",
};

export const mockBadges: Badge[] = [
  {
    id: "badge-1",
    name: "Actief Luisteraar",
    description: "Voltooide je eerste buddy sessie",
    icon: "🎧",
    category: "starter",
    xp: 10,
    criteria: "Voltooi 1 sessie",
    earned: true,
    earnedAt: new Date("2024-11-02"),
  },
  {
    id: "badge-2",
    name: "Verbinder",
    description: "Voltooide 3 buddy sessies",
    icon: "🤝",
    category: "collaborator",
    xp: 25,
    criteria: "Voltooi 3 sessies",
    earned: true,
    earnedAt: new Date("2024-11-08"),
  },
  {
    id: "badge-3",
    name: "Reflectieheld",
    description: "Voegde 3x reflectie met rubric toe",
    icon: "💭",
    category: "achiever",
    xp: 30,
    criteria: "Maak 3 reflecties met competenties",
    earned: true,
    earnedAt: new Date("2024-11-10"),
  },
  {
    id: "badge-4",
    name: "Community Contributor",
    description: "Deelde 10 posts op de community wall",
    icon: "✨",
    category: "special",
    xp: 40,
    criteria: "Plaats 10 community posts",
    earned: false,
  },
  {
    id: "badge-5",
    name: "Doorzetter",
    description: "Behield een streak van 14 dagen",
    icon: "🔥",
    category: "achiever",
    xp: 50,
    criteria: "14 dagen achtereen actief",
    earned: true,
    earnedAt: new Date("2024-11-13"),
  },
  {
    id: "badge-6",
    name: "Expert Leerling",
    description: "Bereikte het Expert niveau",
    icon: "👑",
    category: "expert",
    xp: 100,
    criteria: "Bereik 600+ XP",
    earned: false,
  },
];

export const mockLibraryItems: LibraryItem[] = [
  {
    id: "lib-1",
    title: "De 2-minuten energizer",
    description: "Snelle oefening om energie te krijgen voor een sessie",
    category: "Energizers",
    duration: "2-5 min",
    thumbnail: "⚡",
    rating: 4.8,
    usageCount: 127,
    tags: ["Quick", "Beweging", "Focus"],
    instructions: [
      "Sta op en rek je uit",
      "Doe 10 jumping jacks",
      "Haal diep adem 3x",
      "Glimlach naar je buddy!",
    ],
  },
  {
    id: "lib-2",
    title: "Sterkte-kaart gesprek",
    description: "Bespreek elkaars sterke punten met kaartjes",
    category: "Icebreakers",
    duration: "5-10 min",
    thumbnail: "💪",
    rating: 4.9,
    usageCount: 93,
    tags: ["Kennismaking", "Sterke punten", "Vertrouwen"],
    instructions: [
      "Kies elk 3 sterkte-kaarten",
      "Leg uit waarom je deze kiest",
      "Luister naar elkaars verhaal",
      "Geef elkaar een compliment",
    ],
  },
  {
    id: "lib-3",
    title: "Pomodoro planning",
    description: "25 minuten gefocust werken met je buddy",
    category: "Didactiek",
    duration: "25 min",
    thumbnail: "🍅",
    rating: 4.7,
    usageCount: 156,
    tags: ["Focus", "Timemanagement", "Productiviteit"],
    instructions: [
      "Stel samen een doel voor 25 min",
      "Zet een timer",
      "Werk gefocust zonder afleiding",
      "Neem 5 min pauze en bespreek voortgang",
    ],
  },
];

export const mockCommunityPosts: CommunityPost[] = [
  {
    id: "post-1",
    authorId: "supportee-2",
    authorName: "Emma",
    authorAvatar: "👧",
    authorLevel: "Practitioner",
    type: "achievement",
    content: "Yes! Mijn eerste badge verdiend! 🎉 Super blij met de Actief Luisteraar badge.",
    badge: "Actief Luisteraar",
    reactions: [
      { type: "❤️", count: 12 },
      { type: "🎉", count: 8 },
    ],
    comments: [
      {
        authorName: "Coach Sarah",
        content: "Super goed gedaan Emma! Keep it up! 💪",
        timestamp: new Date("2024-11-13T10:30:00"),
      },
    ],
    timestamp: new Date("2024-11-13T10:15:00"),
    date: "13 nov",
    isSpotlighted: true,
    privacy: "school",
  },
  {
    id: "post-2",
    authorId: "supportee-3",
    authorName: "Daan",
    authorAvatar: "👦",
    authorLevel: "Leader",
    type: "story",
    content:
      "Vandaag had ik een super sessie met mijn buddy over presenteren. Ik voelde me eerst zenuwachtig maar mijn buddy gaf goede tips! Nu heb ik een plan voor mijn spreekbeurt 📝",
    reactions: [
      { type: "❤️", count: 15 },
      { type: "📈", count: 6 },
    ],
    comments: [],
    timestamp: new Date("2024-11-13T09:45:00"),
    date: "13 nov",
    isSpotlighted: false,
    privacy: "school",
  },
  {
    id: "post-3",
    authorId: "supportee-1",
    authorName: "Lisa",
    authorAvatar: "👩",
    authorLevel: "Practitioner",
    type: "question",
    content: "Heeft iemand tips voor het plannen van huiswerk? Ik loop altijd achter... 😅",
    reactions: [{ type: "❤️", count: 4 }],
    comments: [
      {
        authorName: "Buddy Tom",
        content: "Heb je al geprobeerd om een weekplanning te maken? Werkt super voor mij!",
        timestamp: new Date("2024-11-12T16:20:00"),
      },
    ],
    timestamp: new Date("2024-11-12T16:00:00"),
    date: "12 nov",
    isSpotlighted: false,
    privacy: "school",
  },
];

export const getLevelInfo = (xp: number) => {
  if (xp < 100) return { level: "Starter", title: "🌱 Starter", currentLevel: 1, progress: xp, nextLevel: 100, color: "from-blue-500 to-cyan-500" };
  if (xp < 300)
    return { level: "Practitioner", title: "🥉 Practitioner", currentLevel: 2, progress: xp - 100, nextLevel: 200, color: "from-green-500 to-emerald-500" };
  if (xp < 600)
    return { level: "Leader", title: "🥈 Leader", currentLevel: 3, progress: xp - 300, nextLevel: 300, color: "from-purple-500 to-pink-500" };
  if (xp < 1000)
    return { level: "Expert", title: "🥇 Expert", currentLevel: 4, progress: xp - 600, nextLevel: 400, color: "from-orange-500 to-red-500" };
  return { level: "Alumni Mentor", title: "👑 Alumni Mentor", currentLevel: 5, progress: xp - 1000, nextLevel: 0, color: "from-yellow-500 to-amber-500" };
};
