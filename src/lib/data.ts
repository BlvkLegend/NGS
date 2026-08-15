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
    slug: "bola-tinubu",
    name: "Bola Ahmed Tinubu",
    role: "President",
    jurisdiction: "Nigeria",
    party: "APC",
    tookOffice: "2023",
    photoInitials: "BT",
    photoUrl: "/leaders/bola-tinubu.jpg",
    score: 38,
    evaluations: 184200,
    trend: "down",
    trendDelta: "-5",
    categories: [
      { label: "Infrastructure", score: 40 },
      { label: "Education", score: 32 },
      { label: "Healthcare", score: 28 },
      { label: "Transparency", score: 30 },
      { label: "Security", score: 35 },
      { label: "Power Supply", score: 25 },
      { label: "Job Creation", score: 30 },
      { label: "Economy", score: 33 },
      { label: "Responsiveness", score: 44 },
      { label: "Accountability", score: 31 },
    ],
  },
  {
    slug: "babajide-sanwo-olu",
    name: "Babajide Sanwo-Olu",
    role: "Governor",
    jurisdiction: "Lagos State",
    party: "APC",
    tookOffice: "2019",
    photoInitials: "BS",
    photoUrl: "/leaders/babajide-sanwo-olu.jpg",
    score: 55,
    evaluations: 62400,
    trend: "flat",
    trendDelta: "+1",
    categories: [
      { label: "Infrastructure", score: 64 },
      { label: "Education", score: 52 },
      { label: "Healthcare", score: 50 },
      { label: "Transparency", score: 48 },
      { label: "Security", score: 46 },
      { label: "Power Supply", score: 44 },
      { label: "Job Creation", score: 55 },
      { label: "Economy", score: 60 },
      { label: "Responsiveness", score: 58 },
      { label: "Accountability", score: 51 },
    ],
  },
  {
    slug: "charles-soludo",
    name: "Charles Soludo",
    role: "Governor",
    jurisdiction: "Anambra State",
    party: "APGA",
    tookOffice: "2022",
    photoInitials: "CS",
    photoUrl: "/leaders/charles-soludo.jpg",
    score: 72,
    evaluations: 28800,
    trend: "up",
    trendDelta: "+4",
    categories: [
      { label: "Infrastructure", score: 78 },
      { label: "Education", score: 75 },
      { label: "Healthcare", score: 68 },
      { label: "Transparency", score: 74 },
      { label: "Security", score: 62 },
      { label: "Power Supply", score: 58 },
      { label: "Job Creation", score: 70 },
      { label: "Economy", score: 80 },
      { label: "Responsiveness", score: 72 },
      { label: "Accountability", score: 75 },
    ],
  },
  {
    slug: "peter-mbah",
    name: "Peter Mbah",
    role: "Governor",
    jurisdiction: "Enugu State",
    party: "APC",
    tookOffice: "2023",
    photoInitials: "PM",
    photoUrl: "/leaders/peter-mbah.jpg",
    score: 61,
    evaluations: 19500,
    trend: "up",
    trendDelta: "+3",
    categories: [
      { label: "Infrastructure", score: 68 },
      { label: "Education", score: 60 },
      { label: "Healthcare", score: 58 },
      { label: "Transparency", score: 55 },
      { label: "Security", score: 60 },
      { label: "Power Supply", score: 52 },
      { label: "Job Creation", score: 62 },
      { label: "Economy", score: 65 },
      { label: "Responsiveness", score: 64 },
      { label: "Accountability", score: 58 },
    ],
  },
  {
    slug: "babagana-zulum",
    name: "Babagana Zulum",
    role: "Governor",
    jurisdiction: "Borno State",
    party: "APC",
    tookOffice: "2019",
    photoInitials: "BZ",
    photoUrl: "/leaders/babagana-zulum.jpg",
    score: 77,
    evaluations: 31600,
    trend: "up",
    trendDelta: "+2",
    categories: [
      { label: "Infrastructure", score: 80 },
      { label: "Education", score: 78 },
      { label: "Healthcare", score: 75 },
      { label: "Transparency", score: 72 },
      { label: "Security", score: 70 },
      { label: "Power Supply", score: 65 },
      { label: "Job Creation", score: 78 },
      { label: "Economy", score: 76 },
      { label: "Responsiveness", score: 84 },
      { label: "Accountability", score: 79 },
    ],
  },
  {
    slug: "nyesom-wike",
    name: "Nyesom Wike",
    role: "Minister, FCT",
    jurisdiction: "FCT Abuja",
    party: "APC",
    tookOffice: "2023",
    photoInitials: "NW",
    photoUrl: "/leaders/nyesom-wike.jpg",
    score: 49,
    evaluations: 54700,
    trend: "down",
    trendDelta: "-3",
    categories: [
      { label: "Infrastructure", score: 62 },
      { label: "Education", score: 44 },
      { label: "Healthcare", score: 40 },
      { label: "Transparency", score: 32 },
      { label: "Security", score: 48 },
      { label: "Power Supply", score: 45 },
      { label: "Job Creation", score: 46 },
      { label: "Economy", score: 52 },
      { label: "Responsiveness", score: 50 },
      { label: "Accountability", score: 38 },
    ],
  },
  {
    slug: "festus-keyamo",
    name: "Festus Keyamo",
    role: "Minister, Aviation & Aerospace",
    jurisdiction: "Delta State",
    party: "APC",
    tookOffice: "2023",
    photoInitials: "FK",
    photoUrl: "/leaders/festus-keyamo.jpg",
    score: 53,
    evaluations: 22100,
    trend: "flat",
    trendDelta: "+0",
    categories: [
      { label: "Infrastructure", score: 60 },
      { label: "Education", score: 48 },
      { label: "Healthcare", score: 44 },
      { label: "Transparency", score: 50 },
      { label: "Security", score: 52 },
      { label: "Power Supply", score: 46 },
      { label: "Job Creation", score: 55 },
      { label: "Economy", score: 58 },
      { label: "Responsiveness", score: 56 },
      { label: "Accountability", score: 51 },
    ],
  },
  {
    slug: "bosun-tijani",
    name: "Bosun Tijani",
    role: "Minister, Communications, Innovation & Digital Economy",
    jurisdiction: "Ogun State",
    party: "APC",
    tookOffice: "2023",
    photoInitials: "BT",
    photoUrl: "/leaders/bosun-tijani.png",
    score: 65,
    evaluations: 17300,
    trend: "up",
    trendDelta: "+6",
    categories: [
      { label: "Infrastructure", score: 62 },
      { label: "Education", score: 68 },
      { label: "Healthcare", score: 55 },
      { label: "Transparency", score: 65 },
      { label: "Security", score: 58 },
      { label: "Power Supply", score: 60 },
      { label: "Job Creation", score: 72 },
      { label: "Economy", score: 70 },
      { label: "Responsiveness", score: 68 },
      { label: "Accountability", score: 67 },
    ],
  },
  {
    slug: "godswill-akpabio",
    name: "Godswill Akpabio",
    role: "Senate President",
    jurisdiction: "Akwa Ibom North-West",
    party: "APC",
    tookOffice: "2023",
    photoInitials: "GA",
    photoUrl: "/leaders/godswill-akpabio.jpg",
    score: 31,
    evaluations: 41800,
    trend: "down",
    trendDelta: "-6",
    categories: [
      { label: "Infrastructure", score: 35 },
      { label: "Education", score: 28 },
      { label: "Healthcare", score: 27 },
      { label: "Transparency", score: 22 },
      { label: "Security", score: 33 },
      { label: "Power Supply", score: 30 },
      { label: "Job Creation", score: 30 },
      { label: "Economy", score: 32 },
      { label: "Responsiveness", score: 36 },
      { label: "Accountability", score: 24 },
    ],
  },
  {
    slug: "natasha-akpoti-uduaghan",
    name: "Natasha Akpoti-Uduaghan",
    role: "Senator",
    jurisdiction: "Kogi Central",
    party: "PDP",
    tookOffice: "2023",
    photoInitials: "NA",
    photoUrl: "/leaders/natasha-akpoti-uduaghan.webp",
    score: 68,
    evaluations: 29400,
    trend: "up",
    trendDelta: "+8",
    categories: [
      { label: "Infrastructure", score: 65 },
      { label: "Education", score: 70 },
      { label: "Healthcare", score: 66 },
      { label: "Transparency", score: 74 },
      { label: "Security", score: 62 },
      { label: "Power Supply", score: 58 },
      { label: "Job Creation", score: 65 },
      { label: "Economy", score: 68 },
      { label: "Responsiveness", score: 76 },
      { label: "Accountability", score: 72 },
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
  { leaderSlug: "bola-tinubu", leaderName: "Bola Ahmed Tinubu", score: 35, filedOn: "2 days ago" },
  { leaderSlug: "charles-soludo", leaderName: "Charles Soludo", score: 74, filedOn: "1 week ago" },
  { leaderSlug: "natasha-akpoti-uduaghan", leaderName: "Natasha Akpoti-Uduaghan", score: 70, filedOn: "3 weeks ago" },
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
    title: "Your evaluation of Bola Ahmed Tinubu is now public",
    body: "It has been added to the national average.",
    time: "2 hours ago",
    unread: true,
  },
  {
    id: "n2",
    title: "Godswill Akpabio dropped 6 points this month",
    body: "Based on 3,840 new evaluations filed since your last visit.",
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
    body: "Natasha Akpoti-Uduaghan, Senator for Kogi Central, is now open for evaluation.",
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
