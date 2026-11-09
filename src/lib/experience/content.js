import { ASSETS } from "./assets";

export const BRAND = {
  name: { ar: "بسمة موسى", en: "Basma Moussa" },
  product: { ar: "عالم الإعلام", en: "Media Universe" },
  tagline: { ar: "لكل حكاية صوت... ولكل صوت رؤية.", en: "Where Stories Find Their Voice." },
  location: { ar: "الشارقة، الإمارات العربية المتحدة", en: "Sharjah, United Arab Emirates" },
  concept: {
    ar: "منصة مفاهيم قيد التطوير — ليست قناة بث ولا مجموعة إعلامية مسجّلة، ولا تُعرض فيها حلقات منشورة بعد.",
    en: "A concept platform in development — not a broadcaster or registered media group, with no published episodes yet.",
  },
};

export const WHATSAPP =
  "https://wa.me/971507226089?text=" +
  encodeURIComponent("مرحبًا بسمة، أرغب في التواصل بخصوص تعاون إعلامي.");

export const STATUS_LABEL = {
  concept: { ar: "مفهوم قيد التطوير", en: "Concept · in development" },
  draft: { ar: "مسودة", en: "Draft" },
  review: { ar: "قيد المراجعة", en: "In review" },
  published: { ar: "منشور", en: "Published" },
  outline: { ar: "مخطط تحريري", en: "Editorial outline" },
};

/** Five art-directed homepage scenes — each with its own composition. */
export const HERO_SCENES = [
  {
    id: "first-voice",
    chapter: { ar: "المشهد ١", en: "Scene 01" },
    composition: "portrait",
    image: ASSETS.homeHero,
    foreground: ASSETS.portrait,
    eyebrow: { ar: "بسمة موسى · عالم الإعلام", en: "Basma Moussa · Media Universe" },
    title: { ar: "لكل حكاية صوت... ولكل صوت رؤية.", en: "Where Stories Find Their Voice." },
    lead: {
      ar: "مساحة إعلامية سينمائية تضع الصوت الإنساني في المقدمة: الحكاية، البحث، والمكان.",
      en: "A cinematic media space that puts the human voice first — story, research, and place.",
    },
    cta: { label: { ar: "ادخل عالم الإعلام", en: "Enter the Media Universe" }, href: "/media" },
    camera: "push",
  },
  {
    id: "conversation-studio",
    chapter: { ar: "المشهد ٢", en: "Scene 02" },
    composition: "studio",
    image: ASSETS.studio,
    eyebrow: { ar: "ما وراء الإطار", en: "Beyond the Frame" },
    title: { ar: "كرسيان… وحكاية تنتظر.", en: "Two chairs. One story waiting." },
    lead: {
      ar: "استوديو حوار فاخر — مشهد تصوري، لا بثّ حيّ ولا حلقات منشورة بعد.",
      en: "A luxury conversation studio — an illustrative scene, not a live broadcast.",
    },
    cta: { label: { ar: "ادخل الاستوديو", en: "Enter the studio" }, href: "/studio" },
    camera: "drift",
  },
  {
    id: "golden-frequency",
    chapter: { ar: "المشهد ٣", en: "Scene 03" },
    composition: "frequency",
    image: ASSETS.frequency,
    eyebrow: { ar: "التردد الذهبي", en: "The Golden Frequency" },
    title: { ar: "الصوت يُرى قبل أن يُسمع.", en: "Sound you can almost see." },
    lead: {
      ar: "فضاء صوتي بموجات ذهبية — هوية بصرية، وليست تسجيلات صوتية حقيقية.",
      en: "An audio space of golden waves — visual identity, not real recordings.",
    },
    cta: { label: { ar: "ادخل Soundroom", en: "Enter Soundroom" }, href: "/soundroom" },
    camera: "breathe",
  },
  {
    id: "city-voices",
    chapter: { ar: "المشهد ٤", en: "Scene 04" },
    composition: "city",
    image: ASSETS.cityVoices,
    eyebrow: { ar: "صوت المدينة", en: "City Voices" },
    title: { ar: "من الشارقة… إلى العالم.", en: "From Sharjah, outward." },
    lead: {
      ar: "أجواء وثائقية من واجهة الشارقة — مشهد تصوري لمشروع قصص مقترح.",
      en: "Documentary atmosphere from the Sharjah waterfront — an illustrative proposed series.",
    },
    cta: { label: { ar: "استكشف القصص", en: "Explore the stories" }, href: "/stories" },
    camera: "rise",
  },
  {
    id: "legal-lens",
    chapter: { ar: "المشهد ٥", en: "Scene 05" },
    composition: "legal",
    image: ASSETS.legalLens,
    eyebrow: { ar: "من زاوية القانون", en: "The Legal Lens" },
    title: { ar: "المصدر قبل الخبر.", en: "The source before the story." },
    lead: {
      ar: "توعية قانونية بلغة بسيطة، مع الإحالة إلى المصادر الرسمية — وليست استشارة قانونية.",
      en: "Accessible legal awareness with official sources cited — not legal advice.",
    },
    cta: { label: { ar: "افتح معرض البحث", en: "Open the research gallery" }, href: "/legal-lens" },
    camera: "drift",
  },
];

/** Media Universe gateways. */
export const WORLDS = [
  {
    id: "beyond",
    href: "/programs/beyond-the-frame",
    image: ASSETS.studio,
    shape: "wide",
    category: { ar: "حوارات", en: "Conversation" },
    kicker: { ar: "غرفة الحوار", en: "The Conversation Chamber" },
    title: { ar: "ما وراء الإطار", en: "Beyond the Frame" },
    teaser: {
      ar: "مساحة لحكايات إنسانية وحوارات ذات معنى.",
      en: "A proposed space for human stories and meaningful conversations.",
    },
    status: "concept",
  },
  {
    id: "soundroom",
    href: "/soundroom",
    image: ASSETS.frequency,
    shape: "tall",
    category: { ar: "صوت", en: "Audio" },
    kicker: { ar: "التردد الذهبي", en: "The Golden Frequency" },
    title: { ar: "مساحة صوت", en: "Soundroom" },
    teaser: {
      ar: "أربع غرف صوتية تفاعلية — مشروع سردي قيد التطوير، بلا حلقات منشورة.",
      en: "Four interactive audio chambers — a storytelling project in development, no episodes yet.",
    },
    status: "concept",
  },
  {
    id: "legal",
    href: "/legal-lens",
    image: ASSETS.legalLens,
    shape: "tall",
    category: { ar: "قانون", en: "Legal" },
    kicker: { ar: "معرض البحث", en: "The Research Gallery" },
    title: { ar: "من زاوية القانون", en: "The Legal Lens" },
    teaser: {
      ar: "رؤية إعلامية للتوعية القانونية بلغة بسيطة ومصادر موثوقة.",
      en: "An accessible legal-awareness editorial series, grounded in verified sources.",
    },
    status: "concept",
  },
  {
    id: "stories",
    href: "/stories",
    image: ASSETS.cityVoices,
    shape: "wide",
    category: { ar: "وثائقي", en: "Documentary" },
    kicker: { ar: "الواجهة المائية", en: "The Waterfront" },
    title: { ar: "صوت المدينة", en: "City Voices" },
    teaser: {
      ar: "حكايات الناس والمجتمع من الإمارات إلى العالم.",
      en: "A documentary storytelling concept about people and communities in the UAE.",
    },
    status: "concept",
  },
  {
    id: "studio",
    href: "/studio",
    image: ASSETS.mediaUniverse,
    shape: "editorial",
    category: { ar: "إنتاج", en: "Production" },
    kicker: { ar: "خلف الرؤية", en: "Behind the Vision" },
    title: { ar: "أرض البث الإبداعية", en: "The Creative Broadcast Floor" },
    teaser: {
      ar: "استوديو رقمي تفاعلي: مشاهد، زوايا كاميرا، وإضاءة تتحول بين يديك.",
      en: "An interactive virtual stage: scenes, camera angles and lighting you control.",
    },
    status: "concept",
  },
  {
    id: "ai",
    href: "/ai-studio",
    image: ASSETS.archive,
    shape: "editorial",
    category: { ar: "ذكاء", en: "Intelligence" },
    kicker: { ar: "مساحة المعرفة", en: "The Knowledge Desk" },
    title: { ar: "بسمة AI", en: "Basma AI" },
    teaser: {
      ar: "رفيق حواري يشرح العالم، ويرشدك داخل المنصة، ويحيل إلى المصادر.",
      en: "A conversational companion that explains the worlds, guides the platform and cites sources.",
    },
    status: "published",
  },
];

/** Five chapters of the horizontal journey. */
export const CHAPTERS = [
  {
    id: "the-first-voice",
    number: { ar: "الفصل ١", en: "Chapter 01" },
    title: { ar: "الصوت الأول", en: "The First Voice" },
    lead: {
      ar: "بورتريه تحريري — نقطة البداية لكل عوالم السرد.",
      en: "An editorial portrait — the origin point for every story world.",
    },
    image: ASSETS.portrait,
    atmosphere: "portrait",
    cta: { label: { ar: "تعرّف على بسمة", en: "Meet Basma" }, href: "/about" },
  },
  {
    id: "the-conversation-studio",
    number: { ar: "الفصل ٢", en: "Chapter 02" },
    title: { ar: "استوديو الحوار", en: "The Conversation Studio" },
    lead: {
      ar: "كرسيان، خلفية ذهبية، ومحادثة إنسانية.",
      en: "Two chairs, a gold backdrop, and a human conversation.",
    },
    image: ASSETS.studio,
    atmosphere: "studio",
    cta: { label: { ar: "ادخل الغرفة", en: "Enter the chamber" }, href: "/programs/beyond-the-frame" },
  },
  {
    id: "the-golden-frequency",
    number: { ar: "الفصل ٣", en: "Chapter 03" },
    title: { ar: "التردد الذهبي", en: "The Golden Frequency" },
    lead: {
      ar: "شرائط صوت ذهبية تقود إلى Soundroom.",
      en: "Golden sound ribbons leading into Soundroom.",
    },
    image: ASSETS.frequency,
    atmosphere: "frequency",
    cta: { label: { ar: "ادخل Soundroom", en: "Enter Soundroom" }, href: "/soundroom" },
  },
  {
    id: "city-voices",
    number: { ar: "الفصل ٤", en: "Chapter 04" },
    title: { ar: "أصوات المدينة", en: "City Voices" },
    lead: {
      ar: "واجهة الشارقة والكاميرا الميدانية — أجواء وثائقية مقترحة.",
      en: "Sharjah waterfront and a field camera — proposed documentary mood.",
    },
    image: ASSETS.cityVoices,
    atmosphere: "city",
    cta: { label: { ar: "استكشف الأرشيف", en: "Explore the archive" }, href: "/stories" },
  },
  {
    id: "the-legal-lens",
    number: { ar: "الفصل ٥", en: "Chapter 05" },
    title: { ar: "من زاوية القانون", en: "The Legal Lens" },
    lead: {
      ar: "مصادر أولية، وإخلاء مسؤولية، قبل أي محتوى قانوني.",
      en: "Primary sources and disclaimers before any legal content.",
    },
    image: ASSETS.legalResearch,
    atmosphere: "legal",
    cta: { label: { ar: "افتح المعرض", en: "Open the gallery" }, href: "/legal-lens" },
  },
];

export const PROGRAMS = [
  {
    slug: "beyond-the-frame",
    title: { ar: "خارج الإطار", en: "Beyond the Frame" },
    description: { ar: "مساحة لحكايات إنسانية وحوارات ذات معنى.", en: "A proposed space for human stories and meaningful conversations." },
    status: "concept",
    image: ASSETS.studio,
    world: { ar: "غرفة الحوار", en: "The Conversation Chamber" },
    episodes: [],
    body: {
      ar: "تصور لبرنامج حوار يجلس فيه الضيف أمام كاميرا واحدة، بلا استعجال. الهدف أن يخرج المشاهد بحكاية كاملة، لا بمقطع قصير. لا توجد حلقات مسجَّلة أو منشورة بعد، وهذا التصور هو ما يُبنى عليه شكل الاستوديو في هذه المنصة.",
      en: "A concept for a conversation programme with one camera and no hurry. The aim is a whole story, not a clip. No episodes are recorded or published yet; this concept is what shapes the studio environment on this platform.",
    },
    planned: {
      ar: ["حوار طويل مع ضيف واحد", "إضاءة دافئة ومنطقة جلوس واحدة", "ملاحظات تحريرية قبل النشر"],
      en: ["One long-form guest conversation", "Warm lighting, a single seating area", "Editorial review before publishing"],
    },
  },
  {
    slug: "the-legal-lens",
    title: { ar: "من زاوية القانون", en: "The Legal Lens" },
    description: { ar: "رؤية إعلامية للتوعية القانونية بلغة بسيطة ومصادر موثوقة.", en: "A proposed accessible legal-awareness editorial series, grounded in verified sources." },
    status: "concept",
    image: ASSETS.legalLens,
    world: { ar: "معرض البحث", en: "The Research Gallery" },
    episodes: [],
    body: {
      ar: "سلسلة توعوية تشرح فكرة قانونية واحدة في كل مرة، بلغة واضحة، مع إحالة صريحة إلى المصدر الرسمي وتاريخ المراجعة. المحتوى تعليمي فقط، ولا يُعد استشارة قانونية فردية.",
      en: "An awareness series that explains one legal idea at a time in plain language, citing the official source and the review date. Content is educational only and never individual legal advice.",
    },
    planned: {
      ar: ["مصدر رسمي لكل فكرة", "تاريخ مراجعة ظاهر", "إخلاء مسؤولية في كل مقال"],
      en: ["One official source per idea", "A visible review date", "A disclaimer on every piece"],
    },
  },
  {
    slug: "city-voices",
    title: { ar: "صوت المدينة", en: "City Voices" },
    description: { ar: "حكايات الناس والمجتمع من الإمارات إلى العالم.", en: "A proposed documentary storytelling concept about people and communities in the UAE." },
    status: "concept",
    image: ASSETS.cityVoices,
    world: { ar: "الواجهة المائية", en: "The Waterfront" },
    episodes: [],
    body: {
      ar: "رحلة وثائقية مقترحة تبدأ من الشارقة: أسواق، واجهة مائية، وأصوات تعمل في الصباح الباكر. لا مقابلات مكتملة ولا تقارير مصوّرة منشورة بعد — الأرشيف هنا تصوري وموسوم بوضوح.",
      en: "A proposed documentary journey beginning in Sharjah: markets, waterfront, voices at work before sunrise. No finished interviews or filmed reports are published yet — the archive here is illustrative and clearly labelled.",
    },
    planned: {
      ar: ["تصوير ميداني بموافقة موثقة", "ترجمة وتحرير للنص", "إسناد كل اقتباس لصاحبه"],
      en: ["Field filming with documented consent", "Translated, edited transcripts", "Every quote attributed"],
    },
  },
  {
    slug: "soundroom",
    title: { ar: "مساحة صوت", en: "Soundroom" },
    description: { ar: "عالم صوتي للحوارات والقصص الإنسانية، قيد التطوير.", en: "An in-development audio storytelling concept with no published episodes yet." },
    status: "concept",
    image: ASSETS.frequency,
    world: { ar: "التردد الذهبي", en: "The Golden Frequency" },
    episodes: [],
    body: {
      ar: "غرفة صوت بأربع حالات: تسجيل، تحرير، تردد، واستماع. كل الحالات هنا بيئات تصميم تفاعلية، وليست غرفًا مادية أو تسجيلات حقيقية. عند نشر أول حلقة سيُضاف مشغّل صوتي فعلي.",
      en: "An audio room with four states: recording, editing, frequency and listening. All of them are interactive design environments, not physical rooms or real recordings. A real player will appear when the first episode is published.",
    },
    planned: {
      ar: ["حلقات بصوت واحد أو حوار", "نسخة نصية لكل حلقة", "مشغّل يعمل عند توفر الملف"],
      en: ["Solo or conversational episodes", "A transcript for every episode", "A player once audio exists"],
    },
  },
];

export function getProgram(slug) {
  return PROGRAMS.find((p) => p.slug === slug);
}