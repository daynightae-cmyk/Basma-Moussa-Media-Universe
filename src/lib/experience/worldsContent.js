import { ASSETS } from "./assets";

/** Virtual broadcast studio — six scenes, four camera compositions, four lighting moods. */
export const STUDIO_SCENES = [
  {
    id: "main",
    label: { ar: "الاستوديو الرئيسي", en: "Main Studio" },
    note: { ar: "مسرح واسع بثلاث شاشات عرض", en: "A wide stage with three display surfaces" },
    image: ASSETS.mediaUniverse,
    accent: "#D7AB62",
  },
  {
    id: "conversation",
    label: { ar: "استوديو الحوار", en: "Conversation Studio" },
    note: { ar: "كرسيان وخلفية ذهبية", en: "Two chairs and a gold backdrop" },
    image: ASSETS.studio,
    accent: "#F2D7A0",
  },
  {
    id: "documentary",
    label: { ar: "استوديو الوثائقي", en: "Documentary Studio" },
    note: { ar: "أرشيف ولقطات ميدانية", en: "Archive and field frames" },
    image: ASSETS.cityVoices,
    accent: "#8FB2C9",
  },
  {
    id: "legal",
    label: { ar: "مكتب التحرير القانوني", en: "Legal Editorial Desk" },
    note: { ar: "مصادر، هوامش، ومراجعة", en: "Sources, margins and review" },
    image: ASSETS.legalResearch,
    accent: "#C7A97B",
  },
  {
    id: "audio",
    label: { ar: "استوديو الإنتاج الصوتي", en: "Audio Production Studio" },
    note: { ar: "موجات، ميكروفون، وترددات", en: "Waves, microphone, frequencies" },
    image: ASSETS.frequency,
    accent: "#E4C27C",
  },
  {
    id: "vision",
    label: { ar: "خلف الرؤية", en: "Behind the Vision" },
    note: { ar: "كيف تُبنى الحكاية", en: "How the story is built" },
    image: ASSETS.archive,
    accent: "#9C8BC4",
  },
];

export const CAMERA_VIEWS = [
  { id: "wide", label: { ar: "المسرح الكامل", en: "Wide Stage" }, scale: 1, x: 0, y: 0, label2: { ar: "٢٤مم", en: "24mm" } },
  { id: "interview", label: { ar: "تركيز الحوار", en: "Interview Focus" }, scale: 1.35, x: -6, y: -4, label2: { ar: "٥٠مم", en: "50mm" } },
  { id: "desk", label: { ar: "مكتب التحرير", en: "Editorial Desk" }, scale: 1.6, x: 10, y: 6, label2: { ar: "٨٥مم", en: "85mm" } },
  { id: "control", label: { ar: "غرفة التحكم", en: "Control Room" }, scale: 1.18, x: 4, y: 12, label2: { ar: "٣٥مم", en: "35mm" } },
];

export const LIGHTING_MODES = [
  {
    id: "warm",
    label: { ar: "بثّ دافئ", en: "Warm Broadcast" },
    swatch: "#E8B36B",
    overlay: "radial-gradient(90% 70% at 30% 20%, rgba(232,179,107,0.42), transparent 70%)",
    tint: "#22190F",
  },
  {
    id: "midnight",
    label: { ar: "سينما منتصف الليل", en: "Midnight Cinema" },
    swatch: "#3A5A9E",
    overlay: "radial-gradient(90% 70% at 70% 15%, rgba(58,90,158,0.5), transparent 70%)",
    tint: "#08101F",
  },
  {
    id: "champagne",
    label: { ar: "تحريري شامبانيا", en: "Champagne Editorial" },
    swatch: "#F2D7A0",
    overlay: "radial-gradient(90% 70% at 50% 10%, rgba(242,215,160,0.45), transparent 72%)",
    tint: "#2A2418",
  },
  {
    id: "blue-hour",
    label: { ar: "وثائقي الساعة الزرقاء", en: "Documentary Blue Hour" },
    swatch: "#5C7F9E",
    overlay: "radial-gradient(90% 70% at 20% 80%, rgba(92,127,158,0.5), transparent 72%)",
    tint: "#0A1522",
  },
];

export const SOUNDROOM_ROOMS = [
  {
    id: "booth",
    number: { ar: "غرفة ٠١", en: "Room 01" },
    title: { ar: "غرفة التسجيل", en: "Recording Booth" },
    lead: {
      ar: "ميكروفون واحد، جدار عازل، وتنفّس قبل الكلام.",
      en: "One microphone, a treated wall, and a breath before speaking.",
    },
    image: ASSETS.frequency,
    honest: {
      ar: "لا يوجد تسجيل من المتصفح في هذه النسخة. هذه بيئة تصميم تفاعلية.",
      en: "No in-browser recording in this release. This is an interactive design environment.",
    },
  },
  {
    id: "editing",
    number: { ar: "غرفة ٠٢", en: "Room 02" },
    title: { ar: "غرفة المونتاج", en: "Editing Suite" },
    lead: {
      ar: "خط زمني، فواصل، وقرار: ماذا نحذف؟",
      en: "A timeline, cuts, and one decision: what do we remove?",
    },
    image: ASSETS.mediaUniverse,
    honest: {
      ar: "المخطط الزمني تجريبي لعرض سير العمل، وليس محرّر صوت حقيقيًا.",
      en: "The timeline is a workflow preview, not a working audio editor.",
    },
  },
  {
    id: "frequency",
    number: { ar: "غرفة ٠٣", en: "Room 03" },
    title: { ar: "غرفة التردد", en: "Frequency Chamber" },
    lead: {
      ar: "تمثال موجي ذهبي — ثلاث حالات حركة، وبصريات تتحكم فيها.",
      en: "A gold wave sculpture — three motion states you control.",
    },
    image: ASSETS.frequency,
    honest: {
      ar: "الموجة زخرفية، غير مشتقة من ملف صوتي.",
      en: "Decorative waveform, not derived from an audio file.",
    },
  },
  {
    id: "lounge",
    number: { ar: "غرفة ٠٤", en: "Room 04" },
    title: { ar: "صالة الاستماع", en: "Listening Lounge" },
    lead: {
      ar: "مكتبة صوتية — عندما تصبح الحلقة الأولى جاهزة.",
      en: "An audio library — for when the first episode is ready.",
    },
    image: ASSETS.archive,
    honest: {
      ar: "لا حلقات منشورة بعد؛ والمقاطع المتاحة نماذج تعريفية من الاستوديو.",
      en: "No episodes are published yet; the takes available are studio introductions.",
    },
  },
];

export const FREQUENCY_MODES = [
  { id: "slow", label: { ar: "بطيء", en: "Slow" }, speed: 18 },
  { id: "pulse", label: { ar: "نبض", en: "Pulse" }, speed: 7 },
  { id: "static", label: { ar: "ساكن", en: "Still" }, speed: 0 },
];

export const LEGAL_OUTLINES = [
  {
    id: "uae-federal-law-intro",
    title: { ar: "كيف نقرأ قانونًا اتحاديًا؟ دليل البداية", en: "How to read a UAE federal law: a starting guide" },
    summary: {
      ar: "طريقة قراءة النصوص الاتحادية على بوابة التشريعات، مع الإحالة إلى المصدر الرسمي.",
      en: "How to read federal legislation on the UAE legislation portal, pointing to the official source.",
    },
    jurisdiction: { ar: "اتحادي — الإمارات", en: "UAE federal" },
    status: "outline",
    sources: ["uae-legislation"],
    topic: "law",
  },
  {
    id: "verify-legal-headline",
    title: { ar: "المصدر قبل الخبر: كيف نتحقق من خبر قانوني؟", en: "Source before story: verifying a legal headline" },
    summary: {
      ar: "كيف نتحقق من الأخبار القانونية عبر مكتب الإعلام الحكومي وبوابة التشريعات.",
      en: "Verifying legal news through the government media bureau and the legislation portal.",
    },
    jurisdiction: { ar: "اتحادي — الإمارات", en: "UAE federal" },
    status: "outline",
    sources: ["uae-legislation", "sgmb"],
    topic: "media",
  },
  {
    id: "egypt-uae-legal-contexts",
    title: { ar: "سياقان قانونيان: مصر والإمارات", en: "Two legal contexts: Egypt and the UAE" },
    summary: {
      ar: "مقارنة سياقية فقط بين البيئتين القانونيتين، دون ادعاء ترخيص أو ممارسة.",
      en: "A contextual comparison only between the two legal environments, with no claim of licensing or practice.",
    },
    jurisdiction: { ar: "سياقي", en: "Contextual" },
    status: "outline",
    sources: ["uae-legislation", "dubai-legal"],
    topic: "comparison",
  },
  {
    id: "contract-language-first-read",
    title: { ar: "لغة العقد: ما الذي نقرأه أولًا؟", en: "The language of a contract: what to read first" },
    summary: {
      ar: "عناصر أولية في قراءة العقود، بإحالات إلى التشريعات الاتحادية.",
      en: "Initial elements of reading contracts, referenced to UAE federal legislation.",
    },
    jurisdiction: { ar: "اتحادي — الإمارات", en: "UAE federal" },
    status: "outline",
    sources: ["uae-legislation"],
    topic: "law",
  },
];

export const SOURCES = [
  {
    id: "uae-legislation",
    name: { ar: "بوابة التشريعات الإماراتية", en: "UAE Legislation" },
    url: "https://uaelegislation.gov.ae/en",
    kind: { ar: "مرجع قانوني رسمي", en: "Official legal reference" },
  },
  {
    id: "sgmb",
    name: { ar: "مكتب الشارقة للإعلام", en: "Sharjah Government Media Bureau" },
    url: "https://sgmb.ae/en",
    kind: { ar: "مرجع إعلامي رسمي", en: "Official media reference" },
  },
  {
    id: "uae-open-data",
    name: { ar: "البيانات الحكومية المفتوحة", en: "UAE Open Government Data" },
    url: "https://u.ae/en/about-the-uae/digital-uae/data/Open-government-data",
    kind: { ar: "بيانات رسمية", en: "Official data" },
  },
  {
    id: "dubai-legal",
    name: { ar: "الشؤون القانونية — دبي", en: "Dubai Legal Affairs" },
    url: "https://www.dubai.ae/en/legal-affairs",
    kind: { ar: "مرجع قانوني رسمي", en: "Official legal reference" },
  },
];

export const LEGAL_DISCLAIMER = {
  ar: "هذا المحتوى توعوي فقط، ولا يُعتبر استشارة قانونية فردية، ولا يُنشئ علاقة محامٍ وموكل.",
  en: "This content is educational only. It is not individual legal advice and does not create an attorney–client relationship.",
};

export const STORY_ITEMS = [
  {
    id: "waterfront",
    topic: { ar: "المكان", en: "Place" },
    title: { ar: "الواجهة المائية قبل السابعة صباحًا", en: "The waterfront before seven" },
    lead: {
      ar: "ملاحظات تصورية عن ضوء الشارقة الأول: من يجري، من يفتح، ومن ينتظر.",
      en: "Illustrative notes on Sharjah's first light: who runs, who opens, who waits.",
    },
    image: ASSETS.cityVoices,
    location: { ar: "الشارقة، الإمارات", en: "Sharjah, UAE" },
    status: "concept",
  },
  {
    id: "market",
    topic: { ar: "المكان", en: "Place" },
    title: { ar: "سوق واحد، ثلاث لغات", en: "One market, three languages" },
    lead: {
      ar: "كيف يتفاهم الناس في سوق واحد بلا ترجمة رسمية.",
      en: "How people understand each other in one market without an official translator.",
    },
    image: ASSETS.archive,
    location: { ar: "الإمارات", en: "UAE" },
    status: "concept",
  },
  {
    id: "voice",
    topic: { ar: "الصوت", en: "Voice" },
    title: { ar: "ما يُحذف من الحوار", en: "What gets cut from a conversation" },
    lead: {
      ar: "الصمت الذي نحذفه عادة هو أحيانًا أهم ما في التسجيل.",
      en: "The silence we usually cut is sometimes the most important part of the tape.",
    },
    image: ASSETS.frequency,
    location: { ar: "استوديو تصوري", en: "Concept studio" },
    status: "concept",
  },
  {
    id: "research",
    topic: { ar: "البحث", en: "Research" },
    title: { ar: "قبل أن ننشر رقمًا", en: "Before we publish a number" },
    lead: {
      ar: "ثلاث خطوات للتحقق من رقم رسمي قبل استخدامه في تقرير.",
      en: "Three steps to verify an official figure before using it in a report.",
    },
    image: ASSETS.legalResearch,
    location: { ar: "مكتب بحثي", en: "Research desk" },
    status: "concept",
  },
  {
    id: "kitchen",
    topic: { ar: "الناس", en: "People" },
    title: { ar: "مطبخ صغير، حكاية طويلة", en: "A small kitchen, a long story" },
    lead: {
      ar: "تصور لمقابلة مع من يطبخ للآخرين كل يوم.",
      en: "A concept for an interview with someone who cooks for others daily.",
    },
    image: ASSETS.portraitAlt,
    location: { ar: "مقترح", en: "Proposed" },
    status: "concept",
  },
  {
    id: "legal-dialogue",
    topic: { ar: "البحث", en: "Research" },
    title: { ar: "سؤال يسبق الجواب القانوني", en: "The question before the legal answer" },
    lead: {
      ar: "لماذا نبدأ دائمًا بسؤال: في أي إمارة؟",
      en: "Why we always start with one question: which emirate?",
    },
    image: ASSETS.legalDialogue,
    location: { ar: "سياق قانوني", en: "Legal context" },
    status: "concept",
  },
];

export const ABOUT_COPY = {
  eyebrow: { ar: "عن بسمة", en: "About Basma" },
  title: { ar: "بين الإعلام والقانون.", en: "Between media and law." },
  lead: {
    ar: "بسمة موسى — صوت إعلامي، وبحث قانوني، ورؤية تُبنى في الإمارات. لا نحمل عنوانًا وظيفيًا لم يُؤكد، ولا ننشر ادعاءات مهنية دون مرجع.",
    en: "Basma Moussa — a media voice, legal research, and a vision being built in the United Arab Emirates. We claim no unconfirmed title and publish no professional assertions without a source.",
  },
  accuracyTitle: { ar: "دقة وتعديل", en: "Accuracy and review" },
  accuracyBody: {
    ar: "هذه الصفحة تُروى من الرؤية المعتمدة للمشروع، وهي قيد المراجعة قبل النشر النهائي. التفاصيل الأكاديمية والمهنية الدقيقة لا تُنشر إلا بعد تأكيدها.",
    en: "This page reflects the project's approved vision and is pending review before final publication. Specific academic and professional details are published only once confirmed.",
  },
  verifiedTitle: { ar: "ما نعرفه الآن", en: "What we state now" },
  verifiedBody: {
    ar: "على مستوى رؤية المشروع: بسمة موسى مقيمة في الإمارات، وتجمع بين الحكاية الإعلامية والبحث القانوني في منظور تحريري واحد.",
    en: "At project level: Basma Moussa is based in the UAE, bringing media storytelling and legal research into one editorial perspective.",
  },
  focus: [
    { title: { ar: "الحكاية", en: "Story" }, body: { ar: "قصة إنسانية تُروى بدفء، تُصغي قبل أن تتحدث.", en: "A human story told with warmth, listening before speaking." } },
    { title: { ar: "البحث", en: "Research" }, body: { ar: "مصادر أولية، وإخلاء مسؤولية، قبل أي محتوى قانوني.", en: "Primary sources and disclaimers before any legal content." } },
    { title: { ar: "المكان", en: "Place" }, body: { ar: "الإمارات والمجتمع العربي في القلب، وليس في الهامش.", en: "The UAE and the Arab world at the centre, not the margin." } },
  ],
  honestyNote: {
    ar: "الصور على هذه الصفحة توضيحية للهوية البصرية فقط، وليست صورًا توثيقية لشخص أو مكان.",
    en: "The images on this page illustrate the visual identity only — not documentary photos of a person or place.",
  },
};

export const CONTACT_COPY = {
  eyebrow: { ar: "تواصل للتعاون", en: "Collaborate" },
  title: { ar: "لنصنع الحكاية القادمة.", en: "Let's create the next story." },
  lead: {
    ar: "للتعاون الإعلامي، الحوارات، والبحث التحريري — راسل بسمة مباشرة عبر واتساب.",
    en: "For media collaboration, conversations and editorial research — reach Basma directly on WhatsApp.",
  },
  whatsappLabel: { ar: "مراسلة بسمة على واتساب", en: "Message Basma on WhatsApp" },
  whatsappSub: {
    ar: "يفتح محادثة واتساب برسالة جاهزة.",
    en: "Opens a WhatsApp chat with a prepared message.",
  },
  noFormTitle: { ar: "لا نموذج إرسال في هذا الإصدار", en: "No contact form in this release" },
  noFormBody: {
    ar: "لا نضع نموذجًا لا يصل إلى أحد. سيُضاف نموذج فقط عند ربطه بقناة استلام موثوقة وموافق عليها.",
    en: "We do not show forms that go nowhere. A form appears only once a trusted, approved delivery channel is connected.",
  },
  themes: [
    { title: { ar: "تعاون إعلامي", en: "Media collaboration" }, body: { ar: "حوارات ومقابلات ومحتوى مرئي وصوتي.", en: "Conversations, interviews, and audio-visual content." } },
    { title: { ar: "بحث تحريري", en: "Editorial research" }, body: { ar: "محتوى قانوني توعوي وحكايات مجتمع.", en: "Educational legal content and community stories." } },
    { title: { ar: "إنتاج صوتي", en: "Audio production" }, body: { ar: "مقالات وحوارات لمساحة الصوت.", en: "Essays and conversations for the Soundroom." } },
  ],
  privacyNote: {
    ar: "تُدار المراسلة عبر واتساب وفقًا لسياسة واتساب؛ هذا الموقع لا يخزن رسائلك.",
    en: "Messaging is handled by WhatsApp under its own policy; this site does not store your messages.",
  },
};

export const AI_STARTERS = {
  ar: [
    "إيه الحكاية هنا؟ 😄",
    "إيه البرامج المخطط لها؟",
    "فيه بودكاست أسمعه؟",
    "ممكن تشرحلي موضوع قانوني في الإمارات؟",
  ],
  en: [
    "What is this place?",
    "What programmes are planned?",
    "Is there a podcast I can listen to?",
    "Can you explain a UAE legal topic?",
  ],
};