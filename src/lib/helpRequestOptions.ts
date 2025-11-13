export const helpTypeOptions = [
  {
    id: "explanation",
    label: "Ik wil uitleg",
    description: "Een buddy legt stap voor stap uit wat je lastig vindt.",
    icon: "💡",
  },
  {
    id: "practice",
    label: "Samen oefenen",
    description: "Samen opdrachten maken of toetsen voorbereiden.",
    icon: "🧩",
  },
  {
    id: "social",
    label: "Sociale boost",
    description: "Even sparren, motivatie vinden of peptalk.",
    icon: "🤝",
  },
  {
    id: "motivation",
    label: "Planning & motivatie",
    description: "Iemand die helpt plannen, check-ins doet of je motiveert.",
    icon: "🚀",
  },
] as const;

export const moodScale = [
  { value: 4, label: "Super", description: "Ik zit lekker in mijn vel", emoji: "😄" },
  { value: 3, label: "Oké", description: "Het gaat wel prima", emoji: "🙂" },
  { value: 2, label: "Neutraal", description: "Gaat wel", emoji: "😐" },
  { value: 1, label: "Lastig", description: "Ik voel me niet top", emoji: "😕" },
  { value: 0, label: "Zwaar", description: "Vandaag is moeilijk", emoji: "😔" },
] as const;

export const dayOptions = [
  { value: "monday", label: "Maandag" },
  { value: "tuesday", label: "Dinsdag" },
  { value: "wednesday", label: "Woensdag" },
  { value: "thursday", label: "Donderdag" },
  { value: "friday", label: "Vrijdag" },
  { value: "saturday", label: "Zaterdag" },
  { value: "sunday", label: "Zondag" },
];
