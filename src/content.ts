// Single source of truth for everything written on the map.
// Facts here mirror the résumé — keep them in sync when it changes.

export const profile = {
  name: "Manthan Mehta",
  role: "Full-Stack & AI Software Engineer",
  email: "mmanthan780@gmail.com",
  github: "https://github.com/Manthan-1610",
  linkedin: "https://linkedin.com/in/manthan-mehta-7a341622b/",
  resume: "/api/download-resume",
  location: "Tempe, Arizona",
};

/** `peek` is what the floor plan says is inside each room. */
/** Pinned to the top of the floor plan: the work Manthan is proudest of. */
export const spotlight = {
  href: "#intrinsic",
  kicker: "The work I'm proudest of",
  role: "Software Engineer Intern at Intrinsic",
  where: "Google's AI robotics company · Summer 2026",
  figure: "92%",
  line: "A Gemini agent I built cut CI triage time by 92%, to under five minutes.",
};

export type Room = { id: string; numeral: string; name: string; plain: string; peek: string };

export const rooms: Room[] = [
  { id: "great-hall", numeral: "I", name: "The Great Hall", plain: "Introduction", peek: "Who I am, in short" },
  { id: "clock-tower", numeral: "II", name: "The Clock Tower", plain: "Experience", peek: "Intrinsic (Google), MeshLabs, Prama" },
  {
    id: "room-of-requirement",
    numeral: "III",
    name: "The Room of Requirement",
    plain: "Projects",
    peek: "HealthSync, Smart Attendance, the Rabbit Robot",
  },
  { id: "library", numeral: "IV", name: "The Library", plain: "Skills", peek: "Every tool I use, with its borrowing card" },
  { id: "trophy-room", numeral: "V", name: "The Trophy Room", plain: "Awards", peek: "A gold medal, AIR 9, three hackathon wins" },
  { id: "owlery", numeral: "VI", name: "The Owlery", plain: "Contact", peek: "Write to me" },
];

export type Job = {
  /** Anchor for links straight to this job. */
  id: string;
  /** The work Manthan is proudest of: pinned to the floor plan and stamped. */
  proudest?: boolean;
  role: string;
  company: string;
  companyNote?: string;
  period: string;
  place: string;
  dek: string;
  figure: { value: string; caption: string };
  points: { text: string; metric: string }[];
  tools: string[];
  marauder: string;
};

export const jobs: Job[] = [
  {
    id: "meshlabs",
    role: "AI Integration Engineer",
    company: "ASU MeshLabs",
    period: "Aug 2026 — now",
    place: "Tempe, AZ",
    dek: "A VR course that teaches conduit bending, and can tell whether your hands are doing it right.",
    figure: { value: "94%", caption: "gesture accuracy" },
    points: [
      {
        metric: "94% gesture classification accuracy",
        text: "Built the hybrid action-recognition system behind it: Temporal Convolutional Networks plus rule-based heuristics, reaching {m}.",
      },
      {
        metric: "35% fewer trainee errors",
        text: "Gave the virtual instructors behavioural AI that reacts to live player tracking with contextual dialogue and scoring in Unity, for {m}.",
      },
      {
        metric: "cut training cycles by 50%",
        text: "Wrote Python pipelines that turn raw GoPro reference footage into structured datasets, which {m}.",
      },
    ],
    tools: ["Unity", "Meta Quest", "TCNs", "Python"],
    marauder:
      "Mr. Prongs notes that ninety-four per cent is a great deal better than he ever managed in Potions.",
  },
  {
    id: "intrinsic",
    proudest: true,
    role: "Software Engineer Intern",
    company: "Intrinsic",
    companyNote: "an AI robotics company at Google",
    period: "May — Aug 2026",
    place: "Mountain View, CA",
    dek: "Agents that read failing CI runs so the on-call engineer doesn't have to.",
    figure: { value: "92%", caption: "less time triaging bugs" },
    points: [
      {
        metric: "92% less triage time",
        text: "Engineered an agentic CLI on Gemini with chain-of-thought prompting that investigates GitHub workflows and cluster logs on its own: {m}, now under five minutes.",
      },
      {
        metric: "2 hours a day",
        text: "Built a post-submit failure analysis system on GitHub Actions that parses 100+ workflow runs and publishes diagnostic reports, giving on-call {m} back.",
      },
      {
        metric: "4 hours per release",
        text: "Designed a Buganizer and PR automation pipeline that scores flakiness from historical runs and drafts the fix PRs itself, reclaiming {m}.",
      },
    ],
    tools: ["Gemini", "Agents", "GitHub Actions", "Python"],
    marauder:
      "Mr. Moony presents his compliments, and wonders whether the agent could be persuaded to do his homework as well.",
  },
  {
    id: "prama",
    role: "Software Engineer Intern",
    company: "Prama",
    period: "Jan — Jun 2025",
    place: "Ahmedabad, India",
    dek: "Chatbots, the servers behind them, and the screens in front of them.",
    figure: { value: "99.9%", caption: "uptime at 10k+ requests a day" },
    points: [
      {
        metric: "35% more reliable",
        text: "Wrote functional, exploratory and regression suites across several AI chatbots, making their conversations {m} and accurate.",
      },
      {
        metric: "10,000+ requests a day at 99.9% uptime",
        text: "Engineered Python, Flask and FastAPI services with tuned REST endpoints handling {m}.",
      },
      {
        metric: "25% lower bounce rate",
        text: "Shipped responsive, mobile-first React components and tidied cross-stack data flow, for a {m}.",
      },
    ],
    tools: ["FastAPI", "Flask", "React", "QA"],
    marauder:
      "Mr. Padfoot approves of anything that stays up all night, having done so himself on many occasions.",
  },
];

export type Project = {
  title: string;
  dek: string;
  body: string;
  period: string;
  figures: { value: string; caption: string }[];
  tools: string[];
  url: string;
  stamp?: string[];
  marauder?: string;
  media?: ProjectMedia;
};

export type ProjectMedia =
  /** A short silent loop of the thing working, shown as a moving photograph. */
  | { kind: "loop"; src: string; poster: string; w: number; h: number; alt: string; caption: string }
  /** A YouTube video behind a click-to-load poster (no YouTube scripts until asked). */
  | { kind: "youtube"; id: string; poster: string; title: string; caption: string }
  /** No footage: draw the data's route through the system instead. */
  | { kind: "route"; title: string; stops: { name: string; note: string }[] };

export const projects: Project[] = [
  {
    title: "HealthSync",
    dek: "A prescription reader and medication tracker.",
    body: "Give it a prescription and Tesseract OCR with Gemini reads it, extracting the details at over 90% accuracy and 40% faster than by hand. Patients then get personalised tracking and analytics across several treatments at once.",
    period: "2024",
    figures: [
      { value: "60%", caption: "better medication adherence in testing" },
      { value: "90%+", caption: "extraction accuracy" },
    ],
    tools: ["Python", "Flask", "Gemini", "Tesseract OCR", "REST"],
    url: "https://github.com/Manthan-1610/HealthSync",
    media: {
      kind: "route",
      title: "The route a prescription takes",
      stops: [
        { name: "A photo", note: "of the prescription" },
        { name: "Tesseract", note: "lifts the text off the page" },
        { name: "Gemini", note: "works out what it says" },
        { name: "Flask API", note: "keeps every treatment" },
        { name: "The patient", note: "tracking and analytics" },
      ],
    },
  },
  {
    title: "Smart Attendance",
    dek: "Face-recognition attendance you can question in plain English.",
    body: "Led the team that built it: deep neural networks take attendance from a camera, real-time REST APIs serve it, and DB-GPT lets staff ask questions of the data in plain language. It took first place at the Gateway Group Hackathon.",
    period: "2023 — 24",
    figures: [
      { value: "1st", caption: "of 50+ teams, Gateway Group Hackathon" },
      { value: "40%", caption: "faster, and 25% more accurate" },
    ],
    tools: ["Python", "Neural networks", "Computer vision", "DB-GPT"],
    url: "https://github.com/PreetShah77/Smart-Attendance-System",
    stamp: ["First Place", "Gateway · 50+ teams"],
    media: {
      kind: "loop",
      src: "/projects/smart-attendance.mp4",
      poster: "/projects/smart-attendance-poster.jpg",
      w: 430,
      h: 960,
      alt: "Screen recording of the Smart Attendance app: a liveness check on the camera, the face is recognised, and attendance is marked.",
      caption: "The real app: liveness check, face recognised, attendance marked.",
    },
  },
  {
    title: "Rabbit Robot",
    dek: "The sensing and control system for a national robotics final.",
    body: "Tuned PID control that lands on target 85% of the time, LiDAR for awareness, and TensorFlow Lite models on an ESP32 catching anomalies at 95% accuracy across 1,000+ test scenarios. It finished ninth in India at DD Robocon.",
    period: "2023 — 24",
    figures: [
      { value: "AIR 9", caption: "top 6% of 150+ teams, DD Robocon" },
      { value: "85%", caption: "target hit rate" },
    ],
    tools: ["C++", "ESP32", "TensorFlow Lite", "LiDAR", "PID"],
    url: "https://github.com/Manthan-1610/RR-Robocon",
    stamp: ["All India Rank 9", "DD Robocon Finals"],
    marauder: "Mr. Wormtail was frightened of the robot. Mr. Wormtail is frightened of most things.",
    media: {
      kind: "youtube",
      id: "QKgOQt6d0nU",
      poster: "/projects/robocon-match.jpg",
      title: "DD Robocon 2023: UVPCoE vs COEP",
      caption: "DD Robocon 2023, UVPCoE vs COEP. We're the red team.",
    },
  },
];

export type Book = { title: string; uses?: { by: string; year: string }[] };
export type Shelf = { name: string; books: Book[] };

const thisMap = { by: "This very map", year: "2026" };

export const shelves: Shelf[] = [
  {
    name: "Languages",
    books: [
      {
        title: "Python",
        uses: [
          { by: "Intrinsic", year: "2026" },
          { by: "ASU MeshLabs", year: "2026" },
          { by: "Prama", year: "2025" },
          { by: "HealthSync", year: "2024" },
        ],
      },
      { title: "TypeScript", uses: [thisMap] },
      { title: "JavaScript", uses: [{ by: "Prama", year: "2025" }, thisMap] },
      { title: "C++", uses: [{ by: "Rabbit Robot", year: "2024" }] },
      { title: "C" },
      { title: "HTML & CSS", uses: [thisMap] },
      { title: "Algorithms" },
    ],
  },
  {
    name: "Web & Backend",
    books: [
      { title: "React", uses: [{ by: "Prama", year: "2025" }, thisMap] },
      { title: "Next.js", uses: [thisMap] },
      { title: "Node.js" },
      { title: "FastAPI", uses: [{ by: "Prama", year: "2025" }] },
      { title: "Flask", uses: [{ by: "Prama", year: "2025" }, { by: "HealthSync", year: "2024" }] },
      { title: "Django" },
      { title: "PostgreSQL" },
      { title: "MongoDB" },
      { title: "Firebase" },
    ],
  },
  {
    name: "Artificial Intelligence",
    books: [
      { title: "Gemini", uses: [{ by: "Intrinsic", year: "2026" }, { by: "HealthSync", year: "2024" }] },
      { title: "Agents & LLMs", uses: [{ by: "Intrinsic", year: "2026" }] },
      { title: "LangChain" },
      { title: "TCNs", uses: [{ by: "ASU MeshLabs", year: "2026" }] },
      { title: "TensorFlow Lite", uses: [{ by: "Rabbit Robot", year: "2024" }] },
      { title: "Computer Vision", uses: [{ by: "Smart Attendance", year: "2024" }] },
      { title: "HuggingFace" },
      { title: "Tesseract OCR", uses: [{ by: "HealthSync", year: "2024" }] },
      { title: "DB-GPT", uses: [{ by: "Smart Attendance", year: "2024" }] },
    ],
  },
  {
    name: "Cloud, Tools & XR",
    books: [
      { title: "Unity", uses: [{ by: "ASU MeshLabs", year: "2026" }] },
      { title: "Meta Quest", uses: [{ by: "ASU MeshLabs", year: "2026" }] },
      { title: "GitHub Actions", uses: [{ by: "Intrinsic", year: "2026" }] },
      { title: "Docker" },
      { title: "GCP" },
      { title: "AWS" },
      { title: "Azure" },
      { title: "Bazel" },
      { title: "Cypress" },
    ],
  },
];

export type Trophy = {
  id: string;
  title: string;
  caption: string;
  detail: string;
  src: string;
  alt: string;
  w: number;
  h: number;
};

export const trophies: Trophy[] = [
  {
    id: "gateway",
    title: "Gateway Group Hackathon",
    caption: "1st place, out of 50+ teams",
    detail:
      "Our face-recognition attendance platform, with anti-spoofing and DB-GPT analytics, took first place out of more than fifty teams.",
    src: "/photos/hackathon-gateway.jpeg",
    alt: "The team holding the trophy and certificate at the Gateway Group Hackathon",
    w: 1600,
    h: 1200,
  },
  {
    id: "robocon",
    title: "DD Robocon National Finals",
    caption: "All India Rank 9 · top 6%",
    detail:
      "Ninth in India out of 150+ teams, with a holonomic drive, tuned PID control and LiDAR-backed TensorFlow Lite anomaly detection.",
    src: "/photos/robocon.jpeg",
    alt: "The team in the arena with the ODIN 2.0 robot at the DD Robocon national finals",
    w: 1200,
    h: 1600,
  },
  {
    id: "mlh",
    title: "Major League Hacking",
    caption: "Side-quest winner",
    detail: "Won the MLH bonus side-quest at an in-person hackathon by prototyping quickly under pressure.",
    src: "/photos/mlh-sidequest.jpeg",
    alt: "Celebrating on stage at the Major League Hacking awards",
    w: 1600,
    h: 1401,
  },
  {
    id: "tech-innovation",
    title: "Tech Innovation Hackathon",
    caption: "1st place, AI & Web track",
    detail:
      "First place in the AI & Web category for a real-time collaborative application with distributed backend services.",
    src: "/photos/hackathon-2.jpeg",
    alt: "Winners holding the trophy and certificates at the Tech Innovation Hackathon",
    w: 1600,
    h: 900,
  },
];
