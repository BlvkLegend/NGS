export type Leader = {
  slug: string;
  name: string;
  role: string;
  jurisdiction: string;
  party: string;
  tookOffice: string;
  photoInitials: string;
  photoUrl?: string;
  score: number;
  evaluations: number;
  trend: "up" | "down" | "flat";
  trendDelta?: string;
  categories: { label: string; score: number }[];
};

export const leaders: Leader[] = [
  {
    slug: "adaeze-nwosu",
    name: "Adaeze Nwosu",
    role: "Governor",
    jurisdiction: "Enugu State",
    party: "PDP",
    tookOffice: "2023",
    photoInitials: "AN",
    score: 74,
    evaluations: 12480,
    trend: "up",
    trendDelta: "+3",
    categories: [
      { label: "Infrastructure", score: 81 },
      { label: "Education", score: 76 },
      { label: "Healthcare", score: 68 },
      { label: "Transparency", score: 71 },
      { label: "Security", score: 73 },
      { label: "Power Supply", score: 60 },
      { label: "Job Creation", score: 65 },
      { label: "Economy", score: 70 },
      { label: "Responsiveness", score: 78 },
      { label: "Accountability", score: 67 },
    ],
  },
  {
    slug: "tunde-bakare-jr",
    name: "Tunde Bakare Jr.",
    role: "Senator",
    jurisdiction: "Lagos West",
    party: "APC",
    tookOffice: "2019",
    photoInitials: "TB",
    score: 52,
    evaluations: 30110,
    trend: "down",
    trendDelta: "-2",
    categories: [
      { label: "Infrastructure", score: 48 },
      { label: "Education", score: 55 },
      { label: "Healthcare", score: 44 },
      { label: "Transparency", score: 49 },
      { label: "Security", score: 58 },
      { label: "Power Supply", score: 52 },
      { label: "Job Creation", score: 41 },
      { label: "Economy", score: 56 },
      { label: "Responsiveness", score: 47 },
      { label: "Accountability", score: 63 },
    ],
  },
  {
    slug: "hassan-idris-yola",
    name: "Hassan Idris",
    role: "Local Government Chairman",
    jurisdiction: "Yola North, Adamawa",
    party: "APC",
    tookOffice: "2021",
    photoInitials: "HI",
    score: 39,
    evaluations: 4210,
    trend: "flat",
    trendDelta: "New",
    categories: [
      { label: "Infrastructure", score: 44 },
      { label: "Education", score: 36 },
      { label: "Healthcare", score: 33 },
      { label: "Transparency", score: 36 },
      { label: "Security", score: 40 },
      { label: "Power Supply", score: 38 },
      { label: "Job Creation", score: 35 },
      { label: "Economy", score: 41 },
      { label: "Responsiveness", score: 40 },
      { label: "Accountability", score: 42 },
    ],
  },
  {
    slug: "chioma-okafor",
    name: "Chioma Okafor",
    role: "Minister",
    jurisdiction: "FCT Abuja",
    party: "APC",
    tookOffice: "2023",
    photoInitials: "CO",
    score: 67,
    evaluations: 18340,
    trend: "up",
    trendDelta: "+5",
    categories: [
      { label: "Infrastructure", score: 72 },
      { label: "Education", score: 65 },
      { label: "Healthcare", score: 70 },
      { label: "Transparency", score: 68 },
      { label: "Security", score: 60 },
      { label: "Power Supply", score: 58 },
      { label: "Job Creation", score: 66 },
      { label: "Economy", score: 64 },
      { label: "Responsiveness", score: 74 },
      { label: "Accountability", score: 69 },
    ],
  },
  {
    slug: "emeka-obi",
    name: "Emeka Obi",
    role: "Governor",
    jurisdiction: "Anambra State",
    party: "APGA",
    tookOffice: "2022",
    photoInitials: "EO",
    score: 81,
    evaluations: 22100,
    trend: "up",
    trendDelta: "+2",
    categories: [
      { label: "Infrastructure", score: 88 },
      { label: "Education", score: 84 },
      { label: "Healthcare", score: 79 },
      { label: "Transparency", score: 82 },
      { label: "Security", score: 77 },
      { label: "Power Supply", score: 71 },
      { label: "Job Creation", score: 80 },
      { label: "Economy", score: 83 },
      { label: "Responsiveness", score: 85 },
      { label: "Accountability", score: 80 },
    ],
  },
  {
    slug: "fatima-sule",
    name: "Fatima Sule",
    role: "Senator",
    jurisdiction: "Kano Central",
    party: "NNPP",
    tookOffice: "2023",
    photoInitials: "FS",
    score: 61,
    evaluations: 9870,
    trend: "up",
    trendDelta: "+1",
    categories: [
      { label: "Infrastructure", score: 58 },
      { label: "Education", score: 66 },
      { label: "Healthcare", score: 60 },
      { label: "Transparency", score: 63 },
      { label: "Security", score: 55 },
      { label: "Power Supply", score: 57 },
      { label: "Job Creation", score: 62 },
      { label: "Economy", score: 64 },
      { label: "Responsiveness", score: 65 },
      { label: "Accountability", score: 60 },
    ],
  },
  {
    slug: "bello-usman",
    name: "Bello Usman",
    role: "Governor",
    jurisdiction: "Kogi State",
    party: "APC",
    tookOffice: "2020",
    photoInitials: "BU",
    score: 33,
    evaluations: 7650,
    trend: "down",
    trendDelta: "-4",
    categories: [
      { label: "Infrastructure", score: 30 },
      { label: "Education", score: 28 },
      { label: "Healthcare", score: 31 },
      { label: "Transparency", score: 25 },
      { label: "Security", score: 38 },
      { label: "Power Supply", score: 34 },
      { label: "Job Creation", score: 32 },
      { label: "Economy", score: 35 },
      { label: "Responsiveness", score: 40 },
      { label: "Accountability", score: 29 },
    ],
  },
  {
    slug: "ngozi-eze",
    name: "Ngozi Eze",
    role: "Local Government Chairman",
    jurisdiction: "Owerri North, Imo",
    party: "PDP",
    tookOffice: "2021",
    photoInitials: "NE",
    score: 56,
    evaluations: 3100,
    trend: "up",
    trendDelta: "+3",
    categories: [
      { label: "Infrastructure", score: 60 },
      { label: "Education", score: 54 },
      { label: "Healthcare", score: 52 },
      { label: "Transparency", score: 58 },
      { label: "Security", score: 50 },
      { label: "Power Supply", score: 48 },
      { label: "Job Creation", score: 55 },
      { label: "Economy", score: 62 },
      { label: "Responsiveness", score: 66 },
      { label: "Accountability", score: 57 },
    ],
  },
  {
    slug: "ibrahim-musa",
    name: "Ibrahim Musa",
    role: "Minister",
    jurisdiction: "FCT Abuja",
    party: "APC",
    tookOffice: "2023",
    photoInitials: "IM",
    score: 45,
    evaluations: 14200,
    trend: "down",
    trendDelta: "-1",
    categories: [
      { label: "Infrastructure", score: 50 },
      { label: "Education", score: 42 },
      { label: "Healthcare", score: 44 },
      { label: "Transparency", score: 38 },
      { label: "Security", score: 47 },
      { label: "Power Supply", score: 43 },
      { label: "Job Creation", score: 46 },
      { label: "Economy", score: 48 },
      { label: "Responsiveness", score: 50 },
      { label: "Accountability", score: 40 },
    ],
  },
  {
    slug: "sola-adeleke",
    name: "Sola Adeleke",
    role: "Governor",
    jurisdiction: "Osun State",
    party: "PDP",
    tookOffice: "2022",
    photoInitials: "SA",
    score: 70,
    evaluations: 16800,
    trend: "flat",
    trendDelta: "+0",
    categories: [
      { label: "Infrastructure", score: 74 },
      { label: "Education", score: 72 },
      { label: "Healthcare", score: 68 },
      { label: "Transparency", score: 71 },
      { label: "Security", score: 65 },
      { label: "Power Supply", score: 63 },
      { label: "Job Creation", score: 69 },
      { label: "Economy", score: 73 },
      { label: "Responsiveness", score: 75 },
      { label: "Accountability", score: 68 },
    ],
  },
];

export const evaluationQuestions = [
  {
    id: "q1",
    category: "Infrastructure",
    prompt: "How would you rate visible infrastructure delivered this term?",
    helper: "Roads, bridges, public buildings, utilities. Completed and in use, not just announced.",
  },
  {
    id: "q2",
    category: "Transparency",
    prompt: "Has this official published budgets or project records citizens can verify?",
    helper: "Consider public disclosures, freedom-of-information responses, and open procurement.",
  },
  {
    id: "q3",
    category: "Responsiveness",
    prompt: "How reachable has this official been to constituents raising concerns?",
    helper: "Town halls, ward offices, verified responses to petitions.",
  },
  {
    id: "q4",
    category: "Security",
    prompt: "Has safety and security in the jurisdiction improved, worsened, or stayed the same?",
    helper: "Base this on documented incidents, not general sentiment alone.",
  },
  {
    id: "q5",
    category: "Healthcare",
    prompt: "Rate access to functioning public healthcare under this administration.",
    helper: "Staffed facilities, available medicine, maternal care outcomes.",
  },
  {
    id: "q6",
    category: "Education",
    prompt: "Rate the state of public education. Schools, teacher pay, learning outcomes.",
    helper: "Consider enrollment, infrastructure, and reported outcomes where available.",
  },
] as const;

export const currentUser = {
  name: "Chidinma Okafor",
  handle: "@chidinma_o",
  state: "Lagos State",
  memberSince: "March 2025",
  initials: "CO",
  evaluationsFiled: 14,
  streakWeeks: 6,
};

export const myEvaluations = [
  { leaderSlug: "adaeze-nwosu", leaderName: "Adaeze Nwosu", score: 78, filedOn: "2 days ago" },
  { leaderSlug: "tunde-bakare-jr", leaderName: "Tunde Bakare Jr.", score: 45, filedOn: "1 week ago" },
  { leaderSlug: "hassan-idris-yola", leaderName: "Hassan Idris", score: 36, filedOn: "3 weeks ago" },
];

export type Achievement = {
  id: string;
  title: string;
  description: string;
  earned: boolean;
};

export const achievements: Achievement[] = [
  { id: "first-entry", title: "First Entry", description: "Filed your first evaluation", earned: true },
  { id: "six-categories", title: "Full Ledger", description: "Scored all six categories in one evaluation", earned: true },
  { id: "state-watcher", title: "State Watcher", description: "Evaluated five officials in one state", earned: true },
  { id: "consistent-filer", title: "Consistent Filer", description: "Filed evaluations six weeks in a row", earned: true },
  { id: "national-register", title: "National Register", description: "Evaluated officials in ten different states", earned: false },
  { id: "evidence-backed", title: "Evidence Backed", description: "Attached supporting evidence to 10 evaluations", earned: false },
];

export const notifications = [
  {
    id: "n1",
    title: "Your evaluation of Adaeze Nwosu is now public",
    body: "It has been added to the state average for Enugu State.",
    time: "2 hours ago",
    unread: true,
  },
  {
    id: "n2",
    title: "Tunde Bakare Jr. dropped 4 points this month",
    body: "Based on 1,204 new evaluations filed since your last visit.",
    time: "1 day ago",
    unread: true,
  },
  {
    id: "n3",
    title: "You earned the Consistent Filer badge",
    body: "Six weeks of evaluations filed without a gap.",
    time: "3 days ago",
    unread: false,
  },
  {
    id: "n4",
    title: "New official added to the register",
    body: "Hassan Idris, Local Government Chairman of Yola North, is now open for evaluation.",
    time: "1 week ago",
    unread: false,
  },
];

export const nigerianStates = [
  "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue",
  "Borno", "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu",
  "FCT Abuja", "Gombe", "Imo", "Jigawa", "Kaduna", "Kano", "Katsina",
  "Kebbi", "Kogi", "Kwara", "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo",
  "Osun", "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe",
  "Zamfara", "Diaspora",
] as const;

export const employmentProfiles = [
  "University Undergraduate",
  "Unemployed",
  "Employed",
  "Entrepreneur",
] as const;

export type DemographicProfile = {
  jurisdiction: string;
  employmentProfile: string;
};

/** 10-question satirical engine per PRD 3.3. One question per category.
 *  Each carries both tonal registers; same data drives either mode. */
export const quizQuestions = [
  { id: "q1",  category: "Infrastructure", taxpayer: "How would you rate visible infrastructure delivered this term?", cruise: "Dem swear say road go reach your street. E reach?" },
  { id: "q2",  category: "Transparency",   taxpayer: "Has this official published budgets and project records citizens can actually verify?", cruise: "Where the money go? Simple question. Why dem dey act like na crime to ask?" },
  { id: "q3",  category: "Security",       taxpayer: "Has safety in this jurisdiction meaningfully improved under this term?", cruise: "You fit waka night market without looking back every 3 seconds?" },
  { id: "q4",  category: "Healthcare",     taxpayer: "Rate access to functioning public healthcare under this administration.", cruise: "Government hospital near you: actual clinic or just a building with a sign?" },
  { id: "q5",  category: "Education",      taxpayer: "Rate the condition of public schools and learning outcomes this term.", cruise: "Public school pickin dem dey learn, or na holiday full everywhere?" },
  { id: "q6",  category: "Power Supply",   taxpayer: "Rate the consistency of electricity supply in this jurisdiction.", cruise: "Light don show? Or your inverter don become your best friend this term?" },
  { id: "q7",  category: "Job Creation",   taxpayer: "Has this official created verifiable employment beyond announcements?", cruise: "Oga hold press conference about 10,000 jobs. You know anybody wey get that job?" },
  { id: "q8",  category: "Economy",        taxpayer: "Has the cost of basic goods and services improved under this term?", cruise: "You fit enter market with 5k and comot with something? Or na sorrow be the vibe?" },
  { id: "q9",  category: "Responsiveness", taxpayer: "How accessible and responsive has this official been to constituents?", cruise: "You don try reach their office? How many gate before them redirect you or you give up?" },
  { id: "q10", category: "Accountability", taxpayer: "Has this official faced real scrutiny or consequences for failures?", cruise: "Dem chop public money. Everybody sabi. What happen to them? (You already know.)" },
] as const;

/** Satirical rank titles by score band, per interface mode. */
export const rankTitles: { min: number; taxpayer: string; cruise: string }[] = [
  { min: 80, taxpayer: "Model Public Servant", cruise: "Certified Landlord of the People" },
  { min: 65, taxpayer: "Above Average Performer", cruise: "Correct Guy (For Now)" },
  { min: 50, taxpayer: "Middling Custodian", cruise: "Half Light, Half Darkness" },
  { min: 35, taxpayer: "Underperforming Official", cruise: "Certified Grid Sunsetter" },
  { min: 0, taxpayer: "Severely Underperforming Official", cruise: "The Japa Activist" },
];

export function getRankTitle(score: number, mode: "taxpayer" | "cruise") {
  const band = rankTitles.find((r) => score >= r.min) ?? rankTitles[rankTitles.length - 1];
  return mode === "cruise" ? band.cruise : band.taxpayer;
}

/** Deterministic mock "community pulse" percentage, seeded from leader + question
 *  so the same leader/question pair always shows the same believable figure
 *  without needing a live aggregation backend. */
export function communityPulse(leaderSlug: string, questionId: string, optionValue: number) {
  const seedString = `${leaderSlug}-${questionId}-${optionValue}`;
  let hash = 0;
  for (let i = 0; i < seedString.length; i++) {
    hash = (hash * 31 + seedString.charCodeAt(i)) % 10000;
  }
  // Non-linear spread: map into 28-89 range, bias away from middle
  const raw = 28 + (hash % 62);
  // Push values away from the 47-53 cluster by stretching extremes
  const stretched = raw < 45 ? Math.max(28, raw - 4) : raw > 55 ? Math.min(89, raw + 4) : raw;
  return stretched;
}

const PULSE_PHRASES_TAXPAYER = [
  (pct: number) => `${pct}% of fellow evaluators picked this option`,
  (pct: number) => `${pct}% of people in your state answered the same way`,
  (pct: number) => `This is the majority view: ${pct}% agree`,
  (pct: number) => `${pct}% consensus on this one so far`,
  (pct: number) => `Matches ${pct}% of recent submissions`,
];

const PULSE_PHRASES_CRUISE = [
  (pct: number) => `${pct}% of people wey answer this thing pick am too`,
  (pct: number) => `${pct}% of una people dey vibe with this one`,
  (pct: number) => `E be like say ${pct}% agree with you for this`,
  (pct: number) => `${pct}% of the streets don already talk am`,
  (pct: number) => `Na popular answer be this, ${pct}% dey there with you`,
];

/** Picks a stable phrasing per leader/question/option so the pulse copy doesn't
 *  repeat the same sentence pattern on every single question. */
export function communityPulseCopy(
  leaderSlug: string,
  questionId: string,
  optionValue: number,
  mode: "taxpayer" | "cruise"
) {
  const pct = communityPulse(leaderSlug, questionId, optionValue);
  const bank = mode === "cruise" ? PULSE_PHRASES_CRUISE : PULSE_PHRASES_TAXPAYER;
  const seedString = `phrase-${leaderSlug}-${questionId}`;
  let hash = 0;
  for (let i = 0; i < seedString.length; i++) {
    hash = (hash * 31 + seedString.charCodeAt(i)) % 1000;
  }
  const phrase = bank[hash % bank.length];
  return phrase(pct);
}

/** Predetermined keyword vectors the voice micro-feed matches against, per PRD 3.5. */
export const voiceKeywordVectors = [
  "light", "nepa", "fuel", "subsidy", "road", "school", "hospital",
  "security", "police", "tax", "corruption", "salary", "job", "market",
  "inflation", "water", "election", "vote", "governor", "senator",
];

export const scoreOptions = [
  { value: 1, label: "F", cruiseLabel: "F", helper: "No credible evidence of progress", cruiseHelper: "Zero. Nothing. Nada.", color: "text-signal-low" },
  { value: 2, label: "D", cruiseLabel: "D", helper: "Minimal, inconsistent progress", cruiseHelper: "Small small, but e no reach anywhere.", color: "text-orange-500" },
  { value: 3, label: "C", cruiseLabel: "C", helper: "Some progress, significant gaps remain", cruiseHelper: "E do something sha. But half-half.", color: "text-signal-mid" },
  { value: 4, label: "B", cruiseLabel: "B", helper: "Clear, verifiable progress", cruiseHelper: "E dey do. Progress dey show.", color: "text-forest-500" },
  { value: 5, label: "A", cruiseLabel: "A", helper: "Consistent, well-documented delivery", cruiseHelper: "This oga dey deliver! No dulling.", color: "text-signal-good" },
] as const;
