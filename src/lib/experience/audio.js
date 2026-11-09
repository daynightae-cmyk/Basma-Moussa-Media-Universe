/**
 * Soundroom audio library.
 * Each chamber plays real recordings: short editorial readings of the platform's
 * own scripts. They are voice-synthesised samples, not published episodes, and
 * every chamber says so. Replace `src` with a new file to swap a take.
 */

export const AUDIO_DISCLOSURE = {
  ar: "قراءة تحريرية بصوت مُولّد — نموذج صوتي من الاستوديو، وليس حلقة منشورة.",
  en: "An editorial reading in a synthesised voice — a studio sample, not a published episode.",
};

export const AUDIO_TRACKS = {
  booth: [
    {
      id: "booth-1",
      title: { ar: "الصوت الأول — قراءة كاملة", en: "The first voice — full reading" },
      note: {
        ar: "حلقة بصوت واحد: نص مكتوب يُقرأ على مهل، بلا ضيف ولا موسيقى.",
        en: "A solo-voice piece: a written essay read slowly, no guest, no music.",
      },
      src: "https://media.base44.com/files/public/6af0f8282dfd5d494b9bccc6/d68c55815_speech.mp3",
    },
    {
      id: "booth-2",
      title: { ar: "تمرين النبرة — ثلاث قراءات", en: "Tone exercise — three passes" },
      note: {
        ar: "نفس الجملة ثلاث مرات: عادية، ثم أبطأ، ثم بمدة صمت في نهايتها.",
        en: "One sentence three times: plain, then slower, then with silence at the end.",
      },
      src: "https://media.base44.com/files/public/6af0f8282dfd5d494b9bccc6/8d875b9d7_speech.mp3",
    },
  ],
  editing: [
    {
      id: "editing-1",
      title: { ar: "بناء المشهد", en: "Building the scene" },
      note: {
        ar: "ترتيب الأنفاس: صوت المكان، ثم الكلام، ثم صمت قبل السؤال التالي.",
        en: "Ordering the breaths: room tone, then speech, then silence before the next question.",
      },
      src: "https://media.base44.com/files/public/6af0f8282dfd5d494b9bccc6/1933b0ded_speech.mp3",
    },
    {
      id: "editing-2",
      title: { ar: "الصمت كأداة", en: "Silence as a tool" },
      note: {
        ar: "ثماني ثوانٍ صامتة موزعة بعناية قد تغيّر سرعة الحكاية كلها.",
        en: "Eight well-placed silent seconds can change the pace of the whole story.",
      },
      src: "https://media.base44.com/files/public/6af0f8282dfd5d494b9bccc6/94f62f513_speech.mp3",
    },
  ],
  frequency: [
    {
      id: "frequency-1",
      title: { ar: "تمرين: عدّ الطبقات", en: "Exercise: count the layers" },
      note: {
        ar: "حركة الناس، همس المكان، ونبرة صوتك — أيّها غاب الآن؟",
        en: "People moving, the room whispering, your own tone — which one is missing?",
      },
      src: "https://media.base44.com/files/public/6af0f8282dfd5d494b9bccc6/24ce5ec64_speech.mp3",
    },
    {
      id: "frequency-2",
      title: { ar: "التردد والمسافة", en: "Frequency and distance" },
      note: {
        ar: "المسافة بين الميكروفون والمصدر تحدد من يروي: الصوت أم المكان.",
        en: "The distance between microphone and source decides who narrates: voice or place.",
      },
      src: "https://media.base44.com/files/public/6af0f8282dfd5d494b9bccc6/2e17f89dd_speech.mp3",
    },
  ],
  lounge: [
    {
      id: "lounge-1",
      title: { ar: "تعريف مساحة صوت", en: "Introducing Soundroom" },
      note: {
        ar: "ما هذا البودكاست، ولمن يُقدَّم، وما الذي لم يُنشر بعد.",
        en: "What this podcast is, who it serves, and what has not been published yet.",
      },
      src: "https://media.base44.com/files/public/6af0f8282dfd5d494b9bccc6/465c8f76c_speech.mp3",
    },
    {
      id: "lounge-2",
      title: { ar: "دعوة للاستماع", en: "An invitation to listen" },
      note: {
        ar: "إيقاع النشر القادم، ودعوة لاختيار الغرفة التي تشبهك.",
        en: "The coming release rhythm, and an invitation to pick the chamber that sounds like you.",
      },
      src: "https://media.base44.com/files/public/6af0f8282dfd5d494b9bccc6/c6dec0b83_speech.mp3",
    },
  ],
};

export function tracksFor(roomId) {
  return AUDIO_TRACKS[roomId] ?? [];
}